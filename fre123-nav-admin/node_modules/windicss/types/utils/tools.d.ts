import type { colorCallback, colorObject } from '../interfaces';
export declare class Console {
    static log(...message: unknown[]): void;
    static error(...message: unknown[]): void;
    static time(label?: string): void;
    static timeEnd(label?: string): void;
}
export declare type Arrayable<T> = T | T[];
export declare function toArray<T>(v: Arrayable<T>): T[];
export declare function hash(str: string): string;
export declare function type(val: unknown): string;
export declare function indent(code: string, tab?: number): string;
export declare function wrapit(code: string, start?: string, end?: string, tab?: number, minify?: boolean): string;
export declare function isNumber(amount: string, start?: number, end?: number, type?: 'int' | 'float'): boolean;
export declare function isFraction(amount: string): boolean;
export declare function isSize(amount: string): boolean;
export declare function isSpace(str: string): boolean;
export declare function roundUp(num: number, precision?: number): number;
export declare function fracToPercent(amount: string): string | undefined;
export declare function hex2RGB(hex: string): number[] | undefined;
export declare function camelToDash(str: string): string;
export declare function dashToCamel(str: string): string;
export declare function getNestedValue(obj: {
    [key: string]: any;
}, key: string): any;
export declare function negateValue(value: string): string;
export declare function searchFrom(text: string, target: string | RegExp, startIndex?: number, endIndex?: number): number;
export declare function connectList<T = string>(a?: T[], b?: T[], append?: boolean): T[];
export declare function toType(value: unknown, type: 'object'): Record<string, unknown>;
export declare function toType(value: unknown, type: 'string'): string | undefined;
export declare function toType(value: unknown, type: 'number'): number | undefined;
export declare function deepCopy<T>(source: T): T;
export declare function isTagName(name: string): boolean;
export declare function flatColors(colors: colorObject, head?: string): {
    [key: string]: string | colorCallback;
};
export declare function testRegexr(text: string, expressions: RegExp[]): boolean;
export declare function searchPropEnd(text: string, startIndex?: number): number;
export declare function searchNotEscape(text: string, chars?: string | string[]): number;
export declare function splitSelectors(selectors: string): string[];
export declare function guessClassName(selector: string): {
    selector: string;
    isClass: boolean;
    pseudo?: string;
} | {
    selector: string;
    isClass: boolean;
    pseudo?: string;
}[];
/**
 * Increase string a value with unit
 *
 * @example '2px' + 1 = '3px'
 * @example '15em' + (-2) = '13em'
 */
export declare function increaseWithUnit(target: number, delta: number): number;
export declare function increaseWithUnit(target: string, delta: number): string;
export declare function increaseWithUnit(target: string | number, delta: number): string | number;
export declare function splitColorGroup(color: string): [string, string | undefined];
