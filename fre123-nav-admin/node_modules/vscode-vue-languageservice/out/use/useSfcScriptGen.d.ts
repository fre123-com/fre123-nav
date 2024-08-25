import { TextDocument } from 'vscode-languageserver-textdocument';
import * as shared from '@volar/shared';
import { Ref, ComputedRef } from '@vue/reactivity';
import { TsSourceMap, TeleportSourceMap } from '../utils/sourceMaps';
import type { parseScriptRanges } from '@volar/vue-code-gen/out/parsers/scriptRanges';
import type { parseScriptSetupRanges } from '@volar/vue-code-gen/out/parsers/scriptSetupRanges';
export declare function useSfcScriptGen<T extends 'template' | 'script'>(lsType: T, vueUri: string, vueDoc: Ref<TextDocument>, script: Ref<shared.Sfc['script']>, scriptSetup: Ref<shared.Sfc['scriptSetup']>, scriptRanges: Ref<ReturnType<typeof parseScriptRanges> | undefined>, scriptSetupRanges: Ref<ReturnType<typeof parseScriptSetupRanges> | undefined>, sfcTemplateCompileResult: ReturnType<(typeof import('./useSfcTemplateCompileResult'))['useSfcTemplateCompileResult']>, sfcStyles: ReturnType<(typeof import('./useSfcStyles'))['useSfcStyles']>['textDocuments'], isVue2: boolean): {
    lang: ComputedRef<string>;
    textDocument: T extends "script" ? ComputedRef<TextDocument> : ComputedRef<TextDocument | undefined>;
    textDocumentTs: ComputedRef<TextDocument | undefined>;
    sourceMap: T extends "script" ? ComputedRef<TsSourceMap> : ComputedRef<TsSourceMap | undefined>;
    teleportSourceMap: T extends "script" ? ComputedRef<TeleportSourceMap> : ComputedRef<TeleportSourceMap | undefined>;
};
