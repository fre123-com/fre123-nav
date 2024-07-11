import fs$1, { existsSync } from 'node:fs';
import os, { homedir } from 'node:os';
import fs from 'node:fs/promises';
import { join, resolve, dirname as dirname$1 } from 'pathe';
import { logger, useNuxt, addPlugin, addTemplate, addVitePlugin } from '@nuxt/kit';
import { searchForWorkspaceRoot } from 'vite';
import sirv from 'sirv';
import { colors } from 'consola/utils';
import { createBirpcGroup } from 'birpc';
import { stringify, parse as parse$1 } from 'flatted';
import { d as defaultAllowedExtensions, a as defaultTabOptions, W as WS_EVENT_NAME } from '../shared/devtools.fc176ede.mjs';
import { dirname, join as join$1, parse } from 'node:path';
import { randomStr } from '@antfu/utils';
import { hash } from 'ohash';
import { imageMeta } from 'image-meta';
import { debounce } from 'perfect-debounce';
import fg from 'fast-glob';
import { startSubprocess } from '@nuxt/devtools-kit';
import isInstalledGlobally from 'is-installed-globally';
import { detectPackageManager } from 'nypm';
import { parseModule } from 'magicast';
import { addNuxtModule, getDefaultExportOptions } from 'magicast/helpers';
import { createRequire } from 'node:module';
import 'pkg-types';
import semver from 'semver';
import { getPackageInfo } from 'local-pkg';
import { resolveBuiltinPresets } from 'unimport';
import destr from 'destr';
import { snakeCase } from 'scule';
import Git from 'simple-git';
import { runtimeDir, clientDir, packageDir, isGlobalInstall } from '../dirs.mjs';

const version = "1.0.8";

function getHomeDir() {
  return process.env.XDG_CONFIG_HOME || homedir();
}
async function readLocalOptions(defaults, options) {
  const { filePath } = getOptionsFilepath(options);
  if (existsSync(filePath)) {
    try {
      const options2 = {
        ...defaults,
        ...JSON.parse(await fs.readFile(filePath, "utf-8")).settings || {}
      };
      return options2;
    } catch (e) {
      console.error(`[DevTools] failed to parse local options file: ${filePath}, fallback to defaults`);
      console.error(e);
      return { ...defaults };
    }
  } else {
    return { ...defaults };
  }
}
function getOptionsFilepath(options) {
  let hashedKey;
  if (options.key)
    hashedKey = hash(`${options.root}:${options.key}`);
  else
    hashedKey = hash(options.root);
  const home = getHomeDir();
  const filePath = join(home, ".nuxt/devtools", `${hashedKey}.json`);
  return {
    filePath,
    hashedKey
  };
}
async function clearLocalOptions(options) {
  const { filePath } = getOptionsFilepath(options);
  if (existsSync(filePath))
    await fs.unlink(filePath);
}
async function writeLocalOptions(settings, options) {
  const { filePath, hashedKey } = getOptionsFilepath(options);
  await fs.mkdir(dirname(filePath), { recursive: true });
  await fs.writeFile(
    filePath,
    JSON.stringify(
      {
        root: options.root,
        hash: hashedKey,
        settings
      },
      null,
      2
    ),
    "utf-8"
  );
}

let token;
async function getDevAuthToken() {
  if (token)
    return token;
  const home = getHomeDir();
  const dir = join$1(home, ".nuxt/devtools");
  const filepath = join$1(dir, "dev-auth-token.txt");
  if (existsSync(filepath))
    token = (await fs.readFile(filepath, "utf-8")).trim();
  if (!token)
    token = randomStr(16);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filepath, token, "utf-8");
  return token;
}

const IGNORE_STORAGE_MOUNTS = ["root", "build", "src", "cache"];
function shouldIgnoreStorageKey(key) {
  return IGNORE_STORAGE_MOUNTS.includes(key.split(":")[0]);
}
function setupStorageRPC({
  nuxt,
  rpc,
  ensureDevAuthToken
}) {
  const storageMounts = {};
  let storage;
  nuxt.hook("nitro:init", (nitro) => {
    storage = nitro.storage;
    nuxt.hook("ready", () => {
      storage.watch((event, key) => {
        if (shouldIgnoreStorageKey(key))
          return;
        rpc.broadcast.callHook.asEvent("storage:key:update", key, event);
      });
    });
    const mounts = {
      ...nitro.options.storage,
      ...nitro.options.devStorage
    };
    for (const name of Object.keys(mounts)) {
      if (shouldIgnoreStorageKey(name))
        continue;
      storageMounts[name] = mounts[name];
    }
  });
  return {
    async getStorageMounts() {
      return storageMounts;
    },
    async getStorageKeys(base) {
      if (!storage)
        return [];
      try {
        const keys = await storage.getKeys(base);
        return keys.filter((key) => !shouldIgnoreStorageKey(key));
      } catch (err) {
        console.error(`Cloud not fetch storage keys for ${base}:`, err);
        return [];
      }
    },
    async getStorageItem(token, key) {
      await ensureDevAuthToken(token);
      if (!storage)
        return null;
      return await storage.getItem(key);
    },
    async setStorageItem(token, key, value) {
      await ensureDevAuthToken(token);
      if (!storage)
        return;
      return await storage.setItem(key, value);
    },
    async removeStorageItem(token, key) {
      await ensureDevAuthToken(token);
      if (!storage)
        return;
      return await storage.removeItem(key);
    }
  };
}

