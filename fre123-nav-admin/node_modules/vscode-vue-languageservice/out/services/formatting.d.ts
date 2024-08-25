import { TextDocument } from 'vscode-languageserver-textdocument';
import * as vscode from 'vscode-languageserver';
import type { LanguageServiceHost } from 'vscode-typescript-languageservice';
import type { HtmlLanguageServiceContext } from '../types';
declare type Promiseable<T> = T | Promise<T>;
export declare function register(context: HtmlLanguageServiceContext, getPreferences: LanguageServiceHost['getPreferences'], getFormatOptions: LanguageServiceHost['getFormatOptions'], formatters: {
    [lang: string]: (document: TextDocument, options: vscode.FormattingOptions) => Promiseable<vscode.TextEdit[]>;
}): (document: TextDocument, options: vscode.FormattingOptions) => Promise<vscode.TextEdit[] | undefined>;
export {};
