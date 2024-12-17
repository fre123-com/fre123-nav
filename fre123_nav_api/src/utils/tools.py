"""
    Created by howie at 2024-07-15.
    Description: 常用函数
    Changelog: all notable changes to this file will be documented
"""

import hashlib
import socket


def get_host_info() -> dict:
    """
    获取本机计算机名称和ip
    Returns:
        dict: 主机名称&IP
    """
    hostname = socket.gethostname()
    ip = socket.gethostbyname(hostname)

    return {"hostname": hostname, "ip": ip}


def md5_encryption(string: str) -> str:
    """
    对字符串进行md5加密
    Args:
        string (str): 加密目标字符串

    Returns:
        str: 加密后字符串
    """
    m = hashlib.md5()
    m.update(string.encode("utf-8"))
    return m.hexdigest()


def read_file(file_path: str) -> list:
    """
    读取文本内容
    Args:
        file_path (str): 文件路径
    Returns:
        list: 每行文件内容组成的列表
    """
    try:
        with open(file_path, encoding="utf-8") as fp:
            file_list = [_.strip() for _ in fp.readlines()]
    except Exception as _:
        file_list = []
    return file_list
