FROM hub.zftycdn.top/library/node:18.17-alpine as builder

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=16384"
COPY . .

RUN yarn && export VITE_BACKEND_API=http://localhost && yarn build

FROM hub.zftycdn.top/library/node:18.17-alpine

ENV APP_ROOT=/data/code
ENV TIME_ZONE=Asia/Shanghai

RUN echo "${TIME_ZONE}" > /etc/timezone \
  && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime \
  && mkdir -p ${APP_ROOT}/.output

COPY --from=builder /app/.output ${APP_ROOT}/.output
COPY ./deploy/start.sh  ${APP_ROOT}

WORKDIR ${APP_ROOT}

RUN chmod a+x start.sh
EXPOSE 3000

ENTRYPOINT ["/bin/sh", "start.sh"]
