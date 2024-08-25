import { PropType } from "vue-demi";
import type { Query } from "react-query/types/core";
declare const _default: import("vue-demi").DefineComponent<{
    query: {
        type: PropType<Query<unknown, unknown, unknown, import("react-query/types/core").QueryKey>>;
        required: true;
    };
    selectedQueryClientKey: {
        type: StringConstructor;
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
    isFetching: import("vue-demi").ComputedRef<boolean>;
    doFetch: () => void;
    doInvalidate: () => void;
    doReset: () => void;
    doRemove: () => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, Record<string, any>, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    query: {
        type: PropType<Query<unknown, unknown, unknown, import("react-query/types/core").QueryKey>>;
        required: true;
    };
    selectedQueryClientKey: {
        type: StringConstructor;
    };
}>>, {}>;
export default _default;
