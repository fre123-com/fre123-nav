import type { Ref } from 'vue';
import type { Router } from 'vue-router';
import type { NuxtDevtoolsHostClient } from '../../../types';
declare const clientRef: import("vue").ShallowRef<NuxtDevtoolsHostClient | undefined>;
export { clientRef as client };
export type ColorScheme = 'dark' | 'light';
export declare function setupDevToolsClient({ nuxt, clientHooks, timeMetric, router, }: {
    nuxt: any;
    clientHooks: any;
    timeMetric: any;
    router: Router;
}): Promise<void>;
export declare function useClientColorMode(): Ref<ColorScheme>;
