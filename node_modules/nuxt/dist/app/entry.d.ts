import type { App } from 'vue';
import '#build/paths.mjs';
import '#build/fetch.mjs';
import type { CreateOptions } from './nuxt.js';
import '#build/css';
declare const _default: (ssrContext?: CreateOptions['ssrContext']) => Promise<App<Element>>;
export default _default;
