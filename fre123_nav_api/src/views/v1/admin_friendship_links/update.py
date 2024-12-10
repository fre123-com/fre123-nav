"""
    Created by burger at 2024-07-22.
    Description: 更新友链配置信息
    Changelog: all no_idle changes to this file will be documented
"""

from datetime import datetime

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


@jwt_required()
@auth_post_params(keys=["_id", "name"], allow_empty=False)
def admin_friendship_links_update():
    """
    更新指定_id的网站信息
    请求体应包含:{
        "_id": "66c411b7ef8e59ac19a365dd",
        "created_at" : "2024-08-13 13:58:10",
        "name" : "小说测试",
        "status" : 0,
        "list" : [
            {
                "row_id" : "7b058ca0-bc15-4ffb-8739-d215d4f8783e",
                "name" : "七猫小说",
                "status" : 0,
                "created_at":1724079034,
                "updated_at":1724079034,
                "url" : "https://www.qimao.com/",
                "logo_url" : "https://img.onlinedown.net/download/202011/140037-5fb4b8857a558.jpg",
                "description" : "七猫小说，看歪嘴龙王"
                },
            {
                "row_id" : "7b058ca0-bc14-4ffb-8739-d215d4f8783e",
                "name" : "番茄小说",
                "status" : 0,
                "created_at":1724079034,
                "updated_at":1724079034,
                "url" : "https://www.qimao.com/",
                "logo_url" : "https://img.onlinedown.net/download/202011/140037-5fb4b8857a558.jpg",
                "description" : "番茄小说，看霸道总裁"
                }
            ]
    }
    _id:必须,获取的_id名称
    name:必须,获取的name名称，可以被修改但不能重复
    """

    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]

    # 获取参数
    post_data = request.json
    _id = post_data.get("_id", "")
    name = post_data.get("name", "")
    _list = post_data.get("list", [])

    coll = mongodb_base.get_collection(collection="d_friendship_links")

    # 把_id转换为ObjectId
    try:
        obj_id = ObjectId(_id)
    except Exception:
        obj_id = None

    if obj_id:
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
            # 检查name是否重复
            find_dict = {"name": name, "_id": {"$ne": obj_id}}
            existing_entry = mongodb_find(coll_conn=coll, filter_dict=find_dict)
            if existing_entry["info"] and existing_entry["status"]:
                result = {
                    **UniResponse.PARAM_ERR,
                    ResponseField.INFO: f"已存在相同的name: {name}",
                }
                app_logger.error(f"API{request.path}已存在相同的name: {name}")
            elif existing_entry["status"] is False:
                result = {
                    **UniResponse.DB_ERR,
                    ResponseField.ERR_MSG: "数据库出错",
                }
                app_logger.error(f"API{request.path}数据库出错")
            else:
                # 获取现有文档
                existing_doc = existing_id_doc["info"][0]

                # 处理 list 中的字段
                if _list:
                    for item in post_data["list"]:
                        # 查找现有文档中的对应项
                        existing_item = next(
                            (
                                x
                                for x in existing_doc["list"]
                                if x.get("row_id") == item.get("row_id")
                            ),
                            None,
                        )
                        if existing_item:
                            # 保持数据库中的 created_at 值
                            item["created_at"] = existing_item.get(
                                "created_at", int(datetime.now().timestamp())
                            )
                            # 复制 existing_item 并去掉 created_at 和 updated_at 字段
                            existing_item_copy = existing_item.copy()
                            existing_item_copy.pop("updated_at", None)

                            if item != existing_item_copy:
                                # 更新 updated_at 字段
                                item["updated_at"] = int(datetime.now().timestamp())
                            else:
                                # 保持原有的 updated_at 值
                                item["updated_at"] = existing_item.get("updated_at")
                        else:
                            # 如果没有对应的数据，created_at 基于当前时间生成
                            item["created_at"] = int(datetime.now().timestamp())
                            # 更新 updated_at 字段
                            item["updated_at"] = int(datetime.now().timestamp())

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
                    result = {
                        **UniResponse.SUCCESS,
                        ResponseField.INFO: f"成功更新{_id} 的网站基本配置信息",
                    }
                else:
                    result = {
                        **UniResponse.PARAM_ERR,
                        **{
                            ResponseField.DATA: {
                                ResponseField.ERR_MSG: f"尝试更新 _id: {_id},失败"
                            }
                        },
                    }
                    app_logger.error(f"API{request.path}尝试更新 _id: {_id},失败")
    else:
        result = {
            **UniResponse.PARAM_ERR,
            **{ResponseField.DATA: {ResponseField.ERR_MSG: f"无效的_id: {_id}"}},
        }
        app_logger.error(f"API{request.path}无效的_id: {_id}")

    return response_handle(request=request, dict_value=result)
