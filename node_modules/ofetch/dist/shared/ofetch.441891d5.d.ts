type Fetch = typeof globalThis.fetch;
type RequestInfo = globalThis.RequestInfo;
type RequestInit = globalThis.RequestInit;
type Response = globalThis.Response;

interface ResponseMap {
    blob: Blob;
    text: string;
    arrayBuffer: ArrayBuffer;
    stream: ReadableStream<Uint8Array>;
}
type ResponseType = keyof ResponseMap | "json";
type MappedType<R extends ResponseType, JsonType = any> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;

interface CreateFetchOptions {
    defaults?: FetchOptions;
    fetch?: Fetch;
    Headers?: typeof Headers;
    AbortController?: typeof AbortController;
}
type FetchRequest = RequestInfo;
interface FetchResponse<T> extends Response {
    _data?: T;
}
interface SearchParameters {
    [key: string]: any;
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
    params?: SearchParameters;
    query?: SearchParameters;
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
interface $Fetch {
    <T = any, R extends ResponseType = "json">(request: FetchRequest, options?: FetchOptions<R>): Promise<MappedType<R, T>>;
    raw<T = any, R extends ResponseType = "json">(request: FetchRequest, options?: FetchOptions<R>): Promise<FetchResponse<MappedType<R, T>>>;
    native: Fetch;
    create(defaults: FetchOptions): $Fetch;
}
declare function createFetch(globalOptions?: CreateFetchOptions): $Fetch;

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
declare class FetchError<T = any> extends Error implements IFetchError<T> {
    constructor(message: string, opts?: {
        cause: unknown;
    });
}
interface FetchError<T = any> extends IFetchError<T> {
}
declare function createFetchError<T = any>(ctx: FetchContext<T>): IFetchError<T>;

export { type $Fetch as $, type CreateFetchOptions as C, type FetchRequest as F, type IFetchError as I, type SearchParameters as S, type FetchResponse as a, type FetchContext as b, type FetchOptions as c, createFetch as d, FetchError as e, createFetchError as f };
