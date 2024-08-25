declare const NodeBuiltinModules: string[];
declare function mapArrToVal(val: any, arr: any[]): any;

interface Environment {
    alias: {
        [key: string]: string;
    };
    inject: {
        [key: string]: string | string[];
    };
    polyfill: string[];
    external: string[];
}
interface Preset extends Partial<Environment> {
}

declare const _default: Preset;

declare const nodeless: Preset & {
    alias: Map<string, string>;
};

declare const denoPreset: Preset;

declare const cloudflarePreset: Preset;

declare const vercelPreset: Preset;

declare function env(...presets: Preset[]): Environment;

export { type Environment, NodeBuiltinModules, type Preset, cloudflarePreset as cloudflare, denoPreset as deno, env, mapArrToVal, _default as node, nodeless, vercelPreset as vercel };
