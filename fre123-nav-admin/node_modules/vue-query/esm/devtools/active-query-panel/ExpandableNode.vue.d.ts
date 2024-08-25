declare const _default: import("vue-demi").DefineComponent<{
    isExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        required: true;
    };
    subtitle: {
        type: StringConstructor;
        required: false;
    };
}, {
    onClick: () => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, "click"[], "click", import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    isExpanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        required: true;
    };
    subtitle: {
        type: StringConstructor;
        required: false;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    isExpanded: boolean;
}>;
export default _default;
