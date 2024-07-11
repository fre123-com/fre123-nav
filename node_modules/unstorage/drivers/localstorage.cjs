"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils/index.cjs");
const DRIVER_NAME = "localstorage";
module.exports = (0, _utils.defineDriver)((opts = {}) => {
  if (!opts.window) {
    opts.window = typeof window !== "undefined" ? window : void 0;
  }
  if (!opts.localStorage) {
    opts.localStorage = opts.window?.localStorage;
  }
  if (!opts.localStorage) {
    throw (0, _utils.createRequiredError)(DRIVER_NAME, "localStorage");
  }
  const r = key => (opts.base ? opts.base + ":" : "") + key;
  let _storageListener;
  const _unwatch = () => {
    if (_storageListener) {
      opts.window?.removeEventListener("storage", _storageListener);
    }
    _storageListener = void 0;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return Object.prototype.hasOwnProperty.call(opts.localStorage, r(key));
    },
    getItem(key) {
      return opts.localStorage.getItem(r(key));
    },
    setItem(key, value) {
      return opts.localStorage.setItem(r(key), value);
    },
    removeItem(key) {
      return opts.localStorage.removeItem(r(key));
    },
    getKeys() {
      return Object.keys(opts.localStorage);
    },
    clear() {
      if (!opts.base) {
        opts.localStorage.clear();
      } else {
        for (const key of Object.keys(opts.localStorage)) {
          opts.localStorage?.removeItem(key);
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
      _storageListener = ev => {
        if (ev.key) {
          callback(ev.newValue ? "update" : "remove", ev.key);
        }
      };
      opts.window.addEventListener("storage", _storageListener);
      return _unwatch;
    }
  };
});