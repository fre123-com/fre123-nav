import * as shared from '@volar/shared';
import type { parseScriptSetupRanges } from '@volar/vue-code-gen/out/parsers/scriptSetupRanges';
import { Ref } from '@vue/reactivity';
import type * as css from 'vscode-css-languageservice';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { ITemplateScriptData, LanguageServiceContext } from '../types';
import * as SourceMaps from '../utils/sourceMaps';
export declare function useSfcTemplateScript(vueUri: string, vueDoc: Ref<TextDocument>, template: Ref<shared.Sfc['template']>, scriptSetup: Ref<shared.Sfc['scriptSetup']>, scriptSetupRanges: Ref<ReturnType<typeof parseScriptSetupRanges> | undefined>, styles: Ref<shared.Sfc['styles']>, templateScriptData: ITemplateScriptData, styleDocuments: Ref<{
    textDocument: TextDocument;
    stylesheet: css.Stylesheet | undefined;
    links: {
        textDocument: TextDocument;
        stylesheet: css.Stylesheet;
    }[];
    module: string | undefined;
    scoped: boolean;
}[]>, styleSourceMaps: Ref<SourceMaps.CssSourceMap[]>, templateData: Ref<{
    sourceLang: 'html' | 'pug';
    html: string;
    htmlToTemplate: (start: number, end: number) => number | undefined;
} | undefined>, sfcTemplateCompileResult: ReturnType<(typeof import('./useSfcTemplateCompileResult'))['useSfcTemplateCompileResult']>, sfcStyles: ReturnType<(typeof import('./useSfcStyles'))['useSfcStyles']>['textDocuments'], scriptLang: Ref<string>, context: LanguageServiceContext): {
    templateCodeGens: import("@vue/reactivity").ComputedRef<{
        codeGen: {
            getText: () => string;
            getMappings: (sourceRangeParser?: ((data: SourceMaps.TsMappingData, range: SourceMaps.Range) => SourceMaps.Range) | undefined) => SourceMaps.Mapping<SourceMaps.TsMappingData>[];
            addText: (str: string) => {
                start: number;
                end: number;
            };
            addCode: (str: string, sourceRange: SourceMaps.Range, mode: SourceMaps.Mode, data: SourceMaps.TsMappingData, extraSourceRanges?: SourceMaps.Range[] | undefined) => {
                start: number;
                end: number;
            };
            addMapping: (str: string, sourceRange: SourceMaps.Range, mode: SourceMaps.Mode, data: SourceMaps.TsMappingData) => {
                start: number;
                end: number;
            };
            addMapping2: (mapping: SourceMaps.Mapping<SourceMaps.TsMappingData>) => void;
        };
        formatCodeGen: {
            getText: () => string;
            getMappings: (sourceRangeParser?: ((data: SourceMaps.TsMappingData, range: SourceMaps.Range) => SourceMaps.Range) | undefined) => SourceMaps.Mapping<SourceMaps.TsMappingData>[];
            addText: (str: string) => {
                start: number;
                end: number;
            };
            addCode: (str: string, sourceRange: SourceMaps.Range, mode: SourceMaps.Mode, data: SourceMaps.TsMappingData, extraSourceRanges?: SourceMaps.Range[] | undefined) => {
                start: number;
                end: number;
            };
            addMapping: (str: string, sourceRange: SourceMaps.Range, mode: SourceMaps.Mode, data: SourceMaps.TsMappingData) => {
                start: number;
                end: number;
            };
            addMapping2: (mapping: SourceMaps.Mapping<SourceMaps.TsMappingData>) => void;
        };
        cssCodeGen: {
            getText: () => string;
            getMappings: (sourceRangeParser?: ((data: undefined, range: SourceMaps.Range) => SourceMaps.Range) | undefined) => SourceMaps.Mapping<undefined>[];
            addText: (str: string) => {
                start: number;
                end: number;
            };
            addCode: (str: string, sourceRange: SourceMaps.Range, mode: SourceMaps.Mode, data: undefined, extraSourceRanges?: SourceMaps.Range[] | undefined) => {
                start: number;
                end: number;
            };
            addMapping: (str: string, sourceRange: SourceMaps.Range, mode: SourceMaps.Mode, data: undefined) => {
                start: number;
                end: number;
            };
            addMapping2: (mapping: SourceMaps.Mapping<undefined>) => void;
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
    sourceMap: import("@vue/reactivity").ComputedRef<SourceMaps.TsSourceMap | undefined>;
    textDocument: Ref<css.TextDocument | undefined>;
    textDocumentForFormatting: Ref<css.TextDocument | undefined>;
    sourceMapForFormatting: import("@vue/reactivity").ComputedRef<SourceMaps.TsSourceMap | undefined>;
    teleportSourceMap: Ref<SourceMaps.TeleportSourceMap | undefined>;
    cssTextDocument: import("@vue/reactivity").ComputedRef<{
        textDocument: css.TextDocument;
        stylesheet: css.Stylesheet;
        links: never[];
        module: boolean;
        scoped: boolean;
    } | undefined>;
    cssSourceMap: import("@vue/reactivity").ComputedRef<SourceMaps.CssSourceMap | undefined>;
    update: () => void;
};
