export declare function uniq<T>(array: T[]): T[];
export declare function castArray<T>(value: T): unknown[];
export declare function isUsableColor(color: string, values: string | {
    [key: string]: string;
}): boolean;
export declare const round: (num: number) => string;
export declare const rem: (px: number) => string;
export declare const em: (px: number, base: number) => string;
