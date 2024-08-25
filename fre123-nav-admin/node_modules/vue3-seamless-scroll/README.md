# vue3-seamless-scroll

Vue3.0 无缝滚动组件，支持Vite2.0，支持服务端打包

> 目前组件支持上下左右无缝滚动，单步滚动，并且支持复杂图标的无缝滚动，目前组件支持平台与`Vue3.0`支持平台一致。

## 效果展示

<div align=center>

![image](/example/1.gif)

</div>

## 安装

- `npm`

  ```shell
  npm install vue3-seamless-scroll --save
  ```

- `Yarn`

  ```shell
  yarn add vue3-seamless-scroll
  ```

- `browser`

  ```html
  <script src="https://unpkg.com/browse/vue3-seamless-scroll@1.0.2/dist/vue3-seamless-scroll.min.js"></script>
  ```

## 组件配置

- `list`

  > 无缝滚动列表数据，组件内部使用列表长度。

  ```json
    type: Array
    required: true
  ```

- `v-model`

  > 通过v-model控制动画滚动与停止，默认开始滚动

  ```json
    type: Boolean,
    default: true,
    required: false
  ```

- `direction`

  > 控制滚动方向，可选值`up`，`down`，`left`，`right`

  ```json
    type: String,
    default: "up",
    required: false
  ```

- `isWatch`

  > 开启数据更新监听

  ```json
    type: Boolean,
    default: true,
    required: false
  ```

- `hover`

  > 是否开启鼠标悬停

  ```json
    type: Boolean,
    default: false,
    required: false
  ```

- `count`

  > 动画循环次数，默认无限循环

  ```json
    type: Number,
    default: "infinite",
    required: false
  ```

- `limitScrollNum`

  > 开启滚动的数据量，只有列表长度大于等于该值才会滚动

  ```json
    type: Number,
    default: 5,
    required: false
  ```

- `step`

  > 步进速度

  ```json
    type: Number,
    required: false
  ```

- `singleHeight`

  > 单步运动停止的高度

  ```json
    type: Number,
    default: 0,
    required: false
  ```

- `singleWidth`

  > 单步运动停止的宽度

  ```json
    type: Number,
    default: 0,
    required: false
  ```

- `singleWaitTime`

  > 单步停止等待时间(默认值 1000ms)

  ```json
    type: Number,
    default: 1000,
    required: false
  ```

- `isRemUnit`

  > singleHeight and singleWidth 是否开启 rem 度量

  ```json
    type: Boolean,
    default: true,
    required: false
  ```

- `delay`

  > 动画延时时间

  ```json
    type: Number,
    default: 0,
    required: false
  ```

- `ease`

  > 动画效果，可以传入贝塞尔曲线数值

  ```json
    type: String | cubic-bezier,
    default: "ease-in",
    required: false
  ```

- `copyNum`

  > 拷贝列表次数，默认拷贝一次，当父级高度大于列表渲染高度的两倍时可以通过该参数控制拷贝列表次数达到无缝滚动效果

  ```json
    type: Number,
    default: 1,
    required: false
  ```

- `wheel`

  > 在开启鼠标悬停的情况下是否开启滚轮滚动，默认不开启

  ```json
    type: boolean,
    default: false,
    required: false
  ```

## 注意项

> 需要滚动的列表所在容器必须设置样式 `overflow: hidden`;

## 使用

### 注册组件

- 全局组件注册 `install`

```JavaScript
  // **main.js**
  import { createApp } from 'vue';
  import App from './App.vue';
  import vue3SeamlessScroll from "vue3-seamless-scroll";
  const app = createApp(App);
  app.use(vue3SeamlessScroll);
  app.mount('#app');
```

- 单个.vue文件局部注册

```html
<script>
  import { defineComponent } from "vue";
  import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
   export default defineComponent({
      components: {
        Vue3SeamlessScroll
      }
   })
</script>
```

### 使用组件

```html
<template>
  <vue3-seamless-scroll :list="list" class="scroll">
    <div class="item" v-for="(item, index) in list" :key="index">
      <span>{{item.title}}</span>
      <span>{{item.date}}</span>
    </div>
  </vue3-seamless-scroll>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

export default defineComponent({
  name: "App",
  components: {
    Vue3SeamlessScroll
  },
  setup() {
    const list = ref([
      {
        title: "Vue3.0 无缝滚动组件展示数据第1条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第2条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第3条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第4条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第5条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第6条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第7条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第8条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第9条",
        date: Date.now(),
      },
    ]);
    return { list };
  },
});
</script>

<style>
.scroll {
  height: 270px;
  width: 500px;
  margin: 100px auto;
  overflow: hidden;
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}
</style>

```
