import { QueryCache as QueryCache$1, MutationCache as MutationCache$1, QueryClient as QueryClient$1, QueryObserver, QueriesObserver, InfiniteQueryObserver, MutationObserver } from 'react-query/core';
export { InfiniteQueryObserver, MutationObserver, QueriesObserver, QueryObserver, dehydrate, focusManager, hydrate, setLogger } from 'react-query/core';
import { toRefs, reactive, isRef, unref, getCurrentInstance, inject, provide, onScopeDispose, isVue2, watch, readonly, isReactive, watchEffect, ref } from 'vue-demi';
import { matchSorter } from 'match-sorter';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var VUE_QUERY_CLIENT = "VUE_QUERY_CLIENT";
function getClientKey(key) {
    var suffix = key ? ":".concat(key) : "";
    return "".concat(VUE_QUERY_CLIENT).concat(suffix);
}
function isQueryKey(value) {
    return typeof value === "string" || Array.isArray(value);
}
// This Function is Deprecated. It's not used internally anymore.
function parseQueryArgs(arg1, arg2, arg3) {
    if (arg2 === void 0) { arg2 = {}; }
    if (arg3 === void 0) { arg3 = {}; }
    var options;
    if (!isQueryKey(arg1)) {
        // `useQuery(optionsObj)`
        options = arg1;
    }
    else if (typeof arg2 === "function") {
        // `useQuery(queryKey, queryFn, optionsObj?)`
        options = __assign(__assign({}, toRefs(reactive(arg3))), { queryKey: arg1, queryFn: arg2 });
    }
    else {
        // `useQuery(queryKey, optionsObj?)`
        options = __assign(__assign({}, toRefs(reactive(arg2))), { queryKey: arg1 });
    }
    return reactive(options);
}
function parseFilterArgs(arg1, arg2) {
    if (isQueryKey(arg1)) {
        return Object.assign(arg2, { queryKey: arg1 });
    }
    return arg1 || {};
}
function parseMutationArgs(arg1, arg2, arg3) {
    if (arg2 === void 0) { arg2 = {}; }
    if (arg3 === void 0) { arg3 = {}; }
    if (isQueryKey(arg1)) {
        if (typeof arg2 === "function") {
            return Object.assign(arg3, {
                mutationKey: arg1,
                mutationFn: arg2,
            });
        }
        return Object.assign(arg2, { mutationKey: arg1 });
    }
    if (typeof arg1 === "function") {
        return Object.assign(arg2, { mutationFn: arg1 });
    }
    return arg1;
}
function parseMutationFilterArgs(arg1, arg2) {
    if (isQueryKey(arg1)) {
        return Object.assign(arg2, {
            mutationKey: arg1,
        });
    }
    return arg1;
}
function updateState(state, update) {
    Object.keys(state).forEach(function (key) {
        state[key] = update[key];
    });
}
function cloneDeep(value, customizer) {
    if (customizer) {
        var result = customizer(value);
        if (result !== undefined || isRef(value)) {
            return result;
        }
    }
    if (Array.isArray(value)) {
        return value.map(function (val) { return cloneDeep(val, customizer); });
    }
    if (typeof value === "object" && isPlainObject(value)) {
        var entries = Object.entries(value).map(function (_a) {
            var key = _a[0], val = _a[1];
            return [
                key,
                cloneDeep(val, customizer),
            ];
        });
        return Object.fromEntries(entries);
    }
    return value;
}
function cloneDeepUnref(obj) {
    return cloneDeep(obj, function (val) {
        if (isRef(val)) {
            return cloneDeepUnref(unref(val));
        }
    });
}
function isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
    }
    var prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
}

function useQueryClient(id) {
    var _a;
    if (id === void 0) { id = ""; }
    var vm = (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy;
    if (!vm) {
        throw new Error("vue-query hooks can only be used inside setup() function.");
    }
    var key = getClientKey(id);
    var queryClient = inject(key);
    if (!queryClient) {
        throw new Error("No 'queryClient' found in Vue context, use 'VueQueryPlugin' to properly initialize the library.");
    }
    return queryClient;
}

var QueryCache = /** @class */ (function (_super) {
    __extends(QueryCache, _super);
    function QueryCache() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryCache.prototype.find = function (arg1, arg2) {
        var arg1Unreffed = cloneDeepUnref(arg1);
        var arg2Unreffed = cloneDeepUnref(arg2);
        return _super.prototype.find.call(this, arg1Unreffed, arg2Unreffed);
    };
    QueryCache.prototype.findAll = function (arg1, arg2) {
        var arg1Unreffed = cloneDeepUnref(arg1);
        var arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return _super.prototype.findAll.call(this, arg1Unreffed, arg2Unreffed);
        }
        return _super.prototype.findAll.call(this, arg1Unreffed);
    };
    return QueryCache;
}(QueryCache$1));

