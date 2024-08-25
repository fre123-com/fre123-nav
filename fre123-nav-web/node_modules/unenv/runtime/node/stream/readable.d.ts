/// <reference types="node" />
/// <reference types="node" />
import type * as stream from "node:stream";
import type { BufferEncoding, Callback } from "../../_internal/types";
import { EventEmitter } from "../events";
interface ArrayOptions {
    /** the maximum concurrent invocations of `fn` to call on the stream at once. **Default: 1**. */
    concurrency?: number;
    /** allows destroying the stream if the signal is aborted. */
    signal?: AbortSignal;
}
export declare class _Readable extends EventEmitter implements stream.Readable {
    __unenv__: unknown;
    readonly readableEncoding: BufferEncoding | null;
    readonly readableEnded: boolean;
    readonly readableFlowing: boolean | null;
    readonly readableHighWaterMark: number;
    readonly readableLength: number;
    readonly readableObjectMode: boolean;
    readonly readableAborted: boolean;
    readonly readableDidRead: boolean;
    readonly closed: boolean;
    readonly errored: Error | null;
    readable: boolean;
    destroyed: boolean;
    static from(_iterable: Iterable<any> | AsyncIterable<any>, options?: stream.ReadableOptions): _Readable;
    constructor(_opts?: stream.ReadableOptions);
    _read(_size: number): void;
    read(_size?: number): void;
    setEncoding(_encoding: BufferEncoding): this;
    pause(): this;
    resume(): this;
    isPaused(): boolean;
    unpipe(_destination?: any): this;
    unshift(_chunk: any, _encoding?: BufferEncoding): void;
    wrap(_oldStream: any): this;
    push(_chunk: any, _encoding?: BufferEncoding): boolean;
    _destroy(_error?: any, _callback?: Callback<any>): void;
    destroy(error?: Error): this;
    pipe<T>(_destenition: T, _options?: {
        end?: boolean;
    }): T;
    compose<T extends NodeJS.ReadableStream>(stream: T | ((source: any) => void) | Iterable<T> | AsyncIterable<T>, options?: {
        signal: AbortSignal;
    } | undefined): T;
    [Symbol.asyncDispose](): Promise<void>;
    [Symbol.asyncIterator](): AsyncIterableIterator<any>;
    iterator(options?: {
        destroyOnReturn?: boolean | undefined;
    } | undefined): AsyncIterableIterator<any>;
    map(fn: (data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => any, options?: ArrayOptions | undefined): stream.Readable;
    filter(fn: (data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => boolean, options?: ArrayOptions | undefined): stream.Readable;
    forEach(fn: (data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => void | Promise<void>, options?: ArrayOptions | undefined): Promise<void>;
    reduce(fn: (accumulator: any, data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => any, initialValue?: any, options?: ArrayOptions | undefined): Promise<any>;
    find(fn: (data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => boolean, options?: ArrayOptions | undefined): Promise<any>;
    findIndex(fn: (data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => boolean, options?: ArrayOptions | undefined): Promise<number>;
    some(fn: (data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => boolean, options?: ArrayOptions | undefined): Promise<boolean>;
    toArray(options?: Pick<ArrayOptions, "signal"> | undefined): Promise<any[]>;
    every(fn: (data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => boolean | Promise<boolean>, options?: ArrayOptions | undefined): Promise<boolean>;
    flatMap(fn: (data: any, options?: Pick<ArrayOptions, "signal"> | undefined) => any, options?: ArrayOptions | undefined): stream.Readable;
    drop(limit: number, options?: Pick<ArrayOptions, "signal"> | undefined): stream.Readable;
    take(limit: number, options?: Pick<ArrayOptions, "signal"> | undefined): stream.Readable;
    asIndexedPairs(options?: Pick<ArrayOptions, "signal"> | undefined): stream.Readable;
}
export declare const Readable: typeof stream.Readable;
export {};
