"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentSafely = exports.eqSet = exports.getOverlapRange = exports.getWordRange = exports.isInsideRange = exports.notEmpty = exports.languageIdToSyntax = exports.syntaxToLanguageId = exports.sleep = void 0;
__exportStar(require("./path"), exports);
__exportStar(require("./requests"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./uriMap"), exports);
__exportStar(require("./ts"), exports);
__exportStar(require("./http"), exports);
__exportStar(require("./vue"), exports);
const vscode_uri_1 = require("vscode-uri");
const util_1 = require("util");
exports.sleep = (0, util_1.promisify)(setTimeout);
function syntaxToLanguageId(syntax) {
    switch (syntax) {
        case 'js': return 'javascript';
        case 'ts': return 'typescript';
        case 'jsx': return 'javascriptreact';
        case 'tsx': return 'typescriptreact';
        case 'pug': return 'jade';
    }
    return syntax;
}
exports.syntaxToLanguageId = syntaxToLanguageId;
function languageIdToSyntax(languageId) {
    switch (languageId) {
        case 'javascript': return 'js';
        case 'typescript': return 'ts';
        case 'javascriptreact': return 'jsx';
        case 'typescriptreact': return 'tsx';
        case 'jade': return 'pug';
    }
    return languageId;
}
exports.languageIdToSyntax = languageIdToSyntax;
function notEmpty(value) {
    return value !== null && value !== undefined;
}
exports.notEmpty = notEmpty;
function isInsideRange(parent, child) {
    if (child.start.line < parent.start.line)
        return false;
    if (child.end.line > parent.end.line)
        return false;
    if (child.start.line === parent.start.line && child.start.character < parent.start.character)
        return false;
    if (child.end.line === parent.end.line && child.end.character > parent.end.character)
        return false;
    return true;
}
exports.isInsideRange = isInsideRange;
function getWordRange(wordPattern, position, document) {
    const lineStart = {
        line: position.line,
        character: 0,
    };
    const lineEnd = {
        line: position.line + 1,
        character: 0,
    };
    const offset = document.offsetAt(position);
    const lineStartOffset = document.offsetAt(lineStart);
    const lineText = document.getText({ start: lineStart, end: lineEnd });
    for (const match of lineText.matchAll(wordPattern)) {
        if (match.index === undefined)
            continue;
        const matchStart = match.index + lineStartOffset;
        const matchEnd = matchStart + match[0].length;
        if (offset >= matchStart && offset <= matchEnd) {
            return {
                start: document.positionAt(matchStart),
                end: document.positionAt(matchEnd),
            };
        }
    }
    return undefined;
}
exports.getWordRange = getWordRange;
function getOverlapRange(range1, range2) {
    const start = {
        line: Math.max(range1.start.line, range2.start.line),
        character: range1.start.line === range2.start.line ? Math.max(range1.start.character, range2.start.character) : range1.start.line > range2.start.line ? range1.start.character : range2.start.character,
    };
    const end = {
        line: Math.min(range1.end.line, range2.end.line),
        character: range1.end.line === range2.end.line ? Math.min(range1.end.character, range2.end.character) : range1.end.line < range2.end.line ? range1.end.character : range2.end.character,
    };
    if (start.line > end.line || (start.line === end.line && start.character > end.line))
        return undefined;
    return {
        start,
        end,
    };
}
exports.getOverlapRange = getOverlapRange;
function eqSet(as, bs) {
    if (as.size !== bs.size)
        return false;
    for (const a of as)
        if (!bs.has(a))
            return false;
    return true;
}
exports.eqSet = eqSet;
function getDocumentSafely(documents, uri) {
    var _a;
    const normalizeUri = vscode_uri_1.URI.parse(uri).toString();
    const document = (_a = documents.get(uri)) !== null && _a !== void 0 ? _a : documents.get(normalizeUri);
    if (document) {
        return document;
    }
    for (const document of documents.all()) {
        if (vscode_uri_1.URI.parse(document.uri).toString() === normalizeUri) {
            return document;
        }
    }
}
exports.getDocumentSafely = getDocumentSafely;
//# sourceMappingURL=index.js.map