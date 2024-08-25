# Import modules from CDN with vite plugin

English | [简体中文](README.zh-CN.md)

[![GitHub tag](https://img.shields.io/github/tag/MMF-FE/vite-plugin-cdn-import.svg)](https://github.com/MMF-FE/vite-plugin-cdn-import/releases)
[![License](https://img.shields.io/github/license/SafdarJamal/vite-template-react)](https://github.com/MMF-FE/vite-plugin-cdn-import/blob/master/LICENSE)

Allows you to specify modules to be introduced in a production environment using a CDN.

This can reduce build time and improve page load speed in production environments.

## Installation

Install the plugin with npm:

```
npm install vite-plugin-cdn-import --save-dev
```

or yarn

```
yarn add vite-plugin-cdn-import -D
```

## Basic Usage

Add it to vite.config.js

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

### Use autoComplete

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

### Autocomplete supported modules

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
                autoComplete('vue'), // vue2 use autoComplete('vue2')
                autoComplete('@vueuse/shared'),
                autoComplete('@vueuse/core')
            ],
        }),
    ],
}
```

## Options

| Name    | Description                                                                                  | Type            | Default                                                |
| ------- | -------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------ |
| prodUrl | Overrides the global prodUrl, allowing you to specify the CDN location for a specific module | string          | <https://cdn.jsdelivr.net/npm/{name}@{version}/{path}> |
| modules | Modules config                                                                               | Array`<Module>` / Array`<(prodUrl:string) => Module>` | -                                                      |

### Module

| Name | Description                                                                           | Type              |
| ---- | ------------------------------------------------------------------------------------- | ----------------- |
| name | The name of the module you want to externalize                                        | string            |
| var  | A variable that will be assigned to the module in global scope, Rollup requires this  | string            |
| path | Specify the load path on the CDN                                                      | string / string[] |
| css  | You can alternatively specify multiple style sheets which will be loaded from the CDN | string / string[] |

## Other CDN pordUrl

| Name  | pordUrl                                                  |
| ----- | -------------------------------------------------------- |
| unpkg | //unpkg.com/{name}@{version}/{path}                      |
| cdnjs | //cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path} |

## Ressources

- [webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)
- [rollup-plugin-external-globals](https://github.com/eight04/rollup-plugin-external-globals)
