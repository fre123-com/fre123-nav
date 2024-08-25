'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../../directives/index.js');
var index = require('../../input/index.js');
var index$3 = require('../../tooltip/index.js');
var index$2 = require('../../scrollbar/index.js');
var index$1 = require('../../tag/index.js');
var index$4 = require('../../icon/index.js');
require('../../../constants/index.js');
var option = require('./option.js');
var selectDropdown = require('./select-dropdown.js');
var useSelect = require('./useSelect.js');
var token = require('./token.js');
var options = require('./options.js');
var select = require('./select.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$5 = require('../../../directives/click-outside/index.js');
var event = require('../../../constants/event.js');

const COMPONENT_NAME = "ElSelect";
const _sfc_main = vue.defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    ElInput: index.ElInput,
    ElSelectMenu: selectDropdown["default"],
    ElOption: option["default"],
    ElOptions: options["default"],
    ElTag: index$1.ElTag,
    ElScrollbar: index$2.ElScrollbar,
    ElTooltip: index$3.ElTooltip,
    ElIcon: index$4.ElIcon
  },
  directives: { ClickOutside: index$5["default"] },
  props: select.SelectProps,
  emits: [
    event.UPDATE_MODEL_EVENT,
    event.CHANGE_EVENT,
    "remove-tag",
    "clear",
    "visible-change",
    "focus",
    "blur"
  ],
  setup(props, { emit }) {
    const API = useSelect.useSelect(props, emit);
    vue.provide(token.selectKey, vue.reactive({
      props,
      states: API.states,
      optionsArray: API.optionsArray,
      handleOptionSelect: API.handleOptionSelect,
      onOptionCreate: API.onOptionCreate,
      onOptionDestroy: API.onOptionDestroy,
      selectRef: API.selectRef,
      setSelected: API.setSelected
    }));
    return {
      ...API
    };
  }
});
const _hoisted_1 = ["id", "disabled", "autocomplete", "readonly", "aria-activedescendant", "aria-controls", "aria-expanded", "aria-label"];
const _hoisted_2 = ["textContent"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tag = vue.resolveComponent("el-tag");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_option = vue.resolveComponent("el-option");
  const _component_el_options = vue.resolveComponent("el-options");
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_el_select_menu = vue.resolveComponent("el-select-menu");
  const _directive_click_outside = vue.resolveDirective("click-outside");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    ref: "selectRef",
    class: vue.normalizeClass([_ctx.nsSelect.b(), _ctx.nsSelect.m(_ctx.selectSize)]),
    onMouseenter: _cache[16] || (_cache[16] = ($event) => _ctx.states.inputHovering = true),
    onMouseleave: _cache[17] || (_cache[17] = ($event) => _ctx.states.inputHovering = false),
    onClick: _cache[18] || (_cache[18] = vue.withModifiers((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["prevent", "stop"]))
  }, [
    vue.createVNode(_component_el_tooltip, {
      ref: "tooltipRef",
      visible: _ctx.dropdownMenuVisible,
      placement: _ctx.placement,
      teleported: _ctx.teleported,
      "popper-class": [_ctx.nsSelect.e("popper"), _ctx.popperClass],
      "popper-options": _ctx.popperOptions,
      "fallback-placements": _ctx.fallbackPlacements,
      effect: _ctx.effect,
      pure: "",
      trigger: "click",
      transition: `${_ctx.nsSelect.namespace.value}-zoom-in-top`,
      "stop-popper-mouse-event": false,
      "gpu-acceleration": false,
      persistent: _ctx.persistent,
      onBeforeShow: _ctx.handleMenuEnter,
      onHide: _cache[15] || (_cache[15] = ($event) => _ctx.states.isBeforeHide = false)
    }, {
      default: vue.withCtx(() => {
        var _a;
        return [
          vue.createElementVNode("div", {
            ref: "wrapperRef",
            class: vue.normalizeClass([
              _ctx.nsSelect.e("wrapper"),
              _ctx.nsSelect.is("focused", _ctx.isFocused),
              _ctx.nsSelect.is("hovering", _ctx.states.inputHovering),
              _ctx.nsSelect.is("filterable", _ctx.filterable),
              _ctx.nsSelect.is("disabled", _ctx.selectDisabled)
            ])
          }, [
            _ctx.$slots.prefix ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              ref: "prefixRef",
              class: vue.normalizeClass(_ctx.nsSelect.e("prefix"))
            }, [
              vue.renderSlot(_ctx.$slots, "prefix")
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", {
              ref: "selectionRef",
              class: vue.normalizeClass([
                _ctx.nsSelect.e("selection"),
                _ctx.nsSelect.is("near", _ctx.multiple && !_ctx.$slots.prefix && !!_ctx.states.selected.length)
              ])
            }, [
              _ctx.multiple ? vue.renderSlot(_ctx.$slots, "tag", { key: 0 }, () => [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.showTagList, (item) => {
                  return vue.openBlock(), vue.createElementBlock("div", {
                    key: _ctx.getValueKey(item),
                    class: vue.normalizeClass(_ctx.nsSelect.e("selected-item"))
                  }, [
                    vue.createVNode(_component_el_tag, {
                      closable: !_ctx.selectDisabled && !item.isDisabled,
                      size: _ctx.collapseTagSize,
                      type: _ctx.tagType,
                      "disable-transitions": "",
                      style: vue.normalizeStyle(_ctx.tagStyle),
                      onClose: ($event) => _ctx.deleteTag($event, item)
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("span", {
                          class: vue.normalizeClass(_ctx.nsSelect.e("tags-text"))
                        }, vue.toDisplayString(item.currentLabel), 3)
                      ]),
                      _: 2
                    }, 1032, ["closable", "size", "type", "style", "onClose"])
                  ], 2);
                }), 128)),
                _ctx.collapseTags && _ctx.states.selected.length > _ctx.maxCollapseTags ? (vue.openBlock(), vue.createBlock(_component_el_tooltip, {
                  key: 0,
                  ref: "tagTooltipRef",
                  disabled: _ctx.dropdownMenuVisible || !_ctx.collapseTagsTooltip,
                  "fallback-placements": ["bottom", "top", "right", "left"],
                  effect: _ctx.effect,
                  placement: "bottom",
                  teleported: _ctx.teleported
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("div", {
                      ref: "collapseItemRef",
                      class: vue.normalizeClass(_ctx.nsSelect.e("selected-item"))
                    }, [
                      vue.createVNode(_component_el_tag, {
                        closable: false,
                        size: _ctx.collapseTagSize,
                        type: _ctx.tagType,
                        "disable-transitions": "",
                        style: vue.normalizeStyle(_ctx.collapseTagStyle)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("span", {
                            class: vue.normalizeClass(_ctx.nsSelect.e("tags-text"))
                          }, " + " + vue.toDisplayString(_ctx.states.selected.length - _ctx.maxCollapseTags), 3)
                        ]),
                        _: 1
                      }, 8, ["size", "type", "style"])
                    ], 2)
                  ]),
                  content: vue.withCtx(() => [
                    vue.createElementVNode("div", {
                      ref: "tagMenuRef",
                      class: vue.normalizeClass(_ctx.nsSelect.e("selection"))
                    }, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.collapseTagList, (item) => {
                        return vue.openBlock(), vue.createElementBlock("div", {
                          key: _ctx.getValueKey(item),
                          class: vue.normalizeClass(_ctx.nsSelect.e("selected-item"))
                        }, [
                          vue.createVNode(_component_el_tag, {
                            class: "in-tooltip",
                            closable: !_ctx.selectDisabled && !item.isDisabled,
                            size: _ctx.collapseTagSize,
                            type: _ctx.tagType,
                            "disable-transitions": "",
                            onClose: ($event) => _ctx.deleteTag($event, item)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("span", {
                                class: vue.normalizeClass(_ctx.nsSelect.e("tags-text"))
                              }, vue.toDisplayString(item.currentLabel), 3)
                            ]),
                            _: 2
                          }, 1032, ["closable", "size", "type", "onClose"])
                        ], 2);
                      }), 128))
                    ], 2)
                  ]),
                  _: 1
                }, 8, ["disabled", "effect", "teleported"])) : vue.createCommentVNode("v-if", true)
              ]) : vue.createCommentVNode("v-if", true),
              !_ctx.selectDisabled ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 1,
                class: vue.normalizeClass([
                  _ctx.nsSelect.e("selected-item"),
                  _ctx.nsSelect.e("input-wrapper"),
                  _ctx.nsSelect.is("hidden", !_ctx.filterable)
                ])
              }, [
                vue.withDirectives(vue.createElementVNode("input", {
                  id: _ctx.inputId,
                  ref: "inputRef",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.states.inputValue = $event),
                  type: "text",
                  class: vue.normalizeClass([_ctx.nsSelect.e("input"), _ctx.nsSelect.is(_ctx.selectSize)]),
                  disabled: _ctx.selectDisabled,
                  autocomplete: _ctx.autocomplete,
                  style: vue.normalizeStyle(_ctx.inputStyle),
                  role: "combobox",
                  readonly: !_ctx.filterable,
                  spellcheck: "false",
                  "aria-activedescendant": ((_a = _ctx.hoverOption) == null ? void 0 : _a.id) || "",
                  "aria-controls": _ctx.contentId,
                  "aria-expanded": _ctx.dropdownMenuVisible,
                  "aria-label": _ctx.ariaLabel,
                  "aria-autocomplete": "none",
                  "aria-haspopup": "listbox",
                  onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
                  onBlur: _cache[2] || (_cache[2] = (...args) => _ctx.handleBlur && _ctx.handleBlur(...args)),
                  onKeydown: [
                    _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers(($event) => _ctx.navigateOptions("next"), ["stop", "prevent"]), ["down"])),
                    _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers(($event) => _ctx.navigateOptions("prev"), ["stop", "prevent"]), ["up"])),
                    _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => _ctx.handleEsc && _ctx.handleEsc(...args), ["stop", "prevent"]), ["esc"])),
                    _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers((...args) => _ctx.selectOption && _ctx.selectOption(...args), ["stop", "prevent"]), ["enter"])),
                    _cache[7] || (_cache[7] = vue.withKeys(vue.withModifiers((...args) => _ctx.deletePrevTag && _ctx.deletePrevTag(...args), ["stop"]), ["delete"]))
                  ],
                  onCompositionstart: _cache[8] || (_cache[8] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
                  onCompositionupdate: _cache[9] || (_cache[9] = (...args) => _ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args)),
                  onCompositionend: _cache[10] || (_cache[10] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args)),
                  onInput: _cache[11] || (_cache[11] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
                  onClick: _cache[12] || (_cache[12] = vue.withModifiers((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["stop"]))
                }, null, 46, _hoisted_1), [
                  [vue.vModelText, _ctx.states.inputValue]
                ]),
                _ctx.filterable ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 0,
                  ref: "calculatorRef",
                  "aria-hidden": "true",
                  class: vue.normalizeClass(_ctx.nsSelect.e("input-calculator")),
                  textContent: vue.toDisplayString(_ctx.states.inputValue)
                }, null, 10, _hoisted_2)) : vue.createCommentVNode("v-if", true)
              ], 2)) : vue.createCommentVNode("v-if", true),
              _ctx.shouldShowPlaceholder ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 2,
                class: vue.normalizeClass([
                  _ctx.nsSelect.e("selected-item"),
                  _ctx.nsSelect.e("placeholder"),
                  _ctx.nsSelect.is("transparent", !_ctx.hasModelValue || _ctx.expanded && !_ctx.states.inputValue)
                ])
              }, [
                vue.createElementVNode("span", null, vue.toDisplayString(_ctx.currentPlaceholder), 1)
              ], 2)) : vue.createCommentVNode("v-if", true)
            ], 2),
            vue.createElementVNode("div", {
              ref: "suffixRef",
              class: vue.normalizeClass(_ctx.nsSelect.e("suffix"))
            }, [
              _ctx.iconComponent && !_ctx.showClose ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                key: 0,
                class: vue.normalizeClass([_ctx.nsSelect.e("caret"), _ctx.nsSelect.e("icon"), _ctx.iconReverse])
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.iconComponent)))
                ]),
                _: 1
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
              _ctx.showClose && _ctx.clearIcon ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                key: 1,
                class: vue.normalizeClass([_ctx.nsSelect.e("caret"), _ctx.nsSelect.e("icon")]),
                onClick: _ctx.handleClearClick
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.clearIcon)))
                ]),
                _: 1
              }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true),
              _ctx.validateState && _ctx.validateIcon ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                key: 2,
                class: vue.normalizeClass([_ctx.nsInput.e("icon"), _ctx.nsInput.e("validateIcon")])
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.validateIcon)))
                ]),
                _: 1
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
            ], 2)
          ], 2)
        ];
      }),
      content: vue.withCtx(() => [
        vue.createVNode(_component_el_select_menu, { ref: "menuRef" }, {
          default: vue.withCtx(() => [
            _ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "header")),
              onClick: _cache[13] || (_cache[13] = vue.withModifiers(() => {
              }, ["stop"]))
            }, [
              vue.renderSlot(_ctx.$slots, "header")
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.withDirectives(vue.createVNode(_component_el_scrollbar, {
              id: _ctx.contentId,
              ref: "scrollbarRef",
              tag: "ul",
              "wrap-class": _ctx.nsSelect.be("dropdown", "wrap"),
              "view-class": _ctx.nsSelect.be("dropdown", "list"),
              class: vue.normalizeClass([_ctx.nsSelect.is("empty", _ctx.filteredOptionsCount === 0)]),
              role: "listbox",
              "aria-label": _ctx.ariaLabel,
              "aria-orientation": "vertical"
            }, {
              default: vue.withCtx(() => [
                _ctx.showNewOption ? (vue.openBlock(), vue.createBlock(_component_el_option, {
                  key: 0,
                  value: _ctx.states.inputValue,
                  created: true
                }, null, 8, ["value"])) : vue.createCommentVNode("v-if", true),
                vue.createVNode(_component_el_options, null, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }, 8, ["id", "wrap-class", "view-class", "class", "aria-label"]), [
              [vue.vShow, _ctx.states.options.size > 0 && !_ctx.loading]
            ]),
            _ctx.$slots.loading && _ctx.loading ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "loading"))
            }, [
              vue.renderSlot(_ctx.$slots, "loading")
            ], 2)) : _ctx.loading || _ctx.filteredOptionsCount === 0 ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 2,
              class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "empty"))
            }, [
              vue.renderSlot(_ctx.$slots, "empty", {}, () => [
                vue.createElementVNode("span", null, vue.toDisplayString(_ctx.emptyText), 1)
              ])
            ], 2)) : vue.createCommentVNode("v-if", true),
            _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 3,
              class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "footer")),
              onClick: _cache[14] || (_cache[14] = vue.withModifiers(() => {
              }, ["stop"]))
            }, [
              vue.renderSlot(_ctx.$slots, "footer")
            ], 2)) : vue.createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 512)
      ]),
      _: 3
    }, 8, ["visible", "placement", "teleported", "popper-class", "popper-options", "fallback-placements", "effect", "transition", "persistent", "onBeforeShow"])
  ], 34)), [
    [_directive_click_outside, _ctx.handleClickOutside, _ctx.popperRef]
  ]);
}
var Select = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "select.vue"]]);

exports["default"] = Select;
//# sourceMappingURL=select2.js.map
