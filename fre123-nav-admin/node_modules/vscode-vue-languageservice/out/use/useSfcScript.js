"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSfcScript = void 0;
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const shared = require("@volar/shared");
const reactivity_1 = require("@vue/reactivity");
const SourceMaps = require("../utils/sourceMaps");
function useSfcScript(vueUri, vueDoc, script, ts) {
    let version = 0;
    const ast = (0, reactivity_1.computed)(() => {
        if (script.value) {
            return ts.createSourceFile('foo.' + script.value.lang, script.value.content, ts.ScriptTarget.Latest);
        }
    });
    const textDocument = (0, reactivity_1.computed)(() => {
        if (script.value) {
            const lang = script.value.lang;
            const uri = `${vueUri}.${lang}`;
            return vscode_languageserver_textdocument_1.TextDocument.create(uri, shared.syntaxToLanguageId(lang), version++, script.value.content);
        }
    });
    const sourceMap = (0, reactivity_1.computed)(() => {
        if (textDocument.value && script.value) {
            const sourceMap = new SourceMaps.TsSourceMap(vueDoc.value, textDocument.value, 'template', false, {
                foldingRanges: true,
                formatting: true,
                documentSymbol: false,
                codeActions: false,
            });
            sourceMap.mappings.push({
                data: {
                    vueTag: 'script',
                    capabilities: {
                        formatting: true,
                        foldingRanges: true,
                    },
                },
                mode: SourceMaps.Mode.Offset,
                sourceRange: {
                    start: script.value.startTagEnd,
                    end: script.value.startTagEnd + script.value.content.length,
                },
                mappedRange: {
                    start: 0,
                    end: script.value.content.length,
                },
            });
            return sourceMap;
        }
    });
    return {
        ast,
        textDocument,
        sourceMap,
    };
}
exports.useSfcScript = useSfcScript;
//# sourceMappingURL=useSfcScript.js.map