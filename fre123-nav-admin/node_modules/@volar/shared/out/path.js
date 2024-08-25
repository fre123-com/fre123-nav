"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileInDir = exports.normalizeUri = exports.normalizeFileName = exports.fsPathToUri = exports.uriToFsPath = void 0;
const vscode_uri_1 = require("vscode-uri");
const upath = require("upath");
function uriToFsPath(uri) {
    return upath.toUnix(vscode_uri_1.URI.parse(uri).fsPath);
}
exports.uriToFsPath = uriToFsPath;
function fsPathToUri(fsPath) {
    return vscode_uri_1.URI.file(fsPath).toString();
}
exports.fsPathToUri = fsPathToUri;
function normalizeFileName(fsPath) {
    return upath.toUnix(vscode_uri_1.URI.file(fsPath).fsPath);
}
exports.normalizeFileName = normalizeFileName;
function normalizeUri(uri) {
    return vscode_uri_1.URI.parse(uri).toString();
}
exports.normalizeUri = normalizeUri;
function isFileInDir(fileName, dir) {
    const relative = upath.relative(dir, fileName);
    return relative && !relative.startsWith('..') && !upath.isAbsolute(relative);
}
exports.isFileInDir = isFileInDir;
//# sourceMappingURL=path.js.map