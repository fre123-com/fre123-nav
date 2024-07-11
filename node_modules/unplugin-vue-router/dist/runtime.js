"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/runtime.ts
var runtime_exports = {};
__export(runtime_exports, {
  _HasDataLoaderMeta: () => HasDataLoaderMeta,
  _defineLoader: () => defineLoader,
  _definePage: () => _definePage,
  _mergeRouteRecord: () => _mergeRouteRecord,
  _setupDataFetchingGuard: () => setupDataFetchingGuard,
  _stopDataFetchingScope: () => stopScope
});
module.exports = __toCommonJS(runtime_exports);

// src/data-fetching/defineLoader.ts
var import_vue_router = require("vue-router");

// src/data-fetching/dataCache.ts
var import_vue = require("vue");
function isCacheExpired(entry, options) {
  const { cacheTime } = options;
  return (
    // cacheTime == 0 means no cache
    !cacheTime || // did we hit the expiration time
    Date.now() - entry.when >= cacheTime || Array.from(entry.children).some(
      (childEntry) => isCacheExpired(childEntry, options)
    )
  );
}
function createDataLoaderEntry(options, initialData) {
  return withinScope(() => ({
    pending: (0, import_vue.ref)(false),
    error: (0, import_vue.ref)(),
    // set to 0 to when there is an initialData so the next request will always trigger the data loaders
    when: initialData === void 0 ? Date.now() : 0,
    children: /* @__PURE__ */ new Set(),
    // @ts-expect-error: data always start as empty
    data: (0, import_vue.ref)(initialData),
    params: {},
    query: {},
    // hash: null,
    isReady: false
    // this was just too annoying to type
  }));
}
function updateDataLoaderEntry(entry, data, params, query, hash) {
  entry.when = Date.now();
  entry.params = params;
  entry.query = query;
  entry.hash = hash.v;
  entry.isReady = true;
  entry.data.value = data;
}
var scope;
function withinScope(fn) {
  return (scope = scope || (0, import_vue.effectScope)(true)).run(fn);
}
function stopScope() {
  if (scope) {
    scope.stop();
    scope = void 0;
  }
}
var currentContext;
function getCurrentContext() {
  return currentContext || [];
}
function setCurrentContext(context) {
  currentContext = context;
}

// src/data-fetching/locationUtils.ts
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else if (!innerValue || !outerValue) {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}

