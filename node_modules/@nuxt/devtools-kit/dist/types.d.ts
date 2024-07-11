import { V as VueInspectorData, a as VueInspectorClient, H as HookInfo, P as PluginMetric, L as LoadingTimeMetric, b as ServerFunctions, C as ClientFunctions } from './shared/devtools-kit.54b1e285.js';
export { a2 as AnalyzeBuildMeta, a3 as AnalyzeBuildsInfo, Q as AssetEntry, O as AssetInfo, K as AssetType, A as AutoImportsWithMetadata, B as BasicModuleInfo, k as CategorizedTabs, $ as ClientUpdateEvent, U as CodeSnippet, E as CompatibilityStatus, W as ComponentRelationship, X as ComponentWithRelationships, _ as GetWizardArgs, J as GitHubContributor, I as ImageMeta, a1 as InstallModuleReturn, x as InstalledModuleInfo, G as MaintainerInfo, i as ModuleBuiltinTab, z as ModuleCompatibility, M as ModuleCustomTab, a5 as ModuleGlobalOptions, h as ModuleIframeTabLazyOptions, d as ModuleIframeView, f as ModuleLaunchAction, c as ModuleLaunchView, a4 as ModuleOptions, y as ModuleStaticInfo, D as ModuleStats, j as ModuleTabInfo, F as ModuleType, e as ModuleVNodeView, g as ModuleView, r as NpmCommandOptions, q as NpmCommandType, a8 as NuxtDevToolsOptions, N as NuxtDevtoolsInfo, a0 as NuxtDevtoolsServerContext, p as PackageManagerName, o as PackageUpdateInfo, v as Payload, w as PluginInfoWithMetic, R as RouteInfo, s as ServerRouteInfo, u as ServerRouteInput, t as ServerRouteInputType, S as SubprocessOptions, a9 as TabCategory, m as TerminalAction, l as TerminalBase, n as TerminalInfo, T as TerminalState, a6 as VSCodeIntegrationOptions, a7 as VSCodeTunnelOptions, Z as WizardActions, Y as WizardFunctions } from './shared/devtools-kit.54b1e285.js';
import { Ref } from 'vue';
import { AppConfig } from 'nuxt/schema';
import { NuxtApp } from 'nuxt/app';
import { Hookable } from 'hookable';
import { BirpcReturn } from 'birpc';
import { BuiltinLanguage } from 'shikiji';
import { $Fetch } from 'ofetch';
import { StackFrame } from 'error-stack-parser-es';
import 'nitropack';
import 'unstorage';
import 'vite-plugin-vue-inspector';
import 'unimport';
import 'vue-router';
import 'execa';
import '@nuxt/schema';

interface TimelineEventFunction {
    type: 'function';
    start: number;
    end?: number;
    name: string;
    args?: any[];
    result?: any;
    stacktrace?: StackFrame[];
    isPromise?: boolean;
}
interface TimelineServerState {
    timeSsrStart?: number;
}
interface TimelineEventRoute {
    type: 'route';
    start: number;
    end?: number;
    from: string;
    to: string;
}
interface TimelineOptions {
    enabled: boolean;
    stacktrace: boolean;
    arguments: boolean;
}
type TimelineEvent = TimelineEventFunction | TimelineEventRoute;
interface TimelineMetrics {
    events: TimelineEvent[];
    nonLiteralSymbol: symbol;
    options: TimelineOptions;
}
interface TimelineEventNormalized<T> {
    event: T;
    segment: TimelineEventsSegment;
    relativeStart: number;
    relativeWidth: number;
    layer: number;
}
interface TimelineEventsSegment {
    start: number;
    end: number;
    events: TimelineEvent[];
    functions: TimelineEventNormalized<TimelineEventFunction>[];
    route?: TimelineEventNormalized<TimelineEventRoute>;
    duration: number;
    previousGap?: number;
}