function setupAssetsRPC({ nuxt, ensureDevAuthToken, refresh, options }) {
  const _imageMetaCache = /* @__PURE__ */ new Map();
  let cache = null;
  const extensions = options.assets?.uploadExtensions || defaultAllowedExtensions;
  const publicDir = resolve(nuxt.options.srcDir, nuxt.options.dir.public);
  const refreshDebounced = debounce(() => {
    cache = null;
    refresh("getStaticAssets");
  }, 500);
  nuxt.hook("builder:watch", (event, key) => {
    if (key.startsWith(nuxt.options.dir.public) && (event === "add" || event === "unlink"))
      refreshDebounced();
  });
  async function scan() {
    if (cache)
      return cache;
    const baseURL = nuxt.options.app.baseURL;
    const files = await fg(["**/*"], {
      cwd: publicDir,
      onlyFiles: true
    });
    function guessType(path) {
      if (/\.(png|jpe?g|jxl|gif|svg|webp|avif|ico|bmp|tiff?)$/i.test(path))
        return "image";
      if (/\.(mp4|webm|ogv|mov|avi|flv|wmv|mpg|mpeg|mkv|3gp|3g2|ts|mts|m2ts|vob|ogm|ogx|rm|rmvb|asf|amv|divx|m4v|svi|viv|f4v|f4p|f4a|f4b)$/i.test(path))
        return "video";
      if (/\.(mp3|wav|ogg|flac|aac|wma|alac|ape|ac3|dts|tta|opus|amr|aiff|au|mid|midi|ra|rm|wv|weba|dss|spx|vox|tak|dsf|dff|dsd|cda)$/i.test(path))
        return "audio";
      if (/\.(woff2?|eot|ttf|otf|ttc|pfa|pfb|pfm|afm)/i.test(path))
        return "font";
      if (/\.(json[5c]?|te?xt|[mc]?[jt]sx?|md[cx]?|markdown)/i.test(path))
        return "text";
      return "other";
    }
    cache = await Promise.all(files.map(async (path) => {
      const filePath = resolve(publicDir, path);
      const stat = await fs.lstat(filePath);
      return {
        path,
        publicPath: join(baseURL, path),
        filePath,
        type: guessType(path),
        size: stat.size,
        mtime: stat.mtimeMs
      };
    }));
    return cache;
  }
  return {
    async getStaticAssets() {
      return await scan();
    },
    async getImageMeta(token, filepath) {
      await ensureDevAuthToken(token);
      if (_imageMetaCache.has(filepath))
        return _imageMetaCache.get(filepath);
      try {
        const meta = imageMeta(await fs.readFile(filepath));
        _imageMetaCache.set(filepath, meta);
        return meta;
      } catch (e) {
        _imageMetaCache.set(filepath, void 0);
        console.error(e);
        return void 0;
      }
    },
    async getTextAssetContent(token, filepath, limit = 300) {
      await ensureDevAuthToken(token);
      try {
        const content = await fs.readFile(filepath, "utf-8");
        return content.slice(0, limit);
      } catch (e) {
        console.error(e);
        return void 0;
      }
    },
    async writeStaticAssets(token, files, folder) {
      await ensureDevAuthToken(token);
      const baseDir = resolve(nuxt.options.srcDir, nuxt.options.dir.public + folder);
      return await Promise.all(
        files.map(async ({ path, content, encoding, override }) => {
          let finalPath = resolve(baseDir, path);
          const { ext } = parse(finalPath);
          if (extensions !== "*") {
            if (!extensions.includes(ext.toLowerCase().slice(1)))
              throw new Error(`File extension ${ext} is not allowed to upload, allowed extensions are: ${extensions.join(", ")}
You can configure it in Nuxt config at \`devtools.assets.uploadExtensions\`.`);
          }
          if (!override) {
            try {
              await fs.stat(finalPath);
              const base = finalPath.slice(0, finalPath.length - ext.length - 1);
              let i = 1;
              while (await fs.access(`${base}-${i}.${ext}`).then(() => true).catch(() => false))
                i++;
              finalPath = `${base}-${i}.${ext}`;
            } catch (err) {
            }
          }
          await fs.writeFile(finalPath, content, {
            encoding: encoding ?? "utf-8"
          });
          return finalPath;
        })
      );
    },
    async deleteStaticAsset(token, path) {
      await ensureDevAuthToken(token);
      return await fs.unlink(path);
    },
    async renameStaticAsset(token, oldPath, newPath) {
      await ensureDevAuthToken(token);
      const exist = cache?.find((asset) => asset.filePath === newPath);
      if (exist)
        throw new Error(`File ${newPath} already exists`);
      return await fs.rename(oldPath, newPath);
    }
  };
}

async function checkForUpdateOf(name, current, nuxt = useNuxt()) {
  try {
    if (!current) {
      const require = createRequire(nuxt.options.rootDir);
      const info = await getPackageInfo(name, { paths: require.resolve.paths(name) || void 0 });
      if (!info)
        return;
      current = info.packageJson.version;
    }
    if (!current)
      return;
    const packument = await import('pacote').then((r) => r.default?.packument || r.packument);
    const manifest = await packument(name);
    const latest = manifest["dist-tags"].latest;
    const needsUpdate = latest !== current && semver.lt(current, latest);
    return {
      name,
      current,
      latest,
      needsUpdate
    };
  } catch (e) {
    logger.warn(`Failed to check for update of ${name}:`);
    logger.warn(e);
  }
}

async function magicastGuard(fn, message = "") {
  let generated;
  try {
    generated = await fn();
  } catch (e) {
    logger.error(e);
    throw new Error(`Magicast failed to modify Nuxt config automatically. Maybe the config are composed too dynamically that we failed to statically analyze it. ${message}`);
  }
  return generated;
}

