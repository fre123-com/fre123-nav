'use strict';

const core = require('@unocss/core');

function transformerVariantGroup(options = {}) {
  return {
    name: "@unocss/transformer-variant-group",
    enforce: "pre",
    transform(s) {
      const result = core.parseVariantGroup(s, options.separators);
      return {
        get highlightAnnotations() {
          return [...result.groupsByOffset.values()].flatMap((group) => group.items);
        }
      };
    }
  };
}

module.exports = transformerVariantGroup;
