"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerAsyncId = exports.executionAsyncResource = exports.executionAsyncId = exports.createHook = exports.AsyncHook = void 0;
class _AsyncHook {
  __unenv__ = true;
  _enabled = false;
  _callbacks = {};
  constructor(callbacks = {}) {
    this._callbacks = callbacks;
  }
  enable() {
    this._enabled = true;
    return this;
  }
  disable() {
    this._enabled = false;
    return this;
  }
  init(asyncId, type, triggerAsyncId2, resource) {
    if (this._enabled && this._callbacks.init) {
      this._callbacks.init(asyncId, type, triggerAsyncId2, resource);
    }
  }
  before(asyncId) {
    if (this._enabled && this._callbacks.before) {
      this._callbacks.before(asyncId);
    }
  }
  after(asyncId) {
    if (this._enabled && this._callbacks.after) {
      this._callbacks.after(asyncId);
    }
  }
  destroy(asyncId) {
    if (this._enabled && this._callbacks.destroy) {
      this._callbacks.destroy(asyncId);
    }
  }
  promiseResolve(asyncId) {
    if (this._enabled && this._callbacks.promiseResolve) {
      this._callbacks.promiseResolve(asyncId);
    }
  }
}
const AsyncHook = exports.AsyncHook = globalThis.AsyncHook || _AsyncHook;
const createHook = exports.createHook = function createHook2(callbacks) {
  const asyncHook = new _AsyncHook(callbacks);
  return asyncHook;
};
const executionAsyncId = exports.executionAsyncId = function executionAsyncId2() {
  return 0;
};
const executionAsyncResource = function () {
  return /* @__PURE__ */Object.create(null);
};
exports.executionAsyncResource = executionAsyncResource;
const triggerAsyncId = function () {
  return 0;
};
exports.triggerAsyncId = triggerAsyncId;