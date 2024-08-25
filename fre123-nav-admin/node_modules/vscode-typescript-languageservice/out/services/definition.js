"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const transforms_1 = require("../utils/transforms");
const shared = require("@volar/shared");
function register(languageService, getTextDocument, getTextDocument2) {
    return (uri, position) => {
        const document = getTextDocument(uri);
        if (!document)
            return [];
        const fileName = shared.uriToFsPath(document.uri);
        const offset = document.offsetAt(position);
        let info;
        try {
            info = languageService.getDefinitionAndBoundSpan(fileName, offset);
        }
        catch { }
        if (!info)
            return [];
        return (0, transforms_1.boundSpanToLocationLinks)(info, document, getTextDocument2);
    };
}
exports.register = register;
//# sourceMappingURL=definition.js.map