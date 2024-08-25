export declare const ElAnchor: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    container: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | Window | HTMLElement | null) & {}) | (() => string | Window | HTMLElement | null) | ((new (...args: any[]) => (string | Window | HTMLElement | null) & {}) | (() => string | Window | HTMLElement | null))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    bound: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    duration: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    marker: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    type: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => ("default" | "underline") & {}) | (() => "default" | "underline") | ((new (...args: any[]) => ("default" | "underline") & {}) | (() => "default" | "underline"))[], unknown, unknown, string, boolean>;
    direction: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => ("vertical" | "horizontal") & {}) | (() => "vertical" | "horizontal") | ((new (...args: any[]) => ("vertical" | "horizontal") & {}) | (() => "vertical" | "horizontal"))[], unknown, unknown, string, boolean>;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        container: {
            readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | Window | HTMLElement | null) & {}) | (() => string | Window | HTMLElement | null) | ((new (...args: any[]) => (string | Window | HTMLElement | null) & {}) | (() => string | Window | HTMLElement | null))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        bound: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        duration: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
        marker: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
        type: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => ("default" | "underline") & {}) | (() => "default" | "underline") | ((new (...args: any[]) => ("default" | "underline") & {}) | (() => "default" | "underline"))[], unknown, unknown, string, boolean>;
        direction: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => ("vertical" | "horizontal") & {}) | (() => "vertical" | "horizontal") | ((new (...args: any[]) => ("vertical" | "horizontal") & {}) | (() => "vertical" | "horizontal"))[], unknown, unknown, string, boolean>;
    }>> & {
        onChange?: ((href: string) => any) | undefined;
        onClick?: ((e: MouseEvent, href?: string | undefined) => any) | undefined;
    }>>;
    emit: ((event: "change", href: string) => void) & ((event: "click", e: MouseEvent, href?: string | undefined) => void);
    currentAnchor: import("vue").Ref<string>;
    anchorRef: import("vue").Ref<HTMLElement | null>;
    markerRef: import("vue").Ref<HTMLElement | null>;
    containerEl: import("vue").Ref<Window | HTMLElement | undefined>;
    links: Record<string, HTMLElement>;
    isScrolling: boolean;
    currentScrollTop: number;
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
    cls: import("vue").ComputedRef<string[]>;
    addLink: (state: import("./src/constants").AnchorLinkState) => void;
    removeLink: (href: string) => void;
    setCurrentAnchor: (href: string) => void;
    clearAnimate: null;
    scrollToAnchor: (href: string) => void;
    scrollTo: (href?: string | undefined) => void;
    handleClick: (e: MouseEvent, href?: string | undefined) => void;
    handleScroll: {
        (...args: any[]): void;
        cancel(): void;
    };
    getCurrentHref: () => string | undefined;
    getContainer: () => void;
    markerStyle: import("vue").ComputedRef<{
        left?: undefined;
        width?: undefined;
        opacity?: undefined;
        top?: undefined;
    } | {
        left: string;
        width: string;
        opacity: number;
        top?: undefined;
    } | {
        top: string;
        opacity: number;
        left?: undefined;
        width?: undefined;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (href: string) => boolean;
    click: (e: MouseEvent, href?: string | undefined) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    container: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | Window | HTMLElement | null) & {}) | (() => string | Window | HTMLElement | null) | ((new (...args: any[]) => (string | Window | HTMLElement | null) & {}) | (() => string | Window | HTMLElement | null))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    bound: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    duration: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    marker: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    type: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => ("default" | "underline") & {}) | (() => "default" | "underline") | ((new (...args: any[]) => ("default" | "underline") & {}) | (() => "default" | "underline"))[], unknown, unknown, string, boolean>;
    direction: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => ("vertical" | "horizontal") & {}) | (() => "vertical" | "horizontal") | ((new (...args: any[]) => ("vertical" | "horizontal") & {}) | (() => "vertical" | "horizontal"))[], unknown, unknown, string, boolean>;
}>> & {
    onChange?: ((href: string) => any) | undefined;
    onClick?: ((e: MouseEvent, href?: string | undefined) => any) | undefined;
}, {
    type: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => ("default" | "underline") & {}) | (() => "default" | "underline") | ((new (...args: any[]) => ("default" | "underline") & {}) | (() => "default" | "underline"))[], unknown, unknown>;
    offset: number;
    bound: number;
    duration: number;
    marker: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    direction: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => ("vertical" | "horizontal") & {}) | (() => "vertical" | "horizontal") | ((new (...args: any[]) => ("vertical" | "horizontal") & {}) | (() => "vertical" | "horizontal"))[], unknown, unknown>;
}>> & {
    AnchorLink: import("vue").DefineComponent<{
        title: StringConstructor;
        href: StringConstructor;
    }, {
        props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
            title: StringConstructor;
            href: StringConstructor;
        }>> & {
            [x: string & `on${string}`]: ((...args: any[]) => any) | ((...args: unknown[]) => any) | undefined;
        }>>;
        linkRef: import("vue").Ref<HTMLElement | null>;
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
        direction: string;
        currentAnchor: import("vue").Ref<string>;
        addLink: (state: import("./src/constants").AnchorLinkState) => void;
        removeLink: (href: string) => void;
        contextHandleClick: (e: MouseEvent, href?: string | undefined) => void;
        cls: import("vue").ComputedRef<string[]>;
        handleClick: (e: MouseEvent) => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        title: StringConstructor;
        href: StringConstructor;
    }>>, {}>;
};
export declare const ElAnchorLink: import("element-plus/es/utils").SFCWithInstall<import("vue").DefineComponent<{
    title: StringConstructor;
    href: StringConstructor;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        title: StringConstructor;
        href: StringConstructor;
    }>> & {
        [x: string & `on${string}`]: ((...args: any[]) => any) | ((...args: unknown[]) => any) | undefined;
    }>>;
    linkRef: import("vue").Ref<HTMLElement | null>;
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
    direction: string;
    currentAnchor: import("vue").Ref<string>;
    addLink: (state: import("./src/constants").AnchorLinkState) => void;
    removeLink: (href: string) => void;
    contextHandleClick: (e: MouseEvent, href?: string | undefined) => void;
    cls: import("vue").ComputedRef<string[]>;
    handleClick: (e: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    href: StringConstructor;
}>>, {}>>;
export default ElAnchor;
export * from './src/anchor';
