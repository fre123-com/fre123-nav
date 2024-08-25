"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSourceFiles = void 0;
const reactivity_1 = require("@vue/reactivity");
const untrack_1 = require("./utils/untrack");
const shared = require("@volar/shared");
const path = require("upath");
const localTypes = require("./utils/localTypes");
function createSourceFiles() {
    const _sourceFiles = (0, reactivity_1.shallowReactive)({});
    const sourceFiles = shared.createPathMap({
        delete: key => delete _sourceFiles[key],
        get: key => _sourceFiles[key],
        has: key => !!_sourceFiles[key],
        set: (key, value) => _sourceFiles[key] = value,
        clear: () => {
            for (var key in _sourceFiles) {
                if (_sourceFiles.hasOwnProperty(key)) {
                    delete _sourceFiles[key];
                }
            }
        },
        values: () => new Set(Object.values(_sourceFiles)).values(),
    });
    const all = (0, reactivity_1.computed)(() => Object.values(_sourceFiles));
    const uris = (0, reactivity_1.computed)(() => all.value.map(sourceFile => sourceFile.uri));
    const cssSourceMaps = (0, reactivity_1.computed)(() => {
        const map = new Map();
        for (const key in _sourceFiles) {
            const sourceFile = _sourceFiles[key];
            for (const sourceMap of sourceFile.refs.cssLsSourceMaps.value) {
                map.set(sourceMap.mappedDocument.uri, sourceMap);
            }
        }
        return map;
    });
    const htmlSourceMaps = (0, reactivity_1.computed)(() => {
        const map = new Map();
        for (const key in _sourceFiles) {
            const sourceFile = _sourceFiles[key];
            if (sourceFile.refs.sfcTemplate.htmlSourceMap.value) {
                const sourceMap = sourceFile.refs.sfcTemplate.htmlSourceMap.value;
                map.set(sourceMap.mappedDocument.uri, sourceMap);
            }
        }
        return map;
    });
    const tsRefs = {
        template: {
            documents: (0, reactivity_1.computed)(() => {
                const map = new Map();
                for (const key in _sourceFiles) {
                    const sourceFile = _sourceFiles[key];
                    for (const tsDoc of sourceFile.refs.templateLsDocuments.value) {
                        map.set(tsDoc.uri, tsDoc);
                    }
                }
                return map;
            }),
            teleports: (0, reactivity_1.computed)(() => {
                const map = new Map();
                for (const key in _sourceFiles) {
                    const sourceFile = _sourceFiles[key];
                    for (const sourceMap of sourceFile.refs.templateLsTeleports.value) {
                        map.set(sourceMap.mappedDocument.uri, sourceMap);
                    }
                }
                return map;
            }),
            sourceMaps: (0, reactivity_1.computed)(() => {
                const map = new Map();
                for (const key in _sourceFiles) {
                    const sourceFile = _sourceFiles[key];
                    for (const sourceMap of sourceFile.refs.templateLsSourceMaps.value) {
                        map.set(sourceMap.mappedDocument.uri, sourceMap);
                    }
                }
                return map;
            }),
            urisMapSourceFiles: (0, reactivity_1.computed)(() => {
                const map = new Map();
                for (const key in _sourceFiles) {
                    const sourceFile = _sourceFiles[key];
                    for (const tsDoc of sourceFile.refs.templateLsDocuments.value) {
                        map.set(tsDoc.uri, sourceFile);
                    }
                }
                return map;
            }),
        },
        script: {
            documents: (0, reactivity_1.computed)(() => {
                const map = new Map();
                for (const key in _sourceFiles) {
                    const sourceFile = _sourceFiles[key];
                    for (const tsDoc of sourceFile.refs.scriptLsDocuments.value) {
                        map.set(tsDoc.uri, tsDoc);
                    }
                }
                return map;
            }),
            teleports: (0, reactivity_1.computed)(() => {
                const map = new Map();
                for (const key in _sourceFiles) {
                    const sourceFile = _sourceFiles[key];
                    const sourceMap = sourceFile.refs.sfcScriptForScriptLs.teleportSourceMap.value;
                    map.set(sourceMap.mappedDocument.uri, sourceMap);
                }
                return map;
            }),
            sourceMaps: (0, reactivity_1.computed)(() => {
                const map = new Map();
                for (const key in _sourceFiles) {
                    const sourceFile = _sourceFiles[key];
                    for (const sourceMap of sourceFile.refs.scriptLsSourceMaps.value) {
                        map.set(sourceMap.mappedDocument.uri, sourceMap);
                    }
                }
                return map;
            }),
            urisMapSourceFiles: (0, reactivity_1.computed)(() => {
                const map = new Map();
                for (const key in _sourceFiles) {
                    const sourceFile = _sourceFiles[key];
                    for (const tsDoc of sourceFile.refs.scriptLsDocuments.value) {
                        map.set(tsDoc.uri, sourceFile);
                    }
                }
                return map;
            }),
        },
    };
    const dirs = (0, reactivity_1.computed)(() => [...new Set(uris.value.map(shared.uriToFsPath).map(path.dirname))]);
    return {
        getUris: (0, untrack_1.untrack)(() => uris.value),
        getDirs: (0, untrack_1.untrack)(() => dirs.value),
        getAll: (0, untrack_1.untrack)(() => all.value),
        get: (0, untrack_1.untrack)(sourceFiles.uriGet),
        set: (0, untrack_1.untrack)(sourceFiles.uriSet),
        delete: (0, untrack_1.untrack)(sourceFiles.uriDelete),
        getTsTeleports: (0, untrack_1.untrack)((lsType) => tsRefs[lsType].teleports.value),
        getTsDocuments: (0, untrack_1.untrack)((lsType) => tsRefs[lsType].documents.value),
        getTsSourceMaps: (0, untrack_1.untrack)((lsType) => tsRefs[lsType].sourceMaps.value),
        getSourceFileByTsUri: (0, untrack_1.untrack)((lsType, uri) => tsRefs[lsType].urisMapSourceFiles.value.get(uri)),
        getCssSourceMaps: (0, untrack_1.untrack)(() => cssSourceMaps.value),
        getHtmlSourceMaps: (0, untrack_1.untrack)(() => htmlSourceMaps.value),
        toTsLocations: (0, untrack_1.untrack)(function* (uri, start, end, filter, sourceMapFilter) {
            if (end === undefined)
                end = start;
            for (const lsType of ['script', 'template']) {
                const sourceFile = sourceFiles.uriGet(uri);
                if (sourceFile) {
                    for (const sourceMap of lsType === 'script' ? sourceFile.refs.scriptLsSourceMaps.value : sourceFile.refs.templateLsSourceMaps.value) {
                        if (sourceMapFilter && !sourceMapFilter(sourceMap))
                            continue;
                        for (const tsRange of sourceMap.getMappedRanges(start, end, filter)) {
                            yield {
                                lsType,
                                type: 'embedded-ts',
                                sourceMap,
                                uri: sourceMap.mappedDocument.uri,
                                range: tsRange[0],
                                data: tsRange[1],
                            };
                        }
                    }
                }
                else {
                    yield {
                        lsType,
                        type: 'source-ts',
                        uri,
                        range: {
                            start,
                            end,
                        },
                    };
                }
            }
        }),
        fromTsLocation: (0, untrack_1.untrack)(function* (lsType, uri, start, end, filter, sourceMapFilter) {
            if (uri.endsWith(`/${localTypes.typesFileName}`))
                return;
            if (end === undefined)
                end = start;
            const sourceMap = tsRefs[lsType].sourceMaps.value.get(uri);
            if (sourceMap) {
                if (sourceMapFilter && !sourceMapFilter(sourceMap))
                    return;
                for (const vueRange of sourceMap.getSourceRanges(start, end, filter)) {
                    yield {
                        type: 'embedded-ts',
                        sourceMap,
                        uri: sourceMap.sourceDocument.uri,
                        range: vueRange[0],
                        data: vueRange[1],
                    };
                }
            }
            else {
                yield {
                    type: 'source-ts',
                    uri,
                    range: {
                        start,
                        end,
                    },
                };
            }
        }),
        fromTsLocation2: (0, untrack_1.untrack)(function* (lsType, uri, start, end, filter, sourceMapFilter) {
            if (uri.endsWith(`/${localTypes.typesFileName}`))
                return;
            if (end === undefined)
                end = start;
            const sourceMap = tsRefs[lsType].sourceMaps.value.get(uri);
            if (sourceMap) {
                if (sourceMapFilter && !sourceMapFilter(sourceMap))
                    return;
                for (const vueRange of sourceMap.getSourceRanges(start, end, filter)) {
                    yield {
                        type: 'embedded-ts',
                        sourceMap,
                        uri: sourceMap.sourceDocument.uri,
                        range: vueRange[0],
                        data: vueRange[1],
                    };
                }
            }
            else {
                yield {
                    type: 'source-ts',
                    uri,
                    range: {
                        start,
                        end,
                    },
                };
            }
        }),
    };
}
exports.createSourceFiles = createSourceFiles;
//# sourceMappingURL=sourceFiles.js.map