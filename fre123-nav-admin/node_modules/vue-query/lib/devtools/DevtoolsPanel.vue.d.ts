import type { Query } from "react-query/core";
import { PropType, Ref } from "vue-demi";
import { getQueryState } from "./utils";
import type { Options } from "./types";
interface PanelProps {
    style?: CSSStyleDeclaration;
    className?: string;
}
/**
 * @deprecated Vue Query Devtools are now available as a plugin to the official Vue Devtools.
 * Standalone devtools will be removed in v2 of vue-query.
 * Please visit https://vue-query.vercel.app/#/getting-started/devtools for more information.
 */
declare const DevtoolsPanel: import("vue-demi").DefineComponent<{
    isOpen: {
        type: BooleanConstructor;
        required: true;
    };
    panelProps: {
        type: PropType<PanelProps>;
        default: () => {};
    };
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
    devtoolsPanelStyles: import("vue-demi").ComputedRef<{
        backgroundColor: string;
        color: string;
    }>;
    queries: Ref<Query<unknown, unknown, unknown, import("react-query/core").QueryKey>[]>;
    getQueryState: typeof getQueryState;
    onOptionsChange: (newOptions: Options) => void;
    activeQuery: Ref<Query<unknown, unknown, unknown, import("react-query/core").QueryKey> | undefined>;
    selectQuery: (queryHash: string) => void;
    handleDragStart: (event: MouseEvent) => void;
    options: {
        selectedQueryClientKey: string;
        filter: string;
        sortDesc: boolean;
        sortFn: import("./types").SortFn;
    };
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, Record<string, any>, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    isOpen: {
        type: BooleanConstructor;
        required: true;
    };
    panelProps: {
        type: PropType<PanelProps>;
        default: () => {};
    };
    queryClientKeys: {
        type: PropType<string[]>;
        default: () => never[];
    };
}>>, {
    panelProps: PanelProps;
    queryClientKeys: string[];
}>;
export default DevtoolsPanel;
