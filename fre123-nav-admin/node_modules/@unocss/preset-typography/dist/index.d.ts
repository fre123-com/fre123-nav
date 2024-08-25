import * as _unocss_core from '@unocss/core';
import { CSSObject } from '@unocss/core';
import { Theme } from '@unocss/preset-mini';

/** @public */
interface TypographyCompatibilityOptions {
  noColonWhere?: boolean
  noColonIs?: boolean
  noColonNot?: boolean
}

/**
 * @public
 */
interface TypographyOptions {
    /**
     * The selector name to use the typographic utilities.
     * To undo the styles to the elements, use it like
     * `not-${selectorName}` which is by default `not-prose`.
     *
     * Note: `not` utility is only available in class mode.
     *
     * @defaultValue `prose`
     */
    selectorName?: string;
    /**
     * Extend or override CSS selectors with CSS declaration block.
     *
     * @defaultValue undefined
     */
    cssExtend?: Record<string, CSSObject> | ((theme: Theme) => Record<string, CSSObject>);
    /**
     * Compatibility option. Notice that it will affect some features.
     * For more instructions, see
     * [README](https://github.com/unocss/unocss/tree/main/packages/preset-typography)
     *
     * @defaultValue undefined
     */
    compatibility?: TypographyCompatibilityOptions;
    /**
     * @deprecated use `selectorName` instead. It will be removed in 1.0.
     */
    className?: string;
}
/**
 * UnoCSS Preset for Typography
 *
 * ```js
 * // uno.config.ts
 * import { presetAttributify, presetUno, defineConfig, presetTypography } from 'unocss'
 *
 * export default defineConfig({
 *   presets: [
 *     presetAttributify(), // required if using attributify mode
 *     presetUno(), // required
 *     presetTypography()
 *   ]
 * })
 * ```
 *
 * @returns typography preset
 * @public
 */
declare const presetTypography: _unocss_core.PresetFactory<Theme, TypographyOptions>;

export { type TypographyOptions, presetTypography as default, presetTypography };
