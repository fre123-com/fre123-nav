"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
function register({ getHtmlDocument, htmlLs }) {
    return (document, position) => {
        const htmlDoc = getHtmlDocument(document);
        if (htmlDoc) {
            const ranges = htmlLs.findLinkedEditingRanges(document, position, htmlDoc);
            if (ranges) {
                return { ranges };
            }
        }
        return null;
    };
}
exports.register = register;
//# sourceMappingURL=linkedEditingRange.js.map