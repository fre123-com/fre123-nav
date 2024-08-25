import { computed, getCurrentInstance, getCurrentScope, onMounted, onScopeDispose, ref, toValue, watch } from "vue";
export function useObjectStorage(key, initial, listenToStorage = true) {
  const raw = localStorage.getItem(key);
  const data = ref(raw ? JSON.parse(raw) : initial);
  for (const key2 in initial) {
    if (data.value[key2] === void 0)
      data.value[key2] = initial[key2];
  }
  let updating = false;
  let wrote = "";
  watch(data, (value) => {
    if (updating)
      return;
    wrote = JSON.stringify(value);
    localStorage.setItem(key, wrote);
  }, { deep: true, flush: "post" });
  if (listenToStorage) {
    useEventListener(window, "storage", (e) => {
      if (e.key === key && e.newValue && e.newValue !== wrote) {
        updating = true;
        data.value = JSON.parse(e.newValue);
        updating = false;
      }
    });
  }
  return data;
}
export function useTransform(data, to, from) {
  return computed({
    get() {
      return to(data.value);
    },
    set(value) {
      data.value = from(value);
    }
  });
}
export function useEventListener(target, type, listener, options) {
  target.addEventListener(type, listener, options);
  getCurrentScope() && onScopeDispose(() => target.removeEventListener(type, listener, options));
}
export function useElementBounding(target) {
  const height = ref(0);
  const bottom = ref(0);
  const left = ref(0);
  const right = ref(0);
  const top = ref(0);
  const width = ref(0);
  const x = ref(0);
  const y = ref(0);
  function update() {
    const el = toValue(target);
    if (!el) {
      height.value = 0;
      bottom.value = 0;
      left.value = 0;
      right.value = 0;
      top.value = 0;
      width.value = 0;
      x.value = 0;
      y.value = 0;
      return;
    }
    const rect = el.getBoundingClientRect();
    height.value = rect.height;
    bottom.value = rect.bottom;
    left.value = rect.left;
    right.value = rect.right;
    top.value = rect.top;
    width.value = rect.width;
    x.value = rect.x;
    y.value = rect.y;
  }
  watch(() => toValue(target), update);
  useEventListener(window, "resize", update);
  if (getCurrentInstance())
    onMounted(() => update());
  let observer;
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(
    () => toValue(target),
    (el) => {
      cleanup();
      if (window) {
        observer = new ResizeObserver(update);
        el && observer.observe(el);
      }
    },
    { immediate: true, flush: "post", deep: true }
  );
  getCurrentScope() && onScopeDispose(() => {
    cleanup();
    stopWatch();
  });
  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update
  };
}
export function millisecondToHumanreadable(ms) {
  if (ms < 1e3)
    return [+ms.toFixed(0), "ms"];
  if (ms < 1e3 * 60)
    return [+(ms / 1e3).toFixed(1), "s"];
  if (ms < 1e3 * 60 * 60)
    return [+(ms / 1e3 / 60).toFixed(1), "min"];
  return [+(ms / 1e3 / 60 / 60).toFixed(1), "hour"];
}
const topVarName = "--nuxt-devtools-safe-area-top";
const rightVarName = "--nuxt-devtools-safe-area-right";
const bottomVarName = "--nuxt-devtools-safe-area-bottom";
const leftVarName = "--nuxt-devtools-safe-area-left";
export function useScreenSafeArea() {
  const top = ref(0);
  const right = ref(0);
  const bottom = ref(0);
  const left = ref(0);
  document.documentElement.style.setProperty(topVarName, "env(safe-area-inset-top, 0px)");
  document.documentElement.style.setProperty(rightVarName, "env(safe-area-inset-right, 0px)");
  document.documentElement.style.setProperty(bottomVarName, "env(safe-area-inset-bottom, 0px)");
  document.documentElement.style.setProperty(leftVarName, "env(safe-area-inset-left, 0px)");
  update();
  useEventListener(window, "resize", update);
  function getValue(position) {
    return Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(position)) || 0;
  }
  function update() {
    top.value = getValue(topVarName);
    right.value = getValue(rightVarName);
    bottom.value = getValue(bottomVarName);
    left.value = getValue(leftVarName);
  }
  return {
    top,
    right,
    bottom,
    left,
    update
  };
}
