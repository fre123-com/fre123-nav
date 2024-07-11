// src/index.ts
import MagicStringBase from "magic-string";
export * from "magic-string";
var MagicString = class extends MagicStringBase {
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
      return new MagicStringBase("", {
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
export {
  MagicString,
  MagicStringBase,
  generateTransform
};
