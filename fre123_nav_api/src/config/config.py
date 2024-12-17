"""
    Created by howie at 2024-07-15.
    Description: 项目整体配置文件
    Changelog: all notable changes to this file will be documented
"""

import os

from src.utils.tools import read_file


class Config:
    """
    Basic config
    """

    # Application config
    DEBUG = True
    TIMEZONE = "Asia/Shanghai"
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))
    ROOT_DIR = os.path.join(os.path.dirname(BASE_DIR))
    PROJECT_NAME = os.getenv("PROJECT_NAME", ROOT_DIR.split("/")[-1])
    API_DIR = os.path.join(BASE_DIR, "views")
    HOST = os.getenv("HOST", "0.0.0.0")
    HTTP_PORT = os.getenv("HTTP_PORT", 8765)
    WORKERS = os.getenv("WORKERS", 1)

    APP_ID_CONFIG = {"fre123": os.getenv("APP_TOKEN", "123456")}

    MONGODB_CONFIG = {
        "mongodb_uri": os.getenv("MONGODB_URI", ""),
        "operate_db": os.getenv("MONGODB_DB", ""),
    }

    REDIS_CONFIG = {
        "host": os.getenv("REDIS_HOST", "127.0.0.1"),
        "port": int(os.getenv("REDIS_PORT", "6389")),
        "password": os.getenv("REDIS_PASSWORD", "123456"),
        "db": int(os.getenv("REDIS_DB", "0")),
    }

    TAG = {
        "info": f"{PROJECT_NAME.replace('_', '-')}-info",
        "warn": f"{PROJECT_NAME.replace('_', '-')}-warn",
        "error": f"{PROJECT_NAME.replace('_', '-')}-error",
    }

    USERNAME = os.getenv("USERNAME", "admin")

    PASSWORD = os.getenv("PASSWORD", "123456")

    APP_JWT_SECRET = os.getenv("APP_JWT_SECRET", "GmAKIDcbTK4iQI99OmE20z4qhaK1tjVAkSN0")

    INDEX_TOKEN = os.getenv("INDEX_TOKEN", "123456789")

    @staticmethod
    def get_version() -> str:
        """获取当前服务版本, 需要自定义 version 文件"""
        version_list = read_file(os.path.join(Config.ROOT_DIR, "version"))
        return version_list[0] if version_list else "undefined"


if __name__ == "__main__":
    print(Config.API_DIR)
