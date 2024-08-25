import { definePreset } from '@unocss/core';
import { presetWind } from '@unocss/preset-wind';
import { parseCssColor, colorToString } from '@unocss/rule-utils';

function mixComponent(v1, v2, w) {
  return `calc(${v2} + (${v1} - ${v2}) * ${w} / 100)`;
}
function mixColor(color1, color2, weight) {
  const colors = [color1, color2];
  const cssColors = [];
  for (let c = 0; c < 2; c++) {
    const color = typeof colors[c] === "string" ? parseCssColor(colors[c]) : colors[c];
    if (!color || !["rgb", "rgba"].includes(color.type))
      return;
    cssColors.push(color);
  }
  const newComponents = [];
  for (let x = 0; x < 3; x++)
    newComponents.push(mixComponent(cssColors[0].components[x], cssColors[1].components[x], weight));
  return {
    type: "rgb",
    components: newComponents,
    alpha: mixComponent(cssColors[0].alpha ?? 1, cssColors[1].alpha ?? 1, weight)
  };
}
function tint(color, weight) {
  return mixColor("#fff", color, weight);
}
function shade(color, weight) {
  return mixColor("#000", color, weight);
}
function shift(color, weight) {
  const num = Number.parseFloat(`${weight}`);
  if (!Number.isNaN(num))
    return num > 0 ? shade(color, weight) : tint(color, -num);
}
const fns = { tint, shade, shift };
function variantColorMix() {
  let re;
  return {
    name: "mix",
    match(matcher, ctx) {
      if (!re)
        re = new RegExp(`^mix-(tint|shade|shift)-(-?\\d{1,3})(?:${ctx.generator.config.separators.join("|")})`);
      const m = matcher.match(re);
      if (m) {
        return {
          matcher: matcher.slice(m[0].length),
          body: (body) => {
            body.forEach((v) => {
              if (v[1]) {
                const color = parseCssColor(`${v[1]}`);
                if (color) {
                  const mixed = fns[m[1]](color, m[2]);
                  if (mixed)
                    v[1] = colorToString(mixed);
                }
              }
            });
            return body;
          }
        };
      }
    }
  };
}

const presetUno = definePreset((options = {}) => {
  const wind = presetWind(options);
  return {
    ...wind,
    name: "@unocss/preset-uno",
    variants: [
      ...wind.variants,
      variantColorMix()
    ]
  };
});

export { presetUno as default, presetUno };
