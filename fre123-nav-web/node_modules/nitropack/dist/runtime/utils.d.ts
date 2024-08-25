/// <reference types="node" />
/// <reference types="node" />
import type { Readable } from "node:stream";
import type { H3Event } from "h3";
export declare function requestHasBody(request: globalThis.Request): boolean;
export declare function useRequestBody(request: globalThis.Request): Promise<any>;
export declare function hasReqHeader(event: H3Event, name: string, includes: string): boolean | "" | undefined;
export declare function isJsonRequest(event: H3Event): boolean;
export declare function normalizeError(error: any): {
    stack: {
        text: string;
        internal: boolean;
    }[];
    statusCode: any;
    statusMessage: any;
    message: any;
};
export declare function trapUnhandledNodeErrors(): void;
export declare function joinHeaders(value: number | string | string[]): string;
export declare function normalizeFetchResponse(response: Response): Response;
export declare function normalizeCookieHeader(header?: number | string | string[]): string[];
export declare function normalizeCookieHeaders(headers: Headers): Headers;
export declare function toBuffer(data: ReadableStream | Readable | Uint8Array): Buffer | Promise<Buffer>;
