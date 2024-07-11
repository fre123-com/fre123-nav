'use strict';

function asArray$1(value) {
  return Array.isArray(value) ? value : [value];
}

const SelfClosingTags = ["meta", "link", "base"];
const TagsWithInnerContent = ["title", "titleTemplate", "script", "style", "noscript"];
const HasElementTags = [
  "base",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
const ValidHeadTags = [
  "title",
  "titleTemplate",
  "templateParams",
  "base",
  "htmlAttrs",
  "bodyAttrs",
  "meta",
  "link",
  "style",
  "script",
  "noscript"
];
const UniqueTags = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"];
const TagConfigKeys = ["tagPosition", "tagPriority", "tagDuplicateStrategy", "children", "innerHTML", "textContent", "processTemplateParams"];
const IsBrowser = typeof window !== "undefined";
const composableNames = [
  "getActiveHead",
  "useHead",
  "useSeoMeta",
  "useHeadSafe",
  "useServerHead",
  "useServerSeoMeta",
  "useServerHeadSafe"
];

function defineHeadPlugin(plugin) {
  return plugin;
}

function hashCode(s) {
  let h = 9;
  for (let i = 0; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return ((h ^ h >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function hashTag(tag) {
  return tag._h || hashCode(tag._d ? tag._d : `${tag.tag}:${tag.textContent || tag.innerHTML || ""}:${Object.entries(tag.props).map(([key, value]) => `${key}:${String(value)}`).join(",")}`);
}

function tagDedupeKey(tag, fn) {
  const { props, tag: tagName } = tag;
  if (UniqueTags.includes(tagName))
    return tagName;
  if (tagName === "link" && props.rel === "canonical")
    return "canonical";
  if (props.charset)
    return "charset";
  const name = ["id"];
  if (tagName === "meta")
    name.push(...["name", "property", "http-equiv"]);
  for (const n of name) {
    if (typeof props[n] !== "undefined") {
      const val = String(props[n]);
      if (fn && !fn(val))
        return false;
      return `${tagName}:${n}:${val}`;
    }
  }
  return false;
}

function resolveTitleTemplate(template, title) {
  if (template == null)
    return title || null;
  if (typeof template === "function")
    return template(title);
  return template;
}

function asArray(input) {
  return Array.isArray(input) ? input : [input];
}
const InternalKeySymbol = "_$key";
function packObject(input, options) {
  const keys = Object.keys(input);
  let [k, v] = keys;
  options = options || {};
  options.key = options.key || k;
  options.value = options.value || v;
  options.resolveKey = options.resolveKey || ((k2) => k2);
  const resolveKey = (index) => {
    const arr = asArray(options?.[index]);
    return arr.find((k2) => {
      if (typeof k2 === "string" && k2.includes(".")) {
        return k2;
      }
      return k2 && keys.includes(k2);
    });
  };
  const resolveValue = (k2, input2) => {
    if (k2.includes(".")) {
      const paths = k2.split(".");
      let val = input2;
      for (const path of paths)
        val = val[path];
      return val;
    }
    return input2[k2];
  };
  k = resolveKey("key") || k;
  v = resolveKey("value") || v;
  const dedupeKeyPrefix = input.key ? `${InternalKeySymbol}${input.key}-` : "";
  let keyValue = resolveValue(k, input);
  keyValue = options.resolveKey(keyValue);
  return {
    [`${dedupeKeyPrefix}${keyValue}`]: resolveValue(v, input)
  };
}

function packArray(input, options) {
  const packed = {};
  for (const i of input) {
    const packedObj = packObject(i, options);
    const pKey = Object.keys(packedObj)[0];
    const isDedupeKey = pKey.startsWith(InternalKeySymbol);
    if (!isDedupeKey && packed[pKey]) {
      packed[pKey] = Array.isArray(packed[pKey]) ? packed[pKey] : [packed[pKey]];
      packed[pKey].push(Object.values(packedObj)[0]);
    } else {
      packed[isDedupeKey ? pKey.split("-").slice(1).join("-") || pKey : pKey] = packedObj[pKey];
    }
  }
  return packed;
}

function unpackToArray(input, options) {
  const unpacked = [];
  const kFn = options.resolveKeyData || ((ctx) => ctx.key);
  const vFn = options.resolveValueData || ((ctx) => ctx.value);
  for (const [k, v] of Object.entries(input)) {
    unpacked.push(...(Array.isArray(v) ? v : [v]).map((i) => {
      const ctx = { key: k, value: i };
      const val = vFn(ctx);
      if (typeof val === "object")
        return unpackToArray(val, options);
      if (Array.isArray(val))
        return val;
      return {
        [typeof options.key === "function" ? options.key(ctx) : options.key]: kFn(ctx),
        [typeof options.value === "function" ? options.value(ctx) : options.value]: val
      };
    }).flat());
  }
  return unpacked;
}

function unpackToString(value, options) {
  return Object.entries(value).map(([key, value2]) => {
    if (typeof value2 === "object")
      value2 = unpackToString(value2, options);
    if (options.resolve) {
      const resolved = options.resolve({ key, value: value2 });
      if (resolved)
        return resolved;
    }
    if (typeof value2 === "number")
      value2 = value2.toString();
    if (typeof value2 === "string" && options.wrapValue) {
      value2 = value2.replace(new RegExp(options.wrapValue, "g"), `\\${options.wrapValue}`);
      value2 = `${options.wrapValue}${value2}${options.wrapValue}`;
    }
    return `${key}${options.keyValueSeparator || ""}${value2}`;
  }).join(options.entrySeparator || "");
}

const p = (p2) => ({ keyValue: p2, metaKey: "property" });
const k = (p2) => ({ keyValue: p2 });
const MetaPackingSchema = {
  appleItunesApp: {
    unpack: {
      entrySeparator: ", ",
      resolve({ key, value }) {
        return `${fixKeyCase(key)}=${value}`;
      }
    }
  },
  articleExpirationTime: p("article:expiration_time"),
  articleModifiedTime: p("article:modified_time"),
  articlePublishedTime: p("article:published_time"),
  bookReleaseDate: p("book:release_date"),
  charset: {
    metaKey: "charset"
  },
  contentSecurityPolicy: {
    unpack: {
      entrySeparator: "; ",
      resolve({ key, value }) {
        return `${fixKeyCase(key)} ${value}`;
      }
    },
    metaKey: "http-equiv"
  },
  contentType: {
    metaKey: "http-equiv"
  },
  defaultStyle: {
    metaKey: "http-equiv"
  },
  fbAppId: p("fb:app_id"),
  msapplicationConfig: k("msapplication-Config"),
  msapplicationTileColor: k("msapplication-TileColor"),
  msapplicationTileImage: k("msapplication-TileImage"),
  ogAudioSecureUrl: p("og:audio:secure_url"),
  ogAudioUrl: p("og:audio"),
  ogImageSecureUrl: p("og:image:secure_url"),
  ogImageUrl: p("og:image"),
  ogSiteName: p("og:site_name"),
  ogVideoSecureUrl: p("og:video:secure_url"),
  ogVideoUrl: p("og:video"),
  profileFirstName: p("profile:first_name"),
  profileLastName: p("profile:last_name"),
  profileUsername: p("profile:username"),
  refresh: {
    metaKey: "http-equiv",
    unpack: {
      entrySeparator: ";",
      resolve({ key, value }) {
        if (key === "seconds")
          return `${value}`;
      }
    }
  },
  robots: {
    unpack: {
      entrySeparator: ", ",
      resolve({ key, value }) {
        if (typeof value === "boolean")
          return `${fixKeyCase(key)}`;
        else
          return `${fixKeyCase(key)}:${value}`;
      }
    }
  },
  xUaCompatible: {
    metaKey: "http-equiv"
  }
};
const openGraphNamespaces = [
  "og",
  "book",
  "article",
  "profile"
];
function resolveMetaKeyType(key) {
  const fKey = fixKeyCase(key).split(":")[0];
  if (openGraphNamespaces.includes(fKey))
    return "property";
  return MetaPackingSchema[key]?.metaKey || "name";
}
function resolveMetaKeyValue(key) {
  return MetaPackingSchema[key]?.keyValue || fixKeyCase(key);
}
function fixKeyCase(key) {
  const updated = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const fKey = updated.split("-")[0];
  if (openGraphNamespaces.includes(fKey) || fKey === "twitter")
    return key.replace(/([A-Z])/g, ":$1").toLowerCase();
  return updated;
}
function changeKeyCasingDeep(input) {
  if (Array.isArray(input)) {
    return input.map((entry) => changeKeyCasingDeep(entry));
  }
  if (typeof input !== "object" || Array.isArray(input))
    return input;
  const output = {};
  for (const [key, value] of Object.entries(input))
    output[fixKeyCase(key)] = changeKeyCasingDeep(value);
  return output;
}
function resolvePackedMetaObjectValue(value, key) {
  const definition = MetaPackingSchema[key];
  if (key === "refresh")
    return `${value.seconds};url=${value.url}`;
  return unpackToString(
    changeKeyCasingDeep(value),
    {
      keyValueSeparator: "=",
      entrySeparator: ", ",
      resolve({ value: value2, key: key2 }) {
        if (value2 === null)
          return "";
        if (typeof value2 === "boolean")
          return `${key2}`;
      },
      ...definition?.unpack
    }
  );
}
const ObjectArrayEntries = ["og:image", "og:video", "og:audio", "twitter:image"];
function sanitize(input) {
  const out = {};
  Object.entries(input).forEach(([k2, v]) => {
    if (String(v) !== "false" && k2)
      out[k2] = v;
  });
  return out;
}
function handleObjectEntry(key, v) {
  const value = sanitize(v);
  const fKey = fixKeyCase(key);
  const attr = resolveMetaKeyType(fKey);
  if (ObjectArrayEntries.includes(fKey)) {
    const input = {};
    Object.entries(value).forEach(([k2, v2]) => {
      input[`${key}${k2 === "url" ? "" : `${k2.charAt(0).toUpperCase()}${k2.slice(1)}`}`] = v2;
    });
    return unpackMeta(input).sort((a, b) => (a[attr]?.length || 0) - (b[attr]?.length || 0));
  }
  return [{ [attr]: fKey, ...value }];
}
function unpackMeta(input) {
  const extras = [];
  const primitives = {};
  Object.entries(input).forEach(([key, value]) => {
    if (!Array.isArray(value)) {
      if (typeof value === "object" && value) {
        if (ObjectArrayEntries.includes(fixKeyCase(key))) {
          extras.push(...handleObjectEntry(key, value));
          return;
        }
        primitives[key] = sanitize(value);
      } else {
        primitives[key] = value;
      }
      return;
    }
    value.forEach((v) => {
      extras.push(...typeof v === "string" ? unpackMeta({ [key]: v }) : handleObjectEntry(key, v));
    });
  });
  const meta = unpackToArray(primitives, {
    key({ key }) {
      return resolveMetaKeyType(key);
    },
    value({ key }) {
      return key === "charset" ? "charset" : "content";
    },
    resolveKeyData({ key }) {
      return resolveMetaKeyValue(key);
    },
    resolveValueData({ value, key }) {
      if (value === null)
        return "_null";
      if (typeof value === "object")
        return resolvePackedMetaObjectValue(value, key);
      return typeof value === "number" ? value.toString() : value;
    }
  });
  return [...extras, ...meta].map((m) => {
    if (m.content === "_null")
      m.content = null;
    return m;
  });
}
function packMeta(inputs) {
  const mappedPackingSchema = Object.entries(MetaPackingSchema).map(([key, value]) => [key, value.keyValue]);
  return packArray(inputs, {
    key: ["name", "property", "httpEquiv", "http-equiv", "charset"],
    value: ["content", "charset"],
    resolveKey(k2) {
      let key = mappedPackingSchema.filter((sk) => sk[1] === k2)?.[0]?.[0] || k2;
      const replacer = (_, letter) => letter?.toUpperCase();
      key = key.replace(/:([a-z])/g, replacer).replace(/-([a-z])/g, replacer);
      return key;
    }
  });
}

const WhitelistAttributes = {
  htmlAttrs: ["id", "class", "lang", "dir"],
  bodyAttrs: ["id", "class"],
  meta: ["id", "name", "property", "charset", "content"],
  noscript: ["id", "textContent"],
  script: ["id", "type", "textContent"],
  link: ["id", "color", "crossorigin", "fetchpriority", "href", "hreflang", "imagesrcset", "imagesizes", "integrity", "media", "referrerpolicy", "rel", "sizes", "type"]
};
function acceptDataAttrs(value) {
  const filtered = {};
  Object.keys(value || {}).filter((a) => a.startsWith("data-")).forEach((a) => {
    filtered[a] = value[a];
  });
  return filtered;
}
function whitelistSafeInput(input) {
  const filtered = {};
  Object.keys(input).forEach((key) => {
    const tagValue = input[key];
    if (!tagValue)
      return;
    switch (key) {
      case "title":
      case "titleTemplate":
      case "templateParams":
        filtered[key] = tagValue;
        break;
      case "htmlAttrs":
      case "bodyAttrs":
        filtered[key] = acceptDataAttrs(tagValue);
        WhitelistAttributes[key].forEach((a) => {
          if (tagValue[a])
            filtered[key][a] = tagValue[a];
        });
        break;
      case "meta":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((meta) => {
            const safeMeta = acceptDataAttrs(meta);
            WhitelistAttributes.meta.forEach((key2) => {
              if (meta[key2])
                safeMeta[key2] = meta[key2];
            });
            return safeMeta;
          }).filter((meta) => Object.keys(meta).length > 0);
        }
        break;
      case "link":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((meta) => {
            const link = acceptDataAttrs(meta);
            WhitelistAttributes.link.forEach((key2) => {
              const val = meta[key2];
              if (key2 === "rel" && ["stylesheet", "canonical", "modulepreload", "prerender", "preload", "prefetch"].includes(val))
                return;
              if (key2 === "href") {
                if (val.includes("javascript:") || val.includes("data:"))
                  return;
                link[key2] = val;
              } else if (val) {
                link[key2] = val;
              }
            });
            return link;
          }).filter((link) => Object.keys(link).length > 1 && !!link.rel);
        }
        break;
      case "noscript":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((meta) => {
            const noscript = acceptDataAttrs(meta);
            WhitelistAttributes.noscript.forEach((key2) => {
              if (meta[key2])
                noscript[key2] = meta[key2];
            });
            return noscript;
          }).filter((meta) => Object.keys(meta).length > 0);
        }
        break;
      case "script":
        if (Array.isArray(tagValue)) {
          filtered[key] = tagValue.map((script) => {
            const safeScript = acceptDataAttrs(script);
            WhitelistAttributes.script.forEach((s) => {
              if (script[s]) {
                if (s === "textContent") {
                  try {
                    const jsonVal = typeof script[s] === "string" ? JSON.parse(script[s]) : script[s];
                    safeScript[s] = JSON.stringify(jsonVal, null, 0);
                  } catch (e) {
                  }
                } else {
                  safeScript[s] = script[s];
                }
              }
            });
            return safeScript;
          }).filter((meta) => Object.keys(meta).length > 0);
        }
        break;
    }
  });
  return filtered;
}

async function normaliseTag(tagName, input, e) {
  const tag = {
    tag: tagName,
    props: await normaliseProps(
      // explicitly check for an object
      // @ts-expect-error untyped
      typeof input === "object" && typeof input !== "function" && !(input instanceof Promise) ? { ...input } : { [["script", "noscript", "style"].includes(tagName) ? "innerHTML" : "textContent"]: input },
      ["templateParams", "titleTemplate"].includes(tagName)
    )
  };
  TagConfigKeys.forEach((k) => {
    const val = typeof tag.props[k] !== "undefined" ? tag.props[k] : e[k];
    if (typeof val !== "undefined") {
      if (!["innerHTML", "textContent", "children"].includes(k) || TagsWithInnerContent.includes(tag.tag)) {
        tag[k === "children" ? "innerHTML" : k] = val;
      }
      delete tag.props[k];
    }
  });
  if (tag.props.body) {
    tag.tagPosition = "bodyClose";
    delete tag.props.body;
  }
  if (tag.tag === "script") {
    if (typeof tag.innerHTML === "object") {
      tag.innerHTML = JSON.stringify(tag.innerHTML);
      tag.props.type = tag.props.type || "application/json";
    }
  }
  return Array.isArray(tag.props.content) ? tag.props.content.map((v) => ({ ...tag, props: { ...tag.props, content: v } })) : tag;
}
function normaliseClassProp(v) {
  if (typeof v === "object" && !Array.isArray(v)) {
    v = Object.keys(v).filter((k) => v[k]);
  }
  return (Array.isArray(v) ? v.join(" ") : v).split(" ").filter((c) => c.trim()).filter(Boolean).join(" ");
}
async function normaliseProps(props, virtual) {
  for (const k of Object.keys(props)) {
    if (k === "class") {
      props[k] = normaliseClassProp(props[k]);
      continue;
    }
    if (props[k] instanceof Promise)
      props[k] = await props[k];
    if (!virtual && !TagConfigKeys.includes(k)) {
      const v = String(props[k]);
      const isDataKey = k.startsWith("data-");
      if (v === "true" || v === "") {
        props[k] = isDataKey ? "true" : true;
      } else if (!props[k]) {
        if (isDataKey && v === "false")
          props[k] = "false";
        else
          delete props[k];
      }
    }
  }
  return props;
}
const TagEntityBits = 10;
async function normaliseEntryTags(e) {
  const tagPromises = [];
  Object.entries(e.resolvedInput).filter(([k, v]) => typeof v !== "undefined" && ValidHeadTags.includes(k)).forEach(([k, value]) => {
    const v = asArray$1(value);
    tagPromises.push(...v.map((props) => normaliseTag(k, props, e)).flat());
  });
  return (await Promise.all(tagPromises)).flat().filter(Boolean).map((t, i) => {
    t._e = e._i;
    e.mode && (t._m = e.mode);
    t._p = (e._i << TagEntityBits) + i;
    return t;
  });
}

const TAG_WEIGHTS = {
  // tags
  base: -10,
  title: 10
};
const TAG_ALIASES = {
  // relative scores to their default values
  critical: -80,
  high: -10,
  low: 20
};
function tagWeight(tag) {
  let weight = 100;
  const priority = tag.tagPriority;
  if (typeof priority === "number")
    return priority;
  if (tag.tag === "meta") {
    if (tag.props["http-equiv"] === "content-security-policy")
      weight = -30;
    if (tag.props.charset)
      weight = -20;
    if (tag.props.name === "viewport")
      weight = -15;
  } else if (tag.tag === "link" && tag.props.rel === "preconnect") {
    weight = 20;
  } else if (tag.tag in TAG_WEIGHTS) {
    weight = TAG_WEIGHTS[tag.tag];
  }
  if (typeof priority === "string" && priority in TAG_ALIASES) {
    return weight + TAG_ALIASES[priority];
  }
  return weight;
}
const SortModifiers = [{ prefix: "before:", offset: -1 }, { prefix: "after:", offset: 1 }];

const NetworkEvents = ["onload", "onerror", "onabort", "onprogress", "onloadstart"];

const sepSub = "%separator";
function processTemplateParams(s, p, sep) {
  if (typeof s !== "string" || !s.includes("%"))
    return s;
  function sub(token) {
    let val;
    if (["s", "pageTitle"].includes(token)) {
      val = p.pageTitle;
    } else if (token.includes(".")) {
      val = token.split(".").reduce((acc, key) => acc ? acc[key] || void 0 : void 0, p);
    } else {
      val = p[token];
    }
    return typeof val !== "undefined" ? (val || "").replace(/"/g, '\\"') : false;
  }
  let decoded = s;
  try {
    decoded = decodeURI(s);
  } catch {
  }
  const tokens = (decoded.match(/%(\w+\.+\w+)|%(\w+)/g) || []).sort().reverse();
  tokens.forEach((token) => {
    const re = sub(token.slice(1));
    if (typeof re === "string") {
      s = s.replace(new RegExp(`\\${token}(\\W|$)`, "g"), (_, args) => `${re}${args}`).trim();
    }
  });
  if (s.includes(sepSub)) {
    if (s.endsWith(sepSub))
      s = s.slice(0, -sepSub.length).trim();
    if (s.startsWith(sepSub))
      s = s.slice(sepSub.length).trim();
    s = s.replace(new RegExp(`\\${sepSub}\\s*\\${sepSub}`, "g"), sepSub);
    s = processTemplateParams(s, { separator: sep }, sep);
  }
  return s;
}

exports.HasElementTags = HasElementTags;
exports.IsBrowser = IsBrowser;
exports.NetworkEvents = NetworkEvents;
exports.SelfClosingTags = SelfClosingTags;
exports.SortModifiers = SortModifiers;
exports.TAG_ALIASES = TAG_ALIASES;
exports.TAG_WEIGHTS = TAG_WEIGHTS;
exports.TagConfigKeys = TagConfigKeys;
exports.TagEntityBits = TagEntityBits;
exports.TagsWithInnerContent = TagsWithInnerContent;
exports.UniqueTags = UniqueTags;
exports.ValidHeadTags = ValidHeadTags;
exports.asArray = asArray$1;
exports.composableNames = composableNames;
exports.defineHeadPlugin = defineHeadPlugin;
exports.hashCode = hashCode;
exports.hashTag = hashTag;
exports.normaliseClassProp = normaliseClassProp;
exports.normaliseEntryTags = normaliseEntryTags;
exports.normaliseProps = normaliseProps;
exports.normaliseTag = normaliseTag;
exports.packMeta = packMeta;
exports.processTemplateParams = processTemplateParams;
exports.resolveMetaKeyType = resolveMetaKeyType;
exports.resolveMetaKeyValue = resolveMetaKeyValue;
exports.resolvePackedMetaObjectValue = resolvePackedMetaObjectValue;
exports.resolveTitleTemplate = resolveTitleTemplate;
exports.tagDedupeKey = tagDedupeKey;
exports.tagWeight = tagWeight;
exports.unpackMeta = unpackMeta;
exports.whitelistSafeInput = whitelistSafeInput;
