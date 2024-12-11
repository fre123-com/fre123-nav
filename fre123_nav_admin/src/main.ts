import { createApp } from "vue";
import App from "./App.vue";
// vue Router
import router from "@/routers/index";
// pinia store
import pinia from "@/store/index";

// scss
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";

// element plus
import * as Icons from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import "element-plus/dist/index.css";
// custom element css
import "@/styles/element.scss";
//  unocss
import "uno.css";

const app = createApp(App);

// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app
  .use(router)
  .use(pinia)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount("#app");
