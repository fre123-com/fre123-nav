"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");
var _path = require("path");
var _utils = require("./utils/index.cjs");
var _nodeFs = require("./utils/node-fs.cjs");
const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
module.exports = (0, _utils.defineDriver)((opts = {}) => {
  if (!opts.base) {
    throw (0, _utils.createRequiredError)(DRIVER_NAME, "base");
  }
  opts.base = (0, _path.resolve)(opts.base);
  const r = key => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw (0, _utils.createError)(DRIVER_NAME, `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`);
    }
    const resolved = (0, _path.join)(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return (0, _fs.existsSync)(r(key));
    },
    getItem(key) {
      return (0, _nodeFs.readFile)(r(key), "utf8");
    },
    getItemRaw(key) {
      return (0, _nodeFs.readFile)(r(key));
    },
    async getMeta(key) {
      const {
        atime,
        mtime,
        size,
        birthtime,
        ctime
      } = await _fs.promises.stat(r(key)).catch(() => ({}));
      return {
        atime,
        mtime,
        size,
        birthtime,
        ctime
      };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return (0, _nodeFs.writeFile)(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return (0, _nodeFs.writeFile)(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return (0, _nodeFs.unlink)(r(key));
    },
    getKeys() {
      return (0, _nodeFs.readdirRecursive)(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await (0, _nodeFs.rmRecursive)(r("."));
    }
  };
});