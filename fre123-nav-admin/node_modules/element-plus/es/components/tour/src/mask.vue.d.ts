import type { CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    visible: BooleanConstructor;
    fill: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    pos: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null) | ((new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    targetAreaClickable: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        visible: BooleanConstructor;
        fill: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
        pos: {
            readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null) | ((new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        targetAreaClickable: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    }>> & {
        [x: string & `on${string}`]: ((...args: any[]) => any) | ((...args: unknown[]) => any) | undefined;
    }>>;
    ns: {
        namespace: import("vue").ComputedRef<string>;
        b: (blockSuffix?: string) => string;
        e: (element?: string | undefined) => string;
        m: (modifier?: string | undefined) => string;
        be: (blockSuffix?: string | undefined, element?: string | undefined) => string;
        em: (element?: string | undefined, modifier?: string | undefined) => string;
        bm: (blockSuffix?: string | undefined, modifier?: string | undefined) => string;
        bem: (blockSuffix?: string | undefined, element?: string | undefined, modifier?: string | undefined) => string;
        is: {
            (name: string, state: boolean | undefined): string;
            (name: string): string;
        };
        cssVar: (object: Record<string, string>) => Record<string, string>;
        cssVarName: (name: string) => string;
        cssVarBlock: (object: Record<string, string>) => Record<string, string>;
        cssVarBlockName: (name: string) => string;
    };
    radius: import("vue").ComputedRef<number>;
    roundInfo: import("vue").ComputedRef<{
        topRight: string;
        bottomRight: string;
        bottomLeft: string;
        topLeft: string;
    }>;
    path: import("vue").ComputedRef<string>;
    pathStyle: import("vue").ComputedRef<CSSProperties>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    visible: BooleanConstructor;
    fill: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    pos: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null) | ((new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    targetAreaClickable: import("../../../utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
}>>, {
    zIndex: number;
    fill: string;
    visible: boolean;
    targetAreaClickable: import("../../../utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
