"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const vscode = require("vscode-languageserver");
const html2pug_1 = require("@volar/html2pug");
function execute(document, sourceFile, connection) {
    const desc = sourceFile.getDescriptor();
    if (!desc.template)
        return;
    const lang = desc.template.lang;
    if (lang !== 'pug')
        return;
    const html = (0, html2pug_1.pugToHtml)(desc.template.content);
    const newTemplate = `<template>\n` + html + `\n`;
    const range = vscode.Range.create(document.positionAt(desc.template.start), document.positionAt(desc.template.startTagEnd + desc.template.content.length));
    const textEdit = vscode.TextEdit.replace(range, newTemplate);
    connection.workspace.applyEdit({ changes: { [document.uri]: [textEdit] } });
}
exports.execute = execute;
//# sourceMappingURL=pugToHtml.js.map