var MutationCache = /** @class */ (function (_super) {
    __extends(MutationCache, _super);
    function MutationCache() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MutationCache.prototype.find = function (filters) {
        return _super.prototype.find.call(this, cloneDeepUnref(filters));
    };
    MutationCache.prototype.findAll = function (filters) {
        return _super.prototype.findAll.call(this, cloneDeepUnref(filters));
    };
    return MutationCache;
}(MutationCache$1));

var QueryClient = /** @class */ (function (_super) {
    __extends(QueryClient, _super);
    function QueryClient(config) {
        if (config === void 0) { config = {}; }
        var unreffedConfig = cloneDeepUnref(config);
        var vueQueryConfig = {
            defaultOptions: cloneDeepUnref(unreffedConfig.defaultOptions),
            queryCache: unreffedConfig.queryCache || new QueryCache(),
            mutationCache: unreffedConfig.mutationCache || new MutationCache(),
        };
        return _super.call(this, vueQueryConfig) || this;
    }
    QueryClient.prototype.isFetching = function (arg1, arg2) {
        var arg1Unreffed = cloneDeepUnref(arg1);
        var arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return _super.prototype.isFetching.call(this, arg1Unreffed, arg2Unreffed);
        }
        return _super.prototype.isFetching.call(this, arg1Unreffed);
    };
    QueryClient.prototype.isMutating = function (filters) {
        return _super.prototype.isMutating.call(this, cloneDeepUnref(filters));
    };
    QueryClient.prototype.getQueryData = function (queryKey, filters) {
        return _super.prototype.getQueryData.call(this, cloneDeepUnref(queryKey), cloneDeepUnref(filters));
    };
    QueryClient.prototype.getQueriesData = function (queryKeyOrFilters) {
        var unreffed = cloneDeepUnref(queryKeyOrFilters);
        if (isQueryKey(unreffed)) {
            return _super.prototype.getQueriesData.call(this, unreffed);
        }
        return _super.prototype.getQueriesData.call(this, unreffed);
    };
    QueryClient.prototype.setQueryData = function (queryKey, updater, options) {
        return _super.prototype.setQueryData.call(this, cloneDeepUnref(queryKey), updater, cloneDeepUnref(options));
    };
    QueryClient.prototype.setQueriesData = function (queryKeyOrFilters, updater, options) {
        var arg1Unreffed = cloneDeepUnref(queryKeyOrFilters);
        var arg3Unreffed = cloneDeepUnref(options);
        if (isQueryKey(arg1Unreffed)) {
            return _super.prototype.setQueriesData.call(this, arg1Unreffed, updater, arg3Unreffed);
        }
        return _super.prototype.setQueriesData.call(this, arg1Unreffed, updater, arg3Unreffed);
    };
    QueryClient.prototype.getQueryState = function (queryKey, filters) {
        return _super.prototype.getQueryState.call(this, cloneDeepUnref(queryKey), cloneDeepUnref(filters));
    };
    QueryClient.prototype.removeQueries = function (arg1, arg2) {
        var arg1Unreffed = cloneDeepUnref(arg1);
        if (isQueryKey(arg1Unreffed)) {
            return _super.prototype.removeQueries.call(this, arg1Unreffed, cloneDeepUnref(arg2));
        }
        return _super.prototype.removeQueries.call(this, arg1Unreffed);
    };
    QueryClient.prototype.resetQueries = function (arg1, arg2, arg3) {
        var arg1Unreffed = cloneDeepUnref(arg1);
        var arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return _super.prototype.resetQueries.call(this, arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return _super.prototype.resetQueries.call(this, arg1Unreffed, arg2Unreffed);
    };
    QueryClient.prototype.cancelQueries = function (arg1, arg2, arg3) {
        var arg1Unreffed = cloneDeepUnref(arg1);
        var arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return _super.prototype.cancelQueries.call(this, arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return _super.prototype.cancelQueries.call(this, arg1Unreffed, arg2Unreffed);
    };
    QueryClient.prototype.invalidateQueries = function (arg1, arg2, arg3) {
        var arg1Unreffed = cloneDeepUnref(arg1);
        var arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return _super.prototype.invalidateQueries.call(this, arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return _super.prototype.invalidateQueries.call(this, arg1Unreffed, arg2Unreffed);
    };
    QueryClient.prototype.refetchQueries = function (arg1, arg2, arg3) {
        var arg1Unreffed = cloneDeepUnref(arg1);
        var arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return _super.prototype.refetchQueries.call(this, arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return _super.prototype.refetchQueries.call(this, arg1Unreffed, arg2Unreffed);
    };
    QueryClient.prototype.fetchQuery = function (arg1, arg2, arg3) {
        var arg1Unreffed = cloneDeepUnref(arg1);
        var arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return _super.prototype.fetchQuery.call(this, arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return _super.prototype.fetchQuery.call(this, arg1Unreffed);
    };
    QueryClient.prototype.prefetchQuery = function (arg1, arg2, arg3) {
        return _super.prototype.prefetchQuery.call(this, cloneDeepUnref(arg1), cloneDeepUnref(arg2), cloneDeepUnref(arg3));
    };
    QueryClient.prototype.fetchInfiniteQuery = function (arg1, arg2, arg3) {
        var arg1Unreffed = cloneDeepUnref(arg1);
        var arg2Unreffed = cloneDeepUnref(arg2);
        if (isQueryKey(arg1Unreffed)) {
            return _super.prototype.fetchInfiniteQuery.call(this, arg1Unreffed, arg2Unreffed, cloneDeepUnref(arg3));
        }
        return _super.prototype.fetchInfiniteQuery.call(this, arg1Unreffed);
    };
    QueryClient.prototype.prefetchInfiniteQuery = function (arg1, arg2, arg3) {
        return _super.prototype.prefetchInfiniteQuery.call(this, cloneDeepUnref(arg1), cloneDeepUnref(arg2), cloneDeepUnref(arg3));
    };
    QueryClient.prototype.setDefaultOptions = function (options) {
        _super.prototype.setDefaultOptions.call(this, cloneDeepUnref(options));
    };
    QueryClient.prototype.setQueryDefaults = function (queryKey, options) {
        _super.prototype.setQueryDefaults.call(this, cloneDeepUnref(queryKey), cloneDeepUnref(options));
    };
    QueryClient.prototype.getQueryDefaults = function (queryKey) {
        return _super.prototype.getQueryDefaults.call(this, cloneDeepUnref(queryKey));
    };
    QueryClient.prototype.setMutationDefaults = function (mutationKey, options) {
        _super.prototype.setMutationDefaults.call(this, cloneDeepUnref(mutationKey), cloneDeepUnref(options));
    };
    QueryClient.prototype.getMutationDefaults = function (mutationKey) {
        return _super.prototype.getMutationDefaults.call(this, cloneDeepUnref(mutationKey));
    };
    return QueryClient;
}(QueryClient$1));

function useQueryProvider(arg1, id) {
    if (arg1 === void 0) { arg1 = {}; }
    if (id === void 0) { id = ""; }
    var client = arg1 instanceof QueryClient ? arg1 : new QueryClient(arg1);
    client.mount();
    var key = getClientKey(id);
    provide(key, client);
    onScopeDispose(function () {
        client.unmount();
    });
}

function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
    // @ts-ignore
    return (typeof navigator !== 'undefined' && typeof window !== 'undefined')
        ? window
        : typeof global !== 'undefined'
            ? global
            : {};
}
const isProxyAvailable = typeof Proxy === 'function';

const HOOK_SETUP = 'devtools-plugin:setup';
const HOOK_PLUGIN_SETTINGS_SET = 'plugin:settings:set';

let supported;
let perf;
function isPerformanceSupported() {
    var _a;
    if (supported !== undefined) {
        return supported;
    }
    if (typeof window !== 'undefined' && window.performance) {
        supported = true;
        perf = window.performance;
    }
    else if (typeof global !== 'undefined' && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
        supported = true;
        perf = global.perf_hooks.performance;
    }
    else {
        supported = false;
    }
    return supported;
}
function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
}

class ApiProxy {
    constructor(plugin, hook) {
        this.target = null;
        this.targetQueue = [];
        this.onQueue = [];
        this.plugin = plugin;
        this.hook = hook;
        const defaultSettings = {};
        if (plugin.settings) {
            for (const id in plugin.settings) {
                const item = plugin.settings[id];
                defaultSettings[id] = item.defaultValue;
            }
        }
        const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
        let currentSettings = Object.assign({}, defaultSettings);
        try {
            const raw = localStorage.getItem(localSettingsSaveId);
            const data = JSON.parse(raw);
            Object.assign(currentSettings, data);
        }
        catch (e) {
            // noop
        }
        this.fallbacks = {
            getSettings() {
                return currentSettings;
            },
            setSettings(value) {
                try {
                    localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
                }
                catch (e) {
                    // noop
                }
                currentSettings = value;
            },
            now() {
                return now();
            },
        };
        if (hook) {
            hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
                if (pluginId === this.plugin.id) {
                    this.fallbacks.setSettings(value);
                }
            });
        }
        this.proxiedOn = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target.on[prop];
                }
                else {
                    return (...args) => {
                        this.onQueue.push({
                            method: prop,
                            args,
                        });
                    };
                }
            },
        });
        this.proxiedTarget = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target[prop];
                }
                else if (prop === 'on') {
                    return this.proxiedOn;
                }
                else if (Object.keys(this.fallbacks).includes(prop)) {
                    return (...args) => {
                        this.targetQueue.push({
                            method: prop,
                            args,
                            resolve: () => { },
                        });
                        return this.fallbacks[prop](...args);
                    };
                }
                else {
                    return (...args) => {
                        return new Promise(resolve => {
                            this.targetQueue.push({
                                method: prop,
                                args,
                                resolve,
                            });
                        });
                    };
                }
            },
        });
    }
    async setRealTarget(target) {
        this.target = target;
        for (const item of this.onQueue) {
            this.target.on[item.method](...item.args);
        }
        for (const item of this.targetQueue) {
            item.resolve(await this.target[item.method](...item.args));
        }
    }
}

