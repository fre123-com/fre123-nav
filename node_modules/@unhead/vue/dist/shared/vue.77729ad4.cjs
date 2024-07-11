'use strict';

const vue = require('vue');
const unhead = require('unhead');
const shared = require('@unhead/shared');

const Vue3 = vue.version.startsWith("3");

function resolveUnref(r) {
  return typeof r === "function" ? r() : vue.unref(r);
}
function resolveUnrefHeadInput(ref, lastKey = "") {
  if (ref instanceof Promise)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, vue.unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}

const VueReactivityPlugin = shared.defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = unhead.createServerHead(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}
function createHead(options = {}) {
  options.domDelayFn = options.domDelayFn || ((fn) => vue.nextTick(() => setTimeout(() => fn(), 0)));
  const head = unhead.createHead(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey] = handler;
}
function injectHead() {
  if (globalKey in _global) {
    return _global[globalKey]();
  }
  const head = vue.inject(headSymbol);
  if (!head && process.env.NODE_ENV !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || unhead.getActiveHead();
}

exports.Vue3 = Vue3;
exports.createHead = createHead;
exports.createServerHead = createServerHead;
exports.headSymbol = headSymbol;
exports.injectHead = injectHead;
exports.resolveUnrefHeadInput = resolveUnrefHeadInput;
exports.setHeadInjectionHandler = setHeadInjectionHandler;
