"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSfcTemplateCompileResult = void 0;
const vscode = require("vscode-languageserver");
const reactivity_1 = require("@vue/reactivity");
const vue_code_gen_1 = require("@volar/vue-code-gen");
function useSfcTemplateCompileResult(htmlDocument, compilerOptions) {
    return (0, reactivity_1.computed)(() => {
        var _a;
        if (!htmlDocument.value)
            return;
        const errors = [];
        const compiled = (0, vue_code_gen_1.compileSFCTemplate)(htmlDocument.value.getText(), compilerOptions.experimentalTemplateCompilerOptions, (_a = compilerOptions.experimentalCompatMode) !== null && _a !== void 0 ? _a : 3);
        for (const error of compiled.errors) {
            onCompilerError(error, vscode.DiagnosticSeverity.Error);
        }
        for (const error of compiled.warnings) {
            onCompilerError(error, vscode.DiagnosticSeverity.Warning);
        }
        return {
            ast: compiled.ast,
            errors,
        };
        function onCompilerError(err, severity) {
            var _a, _b, _c, _d;
            errors.push({
                range: {
                    start: htmlDocument.value.positionAt((_b = (_a = err.loc) === null || _a === void 0 ? void 0 : _a.start.offset) !== null && _b !== void 0 ? _b : 0),
                    end: htmlDocument.value.positionAt((_d = (_c = err.loc) === null || _c === void 0 ? void 0 : _c.end.offset) !== null && _d !== void 0 ? _d : 0),
                },
                severity,
                code: err.code,
                source: 'vue',
                message: err.message,
            });
        }
    });
}
exports.useSfcTemplateCompileResult = useSfcTemplateCompileResult;
//# sourceMappingURL=useSfcTemplateCompileResult.js.map