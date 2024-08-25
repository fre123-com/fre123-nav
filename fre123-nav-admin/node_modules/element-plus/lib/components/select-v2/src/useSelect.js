'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var shared = require('@vue/shared');
var lodashUnified = require('lodash-unified');
var core = require('@vueuse/core');
require('../../../hooks/index.js');
require('../../../constants/index.js');
require('../../../utils/index.js');
require('../../form/index.js');
var iconsVue = require('@element-plus/icons-vue');
var useAllowCreate = require('./useAllowCreate.js');
var useInput = require('./useInput.js');
var useProps = require('./useProps.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var useFormItem = require('../../form/src/hooks/use-form-item.js');
var index$2 = require('../../../hooks/use-focus-controller/index.js');
var icon = require('../../../utils/vue/icon.js');
var strings = require('../../../utils/strings.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var event = require('../../../constants/event.js');
var aria = require('../../../constants/aria.js');
var error = require('../../../utils/error.js');

const MINIMUM_INPUT_WIDTH = 11;
const useSelect = (props, emit) => {
  const { t } = index.useLocale();
  const nsSelect = index$1.useNamespace("select");
  const nsInput = index$1.useNamespace("input");
  const { form: elForm, formItem: elFormItem } = useFormItem.useFormItem();
  const { inputId } = useFormItem.useFormItemInputId(props, {
    formItemContext: elFormItem
  });
  const { getLabel, getValue, getDisabled, getOptions } = useProps.useProps(props);
  const states = vue.reactive({
    inputValue: "",
    cachedOptions: [],
    createdOptions: [],
    hoveringIndex: -1,
    inputHovering: false,
    selectionWidth: 0,
    calculatorWidth: 0,
    collapseItemWidth: 0,
    previousQuery: null,
    previousValue: void 0,
    selectedLabel: "",
    menuVisibleOnFocus: false,
    isBeforeHide: false
  });
  const selectedIndex = vue.ref(-1);
  const popperSize = vue.ref(-1);
  const selectRef = vue.ref(null);
  const selectionRef = vue.ref(null);
  const tooltipRef = vue.ref(null);
  const tagTooltipRef = vue.ref(null);
  const inputRef = vue.ref(null);
  const calculatorRef = vue.ref(null);
  const prefixRef = vue.ref(null);
  const suffixRef = vue.ref(null);
  const menuRef = vue.ref(null);
  const tagMenuRef = vue.ref(null);
  const collapseItemRef = vue.ref(null);
  const { wrapperRef, isFocused, handleFocus, handleBlur } = index$2.useFocusController(inputRef, {
    afterFocus() {
      if (props.automaticDropdown && !expanded.value) {
        expanded.value = true;
        states.menuVisibleOnFocus = true;
      }
    },
    beforeBlur(event) {
      var _a, _b;
      return ((_a = tooltipRef.value) == null ? void 0 : _a.isFocusInsideContent(event)) || ((_b = tagTooltipRef.value) == null ? void 0 : _b.isFocusInsideContent(event));
    },
    afterBlur() {
      expanded.value = false;
      states.menuVisibleOnFocus = false;
    }
  });
  const allOptions = vue.ref([]);
  const filteredOptions = vue.ref([]);
  const expanded = vue.ref(false);
  const selectDisabled = vue.computed(() => props.disabled || (elForm == null ? void 0 : elForm.disabled));
  const popupHeight = vue.computed(() => {
    const totalHeight = filteredOptions.value.length * props.itemHeight;
    return totalHeight > props.height ? props.height : totalHeight;
  });
  const hasEmptyStringOption = vue.computed(() => allOptions.value.some((option) => getValue(option) === ""));
  const hasModelValue = vue.computed(() => {
    return props.multiple ? shared.isArray(props.modelValue) && props.modelValue.length > 0 : !lodashUnified.isNil(props.modelValue) && (props.modelValue !== "" || hasEmptyStringOption.value);
  });
  const showClearBtn = vue.computed(() => {
    const criteria = props.clearable && !selectDisabled.value && states.inputHovering && hasModelValue.value;
    return criteria;
  });
  const iconComponent = vue.computed(() => props.remote && props.filterable ? "" : iconsVue.ArrowDown);
  const iconReverse = vue.computed(() => iconComponent.value && nsSelect.is("reverse", expanded.value));
  const validateState = vue.computed(() => (elFormItem == null ? void 0 : elFormItem.validateState) || "");
  const validateIcon = vue.computed(() => icon.ValidateComponentsMap[validateState.value]);
  const debounce = vue.computed(() => props.remote ? 300 : 0);
  const emptyText = vue.computed(() => {
    if (props.loading) {
      return props.loadingText || t("el.select.loading");
    } else {
      if (props.remote && !states.inputValue && allOptions.value.length === 0)
        return false;
      if (props.filterable && states.inputValue && allOptions.value.length > 0 && filteredOptions.value.length === 0) {
        return props.noMatchText || t("el.select.noMatch");
      }
      if (allOptions.value.length === 0) {
        return props.noDataText || t("el.select.noData");
      }
    }
    return null;
  });
  const filterOptions = (query) => {
    const isValidOption = (o) => {
      if (props.filterable && shared.isFunction(props.filterMethod))
        return true;
      if (props.filterable && props.remote && shared.isFunction(props.remoteMethod))
        return true;
      const regexp = new RegExp(strings.escapeStringRegexp(query), "i");
      return query ? regexp.test(getLabel(o) || "") : true;
    };
    if (props.loading) {
      return [];
    }
    return [...states.createdOptions, ...props.options].reduce((all, item) => {
      const options = getOptions(item);
      if (shared.isArray(options)) {
        const filtered = options.filter(isValidOption);
        if (filtered.length > 0) {
          all.push({
            label: getLabel(item),
            isTitle: true,
            type: "Group"
          }, ...filtered, { type: "Group" });
        }
      } else if (props.remote || isValidOption(item)) {
        all.push(item);
      }
      return all;
    }, []);
  };
  const updateOptions = () => {
    allOptions.value = filterOptions("");
    filteredOptions.value = filterOptions(states.inputValue);
  };
  const allOptionsValueMap = vue.computed(() => {
    const valueMap = /* @__PURE__ */ new Map();
    allOptions.value.forEach((option, index) => {
      valueMap.set(getValueKey(getValue(option)), { option, index });
    });
    return valueMap;
  });
  const filteredOptionsValueMap = vue.computed(() => {
    const valueMap = /* @__PURE__ */ new Map();
    filteredOptions.value.forEach((option, index) => {
      valueMap.set(getValueKey(getValue(option)), { option, index });
    });
    return valueMap;
  });
  const optionsAllDisabled = vue.computed(() => filteredOptions.value.every((option) => getDisabled(option)));
  const selectSize = useFormCommonProps.useFormSize();
  const collapseTagSize = vue.computed(() => selectSize.value === "small" ? "small" : "default");
  const calculatePopperSize = () => {
    var _a;
    popperSize.value = ((_a = selectRef.value) == null ? void 0 : _a.offsetWidth) || 200;
  };
  const getGapWidth = () => {
    if (!selectionRef.value)
      return 0;
    const style = window.getComputedStyle(selectionRef.value);
    return Number.parseFloat(style.gap || "6px");
  };
  const tagStyle = vue.computed(() => {
    const gapWidth = getGapWidth();
    const maxWidth = collapseItemRef.value && props.maxCollapseTags === 1 ? states.selectionWidth - states.collapseItemWidth - gapWidth : states.selectionWidth;
    return { maxWidth: `${maxWidth}px` };
  });
  const collapseTagStyle = vue.computed(() => {
    return { maxWidth: `${states.selectionWidth}px` };
  });
  const inputStyle = vue.computed(() => ({
    width: `${Math.max(states.calculatorWidth, MINIMUM_INPUT_WIDTH)}px`
  }));
  const shouldShowPlaceholder = vue.computed(() => {
    if (shared.isArray(props.modelValue)) {
      return props.modelValue.length === 0 && !states.inputValue;
    }
    return props.filterable ? !states.inputValue : true;
  });
  const currentPlaceholder = vue.computed(() => {
    var _a;
    const _placeholder = (_a = props.placeholder) != null ? _a : t("el.select.placeholder");
    return props.multiple || !hasModelValue.value ? _placeholder : states.selectedLabel;
  });
  const popperRef = vue.computed(() => {
    var _a, _b;
    return (_b = (_a = tooltipRef.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.contentRef;
  });
  const indexRef = vue.computed(() => {
    if (props.multiple) {
      const len = props.modelValue.length;
      if (props.modelValue.length > 0 && filteredOptionsValueMap.value.has(props.modelValue[len - 1])) {
        const { index } = filteredOptionsValueMap.value.get(props.modelValue[len - 1]);
        return index;
      }
    } else {
      if (props.modelValue && filteredOptionsValueMap.value.has(props.modelValue)) {
        const { index } = filteredOptionsValueMap.value.get(props.modelValue);
        return index;
      }
    }
    return -1;
  });
  const dropdownMenuVisible = vue.computed({
    get() {
      return expanded.value && emptyText.value !== false;
    },
    set(val) {
      expanded.value = val;
    }
  });
  const showTagList = vue.computed(() => {
    if (!props.multiple) {
      return [];
    }
    return props.collapseTags ? states.cachedOptions.slice(0, props.maxCollapseTags) : states.cachedOptions;
  });
  const collapseTagList = vue.computed(() => {
    if (!props.multiple) {
      return [];
    }
    return props.collapseTags ? states.cachedOptions.slice(props.maxCollapseTags) : [];
  });
  const {
    createNewOption,
    removeNewOption,
    selectNewOption,
    clearAllNewOption
  } = useAllowCreate.useAllowCreate(props, states);
  const {
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd
  } = useInput.useInput((e) => onInput(e));
  const toggleMenu = () => {
    if (selectDisabled.value)
      return;
    if (states.menuVisibleOnFocus) {
      states.menuVisibleOnFocus = false;
    } else {
      expanded.value = !expanded.value;
    }
  };
  const onInputChange = () => {
    if (states.inputValue.length > 0 && !expanded.value) {
      expanded.value = true;
    }
    createNewOption(states.inputValue);
    handleQueryChange(states.inputValue);
  };
  const debouncedOnInputChange = lodashUnified.debounce(onInputChange, debounce.value);
  const handleQueryChange = (val) => {
    if (states.previousQuery === val) {
      return;
    }
    states.previousQuery = val;
    if (props.filterable && shared.isFunction(props.filterMethod)) {
      props.filterMethod(val);
    } else if (props.filterable && props.remote && shared.isFunction(props.remoteMethod)) {
      props.remoteMethod(val);
    }
    if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptions.value.length) {
      vue.nextTick(checkDefaultFirstOption);
    } else {
      vue.nextTick(updateHoveringIndex);
    }
  };
  const checkDefaultFirstOption = () => {
    const optionsInDropdown = filteredOptions.value.filter((n) => !n.disabled && n.type !== "Group");
    const userCreatedOption = optionsInDropdown.find((n) => n.created);
    const firstOriginOption = optionsInDropdown[0];
    states.hoveringIndex = getValueIndex(filteredOptions.value, userCreatedOption || firstOriginOption);
  };
  const emitChange = (val) => {
    if (!lodashUnified.isEqual(props.modelValue, val)) {
      emit(event.CHANGE_EVENT, val);
    }
  };
  const update = (val) => {
    emit(event.UPDATE_MODEL_EVENT, val);
    emitChange(val);
    states.previousValue = String(val);
  };
  const getValueIndex = (arr = [], value) => {
    if (!shared.isObject(value)) {
      return arr.indexOf(value);
    }
    const valueKey = props.valueKey;
    let index = -1;
    arr.some((item, i) => {
      if (lodashUnified.get(item, valueKey) === lodashUnified.get(value, valueKey)) {
        index = i;
        return true;
      }
      return false;
    });
    return index;
  };
  const getValueKey = (item) => {
    return shared.isObject(item) ? lodashUnified.get(item, props.valueKey) : item;
  };
  const handleResize = () => {
    calculatePopperSize();
  };
  const resetSelectionWidth = () => {
    states.selectionWidth = selectionRef.value.getBoundingClientRect().width;
  };
  const resetCalculatorWidth = () => {
    states.calculatorWidth = calculatorRef.value.getBoundingClientRect().width;
  };
  const resetCollapseItemWidth = () => {
    states.collapseItemWidth = collapseItemRef.value.getBoundingClientRect().width;
  };
  const updateTooltip = () => {
    var _a, _b;
    (_b = (_a = tooltipRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
  };
  const updateTagTooltip = () => {
    var _a, _b;
    (_b = (_a = tagTooltipRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
  };
  const onSelect = (option, idx) => {
    if (props.multiple) {
      let selectedOptions = props.modelValue.slice();
      const index = getValueIndex(selectedOptions, getValue(option));
      if (index > -1) {
        selectedOptions = [
          ...selectedOptions.slice(0, index),
          ...selectedOptions.slice(index + 1)
        ];
        states.cachedOptions.splice(index, 1);
        removeNewOption(option);
      } else if (props.multipleLimit <= 0 || selectedOptions.length < props.multipleLimit) {
        selectedOptions = [...selectedOptions, getValue(option)];
        states.cachedOptions.push(option);
        selectNewOption(option);
      }
      update(selectedOptions);
      if (option.created) {
        handleQueryChange("");
      }
      if (props.filterable && !props.reserveKeyword) {
        states.inputValue = "";
      }
    } else {
      selectedIndex.value = idx;
      states.selectedLabel = getLabel(option);
      update(getValue(option));
      expanded.value = false;
      selectNewOption(option);
      if (!option.created) {
        clearAllNewOption();
      }
    }
    focus();
  };
  const deleteTag = (event, option) => {
    let selectedOptions = props.modelValue.slice();
    const index = getValueIndex(selectedOptions, getValue(option));
    if (index > -1 && !selectDisabled.value) {
      selectedOptions = [
        ...props.modelValue.slice(0, index),
        ...props.modelValue.slice(index + 1)
      ];
      states.cachedOptions.splice(index, 1);
      update(selectedOptions);
      emit("remove-tag", getValue(option));
      removeNewOption(option);
    }
    event.stopPropagation();
    focus();
  };
  const focus = () => {
    var _a;
    (_a = inputRef.value) == null ? void 0 : _a.focus();
  };
  const blur = () => {
    var _a;
    (_a = inputRef.value) == null ? void 0 : _a.blur();
  };
  const handleEsc = () => {
    if (states.inputValue.length > 0) {
      states.inputValue = "";
    } else {
      expanded.value = false;
    }
  };
  const getLastNotDisabledIndex = (value) => lodashUnified.findLastIndex(value, (it) => !states.cachedOptions.some((option) => getValue(option) === it && getDisabled(option)));
  const handleDel = (e) => {
    if (!props.multiple)
      return;
    if (e.code === aria.EVENT_CODE.delete)
      return;
    if (states.inputValue.length === 0) {
      e.preventDefault();
      const selected = props.modelValue.slice();
      const lastNotDisabledIndex = getLastNotDisabledIndex(selected);
      if (lastNotDisabledIndex < 0)
        return;
      selected.splice(lastNotDisabledIndex, 1);
      const option = states.cachedOptions[lastNotDisabledIndex];
      states.cachedOptions.splice(lastNotDisabledIndex, 1);
      removeNewOption(option);
      update(selected);
    }
  };
  const handleClear = () => {
    let emptyValue;
    if (shared.isArray(props.modelValue)) {
      emptyValue = [];
    } else {
      emptyValue = void 0;
    }
    if (props.multiple) {
      states.cachedOptions = [];
    } else {
      states.selectedLabel = "";
    }
    expanded.value = false;
    update(emptyValue);
    emit("clear");
    clearAllNewOption();
    focus();
  };
  const onKeyboardNavigate = (direction, hoveringIndex = void 0) => {
    const options = filteredOptions.value;
    if (!["forward", "backward"].includes(direction) || selectDisabled.value || options.length <= 0 || optionsAllDisabled.value) {
      return;
    }
    if (!expanded.value) {
      return toggleMenu();
    }
    if (hoveringIndex === void 0) {
      hoveringIndex = states.hoveringIndex;
    }
    let newIndex = -1;
    if (direction === "forward") {
      newIndex = hoveringIndex + 1;
      if (newIndex >= options.length) {
        newIndex = 0;
      }
    } else if (direction === "backward") {
      newIndex = hoveringIndex - 1;
      if (newIndex < 0 || newIndex >= options.length) {
        newIndex = options.length - 1;
      }
    }
    const option = options[newIndex];
    if (getDisabled(option) || option.type === "Group") {
      return onKeyboardNavigate(direction, newIndex);
    } else {
      states.hoveringIndex = newIndex;
      scrollToItem(newIndex);
    }
  };
  const onKeyboardSelect = () => {
    if (!expanded.value) {
      return toggleMenu();
    } else if (~states.hoveringIndex && filteredOptions.value[states.hoveringIndex]) {
      onSelect(filteredOptions.value[states.hoveringIndex], states.hoveringIndex);
    }
  };
  const onHoverOption = (idx) => {
    states.hoveringIndex = idx;
  };
  const updateHoveringIndex = () => {
    if (!props.multiple) {
      states.hoveringIndex = filteredOptions.value.findIndex((item) => {
        return getValueKey(item) === getValueKey(props.modelValue);
      });
    } else {
      states.hoveringIndex = filteredOptions.value.findIndex((item) => props.modelValue.some((modelValue) => getValueKey(modelValue) === getValueKey(item)));
    }
  };
  const onInput = (event) => {
    states.inputValue = event.target.value;
    if (props.remote) {
      debouncedOnInputChange();
    } else {
      return onInputChange();
    }
  };
  const handleClickOutside = (event) => {
    expanded.value = false;
    if (isFocused.value) {
      const _event = new FocusEvent("focus", event);
      handleBlur(_event);
    }
  };
  const handleMenuEnter = () => {
    return vue.nextTick(() => {
      if (~indexRef.value) {
        scrollToItem(states.hoveringIndex);
      }
    });
  };
  const scrollToItem = (index) => {
    menuRef.value.scrollToItem(index);
  };
  const getOption = (value) => {
    const selectValue = getValueKey(value);
    if (allOptionsValueMap.value.has(selectValue)) {
      const { option } = allOptionsValueMap.value.get(selectValue);
      return option;
    }
    return {
      value,
      label: value
    };
  };
  const initStates = () => {
    if (props.multiple) {
      if (props.modelValue.length > 0) {
        states.cachedOptions.length = 0;
        states.previousValue = props.modelValue.toString();
        for (const value of props.modelValue) {
          const option = getOption(value);
          states.cachedOptions.push(option);
        }
      } else {
        states.cachedOptions = [];
        states.previousValue = void 0;
      }
    } else {
      if (hasModelValue.value) {
        states.previousValue = props.modelValue;
        const options = filteredOptions.value;
        const selectedItemIndex = options.findIndex((option) => getValueKey(getValue(option)) === getValueKey(props.modelValue));
        if (~selectedItemIndex) {
          states.selectedLabel = getLabel(options[selectedItemIndex]);
        } else {
          states.selectedLabel = getValueKey(props.modelValue);
        }
      } else {
        states.selectedLabel = "";
        states.previousValue = void 0;
      }
    }
    clearAllNewOption();
    calculatePopperSize();
  };
  vue.watch(expanded, (val) => {
    if (val) {
      handleQueryChange("");
    } else {
      states.inputValue = "";
      states.previousQuery = null;
      states.isBeforeHide = true;
      createNewOption("");
    }
    emit("visible-change", val);
  });
  vue.watch(() => props.modelValue, (val, oldVal) => {
    var _a;
    if (!val || val.toString() !== states.previousValue) {
      initStates();
    }
    if (!lodashUnified.isEqual(val, oldVal) && props.validateEvent) {
      (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change").catch((err) => error.debugWarn(err));
    }
  }, {
    deep: true
  });
  vue.watch(() => props.options, () => {
    const input = inputRef.value;
    if (!input || input && document.activeElement !== input) {
      initStates();
    }
  }, {
    deep: true,
    flush: "post"
  });
  vue.watch(() => filteredOptions.value, () => {
    return menuRef.value && vue.nextTick(menuRef.value.resetScrollTop);
  });
  vue.watchEffect(() => {
    if (states.isBeforeHide)
      return;
    updateOptions();
  });
  vue.watchEffect(() => {
    const { valueKey, options } = props;
    const duplicateValue = /* @__PURE__ */ new Map();
    for (const item of options) {
      const optionValue = getValue(item);
      let v = optionValue;
      if (shared.isObject(v)) {
        v = lodashUnified.get(optionValue, valueKey);
      }
      if (duplicateValue.get(v)) {
        error.debugWarn("ElSelectV2", `The option values you provided seem to be duplicated, which may cause some problems, please check.`);
        break;
      } else {
        duplicateValue.set(v, true);
      }
    }
  });
  vue.onMounted(() => {
    initStates();
  });
  core.useResizeObserver(selectRef, handleResize);
  core.useResizeObserver(selectionRef, resetSelectionWidth);
  core.useResizeObserver(calculatorRef, resetCalculatorWidth);
  core.useResizeObserver(menuRef, updateTooltip);
  core.useResizeObserver(wrapperRef, updateTooltip);
  core.useResizeObserver(tagMenuRef, updateTagTooltip);
  core.useResizeObserver(collapseItemRef, resetCollapseItemWidth);
  return {
    inputId,
    collapseTagSize,
    currentPlaceholder,
    expanded,
    emptyText,
    popupHeight,
    debounce,
    allOptions,
    filteredOptions,
    iconComponent,
    iconReverse,
    tagStyle,
    collapseTagStyle,
    inputStyle,
    popperSize,
    dropdownMenuVisible,
    hasModelValue,
    shouldShowPlaceholder,
    selectDisabled,
    selectSize,
    showClearBtn,
    states,
    isFocused,
    nsSelect,
    nsInput,
    calculatorRef,
    inputRef,
    menuRef,
    tagMenuRef,
    tooltipRef,
    tagTooltipRef,
    selectRef,
    wrapperRef,
    selectionRef,
    prefixRef,
    suffixRef,
    collapseItemRef,
    popperRef,
    validateState,
    validateIcon,
    showTagList,
    collapseTagList,
    debouncedOnInputChange,
    deleteTag,
    getLabel,
    getValue,
    getDisabled,
    getValueKey,
    handleBlur,
    handleClear,
    handleClickOutside,
    handleDel,
    handleEsc,
    handleFocus,
    focus,
    blur,
    handleMenuEnter,
    handleResize,
    resetSelectionWidth,
    resetCalculatorWidth,
    updateTooltip,
    updateTagTooltip,
    updateOptions,
    toggleMenu,
    scrollTo: scrollToItem,
    onInput,
    onKeyboardNavigate,
    onKeyboardSelect,
    onSelect,
    onHover: onHoverOption,
    handleCompositionStart,
    handleCompositionEnd,
    handleCompositionUpdate
  };
};

exports["default"] = useSelect;
//# sourceMappingURL=useSelect.js.map
