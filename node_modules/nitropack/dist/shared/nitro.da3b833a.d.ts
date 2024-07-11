import { Preset } from 'unenv';
import { Unimport } from 'unimport';
import { UnimportPluginOptions } from 'unimport/unplugin';
import { PluginVisualizerOptions } from 'rollup-plugin-visualizer';
import { Hookable, NestedHooks } from 'hookable';
import { ConsolaInstance, LogLevel } from 'consola';
import { WatchOptions } from 'chokidar';
import { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import { RollupWasmOptions } from '@rollup/plugin-wasm';
import { Storage, BuiltinDriverName } from 'unstorage';
import { ProxyServerOptions } from 'httpxy';
import { RouterMethod, H3Event, EventHandler, H3Error, ProxyOptions } from 'h3';
import { ResolvedConfig, ConfigWatcher } from 'c12';
import { TSConfig } from 'pkg-types';
import { NodeFileTraceOptions } from '@vercel/nft';
import { InputOptions, OutputOptions } from 'rollup';
import { TransformOptions, Loader } from 'esbuild';
import { FilterPattern } from '@rollup/pluginutils';
import { HttpsOptions } from 'firebase-functions/v2/https';
import { region, RuntimeOptions } from 'firebase-functions';
import { FetchRequest, FetchOptions, FetchResponse } from 'ofetch';

type MatchResult<Key extends string, Exact extends boolean = false, Score extends any[] = [], catchAll extends boolean = false> = {
    [k in Key]: {
        key: k;
        exact: Exact;
        score: Score;
        catchAll: catchAll;
    };
}[Key];
type Subtract<Minuend extends any[] = [], Subtrahend extends any[] = []> = Minuend extends [...Subtrahend, ...infer Remainder] ? Remainder : never;
type TupleIfDiff<First extends string, Second extends string, Tuple extends any[] = []> = First extends `${Second}${infer Diff}` ? Diff extends "" ? [] : Tuple : [];
type MaxTuple<N extends any[] = [], T extends any[] = []> = {
    current: T;
    result: MaxTuple<N, ["", ...T]>;
}[[N["length"]] extends [Partial<T>["length"]] ? "current" : "result"];
type CalcMatchScore<Key extends string, Route extends string, Score extends any[] = [], Init extends boolean = false, FirstKeySegMatcher extends string = Init extends true ? ":Invalid:" : ""> = `${Key}/` extends `${infer KeySeg}/${infer KeyRest}` ? KeySeg extends FirstKeySegMatcher ? Subtract<[
    ...Score,
    ...TupleIfDiff<Route, Key, ["", ""]>
], TupleIfDiff<Key, Route, ["", ""]>> : `${Route}/` extends `${infer RouteSeg}/${infer RouteRest}` ? `${RouteSeg}?` extends `${infer RouteSegWithoutQuery}?${string}` ? RouteSegWithoutQuery extends KeySeg ? CalcMatchScore<KeyRest, RouteRest, [...Score, "", ""]> : KeySeg extends `:${string}` ? RouteSegWithoutQuery extends "" ? never : CalcMatchScore<KeyRest, RouteRest, [...Score, ""]> : KeySeg extends RouteSegWithoutQuery ? CalcMatchScore<KeyRest, RouteRest, [...Score, ""]> : never : never : never : never;
type _MatchedRoutes<Route extends string, MatchedResultUnion extends MatchResult<string> = MatchResult<keyof InternalApi>> = MatchedResultUnion["key"] extends infer MatchedKeys ? MatchedKeys extends string ? Route extends MatchedKeys ? MatchResult<MatchedKeys, true> : MatchedKeys extends `${infer Root}/**${string}` ? MatchedKeys extends `${string}/**` ? Route extends `${Root}/${string}` ? MatchResult<MatchedKeys, false, [], true> : never : MatchResult<MatchedKeys, false, CalcMatchScore<Root, Route, [], true>> : MatchResult<MatchedKeys, false, CalcMatchScore<MatchedKeys, Route, [], true>> : never : never;
type MatchedRoutes<Route extends string, MatchedKeysResult extends MatchResult<string> = MatchResult<keyof InternalApi>, Matches extends MatchResult<string> = _MatchedRoutes<Route, MatchedKeysResult>> = Route extends "/" ? keyof InternalApi : Extract<Matches, {
    exact: true;
}> extends never ? Extract<Exclude<Matches, {
    score: never;
}>, {
    score: MaxTuple<Matches["score"]>;
}>["key"] | Extract<Matches, {
    catchAll: true;
}>["key"] : Extract<Matches, {
    exact: true;
}>["key"];
type KebabCase<T extends string, A extends string = ""> = T extends `${infer F}${infer R}` ? KebabCase<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`> : A;

interface InternalApi {
}
type NitroFetchRequest = Exclude<keyof InternalApi, `/_${string}` | `/api/_${string}`> | Exclude<FetchRequest, string> | (string & {});
type MiddlewareOf<Route extends string, Method extends RouterMethod | "default"> = Method extends keyof InternalApi[MatchedRoutes<Route>] ? Exclude<InternalApi[MatchedRoutes<Route>][Method], Error | void> : never;
type TypedInternalResponse<Route, Default = unknown, Method extends RouterMethod = RouterMethod> = Default extends string | boolean | number | null | void | object ? Default : Route extends string ? MiddlewareOf<Route, Method> extends never ? MiddlewareOf<Route, "default"> extends never ? Default : MiddlewareOf<Route, "default"> : MiddlewareOf<Route, Method> : Default;
type AvailableRouterMethod<R extends NitroFetchRequest> = R extends string ? keyof InternalApi[MatchedRoutes<R>] extends undefined ? RouterMethod : Extract<keyof InternalApi[MatchedRoutes<R>], "default"> extends undefined ? Extract<RouterMethod, keyof InternalApi[MatchedRoutes<R>]> : RouterMethod : RouterMethod;
interface NitroFetchOptions<R extends NitroFetchRequest, M extends AvailableRouterMethod<R> = AvailableRouterMethod<R>> extends FetchOptions {
    method?: Uppercase<M> | M;
}
type ExtractedRouteMethod<R extends NitroFetchRequest, O extends NitroFetchOptions<R>> = O extends undefined ? "get" : Lowercase<O["method"]> extends RouterMethod ? Lowercase<O["method"]> : "get";
interface $Fetch<DefaultT = unknown, DefaultR extends NitroFetchRequest = NitroFetchRequest> {
    <T = DefaultT, R extends NitroFetchRequest = DefaultR, O extends NitroFetchOptions<R> = NitroFetchOptions<R>>(request: R, opts?: O): Promise<TypedInternalResponse<R, T, ExtractedRouteMethod<R, O>>>;
    raw<T = DefaultT, R extends NitroFetchRequest = DefaultR, O extends NitroFetchOptions<R> = NitroFetchOptions<R>>(request: R, opts?: O): Promise<FetchResponse<TypedInternalResponse<R, T, ExtractedRouteMethod<R, O>>>>;
    create<T = DefaultT, R extends NitroFetchRequest = DefaultR>(defaults: FetchOptions): $Fetch<T, R>;
}
declare global {
    var $fetch: $Fetch;
    namespace NodeJS {
        interface Global {
            $fetch: $Fetch;
        }
    }
}

interface NodeExternalsOptions {
    inline?: Array<string | RegExp | ((id: string, importer?: string) => Promise<boolean> | boolean)>;
    external?: Array<string | RegExp | ((id: string, importer?: string) => Promise<boolean> | boolean)>;
    rootDir?: string;
    outDir?: string;
    trace?: boolean;
    traceOptions?: NodeFileTraceOptions;
    moduleDirectories?: string[];
    exportConditions?: string[];
    traceInclude?: string[];
    traceAlias?: Record<string, string>;
}

type RollupConfig = InputOptions & {
    output: OutputOptions;
};

interface Options extends TransformOptions {
    include?: FilterPattern;
    exclude?: FilterPattern;
    sourceMap?: boolean | "inline" | "hidden";
    /**
     * Map extension to esbuild loader
     * Note that each entry (the extension) needs to start with a dot
     */
    loaders?: {
        [ext: string]: Loader | false;
    };
}

interface CacheEntry<T = any> {
    value?: T;
    expires?: number;
    mtime?: number;
    integrity?: string;
}
interface CacheOptions<T = any> {
    name?: string;
    getKey?: (...args: any[]) => string | Promise<string>;
    transform?: (entry: CacheEntry<T>, ...args: any[]) => any;
    validate?: (entry: CacheEntry<T>) => boolean;
    shouldInvalidateCache?: (...args: any[]) => boolean;
    shouldBypassCache?: (...args: any[]) => boolean;
    group?: string;
    integrity?: any;
    /**
     * Number of seconds to cache the response. Defaults to 1.
     */
    maxAge?: number;
    swr?: boolean;
    staleMaxAge?: number;
    base?: string;
}
interface ResponseCacheEntry<T = any> {
    body: T;
    code: number;
    headers: Record<string, string | number | string[]>;
}
interface CachedEventHandlerOptions<T = any> extends Omit<CacheOptions<ResponseCacheEntry<T>>, "transform" | "validate"> {
    shouldInvalidateCache?: (event: H3Event) => boolean;
    shouldBypassCache?: (event: H3Event) => boolean;
    getKey?: (event: H3Event) => string | Promise<string>;
    headersOnly?: boolean;
    varies?: string[];
}

type CapturedErrorContext = {
    event?: H3Event;
    [key: string]: unknown;
};
type CaptureError = (error: Error, context: CapturedErrorContext) => void;

declare const awsAmplify: NitroPreset;

declare const awsLambda: NitroPreset;

declare const azureFunctions: NitroPreset;

declare const azure: NitroPreset;

declare const baseWorker: NitroPreset;

declare const bun: NitroPreset;

declare const cloudflareModule: NitroPreset;

declare const cloudflarePages: NitroPreset;
declare const cloudflarePagesStatic: NitroPreset;

declare const cloudflare: NitroPreset;

declare const denoDeploy: NitroPreset;
declare const deno: NitroPreset;

declare const denoServer: NitroPreset;

declare const digitalOcean: NitroPreset;

declare const firebase: NitroPreset;

declare const heroku: NitroPreset;

declare const edgio: NitroPreset;

declare const netlify: NitroPreset;
declare const netlifyBuilder: NitroPreset;
declare const netlifyEdge: NitroPreset;
declare const netlifyStatic: NitroPreset;

declare const nitroDev: NitroPreset;

declare const nitroPrerender: NitroPreset;

declare const cli: NitroPreset;

declare const nodeServer: NitroPreset;
declare const nodeCluster: NitroPreset;

declare const node: NitroPreset;

declare const renderCom: NitroPreset;

declare const serviceWorker: NitroPreset;

declare const stormkit: NitroPreset;

declare const vercel: NitroPreset;
declare const vercelEdge: NitroPreset;
declare const vercelStatic: NitroPreset;

declare const cleavr: NitroPreset;

declare const flightControl: NitroPreset;

/**
 * Both function_id and organization_id fields are required but only used when deploying the function
 * Ref: https://github.com/lagonapp/lagon/blob/06093d051898d7603f356b9cae5e3f14078d480a/crates/cli/src/utils/deployments.rs#L34
 */
interface LagonFunctionConfig {
    function_id: string;
    organization_id: string;
    index: string;
    client?: string;
    assets?: string;
}
declare const lagon: NitroPreset;

declare const iisHandler: NitroPreset;
declare const iis: NitroPreset;
declare const iisNode: NitroPreset;

declare const _static: NitroPreset;

declare const githubPages: NitroPreset;

declare const winterjs: NitroPreset;

type _PRESETS_LagonFunctionConfig = LagonFunctionConfig;
declare const _PRESETS_awsAmplify: typeof awsAmplify;
declare const _PRESETS_awsLambda: typeof awsLambda;
declare const _PRESETS_azure: typeof azure;
declare const _PRESETS_azureFunctions: typeof azureFunctions;
declare const _PRESETS_baseWorker: typeof baseWorker;
declare const _PRESETS_bun: typeof bun;
declare const _PRESETS_cleavr: typeof cleavr;
declare const _PRESETS_cli: typeof cli;
declare const _PRESETS_cloudflare: typeof cloudflare;
declare const _PRESETS_cloudflareModule: typeof cloudflareModule;
declare const _PRESETS_cloudflarePages: typeof cloudflarePages;
declare const _PRESETS_cloudflarePagesStatic: typeof cloudflarePagesStatic;
declare const _PRESETS_deno: typeof deno;
declare const _PRESETS_denoDeploy: typeof denoDeploy;
declare const _PRESETS_denoServer: typeof denoServer;
declare const _PRESETS_digitalOcean: typeof digitalOcean;
declare const _PRESETS_edgio: typeof edgio;
declare const _PRESETS_firebase: typeof firebase;
declare const _PRESETS_flightControl: typeof flightControl;
declare const _PRESETS_githubPages: typeof githubPages;
declare const _PRESETS_heroku: typeof heroku;
declare const _PRESETS_iis: typeof iis;
declare const _PRESETS_iisHandler: typeof iisHandler;
declare const _PRESETS_iisNode: typeof iisNode;
declare const _PRESETS_lagon: typeof lagon;
declare const _PRESETS_netlify: typeof netlify;
declare const _PRESETS_netlifyBuilder: typeof netlifyBuilder;
declare const _PRESETS_netlifyEdge: typeof netlifyEdge;
declare const _PRESETS_netlifyStatic: typeof netlifyStatic;
declare const _PRESETS_nitroDev: typeof nitroDev;
declare const _PRESETS_nitroPrerender: typeof nitroPrerender;
declare const _PRESETS_node: typeof node;
declare const _PRESETS_nodeCluster: typeof nodeCluster;
declare const _PRESETS_nodeServer: typeof nodeServer;
declare const _PRESETS_renderCom: typeof renderCom;
declare const _PRESETS_serviceWorker: typeof serviceWorker;
declare const _PRESETS_stormkit: typeof stormkit;
declare const _PRESETS_vercel: typeof vercel;
declare const _PRESETS_vercelEdge: typeof vercelEdge;
declare const _PRESETS_vercelStatic: typeof vercelStatic;
declare const _PRESETS_winterjs: typeof winterjs;
declare namespace _PRESETS {
  export { type _PRESETS_LagonFunctionConfig as LagonFunctionConfig, _PRESETS_awsAmplify as awsAmplify, _PRESETS_awsLambda as awsLambda, _PRESETS_azure as azure, _PRESETS_azureFunctions as azureFunctions, _PRESETS_baseWorker as baseWorker, _PRESETS_bun as bun, _PRESETS_cleavr as cleavr, _PRESETS_cli as cli, _PRESETS_cloudflare as cloudflare, _PRESETS_cloudflareModule as cloudflareModule, _PRESETS_cloudflarePages as cloudflarePages, _PRESETS_cloudflarePagesStatic as cloudflarePagesStatic, _PRESETS_deno as deno, _PRESETS_denoDeploy as denoDeploy, _PRESETS_denoServer as denoServer, _PRESETS_digitalOcean as digitalOcean, _PRESETS_edgio as edgio, _PRESETS_firebase as firebase, _PRESETS_flightControl as flightControl, _PRESETS_githubPages as githubPages, _PRESETS_heroku as heroku, _PRESETS_iis as iis, _PRESETS_iisHandler as iisHandler, _PRESETS_iisNode as iisNode, _PRESETS_lagon as lagon, edgio as layer0, _PRESETS_netlify as netlify, _PRESETS_netlifyBuilder as netlifyBuilder, _PRESETS_netlifyEdge as netlifyEdge, _PRESETS_netlifyStatic as netlifyStatic, _PRESETS_nitroDev as nitroDev, _PRESETS_nitroPrerender as nitroPrerender, _PRESETS_node as node, _PRESETS_nodeCluster as nodeCluster, _PRESETS_nodeServer as nodeServer, _PRESETS_renderCom as renderCom, _PRESETS_serviceWorker as serviceWorker, _static as static, _PRESETS_stormkit as stormkit, _PRESETS_vercel as vercel, _PRESETS_vercelEdge as vercelEdge, _PRESETS_vercelStatic as vercelStatic, _PRESETS_winterjs as winterjs };
}

interface NitroEventHandler {
    /**
     * Path prefix or route
     *
     * If an empty string used, will be used as a middleware
     */
    route?: string;
    /**
     * Specifies this is a middleware handler.
     * Middleware are called on every route and should normally return nothing to pass to the next handlers
     */
    middleware?: boolean;
    /**
     * Use lazy loading to import handler
     */
    lazy?: boolean;
    /**
     * Path to event handler
     *
     */
    handler: string;
    /**
     * Router method matcher
     */
    method?: string;
}
interface NitroDevEventHandler {
    /**
     * Path prefix or route
     */
    route?: string;
    /**
     * Event handler
     *
     */
    handler: EventHandler;
}
type NitroErrorHandler = (error: H3Error, event: H3Event) => void | Promise<void>;

type AmplifyImageSettings = {
    /** Array of supported image widths */
    sizes: number[];
    /**
     * Array of allowed external domains that can use Image Optimization.
     * Leave empty for only allowing the deployment domain to use Image Optimization.
     */
    domains: string[];
    /**
     * Array of allowed external patterns that can use Image Optimization.
     * Similar to `domains` but provides more control with RegExp.
     */
    remotePatterns: {
        /** The protocol of the allowed remote pattern. Can be `http` or `https`. */
        protocol?: "http" | "https";
        /**
         * The hostname of the allowed remote pattern.
         * Can be literal or wildcard. Single `*` matches a single subdomain.
         *  Double `**` matches any number of subdomains.
         * We will disallow blanket wildcards of `**` with nothing else.
         */
        hostname: string;
        /** The port of the allowed remote pattern. */
        port?: string;
        /** The pathname of the allowed remote pattern. */
        pathname?: string;
    }[];
    /** Array of allowed output image formats. */
    formats: ("image/avif" | "image/webp" | "image/gif" | "image/png" | "image/jpeg")[];
    /** Cache duration (in seconds) for the optimized images. */
    minimumCacheTTL: number;
    /** Allow SVG input image URLs. This is disabled by default for security purposes. */
    dangerouslyAllowSVG: boolean;
};
interface AWSAmplifyOptions {
    catchAllStaticFallback?: boolean;
    imageOptimization?: {
        path?: string;
        cacheControl?: string;
    };
    imageSettings?: AmplifyImageSettings;
}

interface AzureOptions {
    config?: {
        platform?: {
            apiRuntime?: string;
            [key: string]: unknown;
        };
        navigationFallback?: {
            rewrite?: string;
            [key: string]: unknown;
        };
        [key: string]: unknown;
    };
}

/**
 * https://developers.cloudflare.com/pages/platform/functions/routing/#functions-invocation-routes
 */
interface CloudflarePagesRoutes {
    /** Defines the version of the schema. Currently there is only one version of the schema (version 1), however, we may add more in the future and aim to be backwards compatible. */
    version?: 1;
    /** Defines routes that will be invoked by Functions. Accepts wildcard behavior. */
    include?: string[];
    /** Defines routes that will not be invoked by Functions. Accepts wildcard behavior. `exclude` always take priority over `include`. */
    exclude?: string[];
}
interface CloudflareOptions {
    pages: {
        /**
         * Nitro will automatically generate a `_routes.json` that controls which files get served statically and
         * which get served by the Worker. Using this config will override the automatic `_routes.json`. Or, if the
         * `merge` options is set, it will merge the user-set routes with the auto-generated ones, giving priority
         * to the user routes.
         *
         * @see https://developers.cloudflare.com/pages/platform/functions/routing/#functions-invocation-routes
         *
         * There are a maximum of 100 rules, and you must have at least one include rule. Wildcards are accepted.
         *
         * If any fields are unset, they default to:
         *
         * ```json
         * {
         *   "version": 1,
         *   "include": ["/*"],
         *   "exclude": []
         * }
         * ```
         */
        routes?: CloudflarePagesRoutes;
        /**
         * If set to `false`, nitro will disable the automatically generated `_routes.json` and instead use the user-set only ones.
         *
         * @default true
         */
        defaultRoutes?: boolean;
    };
}

type FirebaseOptions = FirebaseOptionsGen1 | FirebaseOptionsGen2;
interface FirebaseOptionsBase {
    gen: 1 | 2;
    /**
     * Firebase functions node runtime version.
     * @see https://cloud.google.com/functions/docs/concepts/nodejs-runtime
     */
    nodeVersion?: "20" | "18" | "16";
    /**
     * When deploying multiple apps within the same Firebase project
     * you must give your server a unique name in order to avoid overwriting your functions.
     *
     * @default "server"
     */
    serverFunctionName?: string;
}
interface FirebaseOptionsGen1 extends FirebaseOptionsBase {
    gen: 1;
    /**
     * Firebase functions 1st generation region passed to `functions.region()`.
     */
    region?: Parameters<typeof region>[0];
    /**
     * Firebase functions 1st generation runtime options passed to `functions.runWith()`.
     */
    runtimeOptions?: RuntimeOptions;
}
interface FirebaseOptionsGen2 extends FirebaseOptionsBase {
    gen: 2;
    /**
     * Firebase functions 2nd generation https options passed to `onRequest`.
     * @see https://firebase.google.com/docs/reference/functions/2nd-gen/node/firebase-functions.https.httpsoptions
     */
    httpsOptions?: HttpsOptions;
}

/**
 * Vercel Build Output Configuration
 * @see https://vercel.com/docs/build-output-api/v3
 */
interface VercelBuildConfigV3 {
    version: 3;
    routes?: ({
        src: string;
        headers: {
            "cache-control": string;
        };
        continue: boolean;
    } | {
        handle: string;
    } | {
        src: string;
        dest: string;
    })[];
    images?: {
        sizes: number[];
        domains: string[];
        remotePatterns?: {
            protocol?: "http" | "https";
            hostname: string;
            port?: string;
            pathname?: string;
        }[];
        minimumCacheTTL?: number;
        formats?: ("image/avif" | "image/webp")[];
        dangerouslyAllowSVG?: boolean;
        contentSecurityPolicy?: string;
    };
    wildcard?: Array<{
        domain: string;
        value: string;
    }>;
    overrides?: Record<string, {
        path?: string;
        contentType?: string;
    }>;
    cache?: string[];
    bypassToken?: string;
    crons?: {
        path: string;
        schedule: string;
    }[];
}
/**
 * https://vercel.com/docs/build-output-api/v3/primitives#serverless-function-configuration
 */
interface VercelServerlessFunctionConfig {
    /**
     * Amount of memory (RAM in MB) that will be allocated to the Serverless Function.
     */
    memory?: number;
    /**
     * Maximum execution duration (in seconds) that will be allowed for the Serverless Function.
     */
    maxDuration?: number;
    /**
     * True if a custom runtime has support for Lambda runtime wrappers.
     */
    supportsWrapper?: boolean;
    /**
     * When true, the Serverless Function will stream the response to the client.
     */
    supportsResponseStreaming?: boolean;
    [key: string]: unknown;
}
interface VercelOptions {
    config: VercelBuildConfigV3;
    /**
     * If you are using `vercel-edge`, you can specify the region(s) for your edge function.
     * @see https://vercel.com/docs/concepts/functions/edge-functions#edge-function-regions
     */
    regions?: string[];
    functions?: VercelServerlessFunctionConfig;
}

interface PresetOptions {
    azure: AzureOptions;
    cloudflare: CloudflareOptions;
    firebase: FirebaseOptions;
    vercel: VercelOptions;
    awsAmplify: AWSAmplifyOptions;
}

type NitroModuleInput = string | NitroModule | NitroModule["setup"];
interface NitroModule {
    name?: string;
    setup: (this: void, nitro: Nitro) => void | Promise<void>;
}

type NitroDynamicConfig = Pick<NitroConfig, "runtimeConfig" | "routeRules">;
interface NitroRuntimeConfigApp {
    baseURL: string;
    [key: string]: any;
}
interface NitroRuntimeConfig {
    app: NitroRuntimeConfigApp;
    nitro: {
        envPrefix?: string;
        routeRules?: {
            [path: string]: NitroRouteConfig;
        };
    };
    [key: string]: any;
}
interface Nitro {
    options: NitroOptions;
    scannedHandlers: NitroEventHandler[];
    vfs: Record<string, string>;
    hooks: Hookable<NitroHooks>;
    unimport?: Unimport;
    logger: ConsolaInstance;
    storage: Storage;
    close: () => Promise<void>;
    updateConfig: (config: NitroDynamicConfig) => void | Promise<void>;
    _prerenderedRoutes?: PrerenderRoute[];
    _prerenderMeta?: Record<string, {
        contentType?: string;
    }>;
}
interface PrerenderRoute {
    route: string;
    contents?: string;
    data?: ArrayBuffer;
    fileName?: string;
    error?: Error & {
        statusCode: number;
        statusMessage: string;
    };
    generateTimeMS?: number;
    skip?: boolean;
    contentType?: string;
}
/** @deprecated Internal type will be removed in future versions */
type PrerenderGenerateRoute = PrerenderRoute;
type HookResult = void | Promise<void>;
interface NitroHooks {
    "rollup:before": (nitro: Nitro, config: RollupConfig) => HookResult;
    compiled: (nitro: Nitro) => HookResult;
    "dev:reload": () => HookResult;
    "rollup:reload": () => HookResult;
    restart: () => HookResult;
    close: () => HookResult;
    "prerender:routes": (routes: Set<string>) => HookResult;
    "prerender:config": (config: NitroConfig) => HookResult;
    "prerender:init": (prerenderer: Nitro) => HookResult;
    "prerender:generate": (route: PrerenderRoute, nitro: Nitro) => HookResult;
    "prerender:route": (route: PrerenderRoute) => HookResult;
    "prerender:done": (result: {
        prerenderedRoutes: PrerenderRoute[];
        failedRoutes: PrerenderRoute[];
    }) => HookResult;
}
type CustomDriverName = string & {
    _custom?: any;
};
interface StorageMounts {
    [path: string]: {
        driver: BuiltinDriverName | CustomDriverName;
        [option: string]: any;
    };
}
type DeepPartial<T> = T extends Record<string, any> ? {
    [P in keyof T]?: DeepPartial<T[P]> | T[P];
} : T;
type NitroPreset = NitroConfig | (() => NitroConfig);
interface NitroConfig extends DeepPartial<Omit<NitroOptions, "routeRules" | "rollupConfig">> {
    extends?: string | string[] | NitroPreset;
    routeRules?: {
        [path: string]: NitroRouteConfig;
    };
    rollupConfig?: Partial<RollupConfig>;
}
interface AppConfig {
    [key: string]: any;
}
interface PublicAssetDir {
    baseURL?: string;
    fallthrough?: boolean;
    maxAge: number;
    dir: string;
}
interface ServerAssetDir {
    baseName: string;
    dir: string;
}
interface DevServerOptions {
    watch: string[];
}
interface CompressOptions {
    gzip?: boolean;
    brotli?: boolean;
}
type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc["length"]]>;
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
type HTTPStatusCode = IntRange<100, 600>;
type ExcludeFunctions<G extends Record<string, any>> = Pick<G, {
    [P in keyof G]: NonNullable<G[P]> extends Function ? never : P;
}[keyof G]>;
interface NitroRouteConfig {
    cache?: ExcludeFunctions<CachedEventHandlerOptions> | false;
    headers?: Record<string, string>;
    redirect?: string | {
        to: string;
        statusCode?: HTTPStatusCode;
    };
    prerender?: boolean;
    proxy?: string | ({
        to: string;
    } & ProxyOptions);
    isr?: number | boolean;
    cors?: boolean;
    swr?: boolean | number;
    static?: boolean | number;
}
interface NitroRouteRules extends Omit<NitroRouteConfig, "redirect" | "cors" | "swr" | "static"> {
    redirect?: {
        to: string;
        statusCode: HTTPStatusCode;
    };
    proxy?: {
        to: string;
    } & ProxyOptions;
}
interface WasmOptions {
    /**
     * Direct import the wasm file instead of bundling, required in Cloudflare Workers
     *
     * @default false
     */
    esmImport?: boolean;
    /**
     * Options for `@rollup/plugin-wasm`, only used when `esmImport` is `false`
     */
    rollup?: RollupWasmOptions;
}
interface NitroFrameworkInfo {
    name?: "nitro" | (string & {});
    version?: string;
}
/** Build info written to `.output/nitro.json` or `.nitro/dev/nitro.json` */
interface NitroBuildInfo {
    date: string;
    preset: string;
    framework: NitroFrameworkInfo;
    versions: {
        nitro: string;
        [key: string]: string;
    };
    commands?: {
        preview?: string;
        deploy?: string;
    };
    dev?: {
        pid: number;
        workerAddress: {
            host: string;
            port: number;
        } | {
            socketPath: string;
        };
    };
}
interface NitroOptions extends PresetOptions {
    _config: NitroConfig;
    _c12: ResolvedConfig<NitroConfig> | ConfigWatcher<NitroConfig>;
    debug: boolean;
    preset: KebabCase<keyof typeof _PRESETS> | (string & {});
    static: boolean;
    logLevel: LogLevel;
    runtimeConfig: NitroRuntimeConfig;
    appConfig: AppConfig;
    appConfigFiles: string[];
    workspaceDir: string;
    rootDir: string;
    srcDir: string;
    scanDirs: string[];
    buildDir: string;
    output: {
        dir: string;
        serverDir: string;
        publicDir: string;
    };
    storage: StorageMounts;
    devStorage: StorageMounts;
    bundledStorage: string[];
    timing: boolean;
    renderer?: string;
    serveStatic: boolean | "node" | "deno" | "inline";
    noPublicDir: boolean;
    /** @experimental Requires `experimental.wasm` to be effective */
    wasm?: WasmOptions;
    experimental?: {
        legacyExternals?: boolean;
        openAPI?: boolean;
        /**
         * See https://github.com/microsoft/TypeScript/pull/51669
         */
        typescriptBundlerResolution?: boolean;
        /**
         * Enable native async context support for useEvent()
         */
        asyncContext?: boolean;
        /**
         * Enable Experimental WebAssembly Support
         */
        wasm?: boolean;
        /**
         * Disable Experimental bundling of Nitro Runtime Dependencies
         */
        bundleRuntimeDependencies?: false;
        /**
         * Disable Experimental Sourcemap Minification
         */
        sourcemapMinify?: false;
        /**
         * Backward compatibility support for Node fetch (required for Node < 18)
         */
        nodeFetchCompat?: boolean;
    };
    future: {
        nativeSWR: boolean;
    };
    serverAssets: ServerAssetDir[];
    publicAssets: PublicAssetDir[];
    imports: UnimportPluginOptions | false;
    modules?: NitroModuleInput[];
    plugins: string[];
    virtual: Record<string, string | (() => string | Promise<string>)>;
    compressPublicAssets: boolean | CompressOptions;
    ignore: string[];
    dev: boolean;
    devServer: DevServerOptions;
    watchOptions: WatchOptions;
    devProxy: Record<string, string | ProxyServerOptions>;
    logging: {
        compressedSizes: boolean;
    };
    baseURL: string;
    handlers: NitroEventHandler[];
    routeRules: {
        [path: string]: NitroRouteRules;
    };
    devHandlers: NitroDevEventHandler[];
    errorHandler: string;
    devErrorHandler: NitroErrorHandler;
    prerender: {
        /**
         * Prerender HTML routes within subfolders (`/test` would produce `/test/index.html`)
         */
        autoSubfolderIndex: boolean;
        concurrency: number;
        interval: number;
        crawlLinks: boolean;
        failOnError: boolean;
        ignore: string[];
        routes: string[];
        /**
         * Amount of retries. Pass Infinity to retry indefinitely.
         * @default 3
         */
        retry: number;
        /**
         * Delay between each retry in ms.
         * @default 500
         */
        retryDelay: number;
    };
    rollupConfig?: RollupConfig;
    entry: string;
    unenv: Preset;
    alias: Record<string, string>;
    minify: boolean;
    inlineDynamicImports: boolean;
    sourceMap: boolean | "inline" | "hidden";
    node: boolean;
    moduleSideEffects: string[];
    esbuild?: {
        options?: Partial<Options>;
    };
    noExternals: boolean;
    externals: NodeExternalsOptions;
    analyze: false | PluginVisualizerOptions;
    replace: Record<string, string | ((id: string) => string)>;
    commonJS?: RollupCommonJSOptions;
    exportConditions?: string[];
    typescript: {
        strict?: boolean;
        internalPaths?: boolean;
        generateTsConfig?: boolean;
        /** the path of the generated `tsconfig.json`, relative to buildDir */
        tsconfigPath: string;
        tsConfig?: Partial<TSConfig>;
    };
    hooks: NestedHooks<NitroHooks>;
    nodeModulesDirs: string[];
    commands: {
        preview: string;
        deploy: string;
    };
    framework: NitroFrameworkInfo;
    iis?: {
        mergeConfig?: boolean;
        overrideConfig?: boolean;
    };
}
declare global {
    const defineNitroConfig: (config: NitroConfig) => NitroConfig;
    const defineNitroModule: (definition: NitroModule) => NitroModule;
}

interface NitroStaticBuildFlags {
    _asyncContext?: boolean;
    dev?: boolean;
    client?: boolean;
    nitro?: boolean;
    prerender?: boolean;
    preset?: NitroOptions["preset"];
    server?: boolean;
    versions?: {
        nitro?: string;
    };
}
declare global {
    namespace NodeJS {
        interface Process extends NitroStaticBuildFlags {
        }
    }
    interface ImportMeta extends NitroStaticBuildFlags {
    }
}

type H3EventFetch = (request: NitroFetchRequest, init?: RequestInit) => Promise<Response>;
type H3Event$Fetch = $Fetch<unknown, NitroFetchRequest>;
declare module "h3" {
    interface H3Event {
        /** @experimental Calls fetch with same context and request headers */
        fetch: H3EventFetch;
        /** @experimental Calls fetch with same context and request headers */
        $fetch: H3Event$Fetch;
        /** @experimental See https://github.com/unjs/nitro/issues/1420 */
        waitUntil: (promise: Promise<unknown>) => void;
        /** @experimental */
        captureError: CaptureError;
    }
    interface H3Context {
        nitro: {
            _waitUntilPromises?: Promise<unknown>[];
            /** @experimental */
            errors: {
                error?: Error;
                context: CapturedErrorContext;
            }[];
        };
    }
}

export type { $Fetch as $, AvailableRouterMethod as A, CompressOptions as C, DevServerOptions as D, ExtractedRouteMethod as E, H3EventFetch as H, InternalApi as I, KebabCase as K, MiddlewareOf as M, NitroConfig as N, PrerenderRoute as P, StorageMounts as S, TypedInternalResponse as T, WasmOptions as W, Nitro as a, NitroOptions as b, NitroPreset as c, NitroFetchRequest as d, NitroFetchOptions as e, NitroStaticBuildFlags as f, H3Event$Fetch as g, NitroDynamicConfig as h, NitroRuntimeConfigApp as i, NitroRuntimeConfig as j, PrerenderGenerateRoute as k, NitroHooks as l, AppConfig as m, PublicAssetDir as n, ServerAssetDir as o, NitroRouteConfig as p, NitroRouteRules as q, NitroFrameworkInfo as r, NitroBuildInfo as s, NitroEventHandler as t, NitroDevEventHandler as u, NitroErrorHandler as v, MatchedRoutes as w, NitroModuleInput as x, NitroModule as y };
