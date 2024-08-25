"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared = require("@volar/shared");
const transforms_1 = require("@volar/transforms");
function register(htmlLs) {
    return (pugDoc, posArr) => {
        const htmlPosArr = posArr
            .map(position => { var _a; return (_a = pugDoc.sourceMap.getMappedRange(position, position, data => !(data === null || data === void 0 ? void 0 : data.isEmptyTagCompletion))) === null || _a === void 0 ? void 0 : _a[0].start; })
            .filter(shared.notEmpty);
        const htmlResult = htmlLs.getSelectionRanges(pugDoc.sourceMap.mappedDocument, htmlPosArr);
        return (0, transforms_1.transformLocations)(htmlResult, htmlRange => { var _a; return (_a = pugDoc.sourceMap.getSourceRange(htmlRange.start, htmlRange.end)) === null || _a === void 0 ? void 0 : _a[0]; });
    };
}
exports.register = register;
//# sourceMappingURL=selectionRanges.js.map