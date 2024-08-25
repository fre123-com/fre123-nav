import { ToRefs, UnwrapRef } from "vue-demi";
import type { QueryObserver, QueryKey, QueryObserverResult } from "react-query/core";
import type { QueryFunction } from "react-query/types/core";
import type { UseQueryOptions } from "./useQuery";
import type { UseInfiniteQueryOptions } from "./useInfiniteQuery";
export declare type UseQueryReturnType<TData, TError, Result = QueryObserverResult<TData, TError>> = ToRefs<Readonly<Result>> & {
    suspense: () => Promise<Result>;
};
declare type UseQueryOptionsGeneric<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> | UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
export declare function useBaseQuery<TQueryFnData, TError, TData, TQueryData, TQueryKey extends QueryKey>(Observer: typeof QueryObserver, arg1: TQueryKey | UseQueryOptionsGeneric<TQueryFnData, TError, TData, TQueryKey>, arg2?: QueryFunction<TQueryFnData, UnwrapRef<TQueryKey>> | UseQueryOptionsGeneric<TQueryFnData, TError, TData, TQueryKey>, arg3?: UseQueryOptionsGeneric<TQueryFnData, TError, TData, TQueryKey>): UseQueryReturnType<TData, TError>;
export {};
