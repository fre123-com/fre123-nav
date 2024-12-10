"""
    Created by burger at 2024-07-22.
    Description: 更新广告配置信息
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
@auth_post_params(keys=["_id"], allow_empty=False)
def admin_surprise_update():
    """
    更新指定_id的网站信息
    请求体应包含:
    {
        "_id" : "66bb9e254d6d791258941800",
        "allowed_close" : 0,
        "is_show" : 1,
        "title" : "try3",
        "type" : 3,
        "img_url" : "https://img2.baidu.com/it/u=2689236790,3198016783&fm=253&fmt=auto&app=138&f=JPEG?w=900&h=500",
        "description" : "悠悠两周年，不灭传奇情",
        "web_path" : "",
        "position" : 2,
        "url" : "https://baike.baidu.com/item/%E4%BC%A0%E5%A5%87/9055?fr=ge_ala",
        "start_ts" : 1723564800,
        "end_ts" : 1725033599,
        "updated_at" : 1722860094,
        "created_at" : 1722860094
    }
    _id:必须,获取的_id名称
    title:必须,获取的title名称，可以被修改但不能重复
    """

    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]

    # 获取参数
    post_data = request.json
    _id = post_data.get("_id", "")
    title = post_data.get("title", "")
    start_ts = post_data.get("start_ts", "")
    end_ts = post_data.get("end_ts", "")

    coll = mongodb_base.get_collection(collection="d_surprise")

    # 把_id转换为ObjectId
    try:
        obj_id = ObjectId(_id)
    except Exception:
        obj_id = None

    if start_ts > end_ts:
        time_ok = False
    else:
        time_ok = True

    if obj_id and time_ok:
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
            # 检查title是否重复
            find_dict = {"title": title, "_id": {"$ne": obj_id}}
            existing_entry = mongodb_find(coll_conn=coll, filter_dict=find_dict)
            if existing_entry["info"] and existing_entry["status"]:
                result = {
                    **UniResponse.PARAM_ERR,
                    ResponseField.INFO: f"已存在相同的title: {title}",
                }
                app_logger.error(f"API{request.path}已存在相同的title: {title}")
            elif existing_entry["status"] is False:
                result = {
                    **UniResponse.DB_ERR,
                    ResponseField.ERR_MSG: "数据库出错",
                }
                app_logger.error(f"API{request.path}数据库出错")

            else:
                # 设置update_at字段
                post_data["updated_at"] = int(datetime.now().timestamp())

                # 确保 created_at 字段不被修改
                if "created_at" in post_data:
                    del post_data["created_at"]

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
                                ResponseField.ERR_MSG: f"尝试添加或更新 _id: {_id},失败"
                            }
                        },
                    }
                    app_logger.error(f"API{request.path}尝试添加或更新 _id: {_id},失败")
    elif not obj_id:
        result = {
            **UniResponse.PARAM_ERR,
            **{ResponseField.DATA: {ResponseField.ERR_MSG: f"无效的_id: {_id}"}},
        }
        app_logger.error(f"API{request.path}无效的_id: {_id}")

    elif not time_ok:
        result = {
            **UniResponse.PARAM_ERR,
            **{
                ResponseField.DATA: {
                    ResponseField.ERR_MSG: "时间不合法,请检查开始时间和结束时间"
                }
            },
        }
        app_logger.error(f"API{request.path} 时间不合法")

    return response_handle(request=request, dict_value=result)
