"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageService = void 0;
const pugDocument_1 = require("./pugDocument");
const completion_1 = require("./services/completion");
const documentHighlight_1 = require("./services/documentHighlight");
const documentLinks_1 = require("./services/documentLinks");
const documentSymbol_1 = require("./services/documentSymbol");
const hover_1 = require("./services/hover");
const scanner_1 = require("./services/scanner");
const selectionRanges_1 = require("./services/selectionRanges");
const foldingRanges_1 = require("./services/foldingRanges");
function getLanguageService(htmlLs) {
    return {
        parsePugDocument: (doc) => (0, pugDocument_1.parsePugDocument)(doc, htmlLs),
        doComplete: (0, completion_1.register)(htmlLs),
        findDocumentHighlights: (0, documentHighlight_1.register)(htmlLs),
        findDocumentLinks: (0, documentLinks_1.register)(htmlLs),
        findDocumentSymbols: (0, documentSymbol_1.register)(htmlLs),
        doHover: (0, hover_1.register)(htmlLs),
        createScanner: (0, scanner_1.register)(htmlLs),
        getSelectionRanges: (0, selectionRanges_1.register)(htmlLs),
        getFoldingRanges: (0, foldingRanges_1.register)(),
    };
}
exports.getLanguageService = getLanguageService;
//# sourceMappingURL=index.js.map