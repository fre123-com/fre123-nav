import { DynamicMatcher, ParsedColorValue, CSSObject, VariantContext, StaticRule } from '@unocss/core';
import { T as Theme } from './preset-mini.P5Rzuhf5.cjs';

declare const CONTROL_MINI_NO_NEGATIVE = "$$mini-no-negative";
/**
 * Provide {@link DynamicMatcher} function returning spacing definition. See spacing rules.
 *
 * @param propertyPrefix - Property for the css value to be created. Postfix will be appended according to direction matched.
 * @see {@link directionMap}
 */
declare function directionSize(propertyPrefix: string): DynamicMatcher;
type ThemeColorKeys = 'colors' | 'borderColor' | 'backgroundColor' | 'textColor' | 'shadowColor' | 'accentColor';
/**
 * Split utility shorthand delimited by / or :
 */
declare function splitShorthand(body: string, type: string): string[] | undefined;
/**
 * Parse color string into {@link ParsedColorValue} (if possible). Color value will first be matched to theme object before parsing.
 * See also color.tests.ts for more examples.
 *
 * @example Parseable strings:
 * 'red' // From theme, if 'red' is available
 * 'red-100' // From theme, plus scale
 * 'red-100/20' // From theme, plus scale/opacity
 * '[rgb(100 2 3)]/[var(--op)]' // Bracket with rgb color and bracket with opacity
 *
 * @param body - Color string to be parsed.
 * @param theme - {@link Theme} object.
 * @return object if string is parseable.
 */
declare function parseColor(body: string, theme: Theme, key?: ThemeColorKeys): ParsedColorValue | undefined;
/**
 * Provide {@link DynamicMatcher} function to produce color value matched from rule.
 *
 * @see {@link parseColor}
 *
 * @example Resolving 'red' from theme:
 * colorResolver('background-color', 'background')('', 'red')
 * return { 'background-color': '#f12' }
 *
 * @example Resolving 'red-100' from theme:
 * colorResolver('background-color', 'background')('', 'red-100')
 * return { '--un-background-opacity': '1', 'background-color': 'rgb(254 226 226 / var(--un-background-opacity))' }
 *
 * @example Resolving 'red-100/20' from theme:
 * colorResolver('background-color', 'background')('', 'red-100/20')
 * return { 'background-color': 'rgb(204 251 241 / 0.22)' }
 *
 * @example Resolving 'hex-124':
 * colorResolver('color', 'text')('', 'hex-124')
 * return { '--un-text-opacity': '1', 'color': 'rgb(17 34 68 / var(--un-text-opacity))' }
 *
 * @param property - Property for the css value to be created.
 * @param varName - Base name for the opacity variable.
 * @param [key] - Theme key to select the color from.
 * @param [shouldPass] - Function to decide whether to pass the css.
 * @return object.
 */
declare function colorResolver(property: string, varName: string, key?: ThemeColorKeys, shouldPass?: (css: CSSObject) => boolean): DynamicMatcher;
declare function colorableShadows(shadows: string | string[], colorVar: string): string[];
declare function hasParseableColor(color: string | undefined, theme: Theme, key: ThemeColorKeys): boolean;
declare function resolveBreakpoints({ theme, generator }: Readonly<VariantContext<Theme>>, key?: 'breakpoints' | 'verticalBreakpoints'): {
    point: string;
    size: string;
}[] | undefined;
declare function resolveVerticalBreakpoints(context: Readonly<VariantContext<Theme>>): {
    point: string;
    size: string;
}[] | undefined;
declare function makeGlobalStaticRules(prefix: string, property?: string): StaticRule[];
declare function isCSSMathFn(value: string | undefined): boolean;
declare function isSize(str: string): boolean;
declare function transformXYZ(d: string, v: string, name: string): [string, string][];

export { CONTROL_MINI_NO_NEGATIVE as C, colorableShadows as a, resolveVerticalBreakpoints as b, colorResolver as c, directionSize as d, isSize as e, hasParseableColor as h, isCSSMathFn as i, makeGlobalStaticRules as m, parseColor as p, resolveBreakpoints as r, splitShorthand as s, transformXYZ as t };
