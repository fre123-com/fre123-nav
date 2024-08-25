import { TextDocument } from 'vscode-languageserver-textdocument';
import * as shared from '@volar/shared';
import { Ref } from '@vue/reactivity';
import * as SourceMaps from '../utils/sourceMaps';
export declare function useSfcScript(vueUri: string, vueDoc: Ref<TextDocument>, script: Ref<shared.Sfc['scriptSetup']>, ts: typeof import('typescript/lib/tsserverlibrary')): {
    ast: import("@vue/reactivity").ComputedRef<import("typescript/lib/tsserverlibrary").SourceFile | undefined>;
    textDocument: import("@vue/reactivity").ComputedRef<TextDocument | undefined>;
    sourceMap: import("@vue/reactivity").ComputedRef<SourceMaps.TsSourceMap | undefined>;
};
