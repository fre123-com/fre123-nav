"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const commands_1 = require("../commands");
function register({ sourceFiles }) {
    return (uri, options = {
        references: true,
        pugTool: true,
        scriptSetupTool: true,
    }) => {
        const sourceFile = sourceFiles.get(uri);
        if (!sourceFile)
            return;
        const document = sourceFile.getTextDocument();
        let result = [];
        if (options.references) {
            result = result.concat(getTsResult(sourceFile));
        }
        if (options.pugTool) {
            result = result.concat(getHtmlResult(sourceFile));
            result = result.concat(getPugResult(sourceFile));
        }
        if (options.scriptSetupTool) {
            result = result.concat(getScriptSetupConvertConvert(sourceFile));
            result = result.concat(getRefSugarConvert(sourceFile));
        }
        return result;
        function getTsResult(sourceFile) {
            const result = [];
            for (const sourceMap of sourceFile.getTsSourceMaps()) {
                for (const maped of sourceMap.mappings) {
                    if (!maped.data.capabilities.referencesCodeLens)
                        continue;
                    const data = {
                        lsType: sourceMap.lsType,
                        uri: uri,
                        offset: maped.sourceRange.start,
                        tsUri: sourceMap.mappedDocument.uri,
                        tsOffset: maped.mappedRange.start,
                    };
                    result.push({
                        range: {
                            start: document.positionAt(maped.sourceRange.start),
                            end: document.positionAt(maped.sourceRange.end),
                        },
                        data,
                    });
                }
            }
            return result;
        }
        function getScriptSetupConvertConvert(sourceFile) {
            const ranges = sourceFile.getSfcRefSugarRanges();
            if (ranges === null || ranges === void 0 ? void 0 : ranges.refs.length)
                return [];
            const result = [];
            const descriptor = sourceFile.getDescriptor();
            if (descriptor.scriptSetup) {
                result.push({
                    range: {
                        start: document.positionAt(descriptor.scriptSetup.startTagEnd),
                        end: document.positionAt(descriptor.scriptSetup.startTagEnd + descriptor.scriptSetup.content.length),
                    },
                    command: {
                        title: 'setup sugar ☑',
                        command: commands_1.Commands.UNUSE_SETUP_SUGAR,
                        arguments: [uri],
                    },
                });
            }
            else if (descriptor.script) {
                result.push({
                    range: {
                        start: document.positionAt(descriptor.script.startTagEnd),
                        end: document.positionAt(descriptor.script.startTagEnd + descriptor.script.content.length),
                    },
                    command: {
                        title: 'setup sugar ☐',
                        command: commands_1.Commands.USE_SETUP_SUGAR,
                        arguments: [uri],
                    },
                });
            }
            return result;
        }
        function getRefSugarConvert(sourceFile) {
            const result = [];
            const descriptor = sourceFile.getDescriptor();
            const ranges = sourceFile.getSfcRefSugarRanges();
            if (descriptor.scriptSetup && ranges) {
                result.push({
                    range: {
                        start: document.positionAt(descriptor.scriptSetup.startTagEnd),
                        end: document.positionAt(descriptor.scriptSetup.startTagEnd + descriptor.scriptSetup.content.length),
                    },
                    command: {
                        title: 'ref sugar (take 2) ' + (ranges.refs.length ? '☑' : '☐'),
                        command: ranges.refs.length ? commands_1.Commands.UNUSE_REF_SUGAR : commands_1.Commands.USE_REF_SUGAR,
                        arguments: [uri],
                    },
                });
            }
            return result;
        }
        function getHtmlResult(sourceFile) {
            const sourceMaps = sourceFile.getHtmlSourceMaps();
            for (const sourceMap of sourceMaps) {
                for (const maped of sourceMap.mappings) {
                    return getPugHtmlConvertCodeLens('html', {
                        start: sourceMap.sourceDocument.positionAt(maped.sourceRange.start),
                        end: sourceMap.sourceDocument.positionAt(maped.sourceRange.start),
                    });
                }
            }
            return [];
        }
        function getPugResult(sourceFile) {
            const sourceMaps = sourceFile.getPugSourceMaps();
            for (const sourceMap of sourceMaps) {
                for (const maped of sourceMap.mappings) {
                    return getPugHtmlConvertCodeLens('pug', {
                        start: sourceMap.sourceDocument.positionAt(maped.sourceRange.start),
                        end: sourceMap.sourceDocument.positionAt(maped.sourceRange.start),
                    });
                }
            }
            return [];
        }
        function getPugHtmlConvertCodeLens(current, range) {
            const result = [];
            result.push({
                range,
                command: {
                    title: 'pug ' + (current === 'pug' ? '☑' : '☐'),
                    command: current === 'pug' ? commands_1.Commands.PUG_TO_HTML : commands_1.Commands.HTML_TO_PUG,
                    arguments: [uri],
                },
            });
            return result;
        }
    };
}
exports.register = register;
//# sourceMappingURL=codeLens.js.map