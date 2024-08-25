"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Buffer = exports.Blob = void 0;
Object.defineProperty(exports, "File", {
  enumerable: true,
  get: function () {
    return _file.File;
  }
});
Object.defineProperty(exports, "INSPECT_MAX_BYTES", {
  enumerable: true,
  get: function () {
    return _buffer.INSPECT_MAX_BYTES;
  }
});
Object.defineProperty(exports, "SlowBuffer", {
  enumerable: true,
  get: function () {
    return _buffer.SlowBuffer;
  }
});
exports.isUtf8 = exports.isAscii = exports.default = exports.constants = exports.btoa = exports.atob = void 0;
Object.defineProperty(exports, "kMaxLength", {
  enumerable: true,
  get: function () {
    return _buffer.kMaxLength;
  }
});
exports.transcode = exports.resolveObjectURL = exports.kStringMaxLength = void 0;
var _utils = require("../../_internal/utils.cjs");
var _buffer = require("./_buffer.cjs");
var _file = require("./_file.cjs");
const Buffer = exports.Buffer = globalThis.Buffer || _buffer.Buffer;
const Blob = exports.Blob = globalThis.Blob;
const resolveObjectURL = exports.resolveObjectURL = (0, _utils.notImplemented)("buffer.resolveObjectURL");
const transcode = exports.transcode = (0, _utils.notImplemented)("buffer.transcode");
const isUtf8 = exports.isUtf8 = (0, _utils.notImplemented)("buffer.isUtf8");
const isAscii = exports.isAscii = (0, _utils.notImplemented)("buffer.isAscii");
const btoa = exports.btoa = global.btoa;
const atob = exports.atob = globalThis.atob;
const kStringMaxLength = exports.kStringMaxLength = 0;
const constants = exports.constants = {
  MAX_LENGTH: _buffer.kMaxLength,
  MAX_STRING_LENGTH: kStringMaxLength
};
module.exports = {
  Buffer,
  SlowBuffer: _buffer.SlowBuffer,
  kMaxLength: _buffer.kMaxLength,
  INSPECT_MAX_BYTES: _buffer.INSPECT_MAX_BYTES,
  Blob,
  resolveObjectURL,
  transcode,
  btoa,
  atob,
  kStringMaxLength,
  constants,
  isUtf8,
  isAscii,
  File: _file.File
};