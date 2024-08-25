'use strict';

const path = require('node:path');
const core = require('@unocss/core');
const babel = require('@babel/core');
const ts = require('@babel/preset-typescript');
const jsx = require('@babel/plugin-syntax-jsx');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

function _interopNamespaceCompat(e) {
  if (e && typeof e === 'object' && 'default' in e) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const path__default = /*#__PURE__*/_interopDefaultCompat(path);
const babel__namespace = /*#__PURE__*/_interopNamespaceCompat(babel);
const ts__default = /*#__PURE__*/_interopDefaultCompat(ts);
const jsx__default = /*#__PURE__*/_interopDefaultCompat(jsx);

function createFilter(include, exclude) {
  const includePattern = core.toArray(include || []);
  const excludePattern = core.toArray(exclude || []);
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
            const attr = babel__namespace.types.isJSXNamespacedName(path2.node.name) ? `${path2.node.name.namespace.name}:${path2.node.name.name.name}` : path2.node.name.name;
            if (isBlocked(attr))
              return;
            if (ctx.matched.includes(attr)) {
              path2.node.value = babel__namespace.types.stringLiteral("");
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
        presets: [ts__default],
        plugins: [
          babelPlugin(uno, ctx),
          jsx__default
        ],
        filename: path__default.basename(id)
      };
      await babel__namespace.transformAsync(code.toString(), babelOptions);
      await Promise.all(ctx.tasks);
      const result = await babel__namespace.transformAsync(code.toString(), babelOptions);
      if (result)
        code.overwrite(0, code.original.length, result.code || "");
    }
  };
}

module.exports = transformerAttributifyJsx;
