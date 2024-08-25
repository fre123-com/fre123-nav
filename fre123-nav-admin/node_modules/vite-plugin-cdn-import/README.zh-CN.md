# 从 CDN 加载 modules 的 vite 插件

[English](README.md) | 简体中文

[![GitHub tag](https://img.shields.io/github/tag/MMF-FE/vite-plugin-cdn-import.svg)](https://github.com/MMF-FE/vite-plugin-cdn-import/releases)
[![License](https://img.shields.io/github/license/SafdarJamal/vite-template-react)](https://github.com/MMF-FE/vite-plugin-cdn-import/blob/master/LICENSE)

允许指定 modules 在生产环境中使用 CDN 引入。

这可以减少构建时间,并且提高生产环境中页面加载速度。

## 安装

下载 npm 插件

```bash
npm install vite-plugin-cdn-import --save-dev
```

or yarn

```bash
yarn add vite-plugin-cdn-import -D
```

## 基本用法

```js
// vite.config.js
import reactRefresh from '@vitejs/plugin-react-refresh'
import importToCDN from 'vite-plugin-cdn-import'

export default {
    plugins: [
        importToCDN({
            modules: [
                {
                    name: 'react',
                    var: 'React',
                    path: `umd/react.production.min.js`,
                },
                {
                    name: 'react-dom',
                    var: 'ReactDOM',
                    path: `umd/react-dom.production.min.js`,
                },
            ],
        }),
    ],
}
```

### 使用 autoComplete

```js
// vite.config.js
import reactRefresh from '@vitejs/plugin-react-refresh'
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

export default {
    plugins: [
        importToCDN({
            modules: [
                autoComplete('react'),
                autoComplete('react-dom')
            ],
        }),
        reactRefresh(),
    ],
}
```

### 自动完成支持的 module

```
"react" | "react-dom" | "react-router-dom" | 
"antd" | "ahooks" | "@ant-design/charts" | 
"vue" | "vue2" | "@vueuse/shared" | 
"@vueuse/core" | "moment" | 
"eventemitter3" | "file-saver" | 
"browser-md5-file" | "xlsx | "crypto-js" |
"axios" | "lodash" | "localforage"
```

### VueUse demo

```js
import vue from '@vitejs/plugin-vue'
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

export default {
    plugins: [
        vue(),
        importToCDN({
            modules: [
                autoComplete('vue'), // vue2 使用 autoComplete('vue2')
                autoComplete('@vueuse/shared'),
                autoComplete('@vueuse/core')
            ],
        }),
    ],
}
```

## 参数

| Name    | Description                                            | Type            | Default                                                |
| ------- | ------------------------------------------------------ | --------------- | ------------------------------------------------------ |
| prodUrl | 覆盖全局 prodUrl 属性，允许为特定的模块指定 CDN 的位置 | string          | <https://cdn.jsdelivr.net/npm/{name}@{version}/{path}> |
| modules | 模块配置                                               | Array`<Module>` / Array`<(prodUrl:string) => Module>` | -                                                      |

### Module 配置

| Name | Description                                   | Type              |
| ---- | --------------------------------------------- | ----------------- |
| name | 需要 CDN 加速的包名称                         | string            |
| var  | 全局分配给模块的变量，Rollup 需要这个变量名称 | string            |
| path | 指定 CDN 上的加载路径                         | string / string[] |
| css  | 可以指定从 CDN 地址上加载多个样式表           | string / string[] |

## 其他的 CDN pordUrl 地址

| Name  | pordUrl                                                  |
| ----- | -------------------------------------------------------- |
| unpkg | //unpkg.com/{name}@{version}/{path}                      |
| cdnjs | //cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path} |

## 资源

- [webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)
- [rollup-plugin-external-globals](https://github.com/eight04/rollup-plugin-external-globals)
