"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.builder = void 0;
const is_promise_1 = __importDefault(require("is-promise"));
const consts_js_1 = require("./consts.js");
const augmentResponse = (response) => {
    if (!response) {
        return response;
    }
    const metadata = { version: consts_js_1.METADATA_VERSION, builder_function: consts_js_1.BUILDER_FUNCTIONS_FLAG, ttl: response.ttl || 0 };
    return {
        ...response,
        metadata,
    };
};
const wrapHandler = (handler) => 
// eslint-disable-next-line promise/prefer-await-to-callbacks
(event, context, callback) => {
    if (event.httpMethod !== 'GET' && event.httpMethod !== 'HEAD') {
        return Promise.resolve({
            body: 'Method Not Allowed',
            statusCode: consts_js_1.HTTP_STATUS_METHOD_NOT_ALLOWED,
        });
    }
    // Removing query string parameters from the builder function.
    const modifiedEvent = {
        ...event,
        multiValueQueryStringParameters: {},
        queryStringParameters: {},
    };
    const wrappedCallback = (error, response) => 
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    callback ? callback(error, augmentResponse(response)) : null;
    const execution = handler(modifiedEvent, context, wrappedCallback);
    if ((0, is_promise_1.default)(execution)) {
        // eslint-disable-next-line promise/prefer-await-to-then
        return execution.then(augmentResponse);
    }
    return execution;
};
exports.builder = wrapHandler;
