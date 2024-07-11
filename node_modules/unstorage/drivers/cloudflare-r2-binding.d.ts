/// <reference types="@cloudflare/workers-types" />
export interface CloudflareR2Options {
    binding: string | R2Bucket;
    base?: string;
}
declare const _default: (opts: CloudflareR2Options) => import("../types").Driver;
export default _default;
