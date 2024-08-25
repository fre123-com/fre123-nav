"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._Transform = exports.Transform = void 0;
var _duplex = require("./duplex.cjs");
class _Transform extends _duplex.Duplex {
  __unenv__ = true;
  _transform(chunk, encoding, callback) {}
  _flush(callback) {}
}
exports._Transform = _Transform;
const Transform = exports.Transform = globalThis.Transform || _Transform;