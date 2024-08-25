"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
function register({ documentContext, sourceFiles, htmlLs, pugLs, getCssLs }) {
    return async (uri) => {
        const sourceFile = sourceFiles.get(uri);
        if (!sourceFile)
            return;
        const document = sourceFile.getTextDocument();
        const tsResult2 = getTsResult2(sourceFile);
        const htmlResult = getHtmlResult(sourceFile);
        const cssResult = await getCssResult(sourceFile);
        return [
            ...cssResult,
            ...htmlResult,
            ...tsResult2,
        ];
        function getTsResult2(sourceFile) {
            const result = [];
            for (const sourceMap of sourceFile.getTsSourceMaps()) {
                for (const maped of sourceMap.mappings) {
                    if (!maped.data.capabilities.displayWithLink)
                        continue;
                    result.push({
                        range: {
                            start: document.positionAt(maped.sourceRange.start),
                            end: document.positionAt(maped.sourceRange.end),
                        },
                        target: uri, // TODO
                    });
                }
            }
            return result;
        }
        function getHtmlResult(sourceFile) {
            var _a;
            const result = [];
            for (const sourceMap of [...sourceFile.getHtmlSourceMaps(), ...sourceFile.getPugSourceMaps()]) {
                const links = sourceMap.language === 'html'
                    ? htmlLs.findDocumentLinks(sourceMap.mappedDocument, documentContext)
                    : pugLs.findDocumentLinks(sourceMap.pugDocument, documentContext);
                for (const link of links) {
                    const vueRange = (_a = sourceMap.getSourceRange(link.range.start, link.range.end)) === null || _a === void 0 ? void 0 : _a[0];
                    if (vueRange) {
                        result.push({
                            ...link,
                            range: vueRange,
                        });
                    }
                }
            }
            return result;
        }
        async function getCssResult(sourceFile) {
            var _a;
            const sourceMaps = sourceFile.getCssSourceMaps();
            const result = [];
            for (const sourceMap of sourceMaps) {
                const cssLs = getCssLs(sourceMap.mappedDocument.languageId);
                if (!cssLs || !sourceMap.stylesheet)
                    continue;
                const links = await cssLs.findDocumentLinks2(sourceMap.mappedDocument, sourceMap.stylesheet, documentContext);
                for (const link of links) {
                    const vueRange = (_a = sourceMap.getSourceRange(link.range.start, link.range.end)) === null || _a === void 0 ? void 0 : _a[0];
                    if (vueRange) {
                        result.push({
                            ...link,
                            range: vueRange,
                        });
                    }
                }
            }
            return result;
        }
    };
}
exports.register = register;
//# sourceMappingURL=documentLinks.js.map