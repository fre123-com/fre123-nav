"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared = require("@volar/shared");
const transforms_1 = require("@volar/transforms");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const sharedLs_1 = require("../utils/sharedLs");
function register(context, getPreferences, getFormatOptions) {
    const { modules, htmlLs, pugLs, getCssLs } = context;
    return (document, positions) => {
        const sourceFile = context.getVueDocument(document);
        if (!sourceFile) {
            // take over mode
            const dummyTsLs = (0, sharedLs_1.getDummyTsLs)(modules.typescript, modules.ts, document, getPreferences, getFormatOptions);
            return dummyTsLs.getSelectionRanges(document.uri, positions);
        }
        // const vueResult = getVueResult(sourceFile); // TODO
        const tsResult = getTsResult(sourceFile);
        const htmlResult = getHtmlResult(sourceFile);
        const cssResult = getCssResult(sourceFile);
        const embeddedResult = [
            ...cssResult,
            ...htmlResult,
            ...tsResult,
        ];
        // for (const embeddedRange of embeddedResult) {
        // 	const lastParent = findLastParent(embeddedRange);
        // 	for (const vueRange of vueResult) {
        // 		if (shared.isInsideRange(vueRange.range, lastParent.range)) {
        // 			lastParent.parent = vueRange;
        // 			break;
        // 		}
        // 	}
        // }
        return embeddedResult;
        // function findLastParent(range: vscode.SelectionRange) {
        // 	let parent = range;
        // 	while (range.parent) {
        // 		parent = range.parent;
        // 	}
        // 	return parent;
        // }
        function getVueResult(sourceFile) {
            const descriptor = sourceFile.getDescriptor();
            let emptyBlocksContent = document.getText();
            for (const block of [
                descriptor.script,
                descriptor.scriptSetup,
                descriptor.template,
                ...descriptor.styles,
                ...descriptor.customBlocks,
            ].filter(shared.notEmpty)) {
                emptyBlocksContent = emptyBlocksContent.substring(0, block.startTagEnd) + ' '.repeat(block.content.length) + emptyBlocksContent.substring(block.startTagEnd + block.content.length);
            }
            let result = [];
            result = result.concat(htmlLs.getSelectionRanges(vscode_languageserver_textdocument_1.TextDocument.create(document.uri, document.languageId, document.version, emptyBlocksContent), positions));
            return result;
        }
        function getTsResult(sourceFile) {
            const tsSourceMaps = [
                sourceFile.getTemplateFormattingScript().sourceMap,
                ...sourceFile.docLsScripts().sourceMaps,
            ].filter(shared.notEmpty);
            let result = [];
            for (const sourceMap of tsSourceMaps) {
                if (!sourceMap.capabilities.foldingRanges)
                    continue;
                const dummyTsLs = (0, sharedLs_1.getDummyTsLs)(modules.typescript, modules.ts, sourceMap.mappedDocument, getPreferences, getFormatOptions);
                const tsStarts = positions.map(position => { var _a; return (_a = sourceMap.getMappedRange(position)) === null || _a === void 0 ? void 0 : _a[0].start; }).filter(shared.notEmpty);
                const tsSelectRange = dummyTsLs.getSelectionRanges(sourceMap.mappedDocument.uri, tsStarts);
                result = result.concat((0, transforms_1.transformSelectionRanges)(tsSelectRange, range => { var _a; return (_a = sourceMap.getSourceRange(range.start, range.end)) === null || _a === void 0 ? void 0 : _a[0]; }));
            }
            return result;
        }
        function getHtmlResult(sourceFile) {
            let result = [];
            for (const sourceMap of [
                ...sourceFile.getHtmlSourceMaps(),
                ...sourceFile.getPugSourceMaps()
            ]) {
                const htmlStarts = positions.map(position => { var _a; return (_a = sourceMap.getMappedRange(position)) === null || _a === void 0 ? void 0 : _a[0].start; }).filter(shared.notEmpty);
                const selectRanges = sourceMap.language === 'html'
                    ? htmlLs.getSelectionRanges(sourceMap.mappedDocument, htmlStarts)
                    : pugLs.getSelectionRanges(sourceMap.pugDocument, htmlStarts);
                result = result.concat((0, transforms_1.transformSelectionRanges)(selectRanges, range => { var _a; return (_a = sourceMap.getSourceRange(range.start, range.end)) === null || _a === void 0 ? void 0 : _a[0]; }));
            }
            return result;
        }
        function getCssResult(sourceFile) {
            let result = [];
            for (const sourceMap of sourceFile.getCssSourceMaps()) {
                const cssLs = getCssLs(sourceMap.mappedDocument.languageId);
                if (!cssLs || !sourceMap.stylesheet)
                    continue;
                const cssStarts = positions.map(position => { var _a; return (_a = sourceMap.getMappedRange(position)) === null || _a === void 0 ? void 0 : _a[0].start; }).filter(shared.notEmpty);
                const cssSelectRanges = cssLs.getSelectionRanges(sourceMap.mappedDocument, cssStarts, sourceMap.stylesheet);
                result = result.concat((0, transforms_1.transformSelectionRanges)(cssSelectRanges, range => { var _a; return (_a = sourceMap.getSourceRange(range.start, range.end)) === null || _a === void 0 ? void 0 : _a[0]; }));
            }
            return result;
        }
    };
}
exports.register = register;
//# sourceMappingURL=selectionRanges.js.map