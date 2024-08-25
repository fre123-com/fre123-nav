"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared = require("@volar/shared");
const lsTypes = ['script', 'template'];
function register({ modules: { typescript: ts }, sourceFiles, templateTsLsRaw, scriptTsLsRaw, templateTsHost, scriptTsHost, vueHost }) {
    return {
        getRootFileNames,
        emit,
        getSyntacticDiagnostics,
        getSemanticDiagnostics,
        getGlobalDiagnostics,
    };
    function getRootFileNames() {
        const set = new Set([
            ...getProgram('script').getRootFileNames().filter(fileName => { var _a; return (_a = scriptTsHost.fileExists) === null || _a === void 0 ? void 0 : _a.call(scriptTsHost, fileName); }),
            ...getProgram('template').getRootFileNames().filter(fileName => { var _a; return (_a = templateTsHost.fileExists) === null || _a === void 0 ? void 0 : _a.call(templateTsHost, fileName); }),
        ]);
        return [...set.values()];
    }
    function getSyntacticDiagnostics(sourceFile, cancellationToken) {
        return lsTypes.map(lsType => transformDiagnostics(lsType, getProgram(lsType).getSyntacticDiagnostics(sourceFile, cancellationToken), 2)).flat();
    }
    function getSemanticDiagnostics(sourceFile, cancellationToken) {
        return lsTypes.map(lsType => transformDiagnostics(lsType, getProgram(lsType).getSemanticDiagnostics(sourceFile, cancellationToken), 1)).flat();
    }
    function getGlobalDiagnostics(cancellationToken) {
        return lsTypes.map(lsType => transformDiagnostics(lsType, getProgram(lsType).getGlobalDiagnostics(cancellationToken))).flat();
    }
    function emit(targetSourceFile, _writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers) {
        var _a;
        const scriptResult = getProgram('script').emit(targetSourceFile, ((_a = vueHost.writeFile) !== null && _a !== void 0 ? _a : ts.sys.writeFile), cancellationToken, emitOnlyDtsFiles, customTransformers);
        const templateResult = getProgram('template').emit(targetSourceFile, undefined, cancellationToken, emitOnlyDtsFiles, customTransformers);
        return {
            emitSkipped: scriptResult.emitSkipped,
            emittedFiles: scriptResult.emittedFiles,
            diagnostics: [
                ...transformDiagnostics('script', scriptResult.diagnostics),
                ...transformDiagnostics('template', templateResult.diagnostics),
            ],
        };
    }
    function getProgram(lsType) {
        const program = (lsType === 'script' ? scriptTsLsRaw : templateTsLsRaw).getProgram();
        if (!program)
            throw '!program';
        return program;
    }
    // transform
    function transformDiagnostics(lsType, diagnostics, mode) {
        var _a, _b;
        const result = [];
        const tsLsHost = lsType === 'script' ? scriptTsHost : templateTsHost;
        for (const diagnostic of diagnostics) {
            if (diagnostic.file !== undefined
                && diagnostic.start !== undefined
                && diagnostic.length !== undefined) {
                const fileName = shared.normalizeFileName(diagnostic.file.fileName);
                for (const tsOrVueLoc of sourceFiles.fromTsLocation2(lsType, shared.fsPathToUri(fileName), diagnostic.start, diagnostic.start + diagnostic.length, data => !!data.capabilities.diagnostic)) {
                    if (!((_a = vueHost.fileExists) === null || _a === void 0 ? void 0 : _a.call(vueHost, shared.uriToFsPath(tsOrVueLoc.uri))))
                        continue;
                    if (tsOrVueLoc.type === 'source-ts' && lsType !== 'script')
                        continue;
                    let file = shared.uriToFsPath(tsOrVueLoc.uri) === fileName
                        ? diagnostic.file
                        : undefined;
                    if (!file) {
                        let docText = (_b = tsOrVueLoc.sourceMap) === null || _b === void 0 ? void 0 : _b.sourceDocument.getText();
                        if (docText === undefined) {
                            const snapshot = vueHost.getScriptSnapshot(shared.uriToFsPath(tsOrVueLoc.uri));
                            if (snapshot) {
                                docText = snapshot.getText(0, snapshot.getLength());
                            }
                        }
                        if (docText !== undefined) {
                            file = ts.createSourceFile(shared.uriToFsPath(tsOrVueLoc.uri), docText, tsOrVueLoc.uri.endsWith('.vue') ? ts.ScriptTarget.JSON : ts.ScriptTarget.Latest);
                        }
                    }
                    const newDiagnostic = {
                        ...diagnostic,
                        file,
                        start: tsOrVueLoc.range.start,
                        length: tsOrVueLoc.range.end - tsOrVueLoc.range.start,
                    };
                    const relatedInformation = diagnostic.relatedInformation;
                    if (relatedInformation) {
                        newDiagnostic.relatedInformation = transformDiagnostics(lsType, relatedInformation);
                    }
                    result.push(newDiagnostic);
                }
            }
            else if (diagnostic.file === undefined) {
                result.push(diagnostic);
            }
        }
        return result;
    }
}
exports.register = register;
//# sourceMappingURL=tsProgramApis.js.map