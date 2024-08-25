'use strict';

const vue = require('vue');
const injectHead = require('./shared/vue.77729ad4.cjs');
const useHead = require('./shared/vue.af935fad.cjs');
require('unhead');
require('@unhead/shared');

const UnheadPlugin = function(_Vue) {
  _Vue.mixin({
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
            [injectHead.headSymbol]: options.unhead
          };
        };
      }
    }
  });
};

exports.UnheadPlugin = UnheadPlugin;
