import { Property, Style } from '../../utils/style';
import type { colorCallback, colorObject, DictStr, Handlers } from '../../interfaces';
export declare type Handler = {
    utility: Utility;
    value?: string;
    _amount: string;
    opacity?: string | undefined;
    color?: colorCallback;
    handleStatic: (map?: {
        [key: string]: string | string[];
    } | unknown, callback?: (str: string) => string | undefined) => Handler;
    handleBody: (map?: {
        [key: string]: string | string[];
    } | unknown, callback?: (str: string) => string | undefined) => Handler;
    handleNumber: (start?: number, end?: number, type?: 'int' | 'float', callback?: (number: number) => string | undefined) => Handler;
    handleString: (callback: (string: string) => string | undefined) => Handler;
    handleSpacing: () => Handler;
    handleSquareBrackets: (callback?: (number: string) => string | undefined) => Handler;
    handleTime: (start?: number, end?: number, type?: 'int' | 'float', callback?: (milliseconds: number) => string | undefined) => Handler;
    handleColor: (map?: colorObject | unknown) => Handler;
    handleOpacity: (map?: DictStr | unknown) => Handler;
    handleFraction: (callback?: (fraction: string) => string | undefined) => Handler;
    handleNxl: (callback?: (number: number) => string | undefined) => Handler;
    handleSize: (callback?: (size: string) => string | undefined) => Handler;
    handleVariable: (callback?: (variable: string) => string | undefined) => Handler;
    handleNegative: (callback?: (value: string) => string | undefined) => Handler;
    createProperty: (name: string | string[], callback?: (value: string) => string) => Property | undefined;
    createStyle: (selector: string, callback: (value: string) => Property | Property[] | undefined) => Style | undefined;
    createColorValue: (opacityValue?: string | undefined) => string | undefined;
    createColorStyle: (selector: string, property: string | string[], opacityVariable?: string | undefined, wrapRGB?: boolean) => Style | undefined;
    callback: (func: (value: string) => Property | Style | Style[] | undefined) => Property | Style | Style[] | undefined;
};
export declare type HandlerCreator = (utility: Utility, value?: string | undefined, color?: colorCallback | undefined) => Handler;
export declare function createHandler(handlers?: Handlers): HandlerCreator;
export declare class Utility {
    raw: string;
    private _h;
    constructor(raw: string, _h: HandlerCreator);
    match(expression: RegExp): string;
    clone(raw?: string): Utility;
    get class(): string;
    get isNegative(): boolean;
    get absolute(): string;
    get identifier(): string;
    get key(): string;
    get center(): string;
    get amount(): string;
    get body(): string;
    get handler(): Handler;
}
