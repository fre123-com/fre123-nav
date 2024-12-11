"""
    Created by burger at 2024-07-22.
    Description: 更新导航配置信息
    Changelog: all no_idle changes to this file will be documented
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
from src.databases import MongodbBase, mongodb_find, mongodb_update_data
from src.helper.refresh_cache import web_config_refresh_cache


@jwt_required()
@auth_post_params(keys=["_id", "group_name"], allow_empty=False)
def admin_nav_update():
    """
    更新指定_id的网站信息
    请求体应包含:
    {
        "_id": "66bb2ffa4d6d79125890b0f0",
        "group_name" : "测试3",
        "style" : 哥特风,
        "style_des" : "书籍资源2",
        "tab_list" : [],
        "group_name_url" : "",
    }
    _id:必须,获取的_id名称
    group_name:必须,获取的name名称，可以被修改但不能重复
    """

    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]
    cache = current_app.config["cache"]

    # 获取参数
    post_data = request.json
    _id = post_data.get("_id", "")
    group_name = post_data.get("group_name", "")

    coll = mongodb_base.get_collection(collection="d_nav")

    # 把_id转换为ObjectId
    try:
        obj_id = ObjectId(_id)
    except Exception:
        obj_id = None

    if obj_id:
        # 检查 _id 是否存在
        find_id_dict = {"_id": obj_id}
        existing_id_doc = mongodb_find(coll_conn=coll, filter_dict=find_id_dict)
        if not existing_id_doc["status"]:
            result = {
                **UniResponse.DB_ERR,
                ResponseField.ERR_MSG: "数据库出错",
            }
            app_logger.error(f"API{request.path}数据库出错")
        elif not existing_id_doc["info"]:
            result = {
                **UniResponse.PARAM_ERR,
                ResponseField.INFO: f"没有找到对应的_id: {_id}文档",
            }
            app_logger.error(f"API{request.path}没有找到对应的_id: {_id}文档")
        else:
            # 检查group_name是否重复
            find_dict = {"group_name": group_name, "_id": {"$ne": obj_id}}
            existing_entry = mongodb_find(coll_conn=coll, filter_dict=find_dict)
            if existing_entry["info"] and existing_entry["status"]:
                result = {
                    **UniResponse.PARAM_ERR,
                    ResponseField.INFO: f"已存在相同的group_name: {group_name}",
                }
                app_logger.error(f"API{request.path}已存在相同的group_name: {group_name}")
            elif existing_entry["status"] is False:
                result = {
                    **UniResponse.DB_ERR,
                    ResponseField.ERR_MSG: "数据库出错",
                }
                app_logger.error(f"API{request.path}数据库出错")
            else:
                # 确保 _id 字段不被修改
                if "_id" in post_data:
                    del post_data["_id"]

                # 执行更新操作
                filter_dict = {"_id": obj_id}
                update_data = {"$set": post_data}
                update_result = mongodb_update_data(
                    coll_conn=coll,
                    filter_dict=filter_dict,
                    update_data=update_data,
                )

                if update_result["status"]:
                    # 成功更新
                    web_config_refresh_cache(cache)
                    result = {
                        **UniResponse.SUCCESS,
                        ResponseField.INFO: f"成功更新{_id} 的网站基本配置信息",
                    }
                else:
                    result = {
                        **UniResponse.PARAM_ERR,
                        **{
                            ResponseField.DATA: {
                                ResponseField.ERR_MSG: f"尝试添加或更新 _id: {_id},失败"
                            }
                        },
                    }
                    app_logger.error(f"API{request.path}尝试添加或更新 _id: {_id},失败")
    else:
        result = {
            **UniResponse.PARAM_ERR,
            **{ResponseField.DATA: {ResponseField.ERR_MSG: f"无效的_id: {_id}"}},
        }
        app_logger.error(f"API{request.path}无效的_id: {_id}")

    return response_handle(request=request, dict_value=result)
