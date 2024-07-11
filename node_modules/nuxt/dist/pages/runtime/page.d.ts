import type { KeepAliveProps, TransitionProps, VNode } from 'vue';
import type { RouteLocationNormalizedLoaded } from '#vue-router';
declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
    };
    transition: {
        type: () => boolean | TransitionProps;
        default: undefined;
    };
    keepalive: {
        type: () => boolean | KeepAliveProps;
        default: undefined;
    };
    route: {
        type: () => RouteLocationNormalized;
    };
    pageKey: {
        type: () => string | ((route: RouteLocationNormalizedLoaded) => string);
        default: null;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
    };
    transition: {
        type: () => boolean | TransitionProps;
        default: undefined;
    };
    keepalive: {
        type: () => boolean | KeepAliveProps;
        default: undefined;
    };
    route: {
        type: () => RouteLocationNormalized;
    };
    pageKey: {
        type: () => string | ((route: RouteLocationNormalizedLoaded) => string);
        default: null;
    };
}>>, {
    keepalive: boolean | KeepAliveProps;
    transition: boolean | TransitionProps;
    pageKey: string | ((route: RouteLocationNormalizedLoaded) => string);
}, {}>;
export default _default;
