"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const dedupe = require("../utils/dedupe");
const shared = require("@volar/shared");
function register({ sourceFiles, getCssLs, getTsLs }) {
    return {
        on: (uri, position) => {
            const tsResult = onTs(uri, position, 'definition');
            if (tsResult.length) {
                return dedupe.withLocationLinks([
                    ...tsResult,
                ]);
            }
            const cssResult = onCss(uri, position);
            return dedupe.withLocations([
                ...cssResult,
            ]);
        },
        onType: (uri, position) => {
            const tsResult = onTs(uri, position, 'typeDefinition');
            return dedupe.withLocationLinks([
                ...tsResult,
            ]);
        },
    };
    function onTs(uri, position, mode) {
        let vueResult = [];
        // vue -> ts
        for (const tsLoc of sourceFiles.toTsLocations(uri, position, position, data => !!data.capabilities.definitions)) {
            if (tsLoc.type === 'source-ts' && tsLoc.lsType !== 'script')
                continue;
            const loopChecker = dedupe.createLocationSet();
            const tsLs = getTsLs(tsLoc.lsType);
            let tsResult = [];
            withTeleports(tsLoc.uri, tsLoc.range.start, true);
            // ts -> vue
            const tempRange = { start: position, end: position };
            let originSelectionRange;
            for (const tsLoc_2 of tsResult) {
                if (tsLoc_2.originSelectionRange) {
                    for (const vueLoc of sourceFiles.fromTsLocation(tsLoc.lsType, tsLoc_2.originalUri, tsLoc_2.originSelectionRange.start, tsLoc_2.originSelectionRange.end)) {
                        if (shared.isInsideRange(vueLoc.range, tempRange)) {
                            originSelectionRange = vueLoc.range;
                            break;
                        }
                        originSelectionRange = vueLoc.range;
                    }
                }
                if (originSelectionRange)
                    break;
            }
            for (const tsLoc_2 of tsResult) {
                let targetUri;
                let targetRange;
                let targetSelectionRange;
                for (const vueLoc of sourceFiles.fromTsLocation(tsLoc.lsType, tsLoc_2.targetUri, tsLoc_2.targetRange.start, tsLoc_2.targetRange.end)) {
                    targetUri = vueLoc.uri;
                    targetRange = vueLoc.range;
                    break;
                }
                for (const vueLoc of sourceFiles.fromTsLocation(tsLoc.lsType, tsLoc_2.targetUri, tsLoc_2.targetSelectionRange.start, tsLoc_2.targetSelectionRange.end)) {
                    targetUri = vueLoc.uri;
                    targetSelectionRange = vueLoc.range;
                    break;
                }
                if (targetUri && (targetRange || targetSelectionRange)) {
                    vueResult.push({
                        targetUri,
                        targetRange: (targetRange !== null && targetRange !== void 0 ? targetRange : targetSelectionRange),
                        targetSelectionRange: (targetSelectionRange !== null && targetSelectionRange !== void 0 ? targetSelectionRange : targetRange),
                        originSelectionRange,
                    });
                }
                else if (tsLoc.lsType === 'script' && (tsLoc.type === 'source-ts' || tsLoc.data.vueTag === 'script' || tsLoc.data.vueTag === 'scriptSetup')) {
                    // fix https://github.com/johnsoncodehk/volar/issues/728
                    const targetSourceFile = sourceFiles.getSourceFileByTsUri(tsLoc.lsType, tsLoc_2.targetUri);
                    if (targetSourceFile) {
                        const targetDocument = targetSourceFile.getTextDocument();
                        const targetRange = {
                            start: targetDocument.positionAt(0),
                            end: targetDocument.positionAt(targetDocument.getText().length),
                        };
                        vueResult.push({
                            targetUri: targetSourceFile.uri,
                            targetRange: targetRange,
                            targetSelectionRange: targetRange,
                            originSelectionRange,
                        });
                    }
                }
            }
            function withTeleports(uri, position, isOriginal) {
                if (loopChecker.has({ uri: uri, range: { start: position, end: position } }))
                    return;
                loopChecker.add({ uri: uri, range: { start: position, end: position } });
                const tsLocs = mode === 'typeDefinition'
                    ? tsLs.findTypeDefinition(uri, position)
                    : tsLs.findDefinition(uri, position);
                tsResult = tsResult.concat(tsLocs.map(tsLoc => ({
                    ...tsLoc,
                    originalUri: uri,
                    isOriginal,
                })));
                for (const location of tsLocs) {
                    loopChecker.add({ uri: location.targetUri, range: location.targetSelectionRange });
                    const teleport = sourceFiles.getTsTeleports(tsLoc.lsType).get(location.targetUri);
                    if (!teleport)
                        continue;
                    if (!teleport.allowCrossFile
                        && sourceFiles.getSourceFileByTsUri(tsLoc.lsType, location.targetUri) !== sourceFiles.getSourceFileByTsUri(tsLoc.lsType, uri))
                        continue;
                    for (const [teleRange] of teleport.findTeleports(location.targetSelectionRange.start, location.targetSelectionRange.end, sideData => !!sideData.capabilities.definitions)) {
                        if (loopChecker.has({ uri: location.targetUri, range: teleRange }))
                            continue;
                        withTeleports(location.targetUri, teleRange.start, false);
                    }
                }
            }
        }
        return vueResult;
    }
    function onCss(uri, position) {
        let cssResult = [];
        let vueResult = [];
        const sourceFile = sourceFiles.get(uri);
        if (!sourceFile)
            return vueResult;
        // vue -> css
        for (const sourceMap of sourceFile.getCssSourceMaps()) {
            if (!sourceMap.stylesheet)
                continue;
            const cssLs = getCssLs(sourceMap.mappedDocument.languageId);
            if (!cssLs)
                continue;
            for (const [cssRange] of sourceMap.getMappedRanges(position)) {
                const cssLoc = cssLs.findDefinition(sourceMap.mappedDocument, cssRange.start, sourceMap.stylesheet);
                if (cssLoc) {
                    cssResult.push(cssLoc);
                }
            }
        }
        // css -> vue
        for (const cssLoc of cssResult) {
            const sourceMap = sourceFiles.getCssSourceMaps().get(cssLoc.uri);
            if (!sourceMap)
                continue;
            for (const [vueRange] of sourceMap.getSourceRanges(cssLoc.range.start, cssLoc.range.end)) {
                vueResult.push({
                    uri: sourceMap.sourceDocument.uri,
                    range: vueRange,
                });
            }
        }
        return vueResult;
    }
}
exports.register = register;
//# sourceMappingURL=definition.js.map