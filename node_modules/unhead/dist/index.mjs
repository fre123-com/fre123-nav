import { createHooks } from 'hookable';
import { DomPlugin } from '@unhead/dom';
import { defineHeadPlugin, tagDedupeKey, tagWeight, HasElementTags, hashCode, NetworkEvents, SortModifiers, processTemplateParams, resolveTitleTemplate, IsBrowser, normaliseEntryTags, composableNames, whitelistSafeInput, unpackMeta } from '@unhead/shared';
export { composableNames } from '@unhead/shared';

const UsesMergeStrategy = ["templateParams", "htmlAttrs", "bodyAttrs"];
const DedupePlugin = defineHeadPlugin({
  hooks: {
    "tag:normalise": function({ tag }) {
      ["hid", "vmid", "key"].forEach((key) => {
        if (tag.props[key]) {
          tag.key = tag.props[key];
          delete tag.props[key];
        }
      });
      const generatedKey = tagDedupeKey(tag);
      const dedupe = generatedKey || (tag.key ? `${tag.tag}:${tag.key}` : false);
      if (dedupe)
        tag._d = dedupe;
    },
    "tags:resolve": function(ctx) {
      const deduping = {};
      ctx.tags.forEach((tag) => {
        const dedupeKey = (tag.key ? `${tag.tag}:${tag.key}` : tag._d) || tag._p;
        const dupedTag = deduping[dedupeKey];
        if (dupedTag) {
          let strategy = tag?.tagDuplicateStrategy;
          if (!strategy && UsesMergeStrategy.includes(tag.tag))
            strategy = "merge";
          if (strategy === "merge") {
            const oldProps = dupedTag.props;
            ["class", "style"].forEach((key) => {
              if (oldProps[key]) {
                if (tag.props[key]) {
                  if (key === "style" && !oldProps[key].endsWith(";"))
                    oldProps[key] += ";";
                  tag.props[key] = `${oldProps[key]} ${tag.props[key]}`;
                } else {
                  tag.props[key] = oldProps[key];
                }
              }
            });
            deduping[dedupeKey].props = {
              ...oldProps,
              ...tag.props
            };
            return;
          } else if (tag._e === dupedTag._e) {
            dupedTag._duped = dupedTag._duped || [];
            tag._d = `${dupedTag._d}:${dupedTag._duped.length + 1}`;
            dupedTag._duped.push(tag);
            return;
          } else if (tagWeight(tag) > tagWeight(dupedTag)) {
            return;
          }
        }
        const propCount = Object.keys(tag.props).length + (tag.innerHTML ? 1 : 0) + (tag.textContent ? 1 : 0);
        if (HasElementTags.includes(tag.tag) && propCount === 0) {
          delete deduping[dedupeKey];
          return;
        }
        deduping[dedupeKey] = tag;
      });
      const newTags = [];
      Object.values(deduping).forEach((tag) => {
        const dupes = tag._duped;
        delete tag._duped;
        newTags.push(tag);
        if (dupes)
          newTags.push(...dupes);
      });
      ctx.tags = newTags;
      ctx.tags = ctx.tags.filter((t) => !(t.tag === "meta" && (t.props.name || t.props.property) && !t.props.content));
    }
  }
});

const PayloadPlugin = defineHeadPlugin({
  mode: "server",
  hooks: {
    "tags:resolve": function(ctx) {
      const payload = {};
      ctx.tags.filter((tag) => ["titleTemplate", "templateParams", "title"].includes(tag.tag) && tag._m === "server").forEach((tag) => {
        payload[tag.tag] = tag.tag.startsWith("title") ? tag.textContent : tag.props;
      });
      Object.keys(payload).length && ctx.tags.push({
        tag: "script",
        innerHTML: JSON.stringify(payload),
        props: { id: "unhead:payload", type: "application/json" }
      });
    }
  }
});

