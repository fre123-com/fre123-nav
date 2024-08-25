"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.margeWorkspaceEdits = exports.getTriggerCharacters = exports.getSemanticTokenLegend = void 0;
var semanticTokens_1 = require("./services/semanticTokens");
Object.defineProperty(exports, "getSemanticTokenLegend", { enumerable: true, get: function () { return semanticTokens_1.getSemanticTokenLegend; } });
var completion_1 = require("./services/completion");
Object.defineProperty(exports, "getTriggerCharacters", { enumerable: true, get: function () { return completion_1.getTriggerCharacters; } });
var rename_1 = require("./services/rename");
Object.defineProperty(exports, "margeWorkspaceEdits", { enumerable: true, get: function () { return rename_1.margeWorkspaceEdits; } });
__exportStar(require("./utils/sourceMaps"), exports);
__exportStar(require("./commands"), exports);
__exportStar(require("./languageService"), exports);
__exportStar(require("./sourceFile"), exports);
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map