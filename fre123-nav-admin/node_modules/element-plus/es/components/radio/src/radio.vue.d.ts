declare const _default: import("vue").DefineComponent<{
    readonly border: BooleanConstructor;
    readonly modelValue: import("../../../utils").EpPropFinalized<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
    readonly size: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly disabled: BooleanConstructor;
    readonly label: import("../../../utils").EpPropFinalized<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
    readonly value: import("../../../utils").EpPropFinalized<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
    readonly name: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        readonly border: BooleanConstructor;
        readonly modelValue: import("../../../utils").EpPropFinalized<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
        readonly size: {
            readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly disabled: BooleanConstructor;
        readonly label: import("../../../utils").EpPropFinalized<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
        readonly value: import("../../../utils").EpPropFinalized<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
        readonly name: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    }>> & {
        onChange?: ((val: string | number | boolean | undefined) => any) | undefined;
        "onUpdate:modelValue"?: ((val: string | number | boolean | undefined) => any) | undefined;
    }>>;
    emit: ((event: "update:modelValue", val: string | number | boolean | undefined) => void) & ((event: "change", val: string | number | boolean | undefined) => void);
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
    radioRef: import("vue").Ref<HTMLInputElement | undefined>;
    radioGroup: import("./constants").RadioGroupContext | undefined;
    focus: import("vue").Ref<boolean>;
    size: import("vue").ComputedRef<"" | "default" | "small" | "large">;
    disabled: import("vue").ComputedRef<boolean>;
    modelValue: import("vue").WritableComputedRef<import("../../../utils").EpPropMergeType<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown> | undefined>;
    actualValue: import("vue").ComputedRef<import("../../../utils").EpPropMergeType<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown> | undefined>;
    handleChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (val: string | number | boolean | undefined) => boolean;
    change: (val: string | number | boolean | undefined) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly border: BooleanConstructor;
    readonly modelValue: import("../../../utils").EpPropFinalized<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
    readonly size: {
        readonly type: import("vue").PropType<import("../../../utils").EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly disabled: BooleanConstructor;
    readonly label: import("../../../utils").EpPropFinalized<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
    readonly value: import("../../../utils").EpPropFinalized<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
    readonly name: import("../../../utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
}>> & {
    onChange?: ((val: string | number | boolean | undefined) => any) | undefined;
    "onUpdate:modelValue"?: ((val: string | number | boolean | undefined) => any) | undefined;
}, {
    readonly value: import("../../../utils").EpPropMergeType<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown>;
    readonly modelValue: import("../../../utils").EpPropMergeType<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown>;
    readonly label: import("../../../utils").EpPropMergeType<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown>;
    readonly disabled: boolean;
    readonly name: string;
    readonly border: boolean;
}>;
export default _default;