const ValidEventTags = ["script", "link", "bodyAttrs"];
function stripEventHandlers(tag) {
  const props = {};
  const eventHandlers = {};
  Object.entries(tag.props).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      if (NetworkEvents.includes(key))
        props[key] = `this.dataset.${key} = true`;
      eventHandlers[key] = value;
    } else {
      props[key] = value;
    }
  });
  return { props, eventHandlers };
}
const EventHandlersPlugin = defineHeadPlugin((head) => ({
  hooks: {
    "tags:resolve": function(ctx) {
      for (const tag of ctx.tags) {
        if (ValidEventTags.includes(tag.tag)) {
          const { props, eventHandlers } = stripEventHandlers(tag);
          tag.props = props;
          if (Object.keys(eventHandlers).length) {
            if (tag.props.src || tag.props.href)
              tag.key = tag.key || hashCode(tag.props.src || tag.props.href);
            tag._eventHandlers = eventHandlers;
          }
        }
      }
    },
    "dom:renderTag": function(ctx, dom, track) {
      if (!ctx.tag._eventHandlers)
        return;
      const $eventListenerTarget = ctx.tag.tag === "bodyAttrs" ? dom.defaultView : ctx.$el;
      Object.entries(ctx.tag._eventHandlers).forEach(([k, value]) => {
        const sdeKey = `${ctx.tag._d || ctx.tag._p}:${k}`;
        const eventName = k.slice(2).toLowerCase();
        const eventDedupeKey = `data-h-${eventName}`;
        track(ctx.id, sdeKey, () => {
        });
        if (ctx.$el.hasAttribute(eventDedupeKey))
          return;
        ctx.$el.setAttribute(eventDedupeKey, "");
        let observer;
        const handler = (e) => {
          value(e);
          observer?.disconnect();
        };
        if (k in ctx.$el.dataset) {
          handler(new Event(k.replace("on", "")));
        } else if (NetworkEvents.includes(k) && typeof MutationObserver !== "undefined") {
          observer = new MutationObserver((e) => {
            const hasAttr = e.some((m) => m.attributeName === `data-${k}`);
            if (hasAttr) {
              handler(new Event(k.replace("on", "")));
              observer?.disconnect();
            }
          });
          observer.observe(ctx.$el, {
            attributes: true
          });
        } else {
          $eventListenerTarget.addEventListener(eventName, handler);
        }
        track(ctx.id, sdeKey, () => {
          observer?.disconnect();
          $eventListenerTarget.removeEventListener(eventName, handler);
          ctx.$el.removeAttribute(eventDedupeKey);
        });
      });
    }
  }
}));

const DupeableTags = ["link", "style", "script", "noscript"];
const HashKeyedPlugin = defineHeadPlugin({
  hooks: {
    "tag:normalise": ({ tag }) => {
      if (tag.key && DupeableTags.includes(tag.tag)) {
        tag.props["data-hid"] = tag._h = hashCode(tag.key);
      }
    }
  }
});

const SortPlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      const tagPositionForKey = (key) => ctx.tags.find((tag) => tag._d === key)?._p;
      for (const { prefix, offset } of SortModifiers) {
        for (const tag of ctx.tags.filter((tag2) => typeof tag2.tagPriority === "string" && tag2.tagPriority.startsWith(prefix))) {
          const position = tagPositionForKey(
            tag.tagPriority.replace(prefix, "")
          );
          if (typeof position !== "undefined")
            tag._p = position + offset;
        }
      }
      ctx.tags.sort((a, b) => a._p - b._p).sort((a, b) => tagWeight(a) - tagWeight(b));
    }
  }
});

const SupportedAttrs = {
  meta: "content",
  link: "href",
  htmlAttrs: "lang"
};
const TemplateParamsPlugin = defineHeadPlugin((head) => ({
  hooks: {
    "tags:resolve": (ctx) => {
      const { tags } = ctx;
      const title = tags.find((tag) => tag.tag === "title")?.textContent;
      const idx = tags.findIndex((tag) => tag.tag === "templateParams");
      const params = idx !== -1 ? tags[idx].props : {};
      const sep = params.separator || "|";
      delete params.separator;
      params.pageTitle = processTemplateParams(params.pageTitle || title || "", params, sep);
      for (const tag of tags.filter((t) => t.processTemplateParams !== false)) {
        const v = SupportedAttrs[tag.tag];
        if (v && typeof tag.props[v] === "string") {
          tag.props[v] = processTemplateParams(tag.props[v], params, sep);
        } else if (tag.processTemplateParams === true || ["titleTemplate", "title"].includes(tag.tag)) {
          ["innerHTML", "textContent"].forEach((p) => {
            if (typeof tag[p] === "string")
              tag[p] = processTemplateParams(tag[p], params, sep);
          });
        }
      }
      head._templateParams = params;
      head._separator = sep;
      ctx.tags = tags.filter((tag) => tag.tag !== "templateParams");
    }
  }
}));

