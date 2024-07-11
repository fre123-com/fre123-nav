"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = exports.BlockList = void 0;
Object.defineProperty(exports, "Socket", {
  enumerable: true,
  get: function () {
    return _socket.Socket;
  }
});
Object.defineProperty(exports, "SocketAddress", {
  enumerable: true,
  get: function () {
    return _socket.SocketAddress;
  }
});
exports.setDefaultAutoSelectFamilyAttemptTimeout = exports.setDefaultAutoSelectFamily = exports.isIPv6 = exports.isIPv4 = exports.isIP = exports.getDefaultAutoSelectFamilyAttemptTimeout = exports.getDefaultAutoSelectFamily = exports.exports = exports.default = exports.createServer = exports.createConnection = exports.connect = void 0;
var _utils = require("../../_internal/utils.cjs");
var _socket = require("./socket.cjs");
const createServer = exports.createServer = (0, _utils.notImplemented)("net.createServer");
const Server = exports.Server = (0, _utils.notImplementedClass)("net.Server");
const BlockList = exports.BlockList = (0, _utils.notImplementedClass)("net.BlockList");
const connect = exports.connect = (0, _utils.notImplemented)("net.connect");
const createConnection = exports.createConnection = (0, _utils.notImplemented)("net.createConnection");
const getDefaultAutoSelectFamily = exports.getDefaultAutoSelectFamily = (0, _utils.notImplemented)("net.getDefaultAutoSelectFamily");
const setDefaultAutoSelectFamily = exports.setDefaultAutoSelectFamily = (0, _utils.notImplemented)("net.setDefaultAutoSelectFamily");
const getDefaultAutoSelectFamilyAttemptTimeout = exports.getDefaultAutoSelectFamilyAttemptTimeout = (0, _utils.notImplemented)("net.getDefaultAutoSelectFamilyAttemptTimeout");
const setDefaultAutoSelectFamilyAttemptTimeout = exports.setDefaultAutoSelectFamilyAttemptTimeout = (0, _utils.notImplemented)("net.setDefaultAutoSelectFamilyAttemptTimeout");
const IPV4Regex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
const isIPv4 = host => IPV4Regex.test(host);
exports.isIPv4 = isIPv4;
const IPV6Regex = /^([\dA-Fa-f]{1,4}:){7}[\dA-Fa-f]{1,4}$/;
const isIPv6 = host => IPV6Regex.test(host);
exports.isIPv6 = isIPv6;
const isIP = host => {
  if (isIPv4(host)) {
    return 4;
  }
  if (isIPv6(host)) {
    return 6;
  }
  return 0;
};
exports.isIP = isIP;
const _exports = exports.exports = {
  Socket: _socket.Socket,
  // TODO
  Server,
  BlockList,
  SocketAddress: _socket.SocketAddress,
  createServer,
  connect,
  createConnection,
  isIPv4,
  isIPv6,
  isIP,
  getDefaultAutoSelectFamily,
  getDefaultAutoSelectFamilyAttemptTimeout,
  setDefaultAutoSelectFamily,
  setDefaultAutoSelectFamilyAttemptTimeout
};
module.exports = _exports;