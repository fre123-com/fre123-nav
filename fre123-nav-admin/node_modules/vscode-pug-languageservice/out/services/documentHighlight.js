"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const transforms_1 = require("@volar/transforms");
function register(htmlLs) {
    return (pugDoc, pos) => {
        var _a;
        const htmlRange = (_a = pugDoc.sourceMap.getMappedRange(pos, pos, data => !(data === null || data === void 0 ? void 0 : data.isEmptyTagCompletion))) === null || _a === void 0 ? void 0 : _a[0];
        if (!htmlRange)
            return;
        const htmlResult = htmlLs.findDocumentHighlights(pugDoc.sourceMap.mappedDocument, htmlRange.start, pugDoc.htmlDocument);
        return (0, transforms_1.transformLocations)(htmlResult, htmlRange => { var _a; return (_a = pugDoc.sourceMap.getSourceRange(htmlRange.start, htmlRange.end)) === null || _a === void 0 ? void 0 : _a[0]; });
    };
}
exports.register = register;
//# sourceMappingURL=documentHighlight.js.map