"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared = require("@volar/shared");
const transforms_1 = require("@volar/transforms");
const vscode = require("vscode-languageserver");
const sharedLs_1 = require("../utils/sharedLs");
const dedupe = require("../utils/dedupe");
function register(context, getPreferences, getFormatOptions) {
    const { modules, htmlLs, pugLs, getCssLs } = context;
    return (document) => {
        const sourceFile = context.getVueDocument(document);
        if (!sourceFile) {
            // take over mode
            const dummyTsLs = (0, sharedLs_1.getDummyTsLs)(modules.typescript, modules.ts, document, getPreferences, getFormatOptions);
            return dummyTsLs.findDocumentSymbols(document.uri);
        }
        const vueResult = getVueResult(sourceFile);
        const tsResult = getTsResult(sourceFile);
        const htmlResult = getHtmlResult(sourceFile);
        const cssResult = getCssResult(sourceFile);
        return [
            ...vueResult,
            ...tsResult,
            ...htmlResult,
            ...cssResult,
        ];
        function getVueResult(sourceFile) {
            const result = [];
            const desc = sourceFile.getDescriptor();
            if (desc.template) {
                result.push({
                    name: '<template>',
                    kind: vscode.SymbolKind.Module,
                    location: vscode.Location.create(document.uri, vscode.Range.create(document.positionAt(desc.template.startTagEnd), document.positionAt(desc.template.startTagEnd + desc.template.content.length))),
                });
            }
            if (desc.script) {
                result.push({
                    name: '<script>',
                    kind: vscode.SymbolKind.Module,
                    location: vscode.Location.create(document.uri, vscode.Range.create(document.positionAt(desc.script.startTagEnd), document.positionAt(desc.script.startTagEnd + desc.script.content.length))),
                });
            }
            if (desc.scriptSetup) {
                result.push({
                    name: '<script setup>',
                    kind: vscode.SymbolKind.Module,
                    location: vscode.Location.create(document.uri, vscode.Range.create(document.positionAt(desc.scriptSetup.startTagEnd), document.positionAt(desc.scriptSetup.startTagEnd + desc.scriptSetup.content.length))),
                });
            }
            for (const style of desc.styles) {
                result.push({
                    name: `<${['style', style.scoped ? 'scoped' : undefined, style.module ? 'module' : undefined].filter(shared.notEmpty).join(' ')}>`,
                    kind: vscode.SymbolKind.Module,
                    location: vscode.Location.create(document.uri, vscode.Range.create(document.positionAt(style.startTagEnd), document.positionAt(style.startTagEnd + style.content.length))),
                });
            }
            for (const customBlock of desc.customBlocks) {
                result.push({
                    name: `<${customBlock.type}>`,
                    kind: vscode.SymbolKind.Module,
                    location: vscode.Location.create(document.uri, vscode.Range.create(document.positionAt(customBlock.startTagEnd), document.positionAt(customBlock.startTagEnd + customBlock.content.length))),
                });
            }
            return result;
        }
        function getTsResult(sourceFile) {
            let result = [];
            for (const sourceMap of sourceFile.getTsSourceMaps()) {
                if (!sourceMap.capabilities.documentSymbol)
                    continue;
                const dummyTsLs = (0, sharedLs_1.getDummyTsLs)(modules.typescript, modules.ts, sourceMap.mappedDocument, getPreferences, getFormatOptions);
                const symbols = dummyTsLs.findDocumentSymbols(sourceMap.mappedDocument.uri);
                result = result.concat((0, transforms_1.transformSymbolInformations)(symbols, loc => {
                    var _a;
                    const vueRange = (_a = sourceMap.getSourceRange(loc.range.start, loc.range.end)) === null || _a === void 0 ? void 0 : _a[0];
                    return vueRange ? vscode.Location.create(document.uri, vueRange) : undefined;
                }));
            }
            result = result.filter(symbol => {
                if (symbol.kind === vscode.SymbolKind.Module)
                    return false;
                if (symbol.location.range.end.line === 0 && symbol.location.range.end.character === 0)
                    return false;
                return true;
            });
            return dedupe.withSymbolInformations(result);
        }
        function getHtmlResult(sourceFile) {
            let result = [];
            for (const sourceMap of [
                ...sourceFile.getHtmlSourceMaps(),
                ...sourceFile.getPugSourceMaps()
            ]) {
                const symbols = sourceMap.language === 'html'
                    ? htmlLs.findDocumentSymbols(sourceMap.mappedDocument, sourceMap.htmlDocument)
                    : pugLs.findDocumentSymbols(sourceMap.pugDocument);
                if (!symbols)
                    continue;
                result = result.concat((0, transforms_1.transformSymbolInformations)(symbols, loc => {
                    var _a;
                    const vueRange = (_a = sourceMap.getSourceRange(loc.range.start, loc.range.end)) === null || _a === void 0 ? void 0 : _a[0];
                    return vueRange ? vscode.Location.create(document.uri, vueRange) : undefined;
                }));
            }
            return result;
        }
        function getCssResult(sourceFile) {
            let result = [];
            for (const sourceMap of sourceFile.getCssSourceMaps()) {
                const cssLs = getCssLs(sourceMap.mappedDocument.languageId);
                if (!cssLs || !sourceMap.stylesheet)
                    continue;
                let symbols = cssLs.findDocumentSymbols(sourceMap.mappedDocument, sourceMap.stylesheet);
                if (!symbols)
                    continue;
                result = result.concat((0, transforms_1.transformSymbolInformations)(symbols, loc => {
                    var _a;
                    const vueRange = (_a = sourceMap.getSourceRange(loc.range.start, loc.range.end)) === null || _a === void 0 ? void 0 : _a[0];
                    return vueRange ? vscode.Location.create(document.uri, vueRange) : undefined;
                }));
            }
            return result;
        }
    };
}
exports.register = register;
//# sourceMappingURL=documentSymbol.js.map