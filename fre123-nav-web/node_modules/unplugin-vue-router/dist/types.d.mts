import { L as LiteralStringUnion } from './options-8dbadba3.js';
export { O as Options, T as TreeNode, d as TreeNodeValueParam, e as TreeNodeValueStatic } from './options-8dbadba3.js';
import { RouteParamsRaw, RouteParams, RouteMeta, RouteLocationNormalized, RouteRecordName, RouteLocationNormalizedLoaded, RouteQueryAndHash, RouteLocationOptions, RouteLocation, NavigationGuardNext, NavigationFailure, Router, RouterLinkProps, RouteLocationRaw } from 'vue-router';
import { Ref, AllowedComponentProps, ComponentCustomProps, VNodeProps, UnwrapRef, VNode, ComputedRef } from 'vue';
export { a as _DataLoader, D as _DefineLoaderOptions } from './defineLoader-bde635fd.js';

interface RouteRecordInfo<Name extends string = string, Path extends string = string, ParamsRaw extends RouteParamsRaw = RouteParamsRaw, Params extends RouteParams = RouteParams, Meta extends RouteMeta = RouteMeta> {
    name: Name;
    path: Path;
    paramsRaw: ParamsRaw;
    params: Params;
    meta: Meta;
}
type _RouteMapGeneric = Record<string, RouteRecordInfo>;

interface RouteLocationNormalizedTyped<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>, Name extends keyof RouteMap = keyof RouteMap> extends RouteLocationNormalized {
    name: Extract<Name, RouteRecordName>;
    params: RouteMap[Name]['params'];
}
type RouteLocationNormalizedTypedList<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>> = {
    [N in keyof RouteMap]: RouteLocationNormalizedTyped<RouteMap, N>;
};
interface RouteLocationNormalizedLoadedTyped<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>, Name extends keyof RouteMap = keyof RouteMap> extends RouteLocationNormalizedLoaded {
    name: Extract<Name, RouteRecordName>;
    params: RouteMap[Name]['params'];
}
type RouteLocationNormalizedLoadedTypedList<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>> = {
    [N in keyof RouteMap]: RouteLocationNormalizedLoadedTyped<RouteMap, N>;
};
interface RouteLocationAsRelativeTyped<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>, Name extends keyof RouteMap = keyof RouteMap> extends RouteQueryAndHash, RouteLocationOptions {
    name?: Name;
    params?: RouteMap[Name]['paramsRaw'];
}
type RouteLocationAsRelativeTypedList<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>> = {
    [N in keyof RouteMap]: RouteLocationAsRelativeTyped<RouteMap, N>;
};
interface RouteLocationAsPathTyped<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>, Name extends keyof RouteMap = keyof RouteMap> extends RouteQueryAndHash, RouteLocationOptions {
    path: LiteralStringUnion<RouteMap[Name]['path']>;
}
type RouteLocationAsPathTypedList<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>> = {
    [N in keyof RouteMap]: RouteLocationAsPathTyped<RouteMap, N>;
};
type RouteLocationAsString<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>> = LiteralStringUnion<RouteMap[keyof RouteMap]['path'], string>;
interface RouteLocationTyped<RouteMap extends _RouteMapGeneric, Name extends keyof RouteMap> extends RouteLocation {
    name: Extract<Name, RouteRecordName>;
    params: RouteMap[Name]['params'];
}
type RouteLocationTypedList<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>> = {
    [N in keyof RouteMap]: RouteLocationTyped<RouteMap, N>;
};
interface RouteLocationResolvedTyped<RouteMap extends _RouteMapGeneric, Name extends keyof RouteMap> extends RouteLocationTyped<RouteMap, Name> {
    href: string;
}
type RouteLocationResolvedTypedList<RouteMap extends _RouteMapGeneric = Record<string, RouteRecordInfo>> = {
    [N in keyof RouteMap]: RouteLocationResolvedTyped<RouteMap, N>;
};

type NavigationGuardReturn<RouteMap extends _RouteMapGeneric> = void | boolean | RouteLocationAsString<RouteMap> | RouteLocationAsRelativeTypedList<RouteMap>[keyof RouteMap] | RouteLocationAsPathTypedList<RouteMap>[keyof RouteMap];
interface NavigationGuardWithThis<T, RouteMap extends _RouteMapGeneric> {
    (this: T, to: RouteLocationNormalizedTypedList<RouteMap>[keyof RouteMap], from: RouteLocationNormalizedLoadedTypedList<RouteMap>[keyof RouteMap], next: NavigationGuardNext): NavigationGuardReturn<RouteMap> | Promise<NavigationGuardReturn<RouteMap>>;
}
interface NavigationGuard<RouteMap extends _RouteMapGeneric> {
    (to: RouteLocationNormalizedTypedList<RouteMap>[keyof RouteMap], from: RouteLocationNormalizedLoadedTypedList<RouteMap>[keyof RouteMap], next: NavigationGuardNext): NavigationGuardReturn<RouteMap> | Promise<NavigationGuardReturn<RouteMap>>;
}
interface NavigationHookAfter<RouteMap extends _RouteMapGeneric = _RouteMapGeneric> {
    (to: RouteLocationNormalizedTypedList<RouteMap>[keyof RouteMap], from: RouteLocationNormalizedLoadedTypedList<RouteMap>[keyof RouteMap], failure?: NavigationFailure | void): any;
}

