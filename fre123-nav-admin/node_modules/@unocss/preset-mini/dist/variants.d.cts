import { VariantObject, Variant } from '@unocss/core';
import { PresetMiniOptions } from './index.cjs';
import { T as Theme } from './shared/preset-mini.P5Rzuhf5.cjs';
import './shared/preset-mini.bn9iWcrm.cjs';
import './colors.cjs';
import './shared/preset-mini.BP7cviYW.cjs';

declare const variantAria: VariantObject;

declare function calcMaxWidthBySize(size: string): string;
declare function variantBreakpoints(): VariantObject;

declare const variantCombinators: Variant[];

declare const variantContainerQuery: VariantObject;

declare function variantColorsMediaOrClass(options?: PresetMiniOptions): Variant[];

declare const variantDataAttribute: VariantObject;
declare const variantTaggedDataAttributes: Variant[];

declare function variants(options: PresetMiniOptions): Variant<Theme>[];

declare const variantLanguageDirections: Variant[];

declare function variantImportant(): VariantObject;

declare const variantPrint: VariantObject;
declare const variantCustomMedia: VariantObject;

declare const variantSelector: Variant;
declare const variantCssLayer: Variant;
declare const variantInternalLayer: Variant;
declare const variantScope: Variant;
declare const variantVariables: Variant;
declare const variantTheme: Variant;

declare const variantNegative: Variant;

declare function variantPseudoClassesAndElements(): VariantObject;
declare function variantPseudoClassFunctions(): VariantObject;
declare function variantTaggedPseudoClasses(options?: PresetMiniOptions): VariantObject[];
declare const variantPartClasses: VariantObject;

declare const variantSupports: VariantObject;

export { calcMaxWidthBySize, variantAria, variantBreakpoints, variantColorsMediaOrClass, variantCombinators, variantContainerQuery, variantCssLayer, variantCustomMedia, variantDataAttribute, variantImportant, variantInternalLayer, variantLanguageDirections, variantNegative, variantPartClasses, variantPrint, variantPseudoClassFunctions, variantPseudoClassesAndElements, variantScope, variantSelector, variantSupports, variantTaggedDataAttributes, variantTaggedPseudoClasses, variantTheme, variantVariables, variants };
