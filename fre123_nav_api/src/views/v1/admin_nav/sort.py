"""
    Created by burger at 2024-08-18.
    Description: 导航拖拽配置信息
    Changelog: all notable changes to this file will be documented
"""

from flask import current_app, request

from src.common import (
    ResponseField,
    UniResponse,
    auth_post_params,
    jwt_required,
    response_handle,
)
from src.config import Config
from src.databases import MongodbBase, mongodb_update_data
from src.helper.refresh_cache import web_config_refresh_cache


@jwt_required()
@auth_post_params(keys=["sorted_names"], allow_empty=False)
def admin_nav_sort():
    """
    通过前端拖拽后的导航排序数组，更新数据库中的导航配置信息排序
    {
        "sorted_names": ["软件工具", "新闻资讯", "书籍资源"]
    }
    """
    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]
    cache = current_app.config["cache"]

    # 获取参数
    post_data = request.json
    sorted_names = post_data.get("sorted_names", [])

    coll = mongodb_base.get_collection(collection="d_nav")

    result = []

    for index, group_name in enumerate(sorted_names):
        filter_dict = {"group_name": group_name}
        update_data = {"$set": {"index": index}}

        update_result = mongodb_update_data(
            coll_conn=coll,
            filter_dict=filter_dict,
            update_data=update_data,
        )

        if update_result["status"]:
            # 成功更新
            web_config_refresh_cache(cache)
            result.append(
                {
                    **UniResponse.SUCCESS,
                    ResponseField.INFO: f"成功更新name: {group_name} 的排序为 {index}",
                }
            )
        else:
            result.append(
                {
                    **UniResponse.PARAM_ERR,
                    **{
                        ResponseField.DATA: {
                            ResponseField.ERR_MSG: f"尝试更新 name: {group_name}, 失败"
                        }
                    },
                }
            )
            app_logger.error(f"API{request.path}尝试更新 name: {group_name}, 失败")

    return response_handle(request=request, dict_value=result)
