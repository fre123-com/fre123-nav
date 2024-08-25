"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const vscode = require("vscode-languageserver");
const shared = require("@volar/shared");
function register(languageService, getTextDocument, ts) {
    return (uri) => {
        const document = getTextDocument(uri);
        if (!document)
            return [];
        const fileName = shared.uriToFsPath(document.uri);
        let outliningSpans;
        try {
            outliningSpans = languageService.getOutliningSpans(fileName);
        }
        catch { }
        if (!outliningSpans)
            return [];
        const foldingRanges = [];
        for (const outliningSpan of outliningSpans) {
            const start = document.positionAt(outliningSpan.textSpan.start);
            const end = adjustFoldingEnd(start, document.positionAt(outliningSpan.textSpan.start + outliningSpan.textSpan.length), document);
            const foldingRange = vscode.FoldingRange.create(start.line, end.line, start.character, end.character, transformFoldingRangeKind(outliningSpan.kind));
            foldingRanges.push(foldingRange);
        }
        return foldingRanges;
    };
    function transformFoldingRangeKind(tsKind) {
        switch (tsKind) {
            case ts.OutliningSpanKind.Comment: return vscode.FoldingRangeKind.Comment;
            case ts.OutliningSpanKind.Imports: return vscode.FoldingRangeKind.Imports;
            case ts.OutliningSpanKind.Region: return vscode.FoldingRangeKind.Region;
        }
    }
}
exports.register = register;
const foldEndPairCharacters = ['}', ']', ')', '`'];
// https://github.com/microsoft/vscode/blob/bed61166fb604e519e82e4d1d1ed839bc45d65f8/extensions/typescript-language-features/src/languageFeatures/folding.ts#L61-L73
function adjustFoldingEnd(start, end, document) {
    // workaround for #47240
    if (end.character > 0) {
        const foldEndCharacter = document.getText({
            start: { line: end.line, character: end.character - 1 },
            end,
        });
        if (foldEndPairCharacters.includes(foldEndCharacter)) {
            const endOffset = Math.max(document.offsetAt({ line: end.line, character: 0 }) - 1, document.offsetAt(start));
            return document.positionAt(endOffset);
        }
    }
    return end;
}
//# sourceMappingURL=foldingRanges.js.map