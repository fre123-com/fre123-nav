import { TextDocument } from 'vscode-languageserver-textdocument';
import { Ref } from '@vue/reactivity';
import { LanguageServiceContext } from '../types';
import * as SourceMaps from '../utils/sourceMaps';
import type * as css from 'vscode-css-languageservice';
import * as shared from '@volar/shared';
import { TextRange } from '@volar/vue-code-gen/out/types';
export declare function useSfcStyles(context: LanguageServiceContext, vueUri: string, vueDoc: Ref<TextDocument>, styles: Ref<shared.Sfc['styles']>): {
    textDocuments: import("@vue/reactivity").ComputedRef<{
        textDocument: TextDocument;
        stylesheet: css.Stylesheet | undefined;
        binds: TextRange[];
        links: {
            textDocument: TextDocument;
            stylesheet: css.Stylesheet;
        }[];
        module: string | undefined;
        scoped: boolean;
    }[]>;
    sourceMaps: import("@vue/reactivity").ComputedRef<SourceMaps.CssSourceMap[]>;
};
