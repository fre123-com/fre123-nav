"""
    Created by burger at 2024-08-14.
    Description: 新增广告配置信息
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
@auth_post_params(keys=["title", "start_ts", "end_ts"], allow_empty=False)
def admin_surprise_insert():
    """
    新增网站信息
    请求体应包含:
    {
        "title" : "格力空调大促销",
        "allowed_close" : 0,
        "is_show" : 1,
        "type" : 3,
        "img_url" : "https://img2.baidu.com/it/u=2689236790,3198016783&fm=253&fmt=auto&app=138&f=JPEG?w=900&h=500",
        "description" : "悠悠两周年，不灭传奇情",
        "position" : 2,
        "url" : "https://baike.baidu.com/item/%E4%BC%A0%E5%A5%87/9055?fr=ge_ala",
        "start_ts" : 1723564800,
        "end_ts" : 1725033599
    }
    title:必须且唯一，广告标题
    start_ts:广告开始时间戳,必须
    end_ts:广告结束时间戳,必须
    start_ts和end_ts时间戳必须合法且end_ts>start_ts
    """

    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]

    # 获取参数
    post_data = request.json
    title = post_data.get("title", "")
    start_ts = post_data.get("start_ts", "")
    end_ts = post_data.get("end_ts", "")

    coll = mongodb_base.get_collection(collection="d_surprise")

    if start_ts > end_ts:
        result = {
            **UniResponse.PARAM_ERR,
            **{
                ResponseField.DATA: {
                    ResponseField.ERR_MSG: "时间不合法,请检查开始时间和结束时间"
                }
            },
        }
        app_logger.error(f"API{request.path} 时间不合法")
    else:
        # 检查title是否重复
        find_dict = {"title": title}
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
            # 设置 created_at 和 updated_at 字段
            post_data["created_at"] = int(datetime.now().timestamp())
            post_data["updated_at"] = int(datetime.now().timestamp())

            # 执行插入操作
            insert_result = mongodb_insert_many_data(coll_conn=coll, data=[post_data])

            if insert_result["status"]:
                # 成功插入
                result = {
                    **UniResponse.SUCCESS,
                    ResponseField.INFO: f"成功新增{title}广告信息",
                }
            else:
                result = {
                    **UniResponse.PARAM_ERR,
                    **{
                        ResponseField.DATA: {
                            ResponseField.ERR_MSG: "尝试新增广告信息失败"
                        }
                    },
                }
                app_logger.error(f"API{request.path}尝试新增广告信息失败")

    return response_handle(request=request, dict_value=result)
