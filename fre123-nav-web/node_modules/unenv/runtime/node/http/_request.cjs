"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncomingMessage = void 0;
var _socket = require("../net/socket.cjs");
var _readable = require("../stream/readable.cjs");
var _utils = require("../../_internal/utils.cjs");
class IncomingMessage extends _readable.Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new _socket.Socket();
  }
  get rawHeaders() {
    return (0, _utils.rawHeaders)(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
exports.IncomingMessage = IncomingMessage;
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(Boolean);
    }
  }
  return d;
}