"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const vscode = require("vscode-languageserver");
const sourceMaps_1 = require("../utils/sourceMaps");
const definition_1 = require("./definition");
const shared = require("@volar/shared");
function register({ sourceFiles, htmlLs, pugLs, getCssLs, getTsLs, vueHost }) {
    const findDefinitions = (0, definition_1.register)(arguments[0]);
    return async (uri, position) => {
        var _a, _b;
        const tsResult = onTs(uri, position);
        const htmlResult = await onHtml(uri, position);
        const cssResult = await onCss(uri, position);
        if (!tsResult && !htmlResult && !cssResult)
            return;
        const texts = [
            ...getHoverTexts(tsResult),
            ...getHoverTexts(htmlResult),
            ...getHoverTexts(cssResult),
        ];
        const result = {
            contents: texts,
            range: (_b = (_a = cssResult === null || cssResult === void 0 ? void 0 : cssResult.range) !== null && _a !== void 0 ? _a : htmlResult === null || htmlResult === void 0 ? void 0 : htmlResult.range) !== null && _b !== void 0 ? _b : tsResult === null || tsResult === void 0 ? void 0 : tsResult.range,
        };
        return result;
    };
    function onTs(uri, position, isExtra = false) {
        let result;
        // vue -> ts
        for (const tsLoc of sourceFiles.toTsLocations(uri, position, position, data => !!data.capabilities.basic)) {
            if (tsLoc.type === 'source-ts' && tsLoc.lsType !== 'script')
                continue;
            const tsLs = getTsLs(tsLoc.lsType);
            const tsHover = tsLs.doHover(tsLoc.uri, tsLoc.range.start, isExtra);
            if (!tsHover)
                continue;
            if (!isExtra && tsLoc.type === 'embedded-ts' && tsLoc.data.capabilities.extraHoverInfo) {
                const definitions = findDefinitions.on(uri, position);
                for (const definition of definitions) {
                    const extraHover = onTs(definition.targetUri, definition.targetSelectionRange.start, true);
                    if (!extraHover)
                        continue;
                    if (!vscode.MarkupContent.is(extraHover.contents))
                        continue;
                    const extraText = extraHover.contents.value;
                    for (const extraTextPart of extraText.split('\n\n')) {
                        if (vscode.MarkupContent.is(tsHover.contents) && !tsHover.contents.value.split('\n\n').includes(extraTextPart)) {
                            tsHover.contents.value += `\n\n` + extraTextPart;
                        }
                    }
                }
            }
            if (tsHover.range) {
                // ts -> vue
                const hoverRange = { start: position, end: position };
                for (const vueLoc of sourceFiles.fromTsLocation(tsLoc.lsType, tsLoc.uri, tsHover.range.start, tsHover.range.end)) {
                    result = {
                        ...tsHover,
                        range: vueLoc.range,
                    };
                    if (shared.isInsideRange(vueLoc.range, hoverRange))
                        break;
                }
            }
            else {
                result = tsHover;
            }
        }
        return result;
    }
    async function onHtml(uri, position) {
        var _a;
        let result;
        const sourceFile = sourceFiles.get(uri);
        if (!sourceFile)
            return result;
        // vue -> html
        for (const sourceMap of [
            ...sourceFile.getHtmlSourceMaps(),
            ...sourceFile.getPugSourceMaps(),
        ]) {
            const settings = await ((_a = vueHost.getHtmlHoverSettings) === null || _a === void 0 ? void 0 : _a.call(vueHost, sourceMap.mappedDocument));
            for (const [htmlRange] of sourceMap.getMappedRanges(position)) {
                const htmlHover = sourceMap instanceof sourceMaps_1.HtmlSourceMap
                    ? htmlLs.doHover(sourceMap.mappedDocument, htmlRange.start, sourceMap.htmlDocument, settings)
                    : pugLs.doHover(sourceMap.pugDocument, htmlRange.start);
                if (!htmlHover)
                    continue;
                if (!htmlHover.range) {
                    result = htmlHover;
                    continue;
                }
                // html -> vue
                for (const [vueRange] of sourceMap.getSourceRanges(htmlHover.range.start, htmlHover.range.end)) {
                    result = {
                        ...htmlHover,
                        range: vueRange,
                    };
                }
            }
        }
        return result;
    }
    async function onCss(uri, position) {
        var _a;
        let result;
        const sourceFile = sourceFiles.get(uri);
        if (!sourceFile)
            return result;
        // vue -> css
        for (const sourceMap of sourceFile.getCssSourceMaps()) {
            if (!sourceMap.stylesheet)
                continue;
            const cssLs = getCssLs(sourceMap.mappedDocument.languageId);
            if (!cssLs)
                continue;
            for (const [cssRange] of sourceMap.getMappedRanges(position)) {
                const settings = await ((_a = vueHost.getCssLanguageSettings) === null || _a === void 0 ? void 0 : _a.call(vueHost, sourceMap.mappedDocument));
                const cssHover = cssLs.doHover(sourceMap.mappedDocument, cssRange.start, sourceMap.stylesheet, settings === null || settings === void 0 ? void 0 : settings.hover);
                if (!cssHover)
                    continue;
                if (!cssHover.range) {
                    result = cssHover;
                    continue;
                }
                // css -> vue
                for (const [vueRange] of sourceMap.getSourceRanges(cssHover.range.start, cssHover.range.end)) {
                    result = {
                        ...cssHover,
                        range: vueRange,
                    };
                }
            }
        }
        return result;
    }
}
exports.register = register;
function getHoverTexts(hover) {
    if (!hover) {
        return [];
    }
    if (typeof hover.contents === 'string') {
        return [hover.contents];
    }
    if (vscode.MarkupContent.is(hover.contents)) {
        return [hover.contents.value];
    }
    if (Array.isArray(hover.contents)) {
        return hover.contents;
    }
    return [hover.contents.value];
}
//# sourceMappingURL=hover.js.map