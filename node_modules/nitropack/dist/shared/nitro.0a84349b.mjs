import { pathToFileURL } from 'node:url';
import { relative, resolve, join } from 'pathe';
import { withBase, joinURL, withoutBase, parseURL } from 'ufo';
import chalk from 'chalk';
import { toRouteMatcher, createRouter } from 'radix3';
import { defu } from 'defu';
import mime from 'mime';
import { a as createNitro, b as build, i as compressPublicAssets, j as writeFile } from './nitro.4ea992bc.mjs';

const allowedExtensions = /* @__PURE__ */ new Set(["", ".json"]);
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
const linkParents = /* @__PURE__ */ new Map();
async function prerender(nitro) {
  if (nitro.options.noPublicDir) {
    console.warn(
      "[nitro] Skipping prerender since `noPublicDir` option is enabled."
    );
    return;
  }
  const routes = new Set(nitro.options.prerender.routes);
  const prerenderRulePaths = Object.entries(nitro.options.routeRules).filter(([path2, options]) => options.prerender && !path2.includes("*")).map((e) => e[0]);
  for (const route of prerenderRulePaths) {
    routes.add(route);
  }
  if (nitro.options.prerender.crawlLinks && routes.size === 0) {
    routes.add("/");
  }
  await nitro.hooks.callHook("prerender:routes", routes);
  if (routes.size === 0) {
    return;
  }
  nitro.logger.info("Initializing prerenderer");
  nitro._prerenderedRoutes = [];
  nitro._prerenderMeta = nitro._prerenderMeta || {};
  const prerendererConfig = {
    ...nitro.options._config,
    static: false,
    rootDir: nitro.options.rootDir,
    logLevel: 0,
    preset: "nitro-prerender"
  };
  await nitro.hooks.callHook("prerender:config", prerendererConfig);
  const nitroRenderer = await createNitro(prerendererConfig);
  await nitro.hooks.callHook("prerender:init", nitroRenderer);
  let path = relative(nitro.options.output.dir, nitro.options.output.publicDir);
  if (!path.startsWith(".")) {
    path = `./${path}`;
  }
  nitroRenderer.options.commands.preview = `npx serve ${path}`;
  nitroRenderer.options.output.dir = nitro.options.output.dir;
  await build(nitroRenderer);
  const serverEntrypoint = resolve(
    nitroRenderer.options.output.serverDir,
    "index.mjs"
  );
  const { localFetch } = await import(pathToFileURL(serverEntrypoint).href);
  const _routeRulesMatcher = toRouteMatcher(
    createRouter({ routes: nitro.options.routeRules })
  );
  const _getRouteRules = (path2) => defu({}, ..._routeRulesMatcher.matchAll(path2).reverse());
  const generatedRoutes = /* @__PURE__ */ new Set();
  const failedRoutes = /* @__PURE__ */ new Set();
  const skippedRoutes = /* @__PURE__ */ new Set();
  const displayedLengthWarns = /* @__PURE__ */ new Set();
  const canPrerender = (route = "/") => {
    if (generatedRoutes.has(route) || skippedRoutes.has(route)) {
      return false;
    }
    for (const ignore of nitro.options.prerender.ignore) {
      if (route.startsWith(ignore)) {
        return false;
      }
    }
    if (_getRouteRules(route).prerender === false) {
      return false;
    }
    return true;
  };
  const canWriteToDisk = (route) => {
    if (route.route.includes("?")) {
      return false;
    }
    const FS_MAX_SEGMENT = 255;
    const FS_MAX_PATH = 1024;
    const FS_MAX_PATH_PUBLIC_HTML = FS_MAX_PATH - (nitro.options.output.publicDir.length + 10);
    if ((route.route.length >= FS_MAX_PATH_PUBLIC_HTML || route.route.split("/").some((s) => s.length > FS_MAX_SEGMENT)) && !displayedLengthWarns.has(route)) {
      displayedLengthWarns.add(route);
      const _route = route.route.slice(0, 60) + "...";
      if (route.route.length >= FS_MAX_PATH_PUBLIC_HTML) {
        nitro.logger.warn(
          `Prerendering long route "${_route}" (${route.route.length}) can cause filesystem issues since it exceeds ${FS_MAX_PATH_PUBLIC_HTML}-character limit when writing to \`${nitro.options.output.publicDir}\`.`
        );
      } else {
        nitro.logger.warn(
          `Skipping prerender of the route "${_route}" since it exceeds the ${FS_MAX_SEGMENT}-character limit in one of the path segments and can cause filesystem issues.`
        );
        return false;
      }
    }
    return true;
  };
  const generateRoute = async (route) => {
    var _a, _b;
    const start = Date.now();
    route = decodeURI(route);
    if (!canPrerender(route)) {
      skippedRoutes.add(route);
      return;
    }
    generatedRoutes.add(route);
    const _route = { route };
    const encodedRoute = encodeURI(route);
    const res = await localFetch(
      withBase(encodedRoute, nitro.options.baseURL),
      {
        headers: { "x-nitro-prerender": encodedRoute },
        retry: nitro.options.prerender.retry,
        retryDelay: nitro.options.prerender.retryDelay
      }
    );
    let dataBuff = Buffer.from(await res.arrayBuffer());
    Object.defineProperty(_route, "contents", {
      get: () => {
        return dataBuff ? dataBuff.toString("utf8") : void 0;
      },
      set(value) {
        if (dataBuff) {
          dataBuff = Buffer.from(value);
        }
      }
    });
    Object.defineProperty(_route, "data", {
      get: () => {
        return dataBuff ? dataBuff.buffer : void 0;
      },
      set(value) {
        if (dataBuff) {
          dataBuff = Buffer.from(value);
        }
      }
    });
    const redirectCodes = [301, 302, 303, 304, 307, 308];
    if (![200, ...redirectCodes].includes(res.status)) {
      _route.error = new Error(`[${res.status}] ${res.statusText}`);
      _route.error.statusCode = res.status;
      _route.error.statusMessage = res.statusText;
      failedRoutes.add(_route);
    }
    _route.generateTimeMS = Date.now() - start;
    const contentType = res.headers.get("content-type") || "";
    const isImplicitHTML = !route.endsWith(".html") && contentType.includes("html") && !JsonSigRx.test(dataBuff.subarray(0, 32).toString("utf8"));
    const routeWithIndex = route.endsWith("/") ? route + "index" : route;
    const htmlPath = route.endsWith("/") || nitro.options.prerender.autoSubfolderIndex ? joinURL(route, "index.html") : route + ".html";
    _route.fileName = withoutBase(
      isImplicitHTML ? htmlPath : routeWithIndex,
      nitro.options.baseURL
    );
    const inferredContentType = mime.getType(_route.fileName) || "text/plain";
    _route.contentType = contentType || inferredContentType;
    await nitro.hooks.callHook("prerender:generate", _route, nitro);
    if (_route.contentType !== inferredContentType) {
      (_a = nitro._prerenderMeta)[_b = _route.fileName] || (_a[_b] = {});
      nitro._prerenderMeta[_route.fileName].contentType = _route.contentType;
    }
    if (_route.skip || _route.error) {
      await nitro.hooks.callHook("prerender:route", _route);
      nitro.logger.log(formatPrerenderRoute(_route));
      dataBuff = void 0;
      return _route;
    }
    if (canWriteToDisk(_route)) {
      const filePath = join(nitro.options.output.publicDir, _route.fileName);
      await writeFile(filePath, dataBuff);
      nitro._prerenderedRoutes.push(_route);
    } else {
      _route.skip = true;
    }
    if (!_route.error && isImplicitHTML) {
      const extractedLinks = extractLinks(
        dataBuff.toString("utf8"),
        route,
        res,
        nitro.options.prerender.crawlLinks
      );
      for (const _link of extractedLinks) {
        if (canPrerender(_link)) {
          routes.add(_link);
        }
      }
    }
    await nitro.hooks.callHook("prerender:route", _route);
    nitro.logger.log(formatPrerenderRoute(_route));
    dataBuff = void 0;
    return _route;
  };
  nitro.logger.info(
    nitro.options.prerender.crawlLinks ? `Prerendering ${routes.size} initial routes with crawler` : `Prerendering ${routes.size} routes`
  );
  await runParallel(routes, generateRoute, {
    concurrency: nitro.options.prerender.concurrency,
    interval: nitro.options.prerender.interval
  });
  await nitro.hooks.callHook("prerender:done", {
    prerenderedRoutes: nitro._prerenderedRoutes,
    failedRoutes: [...failedRoutes]
  });
  if (nitro.options.prerender.failOnError && failedRoutes.size > 0) {
    nitro.logger.log("\nErrors prerendering:");
    for (const route of failedRoutes) {
      const parents = linkParents.get(route.route);
      parents?.size ? `
${[...parents.values()].map((link) => chalk.gray(`  \u2502 \u2514\u2500\u2500 Linked from ${link}`)).join("\n")}` : "";
      nitro.logger.log(formatPrerenderRoute(route));
    }
    nitro.logger.log("");
    throw new Error("Exiting due to prerender errors.");
  }
  if (nitro.options.compressPublicAssets) {
    await compressPublicAssets(nitro);
  }
}
async function runParallel(inputs, cb, opts) {
  const tasks = /* @__PURE__ */ new Set();
  function queueNext() {
    const route = inputs.values().next().value;
    if (!route) {
      return;
    }
    inputs.delete(route);
    const task = new Promise((resolve2) => setTimeout(resolve2, opts.interval)).then(() => cb(route)).catch((error) => {
      console.error(error);
    });
    tasks.add(task);
    return task.then(() => {
      tasks.delete(task);
      if (inputs.size > 0) {
        return refillQueue();
      }
    });
  }
  function refillQueue() {
    const workers = Math.min(opts.concurrency - tasks.size, inputs.size);
    return Promise.all(Array.from({ length: workers }, () => queueNext()));
  }
  await refillQueue();
}
const LINK_REGEX = /(?<=\s)href=(?!&quot;)["']?([^"'>]+)/g;
const HTML_ENTITIES = {
  "&lt;": "<",
  "&gt;": ">",
  "&amp;": "&",
  "&apos;": "'",
  "&quot;": '"'
};
function escapeHtml(text) {
  return text.replace(
    /&(lt|gt|amp|apos|quot);/g,
    (ch) => HTML_ENTITIES[ch] || ch
  );
}
function extractLinks(html, from, res, crawlLinks) {
  const links = [];
  const _links = [];
  if (crawlLinks) {
    _links.push(
      ...[...html.matchAll(LINK_REGEX)].map((m) => escapeHtml(m[1])).filter((m) => !decodeURIComponent(m).startsWith("#")).filter((link) => allowedExtensions.has(getExtension(link)))
    );
  }
  const header = res.headers.get("x-nitro-prerender") || "";
  _links.push(...header.split(",").map((i) => decodeURIComponent(i.trim())));
  for (const link of _links.filter(Boolean)) {
    const _link = parseURL(link);
    if (_link.protocol) {
      continue;
    }
    if (!_link.pathname.startsWith("/")) {
      const fromURL = new URL(from, "http://localhost");
      _link.pathname = new URL(_link.pathname, fromURL).pathname;
    }
    links.push(_link.pathname + _link.search);
  }
  for (const link of links) {
    const _parents = linkParents.get(link);
    if (_parents) {
      _parents.add(from);
    } else {
      linkParents.set(link, /* @__PURE__ */ new Set([from]));
    }
  }
  return links;
}
const EXT_REGEX = /\.[\da-z]+$/;
function getExtension(link) {
  const pathname = parseURL(link).pathname;
  return (pathname.match(EXT_REGEX) || [])[0] || "";
}
function formatPrerenderRoute(route) {
  let str = `  \u251C\u2500 ${route.route} (${route.generateTimeMS}ms)`;
  if (route.error) {
    const parents = linkParents.get(route.route);
    const errorColor = chalk[route.error.statusCode === 404 ? "yellow" : "red"];
    const errorLead = parents?.size ? "\u251C\u2500\u2500" : "\u2514\u2500\u2500";
    str += `
  \u2502 ${errorLead} ${errorColor(route.error)}`;
    if (parents?.size) {
      str += `
${[...parents.values()].map((link) => `  \u2502 \u2514\u2500\u2500 Linked from ${link}`).join("\n")}`;
    }
  }
  if (route.skip) {
    str += chalk.gray(" (skipped)");
  }
  return chalk.gray(str);
}

export { prerender as p };
