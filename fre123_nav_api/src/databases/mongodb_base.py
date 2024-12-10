"""
    Created by howie at 2024-07-15.
    Description: MongoDB 连接类，使用前请确保 pipenv install pymongo
    Changelog: all notable changes to this file will be documented
"""

from pymongo.mongo_client import MongoClient

from src.utils.tools import md5_encryption


class MongodbBase:
    """
    Mongodb连接类
    """

    _db = {}
    _collection = {}

    def __init__(self, mongodb_config: dict):
        self.mongodb_config = mongodb_config
        self.mongodb_uri = self.mongodb_config.get("mongodb_uri")
        self.client = MongoClient(self.mongodb_uri)

    def get_db(self, db_name: str = ""):
        """
        获取数据库实例
        :param db_name: database name
        :return: the mongodb db instance
        """

        if not db_name:
            db_name = self.mongodb_config["operate_db"]
        if db_name not in self._db:
            self._db[db_name] = self.client[db_name]

        return self._db[db_name]

    def get_collection(self, db_name: str = "", *, collection):
        """
        获取集合
        :param db_name: database name
        :param collection: collection name
        :return: the mongodb collection instance
        """
        if not db_name:
            db_name = self.mongodb_config["operate_db"]
        collection_key = db_name + collection
        if collection_key not in self._collection:
            self._collection[collection_key] = self.get_db(db_name)[collection]

        return self._collection[collection_key]


class MongodbManager:
    """
    管理Mongodb实例
    """

    _mongodb_dict = {}

    @classmethod
    def get_mongo_base(cls, mongodb_config: dict) -> MongodbBase:
        """
        获取MongoDB的实例化对象
        """
        mongodb_key = md5_encryption(f"{mongodb_config}")
        if mongodb_key not in cls._mongodb_dict:
            cls._mongodb_dict[mongodb_key] = MongodbBase(mongodb_config)
        return cls._mongodb_dict[mongodb_key]
