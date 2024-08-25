"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSfcScriptGen = void 0;
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const shared = require("@volar/shared");
const reactivity_1 = require("@vue/reactivity");
const sourceMaps_1 = require("../utils/sourceMaps");
const script_1 = require("@volar/vue-code-gen/out/generators/script");
const templateGen = require("@volar/vue-code-gen/out/generators/template_scriptSetup");
const localTypes_1 = require("../utils/localTypes");
function useSfcScriptGen(lsType, vueUri, vueDoc, script, scriptSetup, scriptRanges, scriptSetupRanges, sfcTemplateCompileResult, sfcStyles, isVue2) {
    let version = 0;
    const htmlGen = (0, reactivity_1.computed)(() => {
        var _a;
        if ((_a = sfcTemplateCompileResult.value) === null || _a === void 0 ? void 0 : _a.ast) {
            return templateGen.generate(sfcTemplateCompileResult.value.ast);
        }
    });
    const codeGen = (0, reactivity_1.computed)(() => {
        var _a, _b;
        return (0, script_1.generate)(lsType, vueUri, (_a = script.value) !== null && _a !== void 0 ? _a : undefined, (_b = scriptSetup.value) !== null && _b !== void 0 ? _b : undefined, scriptRanges.value, scriptSetupRanges.value, () => htmlGen.value, () => {
            const bindTexts = [];
            for (const style of sfcStyles.value) {
                const docText = style.textDocument.getText();
                for (const cssBind of style.binds) {
                    const bindText = docText.substring(cssBind.start, cssBind.end);
                    bindTexts.push(bindText);
                }
            }
            return bindTexts;
        }, (0, localTypes_1.getVueLibraryName)(isVue2));
    });
    const lang = (0, reactivity_1.computed)(() => {
        return !script.value && !scriptSetup.value ? 'ts'
            : scriptSetup.value && scriptSetup.value.lang !== 'js' ? scriptSetup.value.lang
                : script.value && script.value.lang !== 'js' ? script.value.lang
                    : 'js';
    });
    const textDocument = (0, reactivity_1.computed)(() => {
        if (lsType === 'script') {
            return vscode_languageserver_textdocument_1.TextDocument.create(`${vueUri}.${lang.value}`, shared.syntaxToLanguageId(lang.value), version++, codeGen.value.getText());
        }
        else if (script.value || scriptSetup.value) {
            return vscode_languageserver_textdocument_1.TextDocument.create(`${vueUri}.__VLS_script.${lang.value}`, shared.syntaxToLanguageId(lang.value), version++, codeGen.value.getText());
        }
    });
    const textDocumentTs = (0, reactivity_1.computed)(() => {
        if (lsType === 'template' && textDocument.value && ['js', 'jsx'].includes(lang.value)) {
            const tsLang = lang.value === 'jsx' ? 'tsx' : 'ts';
            return vscode_languageserver_textdocument_1.TextDocument.create(`${vueUri}.__VLS_script_ts.${tsLang}`, shared.syntaxToLanguageId(tsLang), textDocument.value.version, textDocument.value.getText());
        }
    });
    const sourceMap = (0, reactivity_1.computed)(() => {
        var _a;
        if (textDocument.value) {
            const sourceMap = new sourceMaps_1.TsSourceMap(vueDoc.value, textDocument.value, lsType, false, {
                foldingRanges: false,
                formatting: false,
                documentSymbol: lsType === 'script',
                codeActions: !((_a = script.value) === null || _a === void 0 ? void 0 : _a.src) && lsType === 'script',
            }, codeGen.value.getMappings(parseMappingSourceRange));
            return sourceMap;
        }
    });
    const teleportSourceMap = (0, reactivity_1.computed)(() => {
        if (textDocument.value) {
            const sourceMap = new sourceMaps_1.TeleportSourceMap(textDocument.value, false);
            for (const teleport of codeGen.value.teleports) {
                sourceMap.mappings.push(teleport);
            }
            return sourceMap;
        }
    });
    return {
        lang,
        textDocument: textDocument,
        textDocumentTs,
        sourceMap: sourceMap,
        teleportSourceMap: teleportSourceMap,
    };
    function parseMappingSourceRange(data, sourceRange) {
        var _a;
        if (data.vueTag === 'scriptSrc' && ((_a = script.value) === null || _a === void 0 ? void 0 : _a.src)) {
            const vueStart = vueDoc.value.getText().substring(0, script.value.startTagEnd).lastIndexOf(script.value.src);
            const vueEnd = vueStart + script.value.src.length;
            return {
                start: vueStart - 1,
                end: vueEnd + 1,
            };
        }
        else if (data.vueTag === 'script' && script.value) {
            return {
                start: script.value.startTagEnd + sourceRange.start,
                end: script.value.startTagEnd + sourceRange.end,
            };
        }
        else if (data.vueTag === 'scriptSetup' && scriptSetup.value) {
            return {
                start: scriptSetup.value.startTagEnd + sourceRange.start,
                end: scriptSetup.value.startTagEnd + sourceRange.end,
            };
        }
        else {
            return sourceRange;
        }
    }
}
exports.useSfcScriptGen = useSfcScriptGen;
//# sourceMappingURL=useSfcScriptGen.js.map