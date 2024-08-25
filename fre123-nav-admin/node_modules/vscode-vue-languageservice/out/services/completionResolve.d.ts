import * as vscode from 'vscode-languageserver';
import type { ApiLanguageServiceContext } from '../types';
export declare function register({ modules: { typescript: ts }, sourceFiles, getTsLs, vueHost, scriptTsLs }: ApiLanguageServiceContext): (item: vscode.CompletionItem, newPosition?: vscode.Position | undefined) => Promise<vscode.CompletionItem>;
