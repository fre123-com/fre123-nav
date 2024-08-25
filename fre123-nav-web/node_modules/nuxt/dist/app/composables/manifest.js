import { createMatcherFromExport } from "radix3";
import { defu } from "defu";
import { useAppConfig } from "../config.js";
import { appManifest as isAppManifestEnabled } from "#build/nuxt.config.mjs";
import { buildAssetsURL } from "#build/paths.mjs";
let manifest;
let matcher;
function fetchManifest() {
  if (!isAppManifestEnabled) {
    throw new Error("[nuxt] app manifest should be enabled with `experimental.appManifest`");
  }
  const buildId = useAppConfig().nuxt?.buildId;
  manifest = $fetch(buildAssetsURL(`builds/meta/${buildId}.json`));
  manifest.then((m) => {
    matcher = createMatcherFromExport(m.matcher);
  });
  return manifest;
}
export function getAppManifest() {
  if (!isAppManifestEnabled) {
    throw new Error("[nuxt] app manifest should be enabled with `experimental.appManifest`");
  }
  return manifest || fetchManifest();
}
export async function getRouteRules(url) {
  await getAppManifest();
  return defu({}, ...matcher.matchAll(url).reverse());
}
