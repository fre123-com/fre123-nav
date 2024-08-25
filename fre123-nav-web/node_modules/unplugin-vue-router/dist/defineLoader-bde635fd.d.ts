import { RouteParams, LocationQuery, RouteRecordName, RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { Ref, UnwrapRef } from 'vue';

/**
 * `DataLoaderEntry` groups all of the properties that can be relied on by the data fetching guard. Any extended loader
 * should implement this interface. Each loaders has their own set of entries attached to an app instance.
 */
interface DataLoaderEntry<T = unknown, isLazy = boolean> {
    /**
     * When was the data loaded in ms (Date.now()).
     * @internal
     */
    when: number;
    /**
     * Location's params that were used to load the data.
     */
    params: Partial<RouteParams>;
    /**
     * Location's query that was used to load the data.
     */
    query: Partial<LocationQuery>;
    /**
     * Location's hash that was used to load the data.
     */
    hash: string | null;
    /**
     * Other data loaders that depend on this one. This is used to invalidate the data when a dependency is invalidated.
     */
    children: Set<DataLoaderEntry>;
    /**
     * Whether there is an ongoing request.
     */
    pending: Ref<boolean>;
    /**
     * Error if there was an error.
     */
    error: Ref<any>;
    /**
     * Is the entry ready with data. This is set to `true` the first time the entry is updated with data.
     */
    isReady: boolean;
    /**
     * Data stored in the entry.
     */
    data: false extends isLazy ? Ref<UnwrapRef<T>> : Ref<UnwrapRef<T> | undefined>;
}
/**
 * Stop and invalidate the scope used for data. Note this will make any application stop working. It should be used only
 * if there is a need to manually stop a running application without stopping the process.
 */
declare function stopScope(): void;

interface DefineLoaderOptions<isLazy extends boolean = boolean> {
    /**
     * How long should we wait to consider the fetched data expired. Amount in ms. Defaults to 5 minutes. A value of 0
     * means no cache while a value of `Infinity` means cache forever.
     */
    cacheTime?: number;
    /**
     * Whether the data should be lazy loaded without blocking the navigation or not. Defaults to false. When set to true
     * or a function, the loader will no longer block the navigation and the returned composable can be called even
     * without having the data ready. This also means that the data will be available as one single `ref()` named `data`
     * instead of all the individual properties returned by the loader.
     */
    lazy?: isLazy;
    /**
     * SSR Key to store the data in an object that can be serialized later to the HTML page.
     */
    key?: string;
}
/**
 * Loader function that can be passed to `defineLoader()`.
 */
interface DefineLoaderFn<T> {
    (route: RouteLocationNormalizedLoaded): T extends Promise<any> ? T : Promise<T>;
}
/**
 * Creates a data loader composables that can be exported by pages to attach the data loading to a route. This returns a
 * composable that can be used in any component.
 *
 * @experimental
 * Still under development and subject to change. See https://github.com/vuejs/rfcs/discussions/460
 *
 * @param name - optional name of the route to narrow down the type of the `to` argument
 * @param loader - loader function that returns the data to be loaded
 * @param options - options to configure the loader
 */
declare function defineLoader<P extends Promise<any>, isLazy extends boolean = false>(name: RouteRecordName, loader: DefineLoaderFn<P>, options?: DefineLoaderOptions<isLazy>): DataLoader<Awaited<P>, isLazy>;
/**
 * Creates a data loader composables that can be exported by pages to attach the data loading to a route. This returns a
 * composable that can be used in any component.
 *
 * @experimental
 * Still under development and subject to change. See https://github.com/vuejs/rfcs/discussions/460
 *
 * @param loader - loader function that returns the data to be loaded
 * @param options - options to configure the loader
 */
declare function defineLoader<P extends Promise<any>, isLazy extends boolean = false>(loader: DefineLoaderFn<P>, options?: DefineLoaderOptions<isLazy>): DataLoader<Awaited<P>, isLazy>;
type _PromiseMerged<T> = T & Promise<T>;
declare const IsLoader: unique symbol;
/**
 * Composable returned by `defineDataLoader()`.
 */
interface DataLoader<T, isLazy extends boolean = boolean> {
    (): _PromiseMerged<_DataLoaderResult<T, isLazy>>;
    [IsLoader]: true;
    /**
     * Internal context for the loader.
     * @internal
     */
    _: _DataLoaderInternals<T>;
}
/**
 * Holds internal state of a loader. Used by the data fetching navigation guard.
 *
 * @internal
 */
interface _DataLoaderInternals<T> {
    /**
     * Loads the data from the cache if possible, otherwise loads it from the loader and awaits it.
     */
    load: (route: RouteLocationNormalizedLoaded, router: Router, parent?: DataLoaderEntry, initialRootData?: Record<string, unknown>) => Promise<void>;
    /**
     * The data loaded by the loader associated with the router instance. As one router instance can only be used for one
     * app, it ensures the cache is not shared among requests.
     */
    entries: WeakMap<Router, DataLoaderEntry<T>>;
    /**
     * Resolved options for the loader.
     */
    options: Required<DefineLoaderOptions>;
}
/**
 * Return value of a loader composable defined with `defineDataLoader()`.
 */
interface _DataLoaderResult<T = unknown, isLazy = boolean> {
    /**
     * Whether there is an ongoing request.
     */
    pending: Ref<boolean>;
    /**
     * Error if there was an error.
     */
    error: Ref<any>;
    /**
     * Refresh the data. Returns a promise that resolves when the data is refreshed.
     */
    refresh: () => Promise<void>;
    /**
     * Invalidates the data so it is reloaded on the next request.
     */
    invalidate: () => void;
    /**
     * Get the promise of the current loader if there is one, returns a falsy value otherwise.
     */
    pendingLoad: () => Promise<void> | undefined | null;
    /**
     * Data returned by the loader. If the data loader is lazy, it will be undefined until the first load.
     */
    data: false extends isLazy ? Ref<UnwrapRef<T>> : Ref<UnwrapRef<T> | undefined>;
}

export { DefineLoaderOptions as D, DataLoader as a, defineLoader as d, stopScope as s };
