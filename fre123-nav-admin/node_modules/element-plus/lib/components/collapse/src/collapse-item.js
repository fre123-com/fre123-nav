'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const collapseItemProps = runtime.buildProps({
  title: {
    type: String,
    default: ""
  },
  name: {
    type: runtime.definePropType([String, Number]),
    default: void 0
  },
  disabled: Boolean
});

exports.collapseItemProps = collapseItemProps;
//# sourceMappingURL=collapse-item.js.map