function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
        hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    }
    else {
        const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
        const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
        list.push({
            pluginDescriptor: descriptor,
            setupFn,
            proxy,
        });
        if (proxy)
            setupFn(proxy.proxiedTarget);
    }
}

var QueryState;
(function (QueryState) {
    QueryState[QueryState["Fetching"] = 0] = "Fetching";
    QueryState[QueryState["Fresh"] = 1] = "Fresh";
    QueryState[QueryState["Stale"] = 2] = "Stale";
    QueryState[QueryState["Inactive"] = 3] = "Inactive";
})(QueryState || (QueryState = {}));
function getQueryState(query) {
    if (query.isFetching()) {
        return QueryState.Fetching;
    }
    if (!query.getObserversCount()) {
        return QueryState.Inactive;
    }
    if (query.isStale()) {
        return QueryState.Stale;
    }
    return QueryState.Fresh;
}
function getQueryStateLabel(query) {
    var queryState = getQueryState(query);
    if (queryState === QueryState.Fetching) {
        return "fetching";
    }
    if (queryState === QueryState.Stale) {
        return "stale";
    }
    if (queryState === QueryState.Inactive) {
        return "inactive";
    }
    return "fresh";
}
function getQueryStatusFg(query) {
    var queryState = getQueryState(query);
    if (queryState === QueryState.Stale) {
        return 0x000000;
    }
    return 0xffffff;
}
function getQueryStatusBg(query) {
    var queryState = getQueryState(query);
    if (queryState === QueryState.Fetching) {
        return 0x006bff;
    }
    if (queryState === QueryState.Stale) {
        return 0xffb200;
    }
    if (queryState === QueryState.Inactive) {
        return 0x3f4e60;
    }
    return 0x008327;
}
var queryHashSort = function (a, b) {
    return String(a.queryHash).localeCompare(b.queryHash);
};
var dateSort = function (a, b) {
    return a.state.dataUpdatedAt < b.state.dataUpdatedAt ? 1 : -1;
};
var statusAndDateSort = function (a, b) {
    if (getQueryState(a) === getQueryState(b)) {
        return dateSort(a, b);
    }
    return getQueryState(a) > getQueryState(b) ? 1 : -1;
};
var sortFns = {
    "Status > Last Updated": statusAndDateSort,
    "Query Hash": queryHashSort,
    "Last Updated": dateSort,
};

