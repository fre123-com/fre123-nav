import { PropType } from "vue-demi";
import type { Options } from "../types";
declare const _default: import("vue-demi").DefineComponent<{
    queryClientKeys: {
        type: PropType<string[]>;
        default: () => never[];
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
    sortFnKeys: string[];
    sort: import("vue-demi").Ref<string>;
    options: {
        selectedQueryClientKey: string;
        filter: string;
        sortDesc: boolean;
        sortFn: import("../types").SortFn;
    };
    onInput: (event: InputEvent) => void;
    onKeyDown: (event: KeyboardEvent) => void;
    onSortFnChange: (event: Event) => void;
    onSortDescChange: () => void;
    onSelectedClientChange: (event: Event) => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {
    optionsChange: (options: Options) => boolean;
}, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    queryClientKeys: {
        type: PropType<string[]>;
        default: () => never[];
    };
}>> & {
    onOptionsChange?: ((options: Options) => any) | undefined;
}, {
    queryClientKeys: string[];
}>;
export default _default;
