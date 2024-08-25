"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSfcEntryForTemplateLs = void 0;
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const reactivity_1 = require("@vue/reactivity");
const SourceMaps = require("../utils/sourceMaps");
const upath = require("upath");
const string_1 = require("../utils/string");
const shared = require("@volar/shared");
const localTypes_1 = require("../utils/localTypes");
function useSfcEntryForTemplateLs(vueUri, vueDoc, script, scriptSetup, template, hasTsDoc, isVue2) {
    let version = 0;
    const textDocument = (0, reactivity_1.computed)(() => {
        const uri = `${vueUri}.ts`;
        const vueFileName = upath.basename(shared.uriToFsPath(vueUri));
        const tsScriptFileName = hasTsDoc.value ? '__VLS_script_ts' : '__VLS_script';
        let content = '';
        content += '// @ts-nocheck\n';
        content += `import * as __VLS_types from './__VLS_types';\n`;
        if (script.value || scriptSetup.value) {
            content += `import { __VLS_options as __VLS_options_ts } from './${vueFileName}.${tsScriptFileName}';\n`;
            content += `import { __VLS_options, __VLS_name } from './${vueFileName}.__VLS_script';\n`;
            content += `export { __VLS_options, __VLS_name } from './${vueFileName}.__VLS_script';\n`;
            content += `export * from './${vueFileName}.__VLS_script';\n`;
            if (scriptSetup.value) {
                content += `import { __VLS_component as __VLS_component_ts } from './${vueFileName}.${tsScriptFileName}';\n`;
                content += `import { __VLS_component } from './${vueFileName}.__VLS_script';\n`;
                content += `export { __VLS_component } from './${vueFileName}.__VLS_script';\n`;
            }
            else {
                content += `import __VLS_component_1_ts from './${vueFileName}.${tsScriptFileName}';\n`;
                content += `import __VLS_component_1 from './${vueFileName}.__VLS_script';\n`;
                content += `import { __VLS_component as __VLS_component_2_ts } from './${vueFileName}.${tsScriptFileName}';\n`;
                content += `import { __VLS_component as __VLS_component_2 } from './${vueFileName}.__VLS_script';\n`;
                content += `declare var __VLS_component_ts: __VLS_types.SelectComponent<typeof __VLS_component_1_ts, typeof __VLS_component_2_ts>;\n`;
                content += `export declare var __VLS_component: __VLS_types.SelectComponent<typeof __VLS_component_1, typeof __VLS_component_2>;\n`;
            }
        }
        else {
            content += `export var __VLS_name = undefined;\n`;
            content += `export var __VLS_options = {};\n`;
            content += `export var __VLS_component = (await import('${(0, localTypes_1.getVueLibraryName)(isVue2)}')).defineComponent({});\n`;
            content += `var __VLS_options_ts = {};\n`;
            content += `var __VLS_component_ts = (await import('${(0, localTypes_1.getVueLibraryName)(isVue2)}')).defineComponent({});\n`;
        }
        content += `declare var __VLS_ctx: __VLS_types.ComponentContext<typeof __VLS_component_ts>;\n`;
        content += `declare var __VLS_ComponentsWrap: typeof __VLS_options & { components: { } };\n`;
        content += `declare var __VLS_Components: typeof __VLS_ComponentsWrap.components & __VLS_types.GlobalComponents & __VLS_types.PickComponents<typeof __VLS_ctx> & __VLS_types.SelfComponent<typeof __VLS_name, typeof __VLS_component>;\n`;
        content += `__VLS_ctx.${string_1.SearchTexts.Context};\n`;
        content += `__VLS_Components.${string_1.SearchTexts.Components};\n`;
        content += `({} as __VLS_types.OptionsSetupReturns<typeof __VLS_options_ts>).${string_1.SearchTexts.SetupReturns};\n`;
        content += `({} as __VLS_types.OptionsProps<typeof __VLS_options_ts>).${string_1.SearchTexts.Props};\n`;
        content += `({} as __VLS_types.GlobalAttrs).${string_1.SearchTexts.GlobalAttrs};`;
        content += `\n`;
        content += `export default {} as typeof __VLS_component & {\n`;
        content += `__VLS_raw: typeof __VLS_component\n`;
        content += `__VLS_options: typeof __VLS_options,\n`;
        content += template.value ? `__VLS_slots: typeof import ('./${vueFileName}.__VLS_template').default,\n` : `// no template\n`;
        content += `};\n`;
        return vscode_languageserver_textdocument_1.TextDocument.create(uri, 'typescript', version++, content);
    });
    const sourceMap = (0, reactivity_1.computed)(() => {
        if (textDocument.value) {
            const docText = textDocument.value.getText();
            const sourceMap = new SourceMaps.TsSourceMap(vueDoc.value, textDocument.value, 'template', false, {
                foldingRanges: false,
                formatting: false,
                documentSymbol: false,
                codeActions: false,
            });
            sourceMap.mappings.push({
                data: {
                    vueTag: 'sfc',
                    capabilities: {},
                },
                mode: SourceMaps.Mode.Expand,
                sourceRange: {
                    start: 0,
                    end: 0,
                },
                mappedRange: {
                    start: 0,
                    end: docText.length,
                },
            });
            return sourceMap;
        }
    });
    return {
        textDocument,
        sourceMap,
    };
}
exports.useSfcEntryForTemplateLs = useSfcEntryForTemplateLs;
//# sourceMappingURL=useSfcEntryForTemplateLs.js.map