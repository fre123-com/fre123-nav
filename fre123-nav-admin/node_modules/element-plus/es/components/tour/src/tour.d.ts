import type { CSSProperties, ExtractPropTypes } from 'vue';
import type Tour from './tour.vue';
import type { TourGap, TourMask } from './types';
export declare const tourProps: {
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
        readonly type: import("vue").PropType<CSSProperties>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    mask: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TourMask & {}) | (() => TourMask) | ((new (...args: any[]) => TourMask & {}) | (() => TourMask))[], unknown, unknown, boolean, boolean>;
    gap: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TourGap) | (() => TourGap) | ((new (...args: any[]) => TourGap) | (() => TourGap))[], unknown, unknown, () => {
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
};
export declare type TourProps = ExtractPropTypes<typeof tourProps>;
export declare type TourInstance = InstanceType<typeof Tour>;
export declare const tourEmits: {
    "update:modelValue": (value: boolean) => boolean;
    "update:current": (current: number) => boolean;
    close: (current: number) => boolean;
    finish: () => boolean;
    change: (current: number) => boolean;
};
export declare type TourEmits = typeof tourEmits;
