'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compositionApi = require('@nuxtjs/composition-api');
var vueQuery = require('vue-query');

function useNuxtQueryProvider(config) {
    if (config === void 0) { config = {}; }
    vueQuery.useQueryProvider(config);
    // @ts-expect-error Nuxt.js injected client property
    if (process.client) {
        var nuxtState = compositionApi.useContext().nuxtState;
        if (nuxtState.vueQueryState) {
            var queryClient = vueQuery.useQueryClient();
            vueQuery.hydrate(queryClient, nuxtState.vueQueryState);
        }
    }
}

function useNuxtDehydrate(ssrContext, queryClient) {
    if (!ssrContext || !ssrContext.nuxt) {
        throw new Error("Please provide `ssrContext` from nuxt `useContext` hook as a first parameter to `useNuxtDehydrate`");
    }
    else {
        ssrContext.nuxt.vueQueryState = vueQuery.dehydrate(queryClient);
    }
}

exports.useNuxtDehydrate = useNuxtDehydrate;
exports.useNuxtQueryProvider = useNuxtQueryProvider;
//# sourceMappingURL=nuxt.js.map
