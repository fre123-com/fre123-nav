import { defineComponent, useSlots, computed, ref, openBlock, createBlock, Teleport, createVNode, Transition, unref, withCtx, withDirectives, createElementVNode, mergeProps, withModifiers, normalizeClass, createElementBlock, renderSlot, toDisplayString, createCommentVNode, vShow } from 'vue';
import { Close } from '@element-plus/icons-vue';
import { ElOverlay } from '../../overlay/index.mjs';
import '../../focus-trap/index.mjs';
import '../../dialog/index.mjs';
import '../../../utils/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import '../../../hooks/index.mjs';
import { drawerProps, drawerEmits } from './drawer.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useDeprecated } from '../../../hooks/use-deprecated/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useDialog } from '../../dialog/src/use-dialog.mjs';
import { addUnit } from '../../../utils/dom/style.mjs';
import ElFocusTrap from '../../focus-trap/src/focus-trap.mjs';

const _hoisted_1 = ["aria-label", "aria-labelledby", "aria-describedby"];
const _hoisted_2 = ["id", "aria-level"];
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = ["id"];
const __default__ = defineComponent({
  name: "ElDrawer",
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: drawerProps,
  emits: drawerEmits,
  setup(__props, { expose }) {
    const props = __props;
    const slots = useSlots();
    useDeprecated({
      scope: "el-drawer",
      from: "the title slot",
      replacement: "the header slot",
      version: "3.0.0",
      ref: "https://element-plus.org/en-US/component/drawer.html#slots"
    }, computed(() => !!slots.title));
    const drawerRef = ref();
    const focusStartRef = ref();
    const ns = useNamespace("drawer");
    const { t } = useLocale();
    const {
      afterEnter,
      afterLeave,
      beforeLeave,
      visible,
      rendered,
      titleId,
      bodyId,
      zIndex,
      onModalClick,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onFocusoutPrevented,
      onCloseRequested,
      handleClose
    } = useDialog(props, drawerRef);
    const isHorizontal = computed(() => props.direction === "rtl" || props.direction === "ltr");
    const drawerSize = computed(() => addUnit(props.size));
    expose({
      handleClose,
      afterEnter,
      afterLeave
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        to: "body",
        disabled: !_ctx.appendToBody
      }, [
        createVNode(Transition, {
          name: unref(ns).b("fade"),
          onAfterEnter: unref(afterEnter),
          onAfterLeave: unref(afterLeave),
          onBeforeLeave: unref(beforeLeave),
          persisted: ""
        }, {
          default: withCtx(() => [
            withDirectives(createVNode(unref(ElOverlay), {
              mask: _ctx.modal,
              "overlay-class": _ctx.modalClass,
              "z-index": unref(zIndex),
              onClick: unref(onModalClick)
            }, {
              default: withCtx(() => [
                createVNode(unref(ElFocusTrap), {
                  loop: "",
                  trapped: unref(visible),
                  "focus-trap-el": drawerRef.value,
                  "focus-start-el": focusStartRef.value,
                  onFocusAfterTrapped: unref(onOpenAutoFocus),
                  onFocusAfterReleased: unref(onCloseAutoFocus),
                  onFocusoutPrevented: unref(onFocusoutPrevented),
                  onReleaseRequested: unref(onCloseRequested)
                }, {
                  default: withCtx(() => [
                    createElementVNode("div", mergeProps({
                      ref_key: "drawerRef",
                      ref: drawerRef,
                      "aria-modal": "true",
                      "aria-label": _ctx.title || void 0,
                      "aria-labelledby": !_ctx.title ? unref(titleId) : void 0,
                      "aria-describedby": unref(bodyId)
                    }, _ctx.$attrs, {
                      class: [unref(ns).b(), _ctx.direction, unref(visible) && "open"],
                      style: unref(isHorizontal) ? "width: " + unref(drawerSize) : "height: " + unref(drawerSize),
                      role: "dialog",
                      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                      }, ["stop"]))
                    }), [
                      createElementVNode("span", {
                        ref_key: "focusStartRef",
                        ref: focusStartRef,
                        class: normalizeClass(unref(ns).e("sr-focus")),
                        tabindex: "-1"
                      }, null, 2),
                      _ctx.withHeader ? (openBlock(), createElementBlock("header", {
                        key: 0,
                        class: normalizeClass(unref(ns).e("header"))
                      }, [
                        !_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                          key: 0,
                          close: unref(handleClose),
                          titleId: unref(titleId),
                          titleClass: unref(ns).e("title")
                        }, () => [
                          !_ctx.$slots.title ? (openBlock(), createElementBlock("span", {
                            key: 0,
                            id: unref(titleId),
                            role: "heading",
                            "aria-level": _ctx.headerAriaLevel,
                            class: normalizeClass(unref(ns).e("title"))
                          }, toDisplayString(_ctx.title), 11, _hoisted_2)) : createCommentVNode("v-if", true)
                        ]) : renderSlot(_ctx.$slots, "title", { key: 1 }, () => [
                          createCommentVNode(" DEPRECATED SLOT ")
                        ]),
                        _ctx.showClose ? (openBlock(), createElementBlock("button", {
                          key: 2,
                          "aria-label": unref(t)("el.drawer.close"),
                          class: normalizeClass(unref(ns).e("close-btn")),
                          type: "button",
                          onClick: _cache[0] || (_cache[0] = (...args) => unref(handleClose) && unref(handleClose)(...args))
                        }, [
                          createVNode(unref(ElIcon), {
                            class: normalizeClass(unref(ns).e("close"))
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Close))
                            ]),
                            _: 1
                          }, 8, ["class"])
                        ], 10, _hoisted_3)) : createCommentVNode("v-if", true)
                      ], 2)) : createCommentVNode("v-if", true),
                      unref(rendered) ? (openBlock(), createElementBlock("div", {
                        key: 1,
                        id: unref(bodyId),
                        class: normalizeClass(unref(ns).e("body"))
                      }, [
                        renderSlot(_ctx.$slots, "default")
                      ], 10, _hoisted_4)) : createCommentVNode("v-if", true),
                      _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
                        key: 2,
                        class: normalizeClass(unref(ns).e("footer"))
                      }, [
                        renderSlot(_ctx.$slots, "footer")
                      ], 2)) : createCommentVNode("v-if", true)
                    ], 16, _hoisted_1)
                  ]),
                  _: 3
                }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
              ]),
              _: 3
            }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
              [vShow, unref(visible)]
            ])
          ]),
          _: 3
        }, 8, ["name", "onAfterEnter", "onAfterLeave", "onBeforeLeave"])
      ], 8, ["disabled"]);
    };
  }
});
var Drawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "drawer.vue"]]);

export { Drawer as default };
//# sourceMappingURL=drawer2.mjs.map
