import { MagicStringBase, generateTransform, MagicString } from 'magic-string-ast';
export * from 'magic-string-ast';
export * from 'ast-kit';
import * as t from '@babel/types';
import { Program, Node } from '@babel/types';
import { FilterPattern } from '@rollup/pluginutils';
export { createFilter as createRollupFilter, normalizePath } from '@rollup/pluginutils';
import { ResolvedOptions } from '@vitejs/plugin-vue';
import { Plugin } from 'rollup';
import { Plugin as Plugin$1 } from 'vite';
import { SFCScriptBlock as SFCScriptBlock$1, SFCDescriptor, SFCParseResult } from '@vue/compiler-sfc';

declare function checkInvalidScopeReference(node: t.Node | undefined, method: string, setupBindings: string[]): void;
declare function isStaticExpression(node: t.Node, options?: Partial<Record<'object' | 'fn' | 'objectMethod' | 'array' | 'unary' | 'regex', boolean> & {
    magicComment?: string;
}>): boolean;
declare function isStaticObjectKey(node: t.ObjectExpression): boolean;
/**
 * @param node must be a static expression, SpreadElement is not supported
 */
declare function resolveObjectExpression(node: t.ObjectExpression): Record<string | number, t.ObjectMethod | t.ObjectProperty> | undefined;
declare const HELPER_PREFIX = "__MACROS_";
declare function importHelperFn(s: MagicStringBase, offset: number, local: string, from?: string, isDefault?: boolean): string;

declare const DEFINE_PROPS = "defineProps";
declare const DEFINE_PROPS_DOLLAR = "$defineProps";
declare const DEFINE_PROPS_REFS = "definePropsRefs";
declare const DEFINE_EMITS = "defineEmits";
declare const WITH_DEFAULTS = "withDefaults";
declare const DEFINE_OPTIONS = "defineOptions";
declare const DEFINE_MODELS = "defineModels";
declare const DEFINE_MODELS_DOLLAR = "$defineModels";
declare const DEFINE_SETUP_COMPONENT = "defineSetupComponent";
declare const DEFINE_RENDER = "defineRender";
declare const DEFINE_SLOTS = "defineSlots";
declare const DEFINE_PROP = "defineProp";
declare const DEFINE_EMIT = "defineEmit";
declare const REPO_ISSUE_URL = "https://github.com/vue-macros/vue-macros/issues";
declare const REGEX_SRC_FILE: RegExp;
declare const REGEX_SETUP_SFC: RegExp;
declare const REGEX_SETUP_SFC_SUB: RegExp;
declare const REGEX_VUE_SFC: RegExp;
/** webpack only */
declare const REGEX_VUE_SUB: RegExp;
/** webpack only */
declare const REGEX_VUE_SUB_SETUP: RegExp;
declare const REGEX_NODE_MODULES: RegExp;
declare const REGEX_SUPPORTED_EXT: RegExp;
declare const VIRTUAL_ID_PREFIX = "/vue-macros";

declare function detectVueVersion(root?: string): number;

type MarkRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
type RecordToUnion<T extends Record<string, any>> = T[keyof T];
type UnionToIntersection<U> = (U extends unknown ? (arg: U) => 0 : never) extends (arg: infer I) => 0 ? I : never;

/** @deprecated use `generateTransform` instead */
declare const getTransformResult: typeof generateTransform;
interface BaseOptions {
    include?: FilterPattern;
    exclude?: FilterPattern;
    version?: number;
}
declare function createFilter(options: BaseOptions): (id: unknown) => boolean;

interface VuePluginApi {
    options: ResolvedOptions;
    version: string;
}
declare function getVuePluginApi(plugins: Readonly<(Plugin | Plugin$1)[]> | undefined): VuePluginApi | null;
declare enum FilterFileType {
    /** Vue SFC */
    VUE_SFC = 0,
    /** Vue SFC with `<script setup>` */
    VUE_SFC_WITH_SETUP = 1,
    /** foo.setup.tsx */
    SETUP_SFC = 2,
    /** Source files */
    SRC_FILE = 3
}
declare function getFilterPattern(types: FilterFileType[], framework?: string): RegExp[];

type SFCScriptBlock = Omit<SFCScriptBlock$1, 'scriptAst' | 'scriptSetupAst'>;
type SFC = Omit<SFCDescriptor, 'script' | 'scriptSetup'> & {
    sfc: SFCParseResult;
    script?: SFCScriptBlock | null;
    scriptSetup?: SFCScriptBlock | null;
    lang: string | undefined;
    getScriptAst(): Program | undefined;
    getSetupAst(): Program | undefined;
    offset: number;
} & Pick<SFCParseResult, 'errors'>;
declare function parseSFC(code: string, id: string): SFC;
declare function getFileCodeAndLang(code: string, id: string): {
    code: string;
    lang: string;
};
declare function addNormalScript({ script, lang }: SFC, s: MagicStringBase): {
    start(): number;
    end(): void;
};
declare function removeMacroImport(node: Node, s: MagicString, offset: number): true | undefined;

export { type BaseOptions, DEFINE_EMIT, DEFINE_EMITS, DEFINE_MODELS, DEFINE_MODELS_DOLLAR, DEFINE_OPTIONS, DEFINE_PROP, DEFINE_PROPS, DEFINE_PROPS_DOLLAR, DEFINE_PROPS_REFS, DEFINE_RENDER, DEFINE_SETUP_COMPONENT, DEFINE_SLOTS, FilterFileType, HELPER_PREFIX, type MarkRequired, type Overwrite, REGEX_NODE_MODULES, REGEX_SETUP_SFC, REGEX_SETUP_SFC_SUB, REGEX_SRC_FILE, REGEX_SUPPORTED_EXT, REGEX_VUE_SFC, REGEX_VUE_SUB, REGEX_VUE_SUB_SETUP, REPO_ISSUE_URL, type RecordToUnion, type SFC, type SFCScriptBlock, type UnionToIntersection, VIRTUAL_ID_PREFIX, type VuePluginApi, WITH_DEFAULTS, addNormalScript, checkInvalidScopeReference, createFilter, detectVueVersion, getFileCodeAndLang, getFilterPattern, getTransformResult, getVuePluginApi, importHelperFn, isStaticExpression, isStaticObjectKey, parseSFC, removeMacroImport, resolveObjectExpression };
