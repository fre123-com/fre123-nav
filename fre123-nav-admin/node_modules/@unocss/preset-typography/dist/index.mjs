import { mergeDeep, definePreset, toEscapedSelector } from '@unocss/core';

function DEFAULT(theme) {
  return {
    "h1,h2,h3,h4,h5,h6": {
      "color": "var(--un-prose-headings)",
      "font-weight": "600",
      "line-height": 1.25
    },
    "a": {
      "color": "var(--un-prose-links)",
      "text-decoration": "underline",
      "font-weight": "500"
    },
    "a code": {
      color: "var(--un-prose-links)"
    },
    "p,ul,ol,pre": {
      "margin": "1em 0",
      "line-height": 1.75
    },
    "blockquote": {
      "margin": "1em 0",
      "padding-left": "1em",
      "font-style": "italic",
      "border-left": ".25em solid var(--un-prose-borders)"
    },
    // taking 16px as a base, we scale h1, h2, h3, and h4 like
    // 16 (base) > 18 (h4) > 22 (h3) > 28 (h2) > 36 (h1)
    "h1": {
      "margin": "1rem 0",
      // h1 is always at the top of the page, so only margin 1 * root font size
      "font-size": "2.25em"
    },
    "h2": {
      "margin": "1.75em 0 .5em",
      "font-size": "1.75em"
    },
    "h3": {
      "margin": "1.5em 0 .5em",
      "font-size": "1.375em"
    },
    "h4": {
      "margin": "1em 0",
      "font-size": "1.125em"
    },
    "img,video": {
      "max-width": "100%"
    },
    "figure,picture": {
      margin: "1em 0"
    },
    "figcaption": {
      "color": "var(--un-prose-captions)",
      "font-size": ".875em"
    },
    "code": {
      "color": "var(--un-prose-code)",
      "font-size": ".875em",
      "font-weight": 600,
      "font-family": theme.fontFamily?.mono
    },
    ":not(pre) > code::before,:not(pre) > code::after": {
      content: '"`"'
    },
    "pre": {
      "padding": "1.25rem 1.5rem",
      "overflow-x": "auto",
      "border-radius": ".375rem"
    },
    "pre,code": {
      "white-space": "pre",
      "word-spacing": "normal",
      "word-break": "normal",
      "word-wrap": "normal",
      "-moz-tab-size": 4,
      "-o-tab-size": 4,
      "tab-size": 4,
      "-webkit-hyphens": "none",
      "-moz-hyphens": "none",
      "hyphens": "none",
      "background": "transparent"
    },
    "pre code": {
      "font-weight": "inherit"
    },
    "ol,ul": {
      "padding-left": "1.25em"
    },
    "ol": {
      "list-style-type": "decimal"
    },
    'ol[type="A"]': {
      "list-style-type": "upper-alpha"
    },
    'ol[type="a"]': {
      "list-style-type": "lower-alpha"
    },
    'ol[type="A" s]': {
      "list-style-type": "upper-alpha"
    },
    'ol[type="a" s]': {
      "list-style-type": "lower-alpha"
    },
    'ol[type="I"]': {
      "list-style-type": "upper-roman"
    },
    'ol[type="i"]': {
      "list-style-type": "lower-roman"
    },
    'ol[type="I" s]': {
      "list-style-type": "upper-roman"
    },
    'ol[type="i" s]': {
      "list-style-type": "lower-roman"
    },
    'ol[type="1"]': {
      "list-style-type": "decimal"
    },
    "ul": {
      "list-style-type": "disc"
    },
    "ol > li::marker,ul > li::marker,summary::marker": {
      color: "var(--un-prose-lists)"
    },
    "hr": {
      margin: "2em 0",
      border: "1px solid var(--un-prose-hr)"
    },
    "table": {
      "display": "block",
      "margin": "1em 0",
      "border-collapse": "collapse",
      "overflow-x": "auto"
    },
    "tr:nth-child(2n)": {
      background: "var(--un-prose-bg-soft)"
    },
    "td,th": {
      border: "1px solid var(--un-prose-borders)",
      padding: ".625em 1em"
    },
    "abbr": {
      cursor: "help"
    },
    "kbd": {
      "color": "var(--un-prose-code)",
      "border": "1px solid",
      "padding": ".25rem .5rem",
      "font-size": ".875em",
      "border-radius": ".25rem"
    },
    "details": {
      margin: "1em 0",
      padding: "1.25rem 1.5rem",
      background: "var(--un-prose-bg-soft)"
    },
    "summary": {
      "cursor": "pointer",
      "font-weight": "600"
    }
  };
}

