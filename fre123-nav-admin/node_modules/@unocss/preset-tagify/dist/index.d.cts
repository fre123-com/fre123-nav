import * as _unocss_core from '@unocss/core';
import { Extractor, VariantObject } from '@unocss/core';

interface TagifyOptions {
    /**
     * The prefix to use for the tagify variant.
     */
    prefix?: string;
    /**
     * Tags excluded from processing.
     * @default ['b', /^h\d+$/, 'table']
     */
    excludedTags?: (string | RegExp)[];
    /**
     * Extra CSS properties to apply to matched rules
     */
    extraProperties?: Record<string, string> | ((matched: string) => Partial<Record<string, string>>);
    /**
     * Enable default extractor
     * @default true
     */
    defaultExtractor?: boolean;
}

declare const MARKER = "__TAGIFY__";
declare const htmlTagRE: RegExp;
declare function extractorTagify(options: TagifyOptions): Extractor;

declare function variantTagify(options: TagifyOptions): VariantObject;

declare const presetTagify: _unocss_core.PresetFactory<object, TagifyOptions>;

export { MARKER, type TagifyOptions, presetTagify as default, extractorTagify, htmlTagRE, presetTagify, variantTagify };
