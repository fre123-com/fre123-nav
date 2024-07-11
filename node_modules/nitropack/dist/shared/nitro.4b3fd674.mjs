import { Worker } from 'node:worker_threads';
import { existsSync, promises, accessSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { debounce } from 'perfect-debounce';
import { eventHandler, getRequestHeader, createError, setResponseHeader, setResponseStatus, getResponseStatus, getResponseStatusText, send, createApp, fromNodeMiddleware, toNodeListener } from 'h3';
import { createProxyServer } from 'httpxy';
import { listen } from 'listhen';
import { servePlaceholder } from 'serve-placeholder';
import serveStatic from 'serve-static';
import { resolve } from 'pathe';
import { joinURL } from 'ufo';
import { watch } from 'chokidar';
import { v as version } from './nitro.fbb67b25.mjs';

function createVFSHandler(nitro) {
  return eventHandler(async (event) => {
    const vfsEntries = {
      ...nitro.vfs,
      ...nitro.options.virtual
    };
    const url = event.path || "";
    const isJson = url.endsWith(".json") || getRequestHeader(event, "accept")?.includes("application/json");
    const id = decodeURIComponent(url.replace(/^(\.json)?\/?/, "") || "");
    if (id && !(id in vfsEntries)) {
      throw createError({ message: "File not found", statusCode: 404 });
    }
    let content = id ? vfsEntries[id] : void 0;
    if (typeof content === "function") {
      content = await content();
    }
    if (isJson) {
      return {
        rootDir: nitro.options.rootDir,
        entries: Object.keys(vfsEntries).map((id2) => ({
          id: id2,
          path: "/_vfs.json/" + encodeURIComponent(id2)
        })),
        current: id ? {
          id,
          content
        } : null
      };
    }
    const directories = { [nitro.options.rootDir]: {} };
    const fpaths = Object.keys(vfsEntries);
    for (const item of fpaths) {
      const segments = item.replace(nitro.options.rootDir, "").split("/").filter(Boolean);
      let currentDir = item.startsWith(nitro.options.rootDir) ? directories[nitro.options.rootDir] : directories;
      for (const segment of segments) {
        if (!currentDir[segment]) {
          currentDir[segment] = {};
        }
        currentDir = currentDir[segment];
      }
    }
    const generateHTML = (directory, path = []) => Object.entries(directory).map(([fname, value = {}]) => {
      const subpath = [...path, fname];
      const key = subpath.join("/");
      const encodedUrl = encodeURIComponent(key);
      const linkClass = url === `/${encodedUrl}` ? "bg-gray-700 text-white" : "hover:bg-gray-800 text-gray-200";
      return Object.keys(value).length === 0 ? `
            <li class="flex flex-nowrap">
              <a href="/_vfs/${encodedUrl}" class="w-full text-sm px-2 py-1 border-b border-gray-10 ${linkClass}">
                ${fname}
              </a>
            </li>
            ` : `
            <li>
              <details ${url.startsWith(`/${encodedUrl}`) ? "open" : ""}>
                <summary class="w-full text-sm px-2 py-1 border-b border-gray-10 hover:bg-gray-800 text-gray-200">
                  ${fname}
                </summary>
                <ul class="ml-4">
                  ${generateHTML(value, subpath)}
                </ul>
              </details>
            </li>
            `;
    }).join("");
    const rootDirectory = directories[nitro.options.rootDir];
    delete directories[nitro.options.rootDir];
    const items = generateHTML(rootDirectory, [nitro.options.rootDir]) + generateHTML(directories);
    const files = `
      <div class="h-full overflow-auto border-r border-gray:10">
        <p class="text-white text-bold text-center py-1 opacity-50">Virtual Files</p>
        <ul class="flex flex-col">${items}</ul>
      </div>
      `;
    const file = id ? editorTemplate({
      readOnly: true,
      language: id.endsWith("html") ? "html" : "javascript",
      theme: "vs-dark",
      value: content,
      wordWrap: "wordWrapColumn",
      wordWrapColumn: 80
    }) : `
        <div class="w-full h-full flex opacity-50">
          <h1 class="text-white m-auto">Select a virtual file to inspect</h1>
        </div>
      `;
    return (
      /* html */
      `
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css" />
  <link rel="stylesheet" data-name="vs/editor/editor.main" href="${vsUrl}/editor/editor.main.min.css">
  <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"><\/script>
  <style>
    html {
      background: #1E1E1E;
      color: white;
    }
    [un-cloak] {
      display: none;
    }
  </style>
</head>
<body class="bg-[#1E1E1E]">
  <div un-cloak class="h-screen grid grid-cols-[300px_1fr]">
    ${files}
    ${file}
  </div>
</body>
</html>`
    );
  });
}
const monacoVersion = "0.30.0";
const monacoUrl = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${monacoVersion}/min`;
const vsUrl = `${monacoUrl}/vs`;
const editorTemplate = (options) => `
<div id="editor" class="min-h-screen w-full h-full"></div>
<script src="${vsUrl}/loader.min.js"><\/script>
<script>
  require.config({ paths: { vs: '${vsUrl}' } })

  const proxy = URL.createObjectURL(new Blob([\`
    self.MonacoEnvironment = { baseUrl: '${monacoUrl}' }
    importScripts('${vsUrl}/base/worker/workerMain.min.js')
  \`], { type: 'text/javascript' }))
  window.MonacoEnvironment = { getWorkerUrl: () => proxy }

  setTimeout(() => {
    require(['vs/editor/editor.main'], function () {
      monaco.editor.create(document.getElementById('editor'), ${JSON.stringify(
  options
)})
    })
  }, 0);
<\/script>
`;

function errorHandler(error, event) {
  setResponseHeader(event, "Content-Type", "text/html; charset=UTF-8");
  setResponseStatus(event, 503, "Server Unavailable");
  let body;
  let title;
  if (error) {
    title = `${getResponseStatus(event)} ${getResponseStatusText(event)}`;
    body = `<code><pre>${error.stack}</pre></code>`;
  } else {
    title = "Reloading server...";
    body = "<progress></progress><script>document.querySelector('progress').indeterminate=true<\/script>";
  }
  return send(
    event,
    `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${error ? "" : '<meta http-equiv="refresh" content="2">'}
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico/css/pico.min.css">
  </head>
  <body>
    <main class="container">
      <article>
        <header>
          <h2>${title}</h2>
        </header>
        ${body}
        <footer>
          Check console logs for more information.
        </footer>
      </article>
  </main>
  </body>
</html>
`
  );
}

function initWorker(filename) {
  if (!existsSync(filename)) {
    return null;
  }
  return new Promise((resolve2, reject) => {
    const worker = new Worker(filename);
    worker.once("exit", (code) => {
      reject(
        new Error(
          code ? "[worker] exited with code: " + code : "[worker] exited"
        )
      );
    });
    worker.once("error", (err) => {
      const newErr = new Error("[worker init] " + err.message);
      newErr.stack = err.stack;
      reject(newErr);
    });
    const addressListener = (event) => {
      if (!event || !event.address) {
        return;
      }
      worker.off("message", addressListener);
      resolve2({
        worker,
        address: event.address
      });
    };
    worker.on("message", addressListener);
  });
}
async function killWorker(worker, nitro) {
  if (!worker) {
    return;
  }
  if (worker.worker) {
    worker.worker.postMessage({ event: "shutdown" });
    const gracefulShutdownTimeout = Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3;
    await new Promise((resolve2) => {
      const timeout = setTimeout(() => {
        nitro.logger.warn(
          `[nitro] [dev] Force closing worker after ${gracefulShutdownTimeout} seconds...`
        );
        resolve2();
      }, gracefulShutdownTimeout * 1e3);
      worker.worker.once("message", (message) => {
        if (message.event === "exit") {
          clearTimeout(timeout);
          resolve2();
        }
      });
    });
    worker.worker.removeAllListeners();
    await worker.worker.terminate();
    worker.worker = null;
  }
  if ("socketPath" in worker.address && existsSync(worker.address.socketPath)) {
    await promises.rm(worker.address.socketPath).catch(() => {
    });
  }
}
function createDevServer(nitro) {
  const workerEntry = resolve(
    nitro.options.output.dir,
    nitro.options.output.serverDir,
    "index.mjs"
  );
  const errorHandler$1 = nitro.options.devErrorHandler || errorHandler;
  let lastError = null;
  let reloadPromise = null;
  let currentWorker = null;
  async function _reload() {
    const oldWorker = currentWorker;
    currentWorker = null;
    await killWorker(oldWorker, nitro);
    currentWorker = await initWorker(workerEntry);
    const buildInfoPath = resolve(nitro.options.buildDir, "nitro.json");
    const buildInfo = {
      date: (/* @__PURE__ */ new Date()).toJSON(),
      preset: nitro.options.preset,
      framework: nitro.options.framework,
      versions: {
        nitro: version
      },
      dev: {
        pid: process.pid,
        workerAddress: currentWorker?.address
      }
    };
    await writeFile(buildInfoPath, JSON.stringify(buildInfo, null, 2));
  }
  const reload = debounce(() => {
    reloadPromise = _reload().then(() => {
      lastError = null;
    }).catch((error) => {
      console.error("[worker reload]", error);
      lastError = error;
    }).finally(() => {
      reloadPromise = null;
    });
    return reloadPromise;
  });
  nitro.hooks.hook("dev:reload", reload);
  const app = createApp();
  for (const handler of nitro.options.devHandlers) {
    app.use(handler.route || "/", handler.handler);
  }
  app.use("/_vfs", createVFSHandler(nitro));
  for (const asset of nitro.options.publicAssets) {
    const url = joinURL(nitro.options.runtimeConfig.app.baseURL, asset.baseURL);
    app.use(url, fromNodeMiddleware(serveStatic(asset.dir)));
    if (!asset.fallthrough) {
      app.use(url, fromNodeMiddleware(servePlaceholder()));
    }
  }
  for (const route of Object.keys(nitro.options.devProxy).sort().reverse()) {
    let opts = nitro.options.devProxy[route];
    if (typeof opts === "string") {
      opts = { target: opts };
    }
    const proxy2 = createProxy(opts);
    app.use(
      route,
      eventHandler(async (event) => {
        await proxy2.handle(event);
      })
    );
  }
  const proxy = createProxy();
  proxy.proxy.on("proxyReq", (proxyReq, req) => {
    const proxyRequestHeaders = proxyReq.getHeaders();
    if (req.socket.remoteAddress && !proxyRequestHeaders["x-forwarded-for"]) {
      proxyReq.setHeader("X-Forwarded-For", req.socket.remoteAddress);
    }
    if (req.socket.remotePort && !proxyRequestHeaders["x-forwarded-port"]) {
      proxyReq.setHeader("X-Forwarded-Port", req.socket.remotePort);
    }
    if (req.socket.remoteFamily && !proxyRequestHeaders["x-forwarded-proto"]) {
      proxyReq.setHeader("X-Forwarded-Proto", req.socket.remoteFamily);
    }
  });
  const getWorkerAddress = () => {
    const address = currentWorker?.address;
    if (!address) {
      return;
    }
    if ("socketPath" in address) {
      try {
        accessSync(address.socketPath);
      } catch (err) {
        if (!lastError) {
          lastError = err;
        }
        return;
      }
    }
    return address;
  };
  app.use(
    eventHandler(async (event) => {
      await reloadPromise;
      const address = getWorkerAddress();
      if (!address) {
        return errorHandler$1(lastError, event);
      }
      await proxy.handle(event, { target: address }).catch((err) => {
        lastError = err;
        throw err;
      });
    })
  );
  let listeners = [];
  const _listen = async (port, opts) => {
    const listener = await listen(toNodeListener(app), { port, ...opts });
    listeners.push(listener);
    return listener;
  };
  let watcher = null;
  if (nitro.options.devServer.watch.length > 0) {
    watcher = watch(nitro.options.devServer.watch, nitro.options.watchOptions);
    watcher.on("add", reload).on("change", reload);
  }
  async function close() {
    if (watcher) {
      await watcher.close();
    }
    await killWorker(currentWorker, nitro);
    await Promise.all(listeners.map((l) => l.close()));
    listeners = [];
  }
  nitro.hooks.hook("close", close);
  return {
    reload,
    listen: _listen,
    app,
    close,
    watcher
  };
}
function createProxy(defaults = {}) {
  const proxy = createProxyServer(defaults);
  const handle = async (event, opts = {}) => {
    try {
      await proxy.web(event.node.req, event.node.res, opts);
    } catch (error) {
      if (error.code !== "ECONNRESET") {
        throw error;
      }
    }
  };
  return {
    proxy,
    handle
  };
}

export { createDevServer as c };
