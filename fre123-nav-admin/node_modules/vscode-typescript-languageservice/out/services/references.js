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
        let entries;
        try {
            entries = languageService.getReferencesAtPosition(fileName, offset);
        }
        catch { }
        if (!entries)
            return [];
        return (0, transforms_1.entriesToLocations)([...entries], getTextDocument2);
    };
}
exports.register = register;
//# sourceMappingURL=references.js.map