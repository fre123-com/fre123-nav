"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._Duplex = exports.Duplex = void 0;
var _utils = require("../../_internal/utils.cjs");
var _readable = require("./readable.cjs");
var _writable = require("./writable.cjs");
const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new _readable.Readable(), writable = new _writable.Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = (0, _utils.mergeFns)(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, _readable.Readable.prototype);
  Object.assign(__Duplex.prototype, _writable.Writable.prototype);
  return __Duplex;
}
const _Duplex = exports._Duplex = /* @__PURE__ */getDuplex();
const Duplex = exports.Duplex = globalThis.Duplex || _Duplex;