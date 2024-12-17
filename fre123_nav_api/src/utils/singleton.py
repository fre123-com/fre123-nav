"""
    Created by howie at 2024-07-15.
    Description: 实现单例模式
    Changelog: all notable changes to this file will be documented
"""

from functools import wraps

from src.utils.tools import md5_encryption


def singleton(cls):
    """
    单例模式
    :param cls: cls
    :return: instance
    """
    _instances = {}

    @wraps(cls)
    def instance(*args, **kw):
        key = md5_encryption(f"{str(cls)}_{str(args)}_{str(kw)}")
        if key not in _instances:
            _instances[key] = cls(*args, **kw)
        return _instances[key]

    return instance
