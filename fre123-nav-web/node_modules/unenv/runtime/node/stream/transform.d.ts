/// <reference types="node" />
/// <reference types="node" />
import type * as stream from "node:stream";
import { Duplex } from "./duplex";
export declare class _Transform extends Duplex implements stream.Transform {
    readonly __unenv__ = true;
    _transform(chunk: any, encoding: globalThis.BufferEncoding, callback: stream.TransformCallback): void;
    _flush(callback: stream.TransformCallback): void;
}
export declare const Transform: typeof stream.Transform;
