import { parseVariantGroup } from '@unocss/core';

function transformerVariantGroup(options = {}) {
  return {
    name: "@unocss/transformer-variant-group",
    enforce: "pre",
    transform(s) {
      const result = parseVariantGroup(s, options.separators);
      return {
        get highlightAnnotations() {
          return [...result.groupsByOffset.values()].flatMap((group) => group.items);
        }
      };
    }
  };
}

export { transformerVariantGroup as default };
