"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSfcTemplateScript = void 0;
const code_gen_1 = require("@volar/code-gen");
const shared = require("@volar/shared");
const templateGen = require("@volar/vue-code-gen/out/generators/template");
const cssClasses = require("../parsers/cssClasses");
const reactivity_1 = require("@vue/reactivity");
const upath = require("upath");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const SourceMaps = require("../utils/sourceMaps");
const string_1 = require("../utils/string");
function useSfcTemplateScript(vueUri, vueDoc, template, scriptSetup, scriptSetupRanges, styles, templateScriptData, styleDocuments, styleSourceMaps, templateData, sfcTemplateCompileResult, sfcStyles, scriptLang, context) {
    let version = 0;
    const vueFileName = upath.basename(shared.uriToFsPath(vueUri));
    const cssModuleClasses = (0, reactivity_1.computed)(() => styleDocuments.value.reduce((map, style) => {
        if (style.module) {
            map.set(style.module, cssClasses.parse(context.modules.css, [style], context));
        }
        return map;
    }, new Map()));
    const cssScopedClasses = (0, reactivity_1.computed)(() => cssClasses.parse(context.modules.css, styleDocuments.value.filter(style => style.scoped), context));
    const templateCodeGens = (0, reactivity_1.computed)(() => {
        var _a;
        if (!templateData.value)
            return;
        if (!((_a = sfcTemplateCompileResult.value) === null || _a === void 0 ? void 0 : _a.ast))
            return;
        return templateGen.generate(templateData.value.sourceLang, sfcTemplateCompileResult.value.ast, context.compilerOptions.experimentalCompatMode === 2, [...cssScopedClasses.value.values()].map(map => [...map.keys()]).flat(), templateData.value.htmlToTemplate, !!scriptSetup.value, {
            getEmitCompletion: string_1.SearchTexts.EmitCompletion,
            getPropsCompletion: string_1.SearchTexts.PropsCompletion,
        });
    });
    const data = (0, reactivity_1.computed)(() => {
        const codeGen = (0, code_gen_1.createCodeGen)();
        codeGen.addText(`import * as __VLS_types from './__VLS_types';\n`);
        codeGen.addText(`import { __VLS_options, __VLS_name, __VLS_component } from './${vueFileName}';\n`);
        writeImportTypes();
        codeGen.addText(`declare var __VLS_ctxRaw: InstanceType<typeof __VLS_component>;\n`);
        codeGen.addText(`declare var __VLS_ctx: __VLS_types.ExtractRawComponents<typeof __VLS_ctxRaw>;\n`);
        codeGen.addText(`declare var __VLS_vmUnwrap: typeof __VLS_options & { components: { } };\n`);
        /* Components */
        codeGen.addText('/* Components */\n');
        codeGen.addText('declare var __VLS_ownComponent: __VLS_types.SelfComponent<typeof __VLS_name, typeof __VLS_component & { __VLS_raw: typeof __VLS_component, __VLS_options: typeof __VLS_options, __VLS_slots: typeof __VLS_slots }>;\n');
        codeGen.addText('declare var __VLS_wrapComponents: __VLS_types.GlobalComponents & typeof __VLS_vmUnwrap.components & __VLS_types.PickComponents<typeof __VLS_ctxRaw> & typeof __VLS_ownComponent;\n'); // has __VLS_options
        codeGen.addText('declare var __VLS_rawComponents: __VLS_types.ConvertInvalidComponents<__VLS_types.ExtractRawComponents<typeof __VLS_wrapComponents>> & JSX.IntrinsicElements;\n'); // sort by priority
        /* CSS Module */
        codeGen.addText('/* CSS Module */\n');
        const cssModuleMappingsArr = [];
        for (const [moduleName, moduleClasses] of cssModuleClasses.value) {
            codeGen.addText(`declare var ${moduleName}: Record<string, string> & {\n`);
            cssModuleMappingsArr.push(writeCssClassProperties(moduleClasses, true));
            codeGen.addText('};\n');
        }
        /* Style Scoped */
        codeGen.addText('/* Style Scoped */\n');
        codeGen.addText('declare var __VLS_styleScopedClasses: {\n');
        const cssScopedMappings = writeCssClassProperties(cssScopedClasses.value, true);
        codeGen.addText('};\n');
        codeGen.addText(`{\n`);
        /* Props */
        codeGen.addText(`/* Props */\n`);
        const ctxMappings = writeProps();
        codeGen.addText(`/* CSS variable injection */\n`);
        writeCssVars();
        if (templateCodeGens.value) {
            (0, code_gen_1.margeCodeGen)(codeGen, templateCodeGens.value.codeGen);
        }
        codeGen.addText(`}\n`);
        codeGen.addText(`export default __VLS_slots;\n`);
        return {
            ...codeGen,
            cssModuleMappingsArr,
            cssScopedMappings,
            ctxMappings,
        };
        function writeImportTypes() {
            const bindingsArr = [];
            if (scriptSetupRanges.value && scriptSetup.value) {
                bindingsArr.push({
                    typeBindings: scriptSetupRanges.value.typeBindings,
                    content: scriptSetup.value.content,
                });
            }
            // if (scriptRanges.value && script.value) {
            // 	bindingsArr.push({
            // 		typeBindings: scriptRanges.value.typeBindings,
            // 		content: script.value.content,
            // 	});
            // }
            codeGen.addText('import {\n');
            for (const bindings of bindingsArr) {
                for (const typeBinding of bindings.typeBindings) {
                    const text = bindings.content.substring(typeBinding.start, typeBinding.end);
                    codeGen.addText(`__VLS_types_${text} as ${text},\n`);
                }
            }
            codeGen.addText(`} from './${vueFileName}.__VLS_script';\n`);
        }
        function writeCssClassProperties(data, patchRename) {
            const mappings = new Map();
            for (const [uri, classes] of data) {
                if (!mappings.has(uri)) {
                    mappings.set(uri, []);
                }
                for (const [className, ranges] of classes) {
                    mappings.get(uri).push({
                        tsRange: {
                            start: codeGen.getText().length + 1,
                            end: codeGen.getText().length + 1 + className.length,
                        },
                        cssRanges: [...ranges].map(range => ({
                            start: range[0],
                            end: range[1],
                        })),
                        mode: SourceMaps.Mode.Offset,
                        patchRename,
                    });
                    mappings.get(uri).push({
                        tsRange: {
                            start: codeGen.getText().length,
                            end: codeGen.getText().length + className.length + 2,
                        },
                        cssRanges: [...ranges].map(range => ({
                            start: range[0],
                            end: range[1],
                        })),
                        mode: SourceMaps.Mode.Totally,
                        patchRename,
                    });
                    codeGen.addText(`'${className}': string,\n`);
                }
            }
            return mappings;
        }
        function writeProps() {
            const propsSet = new Set(templateScriptData.props);
            const mappings = [];
            for (const propName of templateScriptData.context) {
                codeGen.addText(`declare let `);
                const templateSideRange = codeGen.addText(propName);
                codeGen.addText(`: typeof __VLS_ctx.`);
                const scriptSideRange = codeGen.addText(propName);
                codeGen.addText(`;`);
                mappings.push({
                    data: {
                        isAdditionalReference: false,
                        toSource: {
                            capabilities: {
                                definitions: true,
                                references: true,
                                rename: true,
                            },
                        },
                        toTarget: {
                            capabilities: {
                                definitions: true,
                                references: true,
                                rename: true,
                            },
                        },
                    },
                    mode: SourceMaps.Mode.Offset,
                    sourceRange: scriptSideRange,
                    mappedRange: templateSideRange,
                });
                if (propsSet.has(propName)) {
                    codeGen.addText(` __VLS_options.props.`);
                    const scriptSideRange2 = codeGen.addText(propName);
                    codeGen.addText(`;`);
                    mappings.push({
                        data: {
                            isAdditionalReference: true,
                            toSource: {
                                capabilities: {
                                    definitions: true,
                                    references: true,
                                    rename: true,
                                },
                            },
                            toTarget: {
                                capabilities: {
                                    definitions: true,
                                    references: true,
                                    rename: true,
                                },
                            },
                        },
                        mode: SourceMaps.Mode.Offset,
                        sourceRange: scriptSideRange2,
                        mappedRange: templateSideRange,
                    });
                }
                codeGen.addText(`\n`);
            }
            return mappings;
        }
        function writeCssVars() {
            for (let i = 0; i < sfcStyles.value.length; i++) {
                const style = sfcStyles.value[i];
                const docText = style.textDocument.getText();
                for (const cssBind of style.binds) {
                    const bindText = docText.substring(cssBind.start, cssBind.end);
                    codeGen.addCode(bindText, cssBind, SourceMaps.Mode.Offset, {
                        vueTag: 'style',
                        vueTagIndex: i,
                        capabilities: {
                            basic: true,
                            references: true,
                            definitions: true,
                            diagnostic: true,
                            rename: true,
                            completion: true,
                            semanticTokens: true,
                        },
                    });
                    codeGen.addText(';\n');
                }
            }
        }
    });
    const sourceMap = (0, reactivity_1.computed)(() => {
        var _a;
        if (textDoc.value) {
            const sourceMap = new SourceMaps.TsSourceMap(vueDoc.value, textDoc.value, 'template', true, {
                foldingRanges: false,
                formatting: false,
                documentSymbol: false,
                codeActions: false,
            }, data.value.getMappings(parseMappingSourceRange));
            for (const [uri, mappings] of [
                ...data.value.cssModuleMappingsArr.flatMap(m => [...m]),
                ...data.value.cssScopedMappings,
            ]) {
                const cssSourceMap = styleSourceMaps.value.find(sourceMap => sourceMap.mappedDocument.uri === uri);
                if (!cssSourceMap)
                    continue;
                for (const maped of mappings) {
                    const tsRange = maped.tsRange;
                    for (const cssRange of maped.cssRanges) {
                        const vueRange = (_a = cssSourceMap.getSourceRange(cssRange.start, cssRange.end)) === null || _a === void 0 ? void 0 : _a[0];
                        if (!vueRange)
                            continue;
                        sourceMap.mappings.push({
                            data: {
                                vueTag: 'style',
                                capabilities: {
                                    references: true,
                                    rename: true,
                                    referencesCodeLens: maped.mode === SourceMaps.Mode.Totally, // has 2 modes
                                },
                                beforeRename: maped.patchRename ? beforeCssRename : undefined,
                                doRename: maped.patchRename ? doCssRename : undefined,
                            },
                            mode: maped.mode,
                            sourceRange: vueRange,
                            mappedRange: tsRange,
                        });
                    }
                }
            }
            return sourceMap;
        }
    });
    const formatSourceMap = (0, reactivity_1.computed)(() => {
        if (templateCodeGens.value && formatTextDoc.value && template.value) {
            const sourceMap = new SourceMaps.TsSourceMap(vueDoc.value, formatTextDoc.value, 'template', true, {
                foldingRanges: false,
                formatting: true,
                documentSymbol: false,
                codeActions: false,
            }, templateCodeGens.value.formatCodeGen.getMappings(parseMappingSourceRange));
            return sourceMap;
        }
    });
    const cssTextDocument = (0, reactivity_1.computed)(() => {
        if (templateCodeGens.value && template.value) {
            const textDocument = vscode_languageserver_textdocument_1.TextDocument.create(vueUri + '.template.css', 'css', 0, templateCodeGens.value.cssCodeGen.getText());
            const stylesheet = context.getCssLs('css').parseStylesheet(textDocument);
            return {
                textDocument,
                stylesheet,
                links: [],
                module: false,
                scoped: false,
            };
        }
    });
    const cssSourceMap = (0, reactivity_1.computed)(() => {
        if (templateCodeGens.value && cssTextDocument.value && template.value) {
            const sourceMap = new SourceMaps.CssSourceMap(vueDoc.value, cssTextDocument.value.textDocument, cssTextDocument.value.stylesheet, undefined, false, [], { foldingRanges: false, formatting: false }, templateCodeGens.value.cssCodeGen.getMappings(parseMappingSourceRange));
            return sourceMap;
        }
    });
    const textDoc = (0, reactivity_1.ref)();
    const formatTextDoc = (0, reactivity_1.ref)();
    const teleportSourceMap = (0, reactivity_1.ref)();
    return {
        templateCodeGens,
        sourceMap,
        textDocument: textDoc,
        textDocumentForFormatting: formatTextDoc,
        sourceMapForFormatting: formatSourceMap,
        teleportSourceMap,
        cssTextDocument,
        cssSourceMap,
        update, // TODO: cheapComputed
    };
    function parseMappingSourceRange(data /* TODO */, range) {
        var _a, _b;
        if ((data === null || data === void 0 ? void 0 : data.vueTag) === 'style' && (data === null || data === void 0 ? void 0 : data.vueTagIndex) !== undefined) {
            return {
                start: styles.value[data.vueTagIndex].startTagEnd + range.start,
                end: styles.value[data.vueTagIndex].startTagEnd + range.end,
            };
        }
        const templateOffset = (_b = (_a = template.value) === null || _a === void 0 ? void 0 : _a.startTagEnd) !== null && _b !== void 0 ? _b : 0;
        return {
            start: templateOffset + range.start,
            end: templateOffset + range.end,
        };
    }
    function update() {
        var _a, _b;
        const newLang = scriptLang.value === 'js' ? 'jsx' : scriptLang.value === 'ts' ? 'tsx' : scriptLang.value;
        const newLangId = shared.syntaxToLanguageId(newLang);
        if (((_a = data.value) === null || _a === void 0 ? void 0 : _a.getText()) !== ((_b = textDoc.value) === null || _b === void 0 ? void 0 : _b.getText()) || (textDoc.value && textDoc.value.languageId !== newLangId)) {
            if (data.value) {
                const _version = version++;
                textDoc.value = vscode_languageserver_textdocument_1.TextDocument.create(vueUri + '.__VLS_template.' + newLang, newLangId, _version, data.value.getText());
                formatTextDoc.value = templateCodeGens.value
                    ? vscode_languageserver_textdocument_1.TextDocument.create(vueUri + '.__VLS_template.format.' + newLang, newLangId, _version, templateCodeGens.value.formatCodeGen.getText())
                    : undefined;
                const sourceMap = new SourceMaps.TeleportSourceMap(textDoc.value, true);
                for (const maped of data.value.ctxMappings) {
                    sourceMap.mappings.push(maped);
                }
                teleportSourceMap.value = sourceMap;
            }
            else {
                textDoc.value = undefined;
                teleportSourceMap.value = undefined;
                formatTextDoc.value = undefined;
            }
        }
    }
}
exports.useSfcTemplateScript = useSfcTemplateScript;
function beforeCssRename(newName) {
    return newName.startsWith('.') ? newName.substr(1) : newName;
}
function doCssRename(oldName, newName) {
    return '.' + newName;
}
//# sourceMappingURL=useSfcTemplateScript.js.map