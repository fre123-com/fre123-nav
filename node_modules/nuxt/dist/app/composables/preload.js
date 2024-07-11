import { useNuxtApp } from "../nuxt.js";
import { toArray } from "../utils.js";
import { useRouter } from "./router.js";
export const preloadComponents = async (components) => {
  if (import.meta.server) {
    return;
  }
  const nuxtApp = useNuxtApp();
  components = toArray(components);
  await Promise.all(components.map((name) => _loadAsyncComponent(nuxtApp.vueApp._context.components[name])));
};
export const prefetchComponents = (components) => {
  return preloadComponents(components);
};
function _loadAsyncComponent(component) {
  if (component?.__asyncLoader && !component.__asyncResolved) {
    return component.__asyncLoader();
  }
}
export async function preloadRouteComponents(to, router = useRouter()) {
  if (import.meta.server) {
    return;
  }
  const { path, matched } = router.resolve(to);
  if (!matched.length) {
    return;
  }
  if (!router._routePreloaded) {
    router._routePreloaded = /* @__PURE__ */ new Set();
  }
  if (router._routePreloaded.has(path)) {
    return;
  }
  const promises = router._preloadPromises = router._preloadPromises || [];
  if (promises.length > 4) {
    return Promise.all(promises).then(() => preloadRouteComponents(to, router));
  }
  router._routePreloaded.add(path);
  const components = matched.map((component) => component.components?.default).filter((component) => typeof component === "function");
  for (const component of components) {
    const promise = Promise.resolve(component()).catch(() => {
    }).finally(() => promises.splice(promises.indexOf(promise)));
    promises.push(promise);
  }
  await Promise.all(promises);
}
