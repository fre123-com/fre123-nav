import { isString, escapeRegExp } from '@unocss/core';
import MagicString from 'magic-string';

function getBracket(str, open, close) {
  if (str === "")
    return;
  const l = str.length;
  let parenthesis = 0;
  let opened = false;
  let openAt = 0;
  for (let i = 0; i < l; i++) {
    switch (str[i]) {
      case open:
        if (!opened) {
          opened = true;
          openAt = i;
        }
        parenthesis++;
        break;
      case close:
        --parenthesis;
        if (parenthesis < 0)
          return;
        if (parenthesis === 0) {
          return [
            str.slice(openAt, i + 1),
            str.slice(i + 1),
            str.slice(0, openAt)
          ];
        }
        break;
    }
  }
}
function getStringComponent(str, open, close, separators) {
  if (str === "")
    return;
  if (isString(separators))
    separators = [separators];
  if (separators.length === 0)
    return;
  const l = str.length;
  let parenthesis = 0;
  for (let i = 0; i < l; i++) {
    switch (str[i]) {
      case open:
        parenthesis++;
        break;
      case close:
        if (--parenthesis < 0)
          return;
        break;
      default:
        for (const separator of separators) {
          const separatorLength = separator.length;
          if (separatorLength && separator === str.slice(i, i + separatorLength) && parenthesis === 0) {
            if (i === 0 || i === l - separatorLength)
              return;
            return [
              str.slice(0, i),
              str.slice(i + separatorLength)
            ];
          }
        }
    }
  }
  return [
    str,
    ""
  ];
}
function getStringComponents(str, separators, limit) {
  limit = limit ?? 10;
  const components = [];
  let i = 0;
  while (str !== "") {
    if (++i > limit)
      return;
    const componentPair = getStringComponent(str, "(", ")", separators);
    if (!componentPair)
      return;
    const [component, rest] = componentPair;
    components.push(component);
    str = rest;
  }
  if (components.length > 0)
    return components;
}

