import { stat, readFile } from 'node:fs/promises';
import { normalize } from 'node:path';
import process from 'node:process';
import fg from 'fast-glob';
import postcss from 'postcss';
import { expandVariantGroup, notNull, regexScopePlaceholder, createGenerator } from '@unocss/core';
import { loadConfig } from '@unocss/config';
import { transformThemeFn, hasThemeFn } from '@unocss/rule-utils';
import { parse, generate, clone } from 'css-tree';

const defaultFilesystemGlobs = [
  "**/*.{html,js,ts,jsx,tsx,vue,svelte,astro,elm,php,phtml,mdx,md}"
];

async function parseApply(root, uno, directiveName) {
  root.walkAtRules(directiveName, async (rule) => {
    if (!rule.parent)
      return;
    const source = rule.source;
    const classNames = expandVariantGroup(rule.params).split(/\s+/g).map((className) => className.trim().replace(/\\/, ""));
    const utils = (await Promise.all(
      classNames.map((i) => uno.parseToken(i, "-"))
    )).filter(notNull).flat().sort((a, b) => a[0] - b[0]).sort((a, b) => (a[3] ? uno.parentOrders.get(a[3]) ?? 0 : 0) - (b[3] ? uno.parentOrders.get(b[3]) ?? 0 : 0)).reduce((acc, item) => {
      const target = acc.find((i) => i[1] === item[1] && i[3] === item[3]);
      if (target)
        target[2] += item[2];
      else
        acc.push([...item]);
      return acc;
    }, []);
    if (!utils.length)
      return;
    const parentAfterNodes = [];
    for (const i of utils) {
      const [, _selector, body, parent] = i;
      const selector = _selector?.replace(regexScopePlaceholder, " ") || _selector;
      if (parent || selector && selector !== ".\\-") {
        const node = parse(rule.parent.toString(), {
          context: "rule"
        });
        let newSelector = generate(node.prelude);
        if (selector && selector !== ".\\-") {
          const selectorAST = parse(selector, {
            context: "selector"
          });
          const prelude = clone(node.prelude);
          prelude.children.forEach((child) => {
            const parentSelectorAst = clone(selectorAST);
            parentSelectorAst.children.forEach((i2) => {
              if (i2.type === "ClassSelector" && i2.name === "\\-")
                Object.assign(i2, clone(child));
            });
            Object.assign(child, parentSelectorAst);
          });
          newSelector = generate(prelude);
        }
        let css = `${newSelector}{${body}}`;
        if (parent)
          css = `${parent}{${css}}`;
        const css_parsed = postcss.parse(css);
        css_parsed.walkDecls((declaration) => {
          declaration.source = source;
        });
        parentAfterNodes.push(css_parsed);
      } else {
        const css = postcss.parse(body);
        css.walkDecls((declaration) => {
          declaration.source = source;
        });
        rule.parent.append(css);
      }
    }
    rule.parent.after(parentAfterNodes);
    rule.remove();
  });
}

async function parseTheme(root, uno) {
  root.walkDecls((decl) => {
    decl.value = transformThemeFn(decl.value, uno.config.theme);
  });
}

async function parseScreen(root, uno, directiveName) {
  root.walkAtRules(directiveName, async (rule) => {
    let breakpointName = "";
    let prefix = "";
    if (rule.params)
      breakpointName = rule.params.trim();
    if (!breakpointName)
      return;
    const match = breakpointName.match(/^(?:(lt|at)-)?(\w+)$/);
    if (match) {
      prefix = match[1];
      breakpointName = match[2];
    }
    const resolveBreakpoints = () => {
      let breakpoints;
      if (uno.userConfig && uno.userConfig.theme)
        breakpoints = uno.userConfig.theme.breakpoints;
      if (!breakpoints)
        breakpoints = uno.config.theme.breakpoints;
      return breakpoints ? Object.entries(breakpoints).sort((a, b) => Number.parseInt(a[1].replace(/[a-z]+/gi, "")) - Number.parseInt(b[1].replace(/[a-z]+/gi, ""))).map(([point, size]) => ({ point, size })) : void 0;
    };
    const variantEntries = (resolveBreakpoints() ?? []).map(({ point, size }, idx) => [point, size, idx]);
    const generateMediaQuery = (breakpointName2, prefix2) => {
      const [, size, idx] = variantEntries.find((i) => i[0] === breakpointName2);
      if (prefix2) {
        if (prefix2 === "lt")
          return `(max-width: ${calcMaxWidthBySize(size)})`;
        else if (prefix2 === "at")
          return `(min-width: ${size})${variantEntries[idx + 1] ? ` and (max-width: ${calcMaxWidthBySize(variantEntries[idx + 1][1])})` : ""}`;
        else
          throw new Error(`breakpoint variant not supported: ${prefix2}`);
      }
      return `(min-width: ${size})`;
    };
    if (!variantEntries.find((i) => i[0] === breakpointName))
      throw new Error(`breakpoint ${breakpointName} not found`);
    rule.name = "media";
    rule.params = `${generateMediaQuery(breakpointName, prefix)}`;
  });
}
function calcMaxWidthBySize(size) {
  const value = size.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || "";
  const unit = size.slice(value.length);
  const maxWidth = Number.parseFloat(value) - 0.1;
  return Number.isNaN(maxWidth) ? size : `${maxWidth}${unit}`;
}

