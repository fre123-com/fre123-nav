import * as SourceMaps from '@volar/source-map';
import type * as templateGen from '../generators/template_scriptSetup';
import type { ScriptRanges } from '../parsers/scriptRanges';
import type { ScriptSetupRanges } from '../parsers/scriptSetupRanges';
import type { TeleportMappingData, TsMappingData } from '../types';
export declare function generate(lsType: 'template' | 'script', fileName: string, script: undefined | {
    src?: string;
    content: string;
}, scriptSetup: undefined | {
    content: string;
}, scriptRanges: ScriptRanges | undefined, scriptSetupRanges: ScriptSetupRanges | undefined, getHtmlGen: () => ReturnType<typeof templateGen['generate']> | undefined, getStyleBindTexts: () => string[], vueLibName: string): {
    teleports: SourceMaps.Mapping<TeleportMappingData>[];
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
export declare function genConstructorOverloads(name?: string, nums?: number): string;
