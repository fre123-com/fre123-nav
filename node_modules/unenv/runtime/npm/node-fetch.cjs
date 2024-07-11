"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRedirect = exports.fetch = exports.default = exports.Response = exports.Request = exports.Headers = exports.FetchError = exports.AbortError = exports.AbortController = void 0;
const fetch = (...args) => globalThis.fetch(...args);
exports.fetch = fetch;
const Headers = exports.Headers = globalThis.Headers;
const Request = exports.Request = globalThis.Request;
const Response = exports.Response = globalThis.Response;
const AbortController = exports.AbortController = globalThis.AbortController;
const FetchError = exports.FetchError = Error;
const AbortError = exports.AbortError = Error;
const redirectStatus = /* @__PURE__ */new Set([301, 302, 303, 307, 308]);
const isRedirect = code => redirectStatus.has(code);
exports.isRedirect = isRedirect;
fetch.Promise = globalThis.Promise;
fetch.isRedirect = isRedirect;
module.exports = fetch;