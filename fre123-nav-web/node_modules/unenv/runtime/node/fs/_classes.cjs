"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteStream = exports.StatsFs = exports.Stats = exports.ReadStream = exports.FileWriteStream = exports.FileReadStream = exports.Dirent = exports.Dir = void 0;
var _proxy = _interopRequireDefault(require("../../mock/proxy.cjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Dir = exports.Dir = _proxy.default.__createMock__("fs.Dir");
const Dirent = exports.Dirent = _proxy.default.__createMock__("fs.Dirent");
const Stats = exports.Stats = _proxy.default.__createMock__("fs.Stats");
const ReadStream = exports.ReadStream = _proxy.default.__createMock__("fs.ReadStream");
const WriteStream = exports.WriteStream = _proxy.default.__createMock__("fs.WriteStream");
const FileReadStream = exports.FileReadStream = _proxy.default.__createMock__("fs.FileReadStream");
const FileWriteStream = exports.FileWriteStream = _proxy.default.__createMock__("fs.FileWriteStream");
const StatsFs = exports.StatsFs = _proxy.default.__createMock__("fs.StatsFs");