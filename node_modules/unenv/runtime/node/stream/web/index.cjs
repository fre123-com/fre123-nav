"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = exports.WritableStreamDefaultWriter = exports.WritableStreamDefaultController = exports.WritableStream = exports.TransformStreamDefaultController = exports.TransformStream = exports.TextEncoderStream = exports.TextDecoderStream = exports.ReadableStreamDefaultReader = exports.ReadableStreamDefaultController = exports.ReadableStreamBYOBRequest = exports.ReadableStreamBYOBReader = exports.ReadableStream = exports.ReadableByteStreamController = exports.CountQueuingStrategy = exports.ByteLengthQueuingStrategy = void 0;
var _utils = require("../../../_internal/utils.cjs");
const ReadableStream = exports.ReadableStream = globalThis.ReadableStream || (0, _utils.notImplemented)("stream.web.ReadableStream");
const ReadableStreamDefaultReader = exports.ReadableStreamDefaultReader = globalThis.ReadableStreamDefaultReader || (0, _utils.notImplemented)("stream.web.ReadableStreamDefaultReader");
const ReadableStreamBYOBReader = exports.ReadableStreamBYOBReader = globalThis.ReadableStreamBYOBReader || (0, _utils.notImplemented)("stream.web.ReadableStreamBYOBReader");
const ReadableStreamBYOBRequest = exports.ReadableStreamBYOBRequest = globalThis.ReadableStreamBYOBRequest || (0, _utils.notImplemented)("stream.web.ReadableStreamBYOBRequest");
const ReadableByteStreamController = exports.ReadableByteStreamController = globalThis.ReadableByteStreamController || (0, _utils.notImplemented)("stream.web.ReadableByteStreamController");
const ReadableStreamDefaultController = exports.ReadableStreamDefaultController = globalThis.ReadableStreamDefaultController || (0, _utils.notImplemented)("stream.web.ReadableStreamDefaultController");
const TransformStream = exports.TransformStream = globalThis.TransformStream || (0, _utils.notImplemented)("stream.web.TransformStream");
const TransformStreamDefaultController = exports.TransformStreamDefaultController = globalThis.TransformStreamDefaultController || (0, _utils.notImplemented)("stream.web.TransformStreamDefaultController");
const WritableStream = exports.WritableStream = globalThis.WritableStream || (0, _utils.notImplemented)("stream.web.WritableStream");
const WritableStreamDefaultWriter = exports.WritableStreamDefaultWriter = globalThis.WritableStreamDefaultWriter || (0, _utils.notImplemented)("stream.web.WritableStreamDefaultWriter");
const WritableStreamDefaultController = exports.WritableStreamDefaultController = globalThis.WritableStreamDefaultController || (0, _utils.notImplemented)("stream.web.WritableStreamDefaultController");
const ByteLengthQueuingStrategy = exports.ByteLengthQueuingStrategy = globalThis.ByteLengthQueuingStrategy || (0, _utils.notImplemented)("stream.web.ByteLengthQueuingStrategy");
const CountQueuingStrategy = exports.CountQueuingStrategy = globalThis.CountQueuingStrategy || (0, _utils.notImplemented)("stream.web.CountQueuingStrategy");
const TextEncoderStream = exports.TextEncoderStream = globalThis.TextEncoderStream || (0, _utils.notImplemented)("stream.web.TextEncoderStream");
const TextDecoderStream = exports.TextDecoderStream = globalThis.TextDecoderStream || (0, _utils.notImplemented)("stream.web.TextDecoderStream");
module.exports = {
  ReadableStream,
  ReadableStreamDefaultReader,
  ReadableStreamBYOBReader,
  ReadableStreamBYOBRequest,
  ReadableByteStreamController,
  ReadableStreamDefaultController,
  TransformStream,
  TransformStreamDefaultController,
  WritableStream,
  WritableStreamDefaultWriter,
  WritableStreamDefaultController,
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  TextEncoderStream,
  TextDecoderStream
};