"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consola = void 0;
exports.createConsola = createConsola;

var _core = require("consola/core");
const basicReporter = {
  log(logObj) {
    (console[logObj.type] || console.log)(...logObj.args);
  }
};
function createConsola(options = {}) {
  return (0, _core.createConsola)({
    reporters: [basicReporter],
    ...options
  });
}
const consola = exports.consola = createConsola();
consola.consola = consola;
module.exports = consola;