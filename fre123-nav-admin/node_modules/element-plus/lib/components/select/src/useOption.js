'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');
require('../../../utils/index.js');
var token = require('./token.js');
var shared = require('@vue/shared');
var strings = require('../../../utils/strings.js');

function useOption(props, states) {
  const select = vue.inject(token.selectKey);
  const selectGroup = vue.inject(token.selectGroupKey, { disabled: false });
  const itemSelected = vue.computed(() => {
    if (select.props.multiple) {
      return contains(select.props.modelValue, props.value);
    } else {
      return contains([select.props.modelValue], props.value);
    }
  });
  const limitReached = vue.computed(() => {
    if (select.props.multiple) {
      const modelValue = select.props.modelValue || [];
      return !itemSelected.value && modelValue.length >= select.props.multipleLimit && select.props.multipleLimit > 0;
    } else {
      return false;
    }
  });
  const currentLabel = vue.computed(() => {
    return props.label || (shared.isObject(props.value) ? "" : props.value);
  });
  const currentValue = vue.computed(() => {
    return props.value || props.label || "";
  });
  const isDisabled = vue.computed(() => {
    return props.disabled || states.groupDisabled || limitReached.value;
  });
  const instance = vue.getCurrentInstance();
  const contains = (arr = [], target) => {
    if (!shared.isObject(props.value)) {
      return arr && arr.includes(target);
    } else {
      const valueKey = select.props.valueKey;
      return arr && arr.some((item) => {
        return vue.toRaw(lodashUnified.get(item, valueKey)) === lodashUnified.get(target, valueKey);
      });
    }
  };
  const hoverItem = () => {
    if (!props.disabled && !selectGroup.disabled) {
      select.states.hoveringIndex = select.optionsArray.indexOf(instance.proxy);
    }
  };
  const updateOption = (query) => {
    const regexp = new RegExp(strings.escapeStringRegexp(query), "i");
    states.visible = regexp.test(currentLabel.value) || props.created;
  };
  vue.watch(() => currentLabel.value, () => {
    if (!props.created && !select.props.remote)
      select.setSelected();
  });
  vue.watch(() => props.value, (val, oldVal) => {
    const { remote, valueKey } = select.props;
    if (!lodashUnified.isEqual(val, oldVal)) {
      select.onOptionDestroy(oldVal, instance.proxy);
      select.onOptionCreate(instance.proxy);
    }
    if (!props.created && !remote) {
      if (valueKey && shared.isObject(val) && shared.isObject(oldVal) && val[valueKey] === oldVal[valueKey]) {
        return;
      }
      select.setSelected();
    }
  });
  vue.watch(() => selectGroup.disabled, () => {
    states.groupDisabled = selectGroup.disabled;
  }, { immediate: true });
  return {
    select,
    currentLabel,
    currentValue,
    itemSelected,
    isDisabled,
    hoverItem,
    updateOption
  };
}

exports.useOption = useOption;
//# sourceMappingURL=useOption.js.map
