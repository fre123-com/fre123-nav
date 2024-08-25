'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');
require('../../../constants/index.js');
require('../../../utils/index.js');
var index = require('../../tree/index.js');
var treeSelectOption = require('./tree-select-option.js');
var utils = require('./utils.js');
var shared = require('@vue/shared');
var strings = require('../../../utils/strings.js');
var event = require('../../../constants/event.js');

const useTree = (props, { attrs, slots, emit }, {
  select,
  tree,
  key
}) => {
  vue.watch(() => props.modelValue, () => {
    if (props.showCheckbox) {
      vue.nextTick(() => {
        const treeInstance = tree.value;
        if (treeInstance && !lodashUnified.isEqual(treeInstance.getCheckedKeys(), utils.toValidArray(props.modelValue))) {
          treeInstance.setCheckedKeys(utils.toValidArray(props.modelValue));
        }
      });
    }
  }, {
    immediate: true,
    deep: true
  });
  const propsMap = vue.computed(() => ({
    value: key.value,
    label: "label",
    children: "children",
    disabled: "disabled",
    isLeaf: "isLeaf",
    ...props.props
  }));
  const getNodeValByProp = (prop, data) => {
    var _a;
    const propVal = propsMap.value[prop];
    if (shared.isFunction(propVal)) {
      return propVal(data, (_a = tree.value) == null ? void 0 : _a.getNode(getNodeValByProp("value", data)));
    } else {
      return data[propVal];
    }
  };
  const defaultExpandedParentKeys = utils.toValidArray(props.modelValue).map((value) => {
    return utils.treeFind(props.data || [], (data) => getNodeValByProp("value", data) === value, (data) => getNodeValByProp("children", data), (data, index, array, parent) => parent && getNodeValByProp("value", parent));
  }).filter((item) => utils.isValidValue(item));
  const cacheOptions = vue.computed(() => {
    if (!props.renderAfterExpand && !props.lazy)
      return [];
    const options = [];
    utils.treeEach(props.data.concat(props.cacheData), (node) => {
      const value = getNodeValByProp("value", node);
      options.push({
        value,
        currentLabel: getNodeValByProp("label", node),
        isDisabled: getNodeValByProp("disabled", node)
      });
    }, (data) => getNodeValByProp("children", data));
    return options;
  });
  return {
    ...lodashUnified.pick(vue.toRefs(props), Object.keys(index["default"].props)),
    ...attrs,
    nodeKey: key,
    expandOnClickNode: vue.computed(() => {
      return !props.checkStrictly && props.expandOnClickNode;
    }),
    defaultExpandedKeys: vue.computed(() => {
      return props.defaultExpandedKeys ? props.defaultExpandedKeys.concat(defaultExpandedParentKeys) : defaultExpandedParentKeys;
    }),
    renderContent: (h, { node, data, store }) => {
      return h(treeSelectOption["default"], {
        value: getNodeValByProp("value", data),
        label: getNodeValByProp("label", data),
        disabled: getNodeValByProp("disabled", data)
      }, props.renderContent ? () => props.renderContent(h, { node, data, store }) : slots.default ? () => slots.default({ node, data, store }) : void 0);
    },
    filterNodeMethod: (value, data, node) => {
      if (props.filterNodeMethod)
        return props.filterNodeMethod(value, data, node);
      if (!value)
        return true;
      const regexp = new RegExp(strings.escapeStringRegexp(value), "i");
      return regexp.test(getNodeValByProp("label", data) || "");
    },
    onNodeClick: (data, node, e) => {
      var _a, _b, _c, _d;
      (_a = attrs.onNodeClick) == null ? void 0 : _a.call(attrs, data, node, e);
      if (props.showCheckbox && props.checkOnClickNode)
        return;
      if (!props.showCheckbox && (props.checkStrictly || node.isLeaf)) {
        if (!getNodeValByProp("disabled", data)) {
          const option = (_b = select.value) == null ? void 0 : _b.states.options.get(getNodeValByProp("value", data));
          (_c = select.value) == null ? void 0 : _c.handleOptionSelect(option);
        }
      } else if (props.expandOnClickNode) {
        e.proxy.handleExpandIconClick();
      }
      (_d = select.value) == null ? void 0 : _d.focus();
    },
    onCheck: (data, params) => {
      var _a;
      if (!props.showCheckbox)
        return;
      const dataValue = getNodeValByProp("value", data);
      const dataMap = {};
      utils.treeEach([tree.value.store.root], (node) => dataMap[node.key] = node, (node) => node.childNodes);
      const uncachedCheckedKeys = params.checkedKeys;
      const cachedKeys = props.multiple ? utils.toValidArray(props.modelValue).filter((item) => !(item in dataMap) && !uncachedCheckedKeys.includes(item)) : [];
      const checkedKeys = cachedKeys.concat(uncachedCheckedKeys);
      if (props.checkStrictly) {
        emit(event.UPDATE_MODEL_EVENT, props.multiple ? checkedKeys : checkedKeys.includes(dataValue) ? dataValue : void 0);
      } else {
        if (props.multiple) {
          emit(event.UPDATE_MODEL_EVENT, cachedKeys.concat(tree.value.getCheckedKeys(true)));
        } else {
          const firstLeaf = utils.treeFind([data], (data2) => !utils.isValidArray(getNodeValByProp("children", data2)) && !getNodeValByProp("disabled", data2), (data2) => getNodeValByProp("children", data2));
          const firstLeafKey = firstLeaf ? getNodeValByProp("value", firstLeaf) : void 0;
          const hasCheckedChild = utils.isValidValue(props.modelValue) && !!utils.treeFind([data], (data2) => getNodeValByProp("value", data2) === props.modelValue, (data2) => getNodeValByProp("children", data2));
          emit(event.UPDATE_MODEL_EVENT, firstLeafKey === props.modelValue || hasCheckedChild ? void 0 : firstLeafKey);
        }
      }
      vue.nextTick(() => {
        var _a2;
        const checkedKeys2 = utils.toValidArray(props.modelValue);
        tree.value.setCheckedKeys(checkedKeys2);
        (_a2 = attrs.onCheck) == null ? void 0 : _a2.call(attrs, data, {
          checkedKeys: tree.value.getCheckedKeys(),
          checkedNodes: tree.value.getCheckedNodes(),
          halfCheckedKeys: tree.value.getHalfCheckedKeys(),
          halfCheckedNodes: tree.value.getHalfCheckedNodes()
        });
      });
      (_a = select.value) == null ? void 0 : _a.focus();
    },
    cacheOptions
  };
};

exports.useTree = useTree;
//# sourceMappingURL=tree.js.map
