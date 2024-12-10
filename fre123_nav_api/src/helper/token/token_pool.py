"""
    Created by burger at 2024-07-18.
    Description: 
        - 构建token池,用于存储token
    Changelog: all notable changes to this file will be documented
"""

import time
import uuid

import jwt

from src.config import Config
from src.databases import RedisBase


class TokenPool:
    """
    构建token池,用于存储token
    实现了token的生成、初始化、获取、释放和验证
    """

    def __init__(self):
        """初始化"""
        # 创建RedisBase实例
        self.redis_base = RedisBase(redis_config=Config.REDIS_CONFIG)
        # 获取Redis连接实例，db为0
        self.redis_conn = self.redis_base.get_db()
        self.token_pool_key = "token_pool"  # redis中存储token的键

    def generate_token(self):
        """
        基于时间戳和uuid随机生成token
        return:返回生成的token字符串
        """
        timestamp = int(time.time())
        unique_id = uuid.uuid4()

        return f"{timestamp}-{unique_id}"

    def initialize_pool(self, token_count):
        """
        初始化token池
        param token_count:需要生成的token数量
        """
        tokens = [self.generate_token() for _ in range(token_count)]
        for token in tokens:
            self.redis_conn.sadd(self.token_pool_key, token)

    def get_token(self):
        """
        从token池中获取一个token
        return: 返回一个token或None(如果token池为空)
        """
        token = self.redis_conn.spop(self.token_pool_key)
        return token if token else None

    def release_token(self, token_to_release):
        """
        将Token返回到Token池中
        param token:要返回的Token字符串
        """
        self.redis_conn.sadd(self.token_pool_key, token_to_release)

    def validate_token(self, token):
        """
        验证token是否有效
        param token:要验证的token字符串
        return:返回True(有效)或False(无效)
        """
        try:
            parse_dict = self.jwt_parse(token, Config.APP_JWT_SECRET)
            jwt_data = parse_dict["data"]
            username = jwt_data.get("username")
            redis_key = f"token_pool:{username}"
            redis_token_str = self.redis_conn.get(redis_key)
            if redis_token_str:
                redis_token_dict = redis_token_str.decode("utf-8")
                if token == redis_token_dict:
                    return True
            return False
        except:
            return False

    def jwt_parse(self, jwt_token: str = "", jwt_secret: str = ""):
        """
        解析 jwt token
        :return: {}
        """
        try:
            payload = jwt.decode(jwt_token, jwt_secret, algorithms=["HS256"])
            exp = int(payload.get("exp", 0))
            if exp < int(time.time()):
                parse_dict = {
                    "status": False,
                    "info": "Token expired",
                    "data": {},
                }
            else:
                parse_dict = {
                    "status": True,
                    "info": "ok",
                    "data": payload,
                }
        except jwt.ExpiredSignatureError:
            parse_dict = {
                "status": False,
                "info": "Token expired",
                "data": {},
            }
        except jwt.InvalidTokenError:
            parse_dict = {
                "status": False,
                "info": "Invalid token",
                "data": {},
            }
        except Exception as e:
            parse_dict = {
                "status": False,
                "info": str(e),
                "data": {},
            }
        return parse_dict


if __name__ == "__main__":
    token_pool = TokenPool()
    token_pool.initialize_pool(5)  # 初始化5个token
