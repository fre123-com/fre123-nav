"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgramProxy = void 0;
const ts = require("typescript/lib/tsserverlibrary");
const vue = require("vscode-vue-languageservice");
const path = require("path");
const shared = require("@volar/shared");
function createProgramProxy(options) {
    if (!options.options.noEmit && !options.options.emitDeclarationOnly)
        return doThrow('js emit is not support');
    if (!options.host)
        return doThrow('!options.host');
    if (!options.host.readDirectory)
        return doThrow('!options.host.readDirectory');
    const host = options.host;
    const readDirectory = options.host.readDirectory;
    const parseConfigHost = {
        useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
        readDirectory: (path, extensions, exclude, include, depth) => {
            return readDirectory(path, ['.vue'], exclude, include, depth);
        },
        fileExists: fileName => host.fileExists(fileName),
        readFile: fileName => host.readFile(fileName),
    };
    const fileNames = [
        ...options.rootNames,
        ...getVueFileNames(),
    ];
    const vueCompilerOptions = getVueCompilerOptions();
    const scriptSnapshots = new Map();
    const vueLsHost = {
        ...host,
        writeFile: undefined,
        getCompilationSettings: () => options.options,
        getVueCompilationSettings: () => vueCompilerOptions,
        getScriptFileNames: () => fileNames,
        getScriptVersion: () => '',
        getScriptSnapshot,
        getProjectVersion: () => '',
        getVueProjectVersion: () => '',
        getProjectReferences: () => options.projectReferences,
    };
    const vueLs = vue.createLanguageService({ typescript: ts }, vueLsHost);
    const program = vueLs.__internal__.tsProgramProxy;
    return program;
    function getVueFileNames() {
        const tsConfig = options.options.configFilePath;
        if (typeof tsConfig === 'string') {
            const tsConfigFile = ts.readJsonConfigFile(tsConfig, host.readFile);
            const { fileNames } = ts.parseJsonSourceFileConfigFileContent(tsConfigFile, parseConfigHost, path.dirname(tsConfig), options.options, path.basename(tsConfig));
            return fileNames;
        }
        return [];
    }
    function getVueCompilerOptions() {
        const tsConfig = options.options.configFilePath;
        if (typeof tsConfig === 'string') {
            return shared.createParsedCommandLine(ts, ts.sys, tsConfig).vueOptions;
        }
        return {};
    }
    function getScriptSnapshot(fileName) {
        const scriptSnapshot = scriptSnapshots.get(fileName);
        if (scriptSnapshot) {
            return scriptSnapshot;
        }
        if (host.fileExists(fileName)) {
            const fileContent = host.readFile(fileName);
            if (fileContent !== undefined) {
                const scriptSnapshot = ts.ScriptSnapshot.fromString(fileContent);
                scriptSnapshots.set(fileName, scriptSnapshot);
                return scriptSnapshot;
            }
        }
    }
}
exports.createProgramProxy = createProgramProxy;
function doThrow(msg) {
    console.error(msg);
    throw msg;
}
//# sourceMappingURL=proxy.js.map