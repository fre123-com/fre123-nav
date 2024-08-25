import { expandVariantGroup, notNull, regexScopePlaceholder, cssIdRE, toArray } from '@unocss/core';
import { generate, parse, clone, List, walk } from 'css-tree';
import { transformThemeFn, hasThemeFn } from '@unocss/rule-utils';

function handleThemeFn({ code, uno, options }, node) {
  const { throwOnMissing = true } = options;
  const offset = node.value.loc.start.offset;
  const str = code.original.slice(offset, node.value.loc.end.offset);
  code.overwrite(offset, node.value.loc.end.offset, transformThemeFn(str, uno.config.theme, throwOnMissing));
}

const screenRuleRE = /(@screen) (.+) /g;
function handleScreen({ code, uno }, node) {
  let breakpointName = "";
  let prefix = "";
  if (node.name === "screen" && node.prelude?.type === "Raw")
    breakpointName = node.prelude.value.trim();
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
        return `@media (max-width: ${calcMaxWidthBySize(size)})`;
      else if (prefix2 === "at")
        return `@media (min-width: ${size})${variantEntries[idx + 1] ? ` and (max-width: ${calcMaxWidthBySize(variantEntries[idx + 1][1])})` : ""}`;
      else
        throw new Error(`breakpoint variant not supported: ${prefix2}`);
    }
    return `@media (min-width: ${size})`;
  };
  if (!variantEntries.find((i) => i[0] === breakpointName))
    throw new Error(`breakpoint ${breakpointName} not found`);
  const offset = node.loc.start.offset;
  const str = code.original.slice(offset, node.loc.end.offset);
  const matches = Array.from(str.matchAll(screenRuleRE));
  if (!matches.length)
    return;
  for (const match2 of matches) {
    code.overwrite(
      offset + match2.index,
      offset + match2.index + match2[0].length,
      `${generateMediaQuery(breakpointName, prefix)} `
    );
  }
}
function calcMaxWidthBySize(size) {
  const value = size.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || "";
  const unit = size.slice(value.length);
  const maxWidth = Number.parseFloat(value) - 0.1;
  return Number.isNaN(maxWidth) ? size : `${maxWidth}${unit}`;
}

async function handleApply(ctx, node) {
  const { code, uno, options, filename, offset } = ctx;
  const calcOffset = (pos) => offset ? pos + offset : pos;
  await Promise.all(
    node.block.children.map(async (childNode) => {
      if (childNode.type === "Raw")
        return transformDirectives(code, uno, options, filename, childNode.value, calcOffset(childNode.loc.start.offset));
      await parseApply(ctx, node, childNode);
    }).toArray()
  );
}
async function parseApply({ code, uno, offset, applyVariable }, node, childNode) {
  const calcOffset = (pos) => offset ? pos + offset : pos;
  let body;
  if (childNode.type === "Atrule" && childNode.name === "apply" && childNode.prelude && childNode.prelude.type === "Raw")
    body = childNode.prelude.value.trim();
  else if (childNode.type === "Declaration" && applyVariable.includes(childNode.property) && childNode.value.type === "Raw")
    body = childNode.value.value.trim();
  if (!body)
    return;
  if (/^(['"]).*\1$/.test(body))
    body = body.slice(1, -1);
  const classNames = expandVariantGroup(body).split(/\s+/g).map((className) => className.trim().replace(/\\/, ""));
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
  const simicolonOffset = code.toString()[childNode.loc.end.offset] === ";" ? 1 : 0;
  for (const i of utils) {
    const [, _selector, body2, parent] = i;
    const selectorOrGroup = _selector?.replace(regexScopePlaceholder, " ") || _selector;
    if (parent || selectorOrGroup && selectorOrGroup !== ".\\-") {
      let newSelector = generate(node.prelude);
      if (selectorOrGroup && selectorOrGroup !== ".\\-") {
        const ruleAST = parse(`${selectorOrGroup}{}`, {
          context: "rule"
        });
        const prelude = clone(node.prelude);
        prelude.children.forEach((child) => {
          const selectorListAst = clone(ruleAST.prelude);
          const classSelectors = new List();
          selectorListAst.children.forEach((selectorAst) => {
            classSelectors.appendList(selectorAst.children.filter((i2) => i2.type === "ClassSelector" && i2.name === "\\-"));
          });
          classSelectors.forEach((i2) => Object.assign(i2, clone(child)));
          Object.assign(child, selectorListAst);
        });
        newSelector = generate(prelude);
      }
      let css = `${newSelector}{${body2}}`;
      if (parent)
        css = `${parent}{${css}}`;
      code.appendLeft(calcOffset(node.loc.end.offset), css);
    } else {
      if (body2.includes("@"))
        code.appendRight(code.original.length + simicolonOffset, body2);
      else
        code.appendRight(calcOffset(childNode.loc.end.offset + simicolonOffset), body2);
    }
  }
  code.remove(
    calcOffset(childNode.loc.start.offset),
    calcOffset(childNode.loc.end.offset + simicolonOffset)
  );
}

function transformerDirectives(options = {}) {
  return {
    name: "@unocss/transformer-directives",
    enforce: options?.enforce,
    idFilter: (id) => cssIdRE.test(id),
    transform: (code, id, ctx) => {
      return transformDirectives(code, ctx.uno, options, id);
    }
  };
}
async function transformDirectives(code, uno, options, filename, originalCode, offset) {
  let { applyVariable } = options;
  const varStyle = options.varStyle;
  if (applyVariable === void 0) {
    if (varStyle !== void 0)
      applyVariable = varStyle ? [`${varStyle}apply`] : [];
    applyVariable = ["--at-apply", "--uno-apply", "--uno"];
  }
  applyVariable = toArray(applyVariable || []);
  const hasApply = code.original.includes("@apply") || applyVariable.some((s) => code.original.includes(s));
  const hasScreen = code.original.includes("@screen");
  const hasThemeFn$1 = hasThemeFn(code.original);
  if (!hasApply && !hasThemeFn$1 && !hasScreen)
    return;
  const ast = parse(originalCode || code.original, {
    parseAtrulePrelude: false,
    positions: true,
    filename
  });
  if (ast.type !== "StyleSheet")
    return;
  const stack = [];
  const ctx = {
    options,
    applyVariable,
    uno,
    code,
    filename,
    offset
  };
  const processNode = async (node, _item, _list) => {
    if (hasScreen && node.type === "Atrule")
      handleScreen(ctx, node);
    if (hasThemeFn$1 && node.type === "Declaration")
      handleThemeFn(ctx, node);
    if (hasApply && node.type === "Rule")
      await handleApply(ctx, node);
  };
  walk(ast, (...args) => stack.push(processNode(...args)));
  await Promise.all(stack);
}

export { transformerDirectives as default, transformDirectives };
