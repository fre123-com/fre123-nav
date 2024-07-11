import { useScript as useScript$1 } from 'unhead';
export { CapoPlugin, HashHydrationPlugin, createHeadCore } from 'unhead';
import { V as Vue3, h as headSymbol, i as injectHead } from './shared/vue.cf295fb1.mjs';
export { c as createHead, a as createServerHead, r as resolveUnrefHeadInput, s as setHeadInjectionHandler } from './shared/vue.cf295fb1.mjs';
import { getCurrentInstance, ref, computed } from 'vue';
import { u as useHead } from './shared/vue.f36acd1f.mjs';
import { composableNames, whitelistSafeInput, unpackMeta, NetworkEvents } from '@unhead/shared';

const VueHeadMixin = {
  created() {
    let source = false;
    if (Vue3) {
      const instance = getCurrentInstance();
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
    source && useHead(source);
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
          [headSymbol]: head
        };
      };
    }
  });
};

const coreComposableNames = [
  "injectHead"
];
const unheadVueComposablesImports = {
  "@unhead/vue": [...coreComposableNames, ...composableNames]
};

function useHeadSafe(input, options = {}) {
  return useHead(input, { ...options, transform: whitelistSafeInput });
}

function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
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
  const head = options.head || injectHead();
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
  const head = injectHead();
  const ctx = getCurrentInstance();
  const options = _options || {};
  options.head = head;
  const status = ref("awaitingLoad");
  NetworkEvents.forEach((fn) => {
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
        loaded: computed(() => status.value === "loaded")
      };
    }
  };
  const instance = useScript$1(input, options);
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

export { Vue2ProvideUnheadPlugin, VueHeadMixin, injectHead, unheadVueComposablesImports, useHead, useHeadSafe, useScript, useSeoMeta, useServerHead, useServerHeadSafe, useServerSeoMeta };
