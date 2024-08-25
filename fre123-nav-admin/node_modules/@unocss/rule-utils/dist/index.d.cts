import { RGBAColorValue, CSSColorValue, VariantHandlerContext, VariantObject } from '@unocss/core';

declare function hex2rgba(hex?: string): RGBAColorValue | undefined;
declare function parseCssColor(str?: string): CSSColorValue | undefined;
declare function colorOpacityToString(color: CSSColorValue): string | number;
declare function colorToString(color: CSSColorValue | string, alphaOverride?: string | number): string;

declare function getBracket(str: string, open: string, close: string): string[] | undefined;
declare function getStringComponent(str: string, open: string, close: string, separators: string | string[]): string[] | undefined;
declare function getStringComponents(str: string, separators: string | string[], limit?: number): string[] | undefined;

type ValueHandlerCallback = (str: string) => string | number | undefined;
type ValueHandler<K extends string> = {
    [S in K]: ValueHandler<K>;
} & {
    (str: string): string | undefined;
    __options: {
        sequence: K[];
    };
};
declare function createValueHandler<K extends string>(handlers: Record<K, ValueHandlerCallback>): ValueHandler<K>;

declare function variantMatcher(name: string, handler: (input: VariantHandlerContext) => Record<string, any>): VariantObject;
declare function variantParentMatcher(name: string, parent: string): VariantObject;
declare function variantGetBracket(prefix: string, matcher: string, separators: string[]): string[] | undefined;
declare function variantGetParameter(prefix: string, matcher: string, separators: string[]): string[] | undefined;

declare const themeFnRE: RegExp;
declare function hasThemeFn(str: string): boolean;
declare function transformThemeFn(code: string, theme: Record<string, any>, throwOnMissing?: boolean): string;

export { type ValueHandler, type ValueHandlerCallback, colorOpacityToString, colorToString, createValueHandler, getBracket, getStringComponent, getStringComponents, hasThemeFn, hex2rgba, parseCssColor, themeFnRE, transformThemeFn, variantGetBracket, variantGetParameter, variantMatcher, variantParentMatcher };
