import type { TourStepProps } from './step';
declare const _default: import("vue").DefineComponent<{
    modelValue: BooleanConstructor;
    current: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    showArrow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    showClose: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    closeIcon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) | ((new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
    contentStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    mask: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./types").TourMask & {}) | (() => import("./types").TourMask) | ((new (...args: any[]) => import("./types").TourMask & {}) | (() => import("./types").TourMask))[], unknown, unknown, boolean, boolean>;
    gap: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./types").TourGap) | (() => import("./types").TourGap) | ((new (...args: any[]) => import("./types").TourGap) | (() => import("./types").TourGap))[], unknown, unknown, () => {
        offset: number;
        radius: number;
    }, boolean>;
    zIndex: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    scrollIntoViewOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (boolean | ScrollIntoViewOptions) & {}) | (() => boolean | ScrollIntoViewOptions) | ((new (...args: any[]) => (boolean | ScrollIntoViewOptions) & {}) | (() => boolean | ScrollIntoViewOptions))[], unknown, unknown, () => {
        block: string;
    }, boolean>;
    type: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => ("default" | "primary") & {}) | (() => "default" | "primary") | ((new (...args: any[]) => ("default" | "primary") & {}) | (() => "default" | "primary"))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    appendTo: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (string | HTMLElement) & {}) | (() => string | HTMLElement) | ((new (...args: any[]) => (string | HTMLElement) & {}) | (() => string | HTMLElement))[], unknown, unknown, string, boolean>;
    closeOnPressEscape: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    targetAreaClickable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        modelValue: BooleanConstructor;
        current: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        showArrow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
        showClose: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
        closeIcon: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) | ((new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
        contentStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        mask: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./types").TourMask & {}) | (() => import("./types").TourMask) | ((new (...args: any[]) => import("./types").TourMask & {}) | (() => import("./types").TourMask))[], unknown, unknown, boolean, boolean>;
        gap: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./types").TourGap) | (() => import("./types").TourGap) | ((new (...args: any[]) => import("./types").TourGap) | (() => import("./types").TourGap))[], unknown, unknown, () => {
            offset: number;
            radius: number;
        }, boolean>;
        zIndex: {
            readonly type: import("vue").PropType<number>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        scrollIntoViewOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (boolean | ScrollIntoViewOptions) & {}) | (() => boolean | ScrollIntoViewOptions) | ((new (...args: any[]) => (boolean | ScrollIntoViewOptions) & {}) | (() => boolean | ScrollIntoViewOptions))[], unknown, unknown, () => {
            block: string;
        }, boolean>;
        type: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => ("default" | "primary") & {}) | (() => "default" | "primary") | ((new (...args: any[]) => ("default" | "primary") & {}) | (() => "default" | "primary"))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        appendTo: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (string | HTMLElement) & {}) | (() => string | HTMLElement) | ((new (...args: any[]) => (string | HTMLElement) & {}) | (() => string | HTMLElement))[], unknown, unknown, string, boolean>;
        closeOnPressEscape: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
        targetAreaClickable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    }>> & {
        onChange?: ((current: number) => any) | undefined;
        onClose?: ((current: number) => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        onFinish?: (() => any) | undefined;
        "onUpdate:current"?: ((current: number) => any) | undefined;
    }>>;
    emit: ((event: "update:modelValue", value: boolean) => void) & ((event: "change", current: number) => void) & ((event: "close", current: number) => void) & ((event: "finish") => void) & ((event: "update:current", current: number) => void);
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
    total: import("vue").Ref<number>;
    currentStep: import("vue").Ref<TourStepProps | undefined>;
    current: import("vue").Ref<number> | import("vue").WritableComputedRef<number>;
    currentTarget: import("vue").ComputedRef<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | HTMLElement | (() => HTMLElement | null) | null) & {}) | (() => string | HTMLElement | (() => HTMLElement | null) | null) | ((new (...args: any[]) => (string | HTMLElement | (() => HTMLElement | null) | null) & {}) | (() => string | HTMLElement | (() => HTMLElement | null) | null))[], unknown, unknown> | undefined>;
    kls: import("vue").ComputedRef<string[]>;
    mergedPlacement: import("vue").ComputedRef<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown>>;
    mergedContentStyle: import("vue").ComputedRef<import("vue").CSSProperties | undefined>;
    mergedMask: import("vue").ComputedRef<import("./types").TourMask>;
    mergedShowMask: import("vue").ComputedRef<boolean>;
    mergedMaskStyle: import("vue").ComputedRef<{
        style?: import("vue").CSSProperties | undefined;
        color?: string | undefined;
    } | undefined>;
    mergedShowArrow: import("vue").ComputedRef<import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>>;
    mergedScrollIntoViewOptions: import("vue").ComputedRef<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (boolean | ScrollIntoViewOptions) & {}) | (() => boolean | ScrollIntoViewOptions) | ((new (...args: any[]) => (boolean | ScrollIntoViewOptions) & {}) | (() => boolean | ScrollIntoViewOptions))[], unknown, unknown>>;
    mergedType: import("vue").ComputedRef<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => ("default" | "primary") & {}) | (() => "default" | "primary") | ((new (...args: any[]) => ("default" | "primary") & {}) | (() => "default" | "primary"))[], unknown, unknown> | undefined>;
    nextZIndex: () => number;
    nowZIndex: number;
    mergedZIndex: import("vue").ComputedRef<number>;
    pos: import("vue").ComputedRef<{
        left: number;
        top: number;
        width: number;
        height: number;
        radius: number;
    } | null>;
    triggerTarget: import("vue").ComputedRef<HTMLElement | {
        getBoundingClientRect(): DOMRect;
    } | undefined>;
    onEscClose: () => void;
    onUpdateTotal: (val: number) => void;
    slots: Readonly<{
        [name: string]: import("vue").Slot | undefined;
    }>;
    ElTourMask: import("vue").DefineComponent<{
        zIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        visible: BooleanConstructor;
        fill: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
        pos: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null) | ((new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        targetAreaClickable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    }, {
        props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
            zIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
            visible: BooleanConstructor;
            fill: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
            pos: {
                readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null) | ((new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            targetAreaClickable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
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
        pathStyle: import("vue").ComputedRef<import("vue").CSSProperties>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        zIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        visible: BooleanConstructor;
        fill: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
        pos: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null) | ((new (...args: any[]) => import("./types").PosInfo) | (() => import("./types").PosInfo | null))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        targetAreaClickable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    }>>, {
        zIndex: number;
        fill: string;
        visible: boolean;
        targetAreaClickable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    }>;
    ElTourContent: import("vue").DefineComponent<{
        placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
        reference: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
        strategy: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown, string, boolean>;
        offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        showArrow: BooleanConstructor;
        zIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    }, {
        props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
            placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
            reference: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
            strategy: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown, string, boolean>;
            offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
            showArrow: BooleanConstructor;
            zIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        }>> & {
            onClose?: (() => any) | undefined;
        }>>;
        emit: (event: "close") => void;
        placement: import("vue").Ref<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown>>;
        strategy: import("vue").Ref<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown>>;
        contentRef: import("vue").Ref<HTMLElement | null>;
        arrowRef: import("vue").Ref<HTMLElement | null>;
        contentStyle: import("vue").ComputedRef<import("vue").CSSProperties>;
        arrowStyle: import("vue").ComputedRef<import("vue").CSSProperties>;
        side: import("vue").ComputedRef<string>;
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
        onCloseRequested: () => void;
        onFocusoutPrevented: (event: CustomEvent<any>) => void;
        ElFocusTrap: import("vue").DefineComponent<{
            loop: BooleanConstructor;
            trapped: BooleanConstructor;
            focusTrapEl: import("vue").PropType<HTMLElement>;
            focusStartEl: {
                type: import("vue").PropType<HTMLElement | "container" | "first">;
                default: string;
            };
        }, {
            onKeydown: (e: KeyboardEvent) => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("focusAfterTrapped" | "focusAfterReleased" | "focusin" | "focusout" | "focusout-prevented" | "release-requested")[], "focusAfterTrapped" | "focusAfterReleased" | "focusin" | "focusout" | "focusout-prevented" | "release-requested", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            loop: BooleanConstructor;
            trapped: BooleanConstructor;
            focusTrapEl: import("vue").PropType<HTMLElement>;
            focusStartEl: {
                type: import("vue").PropType<HTMLElement | "container" | "first">;
                default: string;
            };
        }>> & {
            onFocusAfterReleased?: ((...args: any[]) => any) | undefined;
            onFocusAfterTrapped?: ((...args: any[]) => any) | undefined;
            onFocusin?: ((...args: any[]) => any) | undefined;
            onFocusout?: ((...args: any[]) => any) | undefined;
            "onFocusout-prevented"?: ((...args: any[]) => any) | undefined;
            "onRelease-requested"?: ((...args: any[]) => any) | undefined;
        }, {
            trapped: boolean;
            loop: boolean;
            focusStartEl: HTMLElement | "container" | "first";
        }>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        close: () => boolean;
    }, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
        reference: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
        strategy: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown, string, boolean>;
        offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        showArrow: BooleanConstructor;
        zIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    }>> & {
        onClose?: (() => any) | undefined;
    }, {
        zIndex: number;
        offset: number;
        placement: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown>;
        strategy: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown>;
        showArrow: boolean;
        reference: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown>;
    }>;
    ElTourSteps: import("vue").DefineComponent<{
        current: {
            type: NumberConstructor;
            default: number;
        };
    }, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update-total"[], "update-total", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        current: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onUpdate-total"?: ((...args: any[]) => any) | undefined;
    }, {
        current: number;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => boolean;
    "update:current": (current: number) => boolean;
    close: (current: number) => boolean;
    finish: () => boolean;
    change: (current: number) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: BooleanConstructor;
    current: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    showArrow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    showClose: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    closeIcon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) | ((new (...args: any[]) => (string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>) & {}) | (() => string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
    contentStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    mask: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./types").TourMask & {}) | (() => import("./types").TourMask) | ((new (...args: any[]) => import("./types").TourMask & {}) | (() => import("./types").TourMask))[], unknown, unknown, boolean, boolean>;
    gap: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./types").TourGap) | (() => import("./types").TourGap) | ((new (...args: any[]) => import("./types").TourGap) | (() => import("./types").TourGap))[], unknown, unknown, () => {
        offset: number;
        radius: number;
    }, boolean>;
    zIndex: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    scrollIntoViewOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (boolean | ScrollIntoViewOptions) & {}) | (() => boolean | ScrollIntoViewOptions) | ((new (...args: any[]) => (boolean | ScrollIntoViewOptions) & {}) | (() => boolean | ScrollIntoViewOptions))[], unknown, unknown, () => {
        block: string;
    }, boolean>;
    type: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => ("default" | "primary") & {}) | (() => "default" | "primary") | ((new (...args: any[]) => ("default" | "primary") & {}) | (() => "default" | "primary"))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    appendTo: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (string | HTMLElement) & {}) | (() => string | HTMLElement) | ((new (...args: any[]) => (string | HTMLElement) & {}) | (() => string | HTMLElement))[], unknown, unknown, string, boolean>;
    closeOnPressEscape: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    targetAreaClickable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
}>> & {
    onChange?: ((current: number) => any) | undefined;
    onClose?: ((current: number) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onFinish?: (() => any) | undefined;
    "onUpdate:current"?: ((current: number) => any) | undefined;
}, {
    modelValue: boolean;
    placement: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown>;
    appendTo: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | HTMLElement) & {}) | (() => string | HTMLElement) | ((new (...args: any[]) => (string | HTMLElement) & {}) | (() => string | HTMLElement))[], unknown, unknown>;
    scrollIntoViewOptions: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (boolean | ScrollIntoViewOptions) & {}) | (() => boolean | ScrollIntoViewOptions) | ((new (...args: any[]) => (boolean | ScrollIntoViewOptions) & {}) | (() => boolean | ScrollIntoViewOptions))[], unknown, unknown>;
    gap: import("./types").TourGap;
    mask: import("./types").TourMask;
    showArrow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    current: number;
    showClose: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    closeOnPressEscape: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    targetAreaClickable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
}>;
export default _default;
