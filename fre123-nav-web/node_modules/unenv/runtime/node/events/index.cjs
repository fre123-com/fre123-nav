"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.once = exports.default = exports.EventEmitter = void 0;
var _events = require("./_events.cjs");
const EventEmitter = exports.EventEmitter = globalThis.EventEmitter || _events.EventEmitter;
const once = exports.once = _events.once;
module.exports = {
  EventEmitter,
  once
};