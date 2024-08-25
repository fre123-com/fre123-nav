import type * as ts from 'typescript/lib/tsserverlibrary';
import * as vscode from 'vscode-languageserver';
import type { TextDocument } from 'vscode-languageserver-textdocument';
export interface Data {
    uri: string;
    fileName: string;
    offset: number;
    source: string | undefined;
    name: string;
    tsData: any;
}
export declare function getTriggerCharacters(tsVersion: string): string[];
export declare function register(languageService: ts.LanguageService, getTextDocument: (uri: string) => TextDocument | undefined, ts: typeof import('typescript/lib/tsserverlibrary')): (uri: string, position: vscode.Position, options?: ts.GetCompletionsAtPositionOptions | undefined) => vscode.CompletionList | undefined;
export declare function handleKindModifiers(item: vscode.CompletionItem, tsEntry: ts.CompletionEntry | ts.CompletionEntryDetails): void;
