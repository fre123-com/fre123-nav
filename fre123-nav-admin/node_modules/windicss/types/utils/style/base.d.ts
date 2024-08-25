export declare type LayerName = 'base' | 'utilities' | 'components';
declare type Meta = {
    type: LayerName;
    group: string;
    order: number;
    offset: number;
    corePlugin: boolean;
    variants?: string[];
    respectSelector?: boolean;
};
declare type NestObject = {
    [key: string]: string | string[] | NestObject;
};
export declare class Property {
    meta: Meta;
    name: string | string[];
    value?: string;
    comment?: string;
    important?: boolean;
    constructor(name: string | string[], value?: string, comment?: string, important?: boolean);
    private static _singleParse;
    static parse(css: string): Property | InlineAtRule | (Property | InlineAtRule)[] | undefined;
    clone(): Property;
    toStyle(selector?: string): Style;
    build(minify?: boolean): string;
    updateMeta(type: LayerName, group: string, order: number, offset?: number, corePlugin?: boolean): Property;
}
export declare class InlineAtRule extends Property {
    name: string;
    constructor(name: string, value?: string, important?: boolean);
    static parse(css: string): InlineAtRule | undefined;
    build(): string;
}
export declare class Style {
    meta: Meta;
    selector?: string;
    important: boolean;
    property: Property[];
    atRules?: string[];
    private _pseudoClasses?;
    private _pseudoElements?;
    private _parentSelectors?;
    private _childSelectors?;
    private _brotherSelectors?;
    private _wrapProperties?;
    private _wrapSelectors?;
    private _wrapRules?;
    constructor(selector?: string, property?: Property | Property[], important?: boolean);
    get rule(): string;
    get pseudoClasses(): string[] | undefined;
    get pseudoElements(): string[] | undefined;
    get parentSelectors(): string[] | undefined;
    get childSelectors(): string[] | undefined;
    get brotherSelectors(): string[] | undefined;
    get wrapProperties(): ((properties: string) => string)[] | undefined;
    get wrapSelectors(): ((selector: string) => string)[] | undefined;
    get wrapRules(): ((selector: string) => string)[] | undefined;
    get simple(): boolean;
    get isAtrule(): boolean;
    static generate(parent?: string, property?: NestObject, root?: Style): Style[];
    atRule(atrule?: string, append?: boolean): this;
    pseudoClass(string: string): this;
    pseudoElement(string: string): this;
    brother(string: string): this;
    parent(string: string): this;
    child(string: string): this;
    wrapProperty(func: (property: string) => string): this;
    wrapSelector(func: (selector: string) => string): this;
    wrapRule(func: (rule: string) => string): this;
    add(item: Property | Property[]): this;
    extend(item?: Style, onlyProperty?: boolean, append?: boolean): this;
    clean(): this;
    flat(): this;
    clone(selector?: string, property?: Property | Property[]): Style;
    sort(): this;
    build(minify?: boolean, prefixer?: boolean): string;
    updateMeta(type: LayerName, group: string, order: number, offset?: number, corePlugin?: boolean, respectSelector?: boolean): Style;
}
export declare class GlobalStyle extends Style {
    constructor(selector?: string, property?: Property | Property[], important?: boolean);
}
export declare class Keyframes extends Style {
    constructor(selector?: string, property?: Property | Property[], important?: boolean);
    static generate(name: string, children: {
        [key: string]: {
            [key: string]: string;
        };
    }, root?: undefined, prefixer?: boolean): Keyframes[];
}
export declare class Container extends Style {
    constructor(selector?: string, property?: Property | Property[], important?: boolean);
}
export {};
