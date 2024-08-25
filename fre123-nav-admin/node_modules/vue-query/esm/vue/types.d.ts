import type { QueryKey, QueryObserverOptions, InfiniteQueryObserverOptions } from "react-query/types/core";
import { Ref, UnwrapRef } from "vue-demi";
export declare type MaybeRef<T> = Ref<T> | T;
export declare type MaybeRefDeep<T> = T extends Function ? T : MaybeRef<T extends object ? {
    [Property in keyof T]: MaybeRefDeep<T[Property]>;
} : T>;
export declare type WithQueryClientKey<T> = T & {
    queryClientKey?: string;
};
export declare type VueQueryObserverOptions<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = {
    [Property in keyof QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>]: Property extends "queryFn" ? QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, UnwrapRef<TQueryKey>>[Property] : MaybeRef<QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>[Property]>;
};
export declare type VueInfiniteQueryObserverOptions<TQueryFnData = unknown, TError = unknown, TData = unknown, TQueryData = unknown, TQueryKey extends QueryKey = QueryKey> = {
    [Property in keyof InfiniteQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>]: Property extends "queryFn" ? InfiniteQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, UnwrapRef<TQueryKey>>[Property] : MaybeRef<InfiniteQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>[Property]>;
};
