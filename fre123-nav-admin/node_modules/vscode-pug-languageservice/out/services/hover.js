"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const transforms_1 = require("@volar/transforms");
function register(htmlLs) {
    return (docDoc, pos) => {
        var _a;
        const htmlRange = (_a = docDoc.sourceMap.getMappedRange(pos, pos, data => !(data === null || data === void 0 ? void 0 : data.isEmptyTagCompletion))) === null || _a === void 0 ? void 0 : _a[0];
        if (!htmlRange)
            return;
        const htmlResult = htmlLs.doHover(docDoc.sourceMap.mappedDocument, htmlRange.start, docDoc.htmlDocument);
        if (!htmlResult)
            return;
        return (0, transforms_1.transformHover)(htmlResult, htmlRange => { var _a; return (_a = docDoc.sourceMap.getSourceRange(htmlRange.start, htmlRange.end)) === null || _a === void 0 ? void 0 : _a[0]; });
    };
}
exports.register = register;
//# sourceMappingURL=hover.js.map