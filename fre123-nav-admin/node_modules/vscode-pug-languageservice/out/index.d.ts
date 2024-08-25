import type * as html from 'vscode-html-languageservice';
import type { TextDocument } from 'vscode-languageserver-textdocument';
export type { HTMLDocument, DocumentContext, CompletionConfiguration, TokenType, ScannerState, } from 'vscode-html-languageservice';
export { PugDocument } from './pugDocument';
export declare type LanguageService = ReturnType<typeof getLanguageService>;
export declare function getLanguageService(htmlLs: html.LanguageService): {
    parsePugDocument: (doc: TextDocument) => {
        pugTextDocument: html.TextDocument;
        htmlTextDocument: html.TextDocument;
        htmlDocument: html.HTMLDocument;
        pugCode: string;
        htmlCode: string;
        sourceMap: import("@volar/source-map").SourceMap<{
            isEmptyTagCompletion: boolean;
        } | undefined>;
        error: {
            code: string;
            msg: string;
            line: number;
            column: number;
            filename: string;
        } | undefined;
        ast: import("./pugDocument").Node | undefined;
    };
    doComplete: (pugDoc: {
        pugTextDocument: html.TextDocument;
        htmlTextDocument: html.TextDocument;
        htmlDocument: html.HTMLDocument;
        pugCode: string;
        htmlCode: string;
        sourceMap: import("@volar/source-map").SourceMap<{
            isEmptyTagCompletion: boolean;
        } | undefined>;
        error: {
            code: string;
            msg: string;
            line: number;
            column: number;
            filename: string;
        } | undefined;
        ast: import("./pugDocument").Node | undefined;
    }, pos: import("vscode-languageserver-protocol").Position, documentContext: html.DocumentContext, options?: html.CompletionConfiguration | undefined) => Promise<html.CompletionList | undefined>;
    findDocumentHighlights: (pugDoc: {
        pugTextDocument: html.TextDocument;
        htmlTextDocument: html.TextDocument;
        htmlDocument: html.HTMLDocument;
        pugCode: string;
        htmlCode: string;
        sourceMap: import("@volar/source-map").SourceMap<{
            isEmptyTagCompletion: boolean;
        } | undefined>;
        error: {
            code: string;
            msg: string;
            line: number;
            column: number;
            filename: string;
        } | undefined;
        ast: import("./pugDocument").Node | undefined;
    }, pos: import("vscode-languageserver-protocol").Position) => html.DocumentHighlight[] | undefined;
    findDocumentLinks: (pugDoc: {
        pugTextDocument: html.TextDocument;
        htmlTextDocument: html.TextDocument;
        htmlDocument: html.HTMLDocument;
        pugCode: string;
        htmlCode: string;
        sourceMap: import("@volar/source-map").SourceMap<{
            isEmptyTagCompletion: boolean;
        } | undefined>;
        error: {
            code: string;
            msg: string;
            line: number;
            column: number;
            filename: string;
        } | undefined;
        ast: import("./pugDocument").Node | undefined;
    }, docContext: html.DocumentContext) => html.DocumentLink[];
    findDocumentSymbols: (pugDoc: {
        pugTextDocument: html.TextDocument;
        htmlTextDocument: html.TextDocument;
        htmlDocument: html.HTMLDocument;
        pugCode: string;
        htmlCode: string;
        sourceMap: import("@volar/source-map").SourceMap<{
            isEmptyTagCompletion: boolean;
        } | undefined>;
        error: {
            code: string;
            msg: string;
            line: number;
            column: number;
            filename: string;
        } | undefined;
        ast: import("./pugDocument").Node | undefined;
    }) => import("vscode-languageserver-protocol").SymbolInformation[];
    doHover: (docDoc: {
        pugTextDocument: html.TextDocument;
        htmlTextDocument: html.TextDocument;
        htmlDocument: html.HTMLDocument;
        pugCode: string;
        htmlCode: string;
        sourceMap: import("@volar/source-map").SourceMap<{
            isEmptyTagCompletion: boolean;
        } | undefined>;
        error: {
            code: string;
            msg: string;
            line: number;
            column: number;
            filename: string;
        } | undefined;
        ast: import("./pugDocument").Node | undefined;
    }, pos: import("vscode-languageserver-protocol").Position) => import("vscode-languageserver-protocol").Hover | undefined;
    createScanner: (pugDoc: {
        pugTextDocument: html.TextDocument;
        htmlTextDocument: html.TextDocument;
        htmlDocument: html.HTMLDocument;
        pugCode: string;
        htmlCode: string;
        sourceMap: import("@volar/source-map").SourceMap<{
            isEmptyTagCompletion: boolean;
        } | undefined>;
        error: {
            code: string;
            msg: string;
            line: number;
            column: number;
            filename: string;
        } | undefined;
        ast: import("./pugDocument").Node | undefined;
    }, initialOffset?: number) => {
        scan: () => html.TokenType;
        getTokenOffset: () => number;
        getTokenEnd: () => number;
        getTokenText: () => string;
        getTokenLength: () => number;
        getTokenError: () => string | undefined;
        getScannerState: () => html.ScannerState;
    } | undefined;
    getSelectionRanges: (pugDoc: {
        pugTextDocument: html.TextDocument;
        htmlTextDocument: html.TextDocument;
        htmlDocument: html.HTMLDocument;
        pugCode: string;
        htmlCode: string;
        sourceMap: import("@volar/source-map").SourceMap<{
            isEmptyTagCompletion: boolean;
        } | undefined>;
        error: {
            code: string;
            msg: string;
            line: number;
            column: number;
            filename: string;
        } | undefined;
        ast: import("./pugDocument").Node | undefined;
    }, posArr: import("vscode-languageserver-protocol").Position[]) => import("vscode-languageserver-protocol").SelectionRange[];
    getFoldingRanges: (pugDoc: {
        pugTextDocument: html.TextDocument;
        htmlTextDocument: html.TextDocument;
        htmlDocument: html.HTMLDocument;
        pugCode: string;
        htmlCode: string;
        sourceMap: import("@volar/source-map").SourceMap<{
            isEmptyTagCompletion: boolean;
        } | undefined>;
        error: {
            code: string;
            msg: string;
            line: number;
            column: number;
            filename: string;
        } | undefined;
        ast: import("./pugDocument").Node | undefined;
    }) => import("vscode-languageserver-protocol").FoldingRange[];
};
