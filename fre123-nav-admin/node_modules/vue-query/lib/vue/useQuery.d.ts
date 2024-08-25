import type { UnwrapRef } from "vue-demi";
import type { QueryFunction, QueryKey } from "react-query/types/core";
import { UseQueryReturnType } from "./useBaseQuery";
import type { WithQueryClientKey, VueQueryObserverOptions } from "./types";
export declare type UseQueryOptions<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = WithQueryClientKey<VueQueryObserverOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryReturnType<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey">): UseQueryReturnType<TData, TError>;
export declare function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, UnwrapRef<TQueryKey>>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn">): UseQueryReturnType<TData, TError>;
