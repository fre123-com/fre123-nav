import { $ as $Fetch } from './shared/ofetch.8459ad38.cjs';
export { F as FetchError, c as createFetch, a as createFetchError } from './shared/ofetch.8459ad38.cjs';

declare function createNodeFetch(): (input: RequestInfo, init?: RequestInit) => any;
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

export { $fetch, AbortController, Headers, createNodeFetch, fetch, ofetch };
