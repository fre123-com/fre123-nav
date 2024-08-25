"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const vscode = require("vscode-languageserver");
function register(context) {
    const { getCssLs } = context;
    return (document, color, range) => {
        const sourceFile = context.getVueDocument(document);
        if (!sourceFile)
            return;
        const cssResult = getCssResult(sourceFile);
        return cssResult;
        function getCssResult(sourceFile) {
            var _a, _b;
            let result = [];
            for (const sourceMap of sourceFile.getCssSourceMaps()) {
                const cssLs = getCssLs(sourceMap.mappedDocument.languageId);
                if (!cssLs || !sourceMap.stylesheet)
                    continue;
                const cssRanges = sourceMap.getMappedRanges(range.start, range.end);
                for (const [cssRange] of cssRanges) {
                    const _result = cssLs.getColorPresentations(sourceMap.mappedDocument, sourceMap.stylesheet, color, cssRange);
                    for (const item of _result) {
                        if (item.textEdit) {
                            if (vscode.TextEdit.is(item.textEdit)) {
                                const vueRange = (_a = sourceMap.getSourceRange(item.textEdit.range.start, item.textEdit.range.end)) === null || _a === void 0 ? void 0 : _a[0];
                                if (vueRange) {
                                    item.textEdit.range = vueRange;
                                }
                            }
                            if (item.additionalTextEdits) {
                                for (const textEdit of item.additionalTextEdits) {
                                    const vueRange = (_b = sourceMap.getSourceRange(item.textEdit.range.start, item.textEdit.range.end)) === null || _b === void 0 ? void 0 : _b[0];
                                    if (vueRange) {
                                        textEdit.range = vueRange;
                                    }
                                }
                            }
                        }
                    }
                    result = result.concat(_result);
                }
            }
            return result;
        }
    };
}
exports.register = register;
//# sourceMappingURL=colorPresentation.js.map