export interface PlanetscaleDriverOptions {
    url?: string;
    table?: string;
    boostCache?: boolean;
}
declare const _default: (opts: PlanetscaleDriverOptions | undefined) => import("../types").Driver;
export default _default;
