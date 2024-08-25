"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const transforms_1 = require("@volar/transforms");
function register(htmlLs) {
    return (pugDoc, docContext) => {
        const htmlResult = htmlLs.findDocumentLinks(pugDoc.sourceMap.mappedDocument, docContext);
        return (0, transforms_1.transformLocations)(htmlResult, htmlRange => { var _a; return (_a = pugDoc.sourceMap.getSourceRange(htmlRange.start, htmlRange.end)) === null || _a === void 0 ? void 0 : _a[0]; });
    };
}
exports.register = register;
//# sourceMappingURL=documentLinks.js.map