import { c as createCDNLoader } from './shared/preset-icons.BAlQvmXS.mjs';
import { c as createPresetIcons, g as getEnvFlags, a as combineLoaders, l as loadIcon } from './shared/preset-icons.BBMLRFol.mjs';
export { b as createCDNFetchLoader, i as icons } from './shared/preset-icons.BBMLRFol.mjs';
import 'ofetch';
import '@unocss/core';

async function createNodeLoader() {
  try {
    return await import('@iconify/utils/lib/loader/node-loader').then((i) => i?.loadNodeIcon);
  } catch {
  }
  try {
    return require("@iconify/utils/lib/loader/node-loader.cjs").loadNodeIcon;
  } catch {
  }
}
const presetIcons = /* @__PURE__ */ createPresetIcons(async (options) => {
  const {
    cdn
  } = options;
  const loaders = [];
  const {
    isNode,
    isVSCode,
    isESLint
  } = getEnvFlags();
  if (isNode && !isVSCode && !isESLint) {
    const nodeLoader = await createNodeLoader();
    if (nodeLoader !== void 0)
      loaders.push(nodeLoader);
  }
  if (cdn)
    loaders.push(createCDNLoader(cdn));
  loaders.push(loadIcon);
  return combineLoaders(loaders);
});

export { combineLoaders, createPresetIcons, presetIcons as default, getEnvFlags, presetIcons };
