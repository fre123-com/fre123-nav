import type * as ts from 'typescript/lib/tsserverlibrary';
export declare function getTsCompletions(ts: typeof import('typescript/lib/tsserverlibrary')): {
    StringCompletions: {
        getStringLiteralCompletions: Function;
        getStringLiteralCompletionDetails: Function;
    };
    moduleSpecifierResolutionLimit: 100;
    moduleSpecifierResolutionCacheAttemptLimit: 1000;
    SortText: {
        LocalDeclarationPriority: '10';
        LocationPriority: '11';
        OptionalMember: '12';
        MemberDeclaredBySpreadAssignment: '13';
        SuggestedClassMembers: '14';
        GlobalsOrKeywords: '15';
        AutoImportSuggestions: '16';
        JavascriptIdentifiers: '17';
        DeprecatedLocalDeclarationPriority: '18';
        DeprecatedLocationPriority: '19';
        DeprecatedOptionalMember: '20';
        DeprecatedMemberDeclaredBySpreadAssignment: '21';
        DeprecatedSuggestedClassMembers: '22';
        DeprecatedGlobalsOrKeywords: '23';
        DeprecatedAutoImportSuggestions: '24';
    };
    CompletionSource: {
        ThisProperty: 'ThisProperty/';
    };
    getCompletionsAtPosition: Function;
    getCompletionEntriesFromSymbols: Function;
    getCompletionEntryDetails: Function;
    createCompletionDetailsForSymbol: Function;
    createCompletionDetails: Function;
    getCompletionEntrySymbol: Function;
    CompletionKind: {
        '0': 'ObjectPropertyDeclaration';
        '1': 'Global';
        '2': 'PropertyAccess';
        '3': 'MemberLike';
        '4': 'String';
        '5': 'None';
        ObjectPropertyDeclaration: 0;
        Global: 1;
        PropertyAccess: 2;
        MemberLike: 3;
        String: 4;
        None: 5;
    };
    getPropertiesForObjectExpression: Function;
} | undefined;
export declare function createTsLanguageService(ts: typeof import('typescript/lib/tsserverlibrary'), host: ts.LanguageServiceHost): ts.LanguageService;
export declare function getWorkspaceTypescriptPath(tsdk: string, workspaceFolderFsPaths: string[]): string | undefined;
export declare function getWorkspaceTypescriptLocalizedPath(tsdk: string, lang: string, workspaceFolderFsPaths: string[]): string | undefined;
export declare function findTypescriptModulePathInLib(lib: string): string | undefined;
export declare function findTypescriptLocalizedPathInLib(lib: string, lang: string): string | undefined;
export declare function getVscodeTypescriptPath(appRoot: string): string;
export declare function getVscodeTypescriptLocalizedPath(appRoot: string, lang: string): string | undefined;
export declare function getTypeScriptVersion(serverPath: string): string | undefined;
export declare function createParsedCommandLine(ts: typeof import('typescript/lib/tsserverlibrary'), parseConfigHost: ts.ParseConfigHost, tsConfig: string, extendsSet?: Set<string>): ts.ParsedCommandLine & {
    vueOptions: {
        experimentalCompatMode?: 2 | 3;
        experimentalTemplateCompilerOptions?: any;
        experimentalTemplateCompilerOptionsRequirePath?: string;
    };
};
