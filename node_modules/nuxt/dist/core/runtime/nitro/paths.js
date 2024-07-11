import { joinURL } from "ufo";
import { useRuntimeConfig } from "#internal/nitro";
export function baseURL() {
  return useRuntimeConfig().app.baseURL;
}
export function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
export function buildAssetsURL(...path) {
  return joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
export function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
}
