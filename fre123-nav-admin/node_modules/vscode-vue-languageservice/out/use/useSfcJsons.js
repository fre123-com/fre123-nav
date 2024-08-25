"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSfcJsons = void 0;
const reactivity_1 = require("@vue/reactivity");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const SourceMaps = require("../utils/sourceMaps");
function useSfcJsons(vueUri, vueDoc, customBlocks, context) {
    let version = 0;
    const textDocuments = (0, reactivity_1.computed)(() => {
        const documents = [];
        for (let i = 0; i < customBlocks.value.length; i++) {
            const customBlock = customBlocks.value[i];
            const lang = customBlock.lang;
            const content = customBlock.content;
            const uri = vueUri + '.' + i + '.' + lang;
            const document = vscode_languageserver_textdocument_1.TextDocument.create(uri, lang, version++, content);
            if (lang === 'json' || lang === 'jsonc') {
                documents.push({
                    index: i,
                    textDocument: document,
                    jsonDocument: context.jsonLs.parseJSONDocument(document),
                });
            }
        }
        return documents;
    });
    const sourceMaps = (0, reactivity_1.computed)(() => {
        const sourceMaps = [];
        for (const doc of textDocuments.value) {
            const customBlock = customBlocks.value[doc.index];
            const sourceMap = new SourceMaps.JsonSourceMap(vueDoc.value, doc.textDocument, doc.jsonDocument);
            sourceMap.mappings.push({
                data: undefined,
                mode: SourceMaps.Mode.Offset,
                sourceRange: {
                    start: customBlock.startTagEnd,
                    end: customBlock.startTagEnd + customBlock.content.length,
                },
                mappedRange: {
                    start: 0,
                    end: customBlock.content.length,
                },
            });
            sourceMaps.push(sourceMap);
        }
        return sourceMaps;
    });
    return {
        textDocuments,
        sourceMaps,
    };
}
exports.useSfcJsons = useSfcJsons;
//# sourceMappingURL=useSfcJsons.js.map