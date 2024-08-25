"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/options.ts
var options_exports = {};
__export(options_exports, {
  DEFAULT_OPTIONS: () => DEFAULT_OPTIONS,
  resolveOptions: () => resolveOptions
});
module.exports = __toCommonJS(options_exports);
var import_local_pkg = require("local-pkg");

// src/core/utils.ts
var import_scule = require("scule");
function warn(msg, type = "warn") {
  console[type](`\u26A0\uFE0F  [unplugin-vue-router]: ${msg}`);
}
var isArray = Array.isArray;
function getFileBasedRouteName(node) {
  if (!node.parent)
    return "";
  return getFileBasedRouteName(node.parent) + "/" + (node.value.rawSegment === "index" ? "" : node.value.rawSegment);
}

// src/options.ts
var import_pathe = require("pathe");
var DEFAULT_OPTIONS = {
  extensions: [".vue"],
  exclude: [],
  routesFolder: [{ src: "src/pages" }],
  filePatterns: "**/*",
  routeBlockLang: "json5",
  getRouteName: getFileBasedRouteName,
  dataFetching: false,
  importMode: "async",
  root: process.cwd(),
  dts: (0, import_local_pkg.isPackageExists)("typescript"),
  logs: false,
  _inspect: false,
  pathParser: {
    dotNesting: true
  }
};
function normalizeRoutesFolderOption(routesFolder) {
  return (isArray(routesFolder) ? routesFolder : [routesFolder]).map(
    (routeOption) => typeof routeOption === "string" ? { src: routeOption } : routeOption
  );
}
function resolveOptions(options) {
  const root = options.root || DEFAULT_OPTIONS.root;
  const routesFolder = normalizeRoutesFolderOption(
    options.routesFolder || DEFAULT_OPTIONS.routesFolder
  ).map((routeOption) => __spreadProps(__spreadValues({}, routeOption), {
    src: (0, import_pathe.resolve)(root, routeOption.src)
  }));
  if (options.extensions) {
    options.extensions = options.extensions.map((ext) => {
      if (!ext.startsWith(".")) {
        warn(`Invalid extension "${ext}". Extensions must start with a dot.`);
        return "." + ext;
      }
      return ext;
    }).sort((a, b) => b.length - a.length);
  }
  return __spreadProps(__spreadValues(__spreadValues({}, DEFAULT_OPTIONS), options), {
    routesFolder
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_OPTIONS,
  resolveOptions
});
