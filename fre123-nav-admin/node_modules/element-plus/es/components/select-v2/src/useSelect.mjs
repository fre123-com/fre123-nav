import { reactive, ref, computed, nextTick, watch, watchEffect, onMounted } from 'vue';
import { isArray, isFunction, isObject } from '@vue/shared';
import { isNil, debounce, isEqual, get, findLastIndex } from 'lodash-unified';
import { useResizeObserver } from '@vueuse/core';
import '../../../hooks/index.mjs';
import '../../../constants/index.mjs';
import '../../../utils/index.mjs';
import '../../form/index.mjs';
import { ArrowDown } from '@element-plus/icons-vue';
import { useAllowCreate } from './useAllowCreate.mjs';
import { useInput } from './useInput.mjs';
import { useProps } from './useProps.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useFormItem, useFormItemInputId } from '../../form/src/hooks/use-form-item.mjs';
import { useFocusController } from '../../../hooks/use-focus-controller/index.mjs';
import { ValidateComponentsMap } from '../../../utils/vue/icon.mjs';
import { escapeStringRegexp } from '../../../utils/strings.mjs';
import { useFormSize } from '../../form/src/hooks/use-form-common-props.mjs';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';
import { debugWarn } from '../../../utils/error.mjs';

const MINIMUM_INPUT_WIDTH = 11;
const useSelect = (props, emit) => {
  const { t } = useLocale();
  const nsSelect = useNamespace("select");
  const nsInput = useNamespace("input");
  const { form: elForm, formItem: elFormItem } = useFormItem();
  const { inputId } = useFormItemInputId(props, {
    formItemContext: elFormItem
  });
  const { getLabel, getValue, getDisabled, getOptions } = useProps(props);
  const states = reactive({
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
  const selectedIndex = ref(-1);
  const popperSize = ref(-1);
  const selectRef = ref(null);
  const selectionRef = ref(null);
  const tooltipRef = ref(null);
  const tagTooltipRef = ref(null);
  const inputRef = ref(null);
  const calculatorRef = ref(null);
  const prefixRef = ref(null);
  const suffixRef = ref(null);
  const menuRef = ref(null);
  const tagMenuRef = ref(null);
  const collapseItemRef = ref(null);
  const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(inputRef, {
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
  const allOptions = ref([]);
  const filteredOptions = ref([]);
  const expanded = ref(false);
  const selectDisabled = computed(() => props.disabled || (elForm == null ? void 0 : elForm.disabled));
  const popupHeight = computed(() => {
    const totalHeight = filteredOptions.value.length * props.itemHeight;
    return totalHeight > props.height ? props.height : totalHeight;
  });
  const hasEmptyStringOption = computed(() => allOptions.value.some((option) => getValue(option) === ""));
  const hasModelValue = computed(() => {
    return props.multiple ? isArray(props.modelValue) && props.modelValue.length > 0 : !isNil(props.modelValue) && (props.modelValue !== "" || hasEmptyStringOption.value);
  });
  const showClearBtn = computed(() => {
    const criteria = props.clearable && !selectDisabled.value && states.inputHovering && hasModelValue.value;
    return criteria;
  });
  const iconComponent = computed(() => props.remote && props.filterable ? "" : ArrowDown);
  const iconReverse = computed(() => iconComponent.value && nsSelect.is("reverse", expanded.value));
  const validateState = computed(() => (elFormItem == null ? void 0 : elFormItem.validateState) || "");
  const validateIcon = computed(() => ValidateComponentsMap[validateState.value]);
  const debounce$1 = computed(() => props.remote ? 300 : 0);
  const emptyText = computed(() => {
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
      if (props.filterable && isFunction(props.filterMethod))
        return true;
      if (props.filterable && props.remote && isFunction(props.remoteMethod))
        return true;
      const regexp = new RegExp(escapeStringRegexp(query), "i");
      return query ? regexp.test(getLabel(o) || "") : true;
    };
    if (props.loading) {
      return [];
    }
    return [...states.createdOptions, ...props.options].reduce((all, item) => {
      const options = getOptions(item);
      if (isArray(options)) {
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
  const allOptionsValueMap = computed(() => {
    const valueMap = /* @__PURE__ */ new Map();
    allOptions.value.forEach((option, index) => {
      valueMap.set(getValueKey(getValue(option)), { option, index });
    });
    return valueMap;
  });
  const filteredOptionsValueMap = computed(() => {
    const valueMap = /* @__PURE__ */ new Map();
    filteredOptions.value.forEach((option, index) => {
      valueMap.set(getValueKey(getValue(option)), { option, index });
    });
    return valueMap;
  });
  const optionsAllDisabled = computed(() => filteredOptions.value.every((option) => getDisabled(option)));
  const selectSize = useFormSize();
  const collapseTagSize = computed(() => selectSize.value === "small" ? "small" : "default");
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
  const tagStyle = computed(() => {
    const gapWidth = getGapWidth();
    const maxWidth = collapseItemRef.value && props.maxCollapseTags === 1 ? states.selectionWidth - states.collapseItemWidth - gapWidth : states.selectionWidth;
    return { maxWidth: `${maxWidth}px` };
  });
  const collapseTagStyle = computed(() => {
    return { maxWidth: `${states.selectionWidth}px` };
  });
  const inputStyle = computed(() => ({
    width: `${Math.max(states.calculatorWidth, MINIMUM_INPUT_WIDTH)}px`
  }));
  const shouldShowPlaceholder = computed(() => {
    if (isArray(props.modelValue)) {
      return props.modelValue.length === 0 && !states.inputValue;
    }
    return props.filterable ? !states.inputValue : true;
  });
  const currentPlaceholder = computed(() => {
    var _a;
    const _placeholder = (_a = props.placeholder) != null ? _a : t("el.select.placeholder");
    return props.multiple || !hasModelValue.value ? _placeholder : states.selectedLabel;
  });
  const popperRef = computed(() => {
    var _a, _b;
    return (_b = (_a = tooltipRef.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.contentRef;
  });
  const indexRef = computed(() => {
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
  const dropdownMenuVisible = computed({
    get() {
      return expanded.value && emptyText.value !== false;
    },
    set(val) {
      expanded.value = val;
    }
  });
  const showTagList = computed(() => {
    if (!props.multiple) {
      return [];
    }
    return props.collapseTags ? states.cachedOptions.slice(0, props.maxCollapseTags) : states.cachedOptions;
  });
  const collapseTagList = computed(() => {
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
  } = useAllowCreate(props, states);
  const {
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd
  } = useInput((e) => onInput(e));
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
  const debouncedOnInputChange = debounce(onInputChange, debounce$1.value);
  const handleQueryChange = (val) => {
    if (states.previousQuery === val) {
      return;
    }
    states.previousQuery = val;
    if (props.filterable && isFunction(props.filterMethod)) {
      props.filterMethod(val);
    } else if (props.filterable && props.remote && isFunction(props.remoteMethod)) {
      props.remoteMethod(val);
    }
    if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptions.value.length) {
      nextTick(checkDefaultFirstOption);
    } else {
      nextTick(updateHoveringIndex);
    }
  };
  const checkDefaultFirstOption = () => {
    const optionsInDropdown = filteredOptions.value.filter((n) => !n.disabled && n.type !== "Group");
    const userCreatedOption = optionsInDropdown.find((n) => n.created);
    const firstOriginOption = optionsInDropdown[0];
    states.hoveringIndex = getValueIndex(filteredOptions.value, userCreatedOption || firstOriginOption);
  };
  const emitChange = (val) => {
    if (!isEqual(props.modelValue, val)) {
      emit(CHANGE_EVENT, val);
    }
  };
  const update = (val) => {
    emit(UPDATE_MODEL_EVENT, val);
    emitChange(val);
    states.previousValue = String(val);
  };
  const getValueIndex = (arr = [], value) => {
    if (!isObject(value)) {
      return arr.indexOf(value);
    }
    const valueKey = props.valueKey;
    let index = -1;
    arr.some((item, i) => {
      if (get(item, valueKey) === get(value, valueKey)) {
        index = i;
        return true;
      }
      return false;
    });
    return index;
  };
  const getValueKey = (item) => {
    return isObject(item) ? get(item, props.valueKey) : item;
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
  const getLastNotDisabledIndex = (value) => findLastIndex(value, (it) => !states.cachedOptions.some((option) => getValue(option) === it && getDisabled(option)));
  const handleDel = (e) => {
    if (!props.multiple)
      return;
    if (e.code === EVENT_CODE.delete)
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
    if (isArray(props.modelValue)) {
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
    return nextTick(() => {
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
  watch(expanded, (val) => {
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
  watch(() => props.modelValue, (val, oldVal) => {
    var _a;
    if (!val || val.toString() !== states.previousValue) {
      initStates();
    }
    if (!isEqual(val, oldVal) && props.validateEvent) {
      (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change").catch((err) => debugWarn(err));
    }
  }, {
    deep: true
  });
  watch(() => props.options, () => {
    const input = inputRef.value;
    if (!input || input && document.activeElement !== input) {
      initStates();
    }
  }, {
    deep: true,
    flush: "post"
  });
  watch(() => filteredOptions.value, () => {
    return menuRef.value && nextTick(menuRef.value.resetScrollTop);
  });
  watchEffect(() => {
    if (states.isBeforeHide)
      return;
    updateOptions();
  });
  watchEffect(() => {
    const { valueKey, options } = props;
    const duplicateValue = /* @__PURE__ */ new Map();
    for (const item of options) {
      const optionValue = getValue(item);
      let v = optionValue;
      if (isObject(v)) {
        v = get(optionValue, valueKey);
      }
      if (duplicateValue.get(v)) {
        debugWarn("ElSelectV2", `The option values you provided seem to be duplicated, which may cause some problems, please check.`);
        break;
      } else {
        duplicateValue.set(v, true);
      }
    }
  });
  onMounted(() => {
    initStates();
  });
  useResizeObserver(selectRef, handleResize);
  useResizeObserver(selectionRef, resetSelectionWidth);
  useResizeObserver(calculatorRef, resetCalculatorWidth);
  useResizeObserver(menuRef, updateTooltip);
  useResizeObserver(wrapperRef, updateTooltip);
  useResizeObserver(tagMenuRef, updateTagTooltip);
  useResizeObserver(collapseItemRef, resetCollapseItemWidth);
  return {
    inputId,
    collapseTagSize,
    currentPlaceholder,
    expanded,
    emptyText,
    popupHeight,
    debounce: debounce$1,
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

export { useSelect as default };
//# sourceMappingURL=useSelect.mjs.map
