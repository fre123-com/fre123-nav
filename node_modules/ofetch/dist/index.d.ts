import { $ as $Fetch } from './shared/ofetch.441891d5.js';
export { C as CreateFetchOptions, b as FetchContext, e as FetchError, c as FetchOptions, F as FetchRequest, a as FetchResponse, I as IFetchError, S as SearchParameters, d as createFetch, f as createFetchError } from './shared/ofetch.441891d5.js';

declare const fetch: typeof globalThis.fetch;
declare const Headers: {
    new (init?: HeadersInit | undefined): Headers;
    prototype: Headers;
};
declare const AbortController: {
    new (): AbortController;
    prototype: AbortController;
};
declare const ofetch: $Fetch;
declare const $fetch: $Fetch;

export { $Fetch, $fetch, AbortController, Headers, fetch, ofetch };
