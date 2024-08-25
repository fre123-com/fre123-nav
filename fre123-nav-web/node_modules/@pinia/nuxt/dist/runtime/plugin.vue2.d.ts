declare const _default: (context: any, inject: any) => void;
export default _default;
declare module 'pinia' {
    interface PiniaCustomProperties {
        /**
         * Nuxt context. Requires you to install `@nuxt/types` to have types.
         *
         * @deprecated use `useNuxtApp()` and global `$fetch()` instead. See
         * https://v3.nuxtjs.org/bridge/bridge-composition-api/
         */
        $nuxt: import('@nuxt/types').Context;
    }
}
