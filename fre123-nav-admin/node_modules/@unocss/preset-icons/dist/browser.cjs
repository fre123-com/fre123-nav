'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const cdn = require('./shared/preset-icons.DDHG4xNZ.cjs');
const core = require('./shared/preset-icons.De8FRNb6.cjs');
require('ofetch');
require('@unocss/core');

const presetIcons = core.createPresetIcons(async (options) => {
  const fetcher = options?.customFetch;
  const cdn$1 = options?.cdn;
  if (fetcher && cdn$1)
    return core.createCDNFetchLoader(fetcher, cdn$1);
  if (cdn$1)
    return cdn.createCDNLoader(cdn$1);
  return core.loadIcon;
});

exports.combineLoaders = core.combineLoaders;
exports.createCDNFetchLoader = core.createCDNFetchLoader;
exports.createPresetIcons = core.createPresetIcons;
exports.getEnvFlags = core.getEnvFlags;
exports.icons = core.icons;
exports.default = presetIcons;
exports.presetIcons = presetIcons;
