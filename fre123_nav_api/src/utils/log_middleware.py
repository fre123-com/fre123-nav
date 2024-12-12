"""
    Created by howie at 2024-07-15.
    Description: 日志中间件
    Changelog: all notable changes to this file will be documented
"""

import logging


def get_logger(name="APP NAME"):
    """
    初始化内部日志
    Args:
        name (str, optional): _description_. Defaults to "Flask API".

    Returns:
        _type_: 日志实例
    """
    logging_format = f"[%(asctime)s] %(levelname)-5s %(name)-{len(name)}s "
    logging_format += "%(message)s"

    logging.basicConfig(
        format=logging_format, level=logging.INFO, datefmt="%Y:%m:%d %H:%M:%S"
    )
    return logging.getLogger(name)
