"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPathMap = void 0;
const vscode_uri_1 = require("vscode-uri");
const path_1 = require("./path");
function createPathMap(map = new Map()) {
    const uriToUriKeys = {};
    const fsPathToUriKeys = {};
    return {
        clear,
        values,
        uriDelete,
        uriGet,
        uriHas,
        uriSet,
        fsPathDelete,
        fsPathGet,
        fsPathHas,
        fsPathSet,
    };
    function getUriByUri(uri) {
        if (uriToUriKeys[uri] === undefined)
            uriToUriKeys[uri] = normalizeUri(uri).toLowerCase();
        return uriToUriKeys[uri];
    }
    function getUriByFsPath(fsPath) {
        if (fsPathToUriKeys[fsPath] === undefined)
            fsPathToUriKeys[fsPath] = (0, path_1.fsPathToUri)(fsPath).toLowerCase();
        return fsPathToUriKeys[fsPath];
    }
    function clear() {
        return map.clear();
    }
    function values() {
        return map.values();
    }
    function uriDelete(_uri) {
        return map.delete(getUriByUri(_uri));
    }
    function uriGet(_uri) {
        return map.get(getUriByUri(_uri));
    }
    function uriHas(_uri) {
        return map.has(getUriByUri(_uri));
    }
    function uriSet(_uri, item) {
        return map.set(getUriByUri(_uri), item);
    }
    function fsPathDelete(_fsPath) {
        return map.delete(getUriByFsPath(_fsPath));
    }
    function fsPathGet(_fsPath) {
        return map.get(getUriByFsPath(_fsPath));
    }
    function fsPathHas(_fsPath) {
        return map.has(getUriByFsPath(_fsPath));
    }
    function fsPathSet(_fsPath, item) {
        return map.set(getUriByFsPath(_fsPath), item);
    }
}
exports.createPathMap = createPathMap;
function normalizeUri(uri) {
    try {
        return vscode_uri_1.URI.parse(uri).toString();
    }
    catch {
        return '';
    }
}
//# sourceMappingURL=uriMap.js.map