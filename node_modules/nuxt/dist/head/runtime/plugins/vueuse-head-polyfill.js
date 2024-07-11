import { polyfillAsVueUseHead } from "@unhead/vue/polyfill";
import { defineNuxtPlugin } from "#app/nuxt";
export default defineNuxtPlugin({
  name: "nuxt:vueuse-head-polyfill",
  setup(nuxtApp) {
    polyfillAsVueUseHead(nuxtApp.vueApp._context.provides.usehead);
  }
});
