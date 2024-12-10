"""
    Created by howie at 2024-07-15.
    Description: MongoDB 操作类，使用前请确保 pipenv install pymongo
    Changelog: all notable changes to this file will be documented
"""

from bson import ObjectId


def mongodb_delete_many_data(coll_conn, filter_dict: dict) -> dict:
    """
    删除对应条件数据
    :param coll_conn: 集合连接对象
    :param filter_dict: 条件字典
    :return: dict
    """
    db_result = {"status": True, "info": ""}
    try:
        coll_conn.delete_many(filter=filter_dict)
    except Exception as e:
        db_result["status"] = False
        db_result["info"] = str(e)
    return db_result


def mongodb_find(
    coll_conn,
    filter_dict: dict,
    return_dict: dict = None,
    sorted_list: list = None,
    limit: int = None,
) -> dict:
    """找到满足条件的所有记录
    Args:
        coll_conn ([type]): 集合连接对象
        filter_dict (dict): 条件字典
        return_dict (dict, optional): 返回条件字典
        sorted_list (list, optional): 排序元组 (key, -1) 1 正序，逐渐变大 -1 倒序 逐渐变小
        limit (int, optional): 返回查询数量
    Returns:
        dict: 结果字典
    """
    db_result = {"status": True, "info": ""}
    try:
        res = []
        if return_dict:
            cursor = coll_conn.find(filter_dict, return_dict)
        else:
            cursor = coll_conn.find(filter_dict)
        cursor = cursor.sort(sorted_list) if sorted_list else cursor
        cursor = cursor.limit(limit) if limit else cursor
        for document in cursor:
            res.append(document)
        db_result["info"] = res
    except Exception as e:
        db_result["status"] = False
        db_result["info"] = str(e)
    return db_result


def mongodb_find_by_page(
    coll_conn,
    filter_dict: dict,
    size: int,
    page: int,
    return_dict: dict = None,
    sorted_list: list = None,
) -> dict:
    """
    分页查询
    Args:
        coll_conn (_type_): 集合连接对象
        filter_dict (dict): 条件字典
        size (int): 查询数量
        page (int): 查询页数
        return_dict (dict, optional): 返回条件字典. Defaults to None.
        sorted_list (list, optional): 排序元组 (key, -1) 1 正序，逐渐变大 -1 倒序 逐渐变小

    Returns:
        dict: 结果字典
    """
    db_result = {"status": True, "info": ""}
    try:
        res = []
        if return_dict:
            cursor = coll_conn.find(filter_dict, return_dict)
        else:
            cursor = coll_conn.find(filter_dict)
        cursor = cursor.sort(sorted_list) if sorted_list else cursor
        cursor = cursor.skip((page - 1) * size).limit(size)
        for document in cursor:
            # 将 ObjectId 转换为字符串
            if "_id" in document and isinstance(document["_id"], ObjectId):
                document["_id"] = str(document["_id"])
            res.append(document)
        db_result["info"] = {
            "total": coll_conn.count_documents(filter_dict),
            "rows": res,
        }
    except Exception as e:
        db_result["status"] = False
        db_result["info"] = str(e)
    return db_result


def mongodb_update_data(
    coll_conn, filter_dict: dict, update_data: dict, upsert: bool = True
) -> dict:
    """更新数据到 mongodb
    Args:
        coll_conn ([type]): 集合连接对象
        filter_dict (dict): 条件字典
        update_data (dict): 更新数据 {"$set": {}}
        upsert (bool, optional): True 存在更新，不存在插入，False 只更新 Defaults to True.
    Returns:
        dict: 结果字典
    """
    db_result = {"status": True, "info": ""}
    try:
        res = coll_conn.update_one(
            filter=filter_dict, update=update_data, upsert=upsert
        )
        db_result["info"] = str(res.upserted_id)
    except Exception as e:
        db_result["status"] = False
        db_result["info"] = str(e)
    return db_result


def mongodb_insert_many_data(coll_conn, data: list) -> dict:
    """
    插入数据到 mongodb
    :param coll_conn: 集合连接对象
    :param data: 待插入的多个数据
    :return: dict
    """
    db_result = {"status": True, "info": ""}
    try:
        coll_conn.insert_many(data)
    except Exception as e:
        if "duplicate key" in str(e):
            return db_result
        db_result["status"] = False
        db_result["info"] = str(e)
    return db_result


def mongodb_batch_operate(coll_conn, target_list: list) -> dict:
    """
    批量操作数据
    :param coll_conn: 集合连接对象
    :param target_list: 目标操作对象列表
    :return: dict
    """
    db_result = {"status": True, "info": ""}
    try:
        coll_conn.bulk_write(requests=target_list)
    except Exception as e:
        db_result["status"] = False
        db_result["info"] = str(e)
    return db_result
