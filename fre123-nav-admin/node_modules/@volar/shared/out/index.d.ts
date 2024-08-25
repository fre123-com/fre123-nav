/// <reference types="node" />
export * from './path';
export * from './requests';
export * from './types';
export * from './uriMap';
export * from './ts';
export * from './http';
export * from './vue';
import type * as vscode from 'vscode-languageserver';
import type { TextDocument } from 'vscode-languageserver-textdocument';
export declare const sleep: typeof import("timers/promises").setTimeout;
export declare function syntaxToLanguageId(syntax: string): string;
export declare function languageIdToSyntax(languageId: string): string;
export declare function notEmpty<T>(value: T | null | undefined): value is T;
export declare function isInsideRange(parent: vscode.Range, child: vscode.Range): boolean;
export declare function getWordRange(wordPattern: RegExp, position: vscode.Position, document: TextDocument): vscode.Range | undefined;
export declare function getOverlapRange(range1: vscode.Range, range2: vscode.Range): vscode.Range | undefined;
export declare function eqSet<T>(as: Set<T>, bs: Set<T>): boolean;
export declare function getDocumentSafely(documents: vscode.TextDocuments<TextDocument>, uri: string): TextDocument | undefined;
