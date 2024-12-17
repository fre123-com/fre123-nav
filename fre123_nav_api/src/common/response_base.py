"""
    Created by howie at 2024-07-15.
    Description: 通用响应类
    Changelog: all notable changes to this file will be documented
"""

import json

from werkzeug.local import LocalProxy


def response_handle(*, request: LocalProxy, dict_value: dict, status: int = 200):
    """
    构造一个json格式的响应
    Url: http://flask.pocoo.org/docs/1.0/api/?highlight=jsonify#flask.json.jsonify
    :param request: flask request实例
    :param dict_value: 响应字典
    :param status: 状态码
    :return:
    """
    resp_data = json.dumps(dict_value, ensure_ascii=False)
    if isinstance(request, LocalProxy):
        resp = resp_data, status
    else:
        resp = resp_data
    return resp


class ResponseField:
    """
    Define the response field
    """

    DATA = "data"
    INFO = "info"
    STATUS = "status"
    ERR_MSG = "err_msg"


class ResponseReply:
    """
    Define field description
    """

    # Success
    SUCCESS = "ok"

    # Error
    PARAM_ERR = "参数错误"
    PARAM_PARSE_ERR = "参数解析错误"
    PARAM_MISSING = "缺少必要参数"
    NOT_AUTHORIZED = "验证未通过"
    IP_FORBIDDEN = "非合法IP"
    SERVER_ERR = "服务异常"
    OVERTIME = "请求超时"
    LIMITED_FLOW = "请求限流"
    DB_ERROR = "数据库错误"
    UNKNOWN_ERR = "未知错误"

    # Customize
    SITE_CONFIG_UPDATE_ERR = "站点配置更新失败"
    SITE_CONFIG_DELETE_ERR = "站点配置删除失败"
    SITE_SEARCH_PS_ERR = "分页参数超出限制"
    LOGIN_VALID_INFO_ERR = "登录信息校验失败"


class ResponseCode:
    """
    Define the response code
    """

    # Common
    SUCCESS = 0
    PARAM_ERR = 100
    NOT_AUTHORIZED = 101
    IP_FORBIDDEN = 102
    SERVER_ERR = 103
    OVERTIME = 104
    LIMITED_FLOW = 105
    DB_ERR = 106
    UNKNOWN_ERR = 110

    # Customize
    SITE_CONFIG_UPDATE_ERR = 1001
    SITE_CONFIG_DELETE_ERR = 1002
    SITE_SEARCH_PS_ERR = 1010
    LOGIN_VALID_INFO_ERR = 1004


class UniResponse:
    """
    Generic response class
    """

    # 数据库出错
    DB_ERR = {
        ResponseField.DATA: {},
        ResponseField.INFO: ResponseReply.DB_ERROR,
        ResponseField.STATUS: ResponseCode.DB_ERR,
    }
    # 参数错误
    PARAM_ERR = {
        ResponseField.DATA: {},
        ResponseField.INFO: ResponseReply.PARAM_ERR,
        ResponseField.STATUS: ResponseCode.PARAM_ERR,
    }
    # 服务未知错误
    SERVER_UNKNOWN_ERR = {
        ResponseField.DATA: {},
        ResponseField.INFO: ResponseReply.UNKNOWN_ERR,
        ResponseField.STATUS: ResponseCode.UNKNOWN_ERR,
    }
    # 请求成功
    SUCCESS = {
        ResponseField.DATA: {},
        ResponseField.INFO: ResponseReply.SUCCESS,
        ResponseField.STATUS: ResponseCode.SUCCESS,
    }
    # 未验证
    NOT_AUTHORIZED = {
        ResponseField.DATA: {},
        ResponseField.INFO: ResponseReply.NOT_AUTHORIZED,
        ResponseField.STATUS: ResponseCode.NOT_AUTHORIZED,
    }
