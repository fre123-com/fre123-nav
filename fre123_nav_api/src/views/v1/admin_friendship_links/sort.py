"""
    Created by burger at 2024-08-18.
    Description: 友链拖拽配置信息
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


@jwt_required()
@auth_post_params(keys=["sorted_names"], allow_empty=False)
def admin_friendship_links_sort():
    """
    通过前端拖拽后的友链排序数组，更新数据库中的友链配置信息排序
    {
        "sorted_names": ["网盘", "浏览器", "小说"]
    }
    """
    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]

    # 获取参数
    post_data = request.json
    sorted_names = post_data.get("sorted_names", [])

    coll = mongodb_base.get_collection(collection="d_friendship_links")

    result = []

    for index, name in enumerate(sorted_names):
        filter_dict = {"name": name}
        update_data = {"$set": {"index": index}}

        update_result = mongodb_update_data(
            coll_conn=coll,
            filter_dict=filter_dict,
            update_data=update_data,
        )

        if update_result["status"]:
            # 成功更新
            result.append(
                {
                    **UniResponse.SUCCESS,
                    ResponseField.INFO: f"成功更新name: {name} 的排序为 {index}",
                }
            )
        else:
            result.append(
                {
                    **UniResponse.PARAM_ERR,
                    **{
                        ResponseField.DATA: {
                            ResponseField.ERR_MSG: f"尝试更新 name: {name}, 失败"
                        }
                    },
                }
            )
            app_logger.error(f"API{request.path}尝试更新 name: {name}, 失败")

    return response_handle(request=request, dict_value=result)
