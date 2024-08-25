"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = void 0;
const node_stream_1 = require("node:stream");
const node_util_1 = require("node:util");
// Node v14 doesn't have node:stream/promises
const pipeline = (0, node_util_1.promisify)(node_stream_1.pipeline);
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
const stream = (handler) => awslambda.streamifyResponse(async (event, responseStream, context) => {
    const { body, ...httpResponseMetadata } = await handler(event, context);
    const responseBody = awslambda.HttpResponseStream.from(responseStream, httpResponseMetadata);
    if (typeof body === 'undefined') {
        responseBody.end();
    }
    else if (typeof body === 'string') {
        responseBody.write(body);
        responseBody.end();
    }
    else {
        await pipeline(body, responseBody);
    }
});
exports.stream = stream;
