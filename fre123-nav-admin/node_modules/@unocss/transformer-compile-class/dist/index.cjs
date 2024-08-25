'use strict';

const core = require('@unocss/core');

function transformerCompileClass(options = {}) {
  const {
    trigger = /(["'`]):uno(?:-)?(?<name>[^\s\1]+)?:\s([^\1]*?)\1/g,
    classPrefix = "uno-",
    hashFn = hash,
    keepUnknown = true,
    alwaysHash = false
  } = options;
  const compiledClass = /* @__PURE__ */ new Set();
  const regexp = typeof trigger === "string" ? RegExp(`(["'\`])${core.escapeRegExp(trigger)}\\s([^\\1]*?)\\1`, "g") : trigger;
  return {
    name: "@unocss/transformer-compile-class",
    enforce: "pre",
    async transform(s, _, { uno, tokens, invalidate }) {
      const matches = [...s.original.matchAll(regexp)];
      if (!matches.length)
        return;
      const size = compiledClass.size;
      for (const match of matches) {
        let body = match.length === 4 && match.groups ? core.expandVariantGroup(match[3].trim()) : core.expandVariantGroup(match[2].trim());
        const start = match.index;
        const replacements = [];
        if (keepUnknown) {
          const result = await Promise.all(body.split(/\s+/).filter(Boolean).map(async (i) => [i, !!await uno.parseToken(i)]));
          const known = result.filter(([, matched]) => matched).map(([i]) => i);
          const unknown = result.filter(([, matched]) => !matched).map(([i]) => i);
          replacements.push(...unknown);
          body = known.join(" ");
        }
        if (body) {
          body = body.split(/\s+/).sort().join(" ");
          let hash2;
          let explicitName = false;
          if (match.groups && match.groups.name) {
            hash2 = match.groups.name;
            if (alwaysHash)
              hash2 += `-${hashFn(body)}`;
            explicitName = true;
          } else {
            hash2 = hashFn(body);
          }
          const className = `${classPrefix}${hash2}`;
          if (tokens && tokens.has(className) && explicitName) {
            const existing = uno.config.shortcuts.find((i) => i[0] === className);
            if (existing && existing[1] !== body)
              throw new Error(`Duplicated compile class name "${className}". One is "${body}" and the other is "${existing[1]}". Please choose different class name or set 'alwaysHash' to 'true'.`);
          }
          compiledClass.add(className);
          replacements.unshift(className);
          if (options.layer)
            uno.config.shortcuts.push([className, body, { layer: options.layer }]);
          else
            uno.config.shortcuts.push([className, body]);
          if (tokens)
            tokens.add(className);
        }
        s.overwrite(start + 1, start + match[0].length - 1, replacements.join(" "));
      }
      if (compiledClass.size > size)
        invalidate();
    }
  };
}
function hash(str) {
  let i;
  let l;
  let hval = 2166136261;
  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return `00000${(hval >>> 0).toString(36)}`.slice(-6);
}

module.exports = transformerCompileClass;
