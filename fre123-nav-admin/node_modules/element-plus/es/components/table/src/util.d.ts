import { type ElTooltipProps } from 'element-plus/es/components/tooltip';
import type { Table } from './table/defaults';
import type { TableColumnCtx } from './table-column/defaults';
export declare type TableOverflowTooltipOptions = Partial<Pick<ElTooltipProps, 'appendTo' | 'effect' | 'enterable' | 'hideAfter' | 'offset' | 'placement' | 'popperClass' | 'popperOptions' | 'showAfter' | 'showArrow' | 'transition'>>;
declare type RemovePopperFn = (() => void) & {
    trigger?: HTMLElement;
};
export declare const getCell: (event: Event) => HTMLTableCellElement | null;
export declare const orderBy: <T>(array: T[], sortKey: string, reverse: string | number, sortMethod: any, sortBy: string | (string | ((a: T, b: T, array?: T[] | undefined) => number))[]) => T[];
export declare const getColumnById: <T>(table: {
    columns: TableColumnCtx<T>[];
}, columnId: string) => TableColumnCtx<T> | null;
export declare const getColumnByKey: <T>(table: {
    columns: TableColumnCtx<T>[];
}, columnKey: string) => TableColumnCtx<T>;
export declare const getColumnByCell: <T>(table: {
    columns: TableColumnCtx<T>[];
}, cell: HTMLElement, namespace: string) => TableColumnCtx<T> | null;
export declare const getRowIdentity: <T>(row: T, rowKey: string | ((row: T) => any)) => string;
export declare const getKeysMap: <T>(array: T[], rowKey: string) => Record<string, {
    row: T;
    index: number;
}>;
export declare function mergeOptions<T, K>(defaults: T, config: K): T & K;
export declare function parseWidth(width: number | string): number | string;
export declare function parseMinWidth(minWidth: number | string): number | string;
export declare function parseHeight(height: number | string): string | number | null;
export declare function compose(...funcs: any[]): any;
export declare function toggleRowStatus<T>(statusArr: T[], row: T, newVal: boolean): boolean;
export declare function walkTreeNode(root: any, cb: any, childrenKey?: string, lazyKey?: string): void;
export declare let removePopper: RemovePopperFn | null;
export declare function createTablePopper(props: TableOverflowTooltipOptions, popperContent: string, trigger: HTMLElement, table: Table<[]>): void;
export declare const isFixedColumn: <T>(index: number, fixed: string | boolean, store: any, realColumns?: TableColumnCtx<T>[] | undefined) => {
    direction: any;
    start: number;
    after: number;
} | {
    direction?: undefined;
    start?: undefined;
    after?: undefined;
};
export declare const getFixedColumnsClass: <T>(namespace: string, index: number, fixed: string | boolean, store: any, realColumns?: TableColumnCtx<T>[] | undefined, offset?: number) => string[];
export declare const getFixedColumnOffset: <T>(index: number, fixed: string | boolean, store: any, realColumns?: TableColumnCtx<T>[] | undefined) => any;
export declare const ensurePosition: (style: any, key: string) => void;
export {};
