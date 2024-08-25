import { createHead as createClientHead, setHeadInjectionHandler } from "@unhead/vue";
import { renderDOMHead } from "@unhead/dom";
import { defineNuxtPlugin, useNuxtApp } from "#app/nuxt";
import unheadPlugins from "#build/unhead-plugins.mjs";
export default defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = import.meta.server ? nuxtApp.ssrContext.head : createClientHead({
      plugins: unheadPlugins
    });
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
    if (import.meta.client) {
      let pauseDOMUpdates = true;
      const syncHead = async () => {
        pauseDOMUpdates = false;
        await renderDOMHead(head);
      };
      head.hooks.hook("dom:beforeRender", (context) => {
        context.shouldRender = !pauseDOMUpdates;
      });
      nuxtApp.hooks.hook("page:start", () => {
        pauseDOMUpdates = true;
      });
      nuxtApp.hooks.hook("page:finish", () => {
        if (!nuxtApp.isHydrating) {
          syncHead();
        }
      });
      nuxtApp.hooks.hook("app:error", syncHead);
      nuxtApp.hooks.hook("app:suspense:resolve", syncHead);
    }
  }
});
