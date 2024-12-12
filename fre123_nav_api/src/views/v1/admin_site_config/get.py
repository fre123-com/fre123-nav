"""
    Created by burger at 2024-07-21.
    Description: 获得网站基本配置信息
    Changelog: all notable changes to this file will be documented
"""

from flask import current_app, request

from src.common import ResponseField, UniResponse, jwt_required, response_handle
from src.config import Config
from src.databases import MongodbBase, mongodb_find


@jwt_required()
def admin_site_config_get():
    """
    通过type获取对应网站基本信息
    {
        "type":""
    }
    type:可选,获取的type名称
    """
    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]

    # 获取参数
    post_data = request.json
    _type = post_data.get("type", "")

    coll = mongodb_base.get_collection(collection="d_site_config")

    # 获取对应type的网站基本信息
    find_dict = {"type": {"$regex": _type, "$options": "i"}}

    group_doc = mongodb_find(
        coll_conn=coll,
        filter_dict=find_dict,
        return_dict={"_id": 0, "type": 0},
        limit=1,
    )
    group_doc_info = group_doc["info"]
    if group_doc["status"]:
        group_doc_data = group_doc_info[0] if group_doc_info else {}
        result = {
            **UniResponse.SUCCESS,
            ResponseField.DATA: group_doc_data.get("config", {}),
        }
    else:
        result = {
            **UniResponse.DB_ERR,
            ResponseField.ERR_MSG: "数据库出错",
        }
        app_logger.error(f"API{request.path}数据库出错")

    return response_handle(request=request, dict_value=result)
