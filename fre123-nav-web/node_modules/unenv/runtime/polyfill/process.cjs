"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = _interopRequireDefault(require("../node/process/index.cjs"));
var _globalThis = _interopRequireDefault(require("./global-this.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_globalThis.default.process = _globalThis.default.process || _index.default;
module.exports = _globalThis.default.process;