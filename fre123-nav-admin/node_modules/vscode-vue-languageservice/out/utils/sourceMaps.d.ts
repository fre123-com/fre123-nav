import type * as vscode from 'vscode-languageserver';
import type { TextDocument } from 'vscode-languageserver-textdocument';
import type { HTMLDocument } from 'vscode-html-languageservice';
import type { Stylesheet } from 'vscode-css-languageservice';
import type { PugDocument } from 'vscode-pug-languageservice';
import type { JSONDocument } from 'vscode-json-languageservice';
import * as SourceMaps from '@volar/source-map';
import { TsMappingData, TeleportMappingData, TeleportSideData } from '@volar/vue-code-gen/out/types';
export declare class TsSourceMap extends SourceMaps.SourceMap<TsMappingData> {
    sourceDocument: TextDocument;
    mappedDocument: TextDocument;
    lsType: 'template' | 'script';
    isInterpolation: boolean;
    capabilities: {
        foldingRanges: boolean;
        formatting: boolean;
        documentSymbol: boolean;
        codeActions: boolean;
    };
    constructor(sourceDocument: TextDocument, mappedDocument: TextDocument, lsType: 'template' | 'script', isInterpolation: boolean, capabilities: {
        foldingRanges: boolean;
        formatting: boolean;
        documentSymbol: boolean;
        codeActions: boolean;
    }, mappings?: SourceMaps.Mapping<TsMappingData>[]);
}
export declare class CssSourceMap extends SourceMaps.SourceMap<undefined> {
    sourceDocument: TextDocument;
    mappedDocument: TextDocument;
    stylesheet: Stylesheet | undefined;
    module: string | undefined;
    scoped: boolean;
    links: {
        textDocument: TextDocument;
        stylesheet: Stylesheet;
    }[];
    capabilities: {
        foldingRanges: boolean;
        formatting: boolean;
    };
    constructor(sourceDocument: TextDocument, mappedDocument: TextDocument, stylesheet: Stylesheet | undefined, module: string | undefined, scoped: boolean, links: {
        textDocument: TextDocument;
        stylesheet: Stylesheet;
    }[], capabilities: {
        foldingRanges: boolean;
        formatting: boolean;
    }, mappings?: SourceMaps.Mapping<undefined>[]);
}
export declare class JsonSourceMap extends SourceMaps.SourceMap<undefined> {
    sourceDocument: TextDocument;
    mappedDocument: TextDocument;
    jsonDocument: JSONDocument;
    constructor(sourceDocument: TextDocument, mappedDocument: TextDocument, jsonDocument: JSONDocument, mappings?: SourceMaps.Mapping<undefined>[]);
}
export declare class HtmlSourceMap extends SourceMaps.SourceMap<undefined> {
    sourceDocument: TextDocument;
    mappedDocument: TextDocument;
    htmlDocument: HTMLDocument;
    language: 'html';
    constructor(sourceDocument: TextDocument, mappedDocument: TextDocument, htmlDocument: HTMLDocument, language?: 'html', mappings?: SourceMaps.Mapping<undefined>[]);
}
export declare class PugSourceMap extends SourceMaps.SourceMap<undefined> {
    sourceDocument: TextDocument;
    mappedDocument: TextDocument;
    pugDocument: PugDocument;
    language: 'pug';
    constructor(sourceDocument: TextDocument, mappedDocument: TextDocument, pugDocument: PugDocument, language?: 'pug');
}
export declare class TeleportSourceMap extends SourceMaps.SourceMap<TeleportMappingData> {
    document: TextDocument;
    allowCrossFile: boolean;
    constructor(document: TextDocument, allowCrossFile: boolean);
    findTeleports(start: vscode.Position, end?: vscode.Position, filter?: (data: TeleportSideData) => boolean): Generator<readonly [{
        start: vscode.Position;
        end: vscode.Position;
    }, TeleportSideData], void, unknown>;
    findTeleports2(start: number, end?: number, filter?: (data: TeleportSideData) => boolean): Generator<readonly [{
        start: number;
        end: number;
    }, TeleportSideData], void, unknown>;
}
export * from '@volar/source-map';
export * from '@volar/vue-code-gen/out/types';
