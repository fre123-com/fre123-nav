import { createRequiredError, defineDriver } from "./utils/index.mjs";
const DRIVER_NAME = "session-storage";
export default defineDriver((opts = {}) => {
  if (!opts.window) {
    opts.window = typeof window !== "undefined" ? window : void 0;
  }
  if (!opts.sessionStorage) {
    opts.sessionStorage = opts.window?.sessionStorage;
  }
  if (!opts.sessionStorage) {
    throw createRequiredError(DRIVER_NAME, "sessionStorage");
  }
  const r = (key) => (opts.base ? opts.base + ":" : "") + key;
  let _storageListener;
  const _unwatch = () => {
    if (_storageListener) {
      opts.window.removeEventListener("storage", _storageListener);
    }
    _storageListener = void 0;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return Object.prototype.hasOwnProperty.call(opts.sessionStorage, r(key));
    },
    getItem(key) {
      return opts.sessionStorage.getItem(r(key));
    },
    setItem(key, value) {
      return opts.sessionStorage.setItem(r(key), value);
    },
    removeItem(key) {
      return opts.sessionStorage.removeItem(r(key));
    },
    getKeys() {
      return Object.keys(opts.sessionStorage);
    },
    clear() {
      if (!opts.base) {
        opts.sessionStorage.clear();
      } else {
        for (const key of Object.keys(opts.sessionStorage)) {
          opts.sessionStorage?.removeItem(key);
        }
      }
      if (opts.window && _storageListener) {
        opts.window.removeEventListener("storage", _storageListener);
      }
    },
    watch(callback) {
      if (!opts.window) {
        return _unwatch;
      }
      _storageListener = ({ key, newValue }) => {
        if (key) {
          callback(newValue ? "update" : "remove", key);
        }
      };
      opts.window.addEventListener("storage", _storageListener);
      return _unwatch;
    }
  };
});
