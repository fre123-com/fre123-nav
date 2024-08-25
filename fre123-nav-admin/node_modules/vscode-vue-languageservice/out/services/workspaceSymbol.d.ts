import * as vscode from 'vscode-languageserver';
import type { ApiLanguageServiceContext } from '../types';
export declare function register(context: ApiLanguageServiceContext): (query: string) => vscode.SymbolInformation[];
