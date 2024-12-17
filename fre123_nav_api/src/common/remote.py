"""
    Created by howie at 2024-07-15.
    Description: 远程调用
    Changelog: all notable changes to this file will be documented
"""

import json

import requests


def send_post_request(
    url, data=None, timeout=2, headers=None, req_session=None, **kwargs
) -> dict:
    """
    发起 post 请求
    :param url: 请求目标地址
    :param data: 请求参数
    :param timeout: 请求超时时间
    :param headers: 请求头
    :param req_session: 请求连接池
    :param kwargs:
    :return:
    """
    headers = headers or {"Content-Type": "application/json"}
    r = req_session or requests

    try:
        res_dict = r.post(
            url, data=json.dumps(data), headers=headers, timeout=timeout, **kwargs
        ).json()
        res_dict = {"resp_data": res_dict, "resp_status": True}
    except Exception as e:
        res_dict = {"resp_data": {"err_msg": str(e)}, "resp_status": False}
    return res_dict


def send_get_request(
    url, params=None, timeout=2, headers=None, req_session=None, **kwargs
) -> dict:
    """
    发起 get 请求
    :param url: 请求目标地址
    :param data: 请求参数
    :param timeout: 请求超时时间
    :param headers: 请求头
    :param req_session: 请求连接池
    :param kwargs:
    :return:
    """
    headers = headers or {"Content-Type": "application/json"}
    r = req_session or requests

    try:
        res_dict = r.get(
            url, params=params, headers=headers, timeout=timeout, **kwargs
        ).json()
        res_dict = {"resp_data": res_dict, "resp_status": True}
    except Exception as e:
        res_dict = {"resp_data": {"err_msg": str(e)}, "resp_status": False}
    return res_dict


def send_put_request(
    url, data=None, timeout=2, headers=None, req_session=None, **kwargs
) -> dict:
    """
    发起 put 请求
    :param url: 请求目标地址
    :param data: 请求参数
    :param timeout: 请求超时时间
    :param headers: 请求头
    :param req_session: 请求连接池
    :param kwargs:
    :return:
    """
    headers = headers or {"Content-Type": "application/json"}
    r = req_session or requests
    try:
        res_dict = r.put(
            url, data=json.dumps(data), headers=headers, timeout=timeout, **kwargs
        ).json()
        res_dict = {"resp_data": res_dict, "resp_status": True}
    except Exception as e:
        res_dict = {"resp_data": {"err_msg": str(e)}, "resp_status": False}
    return res_dict
