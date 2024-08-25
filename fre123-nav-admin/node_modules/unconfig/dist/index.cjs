'use strict';

const fs = require('node:fs');
const node_path = require('node:path');
const process = require('node:process');
const mlly = require('mlly');
const jiti = require('jiti');
const utils = require('@antfu/utils');
const defu = require('defu');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
const process__default = /*#__PURE__*/_interopDefaultCompat(process);
const jiti__default = /*#__PURE__*/_interopDefaultCompat(jiti);
const defu__default = /*#__PURE__*/_interopDefaultCompat(defu);

const defaultExtensions = ["mts", "cts", "ts", "mjs", "cjs", "js", "json", ""];

function existsSync(fp) {
  try {
    fs__default.accessSync(fp, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}
async function findUp(paths, options = {}) {
  const {
    cwd = process__default.cwd(),
    stopAt = node_path.parse(cwd).root,
    multiple = false,
    allowSymlinks = true
  } = options;
  let current = cwd;
  const files = [];
  const stat = allowSymlinks ? fs.promises.stat : fs.promises.lstat;
  while (current && current !== stopAt) {
    for (const path of paths) {
      const filepath = node_path.resolve(current, path);
      if (existsSync(filepath) && (await stat(filepath)).isFile()) {
        files.push(filepath);
        if (!multiple)
          return files;
      }
    }
    const parent = node_path.dirname(current);
    if (parent === current)
      break;
    current = parent;
  }
  return files;
}

function createConfigLoader(options) {
  const sources = utils.toArray(options.sources || []);
  const {
    cwd = process__default.cwd(),
    merge,
    defaults
  } = options;
  const results = [];
  let matchedFiles;
  async function findConfigs() {
    if (matchedFiles == null)
      matchedFiles = [];
    matchedFiles.length = 0;
    for (const source of sources) {
      const { extensions = defaultExtensions } = source;
      const flatTargets = utils.toArray(source?.files || []).flatMap(
        (file) => !extensions.length ? [file] : extensions.map((i) => i ? `${file}.${i}` : file)
      );
      const files = await findUp(flatTargets, { cwd, stopAt: options.stopAt, multiple: merge });
      matchedFiles.push([source, files]);
    }
    return matchedFiles.flatMap((i) => i[1]);
  }
  async function load(force = false) {
    if (matchedFiles == null || force)
      await findConfigs();
    for (const [source, files] of matchedFiles) {
      if (!files.length)
        continue;
      if (!merge) {
        const result = await loadConfigFile(files[0], source);
        if (result) {
          return {
            config: defu__default(result.config, defaults),
            sources: result.sources
          };
        }
      } else {
        results.push(
          ...(await Promise.all(
            files.map((file) => loadConfigFile(file, source))
          )).filter(utils.notNullish)
        );
      }
    }
    if (!results.length) {
      return {
        config: defaults,
        sources: []
      };
    }
    return {
      // @ts-expect-error cast
      config: defu__default(...results.map((i) => i.config), defaults),
      sources: results.map((i) => i.sources).flat()
    };
  }
  return {
    load,
    findConfigs
  };
}
async function loadConfig(options) {
  return createConfigLoader(options).load();
}
async function loadConfigFile(filepath, source) {
  let config;
  let parser = source.parser || "auto";
  let bundleFilepath = filepath;
  let code;
  async function read() {
    if (code == null)
      code = await fs.promises.readFile(filepath, "utf-8");
    return code;
  }
  if (source.transform) {
    const transformed = await source.transform(await read(), filepath);
    if (transformed) {
      bundleFilepath = node_path.join(node_path.dirname(filepath), `__unconfig_${node_path.basename(filepath)}`);
      await fs.promises.writeFile(bundleFilepath, transformed, "utf-8");
      code = transformed;
    }
  }
  if (parser === "auto") {
    try {
      config = JSON.parse(await read());
      parser = "json";
    } catch {
      parser = "require";
    }
  }
  try {
    if (!config) {
      if (typeof parser === "function") {
        config = await parser(filepath);
      } else if (parser === "require") {
        if (process__default.versions.bun) {
          const defaultImport = await import(filepath);
          config = mlly.interopDefault(defaultImport);
        } else {
          config = await jiti__default(filepath, {
            interopDefault: true,
            cache: false,
            v8cache: false,
            esmResolve: true,
            // FIXME: https://github.com/unjs/jiti/pull/141
            requireCache: false
          })(bundleFilepath);
        }
      } else if (parser === "json") {
        config = JSON.parse(await read());
      }
    }
    if (!config)
      return;
    const rewritten = source.rewrite ? await source.rewrite(config, filepath) : config;
    if (!rewritten)
      return void 0;
    return {
      config: rewritten,
      sources: [filepath]
    };
  } catch (e) {
    if (source.skipOnError)
      return;
    throw e;
  } finally {
    if (bundleFilepath !== filepath)
      await fs.promises.unlink(bundleFilepath).catch();
  }
}

exports.createConfigLoader = createConfigLoader;
exports.defaultExtensions = defaultExtensions;
exports.loadConfig = loadConfig;
