"""
    Created by burger at 2024-07-21.
    Description: 前台配置获取接口
    Changelog: all notable changes to this file will be documented
"""


from flask import current_app, request

from src.common import ResponseField, UniResponse, response_handle
from src.databases import MongodbBase, mongodb_find


# @token_required()
def config_get():
    """
    前台配置获取接口
    {
    }
    """
    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]

    site_coll = mongodb_base.get_collection(collection="d_site_config")
    nav_coll = mongodb_base.get_collection(collection="d_nav")
    surprise_coll = mongodb_base.get_collection(collection="d_surprise")
    friendship_coll = mongodb_base.get_collection(collection="d_friendship_links")

    continue_status = True
    db_json = {}

    if continue_status:
        site_res = mongodb_find(
            coll_conn=site_coll, filter_dict={}, return_dict={"_id": 0}
        )
        if not site_res["status"]:
            continue_status = False
            result = {
                **UniResponse.DB_ERR,
                **{ResponseField.DATA: {ResponseField.ERR_MSG: site_res["info"]}},
            }
            app_logger.error(
                f"API {request.path} d_site_config 集合数据获取失败! {site_res['info']}"
            )
        else:
            if site_res["info"]:
                for site_info in site_res["info"]:
                    site_info[site_info["type"]] = site_info["config"]
                    del site_info["type"]
                    del site_info["config"]
            db_json["site"] = site_res["info"]

    if continue_status:
        nav_res = mongodb_find(
            coll_conn=nav_coll, filter_dict={}, return_dict={"_id": 0}
        )
        if not nav_res["status"]:
            continue_status = False
            result = {
                **UniResponse.DB_ERR,
                **{ResponseField.DATA: {ResponseField.ERR_MSG: nav_res["info"]}},
            }
            app_logger.error(f"API {request.path} d_nav 集合数据获取失败! {nav_res['info']}")
        else:
            db_json["nav"] = nav_res["info"]

    if continue_status:
        surprise_res = mongodb_find(
            coll_conn=surprise_coll,
            filter_dict={"is_show": 1},
            return_dict={"_id": 0},
        )
        if not surprise_res["status"]:
            continue_status = False
            result = {
                **UniResponse.DB_ERR,
                **{ResponseField.DATA: {ResponseField.ERR_MSG: surprise_res["info"]}},
            }
            app_logger.error(
                f"API {request.path} d_surprise 集合数据获取失败! {surprise_res['info']}"
            )
        else:
            db_json["surprise"] = surprise_res["info"]

    if continue_status:
        friendship_res = mongodb_find(
            coll_conn=friendship_coll,
            filter_dict={"status": 1},
            return_dict={"_id": 0},
        )
        if not friendship_res["status"]:
            continue_status = False
            result = {
                **UniResponse.DB_ERR,
                **{ResponseField.DATA: {ResponseField.ERR_MSG: friendship_res["info"]}},
            }
            app_logger.error(
                f"API {request.path} d_friendship_links 集合数据获取失败! {friendship_res['info']}"
            )
        else:
            db_json["friendship_links"] = friendship_res["info"]

    result = {**UniResponse.SUCCESS, **{ResponseField.DATA: db_json}}

    return response_handle(request=request, dict_value=result)
