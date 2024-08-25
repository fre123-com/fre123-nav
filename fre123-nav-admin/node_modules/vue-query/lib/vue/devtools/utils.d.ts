import type { Query } from "react-query/core";
declare type SortFn = (a: Query, b: Query) => number;
declare enum QueryState {
    Fetching = 0,
    Fresh = 1,
    Stale = 2,
    Inactive = 3
}
export declare function getQueryState(query: Query): QueryState;
export declare function getQueryStateLabel(query: Query): string;
export declare function getQueryStatusFg(query: Query): number;
export declare function getQueryStatusBg(query: Query): number;
export declare const sortFns: Record<string, SortFn>;
export {};
