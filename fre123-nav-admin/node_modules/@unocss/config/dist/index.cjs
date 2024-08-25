'use strict';

const node_path = require('node:path');
const fs = require('node:fs');
const process = require('node:process');
const unconfig = require('unconfig');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
const process__default = /*#__PURE__*/_interopDefaultCompat(process);

async function loadConfig(cwd = process__default.cwd(), configOrPath = cwd, extraConfigSources = [], defaults = {}) {
  let inlineConfig = {};
  if (typeof configOrPath !== "string") {
    inlineConfig = configOrPath;
    if (inlineConfig.configFile === false) {
      return {
        config: inlineConfig,
        sources: []
      };
    } else {
      configOrPath = inlineConfig.configFile || process__default.cwd();
    }
  }
  const resolved = node_path.resolve(configOrPath);
  let isFile = false;
  if (fs__default.existsSync(resolved) && fs__default.statSync(resolved).isFile()) {
    isFile = true;
    cwd = node_path.dirname(resolved);
  }
  const loader = unconfig.createConfigLoader({
    sources: isFile ? [
      {
        files: resolved,
        extensions: []
      }
    ] : [
      {
        files: [
          "unocss.config",
          "uno.config"
        ]
      },
      ...extraConfigSources
    ],
    cwd,
    defaults: inlineConfig
  });
  const result = await loader.load();
  result.config = Object.assign(defaults, result.config || inlineConfig);
  if (result.config.configDeps) {
    result.sources = [
      ...result.sources,
      ...result.config.configDeps.map((i) => node_path.resolve(cwd, i))
    ];
  }
  return result;
}

exports.loadConfig = loadConfig;