var pluginId = "vue-query";
var pluginName = "Vue Query";
function setupDevtools(app, queryClient) {
    setupDevtoolsPlugin({
        id: pluginId,
        label: pluginName,
        packageName: "vue-query",
        homepage: "https://github.com/DamianOsipiuk/vue-query",
        logo: "https://vue-query.vercel.app/vue-query.svg",
        app: app,
        settings: {
            baseSort: {
                type: "choice",
                component: "button-group",
                label: "Sort Cache Entries",
                options: [
                    {
                        label: "ASC",
                        value: 1,
                    },
                    {
                        label: "DESC",
                        value: -1,
                    },
                ],
                defaultValue: 1,
            },
            sortFn: {
                type: "choice",
                label: "Sort Function",
                options: Object.keys(sortFns).map(function (key) { return ({
                    label: key,
                    value: key,
                }); }),
                defaultValue: Object.keys(sortFns)[0],
            },
        },
    }, function (api) {
        var queryCache = queryClient.getQueryCache();
        api.addInspector({
            id: pluginId,
            label: pluginName,
            icon: "api",
            nodeActions: [
                {
                    icon: "cloud_download",
                    tooltip: "Refetch",
                    action: function (queryHash) {
                        var _a;
                        (_a = queryCache.get(queryHash)) === null || _a === void 0 ? void 0 : _a.fetch();
                    },
                },
                {
                    icon: "alarm",
                    tooltip: "Invalidate",
                    action: function (queryHash) {
                        var query = queryCache.get(queryHash);
                        queryClient.invalidateQueries(query.queryKey);
                    },
                },
                {
                    icon: "settings_backup_restore",
                    tooltip: "Reset",
                    action: function (queryHash) {
                        var _a;
                        (_a = queryCache.get(queryHash)) === null || _a === void 0 ? void 0 : _a.reset();
                    },
                },
                {
                    icon: "delete",
                    tooltip: "Remove",
                    action: function (queryHash) {
                        var query = queryCache.get(queryHash);
                        queryCache.remove(query);
                    },
                },
            ],
        });
        api.addTimelineLayer({
            id: pluginId,
            label: pluginName,
            color: 0xffd94c,
        });
        queryCache.subscribe(function (event) {
            api.sendInspectorTree(pluginId);
            api.sendInspectorState(pluginId);
            if (event &&
                ["queryAdded", "queryRemoved", "queryUpdated"].includes(event.type)) {
                api.addTimelineEvent({
                    layerId: pluginId,
                    event: {
                        title: event.type,
                        subtitle: event.query.queryHash,
                        time: api.now(),
                        data: __assign({ queryHash: event.query.queryHash }, event),
                    },
                });
            }
        });
        api.on.getInspectorTree(function (payload) {
            if (payload.inspectorId === pluginId) {
                var queries = queryCache.getAll();
                var settings_1 = api.getSettings();
                var filtered = matchSorter(queries, payload.filter, {
                    keys: ["queryHash"],
                    baseSort: function (a, b) {
                        return sortFns[settings_1.sortFn](a.item, b.item) * settings_1.baseSort;
                    },
                });
                var nodes = filtered.map(function (query) {
                    var stateLabel = getQueryStateLabel(query);
                    return {
                        id: query.queryHash,
                        label: query.queryHash,
                        tags: [
                            {
                                label: "".concat(stateLabel, " [").concat(query.getObserversCount(), "]"),
                                textColor: getQueryStatusFg(query),
                                backgroundColor: getQueryStatusBg(query),
                            },
                        ],
                    };
                });
                payload.rootNodes = nodes;
            }
        });
        api.on.getInspectorState(function (payload) {
            if (payload.inspectorId === pluginId) {
                var query = queryCache.get(payload.nodeId);
                if (!query) {
                    return;
                }
                payload.state = {
                    " Query Details": [
                        {
                            key: "Query key",
                            value: query.queryHash,
                        },
                        {
                            key: "Query status",
                            value: getQueryStateLabel(query),
                        },
                        {
                            key: "Observers",
                            value: query.getObserversCount(),
                        },
                        {
                            key: "Last Updated",
                            value: new Date(query.state.dataUpdatedAt).toLocaleTimeString(),
                        },
                    ],
                    "Data Explorer": [
                        {
                            key: "Data",
                            value: query.state.data,
                        },
                    ],
                    "Query Explorer": [
                        {
                            key: "Query",
                            value: query,
                        },
                    ],
                };
            }
        });
    });
}

