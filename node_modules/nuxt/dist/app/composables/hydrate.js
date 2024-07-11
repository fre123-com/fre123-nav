import { useNuxtApp } from "../nuxt.js";
export const useHydration = (key, get, set) => {
  const nuxt = useNuxtApp();
  if (import.meta.server) {
    nuxt.hooks.hook("app:rendered", () => {
      nuxt.payload[key] = get();
    });
  }
  if (import.meta.client) {
    nuxt.hooks.hook("app:created", () => {
      set(nuxt.payload[key]);
    });
  }
};
