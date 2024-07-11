// src/normalize.ts
function isObject(v) {
  return typeof v === "object" && v !== null;
}
function normalizeOptions(options, factoryOptions) {
  options = isObject(options) ? options : /* @__PURE__ */ Object.create(null);
  return new Proxy(options, {
    get(target, key, receiver) {
      if (key === "key")
        return Reflect.get(target, key, receiver);
      return Reflect.get(target, key, receiver) || Reflect.get(factoryOptions, key, receiver);
    }
  });
}

// src/pick.ts
function get(state, path) {
  return path.reduce((obj, p) => {
    return obj == null ? void 0 : obj[p];
  }, state);
}
function set(state, path, val) {
  return path.slice(0, -1).reduce((obj, p) => {
    if (/^(__proto__)$/.test(p))
      return {};
    else
      return obj[p] = obj[p] || {};
  }, state)[path[path.length - 1]] = val, state;
}
function pick(baseState, paths) {
  return paths.reduce((substate, path) => {
    const pathArray = path.split(".");
    return set(substate, pathArray, get(baseState, pathArray));
  }, {});
}

// src/plugin.ts
function parsePersistence(factoryOptions, store) {
  return (o) => {
    var _a;
    try {
      const {
        storage = localStorage,
        beforeRestore = void 0,
        afterRestore = void 0,
        serializer = {
          serialize: JSON.stringify,
          deserialize: JSON.parse
        },
        key = store.$id,
        paths = null,
        debug = false
      } = o;
      return {
        storage,
        beforeRestore,
        afterRestore,
        serializer,
        key: ((_a = factoryOptions.key) != null ? _a : (k) => k)(typeof key == "string" ? key : key(store.$id)),
        paths,
        debug
      };
    } catch (e) {
      if (o.debug)
        console.error("[pinia-plugin-persistedstate]", e);
      return null;
    }
  };
}
function hydrateStore(store, { storage, serializer, key, debug }) {
  try {
    const fromStorage = storage == null ? void 0 : storage.getItem(key);
    if (fromStorage)
      store.$patch(serializer == null ? void 0 : serializer.deserialize(fromStorage));
  } catch (e) {
    if (debug)
      console.error("[pinia-plugin-persistedstate]", e);
  }
}
function persistState(state, { storage, serializer, key, paths, debug }) {
  try {
    const toStore = Array.isArray(paths) ? pick(state, paths) : state;
    storage.setItem(key, serializer.serialize(toStore));
  } catch (e) {
    if (debug)
      console.error("[pinia-plugin-persistedstate]", e);
  }
}
function createPersistedState(factoryOptions = {}) {
  return (context) => {
    const { auto = false } = factoryOptions;
    const {
      options: { persist = auto },
      store,
      pinia
    } = context;
    if (!persist)
      return;
    if (!(store.$id in pinia.state.value)) {
      const original_store = pinia._s.get(store.$id.replace("__hot:", ""));
      if (original_store)
        Promise.resolve().then(() => original_store.$persist());
      return;
    }
    const persistences = (Array.isArray(persist) ? persist.map((p) => normalizeOptions(p, factoryOptions)) : [normalizeOptions(persist, factoryOptions)]).map(parsePersistence(factoryOptions, store)).filter(Boolean);
    store.$persist = () => {
      persistences.forEach((persistence) => {
        persistState(store.$state, persistence);
      });
    };
    store.$hydrate = ({ runHooks = true } = {}) => {
      persistences.forEach((persistence) => {
        const { beforeRestore, afterRestore } = persistence;
        if (runHooks)
          beforeRestore == null ? void 0 : beforeRestore(context);
        hydrateStore(store, persistence);
        if (runHooks)
          afterRestore == null ? void 0 : afterRestore(context);
      });
    };
    persistences.forEach((persistence) => {
      const { beforeRestore, afterRestore } = persistence;
      beforeRestore == null ? void 0 : beforeRestore(context);
      hydrateStore(store, persistence);
      afterRestore == null ? void 0 : afterRestore(context);
      store.$subscribe(
        (_mutation, state) => {
          persistState(state, persistence);
        },
        {
          detached: true
        }
      );
    });
  };
}

// src/index.ts
var src_default = createPersistedState();
export {
  createPersistedState,
  src_default as default
};
