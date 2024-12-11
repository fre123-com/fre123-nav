#!/bin/bash

echo "==================================开始执行打包操作===================================="

version="v0.1.0"

# 
echo "开始打包 api 镜像"
cd ../fre123_nav_api && docker buildx build --no-cache=true --platform linux/amd64 -t fre123-nav-api:$version -f Dockerfile .
#
# echo "开始打包 web 镜像"
# cd ../fre123_nav_web && docker buildx build --no-cache=true --platform linux/amd64 -t fre123-nav-web:$version -f Dockerfile .
#
# echo "开始打包 admin 镜像"
# cd ../fre123_nav_admin && docker buildx build --no-cache=true --platform linux/amd64 -t fre123-nav-admin:$version -f Dockerfile .





