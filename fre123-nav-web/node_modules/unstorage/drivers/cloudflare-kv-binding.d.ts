/// <reference types="@cloudflare/workers-types" />
export interface KVOptions {
    binding?: string | KVNamespace;
    /** Adds prefix to all stored keys */
    base?: string;
}
declare const _default: (opts: KVOptions | undefined) => import("../types").Driver;
export default _default;
