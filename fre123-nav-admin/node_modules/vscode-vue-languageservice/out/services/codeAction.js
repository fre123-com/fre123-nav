"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const transforms_1 = require("@volar/transforms");
const vscode = require("vscode-languageserver");
const dedupe = require("../utils/dedupe");
const rename_1 = require("./rename");
const shared = require("@volar/shared");
function register({ sourceFiles, getCssLs, getTsLs }) {
    return async (uri, range, context) => {
        const sourceFile = sourceFiles.get(uri);
        if (sourceFile) {
            const descriptor = sourceFile.getDescriptor();
            const document = sourceFile.getTextDocument();
            const scripts = [descriptor.script, descriptor.scriptSetup].filter(shared.notEmpty);
            const styles = descriptor.styles;
            const scriptRanges = scripts
                .map(script => ({
                start: document.positionAt(script.startTagEnd),
                end: document.positionAt(script.startTagEnd + script.content.length),
            }))
                .map(scriptRange => shared.getOverlapRange(scriptRange, range))
                .filter(shared.notEmpty);
            const styleRanges = styles
                .map(script => ({
                start: document.positionAt(script.startTagEnd),
                end: document.positionAt(script.startTagEnd + script.content.length),
            }))
                .map(scriptRange => shared.getOverlapRange(scriptRange, range))
                .filter(shared.notEmpty);
            const tsResult = (await Promise.all(scriptRanges.map(scriptRange => onTs(uri, scriptRange, context)))).flat();
            const cssResult = (await Promise.all(styleRanges.map(styleRange => onCss(uri, styleRange, context)))).flat();
            return dedupe.withCodeAction([
                ...tsResult,
                ...cssResult,
            ]);
        }
        const tsResult = await onTs(uri, range, context);
        const cssResult = onCss(uri, range, context);
        return dedupe.withCodeAction([
            ...tsResult,
            ...cssResult,
        ]);
    };
    async function onTs(uri, range, context) {
        let result = [];
        for (const tsLoc of sourceFiles.toTsLocations(uri, range.start, range.end, undefined, sourceMap => !!sourceMap.capabilities.codeActions)) {
            const tsLs = getTsLs(tsLoc.lsType);
            const tsContext = {
                diagnostics: (0, transforms_1.transformLocations)(context.diagnostics, vueRange => { var _a; return tsLoc.type === 'embedded-ts' ? (_a = tsLoc.sourceMap.getMappedRange(vueRange.start, vueRange.end)) === null || _a === void 0 ? void 0 : _a[0] : vueRange; }),
                only: context.only,
            };
            if (tsLoc.type === 'source-ts' && tsLoc.lsType !== 'script')
                continue;
            let tsCodeActions = await tsLs.getCodeActions(tsLoc.uri, tsLoc.range, tsContext);
            if (!tsCodeActions)
                continue;
            for (const tsCodeAction of tsCodeActions) {
                if (tsCodeAction.title.indexOf('__VLS_') >= 0)
                    continue;
                const vueEdit = tsCodeAction.edit ? (0, rename_1.tsEditToVueEdit)(tsLoc.lsType, false, tsCodeAction.edit, sourceFiles, () => true) : undefined;
                if (tsCodeAction.edit && !vueEdit)
                    continue;
                const data = {
                    lsType: tsLoc.lsType,
                    tsData: tsCodeAction.data,
                };
                result.push({
                    ...tsCodeAction,
                    data,
                    edit: vueEdit,
                });
            }
        }
        return result;
    }
    function onCss(uri, range, context) {
        let result = [];
        const sourceFile = sourceFiles.get(uri);
        if (!sourceFile)
            return result;
        for (const sourceMap of sourceFile.getCssSourceMaps()) {
            if (!sourceMap.stylesheet)
                continue;
            const cssLs = getCssLs(sourceMap.mappedDocument.languageId);
            if (!cssLs)
                continue;
            for (const [cssRange] of sourceMap.getMappedRanges(range.start, range.end)) {
                const cssContext = {
                    diagnostics: (0, transforms_1.transformLocations)(context.diagnostics, vueRange => { var _a; return (_a = sourceMap.getMappedRange(vueRange.start, vueRange.end)) === null || _a === void 0 ? void 0 : _a[0]; }),
                    only: context.only,
                };
                const cssCodeActions = cssLs.doCodeActions2(sourceMap.mappedDocument, cssRange, cssContext, sourceMap.stylesheet);
                for (const codeAction of cssCodeActions) {
                    // TODO
                    // cssCodeAction.edit?.changeAnnotations
                    // cssCodeAction.edit?.documentChanges...
                    if (codeAction.edit) {
                        const vueEdit = {};
                        for (const cssUri in codeAction.edit.changes) {
                            if (cssUri === sourceMap.mappedDocument.uri) {
                                if (!vueEdit.changes) {
                                    vueEdit.changes = {};
                                }
                                vueEdit.changes[uri] = (0, transforms_1.transformLocations)(vueEdit.changes[cssUri], cssRange_2 => { var _a; return (_a = sourceMap.getSourceRange(cssRange_2.start, cssRange_2.end)) === null || _a === void 0 ? void 0 : _a[0]; });
                            }
                        }
                        if (codeAction.edit.documentChanges) {
                            for (const cssDocChange of codeAction.edit.documentChanges) {
                                if (!vueEdit.documentChanges) {
                                    vueEdit.documentChanges = [];
                                }
                                if (vscode.TextDocumentEdit.is(cssDocChange)) {
                                    cssDocChange.textDocument = {
                                        uri: uri,
                                        version: sourceMap.sourceDocument.version,
                                    };
                                    cssDocChange.edits = (0, transforms_1.transformLocations)(cssDocChange.edits, cssRange_2 => { var _a; return (_a = sourceMap.getSourceRange(cssRange_2.start, cssRange_2.end)) === null || _a === void 0 ? void 0 : _a[0]; });
                                    vueEdit.documentChanges.push(cssDocChange);
                                }
                            }
                        }
                        codeAction.edit = vueEdit;
                    }
                    if (codeAction.diagnostics) {
                        codeAction.diagnostics = (0, transforms_1.transformLocations)(codeAction.diagnostics, cssRange_2 => { var _a; return (_a = sourceMap.getSourceRange(cssRange_2.start, cssRange_2.end)) === null || _a === void 0 ? void 0 : _a[0]; });
                    }
                    result.push(codeAction);
                }
            }
        }
        return result;
    }
}
exports.register = register;
//# sourceMappingURL=codeAction.js.map