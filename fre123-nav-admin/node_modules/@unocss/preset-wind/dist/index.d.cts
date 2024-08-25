import * as _unocss_core from '@unocss/core';
import { Rule, Variant } from '@unocss/core';
import * as _unocss_preset_mini from '@unocss/preset-mini';
import { Theme, PresetMiniOptions } from '@unocss/preset-mini';
export { Theme, colors, preflights } from '@unocss/preset-mini';

declare const rules: Rule<Theme>[];

declare const shortcuts: _unocss_core.Shortcut<_unocss_preset_mini.Theme>[];

declare const theme: Theme;

declare function variants(options: PresetWindOptions): Variant<Theme>[];

interface PresetWindOptions extends PresetMiniOptions {
    /**
     * The important option lets you control whether UnoCSS’s utilities should be marked with `!important`.
     *
     * This can be really useful when using UnoCSS with existing CSS that has high specificity selectors.
     *
     * You can also set `important` to a selector like `#app` instead, which will generate `#app :is(.m-1) { ... }`
     *
     * Also check out the compatibility with [:is()](https://caniuse.com/?search=%3Ais())
     *
     * @default false
     */
    important?: boolean | string;
}
/**
 * The Tailwind CSS / Windi CSS compact preset for UnoCSS.
 *
 * @see https://unocss.dev/presets/wind
 */
declare const presetWind: _unocss_core.PresetFactory<_unocss_preset_mini.Theme, PresetWindOptions>;

export { type PresetWindOptions, presetWind as default, presetWind, rules, shortcuts, theme, variants };
