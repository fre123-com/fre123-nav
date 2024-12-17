from src.config import LOGGER


def web_config_refresh_cache(cache):
    """
    前台配置缓存刷新方法
    """
    try:
        cache.clear()
        LOGGER.info(f"web_config_refresh_cache 缓存清理成功")

    except Exception as e:
        LOGGER.error(f"web_config_refresh_cache 缓存清理失败！err:{str(e)}")
