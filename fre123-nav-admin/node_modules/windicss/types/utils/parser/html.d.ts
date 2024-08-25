export declare type Attr = {
    raw: string;
    key: string;
    value: string | string[];
    start: number;
    end: number;
};
export declare type ClassName = {
    result: string;
    start: number;
    end: number;
};
export default class HTMLParser {
    html?: string;
    constructor(html?: string);
    parseAttrs(): Attr[];
    parseClasses(): ClassName[];
    parseTags(): string[];
}
