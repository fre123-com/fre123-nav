import { notImplemented } from "../../_internal/utils.mjs";
import inherits from "../../npm/inherits.mjs";
import * as legacyTypes from "./_legacy-types.mjs";
import * as logUtils from "./_log.mjs";
import types from "./types/index.mjs";
import { promisify } from "./_promisify.mjs";
import * as mime from "./_mime.mjs";
export * from "./_mime.mjs";
export * from "./_legacy-types.mjs";
export * from "./_log.mjs";
export { default as inherits } from "../../npm/inherits.mjs";
export { promisify } from "./_promisify.mjs";
export { default as types } from "./types/index.mjs";
export const TextDecoder = globalThis.TextDecoder;
export const TextEncoder = globalThis.TextEncoder;
export const deprecate = (fn) => fn;
export const _errnoException = notImplemented("util._errnoException");
export const _exceptionWithHostPort = notImplemented(
  "util._exceptionWithHostPort"
);
export const _extend = notImplemented("util._extend");
export const aborted = notImplemented("util.aborted");
export const callbackify = notImplemented("util.callbackify");
export const getSystemErrorMap = notImplemented(
  "util.getSystemErrorMap"
);
export const getSystemErrorName = notImplemented("util.getSystemErrorName");
export const toUSVString = notImplemented("util.toUSVString");
export const stripVTControlCharacters = notImplemented("util.stripVTControlCharacters");
export const transferableAbortController = notImplemented("util.transferableAbortController");
export const transferableAbortSignal = notImplemented("util.transferableAbortSignal");
export const parseArgs = notImplemented("util.parseArgs");
export default {
  _errnoException,
  _exceptionWithHostPort,
  _extend,
  aborted,
  callbackify,
  deprecate,
  getSystemErrorMap,
  getSystemErrorName,
  inherits,
  promisify,
  stripVTControlCharacters,
  toUSVString,
  TextDecoder,
  TextEncoder,
  types,
  transferableAbortController,
  transferableAbortSignal,
  parseArgs,
  ...mime,
  ...logUtils,
  ...legacyTypes
};
