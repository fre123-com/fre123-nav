"""
    Created by burger at 2024-08-14.
    Description: 新增导航配置信息
    Changelog: all no_idle changes to this file will be documented
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
from src.databases import MongodbBase, mongodb_find, mongodb_insert_many_data


@jwt_required()
@auth_post_params(keys=["group_name"], allow_empty=False)
def admin_nav_insert():
    """
    新增导航信息
    请求体应包含:
    {
        "group_name" : "测试3",
        "style" : 哥特风,
        "style_des" : "书籍资源2",
        "tab_list" : [],
        "group_name_url" : "",
    }
    group_name: 导航名称，必须且唯一
    """

    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]

    # 获取参数
    post_data = request.json
    group_name = post_data.get("group_name", "")

    coll = mongodb_base.get_collection(collection="d_nav")

    # 检查group_name是否重复
    find_dict = {"group_name": group_name}
    existing_entry = mongodb_find(coll_conn=coll, filter_dict=find_dict)
    if existing_entry["info"] and existing_entry["status"]:
        result = {
            **UniResponse.PARAM_ERR,
            **{
                ResponseField.DATA: {
                    ResponseField.ERR_MSG: f"group_name '{group_name}' 已存在"
                }
            },
        }
        app_logger.error(f"API{request.path}group_name '{group_name}' 已存在")
    elif existing_entry["status"] is False:
        result = {
            **UniResponse.DB_ERR,
            ResponseField.ERR_MSG: "数据库出错",
        }
        app_logger.error(f"API{request.path}数据库出错")
    else:
        # 执行新增操作
        insert_result = mongodb_insert_many_data(coll_conn=coll, data=[post_data])

        if insert_result["status"]:
            # 成功新增
            result = {
                **UniResponse.SUCCESS,
                ResponseField.INFO: f"成功新增{group_name}导航配置信息",
            }
        else:
            result = {
                **UniResponse.PARAM_ERR,
                **{
                    ResponseField.DATA: {
                        ResponseField.ERR_MSG: f"尝试新增{group_name}导航配置信息失败"
                    }
                },
            }
            app_logger.error(f"API{request.path}尝试新增{group_name}导航配置信息失败")

    return response_handle(request=request, dict_value=result)
