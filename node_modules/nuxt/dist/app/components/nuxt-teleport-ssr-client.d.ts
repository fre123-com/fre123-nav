/**
 * component only used with componentsIsland
 * this teleport the component in SSR only if it needs to be hydrated on client
 */
declare const _default: import("vue").DefineComponent<{
    to: {
        type: StringConstructor;
        required: true;
    };
    nuxtClient: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * ONLY used in dev mode since we use build:manifest result in production
     * do not pass any value in production
     */
    rootDir: {
        type: StringConstructor;
        default: null;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    to: {
        type: StringConstructor;
        required: true;
    };
    nuxtClient: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * ONLY used in dev mode since we use build:manifest result in production
     * do not pass any value in production
     */
    rootDir: {
        type: StringConstructor;
        default: null;
    };
}>>, {
    nuxtClient: boolean;
    rootDir: string;
}, {}>;
export default _default;
