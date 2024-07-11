import { Router, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { a as DataLoader } from './defineLoader-bde635fd.js';
export { D as DefineLoaderOptions, d as _defineLoader, s as _stopDataFetchingScope } from './defineLoader-bde635fd.js';
import { A as Awaitable } from './options-8dbadba3.js';
import 'vue';

declare const HasDataLoaderMeta: unique symbol;
declare module 'vue-router' {
    interface RouteMeta {
        /**
         * List of lazy imports of modules that might have a loader. We need to extract the exports that are actually
         * loaders.
         */
        [HasDataLoaderMeta]?: Array<() => Promise<Record<string, DataLoader<unknown> | unknown>>>;
    }
}
type NavigationResult = any;
interface SetupDataFetchingGuardOptions {
    /**
     * Initial data to skip the initial data loaders. This is useful for SSR and should be set only on client side.
     */
    initialData?: Record<string, unknown>;
    /**
     * Hook that is called before each data loader is called. Can return a promise to delay the data loader call.
     */
    beforeLoad?: (route: RouteLocationNormalized) => Promise<unknown>;
    /**
     * Called if any data loader returns a `NavigationResult` with an array of them. Should decide what is the outcome of
     * the data fetching guard. Note this isn't called if no data loaders return a `NavigationResult`.
     */
    selectNavigationResult?: (results: NavigationResult[]) => Awaitable<NavigationResult | undefined | void>;
}
declare function setupDataFetchingGuard(router: Router, { initialData }?: SetupDataFetchingGuardOptions): Record<string, unknown> | null | undefined;

/**
 * Defines properties of the route for the current page component.
 *
 * @param route - route information to be added to this page
 */
declare const _definePage: (route: DefinePage) => DefinePage;
/**
 * Merges route records.
 *
 * @internal
 *
 * @param main - main route record
 * @param routeRecords - route records to merge
 * @returns merged route record
 */
declare function _mergeRouteRecord(main: RouteRecordRaw, ...routeRecords: Partial<RouteRecordRaw>[]): RouteRecordRaw;
/**
 * Type to define a page. Can be augmented to add custom properties.
 */
interface DefinePage extends Partial<Omit<RouteRecordRaw, 'children' | 'components' | 'component'>> {
}

export { DataLoader, DefinePage, HasDataLoaderMeta as _HasDataLoaderMeta, _definePage, _mergeRouteRecord, setupDataFetchingGuard as _setupDataFetchingGuard };
