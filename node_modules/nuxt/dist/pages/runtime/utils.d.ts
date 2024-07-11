import type { RouteLocationNormalizedLoaded, RouterView } from '#vue-router';
type InstanceOf<T> = T extends new (...args: any[]) => infer R ? R : never;
type RouterViewSlot = Exclude<InstanceOf<typeof RouterView>['$slots']['default'], undefined>;
export type RouterViewSlotProps = Parameters<RouterViewSlot>[0];
export declare const generateRouteKey: (routeProps: any, override?: string | ((route: RouteLocationNormalizedLoaded) => string) | undefined) => any;
export declare const wrapInKeepAlive: (props: any, children: any) => {
    default: () => any;
};
export declare function toArray<T>(value: T | T[]): T[];
export {};
