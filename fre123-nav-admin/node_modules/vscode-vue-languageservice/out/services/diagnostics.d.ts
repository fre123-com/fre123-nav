import * as vscode from 'vscode-languageserver';
import type { ApiLanguageServiceContext } from '../types';
export declare function register({ sourceFiles, getCssLs, jsonLs, templateTsLs, scriptTsLs, vueHost, getTextDocument }: ApiLanguageServiceContext, updateTemplateScripts: () => void): (uri: string, response?: ((result: vscode.Diagnostic[]) => void) | undefined, isCancel?: (() => Promise<boolean>) | undefined) => Promise<vscode.Diagnostic[] | undefined>;
