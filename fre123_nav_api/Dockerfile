FROM howie6879/python:3.11-slim 
ENV APP_ROOT=/data/code \
    TIME_ZONE=Asia/Shanghai
WORKDIR ${APP_ROOT}/
COPY . ${APP_ROOT}
RUN rm -rf .git \
    && pip install --upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple/ \
    && pip install --no-cache-dir -i https://pypi.tuna.tsinghua.edu.cn/simple/ pipenv \
    && pipenv install --skip-lock \
    && echo "${TIME_ZONE}" > /etc/timezone \
    && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime \
    && find . -name "*.pyc" -delete
CMD ["pipenv", "run", "api", "pro"]
