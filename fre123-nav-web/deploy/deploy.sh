#!/bin/sh
# Web项目镜像构建

# 直接打包
docker build --no-cache=false -t docker.zfty.work/nav-center/nav-toolbox-web:v0.1.0-test -f Dockerfile .
# 交叉打包
docker buildx build --no-cache=false --platform linux/amd64 -t docker.zfty.work/nav-center/nav-toolbox-web:v0.1.0-test -f Dockerfile .

# 运行测试
docker run -p 3001:3000 -e B_API=http://192.168.1.17:9080 docker.zfty.work/nav-center/nav-toolbox-web:v0.1.0-test
