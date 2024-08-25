import type { RadioButtonProps } from './radio-button';
import type { RadioProps } from './radio';
export declare const useRadio: (props: RadioProps | RadioButtonProps, emit?: (((event: "update:modelValue", val: string | number | boolean | undefined) => void) & ((event: "change", val: string | number | boolean | undefined) => void)) | undefined) => {
    radioRef: import("vue").Ref<HTMLInputElement | undefined>;
    isGroup: import("vue").ComputedRef<boolean>;
    radioGroup: import("./constants").RadioGroupContext | undefined;
    focus: import("vue").Ref<boolean>;
    size: import("vue").ComputedRef<"" | "default" | "small" | "large">;
    disabled: import("vue").ComputedRef<boolean>;
    tabIndex: import("vue").ComputedRef<0 | -1>;
    modelValue: import("vue").WritableComputedRef<import("element-plus/es/utils").EpPropMergeType<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown> | undefined>;
    actualValue: import("vue").ComputedRef<import("element-plus/es/utils").EpPropMergeType<(NumberConstructor | BooleanConstructor | StringConstructor)[], unknown, unknown> | undefined>;
};
