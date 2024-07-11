'use strict';

const unhead = require('unhead');
const injectHead = require('./shared/vue.77729ad4.cjs');
const vue = require('vue');
const useHead = require('./shared/vue.af935fad.cjs');
const shared = require('@unhead/shared');

const VueHeadMixin = {
  created() {
    let source = false;
    if (injectHead.Vue3) {
      const instance = vue.getCurrentInstance();
      if (!instance)
        return;
      const options = instance.type;
      if (!options || !("head" in options))
        return;
      source = typeof options.head === "function" ? () => options.head.call(instance.proxy) : options.head;
    } else {
      const head = this.$options.head;
      if (head) {
        source = typeof head === "function" ? () => head.call(this) : head;
      }
    }
    source && useHead.useHead(source);
  }
};

const Vue2ProvideUnheadPlugin = function(_Vue, head) {
  _Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      const origProvide = options.provide;
      options.provide = function() {
        let origProvideResult;
        if (typeof origProvide === "function")
          origProvideResult = origProvide.call(this);
        else
          origProvideResult = origProvide || {};
        return {
          ...origProvideResult,
          [injectHead.headSymbol]: head
        };
      };
    }
  });
};

const coreComposableNames = [
  "injectHead"
];
const unheadVueComposablesImports = {
  "@unhead/vue": [...coreComposableNames, ...shared.composableNames]
};

function useHeadSafe(input, options = {}) {
  return useHead.useHead(input, { ...options, transform: shared.whitelistSafeInput });
}

function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead.useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = shared.unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}

function useServerHead(input, options = {}) {
  const head = options.head || injectHead.injectHead();
  delete options.head;
  if (head)
    return head.push(input, { ...options, mode: "server" });
}

function useServerHeadSafe(input, options = {}) {
  return useHeadSafe(input, { ...options, mode: "server" });
}

function useServerSeoMeta(input, options) {
  return useSeoMeta(input, { ...options || {}, mode: "server" });
}

function useScript(input, _options) {
  const head = injectHead.injectHead();
  const ctx = vue.getCurrentInstance();
  const options = _options || {};
  options.head = head;
  const status = vue.ref("awaitingLoad");
  shared.NetworkEvents.forEach((fn) => {
    const _fn = typeof input[fn] === "function" ? input[fn].bind(ctx) : null;
    if (_fn) {
      input[fn] = (e) => _fn(e);
    }
  });
  options.stub = ({ script, fn }) => {
    if (fn === "$script") {
      return {
        ...script,
        status,
        loaded: vue.computed(() => status.value === "loaded")
      };
    }
  };
  const instance = unhead.useScript(input, options);
  function syncStatus({ script }) {
    if (script.id === instance.$script.id) {
      status.value = script.status;
      if (script.status === "removed")
        head.hooks.removeHook(`script:updated`, syncStatus);
    }
  }
  head.hooks.hook(`script:updated`, syncStatus);
  return instance;
}

exports.CapoPlugin = unhead.CapoPlugin;
exports.HashHydrationPlugin = unhead.HashHydrationPlugin;
exports.createHeadCore = unhead.createHeadCore;
exports.createHead = injectHead.createHead;
exports.createServerHead = injectHead.createServerHead;
exports.injectHead = injectHead.injectHead;
exports.resolveUnrefHeadInput = injectHead.resolveUnrefHeadInput;
exports.setHeadInjectionHandler = injectHead.setHeadInjectionHandler;
exports.useHead = useHead.useHead;
exports.Vue2ProvideUnheadPlugin = Vue2ProvideUnheadPlugin;
exports.VueHeadMixin = VueHeadMixin;
exports.unheadVueComposablesImports = unheadVueComposablesImports;
exports.useHeadSafe = useHeadSafe;
exports.useScript = useScript;
exports.useSeoMeta = useSeoMeta;
exports.useServerHead = useServerHead;
exports.useServerHeadSafe = useServerHeadSafe;
exports.useServerSeoMeta = useServerSeoMeta;
