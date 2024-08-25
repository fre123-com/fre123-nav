import type { Query } from "react-query/types/core";
import type { SortFn } from "./types";
import type { Theme } from "./useTheme";
export declare enum Position {
    TR = "top-right",
    TL = "top-left",
    BR = "bottom-right",
    BL = "bottom-left"
}
export declare enum QueryState {
    Fetching = 0,
    Fresh = 1,
    Stale = 2,
    Inactive = 3
}
export declare const QueryStateLabel: {
    0: string;
    1: string;
    2: string;
    3: string;
};
export declare function getQueryState(query: Query): QueryState;
export declare function getQueryStatusColor(query: Query, theme: Theme): string;
export declare function getQueryStatusLabel(query: Query): string;
export declare const getStatusRank: (query: Query) => number;
export declare const sortFns: Record<string, SortFn>;
export declare function makeArrayNonConfigurable(objects: Query[]): void;