const TitleTemplatePlugin = defineHeadPlugin({
  hooks: {
    "tags:resolve": (ctx) => {
      const { tags } = ctx;
      let titleTemplateIdx = tags.findIndex((i) => i.tag === "titleTemplate");
      const titleIdx = tags.findIndex((i) => i.tag === "title");
      if (titleIdx !== -1 && titleTemplateIdx !== -1) {
        const newTitle = resolveTitleTemplate(
          tags[titleTemplateIdx].textContent,
          tags[titleIdx].textContent
        );
        if (newTitle !== null) {
          tags[titleIdx].textContent = newTitle || tags[titleIdx].textContent;
        } else {
          delete tags[titleIdx];
        }
      } else if (titleTemplateIdx !== -1) {
        const newTitle = resolveTitleTemplate(
          tags[titleTemplateIdx].textContent
        );
        if (newTitle !== null) {
          tags[titleTemplateIdx].textContent = newTitle;
          tags[titleTemplateIdx].tag = "title";
          titleTemplateIdx = -1;
        }
      }
      if (titleTemplateIdx !== -1) {
        delete tags[titleTemplateIdx];
      }
      ctx.tags = tags.filter(Boolean);
    }
  }
});

const XSSPlugin = defineHeadPlugin({
  hooks: {
    "tags:afterResolve": function(ctx) {
      for (const tag of ctx.tags) {
        if (typeof tag.innerHTML === "string") {
          if (tag.innerHTML && ["application/ld+json", "application/json"].includes(tag.props.type)) {
            tag.innerHTML = tag.innerHTML.replace(/</g, "\\u003C");
          } else {
            tag.innerHTML = tag.innerHTML.replace(new RegExp(`</${tag.tag}`, "g"), `<\\/${tag.tag}`);
          }
        }
      }
    }
  }
});

let activeHead;
// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHeadCore(options);
  head.use(DomPlugin());
  return activeHead = head;
}
// @__NO_SIDE_EFFECTS__
function createServerHead(options = {}) {
  return activeHead = createHeadCore(options);
}
function filterMode(mode, ssr) {
  return !mode || mode === "server" && ssr || mode === "client" && !ssr;
}
function createHeadCore(options = {}) {
  const hooks = createHooks();
  hooks.addHooks(options.hooks || {});
  options.document = options.document || (IsBrowser ? document : void 0);
  const ssr = !options.document;
  const updated = () => {
    head.dirty = true;
    hooks.callHook("entries:updated", head);
  };
  let entryCount = 0;
  let entries = [];
  const plugins = [];
  const head = {
    plugins,
    dirty: false,
    resolvedOptions: options,
    hooks,
    headEntries() {
      return entries;
    },
    use(p) {
      const plugin = typeof p === "function" ? p(head) : p;
      if (!plugin.key || !plugins.some((p2) => p2.key === plugin.key)) {
        plugins.push(plugin);
        filterMode(plugin.mode, ssr) && hooks.addHooks(plugin.hooks || {});
      }
    },
    push(input, entryOptions) {
      delete entryOptions?.head;
      const entry = {
        _i: entryCount++,
        input,
        ...entryOptions
      };
      if (filterMode(entry.mode, ssr)) {
        entries.push(entry);
        updated();
      }
      return {
        dispose() {
          entries = entries.filter((e) => e._i !== entry._i);
          hooks.callHook("entries:updated", head);
          updated();
        },
        // a patch is the same as creating a new entry, just a nice DX
        patch(input2) {
          entries = entries.map((e) => {
            if (e._i === entry._i) {
              e.input = entry.input = input2;
            }
            return e;
          });
          updated();
        }
      };
    },
    async resolveTags() {
      const resolveCtx = { tags: [], entries: [...entries] };
      await hooks.callHook("entries:resolve", resolveCtx);
      for (const entry of resolveCtx.entries) {
        const resolved = entry.resolvedInput || entry.input;
        entry.resolvedInput = await (entry.transform ? entry.transform(resolved) : resolved);
        if (entry.resolvedInput) {
          for (const tag of await normaliseEntryTags(entry)) {
            const tagCtx = { tag, entry, resolvedOptions: head.resolvedOptions };
            await hooks.callHook("tag:normalise", tagCtx);
            resolveCtx.tags.push(tagCtx.tag);
          }
        }
      }
      await hooks.callHook("tags:beforeResolve", resolveCtx);
      await hooks.callHook("tags:resolve", resolveCtx);
      await hooks.callHook("tags:afterResolve", resolveCtx);
      return resolveCtx.tags;
    },
    ssr
  };
  [
    DedupePlugin,
    PayloadPlugin,
    EventHandlersPlugin,
    HashKeyedPlugin,
    SortPlugin,
    TemplateParamsPlugin,
    TitleTemplatePlugin,
    XSSPlugin,
    ...options?.plugins || []
  ].forEach((p) => head.use(p));
  head.hooks.callHook("init", head);
  return head;
}

