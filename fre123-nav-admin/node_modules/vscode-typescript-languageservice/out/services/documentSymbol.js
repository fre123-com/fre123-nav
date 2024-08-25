"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const PConst = require("../protocol.const");
const vscode = require("vscode-languageserver");
const modifiers_1 = require("../utils/modifiers");
const shared = require("@volar/shared");
const getSymbolKind = (kind) => {
    switch (kind) {
        case PConst.Kind.module: return vscode.SymbolKind.Module;
        case PConst.Kind.class: return vscode.SymbolKind.Class;
        case PConst.Kind.enum: return vscode.SymbolKind.Enum;
        case PConst.Kind.interface: return vscode.SymbolKind.Interface;
        case PConst.Kind.method: return vscode.SymbolKind.Method;
        case PConst.Kind.memberVariable: return vscode.SymbolKind.Property;
        case PConst.Kind.memberGetAccessor: return vscode.SymbolKind.Property;
        case PConst.Kind.memberSetAccessor: return vscode.SymbolKind.Property;
        case PConst.Kind.variable: return vscode.SymbolKind.Variable;
        case PConst.Kind.const: return vscode.SymbolKind.Variable;
        case PConst.Kind.localVariable: return vscode.SymbolKind.Variable;
        case PConst.Kind.function: return vscode.SymbolKind.Function;
        case PConst.Kind.localFunction: return vscode.SymbolKind.Function;
        case PConst.Kind.constructSignature: return vscode.SymbolKind.Constructor;
        case PConst.Kind.constructorImplementation: return vscode.SymbolKind.Constructor;
    }
    return vscode.SymbolKind.Variable;
};
function register(languageService, getTextDocument) {
    return (uri) => {
        const document = getTextDocument(uri);
        if (!document)
            return [];
        const fileName = shared.uriToFsPath(document.uri);
        let barItems;
        try {
            barItems = languageService.getNavigationTree(fileName);
        }
        catch { }
        if (!barItems)
            return [];
        // The root represents the file. Ignore this when showing in the UI
        const result = [];
        if (barItems.childItems) {
            for (const item of barItems.childItems) {
                convertNavTree(document, item, undefined);
            }
        }
        return result;
        function convertNavTree(document, item, parent) {
            var _a;
            let shouldInclude = shouldInclueEntry(item);
            if (!shouldInclude && !((_a = item.childItems) === null || _a === void 0 ? void 0 : _a.length)) {
                return false;
            }
            for (const span of item.spans) {
                const range = vscode.Range.create(document.positionAt(span.start), document.positionAt(span.start + span.length));
                const symbolInfo = vscode.SymbolInformation.create(item.text, getSymbolKind(item.kind), range, undefined, parent === null || parent === void 0 ? void 0 : parent.text);
                if (item.childItems) {
                    for (const child of item.childItems) {
                        convertNavTree(document, child, item);
                    }
                }
                const kindModifiers = (0, modifiers_1.parseKindModifier)(item.kindModifiers);
                if (kindModifiers.has(PConst.KindModifiers.deprecated)) {
                    symbolInfo.deprecated = true;
                }
                if (shouldInclude) {
                    result.push(symbolInfo);
                }
            }
            return shouldInclude;
        }
        function shouldInclueEntry(item) {
            if (item.kind === PConst.Kind.alias) {
                return false;
            }
            return !!(item.text && item.text !== '<function>' && item.text !== '<class>');
        }
    };
}
exports.register = register;
//# sourceMappingURL=documentSymbol.js.map