var VueQueryPlugin = {
    install: function (app, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var clientKey = getClientKey(options.queryClientKey);
        var client;
        if ("queryClient" in options && options.queryClient) {
            client = options.queryClient;
        }
        else {
            if (options.contextSharing && typeof window !== "undefined") {
                if (!window.__VUE_QUERY_CONTEXT__) {
                    var clientConfig = "queryClientConfig" in options
                        ? options.queryClientConfig
                        : undefined;
                    client = new QueryClient(clientConfig);
                    window.__VUE_QUERY_CONTEXT__ = client;
                }
                else {
                    client = window.__VUE_QUERY_CONTEXT__;
                }
            }
            else {
                var clientConfig = "queryClientConfig" in options
                    ? options.queryClientConfig
                    : undefined;
                client = new QueryClient(clientConfig);
            }
        }
        client.mount();
        var cleanup = function () {
            var _a;
            client.unmount();
            (_a = options.additionalClients) === null || _a === void 0 ? void 0 : _a.forEach(function (additionalClient) {
                additionalClient.queryClient.unmount();
            });
        };
        if (app.onUnmount) {
            app.onUnmount(cleanup);
        }
        else {
            var originalUnmount_1 = app.unmount;
            app.unmount = function vueQueryUnmount() {
                cleanup();
                originalUnmount_1();
            };
        }
        /* istanbul ignore next */
        if (isVue2) {
            app.mixin({
                beforeCreate: function () {
                    var _this = this;
                    var _a;
                    // HACK: taken from provide(): https://github.com/vuejs/composition-api/blob/master/src/apis/inject.ts#L30
                    if (!this._provided) {
                        var provideCache_1 = {};
                        Object.defineProperty(this, "_provided", {
                            get: function () { return provideCache_1; },
                            set: function (v) { return Object.assign(provideCache_1, v); },
                        });
                    }
                    this._provided[clientKey] = client;
                    (_a = options.additionalClients) === null || _a === void 0 ? void 0 : _a.forEach(function (additionalClient) {
                        var key = getClientKey(additionalClient.queryClientKey);
                        _this._provided[key] = additionalClient.queryClient;
                        additionalClient.queryClient.mount();
                    });
                    if (process.env.NODE_ENV === "development") {
                        if (this === this.$root) {
                            setupDevtools(this, client);
                        }
                    }
                },
            });
        }
        else {
            app.provide(clientKey, client);
            (_a = options.additionalClients) === null || _a === void 0 ? void 0 : _a.forEach(function (additionalClient) {
                var key = getClientKey(additionalClient.queryClientKey);
                app.provide(key, additionalClient.queryClient);
                additionalClient.queryClient.mount();
            });
            if (process.env.NODE_ENV === "development") {
                setupDevtools(app, client);
            }
        }
    },
};

