"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.getSemanticTokenLegend = void 0;
const shared_1 = require("@vue/shared");
const vscode = require("vscode-languageserver");
const ts2 = require("vscode-typescript-languageservice"); // TODO: remove it
function getSemanticTokenLegend() {
    const tsLegend = ts2.getSemanticTokenLegend();
    const tokenTypesLegend = [
        ...tsLegend.types,
        'componentTag',
        'operator', // namespaced component accessor: '.'
    ];
    const semanticTokenLegend = {
        tokenTypes: tokenTypesLegend,
        tokenModifiers: tsLegend.modifiers,
    };
    return semanticTokenLegend;
}
exports.getSemanticTokenLegend = getSemanticTokenLegend;
function register({ sourceFiles, getTsLs, htmlLs, pugLs, scriptTsLs, modules: { html } }, updateTemplateScripts) {
    const semanticTokensLegend = getSemanticTokenLegend();
    const tokenTypes = new Map(semanticTokensLegend.tokenTypes.map((t, i) => [t, i]));
    return (uri, range, cancle, resultProgress) => {
        const sourceFile = sourceFiles.get(uri);
        if (!sourceFile) {
            // take over mode
            const tokens = scriptTsLs.getDocumentSemanticTokens(uri, range, cancle);
            return buildTokens(tokens !== null && tokens !== void 0 ? tokens : []);
        }
        const document = sourceFile.getTextDocument();
        const offsetRange = range ?
            {
                start: document.offsetAt(range.start),
                end: document.offsetAt(range.end),
            } : {
            start: 0,
            end: document.getText().length,
        };
        let tokens = [];
        if (cancle === null || cancle === void 0 ? void 0 : cancle.isCancellationRequested)
            return;
        const scriptResult = getTsResult(sourceFile, 'script');
        if (!(cancle === null || cancle === void 0 ? void 0 : cancle.isCancellationRequested) && scriptResult.length) {
            tokens = tokens.concat(scriptResult);
            resultProgress === null || resultProgress === void 0 ? void 0 : resultProgress.report(buildTokens(tokens));
        }
        if (sourceFile.getHtmlSourceMaps().length) {
            updateTemplateScripts();
        }
        if (cancle === null || cancle === void 0 ? void 0 : cancle.isCancellationRequested)
            return;
        const templateResult = getTsResult(sourceFile, 'template');
        if (!(cancle === null || cancle === void 0 ? void 0 : cancle.isCancellationRequested) && templateResult.length) {
            tokens = tokens.concat(templateResult);
            resultProgress === null || resultProgress === void 0 ? void 0 : resultProgress.report(buildTokens(tokens));
        }
        if (cancle === null || cancle === void 0 ? void 0 : cancle.isCancellationRequested)
            return;
        const htmlResult = getHtmlResult(sourceFile);
        if (!(cancle === null || cancle === void 0 ? void 0 : cancle.isCancellationRequested) && htmlResult.length) {
            tokens = tokens.concat(htmlResult);
            resultProgress === null || resultProgress === void 0 ? void 0 : resultProgress.report(buildTokens(tokens));
        }
        if (cancle === null || cancle === void 0 ? void 0 : cancle.isCancellationRequested)
            return;
        return buildTokens(tokens);
        function buildTokens(tokens) {
            var _a;
            const builder = new vscode.SemanticTokensBuilder();
            for (const token of tokens.sort((a, b) => a[0] - b[0] === 0 ? a[1] - b[1] : a[0] - b[0])) {
                builder.push(token[0], token[1], token[2], token[3], (_a = token[4]) !== null && _a !== void 0 ? _a : 0);
            }
            return builder.build();
        }
        function getTsResult(sourceFile, lsType) {
            var _a;
            const result = [];
            for (const sourceMap of sourceFile.getTsSourceMaps()) {
                if (sourceMap.lsType !== lsType)
                    continue;
                const tsLs = getTsLs(sourceMap.lsType);
                for (const maped of sourceMap.mappings) {
                    if (maped.data.capabilities.semanticTokens
                        && maped.sourceRange.end > offsetRange.start
                        && maped.sourceRange.start < offsetRange.end) {
                        if (cancle === null || cancle === void 0 ? void 0 : cancle.isCancellationRequested)
                            return result;
                        const tsRange = {
                            start: sourceMap.mappedDocument.positionAt(maped.mappedRange.start),
                            end: sourceMap.mappedDocument.positionAt(maped.mappedRange.end),
                        };
                        const tokens = tsLs.getDocumentSemanticTokens(sourceMap.mappedDocument.uri, tsRange, cancle);
                        if (!tokens)
                            continue;
                        for (const token of tokens) {
                            const tsStart = sourceMap.mappedDocument.offsetAt({ line: token[0], character: token[1] });
                            const tsEnd = sourceMap.mappedDocument.offsetAt({ line: token[0], character: token[1] + token[2] });
                            const vueRange = (_a = sourceMap.getSourceRange(tsStart, tsEnd, data => !!data.capabilities.semanticTokens)) === null || _a === void 0 ? void 0 : _a[0];
                            if (!vueRange)
                                continue;
                            const vuePos = document.positionAt(vueRange.start);
                            result.push([vuePos.line, vuePos.character, vueRange.end - vueRange.start, token[3], token[4]]);
                        }
                    }
                }
            }
            return result;
        }
        function getHtmlResult(sourceFile) {
            var _a, _b, _c, _d, _e;
            const result = [];
            const templateScriptData = sourceFile.getTemplateScriptData();
            const components = new Set([
                ...templateScriptData.components,
                ...templateScriptData.components.map(shared_1.hyphenate).filter(name => !(0, shared_1.isHTMLTag)(name)),
            ]);
            for (const sourceMap of [...sourceFile.getHtmlSourceMaps(), ...sourceFile.getPugSourceMaps()]) {
                const inSourceMap = [...sourceMap.mappings].some(mapping => (mapping.sourceRange.start >= offsetRange.start && mapping.sourceRange.start <= offsetRange.end)
                    || (mapping.sourceRange.end >= offsetRange.start && mapping.sourceRange.end <= offsetRange.end));
                if (!inSourceMap)
                    continue;
                const htmlStart = (_b = (_a = sourceMap.getMappedRange(offsetRange.start)) === null || _a === void 0 ? void 0 : _a[0].start) !== null && _b !== void 0 ? _b : 0;
                const docText = sourceMap.mappedDocument.getText();
                const scanner = sourceMap.language === 'html'
                    ? htmlLs.createScanner(docText, htmlStart)
                    : pugLs.createScanner(sourceMap.pugDocument, htmlStart);
                if (!scanner)
                    continue;
                let token = scanner.scan();
                while (token !== html.TokenType.EOS) {
                    if (token === html.TokenType.StartTag || token === html.TokenType.EndTag) {
                        const tokenText = scanner.getTokenText();
                        if (components.has(tokenText) || tokenText.indexOf('.') >= 0) {
                            const tokenOffset = scanner.getTokenOffset();
                            const tokenLength = scanner.getTokenLength();
                            const vueRange = (_c = sourceMap.getSourceRange(tokenOffset)) === null || _c === void 0 ? void 0 : _c[0];
                            if (vueRange) {
                                const vueOffset = vueRange.start;
                                if (vueOffset > offsetRange.end)
                                    break; // TODO: fix source map perf and break in while condition
                                const vuePos = sourceMap.sourceDocument.positionAt(vueOffset);
                                if (components.has(tokenText)) {
                                    result.push([vuePos.line, vuePos.character, tokenLength, (_d = tokenTypes.get('componentTag')) !== null && _d !== void 0 ? _d : -1, undefined]);
                                }
                                else if (tokenText.indexOf('.') >= 0) {
                                    for (let i = 0; i < tokenText.length; i++) {
                                        if (tokenText[i] === '.') {
                                            result.push([vuePos.line, vuePos.character + i, 1, (_e = tokenTypes.get('operator')) !== null && _e !== void 0 ? _e : -1, undefined]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    token = scanner.scan();
                }
            }
            return result;
        }
    };
}
exports.register = register;
//# sourceMappingURL=semanticTokens.js.map