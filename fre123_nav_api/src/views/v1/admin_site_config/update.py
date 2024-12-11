"""
    Created by burger at 2024-07-19.
    Description: 更新网站基础配置信息
    Changelog: all notypele changes to this file will be documented
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
from src.databases import MongodbBase, mongodb_update_data


@jwt_required()
@auth_post_params(keys=["type"], allow_empty=False)
def admin_site_config_update():
    """
    更新指定type的网站信息
    请求体应包含:{
        "type": "pendant",
        "data": {
            "is_show": true,
            "list": [
                {
                    "icon_class": "fab",
                    "icon_size": 20,
                    "icon_color": "#001b140",
                    "icon_hover_color": "#00811733",
                    "text": "风",
                    "img": "不要",
                    "url": ""
                },
                {
                    "icon_class": "fabane",
                    "icon_size": 20,
                    "icon_color": "#0088cc",
                    "icon_hover_color": "#085b85",
                    "text": "关注老胡TG",
                    "img": "",
                    "url": "https://t.me/howie_weekly111"
                }
            ]
         }
    }
    type:必须,获取的type名称,只能取base,seo,pendant,footer,header
    """

    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]

    # 获取参数
    post_data = request.json
    _type = post_data.get("type", "")
    data = post_data.get("data", {})

    coll = mongodb_base.get_collection(collection="d_site_config")

    # 执行更新操作
    filter_dict = {"type": _type}
    update_data = {"$set": {"config": data}}
    update_result = mongodb_update_data(
        coll_conn=coll, filter_dict=filter_dict, update_data=update_data, upsert=True
    )
    update_res_info = update_result["info"]
    if update_result["status"]:
        # 成功更新
        result = {
            **UniResponse.SUCCESS,
            ResponseField.INFO: f"成功更新{_type} 的网站基本配置信息",
        }
    else:
        result = {
            **UniResponse.DB_ERR,
            **{ResponseField.DATA: {ResponseField.ERR_MSG: update_res_info}},
        }
        app_logger.error(
            f"API{request.path} 尝试添加或更新失败 type({_type}),err:{update_res_info}"
        )

    return response_handle(request=request, dict_value=result)
