import type { Query } from "react-query/types/core";
export declare type ButtonProps = Partial<HTMLButtonElement>;
export declare type SortFn = (a: Query, b: Query) => number;
export interface Options {
    selectedQueryClientKey: string;
    filter: string;
    sortFn: SortFn;
    sortDesc: boolean;
}
export interface PanelProps {
    style?: Partial<CSSStyleDeclaration>;
    className?: string;
}
