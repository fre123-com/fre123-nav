import { getCurrentInstance, reactive, toRefs } from "vue";
import { useHead } from "@unhead/vue";
import { useNuxtApp } from "../nuxt.js";
import { useAsyncData } from "./asyncData.js";
import { useRoute } from "./router.js";
import { createError } from "./error.js";
export const NuxtComponentIndicator = "__nuxt_component";
async function runLegacyAsyncData(res, fn) {
  const nuxtApp = useNuxtApp();
  const route = useRoute();
  const vm = getCurrentInstance();
  const { fetchKey, _fetchKeyBase } = vm.proxy.$options;
  const key = (typeof fetchKey === "function" ? fetchKey(() => "") : fetchKey) || [_fetchKeyBase, route.fullPath, route.matched.findIndex((r) => Object.values(r.components || {}).includes(vm.type))].join(":");
  const { data, error } = await useAsyncData(`options:asyncdata:${key}`, () => nuxtApp.runWithContext(() => fn(nuxtApp)));
  if (error.value) {
    throw createError(error.value);
  }
  if (data.value && typeof data.value === "object") {
    Object.assign(await res, toRefs(reactive(data.value)));
  } else if (import.meta.dev) {
    console.warn("[nuxt] asyncData should return an object", data);
  }
}
export const defineNuxtComponent = /* @__NO_SIDE_EFFECTS__ */ function defineNuxtComponent2(...args) {
  const [options, key] = args;
  const { setup } = options;
  if (!setup && !options.asyncData && !options.head) {
    return {
      [NuxtComponentIndicator]: true,
      ...options
    };
  }
  return {
    [NuxtComponentIndicator]: true,
    _fetchKeyBase: key,
    ...options,
    setup(props, ctx) {
      const nuxtApp = useNuxtApp();
      const res = setup ? Promise.resolve(nuxtApp.runWithContext(() => setup(props, ctx))).then((r) => r || {}) : {};
      const promises = [];
      if (options.asyncData) {
        promises.push(runLegacyAsyncData(res, options.asyncData));
      }
      if (options.head) {
        const nuxtApp2 = useNuxtApp();
        useHead(typeof options.head === "function" ? () => options.head(nuxtApp2) : options.head);
      }
      return Promise.resolve(res).then(() => Promise.all(promises)).then(() => res).finally(() => {
        promises.length = 0;
      });
    }
  };
};
