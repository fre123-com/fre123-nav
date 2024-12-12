"""
    Created by howie at 2024-07-15.
    Description: Redis 连接类，使用前请确保 pipenv install redis
    Changelog: all notable changes to this file will be documented
"""

import redis

try:
    import cPickle as pickle
except ImportError:
    import pickle


class PerRedis(redis.Redis):
    """
    自定义一些redis操作命令处理方式
    """

    def s_get(self, name, serializable=False):
        """
        Return the value at key ``name``, or None if the key doesn't exist
        """
        result = self.execute_command("GET", name)
        if serializable:
            try:
                result = pickle.loads(result)
            except Exception:
                result = None
        return result


class RedisBase:
    """
    Redis连接类
    """

    _db = {}

    def __init__(self, redis_config: dict):
        if redis_config:
            self.redis_config = redis_config
        else:
            raise ValueError("redis_config is expected!")

    def pool_client(self, db: int = None):
        """
        客户端连接池
        """
        host = self.redis_config.get("host", "127.0.0.1")
        port = self.redis_config.get("port", 6379)
        db = db if db is not None else self.redis_config.get("db", 0)
        password = (
            self.redis_config.get("password", "")
            if self.redis_config.get("password", "")
            else None
        )
        # decode_responses=True
        pool = redis.ConnectionPool(host=host, port=port, db=db, password=password)
        return PerRedis(connection_pool=pool)

    def get_db(self, *, db: int = None) -> PerRedis:
        """
        获取redis的连接实例
        :param db:
        :return:
        """
        if db is None:
            db = self.redis_config.get("db", 0)

        if db not in self._db:
            self._db[db] = self.pool_client(db)

        return self._db[db]
