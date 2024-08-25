import { PropType } from "vue-demi";
import type { Query } from "react-query/types/core";
declare const _default: import("vue-demi").DefineComponent<{
    query: {
        type: PropType<Query<unknown, unknown, unknown, import("react-query/types/core").QueryKey>>;
        required: true;
    };
}, {
    theme: {
        background: string;
        backgroundAlt: string;
        foreground: string;
        gray: string;
        grayAlt: string;
        inputBackgroundColor: string;
        inputTextColor: string;
        success: string;
        danger: string;
        active: string;
        warning: string;
    };
    observerCount: import("vue-demi").ComputedRef<number>;
    isStale: import("vue-demi").ComputedRef<boolean>;
    isDisabled: import("vue-demi").ComputedRef<boolean>;
    stateColor: import("vue-demi").ComputedRef<string>;
    onQueryClick: () => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, Record<string, any>, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    query: {
        type: PropType<Query<unknown, unknown, unknown, import("react-query/types/core").QueryKey>>;
        required: true;
    };
}>>, {}>;
export default _default;
