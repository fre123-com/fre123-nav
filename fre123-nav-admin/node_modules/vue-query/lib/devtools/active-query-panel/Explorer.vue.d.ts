import { PropType } from "vue-demi";
import * as VueDemi from "vue-demi";
declare type DefaultExpanded = boolean | {
    [key: string]: DefaultExpanded;
};
interface SubEntry {
    label: string;
    value: Record<string, unknown>;
    path: (string | number)[];
    depth: number;
    defaultExpanded: DefaultExpanded;
}
declare const _default: VueDemi.DefineComponent<{
    label: {
        type: StringConstructor;
        required: true;
    };
    defaultExpanded: {
        type: PropType<DefaultExpanded>;
        required: true;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    depth: {
        type: NumberConstructor;
        default: number;
    };
    value: {
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
    subEntryPages: VueDemi.ComputedRef<SubEntry[][]>;
    toggle: () => void;
    expanded: VueDemi.Ref<boolean>;
    subEntries: VueDemi.ComputedRef<SubEntry[]>;
    subEntriesLabel: VueDemi.ComputedRef<"items" | "item">;
    expandedPages: VueDemi.Ref<number[]>;
    setExpandedPages: (index: number) => void;
    stringifiedValue: VueDemi.ComputedRef<string>;
}, unknown, {}, {}, VueDemi.ComponentOptionsMixin, VueDemi.ComponentOptionsMixin, Record<string, any>, string, VueDemi.VNodeProps & VueDemi.AllowedComponentProps & VueDemi.ComponentCustomProps, Readonly<VueDemi.ExtractPropTypes<{
    label: {
        type: StringConstructor;
        required: true;
    };
    defaultExpanded: {
        type: PropType<DefaultExpanded>;
        required: true;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    depth: {
        type: NumberConstructor;
        default: number;
    };
    value: {
        required: true;
    };
}>>, {
    pageSize: number;
    depth: number;
}>;
export default _default;
