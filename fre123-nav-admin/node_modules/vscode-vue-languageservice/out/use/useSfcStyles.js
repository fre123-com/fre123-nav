"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSfcStyles = void 0;
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const reactivity_1 = require("@vue/reactivity");
const SourceMaps = require("../utils/sourceMaps");
const shared = require("@volar/shared");
const upath = require("upath");
const cssBindRanges_1 = require("@volar/vue-code-gen/out/parsers/cssBindRanges");
function findStylesheetVBindRanges(docText, ss) {
    const result = [];
    visChild(ss);
    function visChild(node) {
        if (node.type === 22) {
            const nodeText = docText.substring(node.offset, node.end);
            for (const textRange of (0, cssBindRanges_1.getMatchBindTexts)(nodeText)) {
                result.push({
                    start: textRange.start + node.offset,
                    end: textRange.end + node.offset,
                });
            }
        }
        else if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                visChild(node.children[i]);
            }
        }
    }
    return result;
}
function useSfcStyles(context, vueUri, vueDoc, styles) {
    var _a, _b;
    const { modules: { typescript: ts } } = context;
    const vueHost = 'vueHost' in context ? context.vueHost : undefined;
    const fileExists = (_a = vueHost === null || vueHost === void 0 ? void 0 : vueHost.fileExists) !== null && _a !== void 0 ? _a : ts.sys.fileExists;
    const readFile = (_b = vueHost === null || vueHost === void 0 ? void 0 : vueHost.readFile) !== null && _b !== void 0 ? _b : ts.sys.readFile;
    let version = 0;
    const textDocuments = (0, reactivity_1.computed)(() => {
        const documents = [];
        for (let i = 0; i < styles.value.length; i++) {
            const style = styles.value[i];
            const lang = style.lang;
            let content = style.content;
            const documentUri = vueUri + '.' + i + '.' + lang;
            const document = vscode_languageserver_textdocument_1.TextDocument.create(documentUri, lang, version++, content);
            const linkStyles = [];
            let stylesheet = undefined;
            const cssLs = context.getCssLs(lang);
            if (cssLs) {
                stylesheet = cssLs.parseStylesheet(document);
                findLinks(cssLs, document, stylesheet);
            }
            documents.push({
                textDocument: document,
                stylesheet,
                binds: stylesheet ? findStylesheetVBindRanges(content, stylesheet) : [],
                links: linkStyles,
                module: style.module,
                scoped: style.scoped,
            });
            function findLinks(ls1, textDocument, stylesheet) {
                const links = 'documentContext' in context ? ls1.findDocumentLinks(textDocument, stylesheet, context.documentContext) : [];
                for (const link of links) {
                    if (!link.target)
                        continue;
                    if (!link.target.endsWith('.css') && !link.target.endsWith('.scss') && !link.target.endsWith('.less'))
                        continue;
                    if (!fileExists(shared.uriToFsPath(link.target)))
                        continue;
                    if (linkStyles.find(l => l.textDocument.uri === link.target))
                        continue; // Loop
                    const text = readFile(shared.uriToFsPath(link.target));
                    if (text === undefined)
                        continue;
                    const lang = upath.extname(link.target).substr(1);
                    const doc = vscode_languageserver_textdocument_1.TextDocument.create(link.target, lang, version++, text);
                    const ls2 = context.getCssLs(lang);
                    if (!ls2)
                        continue;
                    const stylesheet = ls2.parseStylesheet(doc);
                    linkStyles.push({
                        textDocument: doc,
                        stylesheet,
                    });
                    findLinks(ls2, doc, stylesheet);
                }
            }
        }
        return documents;
    });
    const sourceMaps = (0, reactivity_1.computed)(() => {
        const sourceMaps = [];
        for (let i = 0; i < styles.value.length && i < textDocuments.value.length; i++) {
            const cssData = textDocuments.value[i];
            const style = styles.value[i];
            const sourceMap = new SourceMaps.CssSourceMap(vueDoc.value, cssData.textDocument, cssData.stylesheet, style.module, style.scoped, cssData.links, { foldingRanges: true, formatting: true });
            sourceMap.mappings.push({
                data: undefined,
                mode: SourceMaps.Mode.Offset,
                sourceRange: {
                    start: style.startTagEnd,
                    end: style.startTagEnd + style.content.length,
                },
                mappedRange: {
                    start: 0,
                    end: style.content.length,
                },
            });
            sourceMaps.push(sourceMap);
        }
        return sourceMaps;
    });
    return {
        textDocuments,
        sourceMaps,
    };
}
exports.useSfcStyles = useSfcStyles;
//# sourceMappingURL=useSfcStyles.js.map