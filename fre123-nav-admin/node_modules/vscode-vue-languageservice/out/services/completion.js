"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.eventModifiers = exports.vueTags = exports.wordPatterns = exports.getTriggerCharacters = void 0;
const shared = require("@volar/shared");
const transforms_1 = require("@volar/transforms");
const reactivity_1 = require("@vue/reactivity");
const shared_1 = require("@vue/shared");
const path = require("upath");
const ts2 = require("vscode-typescript-languageservice");
const vscode = require("vscode-languageserver");
const string_1 = require("../utils/string");
const untrack_1 = require("../utils/untrack");
const getEmbeddedDocument = require("./embeddedDocument");
const sourceMaps_1 = require("../utils/sourceMaps");
function getTriggerCharacters(tsVersion) {
    return {
        typescript: ts2.getTriggerCharacters(tsVersion),
        html: ['<', ':', '@', '.' /* Event Modifiers */, '/' /* path completion */],
        css: ['.', '@', '/' /* path completion */],
        json: ['"', ':'],
    };
}
exports.getTriggerCharacters = getTriggerCharacters;
exports.wordPatterns = {
    css: /(#?-?\d*\.\d\w*%?)|(::?[\w-]*(?=[^,{;]*[,{]))|(([@#.!])?[\w-?]+%?|[@#!.])/g,
    less: /(#?-?\d*\.\d\w*%?)|(::?[\w-]+(?=[^,{;]*[,{]))|(([@#.!])?[\w-?]+%?|[@#!.])/g,
    scss: /(#?-?\d*\.\d\w*%?)|(::?[\w-]*(?=[^,{;]*[,{]))|(([@$#.!])?[\w-?]+%?|[@#!$.])/g,
    postcss: /(#?-?\d*\.\d\w*%?)|(::?[\w-]*(?=[^,{;]*[,{]))|(([@$#.!])?[\w-?]+%?|[@#!$.])/g, // scss
};
exports.vueTags = [
    {
        name: 'template',
        attributes: [
            {
                name: 'lang',
                values: [
                    { name: 'html' },
                    { name: 'pug' },
                ],
            },
        ],
    },
    {
        name: 'script',
        attributes: [
            {
                name: 'lang',
                values: [
                    { name: 'js' },
                    { name: 'ts' },
                    { name: 'jsx' },
                    { name: 'tsx' },
                ],
            },
            { name: 'setup', valueSet: 'v' },
        ],
    },
    {
        name: 'style',
        attributes: [
            {
                name: 'lang',
                values: [
                    { name: 'css' },
                    { name: 'scss' },
                    { name: 'less' },
                ],
            },
            { name: 'scoped', valueSet: 'v' },
            { name: 'module', valueSet: 'v' },
        ],
    },
];
// https://v3.vuejs.org/api/directives.html#v-on
exports.eventModifiers = {
    stop: 'call event.stopPropagation().',
    prevent: 'call event.preventDefault().',
    capture: 'add event listener in capture mode.',
    self: 'only trigger handler if event was dispatched from this element.',
    // {keyAlias}: 'only trigger handler on certain keys.',
    once: 'trigger handler at most once.',
    left: 'only trigger handler for left button mouse events.',
    right: 'only trigger handler for right button mouse events.',
    middle: 'only trigger handler for middle button mouse events.',
    passive: 'attaches a DOM event with { passive: true }.',
};
function register({ modules: { html, emmet, typescript: ts }, sourceFiles, getTsLs, htmlLs, pugLs, getCssLs, jsonLs, documentContext, vueHost, templateTsLs, getHtmlDataProviders }, getScriptContentVersion) {
    const getEmbeddedDoc = getEmbeddedDocument.register(arguments[0]);
    let cache = undefined;
    const componentCompletionDataGetters = new WeakMap();
    return async (uri, position, context, 
    /** internal */
    isEnabledComponentAutoImport, 
    /** internal */
    getNameCases) => {
        var _a, _b, _c, _d, _e, _f;
        const sourceFile = sourceFiles.get(uri);
        const triggerCharacters = getTriggerCharacters(ts.version);
        if ((context === null || context === void 0 ? void 0 : context.triggerKind) === vscode.CompletionTriggerKind.TriggerForIncompleteCompletions && (cache === null || cache === void 0 ? void 0 : cache.uri) === uri) {
            if ((_a = cache.tsResult) === null || _a === void 0 ? void 0 : _a.isIncomplete) {
                cache.tsResult = await getTsResult();
            }
            if ((_b = cache.emmetResult) === null || _b === void 0 ? void 0 : _b.isIncomplete) {
                cache.emmetResult = sourceFile ? await getEmmetResult(sourceFile) : undefined;
            }
            if ((_c = cache.cssResult) === null || _c === void 0 ? void 0 : _c.isIncomplete) {
                cache.cssResult = sourceFile ? await getCssResult(sourceFile) : undefined;
            }
            if ((_d = cache.jsonResult) === null || _d === void 0 ? void 0 : _d.isIncomplete) {
                cache.jsonResult = sourceFile ? await getJsonResult(sourceFile) : undefined;
            }
            if ((_e = cache.htmlResult) === null || _e === void 0 ? void 0 : _e.isIncomplete) {
                cache.htmlResult = sourceFile ? await getHtmlResult(sourceFile) : undefined;
            }
            if ((_f = cache.vueResult) === null || _f === void 0 ? void 0 : _f.isIncomplete) {
                cache.vueResult = sourceFile ? await getVueResult(sourceFile) : undefined;
            }
            const lists = [
                cache.tsResult,
                cache.emmetResult,
                cache.cssResult,
                cache.htmlResult,
                cache.vueResult,
            ];
            return combineResults(...lists.filter(shared.notEmpty));
        }
        const emmetResult = sourceFile ? await getEmmetResult(sourceFile) : undefined;
        const tsResult = await getTsResult();
        cache = { uri, tsResult, emmetResult };
        if (tsResult === null || tsResult === void 0 ? void 0 : tsResult.items.length)
            return emmetResult ? combineResults(tsResult, emmetResult) : tsResult;
        // precede html for support inline css service
        const cssResult = sourceFile ? await getCssResult(sourceFile) : undefined;
        cache = { uri, cssResult, emmetResult };
        if (cssResult === null || cssResult === void 0 ? void 0 : cssResult.items.length)
            return emmetResult ? combineResults(cssResult, emmetResult) : cssResult;
        const jsonResult = sourceFile ? await getJsonResult(sourceFile) : undefined;
        cache = { uri, jsonResult, emmetResult };
        if (jsonResult === null || jsonResult === void 0 ? void 0 : jsonResult.items.length)
            return emmetResult ? combineResults(jsonResult, emmetResult) : jsonResult;
        const htmlResult = sourceFile ? await getHtmlResult(sourceFile) : undefined;
        cache = { uri, htmlResult, emmetResult };
        if (htmlResult === null || htmlResult === void 0 ? void 0 : htmlResult.items.length)
            return emmetResult ? combineResults(htmlResult, emmetResult) : htmlResult;
        const vueResult = sourceFile ? await getVueResult(sourceFile) : undefined;
        cache = { uri, vueResult, emmetResult };
        if (vueResult === null || vueResult === void 0 ? void 0 : vueResult.items.length)
            return emmetResult ? combineResults(vueResult, emmetResult) : vueResult;
        cache = { uri, emmetResult };
        return emmetResult;
        function combineResults(...lists) {
            return {
                isIncomplete: lists.some(list => list.isIncomplete),
                items: lists.map(list => list.items).flat(),
            };
        }
        async function getTsResult() {
            var _a;
            let result;
            if ((context === null || context === void 0 ? void 0 : context.triggerCharacter) && !triggerCharacters.typescript.includes(context.triggerCharacter)) {
                return result;
            }
            for (const tsLoc of sourceFiles.toTsLocations(uri, position, position, data => !!data.capabilities.completion)) {
                if (tsLoc.type === 'source-ts' && tsLoc.lsType !== 'script')
                    continue;
                if (!result) {
                    result = {
                        isIncomplete: false,
                        items: [],
                    };
                }
                const inTemplate = tsLoc.type === 'embedded-ts' && tsLoc.data.vueTag === 'template';
                const options = {
                    triggerCharacter: context === null || context === void 0 ? void 0 : context.triggerCharacter,
                    triggerKind: context === null || context === void 0 ? void 0 : context.triggerKind,
                    includeCompletionsForModuleExports: true,
                    includeCompletionsWithInsertText: true,
                    ...(inTemplate ? {
                        quotePreference: 'single',
                        includeCompletionsForModuleExports: false,
                        includeCompletionsForImportStatements: false,
                    } : {}),
                };
                const tsComplete = await getTsLs(tsLoc.lsType).doComplete(tsLoc.uri, tsLoc.range.start, options);
                if (!tsComplete)
                    continue;
                if (tsComplete.isIncomplete) {
                    result.isIncomplete = true;
                }
                if (inTemplate) {
                    const sortTexts = (_a = shared.getTsCompletions(ts)) === null || _a === void 0 ? void 0 : _a.SortText;
                    if (sortTexts) {
                        tsComplete.items = tsComplete.items.filter(tsItem => {
                            if ((sortTexts.GlobalsOrKeywords !== undefined && tsItem.sortText === sortTexts.GlobalsOrKeywords)
                                || (sortTexts.DeprecatedGlobalsOrKeywords !== undefined && tsItem.sortText === sortTexts.DeprecatedGlobalsOrKeywords)) {
                                return (0, shared_1.isGloballyWhitelisted)(tsItem.label);
                            }
                            return true;
                        });
                    }
                }
                const vueItems = tsComplete.items.map(tsItem => {
                    const vueItem = (0, transforms_1.transformCompletionItem)(tsItem, tsRange => {
                        for (const vueLoc of sourceFiles.fromTsLocation(tsLoc.lsType, tsLoc.uri, tsRange.start, tsRange.end)) {
                            return vueLoc.range;
                        }
                    });
                    const data = {
                        lsType: tsLoc.lsType,
                        uri: uri,
                        docUri: tsLoc.uri,
                        mode: 'ts',
                        tsItem: tsItem,
                    };
                    vueItem.data = data;
                    return vueItem;
                });
                result.items = result.items.concat(vueItems);
            }
            if (result) {
                result.items = result.items.filter((result) => {
                    var _a;
                    return result.label.indexOf('__VLS_') === -1
                        && (!((_a = result.labelDetails) === null || _a === void 0 ? void 0 : _a.description) || result.labelDetails.description.indexOf('__VLS_') === -1);
                });
            }
            return result;
        }
        async function getHtmlResult(sourceFile) {
            var _a, _b, _c;
            let result = undefined;
            if ((context === null || context === void 0 ? void 0 : context.triggerCharacter) && !triggerCharacters.html.includes(context.triggerCharacter)) {
                return;
            }
            let nameCases = {
                tag: 'both',
                attr: 'kebabCase',
            };
            if (getNameCases) {
                const clientCases = await getNameCases(uri);
                nameCases.tag = clientCases.tagNameCase;
                nameCases.attr = clientCases.attrNameCase;
            }
            for (const sourceMap of [...sourceFile.getHtmlSourceMaps(), ...sourceFile.getPugSourceMaps()]) {
                const componentCompletion = getComponentCompletionData(sourceFile);
                const tags = [];
                const tsItems = new Map();
                const globalAttributes = [
                    { name: 'v-if' },
                    { name: 'v-else-if' },
                    { name: 'v-else', valueSet: 'v' },
                    { name: 'v-for' },
                ];
                const { contextItems } = sourceFile.getTemplateScriptData();
                for (const c of contextItems) {
                    const data = c.data;
                    const dir = (0, shared_1.hyphenate)(data.name);
                    if (dir.startsWith('v-')) {
                        const key = 'dir:' + dir;
                        globalAttributes.push({ name: dir, description: key });
                        tsItems.set(key, c);
                    }
                }
                for (const [_componentName, { item, bind, on }] of componentCompletion) {
                    const componentNames = nameCases.tag === 'kebabCase'
                        ? new Set([(0, shared_1.hyphenate)(_componentName)])
                        : nameCases.tag === 'pascalCase'
                            ? new Set([_componentName])
                            : new Set([(0, shared_1.hyphenate)(_componentName), _componentName]);
                    for (const componentName of componentNames) {
                        const attributes = componentName === '*' ? globalAttributes : [];
                        for (const prop of bind) {
                            const data = prop.data;
                            const name = nameCases.attr === 'camelCase' ? data.name : (0, shared_1.hyphenate)(data.name);
                            if ((0, shared_1.hyphenate)(name).startsWith('on-')) {
                                const propName = '@' +
                                    (name.startsWith('on-')
                                        ? name.substr('on-'.length)
                                        : (name['on'.length].toLowerCase() + name.substr('onX'.length)));
                                const propKey = componentName + ':' + propName;
                                attributes.push({
                                    name: propName,
                                    description: propKey,
                                });
                                tsItems.set(propKey, prop);
                            }
                            else {
                                const propName = name;
                                const propKey = componentName + ':' + propName;
                                attributes.push({
                                    name: propName,
                                    description: propKey,
                                }, {
                                    name: ':' + propName,
                                    description: propKey,
                                });
                                tsItems.set(propKey, prop);
                            }
                        }
                        for (const event of on) {
                            const data = event.data;
                            const name = nameCases.attr === 'camelCase' ? data.name : (0, shared_1.hyphenate)(data.name);
                            const propName = '@' + name;
                            const propKey = componentName + ':' + propName;
                            attributes.push({
                                name: propName,
                                description: propKey,
                            });
                            tsItems.set(propKey, event);
                        }
                        if (componentName !== '*') {
                            tags.push({
                                name: componentName,
                                description: componentName + ':',
                                attributes,
                            });
                        }
                        if (item) {
                            tsItems.set(componentName + ':', item);
                        }
                    }
                }
                const descriptor = sourceFile.getDescriptor();
                const enabledComponentAutoImport = (_a = (isEnabledComponentAutoImport ? await isEnabledComponentAutoImport() : undefined)) !== null && _a !== void 0 ? _a : true;
                if (enabledComponentAutoImport && (descriptor.script || descriptor.scriptSetup)) {
                    for (const vueFile of sourceFiles.getAll()) {
                        let baseName = path.basename(vueFile.uri, '.vue');
                        if (baseName.toLowerCase() === 'index') {
                            baseName = path.basename(path.dirname(vueFile.uri));
                        }
                        const componentName_1 = (0, shared_1.hyphenate)(baseName);
                        const componentName_2 = (0, shared_1.capitalize)((0, shared_1.camelize)(baseName));
                        let i = '';
                        if (componentCompletion.has(componentName_1) || componentCompletion.has(componentName_2)) {
                            i = 1;
                            while (componentCompletion.has(componentName_1 + i) || componentCompletion.has(componentName_2 + i)) {
                                i++;
                            }
                        }
                        tags.push({
                            name: (nameCases.tag === 'kebabCase' ? componentName_1 : componentName_2) + i,
                            description: vueFile.uri,
                            attributes: [],
                        });
                    }
                }
                const dataProvider = html.newHTMLDataProvider(uri, {
                    version: 1.1,
                    tags,
                    globalAttributes,
                });
                htmlLs.setDataProviders(true, [...getHtmlDataProviders(), dataProvider]);
                for (const [htmlRange] of sourceMap.getMappedRanges(position)) {
                    if (!result) {
                        result = {
                            isIncomplete: false,
                            items: [],
                        };
                    }
                    const htmlResult = sourceMap.language === 'html'
                        ? await htmlLs.doComplete2(sourceMap.mappedDocument, htmlRange.start, sourceMap.htmlDocument, documentContext)
                        : await pugLs.doComplete(sourceMap.pugDocument, htmlRange.start, documentContext);
                    if (!htmlResult)
                        continue;
                    if (htmlResult.isIncomplete) {
                        result.isIncomplete = true;
                    }
                    const replacement = getReplacement(htmlResult, sourceMap.mappedDocument);
                    if (replacement) {
                        const isEvent = replacement.text.startsWith('@') || replacement.text.startsWith('v-on:');
                        const hasModifier = replacement.text.includes('.');
                        if (isEvent && hasModifier) {
                            const modifiers = replacement.text.split('.').slice(1);
                            const textWithoutModifier = path.trimExt(replacement.text, [], 999);
                            for (const modifier in exports.eventModifiers) {
                                if (modifiers.includes(modifier))
                                    continue;
                                const modifierDes = exports.eventModifiers[modifier];
                                const newItem = {
                                    label: modifier,
                                    filterText: textWithoutModifier + '.' + modifier,
                                    documentation: modifierDes,
                                    textEdit: {
                                        range: replacement.textEdit.range,
                                        newText: textWithoutModifier + '.' + modifier,
                                    },
                                    kind: vscode.CompletionItemKind.EnumMember,
                                };
                                htmlResult.items.push(newItem);
                            }
                        }
                    }
                    let vueItems = htmlResult.items.map(htmlItem => (0, transforms_1.transformCompletionItem)(htmlItem, htmlRange => { var _a; return (_a = sourceMap.getSourceRange(htmlRange.start, htmlRange.end)) === null || _a === void 0 ? void 0 : _a[0]; }));
                    const htmlItemsMap = new Map();
                    for (const entry of htmlResult.items) {
                        htmlItemsMap.set(entry.label, entry);
                    }
                    for (const vueItem of vueItems) {
                        const documentation = typeof vueItem.documentation === 'string' ? vueItem.documentation : (_b = vueItem.documentation) === null || _b === void 0 ? void 0 : _b.value;
                        const importFile = (documentation === null || documentation === void 0 ? void 0 : documentation.startsWith('file://')) ? sourceFiles.get(documentation) : undefined;
                        if (importFile) {
                            const filePath = shared.uriToFsPath(importFile.uri);
                            const rPath = path.relative(vueHost.getCurrentDirectory(), filePath);
                            vueItem.documentation = undefined;
                            vueItem.labelDetails = { description: rPath };
                            vueItem.filterText = vueItem.label + ' ' + rPath;
                            vueItem.detail = rPath;
                            vueItem.kind = vscode.CompletionItemKind.File;
                            vueItem.sortText = '\u0003' + vueItem.sortText;
                            const data = {
                                mode: 'autoImport',
                                uri: uri,
                                importUri: importFile.uri,
                            };
                            vueItem.data = data;
                        }
                        else {
                            const tsItem = documentation ? tsItems.get(documentation) : undefined;
                            if (tsItem) {
                                vueItem.documentation = undefined;
                            }
                            if (vueItem.label.startsWith(':') || vueItem.label.startsWith('@')) {
                                if (!(documentation === null || documentation === void 0 ? void 0 : documentation.startsWith('*:'))) {
                                    vueItem.sortText = '\u0000' + vueItem.sortText;
                                }
                                if (tsItem) {
                                    if (vueItem.label.startsWith(':')) {
                                        vueItem.kind = vscode.CompletionItemKind.Property;
                                    }
                                    else {
                                        vueItem.kind = vscode.CompletionItemKind.Event;
                                    }
                                }
                            }
                            else if (vueItem.label === 'v-if'
                                || vueItem.label === 'v-else-if'
                                || vueItem.label === 'v-else'
                                || vueItem.label === 'v-for') {
                                vueItem.kind = vscode.CompletionItemKind.Method;
                                vueItem.sortText = '\u0003' + vueItem.sortText;
                            }
                            else if (vueItem.label.startsWith('v-')) {
                                vueItem.kind = vscode.CompletionItemKind.Function;
                                vueItem.sortText = '\u0002' + vueItem.sortText;
                            }
                            else {
                                vueItem.sortText = '\u0001' + vueItem.sortText;
                            }
                            const data = {
                                mode: 'html',
                                uri: uri,
                                docUri: sourceMap.mappedDocument.uri,
                                tsItem: tsItem,
                            };
                            vueItem.data = data;
                        }
                    }
                    {
                        const temp = new Map();
                        for (const item of vueItems) {
                            const data = item.data;
                            if ((data === null || data === void 0 ? void 0 : data.mode) === 'autoImport' && data.importUri === sourceFile.uri) { // don't import itself
                                continue;
                            }
                            if (!((_c = temp.get(item.label)) === null || _c === void 0 ? void 0 : _c.documentation)) { // filter HTMLAttributes
                                temp.set(item.label, item);
                            }
                        }
                        vueItems = [...temp.values()];
                    }
                    result.items = result.items.concat(vueItems);
                }
                htmlLs.setDataProviders(true, getHtmlDataProviders());
            }
            return result;
        }
        async function getCssResult(sourceFile) {
            var _a, _b, _c;
            let result = undefined;
            if ((context === null || context === void 0 ? void 0 : context.triggerCharacter) && !triggerCharacters.css.includes(context.triggerCharacter)) {
                return;
            }
            for (const sourceMap of sourceFile.getCssSourceMaps()) {
                for (const [cssRange] of sourceMap.getMappedRanges(position)) {
                    if (!result) {
                        result = {
                            isIncomplete: false,
                            items: [],
                        };
                    }
                    const cssLs = getCssLs(sourceMap.mappedDocument.languageId);
                    if (!cssLs || !sourceMap.stylesheet)
                        continue;
                    const wordPattern = (_a = exports.wordPatterns[sourceMap.mappedDocument.languageId]) !== null && _a !== void 0 ? _a : exports.wordPatterns.css;
                    const wordStart = (_b = shared.getWordRange(wordPattern, cssRange.end, sourceMap.mappedDocument)) === null || _b === void 0 ? void 0 : _b.start; // TODO: use end?
                    const wordRange = wordStart ? { start: wordStart, end: cssRange.end } : cssRange;
                    const settings = await ((_c = vueHost.getCssLanguageSettings) === null || _c === void 0 ? void 0 : _c.call(vueHost, sourceMap.mappedDocument));
                    const cssResult = await cssLs.doComplete2(sourceMap.mappedDocument, cssRange.start, sourceMap.stylesheet, documentContext, settings === null || settings === void 0 ? void 0 : settings.completion);
                    if (cssResult.isIncomplete) {
                        result.isIncomplete = true;
                    }
                    const data = {
                        uri: uri,
                        docUri: sourceMap.mappedDocument.uri,
                        mode: 'css',
                    };
                    const vueItems = cssResult.items.map(cssItem => {
                        var _a;
                        const newText = ((_a = cssItem.textEdit) === null || _a === void 0 ? void 0 : _a.newText) || cssItem.insertText || cssItem.label;
                        cssItem.textEdit = vscode.TextEdit.replace(wordRange, newText);
                        const vueItem = (0, transforms_1.transformCompletionItem)(cssItem, cssRange => { var _a; return (_a = sourceMap.getSourceRange(cssRange.start, cssRange.end)) === null || _a === void 0 ? void 0 : _a[0]; });
                        vueItem.data = data;
                        return vueItem;
                    });
                    result.items = result.items.concat(vueItems);
                }
            }
            return result;
        }
        async function getJsonResult(sourceFile) {
            let result = undefined;
            if ((context === null || context === void 0 ? void 0 : context.triggerCharacter) && !triggerCharacters.json.includes(context.triggerCharacter)) {
                return;
            }
            for (const sourceMap of sourceFile.getJsonSourceMaps()) {
                for (const [cssRange] of sourceMap.getMappedRanges(position)) {
                    if (!result) {
                        result = {
                            isIncomplete: false,
                            items: [],
                        };
                    }
                    const jsonResult = await jsonLs.doComplete(sourceMap.mappedDocument, cssRange.start, sourceMap.jsonDocument);
                    if (!jsonResult)
                        continue;
                    if (jsonResult.isIncomplete) {
                        result.isIncomplete = true;
                    }
                    const vueItems = jsonResult.items.map(jsonItem => {
                        const vueItem = (0, transforms_1.transformCompletionItem)(jsonItem, jsonRange => { var _a; return (_a = sourceMap.getSourceRange(jsonRange.start, jsonRange.end)) === null || _a === void 0 ? void 0 : _a[0]; });
                        return vueItem;
                    });
                    result.items = result.items.concat(vueItems);
                }
            }
            return result;
        }
        async function getVueResult(sourceFile) {
            const embededDoc = getEmbeddedDoc(uri, { start: position, end: position });
            if (embededDoc) {
                let syntax = shared.languageIdToSyntax(embededDoc.language);
                if (syntax === 'vue') {
                    const dataProvider = html.newHTMLDataProvider(uri, {
                        version: 1.1,
                        tags: exports.vueTags,
                    });
                    htmlLs.setDataProviders(false, [dataProvider]);
                    const result = await htmlLs.doComplete2(sourceFile.getTextDocument(), position, sourceFile.getVueHtmlDocument(), documentContext);
                    htmlLs.setDataProviders(true, getHtmlDataProviders());
                    return result;
                }
            }
        }
        async function getEmmetResult(sourceFile) {
            var _a;
            if (!vueHost.getEmmetConfig)
                return;
            const embededDoc = getEmbeddedDoc(uri, { start: position, end: position });
            if (embededDoc && !(embededDoc.sourceMap instanceof sourceMaps_1.TsSourceMap && embededDoc.sourceMap.lsType === 'template')) {
                const emmetConfig = await vueHost.getEmmetConfig(embededDoc.language);
                if (emmetConfig) {
                    let mode = emmet.getEmmetMode(embededDoc.language === 'vue' ? 'html' : embededDoc.language);
                    if (!mode)
                        return;
                    const doc = (_a = embededDoc.document) !== null && _a !== void 0 ? _a : sourceFile.getTextDocument();
                    const emmetResult = emmet.doComplete(doc, embededDoc.range.start, mode, emmetConfig);
                    if (emmetResult && embededDoc.sourceMap) {
                        return (0, transforms_1.transformCompletionList)(emmetResult, emmetRange => { var _a; return (_a = embededDoc.sourceMap.getSourceRange(emmetRange.start, emmetRange.end)) === null || _a === void 0 ? void 0 : _a[0]; });
                    }
                    return emmetResult;
                }
            }
        }
    };
    function getComponentCompletionData(sourceFile) {
        let getter = componentCompletionDataGetters.get(sourceFile);
        if (!getter) {
            getter = (0, untrack_1.untrack)(useComponentCompletionData(sourceFile));
            componentCompletionDataGetters.set(sourceFile, getter);
        }
        return getter();
    }
    function useComponentCompletionData(sourceFile) {
        const { sfcTemplateScript, templateScriptData, sfcEntryForTemplateLs, } = sourceFile.refs;
        const projectVersion = (0, reactivity_1.ref)();
        const usedTags = (0, reactivity_1.ref)(new Set());
        const result = (0, reactivity_1.computed)(() => {
            var _a, _b, _c, _d, _e, _f;
            { // watching
                projectVersion.value;
                usedTags.value;
            }
            const result = new Map();
            (0, reactivity_1.pauseTracking)();
            const doc = sfcTemplateScript.textDocument.value;
            const templateTagNames = sfcTemplateScript.templateCodeGens.value ? Object.keys(sfcTemplateScript.templateCodeGens.value.tagNames) : [];
            const entryDoc = sfcEntryForTemplateLs.textDocument.value;
            (0, reactivity_1.resetTracking)();
            if (doc && entryDoc) {
                const text = doc.getText();
                const tags_1 = templateScriptData.componentItems.map(item => ({ item, name: item.data.name }));
                const tags_2 = templateTagNames
                    .filter(tag => tag.indexOf('.') >= 0)
                    .map(tag => ({ name: tag, item: undefined }));
                for (const tag of [...tags_1, ...tags_2]) {
                    if (result.has(tag.name))
                        continue;
                    let bind = [];
                    let on = [];
                    {
                        const searchText = string_1.SearchTexts.PropsCompletion(tag.name);
                        let offset = text.indexOf(searchText);
                        if (offset >= 0) {
                            offset += searchText.length;
                            bind = (_b = (_a = templateTsLs.__internal__.doCompleteSync(doc.uri, doc.positionAt(offset))) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : [];
                        }
                    }
                    {
                        const searchText = string_1.SearchTexts.EmitCompletion(tag.name);
                        let offset = text.indexOf(searchText);
                        if (offset >= 0) {
                            offset += searchText.length;
                            on = (_d = (_c = templateTsLs.__internal__.doCompleteSync(doc.uri, doc.positionAt(offset))) === null || _c === void 0 ? void 0 : _c.items) !== null && _d !== void 0 ? _d : [];
                        }
                    }
                    result.set(tag.name, { item: tag.item, bind, on });
                }
                const globalBind = (_f = (_e = templateTsLs.__internal__.doCompleteSync(entryDoc.uri, entryDoc.positionAt(entryDoc.getText().indexOf(string_1.SearchTexts.GlobalAttrs)))) === null || _e === void 0 ? void 0 : _e.items) !== null && _f !== void 0 ? _f : [];
                result.set('*', { item: undefined, bind: globalBind, on: [] });
            }
            return result;
        });
        return () => {
            var _a, _b;
            projectVersion.value = getScriptContentVersion();
            const nowUsedTags = new Set(Object.keys((_b = (_a = sfcTemplateScript.templateCodeGens.value) === null || _a === void 0 ? void 0 : _a.tagNames) !== null && _b !== void 0 ? _b : {}));
            if (!shared.eqSet(usedTags.value, nowUsedTags)) {
                usedTags.value = nowUsedTags;
            }
            return result.value;
        };
    }
}
exports.register = register;
function getReplacement(list, doc) {
    for (const item of list.items) {
        if (item.textEdit && 'range' in item.textEdit) {
            return {
                item: item,
                textEdit: item.textEdit,
                text: doc.getText(item.textEdit.range)
            };
        }
    }
}
//# sourceMappingURL=completion.js.map