// @__NO_SIDE_EFFECTS__
function HashHydrationPlugin() {
  return defineHeadPlugin({});
}

const importRe = /@import/;
// @__NO_SIDE_EFFECTS__
function CapoPlugin(options) {
  return defineHeadPlugin({
    hooks: {
      "tags:beforeResolve": function({ tags }) {
        for (const tag of tags) {
          if (tag.tagPosition && tag.tagPosition !== "head")
            continue;
          tag.tagPriority = tag.tagPriority || tagWeight(tag);
          if (tag.tagPriority !== 100)
            continue;
          const isTruthy = (val) => val === "" || val === true;
          const isScript = tag.tag === "script";
          const isLink = tag.tag === "link";
          if (isScript && isTruthy(tag.props.async)) {
            tag.tagPriority = 30;
          } else if (tag.tag === "style" && tag.innerHTML && importRe.test(tag.innerHTML)) {
            tag.tagPriority = 40;
          } else if (isScript && tag.props.src && !isTruthy(tag.props.defer) && !isTruthy(tag.props.async) && tag.props.type !== "module" && !tag.props.type?.endsWith("json")) {
            tag.tagPriority = 50;
          } else if (isLink && tag.props.rel === "stylesheet" || tag.tag === "style") {
            tag.tagPriority = 60;
          } else if (isLink && ["preload", "modulepreload"].includes(tag.props.rel)) {
            tag.tagPriority = 70;
          } else if (isScript && isTruthy(tag.props.defer) && tag.props.src && !isTruthy(tag.props.async)) {
            tag.tagPriority = 80;
          } else if (isLink && ["prefetch", "dns-prefetch", "prerender"].includes(tag.props.rel)) {
            tag.tagPriority = 90;
          }
        }
        options?.track && tags.push({
          tag: "htmlAttrs",
          props: {
            "data-capo": ""
          }
        });
      }
    }
  });
}

const unheadComposablesImports = [
  {
    from: "unhead",
    imports: composableNames
  }
];

function getActiveHead() {
  return activeHead;
}

function useHead(input, options = {}) {
  const head = options.head || getActiveHead();
  return head?.push(input, options);
}

function useHeadSafe(input, options = {}) {
  return useHead(input, {
    ...options || {},
    transform: whitelistSafeInput
  });
}

function useServerHead(input, options = {}) {
  return useHead(input, { ...options, mode: "server" });
}

function useServerHeadSafe(input, options = {}) {
  return useHeadSafe(input, { ...options, mode: "server" });
}

function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // we need to input the meta so the reactivity will be resolved
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

function useServerSeoMeta(input, options) {
  return useSeoMeta(input, {
    ...options || {},
    mode: "server"
  });
}

