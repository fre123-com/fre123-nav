import { getCurrentInstance } from 'vue';
import { V as Vue3, h as headSymbol } from './shared/vue.cf295fb1.mjs';
import { u as useHead } from './shared/vue.f36acd1f.mjs';
import 'unhead';
import '@unhead/shared';

const UnheadPlugin = function(_Vue) {
  _Vue.mixin({
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
    },
    beforeCreate() {
      const options = this.$options;
      if (options.unhead) {
        const origProvide = options.provide;
        options.provide = function() {
          let origProvideResult;
          if (typeof origProvide === "function")
            origProvideResult = origProvide.call(this);
          else
            origProvideResult = origProvide || {};
          return {
            ...origProvideResult,
            [headSymbol]: options.unhead
          };
        };
      }
    }
  });
};

export { UnheadPlugin };