interface DevToolsFrameState {
    width: number;
    height: number;
    top: number;
    left: number;
    open: boolean;
    route: string;
    position: 'left' | 'right' | 'bottom' | 'top';
    closeOnOutsideClick: boolean;
    minimizePanelInactive: number;
}
interface NuxtDevtoolsClientHooks {
    /**
     * When the DevTools navigates, used for persisting the current tab
     */
    'devtools:navigate': (path: string) => void;
    /**
     * Event emitted when the component inspector is updated
     */
    'host:inspector:update': (data: VueInspectorData) => void;
    /**
     * Event emitted when the component inspector is clicked
     */
    'host:inspector:click': (baseUrl: string, file: string, line: number, column: number) => void;
    /**
     * Event to close the component inspector
     */
    'host:inspector:close': () => void;
    /**
     * Triggers reactivity manually, since Vue won't be reactive across frames)
     */
    'host:update:reactivity': () => void;
    /**
     * Host action to control the DevTools navigation
     */
    'host:action:navigate': (path: string) => void;
    /**
     * Host action to reload the DevTools
     */
    'host:action:reload': () => void;
}
/**
 * Host client from the App
 */
interface NuxtDevtoolsHostClient {
    nuxt: NuxtApp;
    hooks: Hookable<NuxtDevtoolsClientHooks>;
    getIframe(): HTMLIFrameElement | undefined;
    inspector?: {
        instance?: VueInspectorClient;
        enable: () => void;
        disable: () => void;
        toggle: () => void;
        isEnabled: Ref<boolean>;
    };
    devtools: {
        close(): void;
        open(): void;
        toggle(): void;
        reload(): void;
        navigate(path: string): void;
        /**
         * Popup the DevTools frame into Picture-in-Picture mode
         *
         * Requires Chrome 111 with experimental flag enabled.
         *
         * Function is undefined when not supported.
         *
         * @see https://developer.chrome.com/docs/web-platform/document-picture-in-picture/
         */
        popup?(): any;
    };
    app: {
        reload(): void;
        navigate(path: string, hard?: boolean): void;
        appConfig: AppConfig;
        colorMode: Ref<'dark' | 'light'>;
        frameState: Ref<DevToolsFrameState>;
        $fetch: $Fetch;
    };
    metrics: {
        clientHooks(): HookInfo[];
        clientPlugins(): PluginMetric[] | undefined;
        clientTimeline(): TimelineMetrics | undefined;
        loading(): LoadingTimeMetric;
    };
    /**
     * Update client
     * @internal
     */
    syncClient(): NuxtDevtoolsHostClient;
}
interface NuxtDevtoolsClient {
    rpc: BirpcReturn<ServerFunctions, ClientFunctions>;
    renderCodeHighlight: (code: string, lang?: BuiltinLanguage) => {
        code: string;
        supported: boolean;
    };
    renderMarkdown: (markdown: string) => string;
    colorMode: string;
    extendClientRpc: <ServerFunctions = Record<string, never>, ClientFunctions = Record<string, never>>(name: string, functions: ClientFunctions) => BirpcReturn<ServerFunctions, ClientFunctions>;
}
interface NuxtDevtoolsIframeClient {
    host: NuxtDevtoolsHostClient;
    devtools: NuxtDevtoolsClient;
}
interface NuxtDevtoolsGlobal {
    setClient(client: NuxtDevtoolsHostClient): void;
}

export { ClientFunctions, type DevToolsFrameState, HookInfo, LoadingTimeMetric, type NuxtDevtoolsClient, type NuxtDevtoolsClientHooks, type NuxtDevtoolsGlobal, type NuxtDevtoolsHostClient, type NuxtDevtoolsIframeClient, PluginMetric, ServerFunctions, type TimelineEvent, type TimelineEventFunction, type TimelineEventNormalized, type TimelineEventRoute, type TimelineEventsSegment, type TimelineMetrics, type TimelineOptions, type TimelineServerState, VueInspectorClient, VueInspectorData };
