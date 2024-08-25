"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const transforms_1 = require("@volar/transforms");
const vscode = require("vscode-languageserver");
function register(context) {
    const { scriptTsLs, sourceFiles } = context;
    return (query) => {
        const symbols = scriptTsLs.findWorkspaceSymbols(query);
        return (0, transforms_1.transformSymbolInformations)(symbols, loc => {
            for (const vueLoc of sourceFiles.fromTsLocation('script', loc.uri, loc.range.start, loc.range.end)) {
                return vscode.Location.create(vueLoc.uri, vueLoc.range);
            }
        });
    };
}
exports.register = register;
//# sourceMappingURL=workspaceSymbol.js.map