const UseScriptDefaults = {
  defer: true,
  fetchpriority: "low"
};
function useScript(input, _options) {
  const options = _options || {};
  const head = options.head || getActiveHead();
  if (!head)
    throw new Error("No active head found, please provide a head instance or use the useHead composable");
  const id = input.key || hashCode(input.src || (typeof input.innerHTML === "string" ? input.innerHTML : ""));
  const key = `use-script.${id}`;
  if (head._scripts?.[id])
    return head._scripts[id];
  async function transform(entry) {
    const script2 = await (options.transform || ((input2) => input2))(entry.script[0]);
    const ctx = { script: script2 };
    await head.hooks.callHook("script:transform", ctx);
    return { script: [ctx.script] };
  }
  function maybeHintEarlyConnection(rel) {
    if (
      // opt-out
      options.skipEarlyConnections || !input.src.includes("//") || !head.ssr
    )
      return;
    const key2 = `use-script.${id}.early-connection`;
    head.push({
      link: [{ key: key2, rel, href: new URL(input.src).origin }]
    }, { mode: "server" });
  }
  const script = {
    id,
    status: "awaitingLoad",
    loaded: false,
    remove() {
      if (script.status === "loaded") {
        script.entry?.dispose();
        script.status = "removed";
        head.hooks.callHook(`script:updated`, hookCtx);
        delete head._scripts?.[id];
        return true;
      }
      return false;
    },
    waitForLoad() {
      return new Promise((resolve) => {
        if (script.status === "loaded")
          resolve(options.use());
        function watchForScriptLoaded({ script: script2 }) {
          if (script2.id === id && script2.status === "loaded") {
            resolve(options.use?.());
            head.hooks.removeHook("script:updated", watchForScriptLoaded);
          }
        }
        head.hooks.hook("script:updated", watchForScriptLoaded);
      });
    },
    load() {
      if (script.status !== "awaitingLoad")
        return script.waitForLoad();
      script.status = "loading";
      head.hooks.callHook(`script:updated`, hookCtx);
      script.entry = head.push({
        script: [
          // async by default
          { ...UseScriptDefaults, ...input, key }
        ]
      }, {
        ...options,
        // @ts-expect-error untyped
        transform,
        head
      });
      return script.waitForLoad();
    }
  };
  const hookCtx = { script };
  NetworkEvents.forEach((fn) => {
    const _fn = typeof input[fn] === "function" ? input[fn].bind({}) : null;
    input[fn] = (e) => {
      script.status = fn === "onload" ? "loaded" : fn === "onerror" ? "error" : "loading";
      head.hooks.callHook(`script:updated`, hookCtx);
      _fn && _fn(e);
    };
  });
  let trigger = options.trigger;
  if (trigger) {
    const isIdle = trigger === "idle";
    if (isIdle) {
      if (head.ssr)
        trigger = "manual";
      else
        trigger = new Promise((resolve) => requestIdleCallback(() => resolve()));
    }
    trigger === "manual" && (trigger = new Promise(() => {
    }));
    trigger instanceof Promise && trigger.then(script.load);
    maybeHintEarlyConnection(isIdle ? "preconnect" : "dns-prefetch");
  } else {
    script.load();
    maybeHintEarlyConnection("preconnect");
  }
  function resolveInnerHtmlLoad(ctx) {
    if (ctx.tag.key === key) {
      if (ctx.tag.innerHTML) {
        setTimeout(
          () => {
            script.status = "loaded";
            head.hooks.callHook("script:updated", hookCtx);
            typeof input.onload === "function" && input.onload(new Event("load"));
          },
          5
          /* give inline script a chance to run */
        );
      }
      head.hooks.removeHook("dom:renderTag", resolveInnerHtmlLoad);
    }
  }
  head.hooks.hook("dom:renderTag", resolveInnerHtmlLoad);
  const instance = new Proxy({}, {
    get(_, fn) {
      const stub = options.stub?.({ script, fn });
      if (stub)
        return stub;
      if (fn === "$script")
        return script;
      return (...args) => {
        if (head.ssr || !options.use)
          return;
        if (script.loaded) {
          const api = options.use();
          return api[fn](...args);
        } else {
          return script.waitForLoad().then(
            (api) => {
              api[fn](...args);
            }
          );
        }
      };
    }
  });
  head._scripts = head._scripts || {};
  head._scripts[id] = instance;
  return instance;
}

export { CapoPlugin, HashHydrationPlugin, createHead, createHeadCore, createServerHead, getActiveHead, unheadComposablesImports, useHead, useHeadSafe, useScript, useSeoMeta, useServerHead, useServerHeadSafe, useServerSeoMeta };
