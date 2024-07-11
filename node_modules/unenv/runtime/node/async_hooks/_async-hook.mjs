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
export const AsyncHook = globalThis.AsyncHook || _AsyncHook;
export const createHook = function createHook2(callbacks) {
  const asyncHook = new _AsyncHook(callbacks);
  return asyncHook;
};
export const executionAsyncId = function executionAsyncId2() {
  return 0;
};
export const executionAsyncResource = function() {
  return /* @__PURE__ */ Object.create(null);
};
export const triggerAsyncId = function() {
  return 0;
};
