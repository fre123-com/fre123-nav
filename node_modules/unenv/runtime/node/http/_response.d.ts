/// <reference types="node" />
/// <reference types="node" />
import type http from "node:http";
import type { Socket } from "node:net";
import { Callback } from "../../_internal/types";
import { Writable } from "../stream/writable";
export declare class ServerResponse extends Writable implements http.ServerResponse {
    readonly __unenv__ = true;
    statusCode: number;
    statusMessage: string;
    upgrading: boolean;
    chunkedEncoding: boolean;
    shouldKeepAlive: boolean;
    useChunkedEncodingByDefault: boolean;
    sendDate: boolean;
    finished: boolean;
    headersSent: boolean;
    strictContentLength: boolean;
    connection: Socket | null;
    socket: Socket | null;
    req: http.IncomingMessage;
    _headers: Record<string, number | string | string[] | undefined>;
    constructor(req: http.IncomingMessage);
    assignSocket(socket: Socket): void;
    _flush(): void;
    detachSocket(_socket: Socket): void;
    writeContinue(_callback?: Callback): void;
    writeHead(statusCode: number, arg1?: string | http.OutgoingHttpHeaders | http.OutgoingHttpHeader[], arg2?: http.OutgoingHttpHeaders | http.OutgoingHttpHeader[]): this;
    writeProcessing(): void;
    setTimeout(_msecs: number, _callback?: Callback): this;
    appendHeader(name: string, value: string | string[]): this;
    setHeader(name: string, value: number | string | string[]): this;
    getHeader(name: string): number | string | string[] | undefined;
    getHeaders(): http.OutgoingHttpHeaders;
    getHeaderNames(): string[];
    hasHeader(name: string): boolean;
    removeHeader(name: string): void;
    addTrailers(_headers: http.OutgoingHttpHeaders | ReadonlyArray<[string, string]>): void;
    flushHeaders(): void;
    writeEarlyHints(_headers: http.OutgoingHttpHeaders, cb: () => void): void;
}
