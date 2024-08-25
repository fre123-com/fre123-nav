"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _globalThis = _interopRequireDefault(require("./global-this.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
try {
  const _defineOpts = {
    enumerable: false,
    value: _globalThis.default
  };
  Object.defineProperties(_globalThis.default, {
    self: _defineOpts,
    window: _defineOpts,
    global: _defineOpts
  });
} catch {}
module.exports = _globalThis.default;