import { TextDocument } from 'vscode-languageserver-textdocument';
import type * as ts2 from 'vscode-typescript-languageservice';
import { LanguageServiceContext } from './types';
export declare type SourceFile = ReturnType<typeof createSourceFile>;
export declare function createSourceFile(uri: string, _content: string, _version: string, context: LanguageServiceContext): {
    uri: string;
    getVersion: () => string;
    getTemplateTagNames: () => Record<string, {
        rawComponent: string;
        slotsComponent: string;
        baseProps: string;
        emit: string;
        slots: string;
        events: Record<string, string>;
        offsets: number[];
    }> | undefined;
    getTemplateAttrNames: () => Set<string> | undefined;
    getTextDocument: () => TextDocument;
    getTemplateScriptDocument: () => TextDocument | undefined;
    update: (newContent: string, newVersion: string) => {
        scriptContentUpdated: boolean;
        scriptUpdated: boolean;
        templateScriptUpdated: boolean;
    };
    updateTemplateScript: (templateTsLs: ts2.LanguageService) => boolean;
    getScriptTsDocument: () => TextDocument;
    getScriptTsSourceMap: () => import(".").TsSourceMap;
    getTsSourceMaps: () => import(".").TsSourceMap[];
    getCssSourceMaps: () => import(".").CssSourceMap[];
    getJsonSourceMaps: () => import(".").JsonSourceMap[];
    getHtmlSourceMaps: () => import(".").HtmlSourceMap[];
    getPugSourceMaps: () => import(".").PugSourceMap[];
    getTemplateScriptData: () => {
        projectVersion: string | undefined;
        context: string[];
        contextItems: {
            label: string;
            labelDetails?: {
                detail?: string | undefined;
                description?: string | undefined;
            } | undefined;
            kind?: import("vscode-languageserver-protocol").CompletionItemKind | undefined;
            tags?: 1[] | undefined;
            detail?: string | undefined;
            documentation?: string | {
                kind: import("vscode-languageserver-protocol").MarkupKind;
                value: string;
            } | undefined;
            deprecated?: boolean | undefined;
            preselect?: boolean | undefined;
            sortText?: string | undefined;
            filterText?: string | undefined;
            insertText?: string | undefined;
            insertTextFormat?: import("vscode-languageserver-protocol").InsertTextFormat | undefined;
            insertTextMode?: import("vscode-languageserver-protocol").InsertTextMode | undefined;
            textEdit?: {
                range: {
                    start: {
                        line: number;
                        character: number;
                    };
                    end: {
                        line: number;
                        character: number;
                    };
                };
                newText: string;
            } | {
                newText: string;
                insert: {
                    start: {
                        line: number;
                        character: number;
                    };
                    end: {
                        line: number;
                        character: number;
                    };
                };
                replace: {
                    start: {
                        line: number;
                        character: number;
                    };
                    end: {
                        line: number;
                        character: number;
                    };
                };
            } | undefined;
            additionalTextEdits?: {
                range: {
                    start: {
                        line: number;
                        character: number;
                    };
                    end: {
                        line: number;
                        character: number;
                    };
                };
                newText: string;
            }[] | undefined;
            commitCharacters?: string[] | undefined;
            command?: {
                title: string;
                command: string;
                arguments?: any[] | undefined;
            } | undefined;
            data?: any;
        }[];
        components: string[];
        componentItems: {
            label: string;
            labelDetails?: {
                detail?: string | undefined;
                description?: string | undefined;
            } | undefined;
            kind?: import("vscode-languageserver-protocol").CompletionItemKind | undefined;
            tags?: 1[] | undefined;
            detail?: string | undefined;
            documentation?: string | {
                kind: import("vscode-languageserver-protocol").MarkupKind;
                value: string;
            } | undefined;
            deprecated?: boolean | undefined;
            preselect?: boolean | undefined;
            sortText?: string | undefined;
            filterText?: string | undefined;
            insertText?: string | undefined;
            insertTextFormat?: import("vscode-languageserver-protocol").InsertTextFormat | undefined;
            insertTextMode?: import("vscode-languageserver-protocol").InsertTextMode | undefined;
            textEdit?: {
                range: {
                    start: {
                        line: number;
                        character: number;
                    };
                    end: {
                        line: number;
                        character: number;
                    };
                };
                newText: string;
            } | {
                newText: string;
                insert: {
                    start: {
                        line: number;
                        character: number;
                    };
                    end: {
                        line: number;
                        character: number;
                    };
                };
                replace: {
                    start: {
                        line: number;
                        character: number;
                    };
                    end: {
                        line: number;
                        character: number;
                    };
                };
            } | undefined;
            additionalTextEdits?: {
                range: {
                    start: {
                        line: number;
                        character: number;
                    };
                    end: {
                        line: number;
                        character: number;
                    };
                };
                newText: string;
            }[] | undefined;
            commitCharacters?: string[] | undefined;
            command?: {
                title: string;
                command: string;
                arguments?: any[] | undefined;
            } | undefined;
            data?: any;
        }[];
        props: string[];
        setupReturns: string[];
    };
    getDescriptor: () => {
        template: {
            start: number;
            end: number;
            lang: string;
            content: string;
            startTagEnd: number;
            attrs: {
                [x: string]: string;
            };
        } | null;
        script: {
            start: number;
            end: number;
            lang: string;
            content: string;
            startTagEnd: number;
            attrs: {
                [x: string]: string;
            };
            src: string | undefined;
        } | null;
        scriptSetup: {
            start: number;
            end: number;
            lang: string;
            content: string;
            startTagEnd: number;
            attrs: {
                [x: string]: string;
            };
        } | null;
        styles: {
            start: number;
            end: number;
            lang: string;
            content: string;
            startTagEnd: number;
            attrs: {
                [x: string]: string;
            };
            module: string | undefined;
            scoped: boolean;
        }[];
        customBlocks: {
            start: number;
            end: number;
            lang: string;
            content: string;
            startTagEnd: number;
            attrs: {
                [x: string]: string;
            };
            type: string;
        }[];
    };
    getScriptAst: () => import("typescript/lib/tsserverlibrary").SourceFile | undefined;
    getScriptSetupAst: () => import("typescript/lib/tsserverlibrary").SourceFile | undefined;
    getVueHtmlDocument: () => import("vscode-html-languageservice").HTMLDocument;
    getScriptSetupData: () => {
        bindings: import("packages/vue-code-gen/src/types").TextRange[];
        typeBindings: import("packages/vue-code-gen/src/types").TextRange[];
        withDefaultsArg: import("packages/vue-code-gen/src/types").TextRange | undefined;
        propsRuntimeArg: import("packages/vue-code-gen/src/types").TextRange | undefined;
        propsTypeArg: import("packages/vue-code-gen/src/types").TextRange | undefined;
        emitsRuntimeArg: import("packages/vue-code-gen/src/types").TextRange | undefined;
        emitsTypeArg: import("packages/vue-code-gen/src/types").TextRange | undefined;
        emitsTypeNums: number;
    } | undefined;
    docLsScripts: () => {
        documents: TextDocument[];
        sourceMaps: import(".").TsSourceMap[];
    };
    getTemplateFormattingScript: () => {
        document: TextDocument | undefined;
        sourceMap: import(".").TsSourceMap | undefined;
    };
    getSfcRefSugarRanges: () => {
        refs: {
            flag: import("packages/vue-code-gen/src/types").TextRange;
            leftBindings: import("packages/vue-code-gen/src/types").TextRange[];
            rightFn: import("packages/vue-code-gen/src/types").TextRange;
        }[];
        raws: {
            fullRange: import("packages/vue-code-gen/src/types").TextRange;
            argsRange: import("packages/vue-code-gen/src/types").TextRange;
        }[];
    } | undefined;
    refs: {
        document: import("@vue/reactivity").ComputedRef<TextDocument>;
        descriptor: {
            template: {
                start: number;
                end: number;
                lang: string;
                content: string;
                startTagEnd: number;
                attrs: {
                    [x: string]: string;
                };
            } | null;
            script: {
                start: number;
                end: number;
                lang: string;
                content: string;
                startTagEnd: number;
                attrs: {
                    [x: string]: string;
                };
                src: string | undefined;
            } | null;
            scriptSetup: {
                start: number;
                end: number;
                lang: string;
                content: string;
                startTagEnd: number;
                attrs: {
                    [x: string]: string;
                };
            } | null;
            styles: {
                start: number;
                end: number;
                lang: string;
                content: string;
                startTagEnd: number;
                attrs: {
                    [x: string]: string;
                };
                module: string | undefined;
                scoped: boolean;
            }[];
            customBlocks: {
                start: number;
                end: number;
                lang: string;
                content: string;
                startTagEnd: number;
                attrs: {
                    [x: string]: string;
                };
                type: string;
            }[];
        };
        lastUpdated: {
            template: boolean;
            script: boolean;
            scriptSetup: boolean;
        };
        sfcJsons: {
            textDocuments: import("@vue/reactivity").ComputedRef<{
                index: number;
                textDocument: TextDocument;
                jsonDocument: import("vscode-json-languageservice").JSONDocument;
            }[]>;
            sourceMaps: import("@vue/reactivity").ComputedRef<import(".").JsonSourceMap[]>;
        };
        sfcTemplate: {
            textDocument: import("@vue/reactivity").ComputedRef<TextDocument | undefined>;
            htmlSourceMap: import("@vue/reactivity").ComputedRef<import(".").HtmlSourceMap | undefined>;
            pugSourceMap: import("@vue/reactivity").ComputedRef<import(".").PugSourceMap | undefined>;
            htmlDocument: import("@vue/reactivity").ComputedRef<import("vscode-html-languageservice").HTMLDocument | undefined>;
            pugDocument: import("@vue/reactivity").ComputedRef<{
                pugTextDocument: TextDocument;
                htmlTextDocument: TextDocument;
                htmlDocument: import("vscode-html-languageservice").HTMLDocument;
                pugCode: string;
                htmlCode: string;
                sourceMap: import("@volar/source-map").SourceMap<{
                    isEmptyTagCompletion: boolean;
                } | undefined>;
                error: {
                    code: string;
                    msg: string;
                    line: number;
                    column: number;
                    filename: string;
                } | undefined;
                ast: import("packages/vscode-pug-languageservice/src/pugDocument").Node | undefined;
            } | undefined>;
        };
        sfcTemplateData: import("@vue/reactivity").ComputedRef<{
            sourceLang: 'html' | 'pug';
            html: string;
            htmlTextDocument: TextDocument;
            htmlToTemplate: (start: number, end: number) => number | undefined;
        } | undefined>;
        sfcTemplateCompileResult: import("@vue/reactivity").ComputedRef<{
            ast: import("@vue/compiler-core").RootNode | undefined;
            errors: import("vscode-languageserver-protocol").Diagnostic[];
        } | undefined>;
        sfcTemplateScript: {
            templateCodeGens: import("@vue/reactivity").ComputedRef<{
                codeGen: {
                    getText: () => string;
                    getMappings: (sourceRangeParser?: ((data: import("packages/vue-code-gen/src/types").TsMappingData, range: import("@volar/source-map").Range) => import("@volar/source-map").Range) | undefined) => import("@volar/source-map").Mapping<import("packages/vue-code-gen/src/types").TsMappingData>[];
                    addText: (str: string) => {
                        start: number;
                        end: number;
                    };
                    addCode: (str: string, sourceRange: import("@volar/source-map").Range, mode: import("@volar/source-map").Mode, data: import("packages/vue-code-gen/src/types").TsMappingData, extraSourceRanges?: import("@volar/source-map").Range[] | undefined) => {
                        start: number;
                        end: number;
                    };
                    addMapping: (str: string, sourceRange: import("@volar/source-map").Range, mode: import("@volar/source-map").Mode, data: import("packages/vue-code-gen/src/types").TsMappingData) => {
                        start: number;
                        end: number;
                    };
                    addMapping2: (mapping: import("@volar/source-map").Mapping<import("packages/vue-code-gen/src/types").TsMappingData>) => void;
                };
                formatCodeGen: {
                    getText: () => string;
                    getMappings: (sourceRangeParser?: ((data: import("packages/vue-code-gen/src/types").TsMappingData, range: import("@volar/source-map").Range) => import("@volar/source-map").Range) | undefined) => import("@volar/source-map").Mapping<import("packages/vue-code-gen/src/types").TsMappingData>[];
                    addText: (str: string) => {
                        start: number;
                        end: number;
                    };
                    addCode: (str: string, sourceRange: import("@volar/source-map").Range, mode: import("@volar/source-map").Mode, data: import("packages/vue-code-gen/src/types").TsMappingData, extraSourceRanges?: import("@volar/source-map").Range[] | undefined) => {
                        start: number;
                        end: number;
                    };
                    addMapping: (str: string, sourceRange: import("@volar/source-map").Range, mode: import("@volar/source-map").Mode, data: import("packages/vue-code-gen/src/types").TsMappingData) => {
                        start: number;
                        end: number;
                    };
                    addMapping2: (mapping: import("@volar/source-map").Mapping<import("packages/vue-code-gen/src/types").TsMappingData>) => void;
                };
                cssCodeGen: {
                    getText: () => string;
                    getMappings: (sourceRangeParser?: ((data: undefined, range: import("@volar/source-map").Range) => import("@volar/source-map").Range) | undefined) => import("@volar/source-map").Mapping<undefined>[];
                    addText: (str: string) => {
                        start: number;
                        end: number;
                    };
                    addCode: (str: string, sourceRange: import("@volar/source-map").Range, mode: import("@volar/source-map").Mode, data: undefined, extraSourceRanges?: import("@volar/source-map").Range[] | undefined) => {
                        start: number;
                        end: number;
                    };
                    addMapping: (str: string, sourceRange: import("@volar/source-map").Range, mode: import("@volar/source-map").Mode, data: undefined) => {
                        start: number;
                        end: number;
                    };
                    addMapping2: (mapping: import("@volar/source-map").Mapping<undefined>) => void;
                };
                tagNames: Record<string, {
                    rawComponent: string;
                    slotsComponent: string;
                    baseProps: string;
                    emit: string;
                    slots: string;
                    events: Record<string, string>;
                    offsets: number[];
                }>;
                attrNames: Set<string>;
            } | undefined>;
            sourceMap: import("@vue/reactivity").ComputedRef<import(".").TsSourceMap | undefined>;
            textDocument: import("@vue/reactivity").Ref<TextDocument | undefined>;
            textDocumentForFormatting: import("@vue/reactivity").Ref<TextDocument | undefined>;
            sourceMapForFormatting: import("@vue/reactivity").ComputedRef<import(".").TsSourceMap | undefined>;
            teleportSourceMap: import("@vue/reactivity").Ref<import(".").TeleportSourceMap | undefined>;
            cssTextDocument: import("@vue/reactivity").ComputedRef<{
                textDocument: TextDocument;
                stylesheet: import("vscode-css-languageservice").Stylesheet;
                links: never[];
                module: boolean;
                scoped: boolean;
            } | undefined>;
            cssSourceMap: import("@vue/reactivity").ComputedRef<import(".").CssSourceMap | undefined>;
            update: () => void;
        };
        sfcEntryForTemplateLs: {
            textDocument: import("@vue/reactivity").ComputedRef<TextDocument>;
            sourceMap: import("@vue/reactivity").ComputedRef<import(".").TsSourceMap | undefined>;
        };
        sfcScriptForScriptLs: {
            lang: import("@vue/reactivity").ComputedRef<string>;
            textDocument: import("@vue/reactivity").ComputedRef<TextDocument>;
            textDocumentTs: import("@vue/reactivity").ComputedRef<TextDocument | undefined>;
            sourceMap: import("@vue/reactivity").ComputedRef<import(".").TsSourceMap>;
            teleportSourceMap: import("@vue/reactivity").ComputedRef<import(".").TeleportSourceMap>;
        };
        sfcScriptForTemplateLs: {
            lang: import("@vue/reactivity").ComputedRef<string>;
            textDocument: import("@vue/reactivity").ComputedRef<TextDocument | undefined>;
            textDocumentTs: import("@vue/reactivity").ComputedRef<TextDocument | undefined>;
            sourceMap: import("@vue/reactivity").ComputedRef<import(".").TsSourceMap | undefined>;
            teleportSourceMap: import("@vue/reactivity").ComputedRef<import(".").TeleportSourceMap | undefined>;
        };
        templateScriptData: {
            projectVersion: string | undefined;
            context: string[];
            contextItems: {
                label: string;
                labelDetails?: {
                    detail?: string | undefined;
                    description?: string | undefined;
                } | undefined;
                kind?: import("vscode-languageserver-protocol").CompletionItemKind | undefined;
                tags?: 1[] | undefined;
                detail?: string | undefined;
                documentation?: string | {
                    kind: import("vscode-languageserver-protocol").MarkupKind;
                    value: string;
                } | undefined;
                deprecated?: boolean | undefined;
                preselect?: boolean | undefined;
                sortText?: string | undefined;
                filterText?: string | undefined;
                insertText?: string | undefined;
                insertTextFormat?: import("vscode-languageserver-protocol").InsertTextFormat | undefined;
                insertTextMode?: import("vscode-languageserver-protocol").InsertTextMode | undefined;
                textEdit?: {
                    range: {
                        start: {
                            line: number;
                            character: number;
                        };
                        end: {
                            line: number;
                            character: number;
                        };
                    };
                    newText: string;
                } | {
                    newText: string;
                    insert: {
                        start: {
                            line: number;
                            character: number;
                        };
                        end: {
                            line: number;
                            character: number;
                        };
                    };
                    replace: {
                        start: {
                            line: number;
                            character: number;
                        };
                        end: {
                            line: number;
                            character: number;
                        };
                    };
                } | undefined;
                additionalTextEdits?: {
                    range: {
                        start: {
                            line: number;
                            character: number;
                        };
                        end: {
                            line: number;
                            character: number;
                        };
                    };
                    newText: string;
                }[] | undefined;
                commitCharacters?: string[] | undefined;
                command?: {
                    title: string;
                    command: string;
                    arguments?: any[] | undefined;
                } | undefined;
                data?: any;
            }[];
            components: string[];
            componentItems: {
                label: string;
                labelDetails?: {
                    detail?: string | undefined;
                    description?: string | undefined;
                } | undefined;
                kind?: import("vscode-languageserver-protocol").CompletionItemKind | undefined;
                tags?: 1[] | undefined;
                detail?: string | undefined;
                documentation?: string | {
                    kind: import("vscode-languageserver-protocol").MarkupKind;
                    value: string;
                } | undefined;
                deprecated?: boolean | undefined;
                preselect?: boolean | undefined;
                sortText?: string | undefined;
                filterText?: string | undefined;
                insertText?: string | undefined;
                insertTextFormat?: import("vscode-languageserver-protocol").InsertTextFormat | undefined;
                insertTextMode?: import("vscode-languageserver-protocol").InsertTextMode | undefined;
                textEdit?: {
                    range: {
                        start: {
                            line: number;
                            character: number;
                        };
                        end: {
                            line: number;
                            character: number;
                        };
                    };
                    newText: string;
                } | {
                    newText: string;
                    insert: {
                        start: {
                            line: number;
                            character: number;
                        };
                        end: {
                            line: number;
                            character: number;
                        };
                    };
                    replace: {
                        start: {
                            line: number;
                            character: number;
                        };
                        end: {
                            line: number;
                            character: number;
                        };
                    };
                } | undefined;
                additionalTextEdits?: {
                    range: {
                        start: {
                            line: number;
                            character: number;
                        };
                        end: {
                            line: number;
                            character: number;
                        };
                    };
                    newText: string;
                }[] | undefined;
                commitCharacters?: string[] | undefined;
                command?: {
                    title: string;
                    command: string;
                    arguments?: any[] | undefined;
                } | undefined;
                data?: any;
            }[];
            props: string[];
            setupReturns: string[];
        };
        cssLsDocuments: import("@vue/reactivity").ComputedRef<({
            textDocument: TextDocument;
            stylesheet: import("vscode-css-languageservice").Stylesheet;
            links: never[];
            module: boolean;
            scoped: boolean;
        } | {
            textDocument: TextDocument;
            stylesheet: import("vscode-css-languageservice").Stylesheet | undefined;
            binds: import("packages/vue-code-gen/src/types").TextRange[];
            links: {
                textDocument: TextDocument;
                stylesheet: import("vscode-css-languageservice").Stylesheet;
            }[];
            module: string | undefined;
            scoped: boolean;
        })[]>;
        cssLsSourceMaps: import("@vue/reactivity").ComputedRef<import(".").CssSourceMap[]>;
        scriptLsDocuments: import("@vue/reactivity").ComputedRef<TextDocument[]>;
        scriptLsSourceMaps: import("@vue/reactivity").ComputedRef<import(".").TsSourceMap[]>;
        templateLsDocuments: import("@vue/reactivity").ComputedRef<TextDocument[]>;
        templateLsSourceMaps: import("@vue/reactivity").ComputedRef<import(".").TsSourceMap[]>;
        templateLsTeleports: import("@vue/reactivity").ComputedRef<import(".").TeleportSourceMap[]>;
    };
};
