"""
    Created by burger at 2024-07-21.
    Description: 获得广告配置信息
    Changelog: all notable changes to this file will be documented
"""

from flask import current_app, request

from src.common import ResponseField, UniResponse, jwt_required, response_handle
from src.config import Config
from src.databases import MongodbBase, mongodb_find_by_page


@jwt_required()
def admin_surprise_get():
    """
    通过title获取对应广告信息,可结合其他参数进行筛选
    {
        "title":"",
        "is_show":-1,
        "position":-1,
        "web_path":"all",
        "start_ts_range":[],
        "page":1,
        "page_size":10
    }
    title:可选,获取的title名称,模糊查询
    is_show:可选,广告获取的状态,默认为-1,获取全部,0为不展示,1为展示
    position:可选,广告位置,默认为-1,获取全部,1为居中弹窗,2为右下角
    web_path:可选,广告展示的web路径,默认为all,获取全部,global为全局展示,/为首页展示,/s为搜索结果展示,/d为详情页展示
    start_ts_range:可选,广告展示的时间范围,默认为[],获取全部,格式为[开始时间戳,结束时间戳]
    page:可选,获取的页数,默认为1
    page_size:可选,获取的页数大小,默认为10

    返回结果通过created_at进行排序
    """
    # 获取基本配置
    app_logger = current_app.config["app_logger"]
    mongodb_base: MongodbBase = current_app.config["mongodb_base"]
    _: Config = current_app.config["app_config"]

    # 获取参数
    post_data = request.json
    title = post_data.get("title", "")
    is_show = int(post_data.get("is_show", -1))
    position = int(post_data.get("position", -1))
    web_path = post_data.get("web_path", "all")
    start_ts_range = post_data.get("start_ts_range", [])
    page = int(post_data.get("page", 1))
    page_size = int(post_data.get("page_size", 10))

    coll = mongodb_base.get_collection(collection="d_surprise")

    filter_dict = {"title": {"$regex": title, "$options": "i"}}
    sorted_list = [("created_at", -1)]
    if is_show != -1:
        filter_dict["is_show"] = is_show
    if position != -1:
        filter_dict["position"] = position
    if web_path != "all":
        filter_dict["web_path"] = web_path
    if start_ts_range:
        filter_dict["start_ts"] = {"$gte": start_ts_range[0], "$lte": start_ts_range[1]}

    # 获取对应title的广告信息
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
            **{ResponseField.DATA: {ResponseField.ERR_MSG: "获取广告信息失败！"}},
        }
        app_logger.error(f"API{request.path}获取广告信息失败,name: {title}")

    return response_handle(request=request, dict_value=result)
