"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createServer: true,
  request: true,
  get: true,
  Server: true,
  OutgoingMessage: true,
  ClientRequest: true,
  Agent: true,
  globalAgent: true,
  validateHeaderName: true,
  validateHeaderValue: true,
  setMaxIdleHTTPParsers: true
};
exports.validateHeaderValue = exports.validateHeaderName = exports.setMaxIdleHTTPParsers = exports.request = exports.globalAgent = exports.get = exports.default = exports.createServer = exports.Server = exports.OutgoingMessage = exports.ClientRequest = exports.Agent = void 0;
var _utils = require("../../_internal/utils.cjs");
var _proxy = _interopRequireDefault(require("../../mock/proxy.cjs"));
var consts = _interopRequireWildcard(require("./_consts.cjs"));
Object.keys(consts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === consts[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return consts[key];
    }
  });
});
var _request = require("./_request.cjs");
Object.keys(_request).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _request[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _request[key];
    }
  });
});
var _response = require("./_response.cjs");
Object.keys(_response).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _response[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _response[key];
    }
  });
});
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createServer = exports.createServer = (0, _utils.notImplemented)("http.createServer");
const request = exports.request = (0, _utils.notImplemented)("http.request");
const get = exports.get = (0, _utils.notImplemented)("http.get");
const Server = exports.Server = _proxy.default.__createMock__("http.Server");
const OutgoingMessage = exports.OutgoingMessage = _proxy.default.__createMock__("http.OutgoingMessage");
const ClientRequest = exports.ClientRequest = _proxy.default.__createMock__("http.ClientRequest");
const Agent = exports.Agent = _proxy.default.__createMock__("http.Agent");
const globalAgent = exports.globalAgent = new Agent();
const validateHeaderName = exports.validateHeaderName = (0, _utils.notImplemented)("http.validateHeaderName");
const validateHeaderValue = exports.validateHeaderValue = (0, _utils.notImplemented)("http.validateHeaderValue");
const setMaxIdleHTTPParsers = exports.setMaxIdleHTTPParsers = (0, _utils.notImplemented)("http.setMaxIdleHTTPParsers");
module.exports = {
  ...consts,
  IncomingMessage: _request.IncomingMessage,
  ServerResponse: _response.ServerResponse,
  createServer,
  request,
  get,
  Server,
  OutgoingMessage,
  ClientRequest,
  Agent,
  globalAgent,
  validateHeaderName,
  validateHeaderValue,
  setMaxIdleHTTPParsers
};