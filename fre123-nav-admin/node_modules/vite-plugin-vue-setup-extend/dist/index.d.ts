import { Plugin } from 'vite';

interface ExtendOptions {
    /**
     * Turn on name extension
     * @default true
     */
    name?: boolean;
}
declare const _default: (options?: ExtendOptions) => Plugin;

export { ExtendOptions, _default as default };
