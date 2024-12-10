"""
    Created by howie.hu at 2024-07-15.
    Description: 校验中间件
    Changelog: all notable changes to this file will be documented
"""

import time

from functools import wraps

import jwt

from flask import request

from src.common.response_base import UniResponse, response_handle
from src.config import LOGGER, Config


def auth_post_params(keys: list = None, data: list = None, allow_empty: bool = True):
    """
    接口函数验证
    :param keys: list
    :param data: data list
    :param allow_empty: bool
    :return:
    """
    keys, data = keys or [], data or []

    def wrapper(func):
        @wraps(func)
        def auth_action_param(*args, **kwargs):
            """
            接口验证装饰器
            """
            post_data: dict = request.json
            request_keys = post_data.keys()
            allow_empty_valid = True
            if not allow_empty:
                # post_data 字典所有 key 对应 value 不能为空
                for key in keys:
                    if not post_data.get(key):
                        LOGGER.error(
                            f"request parameter error: {request.path} - {post_data}"
                        )
                        allow_empty_valid = False
                        break

            if set(keys).issubset(set(request_keys)) and allow_empty_valid:
                if "data" in request_keys and data:
                    data_keys = post_data["data"].keys()
                    if set(data).issubset(set(data_keys)):
                        resp = func(*args, **kwargs)
                    else:
                        LOGGER.error(
                            f"request data parameter error: {request.path} - {post_data}"
                        )
                        resp = return_params_error()
                else:
                    resp = func()
            else:
                LOGGER.error(f"request parameter error: {request.path} - {post_data}")
                resp = return_params_error()
            return resp

        return auth_action_param

    return wrapper


def jwt_required():
    """JWT Token 校验装饰器"""

    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            if request.method == "POST":
                # 获取 jwt token
                jwt_token = request.headers.get("Authorization", "")
                if jwt_token:
                    jwt_token = jwt_token.replace("Bearer ", "")
                    parse_dict = jwt_parse(jwt_token, Config.APP_JWT_SECRET)
                    jwt_data = parse_dict["data"]
                    info = parse_dict["info"]
                    username = jwt_data.get("username")
                    if parse_dict["status"] and username == Config.USERNAME:
                        # HEADER 头赋值 JWT-USERNAME 用于后续操作
                        new_headers = dict(request.headers)
                        new_headers["JWT-USERNAME"] = jwt_data.get("username")
                        resp = fn(*args, **kwargs)
                    else:
                        LOGGER.error(
                            f"请求 {request.path} 出错, Authorization {jwt_token} ,{info}"
                        )
                        resp = return_401()
                else:
                    resp = return_401()
            else:
                resp = return_401()
            return resp

        return decorator

    return wrapper


def token_required():
    """前台 Token 校验装饰器"""

    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            if request.method == "POST":
                # 获取 index token
                index_token = request.headers.get("Authorization", "")
                if index_token:
                    index_token = index_token.replace("Bearer ", "")
                    if index_token == Config.INDEX_TOKEN:
                        resp = fn(*args, **kwargs)
                    else:
                        LOGGER.error(
                            f"请求 {request.path} 出错, Authorization {index_token} "
                        )
                        resp = return_401()
                else:
                    resp = return_401()
            else:
                resp = return_401()
            return resp

        return decorator

    return wrapper


def return_params_error():
    """
    返回参数错误
    """
    return response_handle(
        request=request,
        dict_value=UniResponse.PARAM_ERR,
    )


def return_401():
    """
    返回401
    """
    return response_handle(
        request=request,
        dict_value=UniResponse.NOT_AUTHORIZED,
        status=401,
    )


def jwt_parse(jwt_token: str = "", jwt_secret: str = ""):
    """
    解析 jwt token
    :return: {}
    """
    try:
        payload = jwt.decode(jwt_token, jwt_secret, algorithms=["HS256"])
        exp = int(payload.get("exp", 0))
        if exp < int(time.time()):
            parse_dict = {
                "status": False,
                "info": "Token expired",
                "data": {},
            }
        else:
            parse_dict = {
                "status": True,
                "info": "ok",
                "data": payload,
            }
    except jwt.ExpiredSignatureError:
        parse_dict = {
            "status": False,
            "info": "Token expired",
            "data": {},
        }
    except jwt.InvalidTokenError:
        parse_dict = {
            "status": False,
            "info": "Invalid token",
            "data": {},
        }
    except Exception as e:
        parse_dict = {
            "status": False,
            "info": str(e),
            "data": {},
        }
    return parse_dict
