import * as _unocss_core from '@unocss/core';
import { IconsOptions } from './core.js';
export { combineLoaders, createCDNFetchLoader, createPresetIcons, getEnvFlags, icons } from './core.js';
import '@iconify/utils/lib/loader/types';
import '@iconify/types';

/**
 * Use any icon with Pure CSS for UnoCSS.
 *
 * @example
 *
 * ```html
 * <div class="i-mdi-alarm"></div>
 * <div class="i-logos-vue text-3xl"></div>
 * <button class="i-carbon-sun dark:i-carbon-moon"></div>
 * ```
 *
 * @see https://unocss.dev/presets/icons
 */
declare const presetIcons: _unocss_core.PresetFactory<object, IconsOptions>;

export { IconsOptions, presetIcons as default, presetIcons };
