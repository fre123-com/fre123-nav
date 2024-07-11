export interface SessionStorageOptions {
    base?: string;
    window?: typeof window;
    sessionStorage?: typeof window.sessionStorage;
}
declare const _default: (opts: SessionStorageOptions | undefined) => import("../types").Driver;
export default _default;
