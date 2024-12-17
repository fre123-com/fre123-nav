"""
    Created by howie.hu at 2024-07-18.
    Description: 用户登陆接口，注意事项：
        - Token 有效期为 1 天
    Changelog: all notable changes to this file will be documented
"""

import datetime

import jwt

from flask import current_app, request
from pytz import timezone

from src.common import (
    ResponseCode,
    ResponseField,
    ResponseReply,
    UniResponse,
    auth_post_params,
)
from src.config import Config


@auth_post_params(keys=["username", "password"], allow_empty=False)
def admin_user_login():
    """
    查询登录接口
    eg:
    {
        "username": "gouzia",
        "password": "123456"
    }
    """
    # 全局配置
    app_logger = current_app.config["app_logger"]
    app_config: Config = current_app.config["app_config"]

    # 获取基础数据
    post_data: dict = request.json
    username: str = post_data.get("username")
    password: str = post_data.get("password")
    if app_config.USERNAME == username and app_config.PASSWORD == password:
        # 利用 jwt 基于 uuid 生成 token
        exp_ts = datetime.datetime.now(timezone("Asia/Shanghai")) + datetime.timedelta(
            days=1
        )
        payload = {"username": username, "password": password, "exp": exp_ts}
        jwt_token = jwt.encode(payload, app_config.APP_JWT_SECRET, algorithm="HS256")
        result = {
            **UniResponse.SUCCESS,
            **{ResponseField.DATA: {"jwt_token": jwt_token}},
        }

    else:
        # 登录失败
        result = {
            ResponseField.DATA: {ResponseField.ERR_MSG: "用户名或密码错误"},
            ResponseField.INFO: ResponseReply.LOGIN_VALID_INFO_ERR,
            ResponseField.STATUS: ResponseCode.LOGIN_VALID_INFO_ERR,
        }
        app_logger.error(f"API {request.path} 用户登陆失败 -> {username}: 用户名或密码错误!")
    return result
