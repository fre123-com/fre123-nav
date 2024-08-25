"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared = require("@volar/shared");
const reactivity_1 = require("@vue/reactivity");
const vscode = require("vscode-languageserver");
const dedupe = require("../utils/dedupe");
const untrack_1 = require("../utils/untrack");
function register({ sourceFiles, getCssLs, jsonLs, templateTsLs, scriptTsLs, vueHost, getTextDocument }, updateTemplateScripts) {
    const vueWorkers = new WeakMap();
    const tsWorkers = new Map();
    return async (uri, response, isCancel) => {
        const sourceFile = sourceFiles.get(uri);
        if (sourceFile) {
            let worker = vueWorkers.get(sourceFile);
            if (!worker) {
                worker = (0, untrack_1.untrack)(useDiagnostics(sourceFile));
                vueWorkers.set(sourceFile, worker);
            }
            return await worker(response, isCancel);
        }
        else {
            let worker = tsWorkers.get(uri);
            if (!worker) {
                worker = (0, untrack_1.untrack)(useDiagnostics_ts(uri));
                tsWorkers.set(uri, worker);
            }
            return await worker(response, isCancel);
        }
    };
    function useDiagnostics_ts(uri) {
        const scriptTsProjectVersion = (0, reactivity_1.ref)();
        const docVersion = (0, reactivity_1.ref)();
        let all = [
            [useScriptValidation(1), 0, []],
            [useScriptValidation(2), 0, []],
            [useScriptValidation(3), 0, []],
        ];
        return async (response, isCancel) => {
            var _a, _b, _c;
            scriptTsProjectVersion.value = (_b = (_a = scriptTsLs.__internal__.host).getProjectVersion) === null || _b === void 0 ? void 0 : _b.call(_a);
            docVersion.value = (_c = getTextDocument(uri)) === null || _c === void 0 ? void 0 : _c.version;
            // sort by cost
            all = all.sort((a, b) => a[1] - b[1]);
            let isDirty = false;
            let lastResponse;
            for (let i = 0; i < all.length; i++) {
                if (await (isCancel === null || isCancel === void 0 ? void 0 : isCancel()))
                    return;
                const startTime = Date.now();
                const diag = all[i];
                if (!isDirty) {
                    isDirty = isErrorsDirty(diag[2], await diag[0].result.value);
                }
                diag[2] = await diag[0].result.value;
                diag[1] = Date.now() - startTime;
                const _newErrors = all
                    .slice(0, i + 1)
                    .map(async (diag) => await diag[0].result.value)
                    .flat();
                const newErrors = (await Promise.all(_newErrors))
                    .flat();
                const _oldErrors = all
                    .slice(i + 1)
                    .map(async (diag) => diag[2]);
                const oldErrors = (await Promise.all(_oldErrors))
                    .flat();
                const isLast = i === all.length - 1;
                if (await (isCancel === null || isCancel === void 0 ? void 0 : isCancel()))
                    return;
                if (isLast || isDirty) {
                    isDirty = false;
                    lastResponse = dedupe.withDiagnostics(newErrors.concat(oldErrors));
                    response === null || response === void 0 ? void 0 : response(lastResponse);
                }
            }
            return lastResponse;
            function isErrorsDirty(oldErrors, newErrors) {
                return !shared.eqSet(errorsToKeys(oldErrors), errorsToKeys(newErrors));
            }
            function errorsToKeys(errors) {
                return new Set(errors.map(error => error.source
                    + ':' + error.code
                    + ':' + error.message));
            }
        };
        function useScriptValidation(mode) {
            const errors = (0, reactivity_1.computed)(() => {
                { // watching
                    docVersion.value;
                    if (mode === 1) {
                        scriptTsProjectVersion.value;
                    }
                }
                if (mode === 1) {
                    return scriptTsLs.doValidation(uri, { semantic: true });
                }
                else if (mode === 2) {
                    return scriptTsLs.doValidation(uri, { syntactic: true });
                }
                else if (mode === 3) {
                    return scriptTsLs.doValidation(uri, { suggestion: true });
                }
                else if (mode === 4) {
                    return scriptTsLs.doValidation(uri, { declaration: true });
                }
                return [];
            });
            const errors_cache = (0, reactivity_1.ref)([]);
            const result = (0, reactivity_1.computed)(() => {
                errors_cache.value = errors.value;
                return errors_cache.value;
            });
            return {
                result,
                cache: errors_cache,
            };
        }
    }
    function useDiagnostics(sourceFile) {
        const { cssLsDocuments, cssLsSourceMaps, sfcJsons, sfcScriptForScriptLs, lastUpdated, sfcTemplate, descriptor, document, sfcTemplateScript, sfcTemplateData, sfcTemplateCompileResult, templateScriptData, sfcScriptForTemplateLs, templateLsSourceMaps, } = sourceFile.refs;
        const templateTsProjectVersion = (0, reactivity_1.ref)();
        const scriptTsProjectVersion = (0, reactivity_1.ref)();
        const nonTs = [
            [useStylesValidation((0, reactivity_1.computed)(() => cssLsDocuments.value)), 0, []],
            [useJsonsValidation((0, reactivity_1.computed)(() => sfcJsons.textDocuments.value)), 0, []],
            [useTemplateValidation(), 0, []],
            [useScriptExistValidation(), 0, []],
        ];
        let templateTs = [
            [useTemplateScriptValidation(1), 0, []],
            [useTemplateScriptValidation(2), 0, []],
            [useTemplateScriptValidation(3), 0, []],
        ];
        let scriptTs = [
            [useScriptValidation(sfcScriptForScriptLs.textDocument, 1), 0, []],
            [useScriptValidation(sfcScriptForScriptLs.textDocument, 2), 0, []],
            [useScriptValidation(sfcScriptForScriptLs.textDocument, 3), 0, []],
            // [useScriptValidation(virtualScriptGen.textDocument, 4), 0, []], // TODO: support cancel because it's very slow
        ];
        return async (response, isCancel) => {
            var _a, _b, _c, _d;
            templateTsProjectVersion.value = (_b = (_a = templateTsLs.__internal__.host).getProjectVersion) === null || _b === void 0 ? void 0 : _b.call(_a);
            scriptTsProjectVersion.value = (_d = (_c = scriptTsLs.__internal__.host).getProjectVersion) === null || _d === void 0 ? void 0 : _d.call(_c);
            // sort by cost
            templateTs = templateTs.sort((a, b) => a[1] - b[1]);
            scriptTs = scriptTs.sort((a, b) => a[1] - b[1]);
            let all = [...nonTs];
            let mainTsErrorStart = all.length - 1;
            let lastMainError = -1;
            let templateCheckStart = -1;
            const isScriptChanged = lastUpdated.script || lastUpdated.scriptSetup;
            if (isScriptChanged) {
                all = all.concat(scriptTs);
                lastMainError = all.length - 1;
                templateCheckStart = all.length;
                all = all.concat(templateTs);
            }
            else {
                templateCheckStart = all.length;
                all = all.concat(templateTs);
                lastMainError = all.length - 1;
                all = all.concat(scriptTs);
            }
            let isDirty = false;
            let lastResponse;
            for (let i = 0; i < all.length; i++) {
                if (await (isCancel === null || isCancel === void 0 ? void 0 : isCancel()))
                    return;
                if (i === templateCheckStart) {
                    updateTemplateScripts();
                }
                if (await (isCancel === null || isCancel === void 0 ? void 0 : isCancel()))
                    return;
                const startTime = Date.now();
                const diag = all[i];
                if (!isDirty) {
                    isDirty = isErrorsDirty(diag[2], await diag[0].result.value);
                }
                diag[2] = await diag[0].result.value;
                diag[1] = Date.now() - startTime;
                const _newErrors = all
                    .slice(0, i + 1)
                    .map(async (diag) => await diag[0].result.value)
                    .flat();
                const newErrors = (await Promise.all(_newErrors))
                    .flat();
                const _oldErrors = all
                    .slice(i + 1)
                    .map(async (diag) => i >= mainTsErrorStart && !isScriptChanged ? await diag[0].cache.value : diag[2]);
                const oldErrors = (await Promise.all(_oldErrors))
                    .flat();
                const isLast = i === all.length - 1;
                if (await (isCancel === null || isCancel === void 0 ? void 0 : isCancel()))
                    return;
                if (isLast
                    || (isDirty && (i < mainTsErrorStart
                        || i === lastMainError
                        || oldErrors.length === 0))) {
                    isDirty = false;
                    lastResponse = dedupe.withDiagnostics(newErrors.concat(oldErrors));
                    response === null || response === void 0 ? void 0 : response(lastResponse);
                }
            }
            return lastResponse;
            function isErrorsDirty(oldErrors, newErrors) {
                return !shared.eqSet(errorsToKeys(oldErrors), errorsToKeys(newErrors));
            }
            function errorsToKeys(errors) {
                return new Set(errors.map(error => error.source
                    + ':' + error.code
                    + ':' + error.message));
            }
        };
        function useTemplateValidation() {
            const htmlErrors = (0, reactivity_1.computed)(() => {
                var _a;
                if (((_a = sfcTemplateData.value) === null || _a === void 0 ? void 0 : _a.sourceLang) === 'html' && sfcTemplateCompileResult.value) {
                    return sfcTemplateCompileResult.value.errors;
                }
                return [];
            });
            const pugErrors = (0, reactivity_1.computed)(() => {
                var _a, _b, _c, _d;
                const result = [];
                if (((_a = sfcTemplateData.value) === null || _a === void 0 ? void 0 : _a.sourceLang) === 'pug' && sfcTemplate.pugDocument.value) {
                    const pugDoc = sfcTemplate.pugDocument.value;
                    const astError = pugDoc.error;
                    if (astError) {
                        result.push({
                            code: astError.code,
                            message: astError.msg,
                            range: {
                                start: { line: astError.line, character: astError.column },
                                end: { line: astError.line, character: astError.column },
                            },
                        });
                    }
                    else if (sfcTemplateCompileResult.value) {
                        const htmlDoc = pugDoc.sourceMap.mappedDocument;
                        const vueCompileErrors = sfcTemplateCompileResult.value.errors;
                        for (const vueCompileError of vueCompileErrors) {
                            let pugRange = (_b = pugDoc.sourceMap.getSourceRange(vueCompileError.range.start, vueCompileError.range.end)) === null || _b === void 0 ? void 0 : _b[0];
                            if (!pugRange) {
                                const pugStart = (_c = pugDoc.sourceMap.getSourceRange(vueCompileError.range.start, vueCompileError.range.start)) === null || _c === void 0 ? void 0 : _c[0].start;
                                const pugEnd = (_d = pugDoc.sourceMap.getSourceRange(vueCompileError.range.end, vueCompileError.range.end)) === null || _d === void 0 ? void 0 : _d[0].end;
                                if (pugStart && pugEnd) {
                                    pugRange = {
                                        start: pugStart,
                                        end: pugEnd,
                                    };
                                    // trim empty space
                                    const pugText = pugDoc.sourceMap.sourceDocument.getText(pugRange);
                                    const trimLength = pugText.length - pugText.trimEnd().length;
                                    if (trimLength) {
                                        pugRange.end = pugDoc.sourceMap.sourceDocument.positionAt(pugDoc.sourceMap.sourceDocument.offsetAt(pugEnd)
                                            - trimLength);
                                    }
                                }
                            }
                            if (pugRange) {
                                vueCompileError.range = pugRange;
                                result.push(vueCompileError);
                            }
                            else if (sfcTemplate.textDocument.value) {
                                let htmlText = htmlDoc.getText(vueCompileError.range);
                                let errorText = '';
                                try {
                                    errorText += '\n```html\n' + htmlText.trim() + '\n```'; // may thorw
                                }
                                catch (error) {
                                    errorText += '\n```html\n' + htmlText.trim() + '\n```'; // may thorw
                                    errorText += '\n```json\n' + JSON.stringify(error, null, 2) + '\n```';
                                }
                                vueCompileError.message += errorText;
                                vueCompileError.range = {
                                    start: sfcTemplate.textDocument.value.positionAt(0),
                                    end: sfcTemplate.textDocument.value.positionAt(sfcTemplate.textDocument.value.getText().length),
                                };
                                result.push(vueCompileError);
                            }
                        }
                    }
                }
                return result;
            });
            const htmlErrors_cache = (0, reactivity_1.ref)([]);
            const pugErrors_cache = (0, reactivity_1.ref)([]);
            const result = (0, reactivity_1.computed)(() => {
                htmlErrors_cache.value = htmlErrors.value;
                pugErrors_cache.value = pugErrors.value;
                return cacheWithSourceMap.value;
            });
            const cacheWithSourceMap = (0, reactivity_1.computed)(() => {
                if (!sfcTemplate.textDocument.value)
                    return [];
                return [
                    ...toSourceDiags(htmlErrors.value, sfcTemplate.textDocument.value.uri, sfcTemplate.htmlSourceMap.value ? [sfcTemplate.htmlSourceMap.value] : []),
                    ...toSourceDiags(pugErrors.value, sfcTemplate.textDocument.value.uri, sfcTemplate.pugSourceMap.value ? [sfcTemplate.pugSourceMap.value] : []),
                ];
            });
            return {
                result,
                cache: cacheWithSourceMap,
            };
        }
        function useStylesValidation(documents) {
            const errors = (0, reactivity_1.computed)(async () => {
                var _a;
                let result = new Map();
                for (const { textDocument, stylesheet } of documents.value) {
                    const cssLs = getCssLs(textDocument.languageId);
                    if (!cssLs || !stylesheet)
                        continue;
                    const settings = await ((_a = vueHost.getCssLanguageSettings) === null || _a === void 0 ? void 0 : _a.call(vueHost, textDocument));
                    const errs = cssLs.doValidation(textDocument, stylesheet, settings !== null && settings !== void 0 ? settings : undefined /* cssLs accept undefined but not null */);
                    if (errs)
                        result.set(textDocument.uri, errs);
                }
                return result;
            });
            const errors_cache = (0, reactivity_1.ref)(new Map());
            const result = (0, reactivity_1.computed)(async () => {
                errors_cache.value = await errors.value;
                return cacheWithSourceMap.value;
            });
            const cacheWithSourceMap = (0, reactivity_1.computed)(() => {
                let result = [];
                for (const [uri, errs] of errors_cache.value) {
                    result = result.concat(toSourceDiags(errs, uri, cssLsSourceMaps.value));
                }
                return result;
            });
            return {
                result,
                cache: cacheWithSourceMap,
            };
        }
        function useJsonsValidation(documents) {
            const errors = (0, reactivity_1.computed)(async () => {
                var _a;
                let result = new Map();
                for (const { textDocument, jsonDocument } of documents.value) {
                    const errs = await jsonLs.doValidation(textDocument, jsonDocument, textDocument.languageId === 'json'
                        ? {
                            comments: 'error',
                            trailingCommas: 'error',
                        }
                        : {
                            comments: 'ignore',
                            trailingCommas: 'warning',
                        });
                    if (errs) {
                        for (const err of errs) {
                            err.source = (_a = err.source) !== null && _a !== void 0 ? _a : 'json';
                        }
                        result.set(textDocument.uri, errs);
                    }
                }
                return result;
            });
            const errors_cache = (0, reactivity_1.ref)();
            const result = (0, reactivity_1.computed)(() => {
                errors_cache.value = errors.value;
                return cacheWithSourceMap.value;
            });
            const cacheWithSourceMap = (0, reactivity_1.computed)(async () => {
                let result = [];
                if (errors_cache.value) {
                    for (const [uri, errs] of await errors_cache.value) {
                        result = result.concat(toSourceDiags(errs, uri, sfcJsons.sourceMaps.value));
                    }
                }
                return result;
            });
            return {
                result,
                cache: cacheWithSourceMap,
            };
        }
        function useScriptExistValidation() {
            const scriptErrors = (0, reactivity_1.computed)(() => {
                const diags = [];
                if (!scriptTsLs.__internal__.getValidTextDocument(sfcScriptForScriptLs.textDocument.value.uri)) {
                    for (const script of [descriptor.script, descriptor.scriptSetup]) {
                        if (!script || script.content === '')
                            continue;
                        const error = vscode.Diagnostic.create({
                            start: document.value.positionAt(script.startTagEnd),
                            end: document.value.positionAt(script.startTagEnd + script.content.length),
                        }, 'Virtual script not found, may missing <script lang="ts"> / "allowJs": true / jsconfig.json.', vscode.DiagnosticSeverity.Information, undefined, 'volar');
                        error.tags = [vscode.DiagnosticTag.Unnecessary];
                        diags.push(error);
                    }
                }
                return diags;
            });
            const templateErrors = (0, reactivity_1.computed)(() => {
                const diags = [];
                if (sfcTemplateScript.textDocument.value
                    && sfcTemplateScript.textDocumentForFormatting.value
                    && sfcTemplateScript.sourceMapForFormatting.value
                    && !templateTsLs.__internal__.getValidTextDocument(sfcTemplateScript.textDocument.value.uri)) {
                    for (const maped of sfcTemplateScript.sourceMapForFormatting.value.mappings) {
                        const error = vscode.Diagnostic.create({
                            start: document.value.positionAt(maped.sourceRange.start),
                            end: document.value.positionAt(maped.sourceRange.end),
                        }, 'Virtual script not found, may missing <script lang="ts"> / "allowJs": true / jsconfig.json.', vscode.DiagnosticSeverity.Information, undefined, 'volar');
                        error.tags = [vscode.DiagnosticTag.Unnecessary];
                        diags.push(error);
                    }
                }
                return diags;
            });
            const errors = (0, reactivity_1.computed)(() => [
                ...scriptErrors.value,
                ...templateErrors.value,
            ]);
            return {
                result: errors,
                cache: errors,
            };
        }
        function useScriptValidation(document, mode) {
            const errors = (0, reactivity_1.computed)(() => {
                if (mode === 1) { // watching
                    scriptTsProjectVersion.value;
                }
                const doc = document.value;
                if (!doc)
                    return [];
                if (mode === 1) {
                    return scriptTsLs.doValidation(doc.uri, { semantic: true });
                }
                else if (mode === 2) {
                    return scriptTsLs.doValidation(doc.uri, { syntactic: true });
                }
                else if (mode === 3) {
                    return scriptTsLs.doValidation(doc.uri, { suggestion: true });
                }
                else if (mode === 4) {
                    return scriptTsLs.doValidation(doc.uri, { declaration: true });
                }
                return [];
            });
            const errors_cache = (0, reactivity_1.ref)([]);
            const result = (0, reactivity_1.computed)(() => {
                errors_cache.value = errors.value;
                return cacheWithSourceMap.value;
            });
            const cacheWithSourceMap = (0, reactivity_1.computed)(() => {
                const doc = document.value;
                if (!doc)
                    return [];
                return toTsSourceDiags('script', errors_cache.value, doc.uri, templateLsSourceMaps.value);
            });
            return {
                result,
                cache: cacheWithSourceMap,
            };
        }
        function useTemplateScriptValidation(mode) {
            const errors_1 = (0, reactivity_1.computed)(() => {
                if (mode === 1) { // watching
                    templateTsProjectVersion.value;
                }
                const doc = sfcTemplateScript.textDocument.value;
                if (!doc)
                    return [];
                if (mode === 1) {
                    return templateTsLs.doValidation(doc.uri, { semantic: true });
                }
                else if (mode === 2) {
                    return templateTsLs.doValidation(doc.uri, { syntactic: true });
                }
                else if (mode === 3) {
                    return templateTsLs.doValidation(doc.uri, { suggestion: true });
                }
                else if (mode === 4) {
                    return templateTsLs.doValidation(doc.uri, { declaration: true });
                }
                return [];
            });
            const errors_2 = (0, reactivity_1.computed)(() => {
                var _a;
                const result = [];
                if (!sfcTemplateScript.textDocument.value
                    || !sfcTemplateScript.teleportSourceMap.value)
                    return result;
                for (const diag of errors_1.value) {
                    const spanText = sfcTemplateScript.textDocument.value.getText(diag.range);
                    if (!templateScriptData.setupReturns.includes(spanText))
                        continue;
                    for (const [propRight] of sfcTemplateScript.teleportSourceMap.value.getSourceRanges(diag.range.start, diag.range.end, sideData => !sideData.isAdditionalReference)) {
                        const definitions = templateTsLs.findDefinition(sfcTemplateScript.textDocument.value.uri, propRight.start);
                        for (const definition of definitions) {
                            if (definition.targetUri !== ((_a = sfcScriptForTemplateLs.textDocument.value) === null || _a === void 0 ? void 0 : _a.uri))
                                continue;
                            result.push({
                                ...diag,
                                range: definition.targetSelectionRange,
                            });
                        }
                    }
                }
                return result;
            });
            const errors_1_cache = (0, reactivity_1.ref)([]);
            const errors_2_cache = (0, reactivity_1.ref)([]);
            const result = (0, reactivity_1.computed)(() => {
                errors_1_cache.value = errors_1.value;
                errors_2_cache.value = errors_2.value;
                return cacheWithSourceMap.value;
            });
            const cacheWithSourceMap = (0, reactivity_1.computed)(() => {
                const result_1 = sfcTemplateScript.textDocument.value ? toTsSourceDiags('template', errors_1_cache.value, sfcTemplateScript.textDocument.value.uri, templateLsSourceMaps.value) : [];
                const result_2 = sfcScriptForTemplateLs.textDocument.value ? toTsSourceDiags('template', errors_2_cache.value, sfcScriptForTemplateLs.textDocument.value.uri, templateLsSourceMaps.value) : [];
                return [...result_1, ...result_2];
            });
            return {
                result,
                cache: cacheWithSourceMap,
            };
        }
        function toSourceDiags(errors, virtualScriptUri, sourceMaps) {
            const result = [];
            for (const error of errors) {
                if (vscode.Diagnostic.is(error)) {
                    for (const sourceMap of sourceMaps) {
                        if (sourceMap.mappedDocument.uri !== virtualScriptUri)
                            continue;
                        const vueRange = sourceMap.getSourceRange(error.range.start, error.range.end);
                        if (!vueRange)
                            continue;
                        result.push({
                            ...error,
                            range: vueRange[0],
                        });
                    }
                }
            }
            return result;
        }
        function toTsSourceDiags(lsType, errors, virtualScriptUri, sourceMaps) {
            const result = [];
            for (const error of errors) {
                const vueRange = findVueRange(virtualScriptUri, error.range);
                if (vueRange) {
                    const vueError = {
                        ...error,
                        range: vueRange,
                    };
                    if (vueError.relatedInformation) {
                        const vueInfos = [];
                        for (const info of vueError.relatedInformation) {
                            const vueInfoRange = findVueRange(info.location.uri, info.location.range);
                            if (vueInfoRange) {
                                vueInfos.push({
                                    location: {
                                        uri: vueInfoRange.uri,
                                        range: vueInfoRange,
                                    },
                                    message: info.message,
                                });
                            }
                        }
                        vueError.relatedInformation = vueInfos;
                    }
                    result.push(vueError);
                }
            }
            return result;
            function findVueRange(virtualUri, virtualRange) {
                var _a;
                for (const sourceMap of sourceMaps) {
                    if (sourceMap.mappedDocument.uri === virtualUri) {
                        const vueRange = (_a = sourceMap.getSourceRange(virtualRange.start, virtualRange.end, data => !!data.capabilities.diagnostic)) === null || _a === void 0 ? void 0 : _a[0];
                        if (vueRange) {
                            return {
                                uri: sourceFile.uri,
                                start: vueRange.start,
                                end: vueRange.end,
                            };
                        }
                    }
                }
                for (const vueLoc of sourceFiles.fromTsLocation(lsType, virtualUri, virtualRange.start, virtualRange.end, data => !!data.capabilities.diagnostic)) {
                    return {
                        uri: vueLoc.uri,
                        start: vueLoc.range.start,
                        end: vueLoc.range.end,
                    };
                }
            }
        }
    }
}
exports.register = register;
//# sourceMappingURL=diagnostics.js.map