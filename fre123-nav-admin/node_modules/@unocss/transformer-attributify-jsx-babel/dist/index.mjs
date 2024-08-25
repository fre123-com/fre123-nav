import path from 'node:path';
import { toArray } from '@unocss/core';
import * as babel from '@babel/core';
import ts from '@babel/preset-typescript';
import jsx from '@babel/plugin-syntax-jsx';

function createFilter(include, exclude) {
  const includePattern = toArray(include || []);
  const excludePattern = toArray(exclude || []);
  return (id) => {
    if (excludePattern.some((p) => id.match(p)))
      return false;
    return includePattern.some((p) => id.match(p));
  };
}
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
  function babelPlugin(uno, ctx) {
    return {
      name: "@unocss/transformer-attributify-jsx-babel",
      visitor: {
        JSXAttribute(path2) {
          if (path2.node.value === null) {
            const attr = babel.types.isJSXNamespacedName(path2.node.name) ? `${path2.node.name.namespace.name}:${path2.node.name.name.name}` : path2.node.name.name;
            if (isBlocked(attr))
              return;
            if (ctx.matched.includes(attr)) {
              path2.node.value = babel.types.stringLiteral("");
            } else {
              ctx.tasks.push(
                uno.parseToken(attr).then((matched) => {
                  if (matched)
                    ctx.matched.push(attr);
                })
              );
            }
          }
        }
      }
    };
  }
  return {
    name: "@unocss/transformer-attributify-jsx-babel",
    enforce: "pre",
    idFilter,
    async transform(code, id, { uno }) {
      const ctx = { tasks: [], matched: [] };
      const babelOptions = {
        presets: [ts],
        plugins: [
          babelPlugin(uno, ctx),
          jsx
        ],
        filename: path.basename(id)
      };
      await babel.transformAsync(code.toString(), babelOptions);
      await Promise.all(ctx.tasks);
      const result = await babel.transformAsync(code.toString(), babelOptions);
      if (result)
        code.overwrite(0, code.original.length, result.code || "");
    }
  };
}

export { transformerAttributifyJsx as default };
