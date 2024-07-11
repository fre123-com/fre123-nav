/// <reference types="node" />
import type * as net from "node:net";
import { Callback, BufferEncoding } from "../../_internal/types";
import { Duplex } from "../stream/duplex";
export declare class Socket extends Duplex implements net.Socket {
    readonly __unenv__ = true;
    readonly bufferSize: number;
    readonly bytesRead: number;
    readonly bytesWritten: number;
    readonly connecting: boolean;
    readonly destroyed: boolean;
    readonly pending: boolean;
    readonly localAddress: string;
    readonly localPort: number;
    readonly remoteAddress?: string;
    readonly remoteFamily?: string;
    readonly remotePort?: number;
    readonly autoSelectFamilyAttemptedAddresses: never[];
    readonly readyState: net.SocketReadyState;
    constructor(_options?: net.SocketConstructorOpts);
    write(_buffer: Uint8Array | string, _arg1?: BufferEncoding | Callback<Error | undefined>, _arg2?: Callback<Error | undefined>): boolean;
    connect(_arg1: number | string | net.SocketConnectOpts, _arg2?: string | Callback, _arg3?: Callback): this;
    end(_arg1?: Callback | Uint8Array | string, _arg2?: BufferEncoding | Callback, _arg3?: Callback): this;
    setEncoding(_encoding?: BufferEncoding): this;
    pause(): this;
    resume(): this;
    setTimeout(_timeout: number, _callback?: Callback): this;
    setNoDelay(_noDelay?: boolean): this;
    setKeepAlive(_enable?: boolean, _initialDelay?: number): this;
    address(): {};
    unref(): this;
    ref(): this;
    destroySoon(): void;
    resetAndDestroy(): this;
}
export declare class SocketAddress implements net.SocketAddress {
    readonly __unenv__ = true;
    address: string;
    family: "ipv4" | "ipv6";
    port: number;
    flowlabel: number;
    constructor(options: net.SocketAddress);
}