function setupNpmRPC({ nuxt, ensureDevAuthToken }) {
  let detectPromise;
  const updatesPromise = /* @__PURE__ */ new Map();
  function getPackageManager() {
    detectPromise ||= detectPackageManager(nuxt.options.rootDir);
    return detectPromise;
  }
  async function getNpmCommand(command, packageName, options = {}) {
    const {
      dev = true,
      global = packageName === "@nuxt/devtools" && isInstalledGlobally
    } = options;
    const agent = await getPackageManager();
    const name = agent?.name || "npm";
    if (command === "install" || command === "update") {
      return [
        name,
        name === "npm" ? "install" : "add",
        `${packageName}@latest`,
        dev ? "-D" : "",
        global ? "-g" : "",
        // In yarn berry, `--ignore-scripts` is removed
        name === "yarn" && !agent?.version?.startsWith("1.") ? "" : "--ignore-scripts"
      ].filter(Boolean);
    }
    if (command === "uninstall") {
      return [
        name,
        name === "npm" ? "uninstall" : "remove",
        packageName,
        global ? "-g" : ""
      ].filter(Boolean);
    }
  }
  async function runNpmCommand(command, packageName, options = {}) {
    const args = await getNpmCommand(command, packageName, options);
    if (!args)
      return;
    const processId = `npm:${command}:${packageName}`;
    startSubprocess({
      command: args[0],
      args: args.slice(1)
    }, {
      id: processId,
      name: `${command} ${packageName}`,
      icon: "i-logos-npm-icon",
      restartable: false
    });
    return {
      processId
    };
  }
  const installSet = /* @__PURE__ */ new Set();
  let latestGenerated = null;
  return {
    checkForUpdateFor(name) {
      if (!updatesPromise.has(name))
        updatesPromise.set(name, checkForUpdateOf(name, void 0, nuxt));
      return updatesPromise.get(name);
    },
    getNpmCommand,
    async runNpmCommand(token, ...args) {
      await ensureDevAuthToken(token);
      return runNpmCommand(...args);
    },
    async installNuxtModule(token, name, dry = true) {
      await ensureDevAuthToken(token);
      const commands = await getNpmCommand("install", name, { dev: true });
      const filepath = nuxt.options._nuxtConfigFile;
      let source = latestGenerated;
      if (source == null)
        source = await fs.readFile(filepath, "utf-8");
      const generated = await magicastGuard(async () => {
        const mod = parseModule(source, { sourceFileName: filepath });
        addNuxtModule(mod, name);
        return mod.generate().code;
      });
      const processId = `nuxt:add-module:${name}`;
      if (!dry) {
        latestGenerated = generated;
        installSet.add(name);
        const process = startSubprocess({
          command: commands[0],
          args: commands.slice(1)
        }, {
          id: processId,
          name: `Install ${name}`,
          icon: "carbon:intent-request-create",
          restartable: false
        });
        const execa = process.getProcess();
        const result = await execa;
        await Promise.resolve();
        installSet.delete(name);
        const code = result.exitCode;
        if (code !== 0) {
          console.error(result.stderr);
          throw new Error(`Failed to install module, process exited with ${code}`);
        }
        if (installSet.size === 0) {
          latestGenerated = null;
          await fs.writeFile(filepath, generated, "utf-8");
        }
      }
      return {
        configOriginal: source,
        configGenerated: generated,
        commands,
        processId
      };
    },
    async uninstallNuxtModule(token, name, dry = true) {
      await ensureDevAuthToken(token);
      const commands = await getNpmCommand("uninstall", name);
      const filepath = nuxt.options._nuxtConfigFile;
      const source = await fs.readFile(filepath, "utf-8");
      const generated = await magicastGuard(async () => {
        const mod = parseModule(source, { sourceFileName: filepath });
        const config = getDefaultExportOptions(mod);
        config.modules ||= [];
        if (config.modules.includes(name)) {
          Object.values(config.modules).forEach((value, index) => {
            if (value === name)
              config.modules.splice(index - 1, 1);
          });
        }
        return mod.generate().code;
      });
      const processId = `nuxt:remove-module:${name}`;
      if (!dry) {
        const process = startSubprocess({
          command: commands[0],
          args: commands.slice(1)
        }, {
          id: processId,
          name: `Uninstall ${name}`,
          icon: "carbon:intent-request-uninstall",
          restartable: false
        });
        const execa = process.getProcess();
        const result = await execa;
        await Promise.resolve();
        const code = result.exitCode;
        if (code !== 0) {
          console.error(result.stderr);
          throw new Error(`Failed to uninstall module', process exited with ${code}`);
        }
        await fs.writeFile(filepath, generated, "utf-8");
      }
      return {
        configOriginal: source,
        configGenerated: generated,
        commands,
        processId
      };
    }
  };
}

function setupCustomTabRPC({ nuxt, options, refresh }) {
  const iframeTabs = [];
  const customTabs = [];
  if (options.customTabs?.length)
    customTabs.push(...options.customTabs);
  async function initHooks() {
    nuxt.hook("devtools:customTabs:refresh", initCustomTabs);
    await initCustomTabs();
  }
  async function initCustomTabs() {
    customTabs.length = 0;
    if (options.customTabs?.length)
      customTabs.push(...options.customTabs);
    await nuxt.callHook("devtools:customTabs", customTabs);
    refresh("getCustomTabs");
  }
  nuxt.hook("app:resolve", async () => {
    await initHooks();
  });
  return {
    getCustomTabs() {
      return [
        ...iframeTabs,
        ...customTabs
      ].map((i) => {
        i.category = i.category || "modules";
        return i;
      });
    },
    async customTabAction(name, actionIndex) {
      const tab = customTabs.find((i) => i.name === name);
      if (!tab)
        return false;
      const view = tab.view;
      if (view.type !== "launch")
        return false;
      const action = view.actions?.[actionIndex];
      if (!action)
        return false;
      Promise.resolve(action.handle?.()).catch((e) => {
        console.error(e);
      }).finally(() => {
        nuxt.callHook("devtools:customTabs:refresh");
      });
      nuxt.callHook("devtools:customTabs:refresh");
      return true;
    }
  };
}

