import { TextDocument } from 'vscode-languageserver-textdocument';
import * as shared from '@volar/shared';
import { Ref } from '@vue/reactivity';
import { LanguageServiceContext } from '../types';
import * as SourceMaps from '../utils/sourceMaps';
export declare function useSfcTemplate(vueUri: string, vueDoc: Ref<TextDocument>, template: Ref<shared.Sfc['template']>, context: LanguageServiceContext): {
    textDocument: import("@vue/reactivity").ComputedRef<TextDocument | undefined>;
    htmlSourceMap: import("@vue/reactivity").ComputedRef<SourceMaps.HtmlSourceMap | undefined>;
    pugSourceMap: import("@vue/reactivity").ComputedRef<SourceMaps.PugSourceMap | undefined>;
    htmlDocument: import("@vue/reactivity").ComputedRef<import("vscode-html-languageservice").HTMLDocument | undefined>;
    pugDocument: import("@vue/reactivity").ComputedRef<{
        pugTextDocument: TextDocument;
        htmlTextDocument: TextDocument;
        htmlDocument: import("vscode-html-languageservice").HTMLDocument;
        pugCode: string;
        htmlCode: string;
        sourceMap: SourceMaps.SourceMap<{
            isEmptyTagCompletion: boolean;
        } | undefined>;
        error: {
            code: string;
            msg: string;
            line: number;
            column: number;
            filename: string;
        } | undefined;
        ast: import("packages/vscode-pug-languageservice/src/pugDocument").Node | undefined;
    } | undefined>;
};
