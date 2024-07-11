import { addVitePlugin } from '@nuxt/kit';
import VueInspector from 'vite-plugin-vue-inspector';

function setup({ nuxt, options }) {
  if (!nuxt.options.dev || nuxt.options.test)
    return;
  addVitePlugin(VueInspector({
    toggleComboKey: "",
    ...typeof options.componentInspector === "boolean" ? {} : options.componentInspector,
    appendTo: /\/entry\.m?js$/,
    toggleButtonVisibility: "never"
  }));
}

export { setup };
