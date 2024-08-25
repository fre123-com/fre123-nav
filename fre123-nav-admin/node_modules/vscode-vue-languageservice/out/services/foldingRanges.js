"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const sharedLs_1 = require("../utils/sharedLs");
const shared = require("@volar/shared");
function register(context, getPreferences, getFormatOptions) {
    const { htmlLs, pugLs, getCssLs, modules } = context;
    return (document) => {
        const sourceFile = context.getVueDocument(document);
        if (!sourceFile) {
            // take over mode
            const dummyTsLs = (0, sharedLs_1.getDummyTsLs)(modules.typescript, modules.ts, document, getPreferences, getFormatOptions);
            return dummyTsLs.getFoldingRanges(document.uri);
        }
        const vueResult = getVueResult(sourceFile); // include html folding ranges
        const tsResult = getTsResult(sourceFile);
        const cssResult = getCssResult(sourceFile);
        const pugResult = getPugResult(sourceFile);
        return [
            ...vueResult,
            ...tsResult,
            ...cssResult,
            ...pugResult,
        ];
        function getVueResult(sourceFile) {
            let docTextWithoutBlocks = document.getText();
            const desc = sourceFile.getDescriptor();
            const blocks = [desc.script, desc.scriptSetup, ...desc.styles, ...desc.customBlocks].filter(shared.notEmpty);
            if (desc.template && desc.template.lang !== 'html') {
                blocks.push(desc.template);
            }
            for (const block of blocks) {
                const content = docTextWithoutBlocks.substring(block.startTagEnd, block.startTagEnd + block.content.length);
                docTextWithoutBlocks = docTextWithoutBlocks.substring(0, block.startTagEnd)
                    + content.split('\n').map(line => ' '.repeat(line.length)).join('\n')
                    + docTextWithoutBlocks.substring(block.startTagEnd + block.content.length);
            }
            return htmlLs.getFoldingRanges(vscode_languageserver_textdocument_1.TextDocument.create(document.uri, document.languageId, document.version, docTextWithoutBlocks));
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
                const foldingRanges = dummyTsLs.getFoldingRanges(sourceMap.mappedDocument.uri);
                result = result.concat(toVueFoldingRangesTs(foldingRanges, sourceMap));
            }
            return result;
        }
        function getCssResult(sourceFile) {
            let result = [];
            for (const sourceMap of sourceFile.getCssSourceMaps()) {
                if (!sourceMap.capabilities.foldingRanges)
                    continue;
                const cssLs = getCssLs(sourceMap.mappedDocument.languageId);
                if (!cssLs)
                    continue;
                const foldingRanges = cssLs.getFoldingRanges(sourceMap.mappedDocument);
                result = result.concat(toVueFoldingRanges(foldingRanges, sourceMap));
            }
            return result;
        }
        function getPugResult(sourceFile) {
            let result = [];
            for (const sourceMap of sourceFile.getPugSourceMaps()) {
                const foldingRanges = pugLs.getFoldingRanges(sourceMap.pugDocument);
                result = result.concat(toVueFoldingRanges(foldingRanges, sourceMap));
            }
            return result;
        }
    };
}
exports.register = register;
function toVueFoldingRanges(virtualFoldingRanges, sourceMap) {
    var _a, _b, _c;
    const result = [];
    for (const foldingRange of virtualFoldingRanges) {
        const vueRange = (_c = sourceMap.getSourceRange({ line: foldingRange.startLine, character: (_a = foldingRange.startCharacter) !== null && _a !== void 0 ? _a : 0 }, { line: foldingRange.endLine, character: (_b = foldingRange.endCharacter) !== null && _b !== void 0 ? _b : 0 })) === null || _c === void 0 ? void 0 : _c[0];
        if (vueRange) {
            foldingRange.startLine = vueRange.start.line;
            foldingRange.endLine = vueRange.end.line;
            if (foldingRange.startCharacter !== undefined)
                foldingRange.startCharacter = vueRange.start.character;
            if (foldingRange.endCharacter !== undefined)
                foldingRange.endCharacter = vueRange.end.character;
            result.push(foldingRange);
        }
    }
    return result;
}
function toVueFoldingRangesTs(virtualFoldingRanges, sourceMap) {
    var _a, _b, _c;
    const result = [];
    for (const foldingRange of virtualFoldingRanges) {
        const vueLoc = (_c = sourceMap.getSourceRange({ line: foldingRange.startLine, character: (_a = foldingRange.startCharacter) !== null && _a !== void 0 ? _a : 0 }, { line: foldingRange.endLine, character: (_b = foldingRange.endCharacter) !== null && _b !== void 0 ? _b : 0 }, data => !!data.capabilities.foldingRanges)) === null || _c === void 0 ? void 0 : _c[0];
        if (vueLoc) {
            foldingRange.startLine = vueLoc.start.line;
            foldingRange.endLine = vueLoc.end.line;
            if (foldingRange.startCharacter !== undefined)
                foldingRange.startCharacter = vueLoc.start.character;
            if (foldingRange.endCharacter !== undefined)
                foldingRange.endCharacter = vueLoc.end.character;
            result.push(foldingRange);
        }
    }
    return result;
}
//# sourceMappingURL=foldingRanges.js.map