"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subtle = exports.randomUUID = exports.getRandomValues = void 0;
const subtle = exports.subtle = globalThis.crypto?.subtle;
const randomUUID = () => {
  return globalThis.crypto?.randomUUID();
};
exports.randomUUID = randomUUID;
const getRandomValues = array => {
  return globalThis.crypto?.getRandomValues(array);
};
exports.getRandomValues = getRandomValues;