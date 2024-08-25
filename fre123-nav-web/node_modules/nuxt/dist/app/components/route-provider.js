import { defineComponent, h, nextTick, onMounted, provide, shallowReactive } from "vue";
import { PageRouteSymbol } from "./injections.js";
export const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    let vnode;
    if (import.meta.dev && import.meta.client && props.trackRootNodes) {
      onMounted(() => {
        nextTick(() => {
          if (["#comment", "#text"].includes(vnode?.el?.nodeName)) {
            const filename = (vnode?.type).__file;
            console.warn(`[nuxt] \`${filename}\` does not have a single root node and will cause errors when navigating between routes.`);
          }
        });
      });
    }
    return () => {
      if (import.meta.dev && import.meta.client) {
        vnode = h(props.vnode, { ref: props.vnodeRef });
        return vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
