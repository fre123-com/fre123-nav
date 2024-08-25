import { PropType } from "vue-demi";
import type { Query } from "react-query/types/core";
declare const _default: import("vue-demi").DefineComponent<{
    query: {
        type: PropType<Query<unknown, unknown, unknown, import("react-query/types/core").QueryKey>>;
        required: true;
    };
}, {
    formattedQueryKey: import("vue-demi").ComputedRef<string>;
    queryStatusLabel: import("vue-demi").ComputedRef<string>;
    observersCount: import("vue-demi").ComputedRef<number>;
    updateDate: import("vue-demi").ComputedRef<string>;
    statusBackground: import("vue-demi").ComputedRef<string>;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, Record<string, any>, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    query: {
        type: PropType<Query<unknown, unknown, unknown, import("react-query/types/core").QueryKey>>;
        required: true;
    };
}>>, {}>;
export default _default;
