"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncResource = void 0;
var _asyncHook = require("./_async-hook.cjs");
let _asyncIdCounter = 100;
class _AsyncResource {
  __unenv__ = true;
  type;
  _asyncId;
  _triggerAsyncId;
  constructor(type, triggerAsyncId = (0, _asyncHook.executionAsyncId)()) {
    this.type = type;
    this._asyncId = -1 * _asyncIdCounter++;
    this._triggerAsyncId = typeof triggerAsyncId === "number" ? triggerAsyncId : triggerAsyncId?.triggerAsyncId;
  }
  static bind(fn, type, thisArg) {
    const resource = new AsyncResource(type ?? "anonymous");
    return resource.bind(fn);
  }
  bind(fn, thisArg) {
    const binded = (...args) => this.runInAsyncScope(fn, thisArg, ...args);
    binded.asyncResource = this;
    return binded;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    const result = fn.apply(thisArg, args);
    return result;
  }
  emitDestroy() {
    return this;
  }
  asyncId() {
    return this._asyncId;
  }
  triggerAsyncId() {
    return this._triggerAsyncId;
  }
}
const AsyncResource = exports.AsyncResource = globalThis.AsyncResource || _AsyncResource;