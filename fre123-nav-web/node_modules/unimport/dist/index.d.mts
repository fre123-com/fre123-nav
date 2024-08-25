import { P as Preset, I as Import, B as BuiltinPresetName, a as InlinePreset, T as TypeDeclarationOptions, M as MagicStringResult, U as UnimportOptions, b as Unimport, c as InstallGlobalOptions, S as ScanDirExportsOptions } from './shared/unimport.d0a971e7.mjs';
export { p as Addon, A as AddonsOptions, D as DetectImportResult, g as ImportCommon, q as ImportInjectionResult, f as ImportName, n as InjectImportsOptions, k as InjectionUsageRecord, e as ModuleId, i as PackagePreset, m as PathFromResolver, h as PresetImport, o as Thenable, j as UnimportContext, l as UnimportMeta, d as builtinPresets } from './shared/unimport.d0a971e7.mjs';
import MagicString from 'magic-string';
import { StripLiteralOptions } from 'strip-literal';
export { vueTemplateAddon } from './addons.mjs';

declare function resolvePreset(preset: Preset): Promise<Import[]>;
declare function resolveBuiltinPresets(presets: (BuiltinPresetName | Preset)[]): Promise<Import[]>;

declare function defineUnimportPreset(preset: InlinePreset): InlinePreset;
declare function stringifyImports(imports: Import[], isCJS?: boolean): string;
declare function dedupeImports(imports: Import[], warn: (msg: string) => void): Import[];
declare function toExports(imports: Import[], fileDir?: string, includeType?: boolean): string;
declare function stripFileExtension(path: string): string;
declare function toTypeDeclarationItems(imports: Import[], options?: TypeDeclarationOptions): string[];
declare function toTypeDeclarationFile(imports: Import[], options?: TypeDeclarationOptions): string;
declare function toTypeReExports(imports: Import[], options?: TypeDeclarationOptions): string;
declare function getString(code: string | MagicString): string;
declare function getMagicString(code: string | MagicString): MagicString;
declare function addImportToCode(code: string | MagicString, imports: Import[], isCJS?: boolean, mergeExisting?: boolean, injectAtLast?: boolean, firstOccurrence?: number, onResolved?: (imports: Import[]) => void | Import[], onStringified?: (str: string, imports: Import[]) => void | string): MagicStringResult;
declare function normalizeImports(imports: Import[]): Import[];
declare function resolveIdAbsolute(id: string, parentId?: string): Promise<string>;
/**
 * @deprecated renamed to `stringifyImports`
 */
declare const toImports: typeof stringifyImports;

declare const excludeRE: RegExp[];
declare const importAsRE: RegExp;
declare const separatorRE: RegExp;
/**
 *                                                                             |       |
 *                    destructing   case&ternary    non-call     inheritance   |  id   |
 *                         ↓             ↓             ↓             ↓         |       |
 */
declare const matchRE: RegExp;
declare function stripCommentsAndStrings(code: string, options?: StripLiteralOptions): string;

declare function createUnimport(opts: Partial<UnimportOptions>): Unimport;

declare function installGlobalAutoImports(imports: Import[] | Unimport, options?: InstallGlobalOptions): Promise<any>;

declare function scanFilesFromDir(dir: string | string[], options?: ScanDirExportsOptions): Promise<string[]>;
declare function scanDirExports(dir: string | string[], options?: ScanDirExportsOptions): Promise<Import[]>;
declare function dedupeDtsExports(exports: Import[]): Import[];
declare function scanExports(filepath: string, includeTypes: boolean, seen?: Set<string>): Promise<Import[]>;

const version = "3.7.1";

export { BuiltinPresetName, Import, InlinePreset, InstallGlobalOptions, MagicStringResult, Preset, ScanDirExportsOptions, TypeDeclarationOptions, Unimport, UnimportOptions, addImportToCode, createUnimport, dedupeDtsExports, dedupeImports, defineUnimportPreset, excludeRE, getMagicString, getString, importAsRE, installGlobalAutoImports, matchRE, normalizeImports, resolveBuiltinPresets, resolveIdAbsolute, resolvePreset, scanDirExports, scanExports, scanFilesFromDir, separatorRE, stringifyImports, stripCommentsAndStrings, stripFileExtension, toExports, toImports, toTypeDeclarationFile, toTypeDeclarationItems, toTypeReExports, version };
