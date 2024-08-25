'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const process$1 = require('node:process');
const UnocssInspector = require('@unocss/inspector');
const node_path = require('node:path');
const fs = require('node:fs/promises');
const fg = require('fast-glob');
const MagicString = require('magic-string');
const remapping = require('@ampproject/remapping');
const node_crypto = require('node:crypto');
const core = require('@unocss/core');
const node_buffer = require('node:buffer');
const pluginutils = require('@rollup/pluginutils');
const fs$1 = require('node:fs');
const node_url = require('node:url');
const config = require('@unocss/config');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const process__default = /*#__PURE__*/_interopDefaultCompat(process$1);
const UnocssInspector__default = /*#__PURE__*/_interopDefaultCompat(UnocssInspector);
const fs__default = /*#__PURE__*/_interopDefaultCompat(fs);
const fg__default = /*#__PURE__*/_interopDefaultCompat(fg);
const MagicString__default = /*#__PURE__*/_interopDefaultCompat(MagicString);
const remapping__default = /*#__PURE__*/_interopDefaultCompat(remapping);
const fs__default$1 = /*#__PURE__*/_interopDefaultCompat(fs$1);

const defaultPipelineExclude = [core.cssIdRE];
const defaultPipelineInclude = [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/];

const VIRTUAL_ENTRY_ALIAS = [
  /^(?:virtual:)?uno(?::(.+))?\.css(\?.*)?$/
];
const LAYER_MARK_ALL = "__ALL__";
const RESOLVED_ID_WITH_QUERY_RE = /[\/\\]__uno(?:(_.*?))?\.css(\?.*)?$/;
const RESOLVED_ID_RE = /[\/\\]__uno(?:_(.*?))?\.css$/;
function resolveId(id) {
  if (id.match(RESOLVED_ID_WITH_QUERY_RE))
    return id;
  for (const alias of VIRTUAL_ENTRY_ALIAS) {
    const match = id.match(alias);
    if (match) {
      return match[1] ? `/__uno_${match[1]}.css` : "/__uno.css";
    }
  }
}
function resolveLayer(id) {
  const match = id.match(RESOLVED_ID_RE);
  if (match)
    return match[1] || LAYER_MARK_ALL;
}
const LAYER_PLACEHOLDER_RE = /#--unocss--\s*{\s*layer\s*:\s*(.+?)\s*(?:;\s*escape-view\s*:\s*(.+?)\s*)?;?\s*}/g;
function getLayerPlaceholder(layer) {
  return `#--unocss--{layer:${layer};escape-view:\\"\\'\\\`\\\\}`;
}
const HASH_PLACEHOLDER_RE = /#--unocss-hash--\s*{\s*content\s*:\s*\\*"(.+?)\\*";?\s*}/g;
function getHashPlaceholder(hash) {
  return `#--unocss-hash--{content:"${hash}"}`;
}

const INCLUDE_COMMENT = "@unocss-include";
const IGNORE_COMMENT = "@unocss-ignore";
const CSS_PLACEHOLDER = "@unocss-placeholder";
const SKIP_START_COMMENT = "@unocss-skip-start";
const SKIP_END_COMMENT = "@unocss-skip-end";
const SKIP_COMMENT_RE = new RegExp(`(//\\s*?${SKIP_START_COMMENT}\\s*?|\\/\\*\\s*?${SKIP_START_COMMENT}\\s*?\\*\\/|<!--\\s*?${SKIP_START_COMMENT}\\s*?-->)[\\s\\S]*?(//\\s*?${SKIP_END_COMMENT}\\s*?|\\/\\*\\s*?${SKIP_END_COMMENT}\\s*?\\*\\/|<!--\\s*?${SKIP_END_COMMENT}\\s*?-->)`, "g");

function deprecationCheck(config) {
  let warned = false;
  function warn(msg) {
    warned = true;
    console.warn(`[unocss] ${msg}`);
  }
  if (config.include)
    warn("`include` option is deprecated, use `content.pipeline.include` instead.");
  if (config.exclude)
    warn("`exclude` option is deprecated, use `content.pipeline.exclude` instead.");
  if (config.extraContent)
    warn("`extraContent` option is deprecated, use `content` instead.");
  if (config.content?.plain)
    warn("`content.plain` option is renamed to `content.inline`.");
  if (warned && typeof process !== "undefined" && process.env.CI)
    throw new Error("deprecation warning");
}

