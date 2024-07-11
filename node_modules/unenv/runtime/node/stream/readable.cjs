"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._Readable = exports.Readable = void 0;
var _utils = require("../../_internal/utils.cjs");
var _events = require("../events/index.cjs");
class _Readable extends _events.EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {}
  read(_size) {}
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {}
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    throw (0, _utils.createNotImplementedError)("Readable.asyncIterator");
  }
  iterator(options) {
    throw (0, _utils.createNotImplementedError)("Readable.iterator");
  }
  map(fn, options) {
    throw (0, _utils.createNotImplementedError)("Readable.map");
  }
  filter(fn, options) {
    throw (0, _utils.createNotImplementedError)("Readable.filter");
  }
  forEach(fn, options) {
    throw (0, _utils.createNotImplementedError)("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw (0, _utils.createNotImplementedError)("Readable.reduce");
  }
  find(fn, options) {
    throw (0, _utils.createNotImplementedError)("Readable.find");
  }
  findIndex(fn, options) {
    throw (0, _utils.createNotImplementedError)("Readable.findIndex");
  }
  some(fn, options) {
    throw (0, _utils.createNotImplementedError)("Readable.some");
  }
  toArray(options) {
    throw (0, _utils.createNotImplementedError)("Readable.toArray");
  }
  every(fn, options) {
    throw (0, _utils.createNotImplementedError)("Readable.every");
  }
  flatMap(fn, options) {
    throw (0, _utils.createNotImplementedError)("Readable.flatMap");
  }
  drop(limit, options) {
    throw (0, _utils.createNotImplementedError)("Readable.drop");
  }
  take(limit, options) {
    throw (0, _utils.createNotImplementedError)("Readable.take");
  }
  asIndexedPairs(options) {
    throw (0, _utils.createNotImplementedError)("Readable.asIndexedPairs");
  }
}
exports._Readable = _Readable;
const Readable = exports.Readable = globalThis.Readable || _Readable;