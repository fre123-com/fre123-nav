"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils/index.cjs");
var _ofetch = require("ofetch");
var _ufo = require("ufo");
const DRIVER_NAME = "http";
module.exports = (0, _utils.defineDriver)(opts => {
  const r = (key = "") => (0, _ufo.joinURL)(opts.base, key.replace(/:/g, "/"));
  const rBase = (key = "") => (0, _ufo.joinURL)(opts.base, (key || "/").replace(/:/g, "/"), ":");
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key, topts) {
      return (0, _ofetch.$fetch)(r(key), {
        method: "HEAD",
        headers: {
          ...opts.headers,
          ...topts.headers
        }
      }).then(() => true).catch(() => false);
    },
    async getItem(key, tops = {}) {
      const value = await (0, _ofetch.$fetch)(r(key), {
        headers: {
          ...opts.headers,
          ...tops.headers
        }
      });
      return value;
    },
    async getItemRaw(key, topts) {
      const value = await (0, _ofetch.$fetch)(r(key), {
        headers: {
          accept: "application/octet-stream",
          ...opts.headers,
          ...topts.headers
        }
      });
      return value;
    },
    async getMeta(key, topts) {
      const res = await _ofetch.$fetch.raw(r(key), {
        method: "HEAD",
        headers: {
          ...opts.headers,
          ...topts.headers
        }
      });
      let mtime = void 0;
      const _lastModified = res.headers.get("last-modified");
      if (_lastModified) {
        mtime = new Date(_lastModified);
      }
      return {
        status: res.status,
        mtime
      };
    },
    async setItem(key, value, topts) {
      await (0, _ofetch.$fetch)(r(key), {
        method: "PUT",
        body: value,
        headers: {
          ...opts.headers,
          ...topts?.headers
        }
      });
    },
    async setItemRaw(key, value, topts) {
      await (0, _ofetch.$fetch)(r(key), {
        method: "PUT",
        body: value,
        headers: {
          "content-type": "application/octet-stream",
          ...opts.headers,
          ...topts.headers
        }
      });
    },
    async removeItem(key, topts) {
      await (0, _ofetch.$fetch)(r(key), {
        method: "DELETE",
        headers: {
          ...opts.headers,
          ...topts.headers
        }
      });
    },
    async getKeys(base, topts) {
      const value = await (0, _ofetch.$fetch)(rBase(base), {
        headers: {
          ...opts.headers,
          ...topts.headers
        }
      });
      return Array.isArray(value) ? value : [];
    },
    async clear(base, topts) {
      await (0, _ofetch.$fetch)(rBase(base), {
        method: "DELETE",
        headers: {
          ...opts.headers,
          ...topts.headers
        }
      });
    }
  };
});