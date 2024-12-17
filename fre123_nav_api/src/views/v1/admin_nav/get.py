"""
    Created by burger at 2024-07-21.
    Description: 获得导航配置信息
    Changelog: all notable changes to this file will be documented
"""

from flask import current_app, request

from src.common import ResponseField, UniResponse, jwt_required, response_handle
from src.config import Config
from src.databases import MongodbBase, mongodb_find_by_page


@jwt_required()
def admin_nav_get():
    """
    通过group_name获取对应导航信息
    {
        "group_name":""
        "status":-1,
        "page":1,
        "page_size":10
    }
    group_name:可选,获取的group_name名称
    status:可选,获取的状态,默认为-1
    page:可选,获取的页数,默认为1
    page_size:可选,获取的页数大小,默认为10
    """
    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]

    # 获取参数
    post_data = request.json
    group_name = post_data.get("group_name", "")
    status = int(post_data.get("status", -1))
    page = int(post_data.get("page", 1))
    page_size = int(post_data.get("page_size", 10))

    coll = mongodb_base.get_collection(collection="d_nav")

    filter_dict = {"group_name": {"$regex": group_name, "$options": "i"}}
    sorted_list = [("index", 1)]
    if status != -1:
        filter_dict["status"] = status
    # 获取对应group_name的导航信息
    db_res = mongodb_find_by_page(
        coll_conn=coll,
        filter_dict=filter_dict,
        size=page_size,
        page=page,
        sorted_list=sorted_list,
    )
    if db_res["status"]:
        result = {
            **UniResponse.SUCCESS,
            ResponseField.DATA: db_res["info"],
        }
    else:
        result = {
            **UniResponse.DB_ERR,
            **{ResponseField.DATA: {ResponseField.ERR_MSG: "获取导航信息失败！"}},
        }
        app_logger.error(f"API{request.path}获取导航信息失败,name: {group_name}")

    return response_handle(request=request, dict_value=result)
