import type * as vscode from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import type * as ts from 'typescript/lib/tsserverlibrary';
import { ApiLanguageServiceContext, Modules, VueCompilerOptions } from './types';
import * as formatting from './services/formatting';
import * as emmet from '@vscode/emmet-helper';
import * as css from 'vscode-css-languageservice';
import * as html from 'vscode-html-languageservice';
import * as json from 'vscode-json-languageservice';
import * as ts2 from 'vscode-typescript-languageservice';
export declare type DocumentLanguageService = ReturnType<typeof getDocumentLanguageService>;
export declare type LanguageService = ReturnType<typeof createLanguageService>;
export declare type LanguageServiceHost = ts2.LanguageServiceHost & {
    getVueCompilationSettings?(): VueCompilerOptions;
    getVueProjectVersion?(): string;
    createTsLanguageService?(host: ts.LanguageServiceHost): ts.LanguageService;
    getEmmetConfig?(syntax: string): Promise<emmet.VSCodeEmmetConfig>;
    schemaRequestService?: json.SchemaRequestService;
    getCssLanguageSettings?(document: TextDocument): Promise<css.LanguageSettings>;
    getHtmlHoverSettings?(document: TextDocument): Promise<html.HoverSettings>;
};
export declare function getDocumentLanguageService(modules: {
    typescript: Modules['typescript'];
}, getPreferences: LanguageServiceHost['getPreferences'], getFormatOptions: LanguageServiceHost['getFormatOptions'], formatters: Parameters<typeof formatting['register']>[3]): {
    doFormatting: (document: TextDocument, options: vscode.FormattingOptions) => Promise<vscode.TextEdit[] | undefined>;
    getFoldingRanges: (document: TextDocument) => vscode.FoldingRange[];
    getSelectionRanges: (document: TextDocument, positions: vscode.Position[]) => vscode.SelectionRange[];
    doTagComplete: (document: TextDocument, position: vscode.Position) => string | null | undefined;
    findLinkedEditingRanges: (document: TextDocument, position: vscode.Position) => vscode.LinkedEditingRanges | null;
    findDocumentSymbols: (document: TextDocument) => vscode.SymbolInformation[];
    findDocumentColors: (document: TextDocument) => vscode.ColorInformation[] | undefined;
    getColorPresentations: (document: TextDocument, color: vscode.Color, range: vscode.Range) => vscode.ColorPresentation[] | undefined;
};
export declare function createLanguageService(modules: {
    typescript: Modules['typescript'];
}, vueHost: LanguageServiceHost, isTsPlugin?: boolean): {
    doValidation: (uri: string, response?: ((result: vscode.Diagnostic[]) => void) | undefined, isCancel?: (() => Promise<boolean>) | undefined) => Promise<Promise<vscode.Diagnostic[] | undefined>>;
    findDefinition: (uri: string, position: vscode.Position) => Promise<vscode.LocationLink[] | vscode.Location[]>;
    findReferences: (uri: string, position: vscode.Position) => Promise<vscode.Location[]>;
    findTypeDefinition: (uri: string, position: vscode.Position) => Promise<vscode.LocationLink[]>;
    callHierarchy: {
        doPrepare: (uri: string, position: vscode.Position) => Promise<vscode.CallHierarchyItem[]>;
        getIncomingCalls: (item: vscode.CallHierarchyItem) => Promise<vscode.CallHierarchyIncomingCall[]>;
        getOutgoingCalls: (item: vscode.CallHierarchyItem) => Promise<vscode.CallHierarchyOutgoingCall[]>;
    };
    prepareRename: (uri: string, position: vscode.Position) => Promise<vscode.Range | vscode.ResponseError<void> | undefined>;
    doRename: (uri: string, position: vscode.Position, newName: string) => Promise<Promise<vscode.WorkspaceEdit | undefined>>;
    getEditsForFileRename: (oldUri: string, newUri: string) => Promise<Promise<vscode.WorkspaceEdit | undefined>>;
    getSemanticTokens: (uri: string, range?: vscode.Range | undefined, cancle?: vscode.CancellationToken | undefined, resultProgress?: vscode.ResultProgressReporter<vscode.SemanticTokensPartialResult> | undefined) => Promise<vscode.SemanticTokens | undefined>;
    doHover: (uri: string, position: vscode.Position) => Promise<Promise<vscode.Hover | undefined>>;
    doComplete: (uri: string, position: vscode.Position, context?: vscode.CompletionContext | undefined, isEnabledComponentAutoImport?: (() => Promise<boolean>) | undefined, getNameCases?: ((uri: string) => Promise<{
        tagNameCase: "both" | "kebabCase" | "pascalCase";
        attrNameCase: "kebabCase" | "camelCase";
    }>) | undefined) => Promise<Promise<css.CompletionList | undefined>>;
    getCodeActions: (uri: string, range: vscode.Range, context: vscode.CodeActionContext) => Promise<Promise<vscode.CodeAction[]>>;
    doCodeActionResolve: (codeAction: css.CodeAction) => Promise<Promise<css.CodeAction>>;
    doCompletionResolve: (item: vscode.CompletionItem, newPosition?: vscode.Position | undefined) => Promise<Promise<vscode.CompletionItem>>;
    doCodeLensResolve: (codeLens: vscode.CodeLens, canShowReferences?: boolean | undefined) => Promise<vscode.CodeLens>;
    getSignatureHelp: (uri: string, position: vscode.Position, context?: vscode.SignatureHelpContext | undefined) => Promise<vscode.SignatureHelp | undefined>;
    getCodeLens: (uri: string, options?: {
        references: boolean;
        pugTool: boolean;
        scriptSetupTool: boolean;
    } | undefined) => Promise<vscode.CodeLens[] | undefined>;
    findDocumentHighlights: (uri: string, position: vscode.Position) => Promise<vscode.DocumentHighlight[] | undefined>;
    findDocumentLinks: (uri: string) => Promise<Promise<vscode.DocumentLink[] | undefined>>;
    findWorkspaceSymbols: (query: string) => Promise<vscode.SymbolInformation[]>;
    dispose: () => void;
    updateHtmlCustomData: (customData: {
        [id: string]: html.HTMLDataV1;
    }) => void;
    updateCssCustomData: (customData: css.CSSDataV1[]) => void;
    __internal__: {
        rootPath: string;
        readonly tsPlugin: Partial<ts.LanguageService>;
        readonly tsProgramProxy: ts.Program;
        context: ApiLanguageServiceContext;
        onInitProgress(cb: (p: number) => void): void;
        getLocalTypesFiles: (lsType: 'script' | 'template') => {
            fileNames: string[];
            code: string;
        };
        getContext: () => Promise<ApiLanguageServiceContext>;
        getD3: (document: TextDocument) => Promise<Promise<string>>;
        executeCommand: (uri: string, command: string, args: any[] | undefined, connection: vscode.Connection) => Promise<Promise<void>>;
        detectTagNameCase: (uri: string) => Promise<{
            tag: "both" | "kebabCase" | "pascalCase" | "unsure";
            attr: "kebabCase" | "camelCase" | "unsure";
        }>;
        doRefAutoClose: (document: TextDocument, position: vscode.Position) => Promise<string | null | undefined>;
    };
};
