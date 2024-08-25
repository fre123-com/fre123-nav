'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var shared = require('@vue/shared');
var core = require('@vueuse/core');
require('../../../hooks/index.js');
var token = require('./token.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    label: String,
    disabled: Boolean
  },
  setup(props) {
    const ns = index.useNamespace("select");
    const groupRef = vue.ref(null);
    const instance = vue.getCurrentInstance();
    const children = vue.ref([]);
    vue.provide(token.selectGroupKey, vue.reactive({
      ...vue.toRefs(props)
    }));
    const visible = vue.computed(() => children.value.some((option) => option.visible === true));
    const flattedChildren = (node) => {
      const children2 = [];
      if (shared.isArray(node.children)) {
        node.children.forEach((child) => {
          var _a, _b;
          if (child.type && child.type.name === "ElOption" && child.component && child.component.proxy) {
            children2.push(child.component.proxy);
          } else if ((_a = child.children) == null ? void 0 : _a.length) {
            children2.push(...flattedChildren(child));
          } else if ((_b = child.component) == null ? void 0 : _b.subTree) {
            children2.push(...flattedChildren(child.component.subTree));
          }
        });
      }
      return children2;
    };
    const updateChildren = () => {
      children.value = flattedChildren(instance.subTree);
    };
    vue.onMounted(() => {
      updateChildren();
    });
    core.useMutationObserver(groupRef, updateChildren, {
      attributes: true,
      subtree: true,
      childList: true
    });
    return {
      groupRef,
      visible,
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("ul", {
    ref: "groupRef",
    class: vue.normalizeClass(_ctx.ns.be("group", "wrap"))
  }, [
    vue.createElementVNode("li", {
      class: vue.normalizeClass(_ctx.ns.be("group", "title"))
    }, vue.toDisplayString(_ctx.label), 3),
    vue.createElementVNode("li", null, [
      vue.createElementVNode("ul", {
        class: vue.normalizeClass(_ctx.ns.b("group"))
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 2)
    ])
  ], 2)), [
    [vue.vShow, _ctx.visible]
  ]);
}
var OptionGroup = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "option-group.vue"]]);

exports["default"] = OptionGroup;
//# sourceMappingURL=option-group.js.map
