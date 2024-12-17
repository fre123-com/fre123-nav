"""
    Created by burger at 2024-12-11.
    Description: 前台配置缓存刷新接口
    Changelog: all notable changes to this file will be documented
"""


from flask import current_app, request

from src.common import ResponseField, UniResponse, response_handle


def config_refresh_cache():
    """
    前台配置缓存刷新接口
    {
    }
    """
    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    cache = current_app.config["cache"]
    try:
        cache.clear()
        app_logger.info(f"API{request.path} 缓存清理成功")
        result = UniResponse.SUCCESS
    except Exception as e:
        app_logger.error(f"API{request.path} 缓存清理失败！err:{str(e)}")
        result = {
            **UniResponse.SERVER_UNKNOWN_ERR,
            ResponseField.INFO: f"缓存清理失败, err:{str(e)}",
        }

    return response_handle(request=request, dict_value=result)
