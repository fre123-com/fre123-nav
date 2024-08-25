"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  MagicString: () => MagicString,
  MagicStringBase: () => import_magic_string.default,
  generateTransform: () => generateTransform
});
module.exports = __toCommonJS(src_exports);
var import_magic_string = __toESM(require("magic-string"));
__reExport(src_exports, require("magic-string"), module.exports);
var MagicString = class extends import_magic_string.default {
  offset;
  constructor(str, options) {
    super(str, options);
    this.offset = options?.offset ?? 0;
  }
  getNodePos(nodes, offset) {
    const _offset = offset ?? this.offset;
    if (Array.isArray(nodes))
      return [_offset + nodes[0].start, _offset + nodes.at(-1).end];
    else
      return [_offset + nodes.start, _offset + nodes.end];
  }
  removeNode(node, { offset } = {}) {
    if (isEmptyNodes(node))
      return this;
    super.remove(...this.getNodePos(node, offset));
    return this;
  }
  moveNode(node, index, { offset } = {}) {
    if (isEmptyNodes(node))
      return this;
    super.move(...this.getNodePos(node, offset), index);
    return this;
  }
  sliceNode(node, { offset } = {}) {
    if (isEmptyNodes(node))
      return "";
    return super.slice(...this.getNodePos(node, offset));
  }
  overwriteNode(node, content, { offset, ...options } = {}) {
    if (isEmptyNodes(node))
      return this;
    const _content = typeof content === "string" ? content : this.sliceNode(content);
    super.overwrite(...this.getNodePos(node, offset), _content, options);
    return this;
  }
  snipNode(node, { offset } = {}) {
    if (isEmptyNodes(node))
      return new import_magic_string.default("", {
        // @ts-expect-error
        filename: super.filename
      });
    return super.snip(...this.getNodePos(node, offset));
  }
};
function isEmptyNodes(nodes) {
  return Array.isArray(nodes) && nodes.length === 0;
}
function generateTransform(s, id) {
  if (s?.hasChanged()) {
    return {
      code: s.toString(),
      get map() {
        return s.generateMap({
          source: id,
          includeContent: true,
          hires: "boundary"
        });
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MagicString,
  MagicStringBase,
  generateTransform,
  ...require("magic-string")
});
