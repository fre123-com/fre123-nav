import * as vite from 'vite';
import { Nuxt, ViteConfig, NuxtBuilder } from '@nuxt/schema';

interface ViteBuildContext {
    nuxt: Nuxt;
    config: ViteConfig;
    entry: string;
    clientServer?: vite.ViteDevServer;
    ssrServer?: vite.ViteDevServer;
}
declare const bundle: NuxtBuilder['bundle'];

export { type ViteBuildContext, bundle };