// src/data-fetching/defineLoader.ts
var DEFAULT_DEFINE_LOADER_OPTIONS = {
  cacheTime: 1e3 * 5,
  // 5s
  lazy: false,
  // same as no key
  key: ""
};
function defineLoader(nameOrLoader, _loaderOrOptions, opts) {
  const loader = typeof nameOrLoader === "function" ? nameOrLoader : _loaderOrOptions;
  opts = typeof _loaderOrOptions === "object" ? _loaderOrOptions : opts;
  const options = __spreadValues(__spreadValues({}, DEFAULT_DEFINE_LOADER_OPTIONS), opts);
  const entries = /* @__PURE__ */ new WeakMap();
  let pendingPromise;
  let currentNavigation;
  const pendingLoad = () => pendingPromise;
  const dataLoader = () => {
    let [parentEntry, _router, _route] = getCurrentContext();
    const router = _router || (0, import_vue_router.useRouter)();
    const route = _route || (0, import_vue_router.useRoute)();
    if (
      // no cache: we need to load
      !entries.has(router) || // invoked by the parent, we should try to load again
      parentEntry
    ) {
      load(route, router, parentEntry);
    }
    const entry = entries.get(router);
    const promise = Promise.resolve(pendingPromise).then(() => dataLoaderResult).finally(() => {
      if (parentEntry) {
        parentEntry.children.add(entry);
      }
      setCurrentContext(parentEntry && [parentEntry, router, route]);
    });
    const { data, pending, error } = entry;
    function refresh() {
      invalidate();
      load(route, router, parentEntry);
      return pendingPromise.catch(() => {
      });
    }
    function invalidate() {
      entry.when = 0;
    }
    const dataLoaderResult = {
      data,
      pending,
      error,
      refresh,
      invalidate,
      pendingLoad
    };
    return Object.assign(promise, dataLoaderResult);
  };
  function load(route, router, parent, initialRootData) {
    const hasCacheEntry = entries.has(router);
    const initialData = initialRootData && initialRootData[options.key];
    if (!hasCacheEntry) {
      entries.set(router, createDataLoaderEntry(options, initialData));
    }
    const entry = entries.get(router);
    if (initialData) {
      entry.when = 0;
      return Promise.resolve();
    }
    const needsNewLoad = !hasCacheEntry || shouldFetchAgain(entry, route);
    const { isReady, pending, error } = entry;
    const { lazy } = options;
    const isExpired = isCacheExpired(entry, options);
    if (pendingPromise && // if we need to fetch again due to param/query changes
    !needsNewLoad && // if it's a new navigation and there is no entry, we cannot rely on the pendingPromise as we don't know what
    // params and query were used and could have changed. If we had an entry, then we can rely on the result of
    // `needsNewLoad`
    currentNavigation === route && // if we are not ready but we have a pendingPromise, we are already fetching so we can reuse it
    (!isReady || !isExpired)) {
      return lazy ? Promise.resolve() : pendingPromise;
    }
    if (needsNewLoad || // if we never finished loading we cannot rely on needsNewLoad
    !isReady && currentNavigation !== route || // we did a load but the cache expired
    isReady && isExpired) {
      pending.value = true;
      error.value = null;
      currentNavigation = route;
      const [trackedRoute, params, query, hash] = trackRoute(route);
      if (!pendingPromise) {
        setCurrentContext([entry, router, route]);
      }
      const thisPromise = pendingPromise = loader(trackedRoute).then((data) => {
        if (pendingPromise === thisPromise) {
          updateDataLoaderEntry(entry, data, params, query, hash);
        }
      }).catch((err) => {
        error.value = err;
        return Promise.reject(err);
      }).finally(() => {
        if (pendingPromise === thisPromise) {
          pendingPromise = null;
          pending.value = false;
        }
        setCurrentContext(parent && [parent, router, route]);
      });
    }
    return lazy || // lazy resolves immediately to not block navigation guards
    !pendingPromise ? Promise.resolve() : (
      // pendingPromise is thisPromise
      pendingPromise
    );
  }
  dataLoader._ = {
    // loader,
    entries,
    load,
    options
  };
  dataLoader[IsLoader] = true;
  return dataLoader;
}
function shouldFetchAgain(entry, route) {
  return (
    // manually invalidated
    !entry.when || !includesParams(route.params, entry.params) || !includesParams(route.query, entry.query) || entry.hash != null && entry.hash !== route.hash || Array.from(entry.children).some(
      (childEntry) => shouldFetchAgain(childEntry, route)
    )
  );
}
var IsLoader = Symbol();
function isDataLoader(loader) {
  return loader && loader[IsLoader];
}
function trackRoute(route) {
  const [params, paramReads] = trackObjectReads(route.params);
  const [query, queryReads] = trackObjectReads(route.query);
  let hash = { v: null };
  return [
    __spreadProps(__spreadValues({}, route), {
      // track the hash
      get hash() {
        return hash.v = route.hash;
      },
      params,
      query
    }),
    paramReads,
    queryReads,
    hash
  ];
}
function trackObjectReads(obj) {
  const reads = {};
  return [
    new Proxy(obj, {
      get(target, p, receiver) {
        const value = Reflect.get(target, p, receiver);
        reads[p] = value;
        return value;
      }
    }),
    reads
  ];
}

// src/data-fetching/dataFetchingGuard.ts
var HasDataLoaderMeta = Symbol();
var ADDED_SYMBOL = Symbol();
function setupDataFetchingGuard(router, { initialData } = {}) {
  if (process.env.NODE_ENV !== "production") {
    if (ADDED_SYMBOL in router) {
      console.warn(
        "[vue-router]: Data fetching guard added twice. Make sure to remove the extra call."
      );
      return;
    }
    router[ADDED_SYMBOL] = true;
  }
  const fetchedState = {};
  let isFetched;
  router.beforeEach((to) => {
    return Promise.all(
      // retrieve all loaders as a flat array
      to.matched.flatMap((route) => route.meta[HasDataLoaderMeta]).filter(Boolean).map(
        (moduleImport) => moduleImport().then((mod) => {
          const loaders = Object.keys(mod).filter((exportName) => isDataLoader(mod[exportName])).map((loaderName) => mod[loaderName]);
          return Promise.all(
            // load will ensure only one request is happening at a time
            loaders.map((loader) => {
              const {
                options: { key },
                entries
              } = loader._;
              return loader._.load(
                to,
                router,
                void 0,
                initialData
                // FIXME: could the data.value be passed as an argument here?
              ).then(() => {
                if (!initialData) {
                  if (key) {
                    fetchedState[key] = entries.get(router).data.value;
                  }
                } else if (process.env.NODE_ENV !== "production" && !key && !isFetched) {
                }
              });
            })
          );
        })
      )
    ).then(() => {
      initialData = void 0;
      isFetched = true;
    });
  });
  return initialData ? null : fetchedState;
}

// src/runtime.ts
var _definePage = (route) => route;
function _mergeRouteRecord(main, ...routeRecords) {
  return routeRecords.reduce((acc, routeRecord) => {
    const meta = Object.assign({}, acc.meta, routeRecord.meta);
    const alias = [].concat(
      acc.alias || [],
      routeRecord.alias || []
    );
    Object.assign(acc, routeRecord);
    acc.meta = meta;
    acc.alias = alias;
    return acc;
  }, main);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _HasDataLoaderMeta,
  _defineLoader,
  _definePage,
  _mergeRouteRecord,
  _setupDataFetchingGuard,
  _stopDataFetchingScope
});
