import * as _unocss_core from '@unocss/core';
import { PresetOptions, AutoCompleteExtractor, Extractor, VariantObject } from '@unocss/core';

interface AttributifyOptions extends PresetOptions {
    /**
     * Only generate CSS for attributify or class
     *
     * @default false
     */
    strict?: boolean;
    /**
     * @default 'un-'
     */
    prefix?: string;
    /**
     * Only match for prefixed attributes
     *
     * @default false
     */
    prefixedOnly?: boolean;
    /**
     * Support matching non-valued attributes
     *
     * For example
     * ```html
     * <div mt-2 />
     * ```
     *
     * @default true
     */
    nonValuedAttribute?: boolean;
    /**
     * A list of attributes to be ignored from extracting.
     */
    ignoreAttributes?: string[];
    /**
     * Non-valued attributes will also match if the actual value represented in DOM is `true`.
     * This option exists for supporting frameworks that encodes non-valued attributes as `true`.
     * Enabling this option will break rules that ends with `true`.
     *
     * @default false
     */
    trueToNonValued?: boolean;
}

declare function autocompleteExtractorAttributify(options?: AttributifyOptions): AutoCompleteExtractor;

declare const defaultIgnoreAttributes: string[];
declare function extractorAttributify(options?: AttributifyOptions): Extractor;

declare const variantsRE: RegExp;
declare function variantAttributify(options?: AttributifyOptions): VariantObject;

type TwoStringsCompositionPrefix = 'm' | 'p';
type TwoStringsCompositionSuffix = 'r' | 'b' | 'l' | 't' | 'a' | 'x' | 'y';
/** Some words can compose with two strings to become a complete unocss rule such as ha, mr, mb */
type TwoStringsComposition = `${TwoStringsCompositionPrefix}${TwoStringsCompositionSuffix}` | 'ha' | 'wa';
/** Some words can be a complete unocss rule by itself */
type SpecialSingleWord = 'container' | 'flex' | 'block' | 'inline' | 'table' | 'isolate' | 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static' | 'visible' | 'invisible' | 'grow' | 'shrink' | 'antialiased' | 'italic' | 'ordinal' | 'overline' | 'underline' | 'uppercase' | 'lowercase' | 'capitalize' | 'truncate' | 'border' | 'rounded' | 'outline' | 'ring' | 'shadow' | 'blur' | 'grayscale' | 'invert' | 'sepia' | 'transition' | 'resize' | 'transform' | 'filter';
type PseudoPrefix = 'active' | 'before' | 'after' | 'dark' | 'light' | 'first' | 'last' | 'focus' | 'hover' | 'link' | 'root' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'enabled' | 'disabled' | 'all' | 'children';
/** Some words can be used to separate utilities, such as font="mono light", text="sm white" */
type SeparateEnabled = 'align' | 'animate' | 'backdrop' | 'bg' | 'blend' | 'border' | 'box' | 'container' | 'content' | 'cursor' | 'display' | 'divide' | 'filter' | 'flex' | 'font' | 'fw' | 'gap' | 'gradient' | 'grid' | 'h' | 'icon' | 'items' | 'justify' | 'list' | 'm' | 'op' | 'opacity' | 'order' | 'outline' | 'overflow' | 'p' | 'place' | 'pos' | 'position' | 'ring' | 'select' | 'shadow' | 'size' | 'space' | 'table' | 'text' | 'transform' | 'transition' | 'underline' | 'w' | 'z' | PseudoPrefix;
type BasicAttributes = SpecialSingleWord | TwoStringsComposition | SeparateEnabled;
type AttributifyNames<Prefix extends string = ''> = `${Prefix}${BasicAttributes}` | `${Prefix}${PseudoPrefix}:${BasicAttributes}`;
interface AttributifyAttributes extends Partial<Record<AttributifyNames, string | boolean>> {
}

/**
 * This enables the attributify mode for other presets.
 *
 * @example
 *
 * ```html
 * <button
 *   bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
 *   text="sm white"
 *   font="mono light"
 *   p="y-2 x-4"
 *   border="2 rounded blue-200"
 * >
 *   Button
 * </button>
 * ```
 *
 * @see https://unocss.dev/presets/attributify
 */
declare const presetAttributify: _unocss_core.PresetFactory<object, AttributifyOptions>;

export { type AttributifyAttributes, type AttributifyNames, type AttributifyOptions, type BasicAttributes, type PseudoPrefix, type SeparateEnabled, type SpecialSingleWord, type TwoStringsComposition, type TwoStringsCompositionPrefix, type TwoStringsCompositionSuffix, autocompleteExtractorAttributify, presetAttributify as default, defaultIgnoreAttributes, extractorAttributify, presetAttributify, variantAttributify, variantsRE };
