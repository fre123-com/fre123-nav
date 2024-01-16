## 配置说明

### 网站基本配置

#### `website.json`

| 配置项          | 类型     | 说明                                        | 默认值 | 参数示例                                                                                                                                    |
| --------------- | -------- | ------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| base            | `Object` | 网站基础配置                                | 无     |                                                                                                                                             |
| base.app_name   | `String` | 网站名称                                    | 无     | fre123                                                                                                                                      |
| base.web_host   | `String` | 网站地址                                    | 无     | https://www.fre123.com                                                                                                                      |
| base.logo       | `String` | 网站 LOGO                                   | 无     | https://img.fre123.com/i/2023/11/25/65619e8022505.png                                                                                       |
| seo             | `Object` | 网站 seo 相关信息                           | 无     | -                                                                                                                                           |
| seo.title       | `String` | seo 标题                                    | 无     | FRE123                                                                                                                                      |
| seo.description | `String` | seo 描述                                    | 无     | FRE123 专注于为您提供各种免费优质资源，包括影视资源、动漫番剧、软件工具等。无论您在寻找哪种资源，我们都将尽力为您提供，为您的学习或工作助力 |
| seo.keywords    | `String` | seo 关键词                                  | 无     | FRE123                                                                                                                                      |
| seo.icon        | `String` | seo 图标                                    | 无     | https://www.fre123.com                                                                                                                      |
| header.search   | `Object` | 头部搜索模块，详见下方 `header.search` 配置 | 无     |                                                                                                                                             |
| header.right    | `Object` | 头部右侧模块,详见下方 `header.right` 配置   | 无     |                                                                                                                                             |
| pendant         | `Object` | 右侧挂件配置,详见下方 `pendant` 配置        | 无     |                                                                                                                                             |
| footer.right    | `Object` | 底部右侧配置，详见下方 `footer.right`       | 无     |                                                                                                                                             |

##### `header.search`

| 配置项           | 类型      | 说明             | 默认值 | 参数示例                                              |
| ---------------- | --------- | ---------------- | ------ | ----------------------------------------------------- |
| is_show          | `Boolean` | 是否展示         | 无     | true                                                  |
| list             | `item[]`  | 搜索引擎配置     | 无     | -                                                     |
| item.name        | `String`  | 名称             | 无     | 百度                                                  |
| item.url         | `String`  | 搜索引擎跳转地址 | 无     | https://www.baidu.com/s?wd=                           |
| item.icon        | `String`  | 图标             | 无     | https://img.fre123.com/i/2023/11/26/656303de24efc.png |
| item.placeholder | `String`  | 输入框提示信息   | 无     | 百度一下，你就知道                                    |

##### `header.right`

| 配置项         | 类型          | 说明           | 默认值 | 参数示例                    |
| -------------- | ------------- | -------------- | ------ | --------------------------- |
| is_show        | `Boolean`     | 是否展示       | 无     | true                        |
| group          | `Object`      | 分组           | 无     | -                           |
| group.name     | `String`      | 名称           | 无     | 热点榜单                    |
| group.url      | `String`      | 跳转地址       | 无     | https://www.fre123.com/news |
| group.children | `groupItem[]` | 子菜单         | 无     | -                           |
| groupItem.name | `String`      | 子菜单名称     | 无     | 新闻热榜                    |
| groupItem.url  | `String`      | 子菜单跳转地址 | 无     | https://www.fre123.com/news |

##### `pendant`

| 配置项                | 类型      | 说明                                                                               | 默认值 | 参数示例      |
| --------------------- | --------- | ---------------------------------------------------------------------------------- | ------ | ------------- |
| is_show               | `Boolean` | 是否展示                                                                           | 无     | true          |
| list                  | `item[]`  | 侧边栏配置                                                                         | 无     | -             |
| item.icon_class       | `String`  | [fontawesome](https://fontawesome.com/v4/icons/) 图标地址                          | 无     | fab fa-weixin |
| item.icon_size        | `Number`  | 图标大小                                                                           | 无     | 20            |
| item.icon_color       | `String`  | 图标颜色，可以通过[fre123 取色器](https://www.fre123.com) 进行取色                 | 无     | #00b140       |
| item.icon_hover_color | `String`  | 鼠标移动上去后的展示颜色，可以通过[fre123 取色器](https://www.fre123.com) 进行取色 | 无     | #00b140       |
| item.text             | `String`  | 鼠标移动上去后的展示文本                                                           | 无     | -             |
| item.img              | `String`  | 鼠标移动上去后的展示图标                                                           | 无     | -             |
| item.url              | `String`  | 跳转地址                                                                           | 无     | -             |

##### `footer.right`

| 配置项          | 类型      | 说明                                                      | 默认值 | 参数示例      |
| --------------- | --------- | --------------------------------------------------------- | ------ | ------------- |
| is_show         | `Boolean` | 是否展示                                                  | 无     | true          |
| list            | `item[]`  | 侧边栏配置                                                | 无     | -             |
| item.icon_class | `String`  | [fontawesome](https://fontawesome.com/v4/icons/) 图标地址 | 无     | fab fa-weixin |
| item.icon_size  | `Number`  | 图标大小                                                  | 无     | 20            |
| item.url        | `String`  | 跳转地址                                                  | 无     | -             |

### 导航配置

#### `nav.json`

| 配置项                       | 类型     | 说明                                  | 默认值 | 参数示例               |
| ---------------------------- | -------- | ------------------------------------- | ------ | ---------------------- |
| group_name                   | `String` | 分组名称                              | 无     | 如新闻资讯             |
| tab_list                     | `tab[]`  | 子分类配置                            | 无     | fre123                 |
| tab.tab_name                 | `String` | 子分类名称                            | 无     | 新闻热点               |
| tab.upper_right_corner       | `String` | 右侧广告位                            | 无     | fre123                 |
| tab.upper_right_corner.title | `String` | 广告名称                              | 无     | fre123                 |
| tab.upper_right_corner.url   | `String` | 广告地址                              | 无     | https://www.fre123.com |
| details                      | array    | 导航列表配置，详见下方 `details.item` | 无     | -                      |

###### `details.item`

| 配置项      | 类型      | 说明     | 默认值 | 参数示例                                                                                                                                    |
| ----------- | --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| title       | `String`  | 标题     | 无     | FRE123                                                                                                                                      |
| url         | `String`  | 跳转地址 | 无     | https://www.fre123.com                                                                                                                      |
| icon        | `String`  | 图标     | 无     | https://img.fre123.com/i/2023/11/25/65619e8022505.png                                                                                       |
| description | `String`  | 描述     | 无     | FRE123 专注于为您提供各种免费优质资源，包括影视资源、动漫番剧、软件工具等。无论您在寻找哪种资源，我们都将尽力为您提供，为您的学习或工作助力 |
| is_show     | `Boolean` | 是否展示 | 无     | true                                                                                                                                        |
