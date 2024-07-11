import type { Ref } from 'vue';
import type { NuxtDevtoolsHostClient } from '../types';
/**
 * Get Nuxt DevTools client for host app
 *
 * Returns undefined if not in development mode or the devtools is not enabled
 */
export declare function useNuxtDevTools(): Ref<NuxtDevtoolsHostClient | undefined>;
