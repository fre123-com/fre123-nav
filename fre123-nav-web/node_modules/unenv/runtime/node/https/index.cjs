"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = exports.globalAgent = exports.get = exports.default = exports.createServer = exports.Server = exports.Agent = void 0;
var _utils = require("../../_internal/utils.cjs");
const Server = exports.Server = (0, _utils.notImplementedClass)("https.Server");
const Agent = exports.Agent = (0, _utils.notImplementedClass)("https.Agent");
const globalAgent = exports.globalAgent = void 0;
const get = exports.get = (0, _utils.notImplemented)("https.get");
const createServer = exports.createServer = (0, _utils.notImplemented)("https.createServer");
const request = exports.request = (0, _utils.notImplemented)("https.request");
module.exports = {
  Server,
  Agent,
  globalAgent,
  get,
  createServer,
  request
};