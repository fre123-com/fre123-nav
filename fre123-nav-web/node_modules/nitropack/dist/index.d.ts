import { a as Nitro, N as NitroConfig, b as NitroOptions, c as NitroPreset } from './shared/nitro.da3b833a.js';
export { $ as $Fetch, m as AppConfig, A as AvailableRouterMethod, C as CompressOptions, D as DevServerOptions, E as ExtractedRouteMethod, g as H3Event$Fetch, H as H3EventFetch, I as InternalApi, K as KebabCase, w as MatchedRoutes, M as MiddlewareOf, s as NitroBuildInfo, u as NitroDevEventHandler, h as NitroDynamicConfig, v as NitroErrorHandler, t as NitroEventHandler, e as NitroFetchOptions, d as NitroFetchRequest, r as NitroFrameworkInfo, l as NitroHooks, y as NitroModule, x as NitroModuleInput, p as NitroRouteConfig, q as NitroRouteRules, j as NitroRuntimeConfig, i as NitroRuntimeConfigApp, f as NitroStaticBuildFlags, k as PrerenderGenerateRoute, P as PrerenderRoute, n as PublicAssetDir, o as ServerAssetDir, S as StorageMounts, T as TypedInternalResponse, W as WasmOptions } from './shared/nitro.da3b833a.js';
import { WatchConfigOptions } from 'c12';
import { Worker } from 'node:worker_threads';
import { App } from 'h3';
import { ListenOptions, Listener } from 'listhen';
import { FSWatcher } from 'chokidar';
import 'unenv';
import 'unimport';
import 'unimport/unplugin';
import 'rollup-plugin-visualizer';
import 'hookable';
import 'consola';
import '@rollup/plugin-commonjs';
import '@rollup/plugin-wasm';
import 'unstorage';
import 'httpxy';
import 'pkg-types';
import '@vercel/nft';
import 'rollup';
import 'esbuild';
import '@rollup/pluginutils';
import 'firebase-functions/v2/https';
import 'firebase-functions';
import 'ofetch';

/**
 * @link https://github.com/remix-run/remix/blob/2248669ed59fd716e267ea41df5d665d4781f4a9/packages/remix-server-runtime/serialize.ts
 */
type JsonPrimitive = string | number | boolean | String | Number | Boolean | null;
type NonJsonPrimitive = undefined | Function | symbol;
type IsAny<T> = 0 extends 1 & T ? true : false;
type FilterKeys<TObj extends object, TFilter> = {
    [TKey in keyof TObj]: TObj[TKey] extends TFilter ? TKey : never;
}[keyof TObj];
type Serialize<T> = IsAny<T> extends true ? any : T extends JsonPrimitive ? T : T extends Map<any, any> | Set<any> ? Record<string, never> : T extends NonJsonPrimitive ? never : T extends {
    toJSON(): infer U;
} ? U : T extends [] ? [] : T extends [unknown, ...unknown[]] ? SerializeTuple<T> : T extends ReadonlyArray<infer U> ? (U extends NonJsonPrimitive ? null : Serialize<U>)[] : T extends object ? SerializeObject<T> : never;
/** JSON serialize [tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types) */
type SerializeTuple<T extends [unknown, ...unknown[]]> = {
    [k in keyof T]: T[k] extends NonJsonPrimitive ? null : Serialize<T[k]>;
};
/** JSON serialize objects (not including arrays) and classes */
type SerializeObject<T extends object> = {
    [k in keyof Omit<T, FilterKeys<T, NonJsonPrimitive>>]: Serialize<T[k]>;
};
/**
 * @see https://github.com/ianstormtaylor/superstruct/blob/7973400cd04d8ad92bbdc2b6f35acbfb3c934079/src/utils.ts#L323-L325
 */
type Simplify<TType> = TType extends any[] | Date ? TType : {
    [K in keyof TType]: Simplify<TType[K]>;
};

declare function prepare(nitro: Nitro): Promise<void>;
declare function copyPublicAssets(nitro: Nitro): Promise<void>;
declare function build(nitro: Nitro): Promise<void>;
declare function writeTypes(nitro: Nitro): Promise<void>;

interface LoadConfigOptions {
    watch?: boolean;
    c12?: WatchConfigOptions;
}
declare function loadOptions(configOverrides?: NitroConfig, opts?: LoadConfigOptions): Promise<NitroOptions>;

declare function createNitro(config?: NitroConfig, opts?: LoadConfigOptions): Promise<Nitro>;

declare const GLOB_SCAN_PATTERN = "**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}";
declare function scanHandlers(nitro: Nitro): Promise<{
    handler: string;
    lazy: boolean;
    middleware: boolean;
    route: string;
    method: any;
}[]>;
declare function scanMiddleware(nitro: Nitro): Promise<{
    middleware: boolean;
    handler: string;
}[]>;
declare function scanServerRoutes(nitro: Nitro, dir: "routes" | "api", prefix?: string): Promise<{
    handler: string;
    lazy: boolean;
    middleware: boolean;
    route: string;
    method: any;
}[]>;
declare function scanPlugins(nitro: Nitro): Promise<string[]>;
declare function scanModules(nitro: Nitro): Promise<string[]>;

interface NitroWorker {
    worker: Worker;
    address: {
        host: string;
        port: number;
    } | {
        socketPath: string;
    };
}
interface NitroDevServer {
    reload: () => void;
    listen: (port: ListenOptions["port"], opts?: Partial<ListenOptions>) => Promise<Listener>;
    app: App;
    close: () => Promise<void>;
    watcher?: FSWatcher;
}
declare function createDevServer(nitro: Nitro): NitroDevServer;

declare function prerender(nitro: Nitro): Promise<void>;

declare function defineNitroPreset(preset: NitroPreset): NitroPreset;

declare const nitroRuntimeDependencies: string[];

export { GLOB_SCAN_PATTERN, type LoadConfigOptions, Nitro, NitroConfig, type NitroDevServer, NitroOptions, NitroPreset, type NitroWorker, type Serialize, type SerializeObject, type SerializeTuple, type Simplify, build, copyPublicAssets, createDevServer, createNitro, defineNitroPreset, loadOptions, nitroRuntimeDependencies, prepare, prerender, scanHandlers, scanMiddleware, scanModules, scanPlugins, scanServerRoutes, writeTypes };
