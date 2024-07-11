import { KeepAlive, h } from "vue";
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => route.params[r.slice(1)]?.toString() || "");
};
export const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
  const source = override ?? matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
export const wrapInKeepAlive = (props, children) => {
  return { default: () => import.meta.client && props ? h(KeepAlive, props === true ? {} : props, children) : children };
};
export function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
