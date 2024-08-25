## 项目说明

FRE123 后台管理系统

## 环境要求

- node: v18.16.0
- yarn: 1.22.19

## 二、安装步骤

- clone

```sh
# gitlab
git clone https://gitea.zfty.work/FRE123/fre123_admin_web.git
```

- install

```sh
yarn install
```

- run

```sh
yarn dev
```

###三、文件资源目录

```sh
Admin
├── index.html                      # 入口 html
├── package-lock.json               # 依赖包版本锁
├── package.json                    # 依赖包管理
├── postcss.config.js               # postcss 配置
├── public                          # 静态资源文件
├── src
│   ├── App.vue                   # 入口页面
│   ├── api                       # API 接口管理
│   ├── assets                    # 静态资源文件
│   │   ├── fonts                   # 字体
│   │   ├── iconfont                # 图标
│   │   ├── images                  # 图片
│   │   └── json                    # 路由菜单
│   ├── components                # 全局组件
│   │   ├── ErrorMessage            # 错误页面
│   │   ├── Pagination              # 分页器
│   │   ├── ProTable                # 动态表格
│   │   ├── SearchForm              # 搜索组件
│   │   └── UploadImg               # 文件上传
│   ├── config                    # 全局配置项
│   │   ├── config.ts               # 路由配置
│   │   ├── nprogress.ts            # 进度条
│   │   ├── piniaPersist.ts         # pinia持久化（sessionStorage）
│   │   └── serviceLoading.ts       # 请求loading
│   ├── enums                     # 项目枚举
│   │   └── httpEnum.ts             # 请求枚举配置
│   ├── env.d.ts                  # ts识别vue文件
│   ├── hooks                     # 常用hooks
│   │   ├── interface               # 接口
│   │   ├── useAuthButtons.ts       # 页面按钮权限
│   │   ├── useDownload.ts          # 导出数据
│   │   ├── useHandleData.ts        # 操作数据
│   │   ├── useOnline.ts            # 网络状态
│   │   ├── useSelection.ts         # 表格多选数据操作
│   │   └── useTable.ts             # table页面操作
│   ├── layout                    # 布局
│   │   ├── Footer                  # 底部
│   │   ├── Header                  # 头部
│   │   ├── Menu                    # 侧边栏菜单
│   │   ├── Tabs                    # 标签页
│   │   ├── index.scss              # 整体样式
│   │   └── index.vue               # 整体布局
│   ├── main.ts                   # 入口文件
│   ├── routers                   # 路由管理
│   │   ├── cacheRouter.ts          # 缓存路由
│   │   ├── constant.ts             # 默认路由
│   │   ├── index.ts                # 路由入口
│   │   ├── modules                 # 路由菜单模块
│   │   └── router.ts               # 路由表
│   ├── store                     # pinia store
│   │   ├── index.ts                # store入口
│   │   ├── interface               # store接口
│   │   └── modules                 # store模块
│   ├── styles                    # 全局样式
│   │   ├── common.scss             # 常用样式
│   │   ├── element.scss            # element-plus样式
│   │   ├── reset.scss              # 重置样式
│   │   └── var.scss                # 全局css变量
│   ├── typings                   # 全局ts声明
│   │   ├── global.d.ts             # 全局
│   │   ├── plugins.d.ts            # 插件
│   │   └── window.d.ts             # 浏览器兼容
│   ├── utils                     # 工具库
│   │   ├── eleValidate.ts          # 常用表单校验规则
│   │   ├── getEnv.ts               # 获取环境
│   │   ├── svg.ts                  # loading svg
│   │   └── util.ts                 # 常用工具
│   └── views                     # 项目所有页面
├── tsconfig.json                   # ts全局配置
└── vite.config.ts                  # vite配置
```

- 分支命名：feat/xxx issue/xxx fix/xxx refactor/xxx test/xxx docs/xxx chore/xxx style/xxx perf/xxx ci/xxx build/xxx revert/xxx merge/xxx
- 代码管理工具：
