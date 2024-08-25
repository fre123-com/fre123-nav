'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const cdn = require('./shared/preset-icons.DDHG4xNZ.cjs');
const core = require('./shared/preset-icons.De8FRNb6.cjs');
require('ofetch');
require('@unocss/core');

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
const presetIcons = /* @__PURE__ */ core.createPresetIcons(async (options) => {
  const {
    cdn: cdn$1
  } = options;
  const loaders = [];
  const {
    isNode,
    isVSCode,
    isESLint
  } = core.getEnvFlags();
  if (isNode && !isVSCode && !isESLint) {
    const nodeLoader = await createNodeLoader();
    if (nodeLoader !== void 0)
      loaders.push(nodeLoader);
  }
  if (cdn$1)
    loaders.push(cdn.createCDNLoader(cdn$1));
  loaders.push(core.loadIcon);
  return core.combineLoaders(loaders);
});

exports.combineLoaders = core.combineLoaders;
exports.createCDNFetchLoader = core.createCDNFetchLoader;
exports.createPresetIcons = core.createPresetIcons;
exports.getEnvFlags = core.getEnvFlags;
exports.icons = core.icons;
exports.default = presetIcons;
exports.presetIcons = presetIcons;
