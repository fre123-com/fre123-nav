<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/logo.png" width="100" height="100">
</p>
<h1 align="center">Fre123 Nav</h1>

> 👀 一键搭建自定义导航网站，简洁优雅，你值得拥有

在线体验：

- FRE123 导航：[https://www.fre123.com](https://www.fre123.com)
- FRE123 信息流：开源地址 👉 https://github.com/fre123-com/fre123-info-flow
  - 技术周刊精选：[https://www.fre123.com/weekly](https://www.fre123.com/weekly)
  - 全网热点资讯：[https://www.fre123.com/news](https://www.fre123.com/news)
  - 技术热点资讯：[https://www.fre123.com/tech](https://www.fre123.com/tech)

## 特性

![Fre123 Nav](https://cdn.jsdelivr.net/gh/fre123-com/fre123-nav@main/.files/images/index.jpg)

项目特点：

- 简洁易用：界面简洁易用，支持 `Docker` 快速部署
- 易于管理：支持通过可视化管理后台进行配置，方便管理
- 数据独立：数据完全由用户自定义控制
- 技术支持：底部关注公众号加交流群

## 部署

> 本项目包含前后台功能，涉及到多个服务，推荐使用 `Docker` 部署。

环境要求：

- `Docker`
- `Docker-Compose`

### Docker 快速部署

```
# 克隆项目
git clone https://github.com/fre123-com/fre123-nav.git

# 进入部署目录
cd deploy

# 拉取镜像
docker-compose pull

# 启动服务
docker-compose up -d

# 其他指令
# 查看服务状态
docker-compose ps

# 停止服务
docker-compose down
```

## 功能清单

以下是项目的待办事项和未来计划：

- [x] 网站配置
- [x] 导航管理
- [x] 广告管理
- [x] 友链管理
- [ ] 支持多风格部署

## QA

> 为什么要做这个项目？

详情见：[FRE123 启动计划](https://mp.weixin.qq.com/s/6El2AW93K4RiEHhma3vVPg)

> 我可以提交我搭建的导航网站吗？

可以，欢迎任何人分享自己搭建的导航网站，具体见：[Fre123 导航网站提交指南](https://www.fre123.com/pub_nav)，有任何问题欢迎加我微信沟通。

> 有资源共享群么？

有的，同上联系老胡后拉你进群，本群都是热爱分享的朋友，只想潜水勿进，谢谢

## 说明

欢迎加入我们的交流群，一起交流学习：

- 关注公众号：[老胡的储物柜](https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/wechat.jpeg)
- 回复 `加群` 即可加入我们的交流群

该项目由 `FRE123` 团队维护，如果您在使用该项目时遇到任何问题，请随时提交 `issue` 或联系我们。

技术交流群 🤖：

<p align="center">
  <img src=".files/images/w_group.jpg" width="50%">
</p>

PS：目前开源版本仅为基本的功能，如果想体验更丰富的功能，请关注公众号：[老胡的储物柜](https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/wechat.jpeg) 了解更多。

## 功能对比

| 功能     | 免费版           | 付费版 |
| -------- | ---------------- | ------ |
| 网站配置 | 是               | 是     |
| 导航管理 | 是               | 是     |
| 广告管理 | 只支持右下角广告 |        |
| 友链管理 | 是               | 是     |

## 贡献者

感谢以下贡献者为本项目做出的贡献：

| 贡献者     | GitHub 账号                                 | 贡献描述                 |
| ---------- | ------------------------------------------- | ------------------------ |
| linsk27    | [linsk27](https://github.com/linsk27)       | 负责后台友链管理模块开发 |
| FantasyBee | [FantasyBee](https://github.com/FantasyBee) | 负责后台网站配置功能开发 |
| KlayPeter  | [KlayPeter](https://github.com/KlayPeter)   | 负责后台广告管理         |
| sansanyi   | [sansanyi](https://github.com/sansanyi)     | 负责后台导航管理         |
| a-b-ab     | [a-b-ab](https://github.com/a-b-ab)         | 后台管理相关接口开发支持 |
| hoiii13    | [hoiii13](https://github.com/hoiii13)       | 前台导航核心功能开发     |
| shenpormax | [shenpormax](https://github.com/shenpormax) | 后端核心功能开发+优化    |