function setupHooksDebug(hooks) {
  const serverHooks = {};
  const now = typeof globalThis.performance === "undefined" ? () => Date.now() : () => performance.now();
  hooks.beforeEach((event) => {
    if (!serverHooks[event.name]) {
      serverHooks[event.name] = {
        name: event.name,
        start: now(),
        // @ts-expect-error private field
        listeners: hooks._hooks[event.name]?.length || 0,
        executions: []
      };
    } else {
      const hook = serverHooks[event.name];
      if (hook.duration != null)
        hook.executions.push(hook.duration);
      hook.start = now();
      hook.end = void 0;
      hook.duration = void 0;
    }
  });
  hooks.afterEach((event) => {
    const hook = serverHooks[event.name];
    if (!hook)
      return;
    hook.end = now();
    hook.duration = hook.end - hook.start;
    const listeners = hooks._hooks[event.name]?.length;
    if (listeners != null)
      hook.listeners = listeners;
  });
  return serverHooks;
}

function setupGeneralRPC({
  nuxt,
  options,
  refresh,
  ensureDevAuthToken,
  openInEditorHooks
}) {
  const components = [];
  const imports = [];
  const importPresets = [];
  let importDirs = [];
  const serverPages = [];
  let serverApp;
  const serverHooks = setupHooksDebug(nuxt.hooks);
  let unimport;
  let app;
  nuxt.hook("components:extend", (v) => {
    components.length = 0;
    components.push(...v);
    components.sort((a, b) => a.pascalName.localeCompare(b.pascalName));
    refresh("getComponents");
  });
  nuxt.hook("imports:extend", (v) => {
    imports.length = 0;
    imports.push(...v);
    refresh("getAutoImports");
  });
  nuxt.hook("pages:extend", (v) => {
    serverPages.length = 0;
    const pagesSet = new Set(v);
    function searchChildren(page) {
      if (pagesSet.has(page))
        return;
      pagesSet.add(page);
      page.children?.forEach(searchChildren);
    }
    v.forEach(searchChildren);
    serverPages.push(...Array.from(pagesSet).sort((a, b) => a.path.localeCompare(b.path)));
    refresh("getServerPages");
  });
  nuxt.hook("app:resolve", (app2) => {
    serverApp = app2;
  });
  nuxt.hook("imports:sources", async (v) => {
    const result = (await resolveBuiltinPresets(v)).flat();
    importPresets.length = 0;
    importPresets.push(...result);
    refresh("getAutoImports");
  });
  nuxt.hook("imports:context", (_unimport) => {
    unimport = _unimport;
  });
  nuxt.hook("imports:dirs", (dirs) => {
    importDirs = dirs;
  });
  nuxt.hook("app:resolve", (v) => {
    app = v;
  });
  return {
    getServerConfig() {
      return nuxt.options;
    },
    getServerRuntimeConfig() {
      const ENV_PREFIX = "NITRO_";
      const ENV_PREFIX_ALT = "NUXT_";
      function _getEnv(key) {
        const envKey = snakeCase(key).toUpperCase();
        return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
      }
      function _isObject(input) {
        return typeof input === "object" && !Array.isArray(input);
      }
      function _applyEnv(obj, parentKey = "") {
        for (const key in obj) {
          const subKey = parentKey ? `${parentKey}_${key}` : key;
          const envValue = _getEnv(subKey);
          if (_isObject(obj[key])) {
            if (_isObject(envValue))
              obj[key] = { ...obj[key], ...envValue };
            _applyEnv(obj[key], subKey);
          } else {
            obj[key] = envValue ?? obj[key];
          }
        }
        return obj;
      }
      const runtime = { ...nuxt.options.runtimeConfig };
      _applyEnv(runtime);
      return runtime;
    },
    getModuleOptions() {
      return options;
    },
    getServerApp() {
      return serverApp;
    },
    getComponents() {
      return components;
    },
    async getComponentsRelationships() {
      return [];
    },
    getServerPages() {
      return serverPages;
    },
    getAutoImports() {
      return {
        imports: [
          ...imports,
          ...importPresets
        ],
        metadata: unimport?.getMetadata(),
        dirs: importDirs
      };
    },
    getServerLayouts() {
      return Object.values(app?.layouts || []);
    },
    getServerHooks() {
      return Object.values(serverHooks);
    },
    async openInEditor(input) {
      if (input.startsWith("./"))
        input = resolve(process.cwd(), input);
      const match = input.match(/^(.*?)(:[:\d]*)$/);
      let suffix = "";
      if (match) {
        input = match[1];
        suffix = match[2];
      }
      const path = [
        input,
        `${input}.js`,
        `${input}.mjs`,
        `${input}.ts`
      ].find((i) => existsSync(i));
      if (!path) {
        console.error("File not found:", input);
        return false;
      }
      try {
        for (const hook of openInEditorHooks) {
          const result = await hook(path);
          if (result)
            return true;
        }
        await import('launch-editor').then((r) => (r.default || r)(path + suffix));
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async restartNuxt(token, hard = true) {
      await ensureDevAuthToken(token);
      logger.info("Restarting Nuxt...");
      return nuxt.callHook("restart", { hard });
    },
    async requestForAuth(info, origin) {
      if (options.disableAuthorization)
        return;
      const token = await getDevAuthToken();
      origin ||= `${nuxt.options.devServer.https ? "https" : "http"}://${nuxt.options.devServer.host === "::" ? "localhost" : nuxt.options.devServer.host || "localhost"}:${nuxt.options.devServer.port}`;
      const ROUTE_AUTH = `${nuxt.options.app.baseURL || "/"}/__nuxt_devtools__/auth`.replace(/\/+/g, "/");
      const message = [
        `A browser is requesting permissions of ${colors.bold(colors.yellow("writing files and running commands"))} from the DevTools UI.`,
        colors.bold(info),
        "",
        "Please open the following URL in the browser:",
        colors.bold(colors.green(`${origin}${ROUTE_AUTH}?token=${token}`)),
        "",
        "Or manually copy and paste the following token:",
        colors.bold(colors.cyan(token))
      ];
      logger.box({
        message: message.join("\n"),
        title: colors.bold(colors.yellow(" Permission Request ")),
        style: {
          borderColor: "yellow",
          borderStyle: "rounded"
        }
      });
    },
    async verifyAuthToken(token) {
      if (options.disableAuthorization)
        return true;
      return token === await getDevAuthToken();
    }
  };
}

const pagesIndexTemplate = `<script setup lang="ts">
const route = useRoute()
<\/script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>
`;
async function enablePages(nuxt) {
  const pathApp = join(nuxt.options.srcDir, "app.vue");
  const pathPageIndex = join(nuxt.options.srcDir, "pages/index.vue");
  if (fs$1.existsSync(pathPageIndex)) {
    logger.warn("pages/index.vue already exists, skipping");
    return;
  }
  let appContent = fs$1.existsSync(pathApp) ? await fs.readFile(pathApp, "utf-8") : void 0;
  await fs.mkdir(dirname$1(pathPageIndex), { recursive: true });
  await fs.writeFile(pathPageIndex, pagesIndexTemplate, "utf-8");
  if (appContent && !appContent.includes("<NuxtPage")) {
    appContent = appContent.replace("</template>", "  <NuxtPage />\n</template>").replace(/<NuxtWelcome\s*\/>/, "");
    await fs.writeFile(pathApp, appContent, "utf-8");
  }
  logger.success("Routing creation wizard completed");
}

const wizard = {
  enablePages
};

const LOG_PREFIX = colors.cyan("Nuxt DevTools:");

function setupWizardRPC({ nuxt, ensureDevAuthToken }) {
  return {
    async runWizard(token, name, ...args) {
      await ensureDevAuthToken(token);
      logger.info(LOG_PREFIX, `Running wizard ${colors.green(name)}...`);
      return wizard[name](nuxt, ...args);
    }
  };
}

function setupTerminalRPC({ nuxt, rpc, refresh, ensureDevAuthToken }) {
  const terminals = /* @__PURE__ */ new Map();
  nuxt.hook("devtools:terminal:register", (terminal) => {
    terminals.set(terminal.id, terminal);
    refresh("getTerminals");
    return terminal.id;
  });
  nuxt.hook("devtools:terminal:remove", ({ id }) => {
    if (!terminals.has(id))
      return false;
    terminals.delete(id);
    refresh("getTerminals");
    return true;
  });
  nuxt.hook("devtools:terminal:write", ({ id, data }) => {
    const terminal = terminals.get(id);
    if (!terminal)
      return false;
    terminal.buffer ||= "";
    terminal.buffer += data;
    rpc.broadcast.onTerminalData.asEvent({ id, data });
    return true;
  });
  nuxt.hook("devtools:terminal:exit", ({ id, code }) => {
    const terminal = terminals.get(id);
    if (!terminal)
      return false;
    terminal.isTerminated = true;
    rpc.broadcast.onTerminalExit.asEvent({ id, code });
    refresh("getTerminals");
    return true;
  });
  function serializeTerminal(terminal, buffer = false) {
    if (!terminal)
      return;
    return {
      id: terminal.id,
      name: terminal.name,
      description: terminal.description,
      icon: terminal.icon,
      terminatable: terminal.terminatable ?? !!terminal.onActionTerminate,
      restartable: terminal.restartable ?? !!terminal.onActionRestart,
      isTerminated: terminal.isTerminated,
      buffer: buffer ? terminal.buffer : void 0
    };
  }
  return {
    getTerminals() {
      return Array.from(terminals.values()).map((i) => serializeTerminal(i));
    },
    async getTerminalDetail(token, id) {
      await ensureDevAuthToken(token);
      return serializeTerminal(terminals.get(id), true);
    },
    async runTerminalAction(token, id, action) {
      await ensureDevAuthToken(token);
      const terminal = terminals.get(id);
      if (!terminal)
        return false;
      switch (action) {
        case "restart":
          if (!terminal.onActionRestart)
            return false;
          await terminal.onActionRestart();
          return true;
        case "terminate":
          if (!terminal.onActionTerminate)
            return false;
          await terminal.onActionTerminate();
          return true;
        case "remove":
          if (!terminal.isTerminated)
            terminal.onActionTerminate?.();
          terminals.delete(id);
          refresh("getTerminals");
          return true;
        case "clear":
          terminal.buffer = "";
          refresh("getTerminals");
          return true;
      }
    }
  };
}

function setupServerRoutesRPC({ nuxt, refresh }) {
  let nitro;
  let cache = null;
  const refreshDebounced = debounce(() => {
    cache = null;
    refresh("getServerRoutes");
  }, 500);
  nuxt.hook("nitro:init", (_) => {
    nitro = _;
    cache = null;
    refresh("getServerRoutes");
  });
  nuxt.hook("ready", () => {
    nitro?.storage.watch((event, key) => {
      if (key.startsWith("src:api:") || key.startsWith("src:routes:"))
        refreshDebounced();
    });
  });
  function scan() {
    if (cache)
      return cache;
    cache = (() => {
      if (!nitro)
        return [];
      return [
        ...nitro.scannedHandlers.filter((item) => !item.middleware).map((item) => ({
          route: item.route,
          filepath: item.handler,
          method: item.method,
          type: item.route?.startsWith("/api") ? "api" : "route"
        })),
        ...nitro.options.handlers.filter((item) => !item.route?.startsWith("/_nitro") && !item.route?.startsWith("/__nuxt") && !item.middleware).map((item) => ({
          route: item.route,
          filepath: item.handler,
          method: item.method,
          type: "runtime"
        }))
      ];
    })();
    return cache;
  }
  return {
    getServerRoutes() {
      return scan();
    }
  };
}

function setupAnalyzeBuildRPC({ nuxt, refresh, ensureDevAuthToken }) {
  let builds = [];
  let promise;
  let initalized;
  const processId = "devtools:analyze-build";
  const analyzeDir = join(nuxt.options.rootDir, ".nuxt/analyze");
  async function startAnalyzeBuild(name) {
    if (promise)
      throw new Error("Already building");
    const result = startSubprocess({
      command: "npx",
      args: ["nuxi", "analyze", "--no-serve", "--name", name],
      cwd: nuxt.options.rootDir
    }, {
      id: processId,
      name: "Analyze Build",
      icon: "logos-nuxt-icon"
    }, nuxt);
    refresh("getAnalyzeBuildInfo");
    promise = result.getProcess().then(() => {
      refresh("getAnalyzeBuildInfo");
      return readBuildInfo();
    }).finally(() => {
      promise = void 0;
      initalized = void 0;
      refresh("getAnalyzeBuildInfo");
    });
    return processId;
  }
  async function readBuildInfo() {
    const files = await fg("*/meta.json", { cwd: analyzeDir, onlyFiles: true, absolute: true });
    builds = await Promise.all(files.map(async (file) => {
      const dir = dirname$1(file);
      const json = JSON.parse(await fs.readFile(file, "utf-8"));
      return {
        ...json,
        features: {
          bundleClient: fs$1.existsSync(join(dir, "client.html")),
          bundleNitro: fs$1.existsSync(join(dir, "nitro.html")),
          viteInspect: fs$1.existsSync(join(dir, ".vite-inspect"))
        }
      };
    }));
    return builds.sort((a, b) => b.endTime - a.endTime);
  }
  async function generateAnalyzeBuildName() {
    try {
      const git = Git(nuxt.options.rootDir);
      const branch = await git.branch();
      const branchName = branch.current || "head";
      const sha = await git.revparse(["--short", "HEAD"]);
      const isWorkingTreeClean = (await git.status()).isClean();
      if (isWorkingTreeClean)
        return `${branchName}#${sha}`;
      return `${branchName}#${sha}-dirty`;
    } catch (e) {
      return (/* @__PURE__ */ new Date()).toISOString().replace(/:/g, "-");
    }
  }
  return {
    async getAnalyzeBuildInfo() {
      if (!initalized)
        initalized = readBuildInfo();
      await initalized;
      return {
        isBuilding: !!promise,
        builds
      };
    },
    async clearAnalyzeBuilds(token, names) {
      await ensureDevAuthToken(token);
      if (!names) {
        await fs.rm(analyzeDir, { recursive: true, force: true });
      } else {
        const targets = builds.filter((build) => names.includes(build.name));
        await Promise.all(targets.map((target) => fs.rm(join(analyzeDir, target.slug), { recursive: true, force: true })));
      }
      initalized = readBuildInfo();
      refresh("getAnalyzeBuildInfo");
    },
    generateAnalyzeBuildName,
    async startAnalyzeBuild(token, ...args) {
      await ensureDevAuthToken(token);
      return startAnalyzeBuild(...args);
    }
  };
}

let options;
function getOptions() {
  return options;
}
function setupOptionsRPC({ nuxt }) {
  async function getOptions2(tab) {
    if (!options || options[tab]) {
      options = defaultTabOptions;
      await read(tab);
    }
    return options[tab];
  }
  async function read(tab) {
    options[tab] = await readLocalOptions(defaultTabOptions[tab], {
      root: nuxt.options.rootDir,
      key: tab !== "ui" && tab
    });
    return options;
  }
  getOptions2("ui");
  async function clearOptions() {
    options = void 0;
    await clearLocalOptions({
      root: nuxt.options.rootDir
    });
  }
  return {
    async updateOptions(tab, _settings) {
      const settings = await getOptions2(tab);
      Object.assign(settings, _settings);
      await writeLocalOptions(
        { ...settings },
        {
          root: nuxt.options.rootDir,
          key: tab !== "ui" && tab
        }
      );
      nuxt.callHook("builder:generateApp", {
        filter(template) {
          return template.filename.includes("devtools/settings.mjs");
        }
      });
    },
    getOptions: getOptions2,
    clearOptions
  };
}

function setupTimelineRPC({ nuxt }) {
  return {
    async enableTimeline(dry) {
      const filepath = nuxt.options._nuxtConfigFile;
      const source = await fs.readFile(filepath, "utf-8");
      const generated = await magicastGuard(async () => {
        const mod = parseModule(source, { sourceFileName: filepath });
        const options = getDefaultExportOptions(mod);
        options.devtools = options.devtools || {};
        options.devtools.timeline = options.devtools.timeline || {};
        options.devtools.timeline.enabled = true;
        return mod.generate().code;
      }, "\nYou can enable timeline manually by adding `devtools: { timeline: { enabled: true } }`");
      if (!dry) {
        await fs.writeFile(filepath, generated, "utf-8");
        await nuxt.callHook("restart", { hard: true });
      }
      return [source, generated];
    }
  };
}

const SEND_DELAY = 5e3;
function throttle(fn, delay) {
  let timer;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = void 0;
        fn();
      }, delay);
    }
  };
}
let telemetry;
const throttledSend = throttle(() => {
  telemetry?.sendEvents();
}, SEND_DELAY);
function setupTelemetryRPC({ nuxt, options }) {
  if (options.telemetry !== false) {
    nuxt.hook("telemetry:setup", (t) => {
      telemetry = t;
      t.eventFactories.devtools = (_, payload) => {
        return {
          name: "devtools",
          version,
          ...payload
        };
      };
      t.createEvent("devtools", { event: "enabled" });
    });
  }
  return {
    telemetryEvent(payload, immediate = false) {
      telemetryEvent(payload, immediate);
    }
  };
}
function telemetryEvent(payload, immediate = false) {
  if (!telemetry)
    return;
  if (getOptions()?.behavior.telemetry === false)
    return;
  telemetry.createEvent("devtools", payload);
  if (immediate)
    telemetry.sendEvents();
  else
    throttledSend();
}

