"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const transforms_1 = require("@volar/transforms");
function register(htmlLs) {
    return async (pugDoc, pos, documentContext, options) => {
        var _a;
        const htmlRange = (_a = pugDoc.sourceMap.getMappedRange(pos)) === null || _a === void 0 ? void 0 : _a[0];
        if (!htmlRange)
            return;
        const htmlComplete = await htmlLs.doComplete2(pugDoc.sourceMap.mappedDocument, htmlRange.start, pugDoc.htmlDocument, documentContext, options);
        return (0, transforms_1.transformCompletionList)(htmlComplete, htmlRange => { var _a; return (_a = pugDoc.sourceMap.getSourceRange(htmlRange.start, htmlRange.end)) === null || _a === void 0 ? void 0 : _a[0]; });
    };
}
exports.register = register;
//# sourceMappingURL=completion.js.map