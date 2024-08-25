import { c as createFetch } from './shared/ofetch.37386b05.mjs';
export { F as FetchError, a as createFetchError } from './shared/ofetch.37386b05.mjs';
import 'destr';
import 'ufo';

const _globalThis = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
const fetch = _globalThis.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!")));
const Headers = _globalThis.Headers;
const AbortController = _globalThis.AbortController;
const ofetch = createFetch({ fetch, Headers, AbortController });
const $fetch = ofetch;

export { $fetch, AbortController, Headers, createFetch, fetch, ofetch };