function setupRPC(nuxt, options) {
  const serverFunctions = {};
  const extendedRpcMap = /* @__PURE__ */ new Map();
  const rpc = createBirpcGroup(
    serverFunctions,
    [],
    {
      resolver: (name, fn) => {
        if (fn)
          return fn;
        if (!name.includes(":"))
          return;
        const [namespace, fnName] = name.split(":");
        return extendedRpcMap.get(namespace)?.[fnName];
      },
      onError(error, name) {
        logger.error(
          colors.yellow(`[nuxt-devtools] RPC error on executing "${colors.bold(name)}":
`) + colors.red(error?.message || "")
        );
      },
      timeout: 12e4
    }
  );
  function refresh(event) {
    rpc.broadcast.refresh.asEvent(event);
  }
  function extendServerRpc(namespace, functions) {
    extendedRpcMap.set(namespace, functions);
    return {
      broadcast: new Proxy({}, {
        get: (_, key) => {
          if (typeof key !== "string")
            return;
          return rpc.broadcast[`${namespace}:${key}`];
        }
      })
    };
  }
  const ctx = {
    nuxt,
    options,
    rpc,
    refresh,
    extendServerRpc,
    openInEditorHooks: [],
    async ensureDevAuthToken(token) {
      if (options.disableAuthorization)
        return;
      if (token !== await getDevAuthToken())
        throw new Error("Invalid dev auth token.");
    }
  };
  nuxt.devtools = ctx;
  Object.assign(serverFunctions, {
    ...setupGeneralRPC(ctx),
    ...setupCustomTabRPC(ctx),
    ...setupStorageRPC(ctx),
    ...setupAssetsRPC(ctx),
    ...setupNpmRPC(ctx),
    ...setupWizardRPC(ctx),
    ...setupTerminalRPC(ctx),
    ...setupServerRoutesRPC(ctx),
    ...setupAnalyzeBuildRPC(ctx),
    ...setupOptionsRPC(ctx),
    ...setupTimelineRPC(ctx),
    ...setupTelemetryRPC(ctx)
  });
  const wsClients = /* @__PURE__ */ new Set();
  const vitePlugin = {
    name: "nuxt:devtools:rpc",
    configureServer(server) {
      server.ws.on("connection", (ws) => {
        wsClients.add(ws);
        const channel = {
          post: (d) => ws.send(JSON.stringify({
            type: "custom",
            event: WS_EVENT_NAME,
            data: d
          })),
          on: (fn) => {
            ws.on("message", (e) => {
              try {
                const data = JSON.parse(String(e)) || {};
                if (data.type === "custom" && data.event === WS_EVENT_NAME) {
                  fn(data.data);
                }
              } catch {
              }
            });
          },
          serialize: stringify,
          deserialize: parse$1
        };
        rpc.updateChannels((c) => {
          c.push(channel);
        });
        ws.on("close", () => {
          wsClients.delete(ws);
          rpc.updateChannels((c) => {
            const index = c.indexOf(channel);
            if (index >= 0)
              c.splice(index, 1);
          });
        });
      });
    }
  };
  return {
    vitePlugin,
    ...ctx
  };
}