function useBaseQuery(Observer, arg1, arg2, arg3) {
    if (arg2 === void 0) { arg2 = {}; }
    if (arg3 === void 0) { arg3 = {}; }
    var options = getQueryUnreffedOptions();
    var queryClient = useQueryClient(options.queryClientKey);
    var defaultedOptions = queryClient.defaultQueryObserverOptions(options);
    var observer = new Observer(queryClient, defaultedOptions);
    var state = reactive(observer.getCurrentResult());
    var unsubscribe = observer.subscribe(function (result) {
        updateState(state, result);
    });
    watch([function () { return arg1; }, function () { return arg2; }, function () { return arg3; }], function () {
        observer.setOptions(queryClient.defaultQueryObserverOptions(getQueryUnreffedOptions()));
    }, { deep: true });
    onScopeDispose(function () {
        unsubscribe();
    });
    return __assign(__assign({}, toRefs(readonly(state))), { suspense: function () { return observer.fetchOptimistic(defaultedOptions); } });
    /**
     * Get Query Options object
     * All inner refs unwrapped. No Reactivity
     */
    function getQueryUnreffedOptions() {
        var options;
        if (!isQueryKey(arg1)) {
            // `useQuery(optionsObj)`
            options = arg1;
        }
        else if (typeof arg2 === "function") {
            // `useQuery(queryKey, queryFn, optionsObj?)`
            options = __assign(__assign({}, arg3), { queryKey: arg1, queryFn: arg2 });
        }
        else {
            // `useQuery(queryKey, optionsObj?)`
            options = __assign(__assign({}, arg2), { queryKey: arg1 });
        }
        return cloneDeepUnref(options);
    }
}

