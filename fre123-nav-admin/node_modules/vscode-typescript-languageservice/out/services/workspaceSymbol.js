"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const PConst = require("../protocol.const");
const vscode = require("vscode-languageserver");
const modifiers_1 = require("../utils/modifiers");
const shared = require("@volar/shared");
function getSymbolKind(item) {
    switch (item.kind) {
        case PConst.Kind.method: return vscode.SymbolKind.Method;
        case PConst.Kind.enum: return vscode.SymbolKind.Enum;
        case PConst.Kind.enumMember: return vscode.SymbolKind.EnumMember;
        case PConst.Kind.function: return vscode.SymbolKind.Function;
        case PConst.Kind.class: return vscode.SymbolKind.Class;
        case PConst.Kind.interface: return vscode.SymbolKind.Interface;
        case PConst.Kind.type: return vscode.SymbolKind.Class;
        case PConst.Kind.memberVariable: return vscode.SymbolKind.Field;
        case PConst.Kind.memberGetAccessor: return vscode.SymbolKind.Field;
        case PConst.Kind.memberSetAccessor: return vscode.SymbolKind.Field;
        case PConst.Kind.variable: return vscode.SymbolKind.Variable;
        default: return vscode.SymbolKind.Variable;
    }
}
function register(languageService, getTextDocument2) {
    return (query) => {
        let items;
        try {
            items = languageService.getNavigateToItems(query);
        }
        catch { }
        if (!items)
            return [];
        return items
            .filter(item => item.containerName || item.kind !== 'alias')
            .map(toSymbolInformation)
            .filter(shared.notEmpty);
        function toSymbolInformation(item) {
            const label = getLabel(item);
            const uri = shared.fsPathToUri(item.fileName);
            const document = getTextDocument2(uri);
            if (document) {
                const range = vscode.Range.create(document.positionAt(item.textSpan.start), document.positionAt(item.textSpan.start + item.textSpan.length));
                const info = vscode.SymbolInformation.create(label, getSymbolKind(item), range, uri, item.containerName || '');
                const kindModifiers = item.kindModifiers ? (0, modifiers_1.parseKindModifier)(item.kindModifiers) : undefined;
                if (kindModifiers === null || kindModifiers === void 0 ? void 0 : kindModifiers.has(PConst.KindModifiers.deprecated)) {
                    info.tags = [vscode.SymbolTag.Deprecated];
                }
                return info;
            }
        }
        function getLabel(item) {
            const label = item.name;
            if (item.kind === 'method' || item.kind === 'function') {
                return label + '()';
            }
            return label;
        }
    };
}
exports.register = register;
//# sourceMappingURL=workspaceSymbol.js.map