import * as vscode from 'vscode-languageserver';
import type { PugDocument } from '../pugDocument';
export declare function register(): (pugDoc: PugDocument) => vscode.FoldingRange[];
