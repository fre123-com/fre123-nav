import { parseURL } from "ufo";
import { defineNuxtPlugin } from "../nuxt.js";
import { loadPayload } from "../composables/payload.js";
import { onNuxtReady } from "../composables/ready.js";
import { useRouter } from "../composables/router.js";
import { getAppManifest } from "../composables/manifest.js";
import { appManifest as isAppManifestEnabled } from "#build/nuxt.config.mjs";
export default defineNuxtPlugin({
  name: "nuxt:payload",
  setup(nuxtApp) {
    if (import.meta.dev) {
      return;
    }
    useRouter().beforeResolve(async (to, from) => {
      if (to.path === from.path) {
        return;
      }
      const payload = await loadPayload(to.path);
      if (!payload) {
        return;
      }
      Object.assign(nuxtApp.static.data, payload.data);
    });
    onNuxtReady(() => {
      nuxtApp.hooks.hook("link:prefetch", async (url) => {
        if (!parseURL(url).protocol) {
          await loadPayload(url);
        }
      });
      if (isAppManifestEnabled && navigator.connection?.effectiveType !== "slow-2g") {
        setTimeout(getAppManifest, 1e3);
      }
    });
  }
});
