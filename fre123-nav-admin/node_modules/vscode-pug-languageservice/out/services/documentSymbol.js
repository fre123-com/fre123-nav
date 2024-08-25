"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const transforms_1 = require("@volar/transforms");
const vscode = require("vscode-languageserver");
function register(htmlLs) {
    return (pugDoc) => {
        const htmlResult = htmlLs.findDocumentSymbols(pugDoc.sourceMap.mappedDocument, pugDoc.htmlDocument);
        return (0, transforms_1.transformSymbolInformations)(htmlResult, htmlLocation => {
            var _a;
            const pugRange = (_a = pugDoc.sourceMap.getSourceRange(htmlLocation.range.start, htmlLocation.range.end)) === null || _a === void 0 ? void 0 : _a[0];
            return pugRange ? vscode.Location.create(pugDoc.sourceMap.sourceDocument.uri, pugRange) : undefined;
        });
    };
}
exports.register = register;
//# sourceMappingURL=documentSymbol.js.map