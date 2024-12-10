"""
    Created by burger at 2024-08-13.
    Description: 新增友链配置信息
    Changelog: all no_idle changes to this file will be documented
"""

from datetime import datetime

from flask import current_app, request

from src.common import (
    ResponseField,
    UniResponse,
    auth_post_params,
    jwt_required,
    response_handle,
)
from src.config import Config
from src.databases import MongodbBase, mongodb_find, mongodb_insert_many_data


@jwt_required()
@auth_post_params(keys=["name"], allow_empty=False)
def admin_friendship_links_insert():
    """
    新增友链配置信息
    请求体应包含:
    {
        "name" : "测试一波",
        "status" : 0,
        "index":,
        "list" : [
            {
                "row_id" : "7b058ca0-bc15-4ffb-8739-d214f8783e",
                "name" : "七猫小说",
                "status" : 0,
                "url" : "https://www.qimao.com/",
                "logo_url" : "https://img.onlinedown.net/download/202011/140037-5fb4b8857a558.jpg",
                "description" : "灌灌灌灌灌灌灌灌灌灌灌灌"
            }
        ]
    }
    name: 友链名称，必须且唯一
    """

    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]

    # 获取参数
    post_data = request.json
    name = post_data.get("name", "")
    index = post_data.get("index", 0)
    _list = post_data.get("list", [])

    coll = mongodb_base.get_collection(collection="d_friendship_links")

    # 设置rows中的created_at和updated_at为当前时间戳
    if _list:
        current_time = int(datetime.now().timestamp())
        for row in _list:
            row["created_at"] = current_time
            row["updated_at"] = current_time

    # 检查name是否重复
    find_dict = {"name": name}
    existing_entry = mongodb_find(coll_conn=coll, filter_dict=find_dict)
    if existing_entry["info"] and existing_entry["status"]:
        result = {
            **UniResponse.PARAM_ERR,
            ResponseField.ERR_MSG: f"已存在相同的name: {name}",
        }
        app_logger.error(f"API{request.path}已存在相同的name: {name}")
    elif existing_entry["status"] is False:
        result = {
            **UniResponse.DB_ERR,
            ResponseField.ERR_MSG: "数据库出错",
        }
        app_logger.error(f"API{request.path}数据库出错")
    else:
        if not index:
            # 获取当前集合中的文档数量
            doc_count = coll.count_documents({})
            # 设置新文档的index
            post_data["index"] = doc_count

        # 设置 created_at 和 updated_at 字段
        current_time = int(datetime.now().timestamp())
        data = {"created_at": current_time, **post_data}

        # 执行插入操作
        insert_result = mongodb_insert_many_data(coll_conn=coll, data=[data])

        if insert_result["status"]:
            # 成功插入
            result = {
                **UniResponse.SUCCESS,
                ResponseField.INFO: f"成功新增{name}友链配置信息",
            }
        else:
            result = {
                **UniResponse.PARAM_ERR,
                **{
                    ResponseField.DATA: {
                        ResponseField.ERR_MSG: f"尝试新增{name}友链配置信息失败"
                    }
                },
            }
            app_logger.error(f"API{request.path}尝试新增{name}友链配置信息失败")

    return response_handle(request=request, dict_value=result)
