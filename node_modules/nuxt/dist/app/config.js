import { reactive } from "vue";
import { klona } from "klona";
import { useNuxtApp } from "./nuxt.js";
import __appConfig from "#build/app.config.mjs";
export const _getAppConfig = () => __appConfig;
function deepDelete(obj, newObj) {
  for (const key in obj) {
    const val = newObj[key];
    if (!(key in newObj)) {
      delete obj[key];
    }
    if (val !== null && typeof val === "object") {
      deepDelete(obj[key], newObj[key]);
    }
  }
}
function deepAssign(obj, newObj) {
  for (const key in newObj) {
    const val = newObj[key];
    if (val !== null && typeof val === "object") {
      obj[key] = obj[key] || {};
      deepAssign(obj[key], val);
    } else {
      obj[key] = val;
    }
  }
}
export function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = import.meta.server ? klona(__appConfig) : reactive(__appConfig);
  }
  return nuxtApp._appConfig;
}
export function updateAppConfig(appConfig) {
  const _appConfig = useAppConfig();
  deepAssign(_appConfig, appConfig);
}
if (import.meta.dev) {
  const applyHMR = (newConfig) => {
    const appConfig = useAppConfig();
    if (newConfig && appConfig) {
      deepAssign(appConfig, newConfig);
      deepDelete(appConfig, newConfig);
    }
  };
  if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
      const newConfig = newModule?._getAppConfig();
      applyHMR(newConfig);
    });
  }
  if (import.meta.webpackHot) {
    import.meta.webpackHot.accept("#build/app.config.mjs", () => {
      applyHMR(__appConfig);
    });
  }
}
