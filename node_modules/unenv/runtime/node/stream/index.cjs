"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Duplex", {
  enumerable: true,
  get: function () {
    return _duplex.Duplex;
  }
});
exports.PassThrough = void 0;
Object.defineProperty(exports, "Readable", {
  enumerable: true,
  get: function () {
    return _readable.Readable;
  }
});
exports.Stream = void 0;
Object.defineProperty(exports, "Transform", {
  enumerable: true,
  get: function () {
    return _transform.Transform;
  }
});
Object.defineProperty(exports, "Writable", {
  enumerable: true,
  get: function () {
    return _writable.Writable;
  }
});
exports.pipeline = exports.isReadable = exports.isErrored = exports.isDisturbed = exports.finished = exports.destroy = exports.default = exports.compose = exports.addAbortSignal = exports._uint8ArrayToBuffer = exports._isUint8Array = void 0;
var _proxy = _interopRequireDefault(require("../../mock/proxy.cjs"));
var _utils = require("../../_internal/utils.cjs");
var _readable = require("./readable.cjs");
var _writable = require("./writable.cjs");
var _duplex = require("./duplex.cjs");
var _transform = require("./transform.cjs");
var _index = _interopRequireDefault(require("./promises/index.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Stream = exports.Stream = _proxy.default.__createMock__("Stream");
const PassThrough = exports.PassThrough = _proxy.default.__createMock__("PassThrough");
const pipeline = exports.pipeline = (0, _utils.notImplemented)("stream.pipeline");
const finished = exports.finished = (0, _utils.notImplemented)("stream.finished");
const addAbortSignal = exports.addAbortSignal = (0, _utils.notImplemented)("stream.addAbortSignal");
const isDisturbed = exports.isDisturbed = (0, _utils.notImplemented)("stream.isDisturbed");
const isReadable = exports.isReadable = (0, _utils.notImplemented)("stream.isReadable");
const compose = exports.compose = (0, _utils.notImplemented)("stream.compose");
const isErrored = exports.isErrored = (0, _utils.notImplemented)("stream.isErrored");
const destroy = exports.destroy = (0, _utils.notImplemented)("stream.destroy");
const _isUint8Array = exports._isUint8Array = (0, _utils.notImplemented)("stream._isUint8Array");
const _uint8ArrayToBuffer = exports._uint8ArrayToBuffer = (0, _utils.notImplemented)("stream._uint8ArrayToBuffer");
module.exports = {
  Readable: _readable.Readable,
  Writable: _writable.Writable,
  Duplex: _duplex.Duplex,
  Transform: _transform.Transform,
  Stream,
  PassThrough,
  pipeline,
  finished,
  addAbortSignal,
  promises: _index.default,
  isDisturbed,
  isReadable,
  compose,
  _uint8ArrayToBuffer,
  isErrored,
  destroy,
  _isUint8Array
};