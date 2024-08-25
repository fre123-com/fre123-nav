import { Property, Style } from './style';
import type { FontSize, DarkModeConfig } from '../interfaces';
export declare function isString(value: unknown): value is string;
export declare function negative(scale: {
    [key: string]: string;
}): {
    [key: string]: string;
};
export declare function breakpoints(screens?: {
    [key: string]: string;
}): {
    [key: string]: string;
};
export declare function generateFontSize(font: FontSize): Property[];
export declare function expandDirection(value: string, divide?: boolean): [a: string, b?: string] | undefined;
export declare function generatePlaceholder(selector: string, property: Property | Property[], prefixer?: boolean): Style[];
export declare function toDarkStyle(style: Style, mode: DarkModeConfig): Style;
export declare function toDarkStyle(style: Style[], mode: DarkModeConfig): Style[];
