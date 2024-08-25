import * as SourceMaps from '@volar/source-map';
import * as CompilerDOM from '@vue/compiler-dom';
import { TsMappingData } from '../types';
export declare const transformContext: CompilerDOM.TransformContext;
export declare function generate(sourceLang: 'html' | 'pug', templateAst: CompilerDOM.RootNode, isVue2: boolean, cssScopedClasses: string[] | undefined, htmlToTemplate: (htmlStart: number, htmlEnd: number) => number | undefined, isScriptSetup: boolean, searchTexts: {
    getEmitCompletion(tag: string): string;
    getPropsCompletion(tag: string): string;
}): {
    codeGen: {
        getText: () => string;
        getMappings: (sourceRangeParser?: ((data: TsMappingData, range: SourceMaps.Range) => SourceMaps.Range) | undefined) => SourceMaps.Mapping<TsMappingData>[];
        addText: (str: string) => {
            start: number;
            end: number;
        };
        addCode: (str: string, sourceRange: SourceMaps.Range, mode: SourceMaps.Mode, data: TsMappingData, extraSourceRanges?: SourceMaps.Range[] | undefined) => {
            start: number;
            end: number;
        };
        addMapping: (str: string, sourceRange: SourceMaps.Range, mode: SourceMaps.Mode, data: TsMappingData) => {
            start: number;
            end: number;
        };
        addMapping2: (mapping: SourceMaps.Mapping<TsMappingData>) => void;
    };
    formatCodeGen: {
        getText: () => string;
        getMappings: (sourceRangeParser?: ((data: TsMappingData, range: SourceMaps.Range) => SourceMaps.Range) | undefined) => SourceMaps.Mapping<TsMappingData>[];
        addText: (str: string) => {
            start: number;
            end: number;
        };
        addCode: (str: string, sourceRange: SourceMaps.Range, mode: SourceMaps.Mode, data: TsMappingData, extraSourceRanges?: SourceMaps.Range[] | undefined) => {
            start: number;
            end: number;
        };
        addMapping: (str: string, sourceRange: SourceMaps.Range, mode: SourceMaps.Mode, data: TsMappingData) => {
            start: number;
            end: number;
        };
        addMapping2: (mapping: SourceMaps.Mapping<TsMappingData>) => void;
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
};
export declare function getPatchForSlotNode(node: CompilerDOM.ElementNode): CompilerDOM.ForNode | undefined;
