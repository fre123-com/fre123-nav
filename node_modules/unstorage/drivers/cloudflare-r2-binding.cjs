"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils/index.cjs");
const DRIVER_NAME = "cloudflare-r2-binding";
module.exports = (0, _utils.defineDriver)(opts => {
  const r = (key = "") => opts.base ? (0, _utils.joinKeys)(opts.base, key) : key;
  const getKeys = async base => {
    const binding = getBinding(opts.binding);
    const kvList = await binding.list(base || opts.base ? {
      prefix: r(base)
    } : void 0);
    return kvList.objects.map(obj => obj.key);
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    async hasItem(key) {
      key = r(key);
      const binding = getBinding(opts.binding);
      return (await binding.head(key)) !== null;
    },
    async getMeta(key, topts) {
      key = r(key);
      const binding = getBinding(opts.binding);
      const obj = await binding.head(key);
      if (!obj) return null;
      return {
        mtime: obj.uploaded,
        atime: obj.uploaded,
        ...obj
      };
    },
    getItem(key, topts) {
      key = r(key);
      const binding = getBinding(opts.binding);
      return binding.get(key, topts).then(r2 => r2?.text());
    },
    getItemRaw(key, topts) {
      key = r(key);
      const binding = getBinding(opts.binding);
      return binding.get(key, topts).then(r2 => r2?.arrayBuffer());
    },
    async setItem(key, value, topts) {
      key = r(key);
      const binding = getBinding(opts.binding);
      await binding.put(key, value, topts);
    },
    async setItemRaw(key, value, topts) {
      key = r(key);
      const binding = getBinding(opts.binding);
      await binding.put(key, value, topts);
    },
    async removeItem(key) {
      key = r(key);
      const binding = getBinding(opts.binding);
      await binding.delete(key);
    },
    getKeys(base) {
      return getKeys(base).then(keys => opts.base ? keys.map(key => key.slice(opts.base.length)) : keys);
    },
    async clear(base) {
      const binding = getBinding(opts.binding);
      const keys = await getKeys(base);
      await binding.delete(keys);
    }
  };
});
function getBinding(binding) {
  let bindingName = "[binding]";
  if (typeof binding === "string") {
    bindingName = binding;
    binding = globalThis[bindingName] || globalThis.__env__?.[bindingName];
  }
  if (!binding) {
    throw (0, _utils.createError)(DRIVER_NAME, `Invalid binding \`${bindingName}\`: \`${binding}\``);
  }
  for (const key of ["get", "put", "delete"]) {
    if (!(key in binding)) {
      throw (0, _utils.createError)(DRIVER_NAME, `Invalid binding \`${bindingName}\`: \`${key}\` key is missing`);
    }
  }
  return binding;
}