const cssColorFunctions = ["hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "rgb", "rgba"];
const alphaPlaceholders = ["%alpha", "<alpha-value>"];
const alphaPlaceholdersRE = new RegExp(alphaPlaceholders.map((v) => escapeRegExp(v)).join("|"));
function hex2rgba(hex = "") {
  const color = parseHexColor(hex);
  if (color != null) {
    const { components, alpha } = color;
    if (alpha == null)
      return components;
    return [...components, alpha];
  }
}
function parseCssColor(str = "") {
  const color = parseColor(str);
  if (color == null || color === false)
    return;
  const { type: casedType, components, alpha } = color;
  const type = casedType.toLowerCase();
  if (components.length === 0)
    return;
  if (cssColorFunctions.includes(type) && ![1, 3].includes(components.length))
    return;
  return {
    type,
    components: components.map((c) => typeof c === "string" ? c.trim() : c),
    alpha: typeof alpha === "string" ? alpha.trim() : alpha
  };
}
function colorOpacityToString(color) {
  const alpha = color.alpha ?? 1;
  return typeof alpha === "string" && alphaPlaceholders.includes(alpha) ? 1 : alpha;
}
function colorToString(color, alphaOverride) {
  if (typeof color === "string")
    return color.replace(alphaPlaceholdersRE, `${alphaOverride ?? 1}`);
  const { components } = color;
  let { alpha, type } = color;
  alpha = alphaOverride ?? alpha;
  type = type.toLowerCase();
  if (["hsla", "rgba"].includes(type))
    return `${type}(${components.join(", ")}${alpha == null ? "" : `, ${alpha}`})`;
  alpha = alpha == null ? "" : ` / ${alpha}`;
  if (cssColorFunctions.includes(type))
    return `${type}(${components.join(" ")}${alpha})`;
  return `color(${type} ${components.join(" ")}${alpha})`;
}
function parseColor(str) {
  if (!str)
    return;
  let color = parseHexColor(str);
  if (color != null)
    return color;
  color = cssColorKeyword(str);
  if (color != null)
    return color;
  color = parseCssCommaColorFunction(str);
  if (color != null)
    return color;
  color = parseCssSpaceColorFunction(str);
  if (color != null)
    return color;
  color = parseCssColorFunction(str);
  if (color != null)
    return color;
}
function parseHexColor(str) {
  const [, body] = str.match(/^#([\da-f]+)$/i) || [];
  if (!body)
    return;
  switch (body.length) {
    case 3:
    case 4:
      const digits = Array.from(body, (s) => Number.parseInt(s, 16)).map((n) => n << 4 | n);
      return {
        type: "rgb",
        components: digits.slice(0, 3),
        alpha: body.length === 3 ? void 0 : Math.round(digits[3] / 255 * 100) / 100
      };
    case 6:
    case 8:
      const value = Number.parseInt(body, 16);
      return {
        type: "rgb",
        components: body.length === 6 ? [value >> 16 & 255, value >> 8 & 255, value & 255] : [value >> 24 & 255, value >> 16 & 255, value >> 8 & 255],
        alpha: body.length === 6 ? void 0 : Math.round((value & 255) / 255 * 100) / 100
      };
  }
}
function cssColorKeyword(str) {
  const color = {
    rebeccapurple: [102, 51, 153, 1]
  }[str];
  if (color != null) {
    return {
      type: "rgb",
      components: color.slice(0, 3),
      alpha: color[3]
    };
  }
}
function parseCssCommaColorFunction(color) {
  const match = color.match(/^(rgb|rgba|hsl|hsla)\((.+)\)$/i);
  if (!match)
    return;
  const [, type, componentString] = match;
  const components = getStringComponents(componentString, ",", 5);
  if (components) {
    if ([3, 4].includes(components.length)) {
      return {
        type,
        components: components.slice(0, 3),
        alpha: components[3]
      };
    } else if (components.length !== 1) {
      return false;
    }
  }
}
const cssColorFunctionsRe = new RegExp(`^(${cssColorFunctions.join("|")})\\((.+)\\)$`, "i");
function parseCssSpaceColorFunction(color) {
  const match = color.match(cssColorFunctionsRe);
  if (!match)
    return;
  const [, fn, componentString] = match;
  const parsed = parseCssSpaceColorValues(`${fn} ${componentString}`);
  if (parsed) {
    const { alpha, components: [type, ...components] } = parsed;
    return {
      type,
      components,
      alpha
    };
  }
}
function parseCssColorFunction(color) {
  const match = color.match(/^color\((.+)\)$/);
  if (!match)
    return;
  const parsed = parseCssSpaceColorValues(match[1]);
  if (parsed) {
    const { alpha, components: [type, ...components] } = parsed;
    return {
      type,
      components,
      alpha
    };
  }
}
function parseCssSpaceColorValues(componentString) {
  const components = getStringComponents(componentString, " ");
  if (!components)
    return;
  let totalComponents = components.length;
  if (components[totalComponents - 2] === "/") {
    return {
      components: components.slice(0, totalComponents - 2),
      alpha: components[totalComponents - 1]
    };
  }
  if (components[totalComponents - 2] != null && (components[totalComponents - 2].endsWith("/") || components[totalComponents - 1].startsWith("/"))) {
    const removed = components.splice(totalComponents - 2);
    components.push(removed.join(" "));
    --totalComponents;
  }
  const withAlpha = getStringComponents(components[totalComponents - 1], "/", 2);
  if (!withAlpha)
    return;
  if (withAlpha.length === 1 || withAlpha[withAlpha.length - 1] === "")
    return { components };
  const alpha = withAlpha.pop();
  components[totalComponents - 1] = withAlpha.join("/");
  return {
    components,
    alpha
  };
}

function createValueHandler(handlers) {
  const handler = function(str) {
    const s = this.__options?.sequence || [];
    this.__options.sequence = [];
    for (const n of s) {
      const res = handlers[n](str);
      if (res != null)
        return res;
    }
  };
  function addProcessor(that, name) {
    if (!that.__options) {
      that.__options = {
        sequence: []
      };
    }
    that.__options.sequence.push(name);
    return that;
  }
  for (const name of Object.keys(handlers)) {
    Object.defineProperty(handler, name, {
      enumerable: true,
      get() {
        return addProcessor(this, name);
      }
    });
  }
  return handler;
}

function variantMatcher(name, handler) {
  let re;
  return {
    name,
    match(input, ctx) {
      if (!re)
        re = new RegExp(`^${escapeRegExp(name)}(?:${ctx.generator.config.separators.join("|")})`);
      const match = input.match(re);
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => next({
            ...input2,
            ...handler(input2)
          })
        };
      }
    },
    autocomplete: `${name}:`
  };
}
function variantParentMatcher(name, parent) {
  let re;
  return {
    name,
    match(input, ctx) {
      if (!re)
        re = new RegExp(`^${escapeRegExp(name)}(?:${ctx.generator.config.separators.join("|")})`);
      const match = input.match(re);
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => next({
            ...input2,
            parent: `${input2.parent ? `${input2.parent} $$ ` : ""}${parent}`
          })
        };
      }
    },
    autocomplete: `${name}:`
  };
}
function variantGetBracket(prefix, matcher, separators) {
  if (matcher.startsWith(`${prefix}[`)) {
    const [match, rest] = getBracket(matcher.slice(prefix.length), "[", "]") ?? [];
    if (match && rest) {
      for (const separator of separators) {
        if (rest.startsWith(separator))
          return [match, rest.slice(separator.length), separator];
      }
      return [match, rest, ""];
    }
  }
}
function variantGetParameter(prefix, matcher, separators) {
  if (matcher.startsWith(prefix)) {
    const body = variantGetBracket(prefix, matcher, separators);
    if (body) {
      const [label = "", rest = body[1]] = variantGetParameter("/", body[1], separators) ?? [];
      return [body[0], rest, label];
    }
    for (const separator of separators.filter((x) => x !== "/")) {
      const pos = matcher.indexOf(separator, prefix.length);
      if (pos !== -1) {
        const labelPos = matcher.indexOf("/", prefix.length);
        const unlabelled = labelPos === -1 || pos <= labelPos;
        return [
          matcher.slice(prefix.length, unlabelled ? pos : labelPos),
          matcher.slice(pos + separator.length),
          unlabelled ? "" : matcher.slice(labelPos + 1, pos)
        ];
      }
    }
  }
}

