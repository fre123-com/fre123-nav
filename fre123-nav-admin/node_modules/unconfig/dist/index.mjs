import fs, { promises, constants } from 'node:fs';
import { parse, resolve, dirname, join, basename } from 'node:path';
import process from 'node:process';
import { interopDefault } from 'mlly';
import jiti from 'jiti';
import { toArray, notNullish } from '@antfu/utils';
import defu from 'defu';

const defaultExtensions = ["mts", "cts", "ts", "mjs", "cjs", "js", "json", ""];

function existsSync(fp) {
  try {
    fs.accessSync(fp, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}
async function findUp(paths, options = {}) {
  const {
    cwd = process.cwd(),
    stopAt = parse(cwd).root,
    multiple = false,
    allowSymlinks = true
  } = options;
  let current = cwd;
  const files = [];
  const stat = allowSymlinks ? promises.stat : promises.lstat;
  while (current && current !== stopAt) {
    for (const path of paths) {
      const filepath = resolve(current, path);
      if (existsSync(filepath) && (await stat(filepath)).isFile()) {
        files.push(filepath);
        if (!multiple)
          return files;
      }
    }
    const parent = dirname(current);
    if (parent === current)
      break;
    current = parent;
  }
  return files;
}

function createConfigLoader(options) {
  const sources = toArray(options.sources || []);
  const {
    cwd = process.cwd(),
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
      const flatTargets = toArray(source?.files || []).flatMap(
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
            config: defu(result.config, defaults),
            sources: result.sources
          };
        }
      } else {
        results.push(
          ...(await Promise.all(
            files.map((file) => loadConfigFile(file, source))
          )).filter(notNullish)
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
      config: defu(...results.map((i) => i.config), defaults),
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
      code = await promises.readFile(filepath, "utf-8");
    return code;
  }
  if (source.transform) {
    const transformed = await source.transform(await read(), filepath);
    if (transformed) {
      bundleFilepath = join(dirname(filepath), `__unconfig_${basename(filepath)}`);
      await promises.writeFile(bundleFilepath, transformed, "utf-8");
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
        if (process.versions.bun) {
          const defaultImport = await import(filepath);
          config = interopDefault(defaultImport);
        } else {
          config = await jiti(filepath, {
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
      await promises.unlink(bundleFilepath).catch();
  }
}

export { createConfigLoader, defaultExtensions, loadConfig };
