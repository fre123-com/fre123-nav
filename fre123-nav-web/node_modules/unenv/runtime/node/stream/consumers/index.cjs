"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.text = exports.json = exports.default = exports.buffer = exports.blob = exports.arrayBuffer = void 0;
var _utils = require("../../../_internal/utils.cjs");
const arrayBuffer = exports.arrayBuffer = (0, _utils.notImplemented)("stream.consumers.arrayBuffer");
const blob = exports.blob = (0, _utils.notImplemented)("stream.consumers.blob");
const buffer = exports.buffer = (0, _utils.notImplemented)("stream.consumers.buffer");
const text = exports.text = (0, _utils.notImplemented)("stream.consumers.text");
const json = exports.json = (0, _utils.notImplemented)("stream.consumers.json");
module.exports = {
  arrayBuffer,
  blob,
  buffer,
  text,
  json
};