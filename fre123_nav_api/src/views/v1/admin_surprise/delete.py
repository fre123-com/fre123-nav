"""
    Created by burger at 2024-07-21.
    Description: 删除广告配置信息
    Changelog: all notable changes to this file will be documented
"""

from bson import ObjectId
from flask import current_app, request

from src.common import (
    ResponseField,
    UniResponse,
    auth_post_params,
    jwt_required,
    response_handle,
)
from src.config import Config
from src.databases import MongodbBase, mongodb_delete_many_data
from src.helper.refresh_cache import web_config_refresh_cache


@jwt_required()
@auth_post_params(keys=["ids"], allow_empty=False)
def admin_surprise_delete():
    """
    通过ids删除对应广告信息
    {
        "ids":["66bc17cfe7a0430157ecb62e","66bba30e0a315709a4398b01"]
    }
    ids:必须,删除的ids名称列表，可以进行多个删除
    """
    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]
    cache = current_app.config["cache"]

    # 获取参数
    post_data = request.json
    ids = post_data.get("ids", "")
    b_ids = [ObjectId(id) for id in ids]

    coll = mongodb_base.get_collection(collection="d_surprise")

    # 删除对应ids的广告信息
    delete_dict = {"_id": {"$in": b_ids}}
    group_doc = mongodb_delete_many_data(coll_conn=coll, filter_dict=delete_dict)
    if group_doc["status"]:
        web_config_refresh_cache(cache)
        result = {
            **UniResponse.SUCCESS,
            ResponseField.INFO: f"成功删除ids {ids} 的广告信息",
        }
    else:
        result = {
            **UniResponse.PARAM_ERR,
            **{ResponseField.INFO: "删除失败"},
        }
        app_logger.error(f"API{request.path}删除失败")

    return response_handle(request=request, dict_value=result)
