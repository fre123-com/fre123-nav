import type * as html from 'vscode-html-languageservice';
import * as vscode from 'vscode-languageserver';
import type { ApiLanguageServiceContext } from '../types';
export declare function getTriggerCharacters(tsVersion: string): {
    typescript: string[];
    html: string[];
    css: string[];
    json: string[];
};
export declare const wordPatterns: {
    [lang: string]: RegExp;
};
export declare const vueTags: html.ITagData[];
export declare const eventModifiers: Record<string, string>;
export declare function register({ modules: { html, emmet, typescript: ts }, sourceFiles, getTsLs, htmlLs, pugLs, getCssLs, jsonLs, documentContext, vueHost, templateTsLs, getHtmlDataProviders }: ApiLanguageServiceContext, getScriptContentVersion: () => number): (uri: string, position: vscode.Position, context?: vscode.CompletionContext | undefined, isEnabledComponentAutoImport?: (() => Promise<boolean>) | undefined, getNameCases?: ((uri: string) => Promise<{
    tagNameCase: 'both' | 'kebabCase' | 'pascalCase';
    attrNameCase: 'kebabCase' | 'camelCase';
}>) | undefined) => Promise<html.CompletionList | undefined>;
