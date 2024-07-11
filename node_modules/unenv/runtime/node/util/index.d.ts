/// <reference types="node" />
import type util from "node:util";
export * from "./_mime";
export * from "./_legacy-types";
export * from "./_log";
export { default as inherits } from "../../npm/inherits";
export { promisify } from "./_promisify";
export { default as types } from "./types";
export declare const TextDecoder: typeof util.TextDecoder;
export declare const TextEncoder: typeof util.TextEncoder;
export declare const deprecate: typeof util.deprecate;
export declare const _errnoException: (() => any) & {
    __unenv__: boolean;
};
export declare const _exceptionWithHostPort: (() => any) & {
    __unenv__: boolean;
};
export declare const _extend: (() => any) & {
    __unenv__: boolean;
};
export declare const aborted: typeof util.aborted;
export declare const callbackify: typeof util.callbackify;
export declare const getSystemErrorMap: typeof util.getSystemErrorMap;
export declare const getSystemErrorName: typeof util.getSystemErrorName;
export declare const toUSVString: typeof util.toUSVString;
export declare const stripVTControlCharacters: typeof util.stripVTControlCharacters;
export declare const transferableAbortController: typeof util.transferableAbortController;
export declare const transferableAbortSignal: typeof util.transferableAbortSignal;
export declare const parseArgs: typeof util.parseArgs;
declare const _default: any;
export default _default;
