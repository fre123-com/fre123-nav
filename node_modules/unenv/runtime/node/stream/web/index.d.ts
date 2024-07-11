/// <reference types="node" />
import type * as stramWeb from "node:stream/web";
export declare const ReadableStream: {
    new (underlyingSource: UnderlyingByteSource, strategy?: {
        highWaterMark?: number | undefined;
    } | undefined): ReadableStream<Uint8Array>;
    new <R = any>(underlyingSource: UnderlyingDefaultSource<R>, strategy?: QueuingStrategy<R> | undefined): ReadableStream<R>;
    new <R_1 = any>(underlyingSource?: UnderlyingSource<R_1> | undefined, strategy?: QueuingStrategy<R_1> | undefined): ReadableStream<R_1>;
    prototype: ReadableStream<any>;
};
export declare const ReadableStreamDefaultReader: {
    new <R = any>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
    prototype: ReadableStreamDefaultReader<any>;
};
export declare const ReadableStreamBYOBReader: {
    new (stream: ReadableStream<any>): ReadableStreamBYOBReader;
    prototype: ReadableStreamBYOBReader;
};
export declare const ReadableStreamBYOBRequest: {
    new (): ReadableStreamBYOBRequest;
    prototype: ReadableStreamBYOBRequest;
};
export declare const ReadableByteStreamController: {
    new (): ReadableByteStreamController;
    prototype: ReadableByteStreamController;
};
export declare const ReadableStreamDefaultController: {
    new (): ReadableStreamDefaultController<any>;
    prototype: ReadableStreamDefaultController<any>;
};
export declare const TransformStream: {
    new <I = any, O = any>(transformer?: Transformer<I, O> | undefined, writableStrategy?: QueuingStrategy<I> | undefined, readableStrategy?: QueuingStrategy<O> | undefined): TransformStream<I, O>;
    prototype: TransformStream<any, any>;
};
export declare const TransformStreamDefaultController: {
    new (): TransformStreamDefaultController<any>;
    prototype: TransformStreamDefaultController<any>;
};
export declare const WritableStream: {
    new <W = any>(underlyingSink?: UnderlyingSink<W> | undefined, strategy?: QueuingStrategy<W> | undefined): WritableStream<W>;
    prototype: WritableStream<any>;
};
export declare const WritableStreamDefaultWriter: {
    new <W = any>(stream: WritableStream<W>): WritableStreamDefaultWriter<W>;
    prototype: WritableStreamDefaultWriter<any>;
};
export declare const WritableStreamDefaultController: {
    new (): WritableStreamDefaultController;
    prototype: WritableStreamDefaultController;
};
export declare const ByteLengthQueuingStrategy: {
    new (init: QueuingStrategyInit): ByteLengthQueuingStrategy;
    prototype: ByteLengthQueuingStrategy;
};
export declare const CountQueuingStrategy: {
    new (init: QueuingStrategyInit): CountQueuingStrategy;
    prototype: CountQueuingStrategy;
};
export declare const TextEncoderStream: {
    new (): TextEncoderStream;
    prototype: TextEncoderStream;
};
export declare const TextDecoderStream: {
    new (label?: string | undefined, options?: TextDecoderOptions | undefined): TextDecoderStream;
    prototype: TextDecoderStream;
};
declare const _default: typeof stramWeb;
export default _default;
