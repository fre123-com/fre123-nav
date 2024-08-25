'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const HeaderCell = (props, {
  slots
}) => vue.renderSlot(slots, "default", props, () => {
  var _a, _b;
  return [vue.createVNode("div", {
    "class": props.class,
    "title": (_a = props.column) == null ? void 0 : _a.title
  }, [(_b = props.column) == null ? void 0 : _b.title])];
});
HeaderCell.displayName = "ElTableV2HeaderCell";
HeaderCell.inheritAttrs = false;

exports["default"] = HeaderCell;
//# sourceMappingURL=header-cell.js.map
