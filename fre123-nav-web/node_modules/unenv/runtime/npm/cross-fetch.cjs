"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.default = exports.Response = exports.Request = exports.Headers = void 0;
const fetch = (...args) => globalThis.fetch(...args);
exports.fetch = fetch;
module.exports = fetch;
const Headers = exports.Headers = globalThis.Headers;
const Request = exports.Request = globalThis.Request;
const Response = exports.Response = globalThis.Response;