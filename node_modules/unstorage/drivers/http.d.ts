export interface HTTPOptions {
    base: string;
    headers?: Record<string, string>;
}
declare const _default: (opts: HTTPOptions) => import("../types").Driver;
export default _default;
