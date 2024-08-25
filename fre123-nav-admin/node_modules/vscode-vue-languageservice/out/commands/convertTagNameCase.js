"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared_1 = require("@vue/shared");
const vscode = require("vscode-languageserver");
const references = require("../services/references");
function register(context) {
    const findReferences = references.register(context);
    return async (connection, { sourceFiles }, uri, mode) => {
        var _a, _b;
        const sourceFile = sourceFiles.get(uri);
        if (!sourceFile)
            return;
        const desc = sourceFile.getDescriptor();
        if (!desc.template)
            return;
        const progress = await connection.window.createWorkDoneProgress();
        progress.begin('Convert Tag Name', 0, '', true);
        const template = desc.template;
        const document = sourceFile.getTextDocument();
        const edits = [];
        const components = new Set(sourceFile.getTemplateScriptData().components);
        const resolvedTags = (_b = (_a = sourceFile.refs.sfcTemplateScript.templateCodeGens.value) === null || _a === void 0 ? void 0 : _a.tagNames) !== null && _b !== void 0 ? _b : {};
        let i = 0;
        for (const tagName in resolvedTags) {
            const resolvedTag = resolvedTags[tagName];
            if (resolvedTag === null || resolvedTag === void 0 ? void 0 : resolvedTag.offsets.length) {
                if (progress.token.isCancellationRequested)
                    return;
                progress.report(i++ / Object.keys(resolvedTags).length * 100, tagName);
                const offset = template.startTagEnd + resolvedTag.offsets[0];
                const refs = findReferences(uri, sourceFile.getTextDocument().positionAt(offset));
                for (const vueLoc of refs) {
                    if (vueLoc.uri === sourceFile.uri
                        && document.offsetAt(vueLoc.range.start) >= template.startTagEnd
                        && document.offsetAt(vueLoc.range.end) <= template.startTagEnd + template.content.length) {
                        const referenceText = document.getText(vueLoc.range);
                        for (const component of components) {
                            if (component === referenceText || (0, shared_1.hyphenate)(component) === referenceText) {
                                if (mode === 'kebab' && referenceText !== (0, shared_1.hyphenate)(component)) {
                                    edits.push(vscode.TextEdit.replace(vueLoc.range, (0, shared_1.hyphenate)(component)));
                                }
                                if (mode === 'pascal' && referenceText !== component) {
                                    edits.push(vscode.TextEdit.replace(vueLoc.range, component));
                                }
                            }
                        }
                    }
                }
            }
        }
        connection.workspace.applyEdit({ changes: { [document.uri]: edits } });
        progress.done();
    };
}
exports.register = register;
//# sourceMappingURL=convertTagNameCase.js.map