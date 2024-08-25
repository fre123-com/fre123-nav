import { Extractor } from '@unocss/core';

declare const quotedArbitraryValuesRE: RegExp;
declare const arbitraryPropertyRE: RegExp;
declare function splitCodeWithArbitraryVariants(code: string): string[];
declare const extractorArbitraryVariants: Extractor;

export { arbitraryPropertyRE, extractorArbitraryVariants as default, extractorArbitraryVariants, quotedArbitraryValuesRE, splitCodeWithArbitraryVariants };
