import * as SourceMap from '@volar/source-map';
import type * as html from 'vscode-html-languageservice';
import { TextDocument } from 'vscode-languageserver-textdocument';
export declare type PugDocument = ReturnType<typeof parsePugDocument>;
export declare function parsePugDocument(pugTextDoc: TextDocument, htmlLs: html.LanguageService): {
    pugTextDocument: html.TextDocument;
    htmlTextDocument: html.TextDocument;
    htmlDocument: html.HTMLDocument;
    pugCode: string;
    htmlCode: string;
    sourceMap: SourceMap.SourceMap<{
        isEmptyTagCompletion: boolean;
    } | undefined>;
    error: {
        code: string;
        msg: string;
        line: number;
        column: number;
        filename: string;
    } | undefined;
    ast: Node | undefined;
};
export declare type Node = BlockNode | TagNode | TextNode | CommentNode | BlockCommentNode;
export declare type BlockNode = {
    type: 'Block';
    nodes: Node[];
    line: number;
};
export declare type TagNode = {
    type: 'Tag';
    name: string;
    selfClosing: boolean;
    block: BlockNode;
    attrs: {
        name: string;
        val: string | true;
        line: number;
        column: number;
        mustEscape: boolean;
    }[];
    attributeBlocks: {}[];
    isInline: boolean;
    line: number;
    column: number;
};
export declare type TextNode = {
    type: 'Text';
    val: string;
    line: number;
    column: number;
};
export declare type CommentNode = {
    type: 'Comment';
    val: string;
    buffer: boolean;
    line: number;
    column: number;
};
export declare type BlockCommentNode = {
    type: 'BlockComment';
    block: BlockNode;
    val: string;
    buffer: boolean;
    line: number;
    column: number;
};