function unocss(options = {}) {
  const {
    cwd = process.cwd(),
    configOrPath
  } = options;
  const directiveMap = Object.assign({
    apply: "apply",
    theme: "theme",
    screen: "screen",
    unocss: "unocss"
  }, options.directiveMap || {});
  const fileMap = /* @__PURE__ */ new Map();
  const fileClassMap = /* @__PURE__ */ new Map();
  const classes = /* @__PURE__ */ new Set();
  const targetCache = /* @__PURE__ */ new Set();
  const config = loadConfig(cwd, configOrPath);
  let uno;
  let promises = [];
  let last_config_mtime = 0;
  const targetRE = new RegExp(Object.values(directiveMap).join("|"));
  return {
    postcssPlugin: directiveMap.unocss,
    plugins: [
      async function(root, result) {
        const from = result.opts.from?.split("?")[0];
        if (!from)
          return;
        let isTarget = targetCache.has(from);
        const isScanTarget = root.toString().includes(`@${directiveMap.unocss}`);
        if (targetRE.test(root.toString())) {
          if (!isTarget) {
            root.walkAtRules((rule) => {
              if (rule.name === directiveMap.unocss || rule.name === directiveMap.apply || rule.name === directiveMap.screen)
                isTarget = true;
              if (isTarget)
                return false;
            });
            if (!isTarget) {
              root.walkDecls((decl) => {
                if (hasThemeFn(decl.value)) {
                  isTarget = true;
                  return false;
                }
              });
            } else {
              targetCache.add(from);
            }
          }
        } else if (targetCache.has(from)) {
          targetCache.delete(from);
        }
        if (!isTarget)
          return;
        try {
          const cfg = await config;
          if (!uno) {
            uno = createGenerator(cfg.config);
          } else if (cfg.sources.length) {
            const config_mtime = (await stat(cfg.sources[0])).mtimeMs;
            if (config_mtime > last_config_mtime) {
              uno = createGenerator((await loadConfig(cwd, configOrPath)).config);
              last_config_mtime = config_mtime;
            }
          }
        } catch (error) {
          throw new Error(`UnoCSS config not found: ${error.message}`);
        }
        const globs = uno.config.content?.filesystem ?? defaultFilesystemGlobs;
        const plainContent = uno.config.content?.inline ?? [];
        const entries = await fg(isScanTarget ? globs : from, {
          cwd,
          absolute: true,
          ignore: ["**/node_modules/**"],
          stats: true
        });
        await parseApply(root, uno, directiveMap.apply);
        await parseTheme(root, uno);
        await parseScreen(root, uno, directiveMap.screen);
        promises.push(
          ...plainContent.map(async (c2, idx) => {
            if (typeof c2 === "function")
              c2 = await c2();
            if (typeof c2 === "string")
              c2 = { code: c2 };
            const { matched } = await uno.generate(c2.code, { id: c2.id ?? `__plain_content_${idx}__` });
            for (const candidate of matched)
              classes.add(candidate);
          }),
          ...entries.map(async ({ path: file, mtimeMs }) => {
            result.messages.push({
              type: "dependency",
              plugin: directiveMap.unocss,
              file: normalize(file),
              parent: from
            });
            if (fileMap.has(file) && mtimeMs <= fileMap.get(file))
              return;
            else
              fileMap.set(file, mtimeMs);
            const content = await readFile(file, "utf8");
            const { matched } = await uno.generate(content, {
              id: file
            });
            fileClassMap.set(file, matched);
          })
        );
        await Promise.all(promises);
        promises = [];
        for (const set of fileClassMap.values()) {
          for (const candidate of set)
            classes.add(candidate);
        }
        const c = await uno.generate(classes);
        classes.clear();
        const excludes = [];
        root.walkAtRules(directiveMap.unocss, (rule) => {
          if (rule.params) {
            const source = rule.source;
            const layers = rule.params.split(",").map((v) => v.trim());
            const css = postcss.parse(
              layers.map((i) => (i === "all" ? c.getLayers() : c.getLayer(i)) || "").filter(Boolean).join("\n")
            );
            css.walkDecls((declaration) => {
              declaration.source = source;
            });
            rule.replaceWith(css);
            excludes.push(rule.params);
          }
        });
        root.walkAtRules(directiveMap.unocss, (rule) => {
          if (!rule.params) {
            const source = rule.source;
            const css = postcss.parse(c.getLayers(void 0, excludes) || "");
            css.walkDecls((declaration) => {
              declaration.source = source;
            });
            rule.replaceWith(css);
          }
        });
      }
    ]
  };
}
unocss.postcss = true;
unocss.default = unocss;

export { unocss as default };
