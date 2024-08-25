"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripAnsi = exports.rightAlign = exports.leftAlign = exports.getColor = exports.default = exports.colors = exports.colorize = exports.centerAlign = exports.box = exports.align = void 0;
const _colorize = String;
const colorize = (color, str) => _colorize(str);
exports.colorize = colorize;
const getColor = (color, fallback) => () => _colorize(color);
exports.getColor = getColor;
const stripAnsi = str => str;
exports.stripAnsi = stripAnsi;
const box = (str, opts) => str;
exports.box = box;
const align = (alignment, str, len, space) => str;
exports.align = align;
const leftAlign = (str, len, space) => str;
exports.leftAlign = leftAlign;
const rightAlign = (str, len, space) => str;
exports.rightAlign = rightAlign;
const centerAlign = (str, len, space) => str;
exports.centerAlign = centerAlign;
const colors = exports.colors = new Proxy({}, {
  get(_, colorName) {
    return _colorize;
  }
});
module.exports = {
  colorize,
  getColor,
  stripAnsi,
  align,
  leftAlign,
  rightAlign,
  centerAlign,
  box,
  colors
};