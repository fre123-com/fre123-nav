import { definePreset } from '@unocss/core';

const MARKER = "__TAGIFY__";
const htmlTagRE = /<([\w\d-:]+)/g;
function extractorTagify(options) {
  const {
    prefix = "",
    excludedTags = ["b", /^h\d+$/, "table"]
  } = options;
  return {
    name: "tagify",
    extract({ code }) {
      return Array.from(code.matchAll(htmlTagRE)).filter(({ 1: match }) => {
        for (const exclude of excludedTags) {
          if (typeof exclude === "string") {
            if (match === exclude)
              return false;
          } else {
            if (exclude.test(match))
              return false;
          }
        }
        return match.startsWith(prefix);
      }).map(([, matched]) => `${MARKER}${matched}`);
    }
  };
}

function variantTagify(options) {
  const { extraProperties } = options;
  const prefix = `${MARKER}${options.prefix ?? ""}`;
  return {
    name: "tagify",
    match(input) {
      if (!input.startsWith(prefix))
        return;
      const matcher = input.slice(prefix.length);
      const handler = {
        matcher,
        selector: (i) => i.slice(MARKER.length + 1)
      };
      if (extraProperties) {
        if (typeof extraProperties === "function")
          handler.body = (entries) => [...entries, ...Object.entries(extraProperties(matcher) ?? {})];
        else
          handler.body = (entries) => [...entries, ...Object.entries(extraProperties)];
      }
      return handler;
    }
  };
}

const presetTagify = definePreset((options = {}) => {
  const {
    defaultExtractor = true
  } = options;
  const variants = [
    variantTagify(options)
  ];
  const extractors = [
    extractorTagify(options)
  ];
  return {
    name: "@unocss/preset-tagify",
    variants,
    extractors,
    extractorDefault: defaultExtractor ? void 0 : false
  };
});

export { MARKER, presetTagify as default, extractorTagify, htmlTagRE, presetTagify, variantTagify };
