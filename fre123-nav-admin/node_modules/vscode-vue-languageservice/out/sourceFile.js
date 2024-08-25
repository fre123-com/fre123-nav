"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSourceFile = void 0;
const shared = require("@volar/shared");
const refSugarRanges_1 = require("@volar/vue-code-gen/out/parsers/refSugarRanges");
const scriptRanges_1 = require("@volar/vue-code-gen/out/parsers/scriptRanges");
const scriptSetupRanges_1 = require("@volar/vue-code-gen/out/parsers/scriptSetupRanges");
const reactivity_1 = require("@vue/reactivity");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const useSfcEntryForTemplateLs_1 = require("./use/useSfcEntryForTemplateLs");
const useSfcJsons_1 = require("./use/useSfcJsons");
const useSfcScript_1 = require("./use/useSfcScript");
const useSfcScriptGen_1 = require("./use/useSfcScriptGen");
const useSfcStyles_1 = require("./use/useSfcStyles");
const useSfcTemplate_1 = require("./use/useSfcTemplate");
const useSfcTemplateCompileResult_1 = require("./use/useSfcTemplateCompileResult");
const useSfcTemplateScript_1 = require("./use/useSfcTemplateScript");
const string_1 = require("./utils/string");
const untrack_1 = require("./utils/untrack");
function createSourceFile(uri, _content, _version, context) {
    // refs
    const content = (0, reactivity_1.ref)('');
    const version = (0, reactivity_1.ref)('');
    const descriptor = (0, reactivity_1.reactive)({
        template: null,
        script: null,
        scriptSetup: null,
        styles: [],
        customBlocks: [],
    });
    const lastUpdated = {
        template: false,
        script: false,
        scriptSetup: false,
    };
    const templateScriptData = (0, reactivity_1.reactive)({
        projectVersion: undefined,
        context: [],
        contextItems: [],
        components: [],
        componentItems: [],
        props: [],
        setupReturns: [],
    });
    // computeds
    const document = (0, reactivity_1.computed)(() => vscode_languageserver_textdocument_1.TextDocument.create(uri, 'vue', 0, content.value));
    const vueHtmlDocument = (0, reactivity_1.computed)(() => context.htmlLs.parseHTMLDocument(document.value));
    // use
    const sfcStyles = (0, useSfcStyles_1.useSfcStyles)(context, uri, document, (0, reactivity_1.computed)(() => descriptor.styles));
    const sfcJsons = (0, useSfcJsons_1.useSfcJsons)(uri, document, (0, reactivity_1.computed)(() => descriptor.customBlocks), context);
    const sfcTemplate = (0, useSfcTemplate_1.useSfcTemplate)(uri, document, (0, reactivity_1.computed)(() => descriptor.template), context);
    const sfcTemplateData = (0, reactivity_1.computed)(() => {
        if (sfcTemplate.pugDocument.value) {
            const pugDoc = sfcTemplate.pugDocument.value;
            return {
                sourceLang: 'pug',
                html: pugDoc.htmlCode,
                htmlTextDocument: pugDoc.htmlTextDocument,
                htmlToTemplate: (htmlStart, htmlEnd) => {
                    var _a;
                    const pugRange = (_a = pugDoc.sourceMap.getSourceRange(htmlStart, htmlEnd, data => !(data === null || data === void 0 ? void 0 : data.isEmptyTagCompletion))) === null || _a === void 0 ? void 0 : _a[0];
                    if (pugRange) {
                        return pugRange.start;
                    }
                },
            };
        }
        if (descriptor.template && sfcTemplate.textDocument.value && descriptor.template.lang === 'html') {
            return {
                sourceLang: 'html',
                html: descriptor.template.content,
                htmlTextDocument: sfcTemplate.textDocument.value,
                htmlToTemplate: (htmlStart, _) => htmlStart,
            };
        }
    });
    const sfcTemplateCompileResult = (0, useSfcTemplateCompileResult_1.useSfcTemplateCompileResult)((0, reactivity_1.computed)(() => { var _a; return (_a = sfcTemplateData.value) === null || _a === void 0 ? void 0 : _a.htmlTextDocument; }), context.compilerOptions);
    const sfcScript = (0, useSfcScript_1.useSfcScript)(uri, document, (0, reactivity_1.computed)(() => descriptor.script), context.modules.typescript);
    const sfcScriptSetup = (0, useSfcScript_1.useSfcScript)(uri, document, (0, reactivity_1.computed)(() => descriptor.scriptSetup), context.modules.typescript);
    const scriptRanges = (0, reactivity_1.computed)(() => sfcScript.ast.value
        ? (0, scriptRanges_1.parseScriptRanges)(context.modules.typescript, sfcScript.ast.value, !!descriptor.scriptSetup, false, false)
        : undefined);
    const scriptSetupRanges = (0, reactivity_1.computed)(() => sfcScriptSetup.ast.value
        ? (0, scriptSetupRanges_1.parseScriptSetupRanges)(context.modules.typescript, sfcScriptSetup.ast.value)
        : undefined);
    const sfcScriptForTemplateLs = (0, useSfcScriptGen_1.useSfcScriptGen)('template', uri, document, (0, reactivity_1.computed)(() => descriptor.script), (0, reactivity_1.computed)(() => descriptor.scriptSetup), (0, reactivity_1.computed)(() => scriptRanges.value), (0, reactivity_1.computed)(() => scriptSetupRanges.value), sfcTemplateCompileResult, (0, reactivity_1.computed)(() => sfcStyles.textDocuments.value), context.compilerOptions.experimentalCompatMode === 2);
    const sfcScriptForScriptLs = (0, useSfcScriptGen_1.useSfcScriptGen)('script', uri, document, (0, reactivity_1.computed)(() => descriptor.script), (0, reactivity_1.computed)(() => descriptor.scriptSetup), (0, reactivity_1.computed)(() => scriptRanges.value), (0, reactivity_1.computed)(() => scriptSetupRanges.value), sfcTemplateCompileResult, (0, reactivity_1.computed)(() => sfcStyles.textDocuments.value), context.compilerOptions.experimentalCompatMode === 2);
    const sfcEntryForTemplateLs = (0, useSfcEntryForTemplateLs_1.useSfcEntryForTemplateLs)(uri, document, (0, reactivity_1.computed)(() => descriptor.script), (0, reactivity_1.computed)(() => descriptor.scriptSetup), (0, reactivity_1.computed)(() => descriptor.template), (0, reactivity_1.computed)(() => !!sfcScriptForTemplateLs.textDocumentTs.value), context.compilerOptions.experimentalCompatMode === 2);
    const sfcTemplateScript = (0, useSfcTemplateScript_1.useSfcTemplateScript)(uri, document, (0, reactivity_1.computed)(() => descriptor.template), (0, reactivity_1.computed)(() => descriptor.scriptSetup), (0, reactivity_1.computed)(() => scriptSetupRanges.value), (0, reactivity_1.computed)(() => descriptor.styles), templateScriptData, sfcStyles.textDocuments, sfcStyles.sourceMaps, sfcTemplateData, sfcTemplateCompileResult, (0, reactivity_1.computed)(() => sfcStyles.textDocuments.value), sfcScriptForScriptLs.lang, context);
    const sfcRefSugarRanges = (0, reactivity_1.computed)(() => (sfcScriptSetup.ast.value ? {
        refs: (0, refSugarRanges_1.parseRefSugarDeclarationRanges)(context.modules.typescript, sfcScriptSetup.ast.value, ['$ref', '$computed', '$shallowRef', '$fromRefs']),
        raws: (0, refSugarRanges_1.parseRefSugarCallRanges)(context.modules.typescript, sfcScriptSetup.ast.value, ['$raw', '$fromRefs']),
    } : undefined));
    // getters
    const cssLsDocuments = (0, reactivity_1.computed)(() => [
        sfcTemplateScript.cssTextDocument.value,
        ...sfcStyles.textDocuments.value,
    ].filter(shared.notEmpty));
    const cssLsSourceMaps = (0, reactivity_1.computed)(() => [
        sfcTemplateScript.cssSourceMap.value,
        ...sfcStyles.sourceMaps.value,
    ].filter(shared.notEmpty));
    const templateLsSourceMaps = (0, reactivity_1.computed)(() => [
        sfcScriptForTemplateLs.sourceMap.value,
        sfcTemplateScript.sourceMap.value,
        sfcEntryForTemplateLs.sourceMap.value,
    ].filter(shared.notEmpty));
    const scriptLsSourceMaps = (0, reactivity_1.computed)(() => [
        sfcScriptForScriptLs.sourceMap.value,
    ].filter(shared.notEmpty));
    const templateLsDocuments = (0, reactivity_1.computed)(() => [
        sfcEntryForTemplateLs.textDocument.value,
        sfcScriptForTemplateLs.textDocument.value,
        sfcScriptForTemplateLs.textDocumentTs.value,
        sfcTemplateScript.textDocument.value,
    ].filter(shared.notEmpty));
    const scriptLsDocuments = (0, reactivity_1.computed)(() => [
        sfcScriptForScriptLs.textDocument.value,
    ].filter(shared.notEmpty));
    const tsSourceMaps = (0, reactivity_1.computed)(() => [
        sfcScriptForScriptLs.sourceMap.value,
        ...templateLsSourceMaps.value,
    ]);
    const templateLsTeleports = (0, reactivity_1.computed)(() => [
        sfcTemplateScript.teleportSourceMap.value,
        sfcScriptForTemplateLs.teleportSourceMap.value,
    ].filter(shared.notEmpty));
    update(_content, _version);
    return {
        uri,
        getVersion: (0, untrack_1.untrack)(() => version.value),
        getTemplateTagNames: (0, untrack_1.untrack)(() => { var _a; return (_a = sfcTemplateScript.templateCodeGens.value) === null || _a === void 0 ? void 0 : _a.tagNames; }),
        getTemplateAttrNames: (0, untrack_1.untrack)(() => { var _a; return (_a = sfcTemplateScript.templateCodeGens.value) === null || _a === void 0 ? void 0 : _a.attrNames; }),
        getTextDocument: (0, untrack_1.untrack)(() => document.value),
        getTemplateScriptDocument: (0, untrack_1.untrack)(() => sfcTemplateScript.textDocument.value),
        update: (0, untrack_1.untrack)(update),
        updateTemplateScript: (0, untrack_1.untrack)(updateTemplateScript),
        getScriptTsDocument: (0, untrack_1.untrack)(() => sfcScriptForScriptLs.textDocument.value),
        getScriptTsSourceMap: (0, untrack_1.untrack)(() => sfcScriptForScriptLs.sourceMap.value),
        getTsSourceMaps: (0, untrack_1.untrack)(() => tsSourceMaps.value),
        getCssSourceMaps: (0, untrack_1.untrack)(() => cssLsSourceMaps.value),
        getJsonSourceMaps: (0, untrack_1.untrack)(() => sfcJsons.sourceMaps.value),
        getHtmlSourceMaps: (0, untrack_1.untrack)(() => sfcTemplate.htmlSourceMap.value ? [sfcTemplate.htmlSourceMap.value] : []),
        getPugSourceMaps: (0, untrack_1.untrack)(() => sfcTemplate.pugSourceMap.value ? [sfcTemplate.pugSourceMap.value] : []),
        getTemplateScriptData: (0, untrack_1.untrack)(() => templateScriptData),
        getDescriptor: (0, untrack_1.untrack)(() => descriptor),
        getScriptAst: (0, untrack_1.untrack)(() => sfcScript.ast.value),
        getScriptSetupAst: (0, untrack_1.untrack)(() => sfcScriptSetup.ast.value),
        getVueHtmlDocument: (0, untrack_1.untrack)(() => vueHtmlDocument.value),
        getScriptSetupData: (0, untrack_1.untrack)(() => scriptSetupRanges.value),
        docLsScripts: (0, untrack_1.untrack)(() => ({
            documents: [sfcScript.textDocument.value, sfcScriptSetup.textDocument.value].filter(shared.notEmpty),
            sourceMaps: [sfcScript.sourceMap.value, sfcScriptSetup.sourceMap.value].filter(shared.notEmpty),
        })),
        getTemplateFormattingScript: (0, untrack_1.untrack)(() => ({
            document: sfcTemplateScript.textDocumentForFormatting.value,
            sourceMap: sfcTemplateScript.sourceMapForFormatting.value,
        })),
        getSfcRefSugarRanges: (0, untrack_1.untrack)(() => sfcRefSugarRanges.value),
        refs: {
            document,
            descriptor,
            lastUpdated,
            sfcJsons,
            sfcTemplate,
            sfcTemplateData,
            sfcTemplateCompileResult,
            sfcTemplateScript,
            sfcEntryForTemplateLs,
            sfcScriptForScriptLs,
            sfcScriptForTemplateLs,
            templateScriptData,
            cssLsDocuments,
            cssLsSourceMaps,
            scriptLsDocuments,
            scriptLsSourceMaps,
            templateLsDocuments,
            templateLsSourceMaps,
            templateLsTeleports,
        },
    };
    function update(newContent, newVersion) {
        var _a, _b;
        const scriptLang_1 = sfcScriptForScriptLs.textDocument.value.languageId;
        const scriptText_1 = sfcScriptForScriptLs.textDocument.value.getText();
        const templateScriptVersion_1 = (_a = sfcTemplateScript.textDocument.value) === null || _a === void 0 ? void 0 : _a.version;
        content.value = newContent;
        version.value = newVersion;
        const parsedSfc = shared.parseSfc(newContent, vueHtmlDocument.value);
        updateTemplate(parsedSfc['template']);
        updateScript(parsedSfc['script']);
        updateScriptSetup(parsedSfc['scriptSetup']);
        updateStyles(parsedSfc['styles']);
        updateCustomBlocks(parsedSfc['customBlocks']);
        sfcTemplateScript.update(); // TODO
        const scriptLang_2 = sfcScriptForScriptLs.textDocument.value.languageId;
        const scriptText_2 = sfcScriptForScriptLs.textDocument.value.getText();
        const templateScriptVersion_2 = (_b = sfcTemplateScript.textDocument.value) === null || _b === void 0 ? void 0 : _b.version;
        return {
            scriptContentUpdated: lastUpdated.script || lastUpdated.scriptSetup,
            scriptUpdated: scriptLang_1 !== scriptLang_2 || scriptText_1 !== scriptText_2,
            templateScriptUpdated: templateScriptVersion_1 !== templateScriptVersion_2,
        };
        function updateTemplate(newData) {
            var _a, _b;
            lastUpdated.template = ((_a = descriptor.template) === null || _a === void 0 ? void 0 : _a.lang) !== (newData === null || newData === void 0 ? void 0 : newData.lang)
                || ((_b = descriptor.template) === null || _b === void 0 ? void 0 : _b.content) !== (newData === null || newData === void 0 ? void 0 : newData.content);
            if (descriptor.template && newData) {
                updateBlock(descriptor.template, newData);
            }
            else {
                descriptor.template = newData;
            }
        }
        function updateScript(newData) {
            var _a, _b;
            lastUpdated.script = ((_a = descriptor.script) === null || _a === void 0 ? void 0 : _a.lang) !== (newData === null || newData === void 0 ? void 0 : newData.lang)
                || ((_b = descriptor.script) === null || _b === void 0 ? void 0 : _b.content) !== (newData === null || newData === void 0 ? void 0 : newData.content);
            if (descriptor.script && newData) {
                updateBlock(descriptor.script, newData);
            }
            else {
                descriptor.script = newData;
            }
        }
        function updateScriptSetup(newData) {
            var _a, _b;
            lastUpdated.scriptSetup = ((_a = descriptor.scriptSetup) === null || _a === void 0 ? void 0 : _a.lang) !== (newData === null || newData === void 0 ? void 0 : newData.lang)
                || ((_b = descriptor.scriptSetup) === null || _b === void 0 ? void 0 : _b.content) !== (newData === null || newData === void 0 ? void 0 : newData.content);
            if (descriptor.scriptSetup && newData) {
                updateBlock(descriptor.scriptSetup, newData);
            }
            else {
                descriptor.scriptSetup = newData;
            }
        }
        function updateStyles(newDataArr) {
            for (let i = 0; i < newDataArr.length; i++) {
                const newData = newDataArr[i];
                if (descriptor.styles.length > i) {
                    updateBlock(descriptor.styles[i], newData);
                }
                else {
                    descriptor.styles.push(newData);
                }
            }
            while (descriptor.styles.length > newDataArr.length) {
                descriptor.styles.pop();
            }
        }
        function updateCustomBlocks(newDataArr) {
            for (let i = 0; i < newDataArr.length; i++) {
                const newData = newDataArr[i];
                if (descriptor.customBlocks.length > i) {
                    updateBlock(descriptor.customBlocks[i], newData);
                }
                else {
                    descriptor.customBlocks.push(newData);
                }
            }
            while (descriptor.customBlocks.length > newDataArr.length) {
                descriptor.customBlocks.pop();
            }
        }
        function updateBlock(oldBlock, newBlock) {
            for (let key in newBlock) {
                oldBlock[key] = newBlock[key];
            }
        }
    }
    function updateTemplateScript(templateTsLs) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const newVersion = (_b = (_a = templateTsLs.__internal__.host).getProjectVersion) === null || _b === void 0 ? void 0 : _b.call(_a);
        if (templateScriptData.projectVersion === newVersion) {
            return false;
        }
        templateScriptData.projectVersion = newVersion;
        const options = {
            includeCompletionsWithInsertText: true, // if missing, { 'aaa-bbb': any, ccc: any } type only has result ['ccc']
        };
        const doc = sfcEntryForTemplateLs.textDocument.value;
        const docText = doc.getText();
        const context = docText.indexOf(string_1.SearchTexts.Context) >= 0 ? (_d = (_c = templateTsLs.__internal__.doCompleteSync(doc.uri, doc.positionAt(docText.indexOf(string_1.SearchTexts.Context)), options)) === null || _c === void 0 ? void 0 : _c.items) !== null && _d !== void 0 ? _d : [] : [];
        let components = docText.indexOf(string_1.SearchTexts.Components) >= 0 ? (_f = (_e = templateTsLs.__internal__.doCompleteSync(doc.uri, doc.positionAt(docText.indexOf(string_1.SearchTexts.Components)), options)) === null || _e === void 0 ? void 0 : _e.items) !== null && _f !== void 0 ? _f : [] : [];
        const props = docText.indexOf(string_1.SearchTexts.Props) >= 0 ? (_h = (_g = templateTsLs.__internal__.doCompleteSync(doc.uri, doc.positionAt(docText.indexOf(string_1.SearchTexts.Props)), options)) === null || _g === void 0 ? void 0 : _g.items) !== null && _h !== void 0 ? _h : [] : [];
        const setupReturns = docText.indexOf(string_1.SearchTexts.SetupReturns) >= 0 ? (_k = (_j = templateTsLs.__internal__.doCompleteSync(doc.uri, doc.positionAt(docText.indexOf(string_1.SearchTexts.SetupReturns)), options)) === null || _j === void 0 ? void 0 : _j.items) !== null && _k !== void 0 ? _k : [] : [];
        components = components.filter(entry => {
            const name = entry.data.name;
            return name.indexOf('$') === -1 && !name.startsWith('_');
        });
        const contextNames = context.map(entry => entry.data.name);
        const componentNames = components.map(entry => entry.data.name);
        const propNames = props.map(entry => entry.data.name);
        const setupReturnNames = setupReturns.map(entry => entry.data.name);
        let dirty = false;
        if (!shared.eqSet(new Set(contextNames), new Set(templateScriptData.context))) {
            templateScriptData.context = contextNames;
            templateScriptData.contextItems = context;
            dirty = true;
        }
        if (!shared.eqSet(new Set(componentNames), new Set(templateScriptData.components))) {
            templateScriptData.components = componentNames;
            templateScriptData.componentItems = components;
            dirty = true;
        }
        if (!shared.eqSet(new Set(propNames), new Set(templateScriptData.props))) {
            templateScriptData.props = propNames;
            dirty = true;
        }
        if (!shared.eqSet(new Set(setupReturnNames), new Set(templateScriptData.setupReturns))) {
            templateScriptData.setupReturns = setupReturnNames;
            dirty = true;
        }
        if (dirty) {
            sfcTemplateScript.update(); // TODO
        }
        return dirty;
    }
}
exports.createSourceFile = createSourceFile;
//# sourceMappingURL=sourceFile.js.map