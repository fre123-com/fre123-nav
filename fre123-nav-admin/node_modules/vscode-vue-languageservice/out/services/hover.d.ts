import * as vscode from 'vscode-languageserver';
import type { ApiLanguageServiceContext } from '../types';
export declare function register({ sourceFiles, htmlLs, pugLs, getCssLs, getTsLs, vueHost }: ApiLanguageServiceContext): (uri: string, position: vscode.Position) => Promise<vscode.Hover | undefined>;
