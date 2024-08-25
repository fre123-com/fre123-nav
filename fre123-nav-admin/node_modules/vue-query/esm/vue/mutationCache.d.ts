import { MutationCache as MC } from "react-query/core";
import type { Mutation } from "react-query/core";
import type { MutationFilters } from "react-query/types/core/utils";
import type { MaybeRefDeep } from "./types";
export declare class MutationCache extends MC {
    find<TData = unknown, TError = unknown, TVariables = any, TContext = unknown>(filters: MaybeRefDeep<MutationFilters>): Mutation<TData, TError, TVariables, TContext> | undefined;
    findAll(filters: MaybeRefDeep<MutationFilters>): Mutation[];
}
