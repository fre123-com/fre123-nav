import type { ExtractPropTypes, InjectionKey } from 'vue';
import type { SelectProps } from './select';
interface SelectGroupContext {
    disabled: boolean;
}
export interface SelectContext {
    props: ExtractPropTypes<typeof SelectProps>;
    states: any;
    expanded: boolean;
    selectRef: HTMLElement;
    optionsArray: any[];
    setSelected(): void;
    onOptionCreate(vm: SelectOptionProxy): void;
    onOptionDestroy(key: number | string | Record<string, string>, vm: SelectOptionProxy): void;
    handleOptionSelect(vm: SelectOptionProxy): void;
}
export declare const selectGroupKey: InjectionKey<SelectGroupContext>;
export declare const selectKey: InjectionKey<SelectContext>;
export interface SelectOptionProxy {
    value: string | number | Record<string, string>;
    label: string | number;
    created: boolean;
    disabled: boolean;
    currentLabel: string;
    itemSelected: boolean;
    isDisabled: boolean;
    select: SelectContext;
    hoverItem: () => void;
    updateOption: (query: string) => void;
    visible: boolean;
    hover: boolean;
    selectOptionClick: () => void;
}
export declare type ISelectProps = ExtractPropTypes<typeof SelectProps>;
export {};
