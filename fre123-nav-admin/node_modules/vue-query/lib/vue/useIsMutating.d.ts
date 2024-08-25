import { Ref } from "vue-demi";
import type { MutationKey } from "react-query/types/core";
import type { MutationFilters as MF } from "react-query/types/core/utils";
import type { WithQueryClientKey } from "./types";
export declare type MutationFilters = WithQueryClientKey<MF>;
export declare function useIsMutating(filters?: MutationFilters): Ref<number>;
export declare function useIsMutating(mutationKey?: MutationKey, filters?: Omit<MutationFilters, "mutationKey">): Ref<number>;
