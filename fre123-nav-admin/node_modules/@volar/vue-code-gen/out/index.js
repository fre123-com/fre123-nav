"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSFCTemplate = exports.generateSFCScriptTypeCheckCode = void 0;
const script_1 = require("./generators/script");
const template_scriptSetup_1 = require("./generators/template_scriptSetup");
const scriptRanges_1 = require("./parsers/scriptRanges");
const scriptSetupRanges_1 = require("./parsers/scriptSetupRanges");
const CompilerDOM = require("@vue/compiler-dom");
const CompilerVue2 = require("./vue2TemplateCompiler");
/**
 * @param templateAst Use `require('@vue/compiler-dom').compile` or `require('@volar/vue-code-gen').compileTemplate`, provide to resolve variables unused in script setup
 * @param cssVars Use `require('@vue/compiler-sfc').parseCssVars`, provide to resolve variables unused in script setup
 * @param vueLibName Where should `defineComponent` and `PropType` import from? (For example: `vue`, `@vue/runtime-dom`, `@vue/composition-api`)
 */
function generateSFCScriptTypeCheckCode(ts, scriptLang, scriptCode, scriptSetupCode, templateAst, cssVars, vueLibName = 'vue') {
    const generated = (0, script_1.generate)('script', '', scriptCode !== undefined ? { content: scriptCode } : undefined, scriptSetupCode !== undefined ? { content: scriptSetupCode } : undefined, scriptCode !== undefined ? (0, scriptRanges_1.parseScriptRanges)(ts, ts.createSourceFile('dummy.' + scriptLang, scriptCode, ts.ScriptTarget.ESNext), scriptSetupCode !== undefined, false, false) : undefined, scriptSetupCode !== undefined ? (0, scriptSetupRanges_1.parseScriptSetupRanges)(ts, ts.createSourceFile('dummy.' + scriptLang, scriptSetupCode, ts.ScriptTarget.ESNext)) : undefined, () => templateAst ? (0, template_scriptSetup_1.generate)(templateAst) : undefined, () => cssVars !== null && cssVars !== void 0 ? cssVars : [], vueLibName);
    return {
        code: generated.getText(),
        scriptMappings: getScriptMappings('script'),
        scriptSetupMappings: getScriptMappings('scriptSetup'),
    };
    function getScriptMappings(vueTag) {
        return generated.getMappings()
            .filter(mapping => mapping.data.vueTag === vueTag
            && mapping.data.capabilities.diagnostic)
            .map(mapping => ({
            sourceTextRange: mapping.sourceRange,
            generatedTextRange: mapping.mappedRange,
        }));
    }
}
exports.generateSFCScriptTypeCheckCode = generateSFCScriptTypeCheckCode;
/**
 * A wrapper function of `require('@vue/compiler-dom').compile`
 */
function compileSFCTemplate(htmlCode, options = {}, vueVersion = 3) {
    const errors = [];
    const warnings = [];
    let ast;
    try {
        ast = (vueVersion === 2 ? CompilerVue2 : CompilerDOM).compile(htmlCode, {
            onError: (err) => errors.push(err),
            onWarn: (err) => warnings.push(err),
            expressionPlugins: ['typescript'],
            ...options,
        }).ast;
    }
    catch (e) {
        const err = e;
        errors.push(err);
    }
    return {
        errors,
        warnings,
        ast,
    };
}
exports.compileSFCTemplate = compileSFCTemplate;
//# sourceMappingURL=index.js.map