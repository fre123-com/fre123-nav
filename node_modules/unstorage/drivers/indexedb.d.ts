export interface IDBKeyvalOptions {
    base?: string;
    dbName?: string;
    storeName?: string;
}
declare const _default: (opts: IDBKeyvalOptions | undefined) => import("../types").Driver;
export default _default;
