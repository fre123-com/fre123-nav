import * as shared from '@volar/shared';
import { Ref } from '@vue/reactivity';
import type * as json from 'vscode-json-languageservice';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { LanguageServiceContext } from '../types';
import * as SourceMaps from '../utils/sourceMaps';
export declare function useSfcJsons(vueUri: string, vueDoc: Ref<TextDocument>, customBlocks: Ref<shared.Sfc['customBlocks']>, context: LanguageServiceContext): {
    textDocuments: import("@vue/reactivity").ComputedRef<{
        index: number;
        textDocument: TextDocument;
        jsonDocument: json.JSONDocument;
    }[]>;
    sourceMaps: import("@vue/reactivity").ComputedRef<SourceMaps.JsonSourceMap[]>;
};
