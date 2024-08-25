import { $ as $Fetch } from './shared/ofetch.8459ad38.js';
export { C as CreateFetchOptions, g as Fetch, b as FetchContext, F as FetchError, d as FetchOptions, h as FetchRequest, f as FetchResponse, G as GlobalOptions, I as IFetchError, M as MappedResponseType, R as ResponseMap, e as ResponseType, S as SearchParameters, c as createFetch, a as createFetchError } from './shared/ofetch.8459ad38.js';

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
