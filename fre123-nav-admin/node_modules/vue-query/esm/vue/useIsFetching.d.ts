import { Ref } from "vue-demi";
import type { QueryKey } from "react-query/types/core";
import type { QueryFilters as QF } from "react-query/types/core/utils";
import type { WithQueryClientKey } from "./types";
export declare type QueryFilters = WithQueryClientKey<QF>;
export declare function useIsFetching(filters?: QueryFilters): Ref<number>;
export declare function useIsFetching(queryKey?: QueryKey, filters?: QueryFilters): Ref<number>;
