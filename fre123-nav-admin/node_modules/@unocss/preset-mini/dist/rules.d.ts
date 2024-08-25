import { Rule, CSSEntries, StaticRule } from '@unocss/core';
import { T as Theme } from './shared/preset-mini.P5Rzuhf5.js';

declare const verticalAligns: Rule[];
declare const textAligns: Rule[];

declare const outline: Rule<Theme>[];
declare const appearance: Rule[];
declare const willChange: Rule[];

declare const borderStyles: string[];
declare const borders: Rule[];
declare function handlerBorderStyle([, a, s]: string[]): CSSEntries | undefined;

/**
 * @example op10 op-30 opacity-100
 */
declare const opacity: Rule[];
declare const bgColors: Rule[];
declare const colorScheme: Rule[];

declare const containerParent: Rule[];

declare const textDecorations: Rule<Theme>[];

declare const rules: Rule<Theme>[];

declare const flex: Rule<Theme>[];

declare const gaps: Rule[];

declare const grids: Rule<Theme>[];

declare const overflows: Rule[];

declare const positions: Rule[];
declare const justifies: StaticRule[];
declare const orders: Rule[];
declare const alignments: StaticRule[];
declare const placements: StaticRule[];
/**
 * This is to add `flex-` and `grid-` prefix to the alignment rules,
 * supporting `flex="~ items-center"` in attributify mode.
 */
declare const flexGridJustifiesAlignments: StaticRule[];
declare const insets: Rule[];
declare const floats: Rule[];
declare const zIndexes: Rule[];
declare const boxSizing: Rule[];

/**
 * Used for debugging, only available in development mode.
 *
 * @example `?` / `where`
 */
declare const questionMark: Rule[];

declare const ringBase: {
    '--un-ring-inset': string;
    '--un-ring-offset-width': string;
    '--un-ring-offset-color': string;
    '--un-ring-width': string;
    '--un-ring-color': string;
    '--un-shadow': string;
};
declare const rings: Rule<Theme>[];

declare const boxShadowsBase: {
    '--un-ring-offset-shadow': string;
    '--un-ring-shadow': string;
    '--un-shadow-inset': string;
    '--un-shadow': string;
};
declare const boxShadows: Rule<Theme>[];

declare const sizes: Rule<Theme>[];
declare const aspectRatio: Rule[];

declare const paddings: Rule[];
declare const margins: Rule[];

declare const varEmpty = " ";
declare const displays: Rule[];
declare const appearances: Rule[];
declare const cursors: Rule[];
declare const contains: Rule[];
declare const pointerEvents: Rule[];
declare const resizes: Rule[];
declare const userSelects: Rule[];
declare const whitespaces: Rule[];
declare const contentVisibility: Rule[];
declare const contents: Rule[];
declare const breaks: Rule[];
declare const textWraps: Rule[];
declare const textOverflows: Rule[];
declare const textTransforms: Rule[];
declare const fontStyles: Rule[];
declare const fontSmoothings: Rule[];

declare const svgUtilities: Rule<Theme>[];

declare const transformBase: {
    '--un-rotate': number;
    '--un-rotate-x': number;
    '--un-rotate-y': number;
    '--un-rotate-z': number;
    '--un-scale-x': number;
    '--un-scale-y': number;
    '--un-scale-z': number;
    '--un-skew-x': number;
    '--un-skew-y': number;
    '--un-translate-x': number;
    '--un-translate-y': number;
    '--un-translate-z': number;
};
declare const transforms: Rule[];

declare const transitions: Rule<Theme>[];

declare const fonts: Rule<Theme>[];
declare const tabSizes: Rule<Theme>[];
declare const textIndents: Rule<Theme>[];
declare const textStrokes: Rule<Theme>[];
declare const textShadows: Rule<Theme>[];

declare const cssVariables: Rule[];
declare const cssProperty: Rule[];

export { alignments, appearance, appearances, aspectRatio, bgColors, borderStyles, borders, boxShadows, boxShadowsBase, boxSizing, breaks, colorScheme, containerParent, contains, contentVisibility, contents, cssProperty, cssVariables, cursors, displays, flex, flexGridJustifiesAlignments, floats, fontSmoothings, fontStyles, fonts, gaps, grids, handlerBorderStyle, insets, justifies, margins, opacity, orders, outline, overflows, paddings, placements, pointerEvents, positions, questionMark, resizes, ringBase, rings, rules, sizes, svgUtilities, tabSizes, textAligns, textDecorations, textIndents, textOverflows, textShadows, textStrokes, textTransforms, textWraps, transformBase, transforms, transitions, userSelects, varEmpty, verticalAligns, whitespaces, willChange, zIndexes };
