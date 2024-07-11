/// <reference types="node" />
import type { Handler, HandlerEvent, HandlerContext, StreamingHandler, StreamingResponse } from '../function/index.js';
declare global {
    namespace awslambda {
        function streamifyResponse(handler: (event: HandlerEvent, responseStream: NodeJS.WritableStream, context: HandlerContext) => Promise<void>): Handler;
        namespace HttpResponseStream {
            function from(stream: NodeJS.WritableStream, metadata: Omit<StreamingResponse, 'body'>): NodeJS.WritableStream;
        }
    }
}
/**
 * Enables streaming responses. `body` accepts a Node.js `Readable` stream or a WHATWG `ReadableStream`.
 *
 * @example
 * ```
 * const { Readable } = require('stream');
 *
 * export const handler = stream(async (event, context) => {
 *   const stream = Readable.from(Buffer.from(JSON.stringify(event)))
 *   return {
 *     statusCode: 200,
 *     body: stream,
 *   }
 * })
 * ```
 *
 * @example
 * ```
 * export const handler = stream(async (event, context) => {
 *   const response = await fetch('https://api.openai.com/', { ... })
 *   // ...
 *   return {
 *     statusCode: 200,
 *     body: response.body, // Web stream
 *   }
 * })
 * ```
 *
 * @param handler
 * @see https://ntl.fyi/streaming-func
 */
declare const stream: (handler: StreamingHandler) => Handler;
export { stream };
