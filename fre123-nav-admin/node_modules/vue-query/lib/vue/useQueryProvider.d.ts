import type { QueryClientConfig } from "react-query/types/core";
import { QueryClient } from "./queryClient";
import { MaybeRefDeep } from "./types";
export declare function useQueryProvider(arg1?: MaybeRefDeep<QueryClientConfig> | QueryClient, id?: string): void;
