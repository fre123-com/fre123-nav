export declare const fetch: {
    (input: string | Request | URL, init?: RequestInit | undefined): Promise<Response>;
    Promise: PromiseConstructor;
    isRedirect: (code: number) => boolean;
};
export declare const Headers: {
    new (init?: HeadersInit | undefined): Headers;
    prototype: Headers;
};
export declare const Request: {
    new (input: URL | RequestInfo, init?: RequestInit | undefined): Request;
    prototype: Request;
};
export declare const Response: {
    new (body?: BodyInit | null | undefined, init?: ResponseInit | undefined): Response;
    prototype: Response;
    error(): Response;
    json(data: any, init?: ResponseInit | undefined): Response;
    redirect(url: string | URL, status?: number | undefined): Response;
};
export declare const AbortController: {
    new (): AbortController;
    prototype: AbortController;
};
export declare const FetchError: ErrorConstructor;
export declare const AbortError: ErrorConstructor;
export declare const isRedirect: (code: number) => boolean;
export default fetch;
