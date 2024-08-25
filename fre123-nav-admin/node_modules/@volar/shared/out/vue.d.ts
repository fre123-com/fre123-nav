import type * as html from 'vscode-html-languageservice';
export interface SfcBlock {
    start: number;
    end: number;
    lang: string;
    content: string;
    startTagEnd: number;
    attrs: Record<string, string>;
}
export interface Sfc {
    template: SfcBlock | null;
    script: (SfcBlock & {
        src: string | undefined;
    }) | null;
    scriptSetup: SfcBlock | null;
    styles: (SfcBlock & {
        module: string | undefined;
        scoped: boolean;
    })[];
    customBlocks: (SfcBlock & {
        type: string;
    })[];
}
export declare const defaultLanguages: {
    template: string;
    script: string;
    style: string;
};
export declare function parseSfc(text: string, doc: html.HTMLDocument): Sfc;