function useQuery(arg1, arg2, arg3) {
    return useBaseQuery(QueryObserver, arg1, arg2, arg3);
}

function useQueries(queries) {
    var _a;
    var unreffedQueries = cloneDeepUnref(queries);
    var queryClientKey = (_a = unreffedQueries[0]) === null || _a === void 0 ? void 0 : _a.queryClientKey;
    var queryClient = useQueryClient(queryClientKey);
    var defaultedQueries = unreffedQueries.map(function (options) {
        return queryClient.defaultQueryObserverOptions(options);
    });
    var observer = new QueriesObserver(queryClient, defaultedQueries);
    var state = reactive(observer.getCurrentResult());
    var unsubscribe = observer.subscribe(function (result) {
        state.splice.apply(state, __spreadArray([0, state.length], result, false));
    });
    if (isRef(queries) || isReactive(queries)) {
        watch(queries, function () {
            var defaulted = cloneDeepUnref(queries).map(function (options) {
                return queryClient.defaultQueryObserverOptions(options);
            });
            observer.setQueries(defaulted);
        });
    }
    onScopeDispose(function () {
        unsubscribe();
    });
    return readonly(state);
}

function useInfiniteQuery(arg1, arg2, arg3) {
    return useBaseQuery(InfiniteQueryObserver, arg1, arg2, arg3);
}

function useMutation(arg1, arg2, arg3) {
    var options = parseMutationArgs(arg1, arg2, arg3);
    var queryClient = useQueryClient(options.queryClientKey);
    var observer = new MutationObserver(queryClient, options);
    var state = reactive(observer.getCurrentResult());
    var unsubscribe = observer.subscribe(function () {
        updateState(state, observer.getCurrentResult());
    });
    var mutate = function (variables, mutateOptions) {
        observer.mutate(variables, mutateOptions).catch(function () {
            // This is intentional
        });
    };
    watchEffect(function () {
        observer.setOptions(options);
    });
    onScopeDispose(function () {
        unsubscribe();
    });
    var resultRefs = toRefs(readonly(state));
    return __assign(__assign({}, resultRefs), { mutate: mutate, mutateAsync: state.mutate });
}

function useIsFetching(arg1, arg2) {
    var filters = ref({});
    var parsedFilters = parseFilterArgs(arg1, arg2);
    filters.value = parsedFilters;
    var queryClient = useQueryClient(parsedFilters.queryClientKey);
    var isFetching = ref(queryClient.isFetching(filters.value));
    var unsubscribe = queryClient.getQueryCache().subscribe(function () {
        isFetching.value = queryClient.isFetching(filters.value);
    });
    watchEffect(function () {
        var parsedFiltersUpdate = parseFilterArgs(arg1, arg2);
        filters.value = parsedFiltersUpdate;
    });
    onScopeDispose(function () {
        unsubscribe();
    });
    return isFetching;
}

function useIsMutating(arg1, arg2) {
    var filters = parseMutationFilterArgs(arg1, arg2);
    var queryClient = useQueryClient(filters === null || filters === void 0 ? void 0 : filters.queryClientKey);
    var isMutating = ref(queryClient.isMutating(filters));
    var unsubscribe = queryClient.getMutationCache().subscribe(function () {
        isMutating.value = queryClient.isMutating(filters);
    });
    onScopeDispose(function () {
        unsubscribe();
    });
    return isMutating;
}

export { MutationCache, QueryCache, QueryClient, VUE_QUERY_CLIENT, VueQueryPlugin, parseFilterArgs, parseMutationArgs, parseMutationFilterArgs, parseQueryArgs, useInfiniteQuery, useIsFetching, useIsMutating, useMutation, useQueries, useQuery, useQueryClient, useQueryProvider };
//# sourceMappingURL=index.js.map
