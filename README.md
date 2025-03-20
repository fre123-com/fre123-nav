<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/logo.png" width="100" height="100">
</p>
<h1 align="center">Fre123 Nav</h1>

> 👀 一键搭建自定义导航网站，简洁优雅，你值得拥有

在线体验：

- FRE123 导航：[https://www.fre123.com](https://www.fre123.com)
- FRE123 信息流：
  - 技术周刊精选：[https://www.fre123.com/weekly](https://www.fre123.com/weekly)
  - 全网热点资讯：[https://www.fre123.com/news](https://www.fre123.com/news)
  - 技术热点资讯：[https://www.fre123.com/tech](https://www.fre123.com/tech)

## 特性

![Fre123 Nav](./.files/images/fre123-nav.png)

项目特点：

- 独立后台：
  - 网站配置：支持配置网站名称、网站图标、网站描述等
  - 导航管理：支持添加、编辑、删除导航
  - 广告管理：支持添加、编辑、删除广告
  - 友链管理：支持添加、编辑、删除友链
- 简洁易用：界面简洁易用，支持 `Docker` 快速部署
- 易于管理：支持通过可视化管理后台进行配置，方便管理
- 数据独立：数据完全由用户自定义控制
- 技术支持：底部关注公众号加交流群

## 部署

本项目包含前后台功能，涉及到多个服务，推荐使用 `Docker` 部署：

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

技术交流群 🤖：

<p align="center">
  <img src=".files/images/w_group.png" width="50%">
</p>

## QA

> 为什么要做这个项目？

详情见：[FRE123 启动计划](https://mp.weixin.qq.com/s/6El2AW93K4RiEHhma3vVPg)

> 有资源共享群么？

有的，同上联系老胡后拉你进群，本群都是热爱分享的朋友，只想潜水勿进，谢谢

> 我想做更全面的导航网站，又该能更丰富的版本吗？

有的，见下方更多功能，我们还提供付费版本，支持更多功能，详情见：[元站付费版本](https://www.moneysou.com/zsyz/89s4uc)

## 更多功能

目前免费版本可以支持大家构建一个个性化的导航网站，但是如果有更深入的导航使用需求，可以考虑我们的[元站付费版本](https://www.moneysou.com/zsyz/89s4uc)，具体功能对比如下：

| 功能         | 免费版 | 付费版 |
|--------------|--------|--------|
| 网站配置     | ✅      | ✅      |
| 导航管理     | ✅      | ✅      |
| 友链管理     | ✅      | ✅      |
| RSS 订阅单页 | ❌      | ✅      |
| 多导航页管理 | ❌      | ✅      |
| AI 生成单页  | ❌      | ✅      |
| 文章页管理   | ❌      | ✅      |
| 资源页管理   | ❌      | ✅      |
| 个性需求交流 | ❌      | ✅      |

## 贡献者

感谢以下贡献者为本项目做出的贡献：

| 贡献者     | GitHub 账号                                 | 贡献描述                 |
|------------|---------------------------------------------|--------------------------|
| linsk27    | [linsk27](https://github.com/linsk27)       | 负责后台友链管理模块开发 |
| FantasyBee | [FantasyBee](https://github.com/FantasyBee) | 负责后台网站配置功能开发 |
| KlayPeter  | [KlayPeter](https://github.com/KlayPeter)   | 负责后台广告管理         |
| sansanyi   | [sansanyih](https://github.com/sansanyih)   | 负责后台导航管理         |
| a-b-ab     | [a-b-ab](https://github.com/a-b-ab)         | 后台管理相关接口开发支持 |
| hoiii13    | [hoiii13](https://github.com/hoiii13)       | 前台导航核心功能开发     |
| shenpormax | [shenpormax](https://github.com/shenpormax) | 后端核心功能开发+优化    |

## 说明

欢迎加入我们的交流群，一起交流学习：

- 关注公众号：[老胡的储物柜](https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/wechat.jpeg)
- 回复 `加群` 即可加入我们的交流群

该项目由 `FRE123` 团队维护，如果您在使用该项目时遇到任何问题，请随时提交 `issue` 或联系我们。

PS：目前开源版本仅为基本的功能，如果想体验更丰富的功能，请关注公众号：[老胡的储物柜](https://cdn.jsdelivr.net/gh/fre123-com/fre123-info-flow@main/.files/wechat.jpeg) 了解更多。
