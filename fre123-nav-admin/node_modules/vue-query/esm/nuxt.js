import { useContext } from '@nuxtjs/composition-api';
import { useQueryProvider, useQueryClient, hydrate, dehydrate } from 'vue-query';

function useNuxtQueryProvider(config) {
    if (config === void 0) { config = {}; }
    useQueryProvider(config);
    // @ts-expect-error Nuxt.js injected client property
    if (process.client) {
        var nuxtState = useContext().nuxtState;
        if (nuxtState.vueQueryState) {
            var queryClient = useQueryClient();
            hydrate(queryClient, nuxtState.vueQueryState);
        }
    }
}

function useNuxtDehydrate(ssrContext, queryClient) {
    if (!ssrContext || !ssrContext.nuxt) {
        throw new Error("Please provide `ssrContext` from nuxt `useContext` hook as a first parameter to `useNuxtDehydrate`");
    }
    else {
        ssrContext.nuxt.vueQueryState = dehydrate(queryClient);
    }
}

export { useNuxtDehydrate, useNuxtQueryProvider };
//# sourceMappingURL=nuxt.js.map