interface _RouterTyped<RouteMap extends _RouteMapGeneric = _RouteMapGeneric> extends Omit<Router, 'resolve' | 'push' | 'replace' | 'beforeEach' | 'beforeResolve' | 'afterEach'> {
    currentRoute: Ref<RouteLocationNormalizedLoadedTypedList<RouteMap>[keyof RouteMap]>;
    push<Name extends keyof RouteMap = keyof RouteMap>(to: RouteLocationAsString<RouteMap> | RouteLocationAsRelativeTyped<RouteMap, Name> | RouteLocationAsPathTyped<RouteMap, Name>): ReturnType<Router['push']>;
    replace<Name extends keyof RouteMap = keyof RouteMap>(to: RouteLocationAsString<RouteMap> | RouteLocationAsRelativeTyped<RouteMap, Name> | RouteLocationAsPathTyped<RouteMap, Name>): ReturnType<Router['replace']>;
    resolve<Name extends keyof RouteMap = keyof RouteMap>(to: RouteLocationAsString<RouteMap> | RouteLocationAsRelativeTyped<RouteMap, Name> | RouteLocationAsPathTyped<RouteMap, Name>, currentLocation?: RouteLocationNormalizedLoaded): RouteLocationResolvedTypedList<RouteMap>[Name];
    beforeEach(guard: NavigationGuardWithThis<undefined, RouteMap>): ReturnType<Router['beforeEach']>;
    beforeResolve(guard: NavigationGuardWithThis<undefined, RouteMap>): ReturnType<Router['beforeEach']>;
    afterEach(guard: NavigationHookAfter<RouteMap>): ReturnType<Router['beforeEach']>;
}

/**
 * Typed version of `RouterLinkProps`.
 */
interface RouterLinkPropsTyped<RouteMap extends _RouteMapGeneric, Name extends keyof RouteMap = keyof RouteMap> extends Omit<RouterLinkProps, 'to'> {
    to: RouteLocationAsString<RouteMap> | RouteLocationAsRelativeTypedList<RouteMap>[Name] | RouteLocationAsPathTypedList<RouteMap>[Name];
}
/**
 * Typed version of `<RouterLink>` component.
 */
interface RouterLinkTyped<RouteMap extends _RouteMapGeneric> {
    new (): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & RouterLinkPropsTyped<RouteMap>;
        $slots: {
            default: (arg: UnwrapRef<_UseLinkReturnTyped<RouteMap>>) => VNode[];
        };
    };
}
/**
 * Return type of `useLink()`. Should be exposed by the router instead.
 * @internal
 */
interface _UseLinkReturnTyped<RouteMap extends _RouteMapGeneric, Name extends keyof RouteMap = keyof RouteMap> {
    route: ComputedRef<RouteLocationResolvedTypedList<RouteMap>[Name]>;
    href: ComputedRef<string>;
    isActive: ComputedRef<boolean>;
    isExactActive: ComputedRef<boolean>;
    navigate(e?: MouseEvent): Promise<void | NavigationFailure>;
}
/**
 * Typed version of `useLink()`.
 */
interface UseLinkFnTyped<RouteMap extends _RouteMapGeneric> {
    <Name extends keyof RouteMap = keyof RouteMap>(props: {
        to: RouteLocationAsString<RouteMap> | RouteLocationAsRelativeTyped<RouteMap, Name> | RouteLocationAsPathTyped<RouteMap, Name> | Ref<RouteLocationRaw>;
        replace?: boolean | undefined | Ref<boolean | undefined>;
    }): _UseLinkReturnTyped<RouteMap, Name>;
}

/**
 * Utility type for raw and non raw params like :id+
 *
 */
type ParamValueOneOrMore<isRaw extends boolean> = [
    ParamValue<isRaw>,
    ...ParamValue<isRaw>[]
];
/**
 * Utility type for raw and non raw params like :id*
 *
 */
type ParamValueZeroOrMore<isRaw extends boolean> = ParamValue<isRaw>[] | undefined | null;
/**
 * Utility type for raw and non raw params like :id?
 *
 */
type ParamValueZeroOrOne<isRaw extends boolean> = true extends isRaw ? string | number | null | undefined : string;
/**
 * Utility type for raw and non raw params like :id
 *
 */
type ParamValue<isRaw extends boolean> = true extends isRaw ? string | number : string;

export { NavigationGuard, ParamValue, ParamValueOneOrMore, ParamValueZeroOrMore, ParamValueZeroOrOne, RouteLocationAsPathTyped, RouteLocationAsPathTypedList, RouteLocationAsRelativeTyped, RouteLocationAsRelativeTypedList, RouteLocationAsString, RouteLocationNormalizedLoadedTyped, RouteLocationNormalizedLoadedTypedList, RouteLocationNormalizedTyped, RouteLocationNormalizedTypedList, RouteLocationResolvedTyped, RouteLocationResolvedTypedList, RouteLocationTyped, RouteLocationTypedList, RouteRecordInfo, RouterLinkPropsTyped, RouterLinkTyped, UseLinkFnTyped, _RouteMapGeneric, _RouterTyped, _UseLinkReturnTyped };
