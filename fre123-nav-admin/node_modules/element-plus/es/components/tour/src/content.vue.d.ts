declare const _default: import("vue").DefineComponent<{
    placement: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
    reference: import("../../../utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
    strategy: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown, string, boolean>;
    offset: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    showArrow: BooleanConstructor;
    zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        placement: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
        reference: import("../../../utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
        strategy: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown, string, boolean>;
        offset: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        showArrow: BooleanConstructor;
        zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    }>> & {
        onClose?: (() => any) | undefined;
    }>>;
    emit: (event: "close") => void;
    placement: import("vue").Ref<import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown>>;
    strategy: import("vue").Ref<import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown>>;
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
    onFocusoutPrevented: (event: CustomEvent) => void;
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
    placement: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
    reference: import("../../../utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown, null, boolean>;
    strategy: import("../../../utils").EpPropFinalized<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown, string, boolean>;
    offset: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    showArrow: BooleanConstructor;
    zIndex: import("../../../utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
}>> & {
    onClose?: (() => any) | undefined;
}, {
    zIndex: number;
    offset: number;
    placement: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement) | ((new (...args: any[]) => import("@floating-ui/core").Placement & {}) | (() => import("@floating-ui/core").Placement))[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown>;
    strategy: import("../../../utils").EpPropMergeType<(new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy) | ((new (...args: any[]) => import("@floating-ui/core").Strategy & {}) | (() => import("@floating-ui/core").Strategy))[], "fixed" | "absolute", unknown>;
    showArrow: boolean;
    reference: import("../../../utils").EpPropMergeType<(new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null) | ((new (...args: any[]) => HTMLElement | import("@floating-ui/dom").VirtualElement) | (() => HTMLElement | import("@floating-ui/dom").VirtualElement | null))[], unknown, unknown>;
}>;
export default _default;
