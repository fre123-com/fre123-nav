"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = exports.syncBuiltinESMExports = exports.runMain = exports.register = exports.isBuiltin = exports.findSourceMap = exports.default = exports.createRequire = exports.builtinModules = exports.SourceMap = exports.Module = void 0;
var _utils = require("../../_internal/utils.cjs");
const builtinModules = exports.builtinModules = [];
const createRequire = exports.createRequire = (0, _utils.notImplemented)("module.createRequire");
const runMain = exports.runMain = (0, _utils.notImplemented)("module.runMain");
const isBuiltin = exports.isBuiltin = (0, _utils.notImplemented)("module.isBuiltin");
const register = exports.register = (0, _utils.notImplemented)("module.register");
const syncBuiltinESMExports = exports.syncBuiltinESMExports = (0, _utils.notImplemented)("module.syncBuiltinESMExports");
const findSourceMap = exports.findSourceMap = (0, _utils.notImplemented)("module.syncBuiltinESMExports");
const wrap = exports.wrap = (0, _utils.notImplemented)("module.wrap");
const Module = exports.Module = (0, _utils.notImplementedClass)("module.Module");
const SourceMap = exports.SourceMap = (0, _utils.notImplementedClass)("module.SourceMap");
module.exports = {
  Module,
  SourceMap,
  builtinModules,
  createRequire,
  runMain,
  wrap,
  isBuiltin,
  register,
  syncBuiltinESMExports,
  findSourceMap
};