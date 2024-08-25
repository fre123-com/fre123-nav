FROM node:16.17 as builder

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=16384"
COPY . .

# RUN npm install -g yrm --registry https://registry.npm.taobao.org
# RUN yrm add local http://192.168.1.17:4873
# RUN yrm use local
# RUN yarn config set registry http://192.168.1.17:4873
RUN yarn && yarn build

FROM nginx

ENV APP_ROOT=/data/code
ENV TIME_ZONE=Asia/Shanghai

RUN echo "${TIME_ZONE}" > /etc/timezone \
    && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime

COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR ${APP_ROOT}/
COPY ./deploy/nginx_start.sh  ${APP_ROOT}
RUN chmod a+x nginx_start.sh

EXPOSE 80
ENTRYPOINT ["/bin/bash", "nginx_start.sh"]