function createContext(configOrPath, defaults = {}, extraConfigSources = [], resolveConfigResult = () => {
}) {
  let root = process__default.cwd();
  let rawConfig = {};
  let configFileList = [];
  const uno = core.createGenerator(rawConfig, defaults);
  let rollupFilter = pluginutils.createFilter(
    defaultPipelineInclude,
    defaultPipelineExclude,
    { resolve: typeof configOrPath === "string" ? configOrPath : root }
  );
  const invalidations = [];
  const reloadListeners = [];
  const modules = new core.BetterMap();
  const tokens = /* @__PURE__ */ new Set();
  const tasks = [];
  const affectedModules = /* @__PURE__ */ new Set();
  let ready = reloadConfig();
  async function reloadConfig() {
    const result = await config.loadConfig(root, configOrPath, extraConfigSources, defaults);
    resolveConfigResult(result);
    deprecationCheck(result.config);
    rawConfig = result.config;
    configFileList = result.sources;
    uno.setConfig(rawConfig);
    uno.config.envMode = "dev";
    rollupFilter = rawConfig.content?.pipeline === false ? () => false : pluginutils.createFilter(
      rawConfig.content?.pipeline?.include || rawConfig.include || defaultPipelineInclude,
      rawConfig.content?.pipeline?.exclude || rawConfig.exclude || defaultPipelineExclude,
      { resolve: typeof configOrPath === "string" ? configOrPath : root }
    );
    tokens.clear();
    await Promise.all(modules.map((code, id) => uno.applyExtractors(code.replace(SKIP_COMMENT_RE, ""), id, tokens)));
    invalidate();
    dispatchReload();
    const presets = /* @__PURE__ */ new Set();
    uno.config.presets.forEach((i) => {
      if (!i.name)
        return;
      if (presets.has(i.name))
        console.warn(`[unocss] duplication of preset ${i.name} found, there might be something wrong with your config.`);
      else
        presets.add(i.name);
    });
    return result;
  }
  async function updateRoot(newRoot) {
    if (newRoot !== root) {
      root = newRoot;
      ready = reloadConfig();
    }
    return await ready;
  }
  function invalidate() {
    invalidations.forEach((cb) => cb());
  }
  function dispatchReload() {
    reloadListeners.forEach((cb) => cb());
  }
  async function extract(code, id) {
    if (id)
      modules.set(id, code);
    const len = tokens.size;
    await uno.applyExtractors(code.replace(SKIP_COMMENT_RE, ""), id, tokens);
    if (tokens.size > len)
      invalidate();
  }
  function filter(code, id) {
    if (code.includes(IGNORE_COMMENT))
      return false;
    return code.includes(INCLUDE_COMMENT) || code.includes(CSS_PLACEHOLDER) || rollupFilter(id.replace(/\?v=\w+$/, ""));
  }
  async function getConfig() {
    await ready;
    return rawConfig;
  }
  async function flushTasks() {
    const _tasks = [...tasks];
    await Promise.all(_tasks);
    tasks.splice(0, _tasks.length);
  }
  return {
    get ready() {
      return ready;
    },
    tokens,
    modules,
    affectedModules,
    tasks,
    flushTasks,
    invalidate,
    onInvalidate(fn) {
      invalidations.push(fn);
    },
    filter,
    reloadConfig,
    onReload(fn) {
      reloadListeners.push(fn);
    },
    uno,
    extract,
    getConfig,
    get root() {
      return root;
    },
    updateRoot,
    getConfigFileList: () => configFileList
  };
}

function getPath(id) {
  return id.replace(/\?.*$/, "");
}

function getHash(input, length = 8) {
  return node_crypto.createHash("sha256").update(input).digest("hex").slice(0, length);
}
function hash(str) {
  let i;
  let l;
  let hval = 2166136261;
  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return `00000${(hval >>> 0).toString(36)}`.slice(-6);
}