const themeFnRE = /theme\(\s*['"]?(.*?)['"]?\s*\)/g;
function hasThemeFn(str) {
  return str.includes("theme(") && str.includes(")");
}
function transformThemeFn(code, theme, throwOnMissing = true) {
  const matches = Array.from(code.toString().matchAll(themeFnRE));
  if (!matches.length)
    return code;
  const s = new MagicString(code);
  for (const match of matches) {
    const rawArg = match[1];
    if (!rawArg)
      throw new Error("theme() expect exact one argument, but got 0");
    const [rawKey, alpha] = rawArg.split("/");
    const keys = rawKey.trim().split(".");
    let value = keys.reduce((t, k) => t?.[k], theme);
    if (typeof value === "string") {
      if (alpha) {
        const color = parseCssColor(value);
        if (color)
          value = colorToString(color, alpha);
      }
      s.overwrite(
        match.index,
        match.index + match[0].length,
        value
      );
    } else if (throwOnMissing) {
      throw new Error(`theme of "${rawArg}" did not found`);
    }
  }
  return s.toString();
}

export { colorOpacityToString, colorToString, createValueHandler, getBracket, getStringComponent, getStringComponents, hasThemeFn, hex2rgba, parseCssColor, themeFnRE, transformThemeFn, variantGetBracket, variantGetParameter, variantMatcher, variantParentMatcher };
