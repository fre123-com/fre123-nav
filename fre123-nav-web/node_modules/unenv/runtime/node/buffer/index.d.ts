/// <reference types="node" />
export { kMaxLength, INSPECT_MAX_BYTES, SlowBuffer } from "./_buffer";
export declare const Buffer: BufferConstructor;
export { File } from "./_file";
export declare const Blob: any;
export declare const resolveObjectURL: (() => any) & {
    __unenv__: boolean;
};
export declare const transcode: (() => any) & {
    __unenv__: boolean;
};
export declare const isUtf8: (() => any) & {
    __unenv__: boolean;
};
export declare const isAscii: (() => any) & {
    __unenv__: boolean;
};
export declare const btoa: typeof globalThis.btoa;
export declare const atob: typeof globalThis.atob;
export declare const kStringMaxLength = 0;
export declare const constants: {
    MAX_LENGTH: number;
    MAX_STRING_LENGTH: number;
};
declare const _default: any;
export default _default;
