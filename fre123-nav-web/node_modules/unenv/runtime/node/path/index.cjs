"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  posix: true,
  win32: true,
  platform: true
};
exports.win32 = exports.posix = exports.platform = exports.default = void 0;
var _path = _interopRequireWildcard(require("pathe"));
Object.keys(_path).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _path[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _path[key];
    }
  });
});
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const _pathModule = {
  ..._path,
  platform: "posix",
  posix: void 0,
  win32: void 0
};
_pathModule.posix = _pathModule;
_pathModule.win32 = _pathModule;
const posix = exports.posix = _pathModule;
const win32 = exports.win32 = _pathModule;
const platform = exports.platform = "posix";
module.exports = _pathModule;