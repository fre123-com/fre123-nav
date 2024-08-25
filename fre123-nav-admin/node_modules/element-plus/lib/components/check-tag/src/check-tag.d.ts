import type CheckTag from './check-tag.vue';
import type { ExtractPropTypes } from 'vue';
export declare const checkTagProps: {
    readonly checked: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "success" | "warning" | "info" | "primary" | "danger", unknown, "primary", boolean>;
};
export declare type CheckTagProps = ExtractPropTypes<typeof checkTagProps>;
export declare const checkTagEmits: {
    'update:checked': (value: boolean) => boolean;
    change: (value: boolean) => boolean;
};
export declare type CheckTagEmits = typeof checkTagEmits;
export declare type CheckTagInstance = InstanceType<typeof CheckTag>;