async function enableModule(options, nuxt) {
  if (process.env.TEST || process.env.NODE_ENV === "test" || nuxt.options.test)
    return;
  if (nuxt.options.builder !== "@nuxt/vite-builder") {
    logger.warn("Nuxt DevTools only supports Vite mode, module is disabled.");
    return;
  }
  if (!nuxt.options.dev) {
    if (nuxt.options.build.analyze)
      await import('./analyze-build.mjs').then(({ setup }) => setup(nuxt, options));
    return;
  }
  const enabledExplicitly = nuxt.options.devtools === true || nuxt.options.devtools && nuxt.options.devtools.enabled || !!nuxt.options.modules.find((m) => m === "@nuxt/devtools" || m === "@nuxt/devtools-edge");
  await nuxt.callHook("devtools:before");
  if (options.iframeProps)
    nuxt.options.runtimeConfig.app.iframeProps = options.iframeProps;
  nuxt.options.imports.collectMeta = true;
  addPlugin({
    src: join(runtimeDir, "plugins/devtools.client"),
    mode: "client"
  });
  addPlugin({
    src: join(runtimeDir, "plugins/devtools.server"),
    mode: "server"
  });
  addTemplate({
    filename: "devtools/settings.mjs",
    async getContents() {
      const uiOptions = await readLocalOptions(
        {
          ...defaultTabOptions.ui,
          // When not enabled explicitly, we hide the panel by default
          showPanel: enabledExplicitly ? true : null
        },
        { root: nuxt.options.rootDir }
      );
      return `export default ${JSON.stringify({
        ui: uiOptions
      })}`;
    }
  });
  nuxt.hook("nitro:config", (config) => {
    config.externals = config.externals || {};
    config.externals.inline = config.externals.inline || [];
    config.externals.inline.push(join(runtimeDir, "nitro"));
    config.virtual = config.virtual || {};
    config.virtual["#nuxt-devtools-inline"] = `export const script = \`
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
\``;
    config.plugins = config.plugins || [];
    config.plugins.unshift(join(runtimeDir, "nitro/inline"));
  });
  const {
    vitePlugin,
    ...ctx
  } = setupRPC(nuxt, options);
  addVitePlugin(vitePlugin);
  const clientDirExists = existsSync(clientDir);
  const analyzeDir = join(nuxt.options.rootDir, ".nuxt/analyze");
  nuxt.hook("vite:extendConfig", (config) => {
    config.server ||= {};
    config.server.fs ||= {};
    config.server.fs.allow ||= [
      searchForWorkspaceRoot(process.cwd())
    ];
    config.server.fs.allow.push(packageDir);
    config.server.watch ||= {};
    config.server.watch.ignored ||= [];
    if (!Array.isArray(config.server.watch.ignored))
      config.server.watch.ignored = [config.server.watch.ignored];
    config.server.watch.ignored.push("**/.nuxt/analyze/**");
  });
  nuxt.hook("imports:extend", (imports) => {
    imports.push({
      name: "useNuxtDevTools",
      from: join(runtimeDir, "use-nuxt-devtools")
    });
  });
  const ROUTE_PATH = `${nuxt.options.app.baseURL || "/"}/__nuxt_devtools__`.replace(/\/+/g, "/");
  const ROUTE_CLIENT = `${ROUTE_PATH}/client`;
  const ROUTE_AUTH = `${ROUTE_PATH}/auth`;
  const ROUTE_AUTH_VERIFY = `${ROUTE_PATH}/auth-verify`;
  const ROUTE_ANALYZE = `${ROUTE_PATH}/analyze`;
  nuxt.hook("vite:serverCreated", (server) => {
    server.middlewares.use(ROUTE_ANALYZE, sirv(analyzeDir, { single: false, dev: true }));
    if (clientDirExists) {
      const indexHtmlPath = join(clientDir, "index.html");
      const indexContent = fs.readFile(indexHtmlPath, "utf-8");
      const handleStatic = sirv(clientDir, {
        dev: true,
        single: false
      });
      const handleIndex = async (res) => {
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 200;
        res.write((await indexContent).replace(/\/__NUXT_DEVTOOLS_BASE__\//g, `${ROUTE_CLIENT}/`));
        res.end();
      };
      server.middlewares.use(ROUTE_CLIENT, (req, res) => {
        if (req.url === "/")
          return handleIndex(res);
        return handleStatic(req, res, () => handleIndex(res));
      });
    }
    server.middlewares.use(ROUTE_AUTH, sirv(join(runtimeDir, "auth"), { single: true, dev: true }));
    server.middlewares.use(ROUTE_AUTH_VERIFY, async (req, res) => {
      const search = req.url?.split("?")[1];
      if (!search) {
        res.statusCode = 400;
        res.end("No token provided");
      }
      const query = new URLSearchParams(search);
      const token = query.get("token");
      if (!token) {
        res.statusCode = 400;
        res.end("No token provided");
      }
      if (token === await getDevAuthToken()) {
        res.statusCode = 200;
        res.end("Valid token");
      } else {
        res.statusCode = 403;
        res.end("Invalid token");
      }
    });
  });
  await import('./plugin-metrics.mjs').then(({ setup }) => setup(ctx));
  if (options.viteInspect !== false)
    await import('./vite-inspect.mjs').then(({ setup }) => setup(ctx));
  if (options.componentInspector !== false)
    await import('./vue-inspector.mjs').then(({ setup }) => setup(ctx));
  const integrations = [
    options.vscode?.enabled ? import('./vscode.mjs').then(({ setup }) => setup(ctx)) : null,
    options.experimental?.timeline || options.timeline?.enabled ? import('./timeline.mjs').then(({ setup }) => setup(ctx)) : null
  ];
  await Promise.all(integrations);
  await nuxt.callHook("devtools:initialized", {
    version,
    packagePath: packageDir,
    isGlobalInstall: isGlobalInstall()
  });
  const isMac = os.platform() === "darwin";
  logger.log([
    colors.yellow(`  \u279C DevTools: `),
    colors.dim("press "),
    colors.green("Shift"),
    colors.dim(" + "),
    colors.green(isMac ? "Option" : "Alt"),
    colors.dim(" + "),
    colors.green("D"),
    colors.dim(` in the browser (v${version})`),
    "\n"
  ].join(""));
}

const moduleMain = {
  __proto__: null,
  enableModule: enableModule
};

export { LOG_PREFIX as L, moduleMain as m };
