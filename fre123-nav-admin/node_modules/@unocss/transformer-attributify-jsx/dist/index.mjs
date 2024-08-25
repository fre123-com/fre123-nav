import { toArray } from '@unocss/core';

function createFilter(include, exclude) {
  const includePattern = toArray(include || []);
  const excludePattern = toArray(exclude || []);
  return (id) => {
    if (excludePattern.some((p) => id.match(p)))
      return false;
    return includePattern.some((p) => id.match(p));
  };
}
const elementRE = /(<\w[\w:\.$-]*\s)([\s\S]*?)(?=>[\s\S]?<\/[\s\w:\.$-]*>|\/>)/g;
const attributeRE = /(?<![~`!$%^&*()_+\-=[{;':"|,.<>/?]\s*)([a-zA-Z()#][\[?a-zA-Z0-9-_:()#%\]?]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/g;
const valuedAttributeRE = /((?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:!%-.~<]+)=(?:["]([^"]*)["]|[']([^']*)[']|[{]((?:[`(](?:[^`)]*)[`)]|[^}])+)[}])/gms;
function transformerAttributifyJsx(options = {}) {
  const {
    blocklist = []
  } = options;
  const isBlocked = (matchedRule) => {
    for (const blockedRule of blocklist) {
      if (blockedRule instanceof RegExp) {
        if (blockedRule.test(matchedRule))
          return true;
      } else if (matchedRule === blockedRule) {
        return true;
      }
    }
    return false;
  };
  const idFilter = createFilter(
    options.include || [/\.[jt]sx$/, /\.mdx$/],
    options.exclude || []
  );
  return {
    name: "@unocss/transformer-attributify-jsx",
    enforce: "pre",
    idFilter,
    async transform(code, _, { uno }) {
      const tasks = [];
      for (const item of Array.from(code.original.matchAll(elementRE))) {
        let attributifyPart = item[2];
        if (valuedAttributeRE.test(attributifyPart))
          attributifyPart = attributifyPart.replace(valuedAttributeRE, (match) => " ".repeat(match.length));
        for (const attr of attributifyPart.matchAll(attributeRE)) {
          const matchedRule = attr[0].replace(/\:/i, "-");
          if (matchedRule.includes("=") || isBlocked(matchedRule))
            continue;
          tasks.push(uno.parseToken(matchedRule).then((matched) => {
            if (matched) {
              const tag = item[1];
              const startIdx = (item.index || 0) + (attr.index || 0) + tag.length;
              const endIdx = startIdx + matchedRule.length;
              code.overwrite(startIdx, endIdx, `${matchedRule}=""`);
            }
          }));
        }
      }
      await Promise.all(tasks);
    }
  };
}

export { transformerAttributifyJsx as default };
