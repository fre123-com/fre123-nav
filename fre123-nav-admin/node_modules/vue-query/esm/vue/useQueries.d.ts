import { Ref } from "vue-demi";
import type { QueryFunction, QueryObserverResult } from "react-query/types/core";
import { UseQueryOptions } from "./useQuery";
declare type MAXIMUM_DEPTH = 20;
declare type GetOptions<T> = T extends {
    queryFnData: infer TQueryFnData;
    error?: infer TError;
    data: infer TData;
} ? UseQueryOptions<TQueryFnData, TError, TData> : T extends {
    queryFnData: infer TQueryFnData;
    error?: infer TError;
} ? UseQueryOptions<TQueryFnData, TError> : T extends {
    data: infer TData;
    error?: infer TError;
} ? UseQueryOptions<unknown, TError, TData> : T extends [infer TQueryFnData, infer TError, infer TData] ? UseQueryOptions<TQueryFnData, TError, TData> : T extends [infer TQueryFnData, infer TError] ? UseQueryOptions<TQueryFnData, TError> : T extends [infer TQueryFnData] ? UseQueryOptions<TQueryFnData> : T extends {
    queryFn?: QueryFunction<infer TQueryFnData, infer TQueryKey>;
    select: (data: any) => infer TData;
} ? UseQueryOptions<TQueryFnData, unknown, TData, TQueryKey> : T extends {
    queryFn?: QueryFunction<infer TQueryFnData, infer TQueryKey>;
} ? UseQueryOptions<TQueryFnData, unknown, TQueryFnData, TQueryKey> : UseQueryOptions;
declare type GetResults<T> = T extends {
    queryFnData: any;
    error?: infer TError;
    data: infer TData;
} ? QueryObserverResult<TData, TError> : T extends {
    queryFnData: infer TQueryFnData;
    error?: infer TError;
} ? QueryObserverResult<TQueryFnData, TError> : T extends {
    data: infer TData;
    error?: infer TError;
} ? QueryObserverResult<TData, TError> : T extends [any, infer TError, infer TData] ? QueryObserverResult<TData, TError> : T extends [infer TQueryFnData, infer TError] ? QueryObserverResult<TQueryFnData, TError> : T extends [infer TQueryFnData] ? QueryObserverResult<TQueryFnData> : T extends {
    queryFn?: QueryFunction<any, any>;
    select: (data: any) => infer TData;
} ? QueryObserverResult<TData> : T extends {
    queryFn?: QueryFunction<infer TQueryFnData, any>;
} ? QueryObserverResult<TQueryFnData> : QueryObserverResult;
/**
 * UseQueriesOptions reducer recursively unwraps function arguments to infer/enforce type param
 */
export declare type UseQueriesOptions<T extends any[], Result extends any[] = [], Depth extends ReadonlyArray<number> = []> = Depth["length"] extends MAXIMUM_DEPTH ? UseQueryOptions[] : T extends [] ? [] : T extends [infer Head] ? [...Result, GetOptions<Head>] : T extends [infer Head, ...infer Tail] ? UseQueriesOptions<[...Tail], [...Result, GetOptions<Head>], [...Depth, 1]> : unknown[] extends T ? T : T extends UseQueryOptions<infer TQueryFnData, infer TError, infer TData, infer TQueryKey>[] ? UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>[] : UseQueryOptions[];
/**
 * UseQueriesResults reducer recursively maps type param to results
 */
export declare type UseQueriesResults<T extends any[], Result extends any[] = [], Depth extends ReadonlyArray<number> = []> = Depth["length"] extends MAXIMUM_DEPTH ? QueryObserverResult[] : T extends [] ? [] : T extends [infer Head] ? [...Result, GetResults<Head>] : T extends [infer Head, ...infer Tail] ? UseQueriesResults<[...Tail], [...Result, GetResults<Head>], [...Depth, 1]> : T extends UseQueryOptions<infer TQueryFnData, infer TError, infer TData, any>[] ? QueryObserverResult<unknown extends TData ? TQueryFnData : TData, TError>[] : QueryObserverResult[];
declare type UseQueriesOptionsArg<T extends any[]> = readonly [...UseQueriesOptions<T>];
export declare function useQueries<T extends any[]>(queries: Ref<UseQueriesOptionsArg<T>> | UseQueriesOptionsArg<T>): Readonly<UseQueriesResults<T>>;
export {};
