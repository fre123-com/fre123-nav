export declare const fetch: (input: string | Request | URL, init?: RequestInit | undefined) => Promise<Response>;
export default fetch;
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
