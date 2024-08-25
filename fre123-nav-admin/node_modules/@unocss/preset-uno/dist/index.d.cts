import * as _unocss_core from '@unocss/core';
import { PresetMiniOptions, Theme } from '@unocss/preset-mini';
export { Theme } from '@unocss/preset-mini';

interface PresetUnoOptions extends PresetMiniOptions {
}
/**
 * The defult UnoCSS preset, provide Tailwind-like utilities with some additional features.
 *
 * @see https://unocss.dev/presets/uno
 */
declare const presetUno: _unocss_core.PresetFactory<Theme, PresetUnoOptions>;

export { type PresetUnoOptions, presetUno as default, presetUno };