function getCSS(options) {
  let css = "";
  const { escapedSelector, selectorName, preflights, compatibility } = options;
  const disableNotUtility = compatibility?.noColonNot || compatibility?.noColonWhere;
  for (const selector in preflights) {
    const cssDeclarationBlock = preflights[selector];
    const notProseSelector = `:not(:where(.not-${selectorName},.not-${selectorName} *))`;
    const pseudoCSSMatchArray = selector.split(",").map((s) => {
      const match = s.match(/::?(?:[\(\)\:\-\d\w]+)$/g);
      if (match) {
        const matchStr = match[0];
        s = s.replace(matchStr, "");
        return escapedSelector.map((e) => disableNotUtility ? `${e} ${s}${matchStr}` : `${e} :where(${s})${notProseSelector}${matchStr}`).join(",");
      }
      return null;
    }).filter((v) => v);
    if (pseudoCSSMatchArray.length) {
      css += pseudoCSSMatchArray.join(",");
    } else {
      css += escapedSelector.map((e) => disableNotUtility ? selector.split(",").map((s) => `${e} ${s}`).join(",") : `${e} :where(${selector})${notProseSelector}`).join(",");
    }
    css += "{";
    for (const k in cssDeclarationBlock) {
      const v = cssDeclarationBlock[k];
      css += `${k}:${v};`;
    }
    css += "}";
  }
  return css;
}
function getPreflights(context, options) {
  const { escapedSelectors, selectorName, cssExtend, compatibility } = options;
  let escapedSelector = Array.from(escapedSelectors);
  if (!escapedSelector[escapedSelector.length - 1].startsWith(".") && !compatibility?.noColonIs)
    escapedSelector = [`:is(${escapedSelector[escapedSelector.length - 1]},.${selectorName})`];
  if (cssExtend)
    return getCSS({ escapedSelector, selectorName, preflights: mergeDeep(DEFAULT(context.theme), cssExtend), compatibility });
  return getCSS({ escapedSelector, selectorName, preflights: DEFAULT(context.theme), compatibility });
}

const presetTypography = definePreset((options) => {
  if (options?.className) {
    console.warn('[unocss:preset-typography] "className" is deprecated. Use "selectorName" instead.');
  }
  const escapedSelectors = /* @__PURE__ */ new Set();
  const selectorName = options?.selectorName || options?.className || "prose";
  const selectorNameRE = new RegExp(`^${selectorName}$`);
  const colorsRE = new RegExp(`^${selectorName}-([-\\w]+)$`);
  const invertRE = new RegExp(`^${selectorName}-invert$`);
  const compatibility = options?.compatibility;
  return {
    name: "@unocss/preset-typography",
    enforce: "post",
    layers: { typography: -20 },
    rules: [
      [
        selectorNameRE,
        (_, { rawSelector }) => {
          escapedSelectors.add(toEscapedSelector(rawSelector));
          return { "color": "var(--un-prose-body)", "max-width": "65ch" };
        },
        { layer: "typography" }
      ],
      [
        colorsRE,
        ([, color], { theme }) => {
          const baseColor = theme.colors?.[color];
          if (baseColor == null)
            return;
          const colorObject = typeof baseColor === "object" ? baseColor : {};
          return {
            "--un-prose-body": colorObject[700] ?? baseColor,
            "--un-prose-headings": colorObject[900] ?? baseColor,
            "--un-prose-links": colorObject[900] ?? baseColor,
            "--un-prose-lists": colorObject[400] ?? baseColor,
            "--un-prose-hr": colorObject[200] ?? baseColor,
            "--un-prose-captions": colorObject[500] ?? baseColor,
            "--un-prose-code": colorObject[900] ?? baseColor,
            "--un-prose-borders": colorObject[200] ?? baseColor,
            "--un-prose-bg-soft": colorObject[100] ?? baseColor,
            // invert colors (dark mode)
            "--un-prose-invert-body": colorObject[200] ?? baseColor,
            "--un-prose-invert-headings": colorObject[100] ?? baseColor,
            "--un-prose-invert-links": colorObject[100] ?? baseColor,
            "--un-prose-invert-lists": colorObject[500] ?? baseColor,
            "--un-prose-invert-hr": colorObject[700] ?? baseColor,
            "--un-prose-invert-captions": colorObject[400] ?? baseColor,
            "--un-prose-invert-code": colorObject[100] ?? baseColor,
            "--un-prose-invert-borders": colorObject[700] ?? baseColor,
            "--un-prose-invert-bg-soft": colorObject[800] ?? baseColor
          };
        },
        { layer: "typography" }
      ],
      [
        invertRE,
        () => {
          return {
            "--un-prose-body": "var(--un-prose-invert-body)",
            "--un-prose-headings": "var(--un-prose-invert-headings)",
            "--un-prose-links": "var(--un-prose-invert-links)",
            "--un-prose-lists": "var(--un-prose-invert-lists)",
            "--un-prose-hr": "var(--un-prose-invert-hr)",
            "--un-prose-captions": "var(--un-prose-invert-captions)",
            "--un-prose-code": "var(--un-prose-invert-code)",
            "--un-prose-borders": "var(--un-prose-invert-borders)",
            "--un-prose-bg-soft": "var(--un-prose-invert-bg-soft)"
          };
        },
        { layer: "typography" }
      ]
    ],
    preflights: [
      {
        layer: "typography",
        getCSS: (context) => {
          if (escapedSelectors.size > 0) {
            const cssExtend = typeof options?.cssExtend === "function" ? options.cssExtend(context.theme) : options?.cssExtend;
            return getPreflights(context, { escapedSelectors, selectorName, cssExtend, compatibility });
          }
        }
      }
    ]
  };
});

export { presetTypography as default, presetTypography };
