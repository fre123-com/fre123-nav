import { TextDocument } from 'vscode-languageserver-textdocument';
import { Ref } from '@vue/reactivity';
import * as SourceMaps from '../utils/sourceMaps';
import * as shared from '@volar/shared';
export declare function useSfcEntryForTemplateLs(vueUri: string, vueDoc: Ref<TextDocument>, script: Ref<shared.Sfc['script']>, scriptSetup: Ref<shared.Sfc['scriptSetup']>, template: Ref<shared.Sfc['template']>, hasTsDoc: Ref<boolean>, isVue2: boolean): {
    textDocument: import("@vue/reactivity").ComputedRef<TextDocument>;
    sourceMap: import("@vue/reactivity").ComputedRef<SourceMaps.TsSourceMap | undefined>;
};
