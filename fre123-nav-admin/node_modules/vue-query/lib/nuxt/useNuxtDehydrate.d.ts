import type { QueryClient } from "vue-query";
export declare function useNuxtDehydrate(ssrContext: {
    nuxt: Record<string, unknown>;
}, queryClient: QueryClient): void;
