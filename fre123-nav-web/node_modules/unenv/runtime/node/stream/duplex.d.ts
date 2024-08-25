/// <reference types="node" />
import type * as stream from "node:stream";
type DuplexClass = new () => stream.Duplex;
export declare const _Duplex: DuplexClass;
export declare const Duplex: typeof stream.Duplex;
export {};
