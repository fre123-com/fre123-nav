/// <reference types="node" />
import type http from "node:http";
import { Socket } from "../net/socket";
import { Readable } from "../stream/readable";
export declare class IncomingMessage extends Readable implements http.IncomingMessage {
    __unenv__: {};
    aborted: boolean;
    httpVersion: string;
    httpVersionMajor: number;
    httpVersionMinor: number;
    complete: boolean;
    connection: Socket;
    socket: Socket;
    headers: http.IncomingHttpHeaders;
    trailers: {};
    method: string;
    url: string;
    statusCode: number;
    statusMessage: string;
    closed: boolean;
    errored: Error | null;
    readable: boolean;
    constructor(socket?: Socket);
    get rawHeaders(): never[];
    get rawTrailers(): never[];
    setTimeout(_msecs: number, _callback?: () => void): this;
    get headersDistinct(): Record<string, string[]>;
    get trailersDistinct(): Record<string, string[]>;
}
