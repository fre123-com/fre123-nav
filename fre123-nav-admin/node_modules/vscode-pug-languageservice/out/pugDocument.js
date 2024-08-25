"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePugDocument = void 0;
const shared = require("@volar/shared");
const SourceMap = require("@volar/source-map");
const path = require("path");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const code_gen_1 = require("@volar/code-gen");
const pugLex = require("pug-lexer");
const pugParser = require('pug-parser');
function parsePugDocument(pugTextDoc, htmlLs) {
    const fsPath = shared.uriToFsPath(pugTextDoc.uri);
    const fileName = path.basename(fsPath);
    const pugCode = pugTextDoc.getText();
    const codeGen = (0, code_gen_1.createCodeGen)();
    let error;
    let fullPugTagEnd;
    let emptyLineEnds;
    let attrsBlocks;
    let ast;
    try {
        const tokens = pugLex(pugCode, { filename: fileName });
        emptyLineEnds = collectEmptyLineEnds(tokens);
        attrsBlocks = collectAttrsBlocks(tokens);
        ast = pugParser(tokens, { filename: fileName, src: pugCode });
        visitNode(ast, undefined);
        // support tag auto-complete in empty lines
        for (const emptyLineEnd of emptyLineEnds) {
            codeGen.addText('<');
            codeGen.addCode('x__VLS_', {
                start: emptyLineEnd,
                end: emptyLineEnd,
            }, SourceMap.Mode.Totally, { isEmptyTagCompletion: true });
            codeGen.addText(' />');
        }
        codeGen.addCode('', {
            start: pugCode.trimEnd().length,
            end: pugCode.trimEnd().length,
        }, SourceMap.Mode.Totally, undefined);
    }
    catch (e) {
        const _error = e;
        error = {
            ..._error,
            line: _error.line - 1,
            column: _error.column - 1,
        };
    }
    ;
    const htmlCode = codeGen.getText();
    const htmlTextDoc = vscode_languageserver_textdocument_1.TextDocument.create(pugTextDoc.uri + '.html', 'html', pugTextDoc.version, htmlCode);
    const sourceMap = new SourceMap.SourceMap(pugTextDoc, htmlTextDoc, codeGen.getMappings());
    return {
        pugTextDocument: pugTextDoc,
        htmlTextDocument: htmlTextDoc,
        htmlDocument: htmlLs.parseHTMLDocument(htmlTextDoc),
        pugCode,
        htmlCode,
        sourceMap,
        error,
        ast,
    };
    function visitNode(node, next) {
        if (node.type === 'Block') {
            for (let i = 0; i < node.nodes.length; i++) {
                visitNode(node.nodes[i], node.nodes[i + 1]);
            }
        }
        else if (node.type === 'Tag') {
            const pugTagRange = getDocRange(node.line, node.column, node.name.length);
            const fullHtmlStart = codeGen.getText().length;
            fullPugTagEnd = pugTagRange.end;
            const selfClosing = node.block.nodes.length === 0;
            addStartTag(node, selfClosing);
            if (!selfClosing) {
                visitNode(node.block, next);
                addEndTag(node, next);
            }
            const fullHtmlEnd = codeGen.getText().length;
            codeGen.addMapping2({
                data: undefined,
                sourceRange: {
                    start: pugTagRange.start,
                    end: fullPugTagEnd,
                },
                mappedRange: {
                    start: fullHtmlStart,
                    end: fullHtmlEnd,
                },
                mode: SourceMap.Mode.Totally,
            });
        }
        else if (node.type === 'Text') {
            codeGen.addCode(node.val, getDocRange(node.line, node.column, node.val.length), SourceMap.Mode.Offset, undefined);
        }
    }
    function addStartTag(node, selfClosing) {
        codeGen.addCode('', getDocRange(node.line, node.column, 0), SourceMap.Mode.Totally, undefined);
        codeGen.addText('<');
        const tagRange = getDocRange(node.line, node.column, node.name.length);
        if (pugCode.substring(tagRange.start, tagRange.end) === node.name) {
            codeGen.addCode(node.name, tagRange, SourceMap.Mode.Offset, undefined);
        }
        else {
            codeGen.addText(node.name);
        }
        const noTitleAttrs = node.attrs.filter(attr => !attr.mustEscape && attr.name !== 'class');
        const noTitleClassAttrs = node.attrs.filter(attr => !attr.mustEscape && attr.name === 'class');
        const attrsBlock = attrsBlocks.get(getDocOffset(node.line, node.column)); // support attr auto-complete in empty space
        addClassesOrStyles(noTitleClassAttrs, 'class');
        for (const attr of noTitleAttrs) {
            codeGen.addText(' ');
            codeGen.addText(attr.name);
            if (typeof attr.val !== 'boolean') {
                codeGen.addText('=');
                codeGen.addCode(attr.val, getDocRange(attr.line, attr.column, attr.val.length), SourceMap.Mode.Offset, undefined);
            }
        }
        if (attrsBlock) {
            codeGen.addText(' ');
            codeGen.addCode(attrsBlock.text, { start: attrsBlock.offset, end: attrsBlock.offset + attrsBlock.text.length }, SourceMap.Mode.Offset, undefined);
        }
        if (selfClosing) {
            codeGen.addText(' />');
        }
        else {
            codeGen.addText('>');
        }
    }
    function addEndTag(node, next) {
        let nextStart = pugCode.length;
        if (next) {
            if (next.type === 'Block') {
                nextStart = getDocOffset(next.line, 1);
            }
            else {
                nextStart = getDocOffset(next.line, next.column);
            }
        }
        fullPugTagEnd = nextStart;
        codeGen.addCode('', {
            start: nextStart,
            end: nextStart,
        }, SourceMap.Mode.Totally, undefined);
        codeGen.addText(`</${node.name}>`);
    }
    function addClassesOrStyles(attrs, attrName) {
        if (!attrs.length)
            return;
        codeGen.addText(' ');
        codeGen.addText(attrName);
        codeGen.addText('=');
        codeGen.addText('"');
        for (const attr of attrs) {
            if (typeof attr.val !== 'boolean') {
                codeGen.addText(' ');
                codeGen.addCode(attr.val.substr(1, attr.val.length - 2), // remove "
                getDocRange(attr.line, attr.column + 1, attr.val.length - 2), SourceMap.Mode.Offset, undefined);
            }
        }
        codeGen.addText('"');
    }
    function collectEmptyLineEnds(tokens) {
        const ends = [];
        for (const token of tokens) {
            if (token.type === 'newline' || token.type === 'outdent') {
                let currentLine = token.loc.start.line - 2;
                let prevLine = getLineText(currentLine);
                while (prevLine.trim() === '') {
                    ends.push(pugTextDoc.offsetAt({ line: currentLine + 1, character: 0 }) - 1);
                    if (currentLine <= 0)
                        break;
                    currentLine--;
                    prevLine = getLineText(currentLine);
                }
            }
        }
        return ends.sort((a, b) => a - b);
        function getLineText(line) {
            const text = pugTextDoc.getText({
                start: { line: line, character: 0 },
                end: { line: line + 1, character: 0 },
            });
            return text.substr(0, text.length - 1);
        }
    }
    function collectAttrsBlocks(tokens) {
        const blocks = new Map();
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.type === 'start-attributes') {
                let tagStart = token;
                for (let j = i - 1; j >= 0; j--) {
                    const prevToken = tokens[j];
                    if (prevToken.type === 'newline'
                        || prevToken.type === 'indent'
                        || prevToken.type === 'outdent'
                        || prevToken.type === ':')
                        break;
                    tagStart = prevToken;
                    if (prevToken.type === 'tag')
                        break;
                }
                let prevToken = token;
                let text = '';
                for (i++; i < tokens.length; i++) {
                    const attrToken = tokens[i];
                    addPrevSpace(attrToken);
                    if (attrToken.type === 'attribute') {
                        let attrText = pugCode.substring(getDocOffset(attrToken.loc.start.line, attrToken.loc.start.column), getDocOffset(attrToken.loc.end.line, attrToken.loc.end.column));
                        if (typeof attrToken.val === 'string' && attrText.indexOf('=') >= 0) {
                            let valText = attrToken.val;
                            if (valText.startsWith('`') && valText.endsWith('`')) {
                                valText = `"${valText.substr(1, valText.length - 2)}"`;
                            }
                            valText = valText.replace(/ \\\n/g, '//\n');
                            text += attrText.substring(0, attrText.lastIndexOf(attrToken.val)) + valText;
                        }
                        else {
                            text += attrText;
                        }
                    }
                    else if (attrToken.type === 'end-attributes') {
                        blocks.set(getDocOffset(tagStart.loc.start.line, tagStart.loc.start.column), {
                            offset: getDocOffset(token.loc.end.line, token.loc.end.column),
                            text,
                        });
                        break;
                    }
                    prevToken = attrToken;
                }
                function addPrevSpace(currentToken) {
                    text += pugCode.substring(getDocOffset(prevToken.loc.end.line, prevToken.loc.end.column), getDocOffset(currentToken.loc.start.line, currentToken.loc.start.column)).replace(/,/g, '\n');
                }
            }
        }
        return blocks;
    }
    function getDocOffset(pugLine, pugColumn) {
        return pugTextDoc.offsetAt({ line: pugLine - 1, character: pugColumn - 1 });
    }
    function getDocRange(pugLine, pugColumn, length) {
        const start = pugTextDoc.offsetAt({ line: pugLine - 1, character: pugColumn - 1 });
        const end = start + length;
        return {
            start,
            end,
        };
    }
}
exports.parsePugDocument = parsePugDocument;
//# sourceMappingURL=pugDocument.js.map