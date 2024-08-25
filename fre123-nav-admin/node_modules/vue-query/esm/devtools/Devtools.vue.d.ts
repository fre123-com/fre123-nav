import { PropType } from "vue-demi";
import { Position } from "./utils";
import type { PanelProps } from "./types";
/**
 * @deprecated Vue Query Devtools are now available as a plugin to the official Vue Devtools.
 * Standalone devtools will be removed in v2 of vue-query.
 * Please visit https://vue-query.vercel.app/#/getting-started/devtools for more information.
 */
declare const VueQueryDevTools: import("vue-demi").DefineComponent<{
    initialIsOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    panelProps: {
        type: PropType<PanelProps>;
        default: () => {};
    };
    closeButtonProps: {
        type: PropType<Partial<HTMLButtonElement>>;
        default: () => {};
    };
    toggleButtonProps: {
        type: PropType<Partial<HTMLButtonElement>>;
        default: () => {};
    };
    position: {
        type: PropType<Position>;
        default: Position;
    };
    containerElement: {
        type: StringConstructor;
        default: string;
    };
    queryClientKeys: {
        type: PropType<string[]>;
        default: () => never[];
    };
}, {
    isOpen: import("vue-demi").Ref<boolean>;
    isResizing: import("vue-demi").Ref<boolean>;
    devtoolsHeight: import("vue-demi").Ref<string>;
    panelRef: import("vue-demi").Ref<any>;
    onToggleClick: () => void;
    handleDragStart: (event: MouseEvent) => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, Record<string, any>, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    initialIsOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    panelProps: {
        type: PropType<PanelProps>;
        default: () => {};
    };
    closeButtonProps: {
        type: PropType<Partial<HTMLButtonElement>>;
        default: () => {};
    };
    toggleButtonProps: {
        type: PropType<Partial<HTMLButtonElement>>;
        default: () => {};
    };
    position: {
        type: PropType<Position>;
        default: Position;
    };
    containerElement: {
        type: StringConstructor;
        default: string;
    };
    queryClientKeys: {
        type: PropType<string[]>;
        default: () => never[];
    };
}>>, {
    initialIsOpen: boolean;
    panelProps: PanelProps;
    closeButtonProps: Partial<HTMLButtonElement>;
    toggleButtonProps: Partial<HTMLButtonElement>;
    position: Position;
    containerElement: string;
    queryClientKeys: string[];
}>;
export default VueQueryDevTools;
