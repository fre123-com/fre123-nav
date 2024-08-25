"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSfc = exports.defaultLanguages = void 0;
exports.defaultLanguages = {
    template: 'html',
    script: 'js',
    style: 'css',
};
const validScriptSyntaxs = ['js', 'jsx', 'ts', 'tsx'];
function getValidScriptSyntax(syntax) {
    if (validScriptSyntaxs.includes(syntax)) {
        return syntax;
    }
    return 'js';
}
function parseSfc(text, doc) {
    var _a, _b, _c, _d, _e, _f, _g;
    const sfc = {
        template: null,
        script: null,
        scriptSetup: null,
        styles: [],
        customBlocks: [],
    };
    for (const node of doc.roots) {
        const lang = (_a = node.attributes) === null || _a === void 0 ? void 0 : _a['lang'];
        if (node.tag === 'template' && node.startTagEnd !== undefined) {
            sfc.template = {
                lang: lang !== undefined ? parseAttr(lang, exports.defaultLanguages.template) : exports.defaultLanguages.template,
                content: text.substring(node.startTagEnd, node.endTagStart),
                startTagEnd: node.startTagEnd,
                start: node.start,
                end: node.end,
                attrs: parseAttrs(node.attributes),
            };
        }
        else if (node.tag === 'script' && node.startTagEnd !== undefined) {
            if (((_b = node.attributes) === null || _b === void 0 ? void 0 : _b['setup']) === undefined) {
                const src = (_c = node.attributes) === null || _c === void 0 ? void 0 : _c['src'];
                sfc.script = {
                    src: src !== undefined ? parseAttr(src, '') : undefined,
                    lang: lang !== undefined ? getValidScriptSyntax(parseAttr(lang, exports.defaultLanguages.script)) : exports.defaultLanguages.script,
                    content: text.substring(node.startTagEnd, node.endTagStart),
                    startTagEnd: node.startTagEnd,
                    start: node.start,
                    end: node.end,
                    attrs: parseAttrs(node.attributes),
                };
            }
            else {
                sfc.scriptSetup = {
                    lang: lang !== undefined ? getValidScriptSyntax(parseAttr(lang, exports.defaultLanguages.script)) : exports.defaultLanguages.script,
                    content: text.substring(node.startTagEnd, node.endTagStart),
                    startTagEnd: node.startTagEnd,
                    start: node.start,
                    end: node.end,
                    attrs: parseAttrs(node.attributes),
                };
            }
        }
        else if (node.tag === 'style' && node.startTagEnd !== undefined) {
            const module = (_d = node.attributes) === null || _d === void 0 ? void 0 : _d['module'];
            const scoped = (_e = node.attributes) === null || _e === void 0 ? void 0 : _e['scoped'];
            sfc.styles.push({
                lang: lang !== undefined ? parseAttr(lang, exports.defaultLanguages.style) : exports.defaultLanguages.style,
                content: text.substring(node.startTagEnd, node.endTagStart),
                startTagEnd: node.startTagEnd,
                start: node.start,
                end: node.end,
                module: module !== undefined ? parseAttr(module, '$style') : undefined,
                scoped: scoped !== undefined,
                attrs: parseAttrs(node.attributes),
            });
        }
        else {
            sfc.customBlocks.push({
                type: (_f = node.tag) !== null && _f !== void 0 ? _f : '',
                lang: lang !== undefined ? parseAttr(lang, '') : '',
                content: node.startTagEnd !== undefined ? text.substring(node.startTagEnd, node.endTagStart) : '',
                startTagEnd: (_g = node.startTagEnd) !== null && _g !== void 0 ? _g : node.end,
                start: node.start,
                end: node.end,
                attrs: parseAttrs(node.attributes),
            });
        }
        function parseAttrs(attrs) {
            const obj = {};
            if (attrs) {
                for (let key in attrs) {
                    obj[key] = parseAttr(attrs[key], '');
                }
            }
            return obj;
        }
    }
    return sfc;
}
exports.parseSfc = parseSfc;
function parseAttr(attr, _default) {
    if (attr === null) {
        return _default;
    }
    if ((attr.startsWith('"') && attr.endsWith('"'))
        || (attr.startsWith("'") && attr.endsWith("'"))) {
        return attr.substring(1, attr.length - 1);
    }
    return attr;
}
//# sourceMappingURL=vue.js.map