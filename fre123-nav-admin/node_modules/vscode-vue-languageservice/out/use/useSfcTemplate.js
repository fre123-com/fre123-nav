"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSfcTemplate = void 0;
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const shared = require("@volar/shared");
const reactivity_1 = require("@vue/reactivity");
const SourceMaps = require("../utils/sourceMaps");
function useSfcTemplate(vueUri, vueDoc, template, context) {
    let version = 0;
    const textDocument = (0, reactivity_1.computed)(() => {
        if (template.value) {
            const langId = shared.syntaxToLanguageId(template.value.lang);
            const uri = vueUri + '.' + template.value.lang;
            const content = template.value.content;
            const document = vscode_languageserver_textdocument_1.TextDocument.create(uri, langId, version++, content);
            return document;
        }
    });
    const htmlDocument = (0, reactivity_1.computed)(() => {
        var _a;
        if (((_a = textDocument.value) === null || _a === void 0 ? void 0 : _a.languageId) === 'html') {
            return context.htmlLs.parseHTMLDocument(textDocument.value);
        }
    });
    const htmlSourceMap = (0, reactivity_1.computed)(() => {
        if (textDocument.value && textDocument.value && template.value && htmlDocument.value) {
            const sourceMap = new SourceMaps.HtmlSourceMap(vueDoc.value, textDocument.value, htmlDocument.value);
            sourceMap.mappings.push({
                data: undefined,
                mode: SourceMaps.Mode.Offset,
                sourceRange: {
                    start: template.value.startTagEnd,
                    end: template.value.startTagEnd + template.value.content.length,
                },
                mappedRange: {
                    start: 0,
                    end: template.value.content.length,
                },
            });
            return sourceMap;
        }
    });
    const pugDocument = (0, reactivity_1.computed)(() => {
        var _a;
        if (((_a = textDocument.value) === null || _a === void 0 ? void 0 : _a.languageId) === 'jade') {
            return context.pugLs.parsePugDocument(textDocument.value);
        }
    });
    const pugSourceMap = (0, reactivity_1.computed)(() => {
        if (textDocument.value && template.value && pugDocument.value) {
            const sourceMap = new SourceMaps.PugSourceMap(vueDoc.value, textDocument.value, pugDocument.value);
            sourceMap.mappings.push({
                data: undefined,
                mode: SourceMaps.Mode.Offset,
                sourceRange: {
                    start: template.value.startTagEnd,
                    end: template.value.startTagEnd + template.value.content.length,
                },
                mappedRange: {
                    start: 0,
                    end: template.value.content.length,
                },
            });
            return sourceMap;
        }
    });
    return {
        textDocument,
        htmlSourceMap,
        pugSourceMap,
        htmlDocument,
        pugDocument,
    };
}
exports.useSfcTemplate = useSfcTemplate;
//# sourceMappingURL=useSfcTemplate.js.map