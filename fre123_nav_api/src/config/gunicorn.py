"""
    Created by howie at 2024-07-15.
    Description: Gunicorn 配置文件
    Changelog: all notable changes to this file will be documented
"""

import os

WORKERS = int(os.getenv("WORKERS", 2))
MAX_REQUEST = int(os.getenv("MAX_REQUEST", 100000))
PORT = int(os.getenv("PORT", 8765))

"""gunicorn WSGI server configuration."""
bind = f"0.0.0.0:{PORT}"
worker_class = "gevent"
workers = WORKERS
graceful_timeout = 30
max_requests = MAX_REQUEST
preload = True
timeout = 120
"""end gunicorn WSGI server configuration."""
