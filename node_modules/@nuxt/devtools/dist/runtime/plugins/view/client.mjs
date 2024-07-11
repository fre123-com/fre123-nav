import { computed, createApp, h, markRaw, nextTick, ref, shallowReactive, shallowRef, watch } from "vue";
import { createHooks } from "hookable";
import { debounce } from "perfect-debounce";
import { initTimelineMetrics } from "../../function-metrics-helpers.mjs";
import Main from "./Main.vue";
import { popupWindow, state } from "./state.mjs";
import { useAppConfig, useRuntimeConfig } from "#imports";
const clientRef = shallowRef();
export { clientRef as client };
export async function setupDevToolsClient({
  nuxt,
  clientHooks,
  timeMetric,
  router
}) {
  const isInspecting = ref(false);
  const colorMode = useClientColorMode();
  const timeline = initTimelineMetrics();
  const client = shallowReactive({
    nuxt: markRaw(nuxt),
    hooks: createHooks(),
    inspector: getInspectorInstance(),
    getIframe,
    syncClient,
    devtools: {
      toggle() {
        if (state.value.open)
          client.devtools.close();
        else
          client.devtools.open();
      },
      close() {
        if (!state.value.open)
          return;
        state.value.open = false;
        if (popupWindow.value) {
          try {
            popupWindow.value.close();
          } catch (e) {
          }
          popupWindow.value = null;
        }
      },
      open() {
        if (state.value.open)
          return;
        state.value.open = true;
        return nextTick(() => {
          client.syncClient();
        });
      },
      async navigate(path) {
        if (!state.value.open)
          await client.devtools.open();
        await client.hooks.callHook("host:action:navigate", path);
      },
      async reload() {
        await client.hooks.callHook("host:action:reload");
      }
    },
    app: {
      appConfig: useAppConfig(),
      reload() {
        location.reload();
      },
      navigate(path, hard = false) {
        if (hard)
          location.href = path;
        else
          router.push(path);
      },
      colorMode,
      frameState: state,
      $fetch: globalThis.$fetch
    },
    metrics: {
      clientPlugins: () => window.__NUXT_DEVTOOLS_PLUGINS_METRIC__,
      clientHooks: () => Object.values(clientHooks),
      clientTimeline: () => timeline,
      loading: () => timeMetric
    }
  });
  window.__NUXT_DEVTOOLS_HOST__ = client;
  let iframe;
  function syncClient() {
    if (!client.inspector)
      client.inspector = getInspectorInstance();
    try {
      iframe?.contentWindow?.__NUXT_DEVTOOLS_VIEW__?.setClient(client);
    } catch (e) {
    }
    return client;
  }
  function getIframe() {
    if (!iframe) {
      const runtimeConfig = useRuntimeConfig();
      const CLIENT_PATH = `${runtimeConfig.app.baseURL}/__nuxt_devtools__/client`.replace(/\/+/g, "/");
      const initialUrl = CLIENT_PATH + state.value.route;
      iframe = document.createElement("iframe");
      for (const [key, value] of Object.entries(runtimeConfig.app.devtools?.iframeProps || {}))
        iframe.setAttribute(key, String(value));
      iframe.id = "nuxt-devtools-iframe";
      iframe.src = initialUrl;
      iframe.onload = async () => {
        try {
          await waitForClientInjection();
          client.syncClient();
        } catch (e) {
          console.error("Nuxt DevTools client injection failed");
          console.error(e);
        }
      };
    }
    return iframe;
  }
  function waitForClientInjection(retry = 20, timeout = 300) {
    let lastError;
    const test = () => {
      try {
        return !!iframe?.contentWindow?.__NUXT_DEVTOOLS_VIEW__;
      } catch (e) {
        lastError = e;
      }
      return false;
    };
    if (test())
      return;
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (test()) {
          clearInterval(interval);
          resolve();
        } else if (retry-- <= 0) {
          clearInterval(interval);
          reject(lastError);
        }
      }, timeout);
    });
  }
  function enableComponentInspector() {
    window.__VUE_INSPECTOR__?.enable();
    isInspecting.value = true;
  }
  function disableComponentInspector() {
    if (!window.__VUE_INSPECTOR__?.enabled)
      return;
    window.__VUE_INSPECTOR__?.disable();
    client?.hooks.callHook("host:inspector:close");
    isInspecting.value = false;
  }
  function getInspectorInstance() {
    const componentInspector = window.__VUE_INSPECTOR__;
    if (componentInspector) {
      componentInspector.openInEditor = async (baseUrl, file, line, column) => {
        disableComponentInspector();
        await client.hooks.callHook("host:inspector:click", baseUrl, file, line, column);
      };
      componentInspector.onUpdated = () => {
        client.hooks.callHook("host:inspector:update", {
          ...componentInspector.linkParams,
          ...componentInspector.position
        });
      };
    }
    return markRaw({
      isEnabled: isInspecting,
      enable: enableComponentInspector,
      disable: disableComponentInspector,
      toggle: () => {
        if (window.__VUE_INSPECTOR__?.enabled)
          disableComponentInspector();
        else
          enableComponentInspector();
      },
      instance: componentInspector
    });
  }
  setupRouteTracking(timeline, router);
  setupReactivity(client, router, timeline);
  clientRef.value = client;
  const documentPictureInPicture = window.documentPictureInPicture;
  if (documentPictureInPicture?.requestWindow) {
    client.devtools.popup = async () => {
      const iframe2 = getIframe();
      if (!iframe2)
        return;
      const pip = popupWindow.value = await documentPictureInPicture.requestWindow({
        width: Math.round(window.innerWidth * state.value.width / 100),
        height: Math.round(window.innerHeight * state.value.height / 100)
      });
      const style = pip.document.createElement("style");
      style.innerHTML = `
        body {
          margin: 0;
          padding: 0;
        }
        iframe {
          width: 100vw;
          height: 100vh;
          border: none;
          outline: none;
        }
      `;
      pip.__NUXT_DEVTOOLS_DISABLE__ = true;
      pip.__NUXT_DEVTOOLS_IS_POPUP__ = true;
      pip.__NUXT__ = window.parent?.__NUXT__ || window.__NUXT__;
      pip.document.title = "Nuxt DevTools";
      pip.document.head.appendChild(style);
      pip.document.body.appendChild(iframe2);
      pip.addEventListener("resize", () => {
        state.value.width = Math.round(pip.innerWidth / window.innerWidth * 100);
        state.value.height = Math.round(pip.innerHeight / window.innerHeight * 100);
      });
      pip.addEventListener("pagehide", () => {
        popupWindow.value = null;
        pip.close();
      });
    };
  }
  client.syncClient();
  const holder = document.createElement("div");
  holder.id = "nuxt-devtools-container";
  holder.setAttribute("data-v-inspector-ignore", "true");
  document.body.appendChild(holder);
  addEventListener("keydown", (e) => {
    if (e.code === "KeyD" && e.altKey && e.shiftKey)
      client.devtools.toggle();
  });
  const app = createApp({
    render: () => h(Main, { client }),
    devtools: {
      hide: true
    }
  });
  app.mount(holder);
}
export function useClientColorMode() {
  const explicitColor = ref();
  const systemColor = ref();
  const elements = [
    document.documentElement,
    document.body
  ];
  const ob = new MutationObserver(getExplicitColor);
  elements.forEach((el) => {
    ob.observe(el, {
      attributes: true,
      attributeFilter: ["class"]
    });
  });
  const preferDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const preferLightQuery = window.matchMedia("(prefers-color-scheme: light)");
  preferDarkQuery.addEventListener("change", getSystemColor);
  preferLightQuery.addEventListener("change", getSystemColor);
  function getExplicitColor() {
    let color;
    for (const el of elements) {
      if (el.classList.contains("dark")) {
        color = "dark";
        break;
      }
      if (el.classList.contains("light")) {
        color = "light";
        break;
      }
    }
    explicitColor.value = color;
  }
  function getSystemColor() {
    if (preferDarkQuery.matches)
      systemColor.value = "dark";
    else if (preferLightQuery.matches)
      systemColor.value = "light";
    else
      systemColor.value = void 0;
  }
  getExplicitColor();
  getSystemColor();
  return computed(() => explicitColor.value || systemColor.value || "light");
}
function setupRouteTracking(timeline, router) {
  if (timeline.options.enabled && router?.currentRoute?.value?.path) {
    const start = timeline.events[0]?.start || Date.now();
    timeline.events.unshift({
      type: "route",
      from: router.currentRoute.value.path,
      to: router.currentRoute.value.path,
      start,
      end: start
    });
  }
  let lastRouteEvent;
  router?.afterEach(() => {
    if (lastRouteEvent && !lastRouteEvent?.end)
      lastRouteEvent.end = Date.now();
  });
  router?.beforeEach((to, from) => {
    if (!timeline.options.enabled)
      return;
    lastRouteEvent = {
      type: "route",
      from: from.path,
      to: to.path,
      start: Date.now()
    };
    timeline.events.push(lastRouteEvent);
  });
}
function setupReactivity(client, router, timeMetric) {
  const refreshReactivity = debounce(() => {
    client.hooks.callHook("host:update:reactivity");
  }, 100, { trailing: true });
  watch(() => [
    client.nuxt.payload,
    client.app.colorMode.value,
    client.metrics.loading(),
    timeMetric
  ], () => {
    refreshReactivity();
  }, { deep: true });
  router?.afterEach(() => {
    refreshReactivity();
  });
  client.nuxt.hook("app:mounted", () => {
    refreshReactivity();
  });
  client.hooks.hook("devtools:navigate", (path) => {
    state.value.route = path;
  });
}
