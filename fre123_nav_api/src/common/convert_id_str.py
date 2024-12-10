"""
    Created by howie.hu at 2024-08-13.
    Description: 将ObjectId转换为字符串
    Changelog: all notable changes to this file will be documented
"""


def convert_id_str(data):
    """将mongodb中的ObjectId转换为字符串"""
    if isinstance(data, list):
        for doc in data:
            if "_id" in doc:
                doc["_id"] = str(doc["_id"])
    elif isinstance(data, dict):
        if "_id" in data:
            data["_id"] = str(data["_id"])
    return data
