export interface FSStorageOptions {
    base?: string;
    ignore?: (path: string) => boolean;
    readOnly?: boolean;
    noClear?: boolean;
}
declare const _default: (opts: FSStorageOptions | undefined) => import("../types").Driver;
export default _default;
