"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TextDecoder: true,
  TextEncoder: true,
  deprecate: true,
  _errnoException: true,
  _exceptionWithHostPort: true,
  _extend: true,
  aborted: true,
  callbackify: true,
  getSystemErrorMap: true,
  getSystemErrorName: true,
  toUSVString: true,
  stripVTControlCharacters: true,
  transferableAbortController: true,
  transferableAbortSignal: true,
  parseArgs: true,
  inherits: true,
  types: true,
  promisify: true
};
exports.getSystemErrorName = exports.getSystemErrorMap = exports.deprecate = exports.default = exports.callbackify = exports.aborted = exports._extend = exports._exceptionWithHostPort = exports._errnoException = exports.TextEncoder = exports.TextDecoder = void 0;
Object.defineProperty(exports, "inherits", {
  enumerable: true,
  get: function () {
    return _inherits.default;
  }
});
exports.parseArgs = void 0;
Object.defineProperty(exports, "promisify", {
  enumerable: true,
  get: function () {
    return _promisify.promisify;
  }
});
exports.transferableAbortSignal = exports.transferableAbortController = exports.toUSVString = exports.stripVTControlCharacters = void 0;
Object.defineProperty(exports, "types", {
  enumerable: true,
  get: function () {
    return _types.default;
  }
});
var _utils = require("../../_internal/utils.cjs");
var _inherits = _interopRequireDefault(require("../../npm/inherits.cjs"));
var legacyTypes = _interopRequireWildcard(require("./_legacy-types.cjs"));
Object.keys(legacyTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === legacyTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return legacyTypes[key];
    }
  });
});
var logUtils = _interopRequireWildcard(require("./_log.cjs"));
Object.keys(logUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === logUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return logUtils[key];
    }
  });
});
var _types = _interopRequireDefault(require("./types/index.cjs"));
var _promisify = require("./_promisify.cjs");
var mime = _interopRequireWildcard(require("./_mime.cjs"));
Object.keys(mime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === mime[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return mime[key];
    }
  });
});
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TextDecoder = exports.TextDecoder = globalThis.TextDecoder;
const TextEncoder = exports.TextEncoder = globalThis.TextEncoder;
const deprecate = fn => fn;
exports.deprecate = deprecate;
const _errnoException = exports._errnoException = (0, _utils.notImplemented)("util._errnoException");
const _exceptionWithHostPort = exports._exceptionWithHostPort = (0, _utils.notImplemented)("util._exceptionWithHostPort");
const _extend = exports._extend = (0, _utils.notImplemented)("util._extend");
const aborted = exports.aborted = (0, _utils.notImplemented)("util.aborted");
const callbackify = exports.callbackify = (0, _utils.notImplemented)("util.callbackify");
const getSystemErrorMap = exports.getSystemErrorMap = (0, _utils.notImplemented)("util.getSystemErrorMap");
const getSystemErrorName = exports.getSystemErrorName = (0, _utils.notImplemented)("util.getSystemErrorName");
const toUSVString = exports.toUSVString = (0, _utils.notImplemented)("util.toUSVString");
const stripVTControlCharacters = exports.stripVTControlCharacters = (0, _utils.notImplemented)("util.stripVTControlCharacters");
const transferableAbortController = exports.transferableAbortController = (0, _utils.notImplemented)("util.transferableAbortController");
const transferableAbortSignal = exports.transferableAbortSignal = (0, _utils.notImplemented)("util.transferableAbortSignal");
const parseArgs = exports.parseArgs = (0, _utils.notImplemented)("util.parseArgs");
module.exports = {
  _errnoException,
  _exceptionWithHostPort,
  _extend,
  aborted,
  callbackify,
  deprecate,
  getSystemErrorMap,
  getSystemErrorName,
  inherits: _inherits.default,
  promisify: _promisify.promisify,
  stripVTControlCharacters,
  toUSVString,
  TextDecoder,
  TextEncoder,
  types: _types.default,
  transferableAbortController,
  transferableAbortSignal,
  parseArgs,
  ...mime,
  ...logUtils,
  ...legacyTypes
};