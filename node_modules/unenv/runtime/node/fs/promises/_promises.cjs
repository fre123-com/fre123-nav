"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chown = exports.chmod = exports.appendFile = exports.access = void 0;
Object.defineProperty(exports, "constants", {
  enumerable: true,
  get: function () {
    return _constants.constants;
  }
});
exports.writeFile = exports.watch = exports.utimes = exports.unlink = exports.truncate = exports.symlink = exports.statfs = exports.stat = exports.rmdir = exports.rm = exports.rename = exports.realpath = exports.readlink = exports.readdir = exports.readFile = exports.opendir = exports.open = exports.mkdtemp = exports.mkdir = exports.lutimes = exports.lstat = exports.link = exports.lchown = exports.lchmod = exports.default = exports.cp = exports.copyFile = void 0;
var _utils = require("../../../_internal/utils.cjs");
var _constants = require("../_constants.cjs");
const access = exports.access = (0, _utils.notImplemented)("fs.access");
const copyFile = exports.copyFile = (0, _utils.notImplemented)("fs.copyFile");
const cp = exports.cp = (0, _utils.notImplemented)("fs.cp");
const open = exports.open = (0, _utils.notImplemented)("fs.open");
const opendir = exports.opendir = (0, _utils.notImplemented)("fs.opendir");
const rename = exports.rename = (0, _utils.notImplemented)("fs.rename");
const truncate = exports.truncate = (0, _utils.notImplemented)("fs.truncate");
const rm = exports.rm = (0, _utils.notImplemented)("fs.rm");
const rmdir = exports.rmdir = (0, _utils.notImplemented)("fs.rmdir");
const mkdir = exports.mkdir = (0, _utils.notImplemented)("fs.mkdir");
const readdir = exports.readdir = (0, _utils.notImplemented)("fs.readdir");
const readlink = exports.readlink = (0, _utils.notImplemented)("fs.readlink");
const symlink = exports.symlink = (0, _utils.notImplemented)("fs.symlink");
const lstat = exports.lstat = (0, _utils.notImplemented)("fs.lstat");
const stat = exports.stat = (0, _utils.notImplemented)("fs.stat");
const link = exports.link = (0, _utils.notImplemented)("fs.link");
const unlink = exports.unlink = (0, _utils.notImplemented)("fs.unlink");
const chmod = exports.chmod = (0, _utils.notImplemented)("fs.chmod");
const lchmod = exports.lchmod = (0, _utils.notImplemented)("fs.lchmod");
const lchown = exports.lchown = (0, _utils.notImplemented)("fs.lchown");
const chown = exports.chown = (0, _utils.notImplemented)("fs.chown");
const utimes = exports.utimes = (0, _utils.notImplemented)("fs.utimes");
const lutimes = exports.lutimes = (0, _utils.notImplemented)("fs.lutimes");
const realpath = exports.realpath = (0, _utils.notImplemented)("fs.realpath");
const mkdtemp = exports.mkdtemp = (0, _utils.notImplemented)("fs.mkdtemp");
const writeFile = exports.writeFile = (0, _utils.notImplemented)("fs.writeFile");
const appendFile = exports.appendFile = (0, _utils.notImplemented)("fs.appendFile");
const readFile = exports.readFile = (0, _utils.notImplemented)("fs.readFile");
const watch = exports.watch = (0, _utils.notImplemented)("fs.watch");
const statfs = exports.statfs = (0, _utils.notImplemented)("fs.statfs");
module.exports = {};