function replaceAsync(string, searchValue, replacer) {
  try {
    if (typeof replacer === "function") {
      const values = [];
      String.prototype.replace.call(string, searchValue, (...args) => {
        values.push(replacer(...args));
        return "";
      });
      return Promise.all(values).then((resolvedValues) => {
        return String.prototype.replace.call(string, searchValue, () => {
          return resolvedValues.shift() || "";
        });
      });
    } else {
      return Promise.resolve(
        String.prototype.replace.call(string, searchValue, replacer)
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

function ChunkModeBuildPlugin({ uno, filter }) {
  let cssPlugin;
  const files = {};
  return {
    name: "unocss:chunk",
    apply: "build",
    enforce: "pre",
    configResolved(config) {
      cssPlugin = config.plugins.find((i) => i.name === "vite:css-post");
    },
    transform(code, id) {
      if (!filter(code, id))
        return;
      files[id] = code;
      return null;
    },
    async renderChunk(_, chunk) {
      const chunks = Object.keys(chunk.modules).map((i) => files[i]).filter(Boolean);
      if (!chunks.length)
        return null;
      const tokens = /* @__PURE__ */ new Set();
      await Promise.all(chunks.map((c) => uno.applyExtractors(c, void 0, tokens)));
      const { css } = await uno.generate(tokens);
      const fakeCssId = `${chunk.fileName}.css`;
      await cssPlugin.transform(css, fakeCssId);
      chunk.modules[fakeCssId] = {
        code: null,
        originalLength: 0,
        removedExports: [],
        renderedExports: [],
        renderedLength: 0
      };
      return null;
    },
    async transformIndexHtml(code) {
      const { css } = await uno.generate(code);
      if (css)
        return `${code}<style>${css}</style>`;
    }
  };
}

async function applyTransformers(ctx, original, id, enforce = "default") {
  if (original.includes(IGNORE_COMMENT))
    return;
  const transformers = (ctx.uno.config.transformers || []).filter((i) => (i.enforce || "default") === enforce);
  if (!transformers.length)
    return;
  const skipMap = /* @__PURE__ */ new Map();
  let code = original;
  let s = new MagicString__default(transformSkipCode(code, skipMap));
  const maps = [];
  for (const t of transformers) {
    if (t.idFilter) {
      if (!t.idFilter(id))
        continue;
    } else if (!ctx.filter(code, id)) {
      continue;
    }
    await t.transform(s, id, ctx);
    if (s.hasChanged()) {
      code = restoreSkipCode(s.toString(), skipMap);
      maps.push(s.generateMap({ hires: true, source: id }));
      s = new MagicString__default(code);
    }
  }
  if (code !== original) {
    ctx.affectedModules.add(id);
    return {
      code,
      map: remapping__default(maps, (_, ctx2) => {
        ctx2.content = code;
        return null;
      })
    };
  }
}
function transformSkipCode(code, map) {
  for (const item of Array.from(code.matchAll(SKIP_COMMENT_RE))) {
    if (item != null) {
      const matched = item[0];
      const withHashKey = `@unocss-skip-placeholder-${hash(matched)}`;
      map.set(withHashKey, matched);
      code = code.replace(matched, withHashKey);
    }
  }
  return code;
}
function restoreSkipCode(code, map) {
  for (const [withHashKey, matched] of map.entries())
    code = code.replace(withHashKey, matched);
  return code;
}

async function setupContentExtractor(ctx, shouldWatch = false) {
  const { content } = await ctx.getConfig();
  const { extract, tasks, root, filter } = ctx;
  if (content?.inline) {
    await Promise.all(
      content.inline.map(async (c, idx) => {
        if (typeof c === "function")
          c = await c();
        if (typeof c === "string")
          c = { code: c };
        return extract(c.code, c.id ?? `__plain_content_${idx}__`);
      })
    );
  }
  if (content?.filesystem) {
    const files = await fg__default(content.filesystem, { cwd: root });
    async function extractFile(file) {
      file = node_path.isAbsolute(file) ? file : node_path.resolve(root, file);
      const code = await fs__default.readFile(file, "utf-8");
      if (!filter(code, file))
        return;
      const preTransform = await applyTransformers(ctx, code, file, "pre");
      const defaultTransform = await applyTransformers(ctx, preTransform?.code || code, file);
      await applyTransformers(ctx, defaultTransform?.code || preTransform?.code || code, file, "post");
      return await extract(preTransform?.code || code, file);
    }
    if (shouldWatch) {
      const { watch } = await import('chokidar');
      const ignored = ["**/{.git,node_modules}/**"];
      const watcher = watch(files, {
        ignorePermissionErrors: true,
        ignored,
        cwd: root,
        ignoreInitial: true
      });
      watcher.on("all", (type, file) => {
        if (type === "add" || type === "change") {
          const absolutePath = node_path.resolve(root, file);
          tasks.push(extractFile(absolutePath));
        }
      });
    }
    await Promise.all(files.map(extractFile));
  }
}

function isLegacyChunk(chunk, options) {
  return options.format === "system" && chunk.fileName.includes("-legacy");
}
function GlobalModeBuildPlugin(ctx) {
  const { uno, ready, extract, tokens, filter, getConfig, tasks, flushTasks } = ctx;
  const vfsLayers = /* @__PURE__ */ new Set();
  const layerImporterMap = /* @__PURE__ */ new Map();
  let viteConfig;
  const cssPostPlugins = /* @__PURE__ */ new Map();
  const cssPlugins = /* @__PURE__ */ new Map();
  async function applyCssTransform(css, id, dir, ctx2) {
    const {
      postcss = true
    } = await getConfig();
    if (!cssPlugins.get(dir) || !postcss)
      return css;
    const result = await cssPlugins.get(dir).transform.call(ctx2, css, id);
    if (!result)
      return css;
    if (typeof result === "string")
      css = result;
    else if (result.code)
      css = result.code;
    css = css.replace(/[\n\r]/g, "");
    return css;
  }
  let lastTokenSize = 0;
  let lastResult;
  async function generateAll() {
    await flushTasks();
    if (lastResult && lastTokenSize === tokens.size)
      return lastResult;
    lastResult = await uno.generate(tokens, { minify: true });
    lastTokenSize = tokens.size;
    return lastResult;
  }
  let replaced = false;
  return [
    {
      name: "unocss:global:build:scan",
      apply: "build",
      enforce: "pre",
      async buildStart() {
        vfsLayers.clear();
        tasks.length = 0;
        lastTokenSize = 0;
        lastResult = void 0;
      },
      transform(code, id) {
        if (filter(code, id))
          tasks.push(extract(code, id));
        return null;
      },
      transformIndexHtml: {
        order: "pre",
        handler(code, { filename }) {
          tasks.push(extract(code, filename));
        },
        // Compatibility with Legacy Vite
        enforce: "pre",
        transform(code, { filename }) {
          tasks.push(extract(code, filename));
        }
      },
      resolveId(id, importer) {
        const entry = resolveId(id);
        if (entry) {
          const layer = resolveLayer(entry);
          if (layer) {
            vfsLayers.add(layer);
            if (importer)
              layerImporterMap.set(importer, entry);
          }
          return entry;
        }
      },
      load(id) {
        const layer = resolveLayer(getPath(id));
        if (layer) {
          vfsLayers.add(layer);
          return getLayerPlaceholder(layer);
        }
      },
      moduleParsed({ id, importedIds }) {
        if (!layerImporterMap.has(id))
          return;
        const layerKey = layerImporterMap.get(id);
        if (!importedIds.includes(layerKey)) {
          layerImporterMap.delete(id);
          vfsLayers.delete(resolveLayer(layerKey));
        }
      },
      async configResolved(config) {
        const distDirs = [
          node_path.resolve(config.root, config.build.outDir)
        ];
        if (config.build.rollupOptions.output) {
          const outputOptions = config.build.rollupOptions.output;
          const outputDirs = Array.isArray(outputOptions) ? outputOptions.map((option) => option.dir).filter(Boolean) : outputOptions.dir ? [outputOptions.dir] : [];
          outputDirs.forEach((dir) => {
            distDirs.push(dir);
            if (!node_path.isAbsolute(dir))
              distDirs.push(node_path.resolve(config.root, dir));
          });
        }
        const cssPostPlugin = config.plugins.find((i) => i.name === "vite:css-post");
        const cssPlugin = config.plugins.find((i) => i.name === "vite:css");
        if (cssPostPlugin)
          distDirs.forEach((dir) => cssPostPlugins.set(dir, cssPostPlugin));
        if (cssPlugin)
          distDirs.forEach((dir) => cssPlugins.set(dir, cssPlugin));
        await ready;
      },
      // we inject a hash to chunk before the dist hash calculation to make sure
      // the hash is different when unocss changes
      async renderChunk(_, chunk, options) {
        if (isLegacyChunk(chunk, options))
          return null;
        if (!Object.keys(chunk.modules).some((i) => RESOLVED_ID_RE.test(i)))
          return null;
        const cssPost = cssPostPlugins.get(options.dir);
        if (!cssPost) {
          this.warn("[unocss] failed to find vite:css-post plugin. It might be an internal bug of UnoCSS");
          return null;
        }
        let { css } = await generateAll();
        const fakeCssId = `${viteConfig.root}/${chunk.fileName}-unocss-hash.css`;
        css = await applyCssTransform(css, fakeCssId, options.dir, this);
        const hash = getHash(css);
        const transformHandler = "handler" in cssPost.transform ? cssPost.transform.handler : cssPost.transform;
        await transformHandler.call({}, getHashPlaceholder(hash), fakeCssId);
        chunk.modules[fakeCssId] = {
          code: null,
          originalLength: 0,
          removedExports: [],
          renderedExports: [],
          renderedLength: 0
        };
        return null;
      }
    },
    {
      name: "unocss:global:content",
      enforce: "pre",
      configResolved(config) {
        viteConfig = config;
      },
      buildStart() {
        tasks.push(setupContentExtractor(ctx, viteConfig.command === "serve"));
      }
    },
    {
      name: "unocss:global:build:generate",
      apply: "build",
      async renderChunk(code, chunk, options) {
        if (isLegacyChunk(chunk, options))
          return null;
        if (!Object.keys(chunk.modules).some((i) => RESOLVED_ID_RE.test(i)))
          return null;
        const cssPost = cssPostPlugins.get(options.dir);
        if (!cssPost) {
          this.warn("[unocss] failed to find vite:css-post plugin. It might be an internal bug of UnoCSS");
          return null;
        }
        const result = await generateAll();
        const mappedVfsLayer = Array.from(vfsLayers).map((layer) => layer === LAYER_MARK_ALL ? layer : layer.replace(/^_/, ""));
        const cssWithLayers = Array.from(vfsLayers).map((layer) => `#--unocss-layer-start--${layer}--{start:${layer}} ${layer === LAYER_MARK_ALL ? result.getLayers(void 0, mappedVfsLayer) : result.getLayer(layer.replace(/^_/, "")) || ""} #--unocss-layer-end--${layer}--{end:${layer}}`).join("");
        const fakeCssId = `${viteConfig.root}/${chunk.fileName}-unocss-hash.css`;
        const css = await applyCssTransform(cssWithLayers, fakeCssId, options.dir, this);
        const transformHandler = "handler" in cssPost.transform ? cssPost.transform.handler : cssPost.transform;
        await transformHandler.call({}, css, fakeCssId);
      }
    },
    {
      name: "unocss:global:build:bundle",
      apply: "build",
      enforce: "post",
      // rewrite the css placeholders
      async generateBundle(options, bundle) {
        const checkJs = ["umd", "amd", "iife"].includes(options.format);
        const files = Object.keys(bundle).filter((i) => i.endsWith(".css") || checkJs && i.endsWith(".js"));
        if (!files.length)
          return;
        if (!vfsLayers.size) {
          if (replaced)
            return;
          const msg = "[unocss] Entry module not found. Did you add `import 'uno.css'` in your main entry?";
          this.warn(msg);
          return;
        }
        const getLayer = (layer, input, replace = false) => {
          const re = new RegExp(`#--unocss-layer-start--${layer}--\\{start:${layer}\\}([\\s\\S]*?)#--unocss-layer-end--${layer}--\\{end:${layer}\\}`, "g");
          if (replace)
            return input.replace(re, "");
          const match = re.exec(input);
          if (match)
            return match[1];
          return "";
        };
        for (const file of files) {
          const chunk = bundle[file];
          if (chunk.type === "asset" && typeof chunk.source === "string") {
            const css = chunk.source.replace(HASH_PLACEHOLDER_RE, "");
            chunk.source = await replaceAsync(css, LAYER_PLACEHOLDER_RE, async (_, layer) => {
              replaced = true;
              return getLayer(layer, css);
            });
            Array.from(vfsLayers).forEach((layer) => {
              chunk.source = getLayer(layer, chunk.source, true);
            });
          } else if (chunk.type === "chunk" && typeof chunk.code === "string") {
            const js = chunk.code.replace(HASH_PLACEHOLDER_RE, "");
            chunk.code = await replaceAsync(js, LAYER_PLACEHOLDER_RE, async (_, layer) => {
              replaced = true;
              const css = getLayer(layer, js);
              return css.replace(/\n/g, "").replace(/(?<!\\)(['"])/g, "\\$1");
            });
            Array.from(vfsLayers).forEach((layer) => {
              chunk.code = getLayer(layer, chunk.code, true);
            });
          }
        }
        if (!replaced) {
          let msg = "[unocss] does not found CSS placeholder in the generated chunks";
          if (viteConfig.build.lib && checkJs)
            msg += "\nIt seems you are building in library mode, it's recommended to set `build.cssCodeSplit` to true.\nSee https://github.com/vitejs/vite/issues/1579";
          else
            msg += "\nThis is likely an internal bug of unocss vite plugin";
          this.error(msg);
        }
      }
    }
  ];
}

const WARN_TIMEOUT = 2e4;
const WS_EVENT_PREFIX = "unocss:hmr";
const HASH_LENGTH = 6;
function GlobalModeDevPlugin({ uno, tokens, tasks, flushTasks, affectedModules, onInvalidate, extract, filter, getConfig }) {
  const servers = [];
  const entries = /* @__PURE__ */ new Set();
  let invalidateTimer;
  const lastServedHash = /* @__PURE__ */ new Map();
  let lastServedTime = Date.now();
  let resolved = false;
  let resolvedWarnTimer;
  async function generateCSS(layer) {
    await flushTasks();
    let result;
    let tokensSize = tokens.size;
    do {
      result = await uno.generate(tokens);
      if (tokensSize === tokens.size)
        break;
      tokensSize = tokens.size;
    } while (true);
    const css = layer === LAYER_MARK_ALL ? result.getLayers(void 0, Array.from(entries).map((i) => resolveLayer(i)).filter((i) => !!i)) : result.getLayer(layer);
    const hash = getHash(css || "", HASH_LENGTH);
    lastServedHash.set(layer, hash);
    lastServedTime = Date.now();
    return { hash, css };
  }
  function invalidate(timer = 10, ids = entries) {
    for (const server of servers) {
      for (const id of ids) {
        const mod = server.moduleGraph.getModuleById(id);
        if (!mod)
          continue;
        server.moduleGraph.invalidateModule(mod);
      }
    }
    clearTimeout(invalidateTimer);
    invalidateTimer = setTimeout(() => {
      lastServedHash.clear();
      sendUpdate(ids);
    }, timer);
  }
  function sendUpdate(ids) {
    for (const server of servers) {
      server.ws.send({
        type: "update",
        updates: Array.from(ids).map((id) => {
          const mod = server.moduleGraph.getModuleById(id);
          if (!mod)
            return null;
          return {
            acceptedPath: mod.url,
            path: mod.url,
            timestamp: lastServedTime,
            type: "js-update"
          };
        }).filter(core.notNull)
      });
    }
  }
  function setWarnTimer() {
    if (!resolved && !resolvedWarnTimer) {
      resolvedWarnTimer = setTimeout(() => {
        if (process__default.env.TEST || process__default.env.NODE_ENV === "test")
          return;
        if (!resolved) {
          const msg = "[unocss] Entry module not found. Did you add `import 'uno.css'` in your main entry?";
          console.warn(msg);
          servers.forEach(({ ws }) => ws.send({
            type: "error",
            err: { message: msg, stack: "" }
          }));
        }
      }, WARN_TIMEOUT);
    }
  }
  function clearWarnTimer() {
    if (resolvedWarnTimer) {
      clearTimeout(resolvedWarnTimer);
      resolvedWarnTimer = void 0;
    }
  }
  onInvalidate(() => {
    invalidate(10, /* @__PURE__ */ new Set([...entries, ...affectedModules]));
  });
  return [
    {
      name: "unocss:global",
      apply: "serve",
      enforce: "pre",
      async configureServer(_server) {
        servers.push(_server);
        _server.ws.on(WS_EVENT_PREFIX, async ([layer]) => {
          const preHash = lastServedHash.get(layer);
          await generateCSS(layer);
          if (lastServedHash.get(layer) !== preHash)
            sendUpdate(entries);
        });
      },
      buildStart() {
        uno.generate([], { preflights: true });
      },
      transform(code, id) {
        if (filter(code, id))
          tasks.push(extract(code, id));
        return null;
      },
      transformIndexHtml: {
        order: "pre",
        handler(code, { filename }) {
          setWarnTimer();
          tasks.push(extract(code, filename));
        },
        // Compatibility with Legacy Vite
        enforce: "pre",
        transform(code, { filename }) {
          setWarnTimer();
          tasks.push(extract(code, filename));
        }
      },
      resolveId(id) {
        const entry = resolveId(id);
        if (entry) {
          resolved = true;
          clearWarnTimer();
          entries.add(entry);
          return entry;
        }
      },
      async load(id) {
        const layer = resolveLayer(getPath(id));
        if (!layer)
          return null;
        const { hash, css } = await generateCSS(layer);
        return {
          // add hash to the chunk of CSS that it will send back to client to check if there is new CSS generated
          code: `__uno_hash_${hash}{--:'';}${css}`,
          map: { mappings: "" }
        };
      },
      closeBundle() {
        clearWarnTimer();
      }
    },
    {
      name: "unocss:global:post",
      apply(config, env) {
        return env.command === "serve" && !config.build?.ssr;
      },
      enforce: "post",
      async transform(code, id) {
        const layer = resolveLayer(getPath(id));
        if (layer && code.includes("import.meta.hot")) {
          let hmr = `
try {
  let hash = __vite__css.match(/__uno_hash_(\\w{${HASH_LENGTH}})/)
  hash = hash && hash[1]
  if (!hash)
    console.warn('[unocss-hmr]', 'failed to get unocss hash, hmr might not work')
  else
    await import.meta.hot.send('${WS_EVENT_PREFIX}', ['${layer}']);
} catch (e) {
  console.warn('[unocss-hmr]', e)
}
if (!import.meta.url.includes('?'))
  await new Promise(resolve => setTimeout(resolve, 100))`;
          const config = await getConfig();
          if (config.hmrTopLevelAwait === false)
            hmr = `;(async function() {${hmr}
})()`;
          hmr = `
if (import.meta.hot) {${hmr}}`;
          const s = new MagicString__default(code);
          s.append(hmr);
          return {
            code: s.toString(),
            map: s.generateMap()
          };
        }
      }
    }
  ];
}

function GlobalModePlugin(ctx) {
  return [
    ...GlobalModeBuildPlugin(ctx),
    ...GlobalModeDevPlugin(ctx)
  ];
}

const VIRTUAL_PREFIX = "/@unocss/";
const SCOPE_IMPORT_RE = / from (['"])(@unocss\/scope)\1/;
function PerModuleModePlugin({ uno, filter }) {
  const moduleMap = /* @__PURE__ */ new Map();
  let server;
  const invalidate = (hash) => {
    if (!server)
      return;
    const id = `${VIRTUAL_PREFIX}${hash}.css`;
    const mod = server.moduleGraph.getModuleById(id);
    if (!mod)
      return;
    server.moduleGraph.invalidateModule(mod);
    server.ws.send({
      type: "update",
      updates: [{
        acceptedPath: id,
        path: id,
        timestamp: +Date.now(),
        type: "js-update"
      }]
    });
  };
  return [
    {
      name: "unocss:module-scope:pre",
      enforce: "pre",
      resolveId(id) {
        const entry = resolveId(id);
        if (entry)
          return entry;
      },
      async load(id) {
        const layer = resolveLayer(getPath(id));
        if (!layer)
          return null;
        const { css } = await uno.generate("", { preflights: true });
        if (!css)
          return null;
        return {
          code: css,
          map: null
        };
      },
      async transform(code, id) {
        if (!filter(code, id))
          return;
        const hash = getHash(id);
        const hasScope = SCOPE_IMPORT_RE.test(code);
        const { css } = await uno.generate(code, { id, scope: hasScope ? `.${hash}` : void 0, preflights: false });
        if (!css && !hasScope)
          return null;
        if (hasScope)
          code = code.replace(SCOPE_IMPORT_RE, ` from 'data:text/javascript;base64,${node_buffer.Buffer.from(`export default () => "${hash}"`).toString("base64")}'`);
        moduleMap.set(hash, [id, css]);
        invalidate(hash);
        return null;
      }
    },
    {
      name: "unocss:module-scope",
      enforce: "post",
      configureServer(_server) {
        server = _server;
      },
      async transform(code, id) {
        if (!filter(code, id))
          return;
        const hash = getHash(id);
        invalidate(hash);
        const module = moduleMap.get(hash) || [];
        if (module.length) {
          return {
            code: `import "${VIRTUAL_PREFIX}${hash}.css";${code}`,
            map: null
          };
        }
      },
      resolveId(id) {
        return id.startsWith(VIRTUAL_PREFIX) ? id : null;
      },
      load(id) {
        if (!id.startsWith(VIRTUAL_PREFIX))
          return null;
        const hash = id.slice(VIRTUAL_PREFIX.length, -".css".length);
        const [source, css] = moduleMap.get(hash) || [];
        if (source)
          this.addWatchFile(source);
        return `
/* unocss ${source} */
${css}`;
      }
    }
  ];
}

function VueScopedPlugin({ uno, ready }) {
  let filter = pluginutils.createFilter([/\.vue$/], defaultPipelineExclude);
  async function transformSFC(code) {
    const { css } = await uno.generate(code);
    if (!css)
      return null;
    return `${code}
<style scoped>${css}</style>`;
  }
  return {
    name: "unocss:vue-scoped",
    enforce: "pre",
    async configResolved() {
      const { config } = await ready;
      filter = config.content?.pipeline === false ? () => false : pluginutils.createFilter(
        config.content?.pipeline?.include ?? config.include ?? [/\.vue$/],
        config.content?.pipeline?.exclude ?? config.exclude ?? defaultPipelineExclude
      );
    },
    transform(code, id) {
      if (!filter(id) || !id.endsWith(".vue"))
        return;
      return transformSFC(code);
    },
    handleHotUpdate(ctx) {
      const read = ctx.read;
      if (filter(ctx.file)) {
        ctx.read = async () => {
          const code = await read();
          return await transformSFC(code) || code;
        };
      }
    }
  };
}

function ShadowDomModuleModePlugin({ uno }) {
  const partExtractorRegex = /^part-\[(.+)]:/;
  const nameRegexp = /<([^\s^!>]+)\s*([^>]*)>/;
  const vueSFCStyleRE = new RegExp(`<style.*>[\\s\\S]*${CSS_PLACEHOLDER}[\\s\\S]*<\\/style>`);
  const checkElement = (useParts, idxResolver, element) => {
    if (!element)
      return null;
    const applyParts = useParts.filter((p) => element[2].includes(p.rule));
    if (applyParts.length === 0)
      return null;
    const name = element[1];
    const idx = idxResolver(name);
    return {
      name,
      entries: applyParts.map(({ rule, part }) => [
        `.${rule.replace(/[:[\]]/g, "\\$&")}::part(${part})`,
        `${name}:nth-of-type(${idx})::part(${part})`
      ])
    };
  };
  const idxMapFactory = () => {
    const elementIdxMap = /* @__PURE__ */ new Map();
    return {
      idxResolver: (name) => {
        let idx = elementIdxMap.get(name);
        if (!idx) {
          idx = 1;
          elementIdxMap.set(name, idx);
        }
        return idx;
      },
      incrementIdx: (name) => {
        elementIdxMap.set(name, elementIdxMap.get(name) + 1);
      }
    };
  };
  const transformWebComponent = async (code, id) => {
    if (!code.match(CSS_PLACEHOLDER))
      return code;
    let { css, matched } = await uno.generate(code, {
      preflights: true,
      safelist: true
    });
    if (css && matched) {
      const useParts = Array.from(matched).reduce((acc, rule) => {
        const matcher = rule.match(partExtractorRegex);
        if (matcher)
          acc.push({ part: matcher[1], rule });
        return acc;
      }, new Array());
      if (useParts.length > 0) {
        let useCode = code;
        let element;
        const partsToApply = /* @__PURE__ */ new Map();
        const { idxResolver, incrementIdx } = idxMapFactory();
        while (element = nameRegexp.exec(useCode)) {
          const result = checkElement(
            useParts,
            idxResolver,
            element
          );
          if (result) {
            result.entries.forEach(([name, replacement]) => {
              let list = partsToApply.get(name);
              if (!list) {
                list = [];
                partsToApply.set(name, list);
              }
              list.push(replacement);
            });
            incrementIdx(result.name);
          }
          useCode = useCode.slice(element[0].length + 1);
        }
        if (partsToApply.size > 0) {
          css = Array.from(partsToApply.entries()).reduce((k, [r, name]) => {
            return k.replace(r, name.join(",\n"));
          }, css);
        }
      }
    }
    if (id.includes("?vue&type=style") || id.endsWith(".vue") && vueSFCStyleRE.test(code))
      return code.replace(new RegExp(`(\\/\\*\\s*)?${CSS_PLACEHOLDER}(\\s*\\*\\/)?`), css || "");
    return code.replace(CSS_PLACEHOLDER, css?.replace(/\\/g, "\\\\")?.replace(/`/g, "\\`") ?? "");
  };
  return {
    name: "unocss:shadow-dom",
    enforce: "pre",
    async transform(code, id) {
      return transformWebComponent(code, id);
    },
    handleHotUpdate(ctx) {
      const read = ctx.read;
      ctx.read = async () => {
        const code = await read();
        return await transformWebComponent(code, ctx.file);
      };
    }
  };
}

function ConfigHMRPlugin(ctx) {
  const { ready, uno } = ctx;
  return {
    name: "unocss:config",
    async configResolved(config) {
      await ctx.updateRoot(config.root);
    },
    async configureServer(server) {
      uno.config.envMode = "dev";
      const { sources } = await ready;
      if (!sources.length)
        return;
      server.watcher.add(sources);
      server.watcher.on("change", async (p) => {
        if (!sources.includes(p))
          return;
        await ctx.reloadConfig();
        server.ws.send({
          type: "custom",
          event: "unocss:config-changed"
        });
      });
    }
  };
}

function createTransformerPlugins(ctx) {
  const orders = ["default", "pre", "post"];
  return orders.map((_order) => {
    const order = _order === "default" ? void 0 : _order;
    const htmlHandler = (code) => {
      return applyTransformers(ctx, code, "index.html", order).then((t) => t?.code);
    };
    return {
      name: `unocss:transformers:${order}`,
      enforce: order,
      transform(code, id) {
        return applyTransformers(ctx, code, id, order);
      },
      transformIndexHtml: {
        order,
        handler: htmlHandler,
        // Compatibility with Legacy Vite
        enforce: order,
        transform: htmlHandler
      }
    };
  });
}

const _dirname = typeof __dirname !== "undefined" ? __dirname : node_path.dirname(node_url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href))));
const DEVTOOLS_MODULE_ID = "virtual:unocss-devtools";
const MOCK_CLASSES_MODULE_ID = "virtual:unocss-mock-classes";
const MOCK_CLASSES_PATH = "/@unocss/mock-classes";
const DEVTOOLS_PATH = "/@unocss/devtools";
const DEVTOOLS_CSS_PATH = "/@unocss/devtools.css";
const devtoolCss = /* @__PURE__ */ new Set();
const MODULES_MAP = {
  [DEVTOOLS_MODULE_ID]: DEVTOOLS_PATH,
  [MOCK_CLASSES_MODULE_ID]: MOCK_CLASSES_PATH
};
const BASE_POST_PATH = "/@unocss-devtools-update";
function getBodyJson(req) {
  return new Promise((resolve2, reject) => {
    let body = "";
    req.on("data", (chunk) => body += chunk);
    req.on("error", reject);
    req.on("end", () => {
      try {
        resolve2(JSON.parse(body) || {});
      } catch (e) {
        reject(e);
      }
    });
  });
}
function createDevtoolsPlugin(ctx, pluginConfig) {
  let config;
  let server;
  let clientCode = "";
  let devtoolTimer;
  let lastUpdate = Date.now();
  let postPath = BASE_POST_PATH;
  function toClass(name) {
    return `${core.toEscapedSelector(name)}{}`;
  }
  function updateDevtoolClass() {
    clearTimeout(devtoolTimer);
    devtoolTimer = setTimeout(() => {
      lastUpdate = Date.now();
      if (!server)
        return;
      const mod = server.moduleGraph.getModuleById(DEVTOOLS_CSS_PATH);
      if (!mod)
        return;
      server.moduleGraph.invalidateModule(mod);
      server.ws.send({
        type: "update",
        updates: [{
          acceptedPath: DEVTOOLS_CSS_PATH,
          path: DEVTOOLS_CSS_PATH,
          timestamp: lastUpdate,
          type: "js-update"
        }]
      });
    }, 100);
  }
  async function getMockClassesInjector() {
    const suggest = Object.keys(ctx.uno.config.rulesStaticMap);
    const comment = "/* unocss CSS mock class names for devtools auto-completion */\n";
    const css = suggest.map(toClass).join("");
    return `
  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.innerHTML = ${JSON.stringify(comment + css)}
  document.head.prepend(style)
  `;
  }
  return [
    {
      name: "unocss:devtools",
      configResolved(_config) {
        config = _config;
        postPath = `${config.base?.replace(/\/$/, "") ?? ""}${BASE_POST_PATH}`;
      },
      configureServer(_server) {
        server = _server;
        server.middlewares.use(async (req, res, next) => {
          if (req.url !== postPath)
            return next();
          try {
            const data = await getBodyJson(req);
            const type = data?.type;
            let changed = false;
            switch (type) {
              case "add-classes":
                data.data.forEach((key) => {
                  if (!devtoolCss.has(key)) {
                    devtoolCss.add(key);
                    changed = true;
                  }
                });
                if (changed)
                  updateDevtoolClass();
            }
            res.statusCode = 200;
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
          }
          res.end();
        });
      },
      resolveId(id) {
        if (id === DEVTOOLS_CSS_PATH)
          return DEVTOOLS_CSS_PATH;
        return MODULES_MAP[id];
      },
      async load(id) {
        if (id === DEVTOOLS_PATH) {
          if (!clientCode) {
            clientCode = [
              await fs__default$1.promises.readFile(node_path.resolve(_dirname, "client.mjs"), "utf-8"),
              `import('${MOCK_CLASSES_MODULE_ID}')`,
              `import('${DEVTOOLS_CSS_PATH}')`
            ].join("\n").replace("__POST_PATH__", `${config.server?.origin ?? ""}${postPath}`).replace("__POST_FETCH_MODE__", pluginConfig.fetchMode ?? "cors");
          }
          return config.command === "build" ? "" : clientCode;
        } else if (id === MOCK_CLASSES_PATH) {
          return await getMockClassesInjector();
        } else if (id === DEVTOOLS_CSS_PATH) {
          const { css } = await ctx.uno.generate(devtoolCss);
          return css;
        }
      }
    }
  ];
}

function defineConfig(config) {
  return config;
}
function UnocssPlugin(configOrPath, defaults = {}) {
  const ctx = createContext(configOrPath, {
    envMode: process__default.env.NODE_ENV === "development" ? "dev" : "build",
    ...defaults
  });
  const inlineConfig = configOrPath && typeof configOrPath !== "string" ? configOrPath : {};
  const mode = inlineConfig.mode ?? "global";
  const plugins = [
    ConfigHMRPlugin(ctx),
    ...createTransformerPlugins(ctx),
    ...createDevtoolsPlugin(ctx, inlineConfig),
    {
      name: "unocss:api",
      api: {
        getContext: () => ctx,
        getMode: () => mode
      }
    }
  ];
  if (inlineConfig.inspector !== false)
    plugins.push(UnocssInspector__default(ctx));
  if (mode === "per-module") {
    plugins.push(...PerModuleModePlugin(ctx));
  } else if (mode === "vue-scoped") {
    plugins.push(VueScopedPlugin(ctx));
  } else if (mode === "svelte-scoped") {
    throw new Error("[unocss] svelte-scoped mode is now its own package, please use @unocss/svelte-scoped according to the docs");
  } else if (mode === "shadow-dom") {
    plugins.push(ShadowDomModuleModePlugin(ctx));
  } else if (mode === "global") {
    plugins.push(...GlobalModePlugin(ctx));
  } else if (mode === "dist-chunk") {
    plugins.push(
      ChunkModeBuildPlugin(ctx),
      ...GlobalModeDevPlugin(ctx)
    );
  } else {
    throw new Error(`[unocss] unknown mode "${mode}"`);
  }
  return plugins.filter(Boolean);
}

exports.ChunkModeBuildPlugin = ChunkModeBuildPlugin;
exports.GlobalModeBuildPlugin = GlobalModeBuildPlugin;
exports.GlobalModeDevPlugin = GlobalModeDevPlugin;
exports.GlobalModePlugin = GlobalModePlugin;
exports.PerModuleModePlugin = PerModuleModePlugin;
exports.VueScopedPlugin = VueScopedPlugin;
exports.default = UnocssPlugin;
exports.defineConfig = defineConfig;
