"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
function register({ getHtmlDocument, htmlLs }) {
    return (document, position) => {
        const htmlDoc = getHtmlDocument(document);
        if (htmlDoc) {
            return htmlLs.doTagComplete(document, position, htmlDoc);
        }
    };
}
exports.register = register;
//# sourceMappingURL=autoClose.js.map