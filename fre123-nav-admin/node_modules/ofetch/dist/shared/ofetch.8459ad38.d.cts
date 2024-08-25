interface $Fetch {
    <T = any, R extends ResponseType = "json">(request: FetchRequest, options?: FetchOptions<R>): Promise<MappedResponseType<R, T>>;
    raw<T = any, R extends ResponseType = "json">(request: FetchRequest, options?: FetchOptions<R>): Promise<FetchResponse<MappedResponseType<R, T>>>;
    native: Fetch;
    create(defaults: FetchOptions): $Fetch;
}
interface FetchContext<T = any, R extends ResponseType = ResponseType> {
    request: FetchRequest;
    options: FetchOptions<R>;
    response?: FetchResponse<T>;
    error?: Error;
}
interface FetchOptions<R extends ResponseType = ResponseType> extends Omit<RequestInit, "body"> {
    baseURL?: string;
    body?: RequestInit["body"] | Record<string, any>;
    ignoreResponseError?: boolean;
    params?: Record<string, any>;
    query?: Record<string, any>;
    parseResponse?: (responseText: string) => any;
    responseType?: R;
    /**
     * @experimental Set to "half" to enable duplex streaming.
     * Will be automatically set to "half" when using a ReadableStream as body.
     * https://fetch.spec.whatwg.org/#enumdef-requestduplex
     */
    duplex?: "half" | undefined;
    /** timeout in milliseconds */
    timeout?: number;
    retry?: number | false;
    /** Delay between retries in milliseconds. */
    retryDelay?: number;
    /** Default is [408, 409, 425, 429, 500, 502, 503, 504] */
    retryStatusCodes?: number[];
    onRequest?(context: FetchContext): Promise<void> | void;
    onRequestError?(context: FetchContext & {
        error: Error;
    }): Promise<void> | void;
    onResponse?(context: FetchContext & {
        response: FetchResponse<R>;
    }): Promise<void> | void;
    onResponseError?(context: FetchContext & {
        response: FetchResponse<R>;
    }): Promise<void> | void;
}
interface CreateFetchOptions {
    defaults?: FetchOptions;
    fetch?: Fetch;
    Headers?: typeof Headers;
    AbortController?: typeof AbortController;
}
type GlobalOptions = Pick<FetchOptions, "timeout" | "retry" | "retryDelay">;
interface ResponseMap {
    blob: Blob;
    text: string;
    arrayBuffer: ArrayBuffer;
    stream: ReadableStream<Uint8Array>;
}
type ResponseType = keyof ResponseMap | "json";
type MappedResponseType<R extends ResponseType, JsonType = any> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;
interface FetchResponse<T> extends Response {
    _data?: T;
}
interface IFetchError<T = any> extends Error {
    request?: FetchRequest;
    options?: FetchOptions;
    response?: FetchResponse<T>;
    data?: T;
    status?: number;
    statusText?: string;
    statusCode?: number;
    statusMessage?: string;
}
type Fetch = typeof globalThis.fetch;
type FetchRequest = RequestInfo;
interface SearchParameters {
    [key: string]: any;
}

declare function createFetch(globalOptions?: CreateFetchOptions): $Fetch;

declare class FetchError<T = any> extends Error implements IFetchError<T> {
    constructor(message: string, opts?: {
        cause: unknown;
    });
}
interface FetchError<T = any> extends IFetchError<T> {
}
declare function createFetchError<T = any>(ctx: FetchContext<T>): IFetchError<T>;

export { type $Fetch as $, type CreateFetchOptions as C, FetchError as F, type GlobalOptions as G, type IFetchError as I, type MappedResponseType as M, type ResponseMap as R, type SearchParameters as S, createFetchError as a, type FetchContext as b, createFetch as c, type FetchOptions as d, type ResponseType as e, type FetchResponse as f, type Fetch as g, type FetchRequest as h };
