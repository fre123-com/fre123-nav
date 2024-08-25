"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRefType = exports.isBlacklistNode = exports.register = void 0;
const vscode = require("vscode-languageserver");
const shared = require("@volar/shared");
const shared_1 = require("@vue/shared");
function register({ modules: { typescript: ts }, sourceFiles, getTsLs }) {
    const asts = new WeakMap();
    return (document, position) => {
        for (const tsLoc of sourceFiles.toTsLocations(document.uri, position, position, data => !!data.capabilities.completion)) {
            if (tsLoc.lsType === 'template')
                continue;
            if (tsLoc.type === 'source-ts' && tsLoc.lsType !== 'script')
                continue;
            const tsLs = getTsLs(tsLoc.lsType);
            const tsDoc = tsLs.__internal__.getTextDocument(tsLoc.uri);
            if (!tsDoc)
                continue;
            const sourceFile = getAst(tsDoc);
            if (isBlacklistNode(ts, sourceFile, tsDoc.offsetAt(tsLoc.range.start)))
                continue;
            const typeDefs = tsLs.findTypeDefinition(tsLoc.uri, tsLoc.range.start);
            if (isRefType(typeDefs, tsLs)) {
                return '${1:.value}';
            }
        }
    };
    function getAst(tsDoc) {
        let ast = asts.get(tsDoc);
        if (!ast) {
            ast = ts.createSourceFile(shared.uriToFsPath(tsDoc.uri), tsDoc.getText(), ts.ScriptTarget.Latest);
            asts.set(tsDoc, ast);
        }
        return ast;
    }
}
exports.register = register;
function isBlacklistNode(ts, node, pos) {
    if (ts.isVariableDeclaration(node) && pos >= node.name.getFullStart() && pos <= node.name.getEnd()) {
        return true;
    }
    else if (ts.isFunctionDeclaration(node) && node.name && pos >= node.name.getFullStart() && pos <= node.name.getEnd()) {
        return true;
    }
    else if (ts.isParameter(node) && pos >= node.name.getFullStart() && pos <= node.name.getEnd()) {
        return true;
    }
    else if (ts.isPropertyAssignment(node) && pos >= node.name.getFullStart() && pos <= node.name.getEnd()) {
        return true;
    }
    else if (ts.isShorthandPropertyAssignment(node)) {
        return true;
    }
    else if (ts.isImportDeclaration(node)) {
        return true;
    }
    else if (ts.isLiteralTypeNode(node)) {
        return true;
    }
    else if (ts.isPropertyAccessExpression(node) && node.name.text === 'value') {
        return true;
    }
    else if (ts.isCallExpression(node)
        && ts.isIdentifier(node.expression)
        && isWatchOrUseFunction(node.expression.text)
        && isTopLevelArgOrArrayTopLevelItemItem(node)) {
        return true;
    }
    else {
        let _isBlacklistNode = false;
        node.forEachChild(node => {
            if (_isBlacklistNode)
                return;
            if (pos >= node.getFullStart() && pos <= node.getEnd()) {
                if (isBlacklistNode(ts, node, pos)) {
                    _isBlacklistNode = true;
                }
            }
        });
        return _isBlacklistNode;
    }
    function isWatchOrUseFunction(fnName) {
        return fnName === 'watch'
            || fnName === 'unref'
            || fnName === 'triggerRef'
            || fnName === 'isRef'
            || (0, shared_1.hyphenate)(fnName).startsWith('use-');
    }
    function isTopLevelArgOrArrayTopLevelItemItem(node) {
        for (const arg of node.arguments) {
            if (pos >= arg.getFullStart() && pos <= arg.getEnd()) {
                if (ts.isIdentifier(arg)) {
                    return true;
                }
                if (ts.isArrayLiteralExpression(arg)) {
                    for (const el of arg.elements) {
                        if (pos >= el.getFullStart() && pos <= el.getEnd()) {
                            return ts.isIdentifier(el);
                        }
                    }
                }
                return false;
            }
        }
    }
}
exports.isBlacklistNode = isBlacklistNode;
function isRefType(typeDefs, tsLs) {
    for (const typeDefine of typeDefs) {
        const uri = vscode.Location.is(typeDefine) ? typeDefine.uri : typeDefine.targetUri;
        const range = vscode.Location.is(typeDefine) ? typeDefine.range : typeDefine.targetSelectionRange;
        if (uri.endsWith('reactivity.d.ts')) {
            const defineDoc = tsLs.__internal__.getTextDocument(uri);
            if (!defineDoc)
                continue;
            const typeName = defineDoc.getText(range);
            switch (typeName) {
                case 'Ref':
                case 'ComputedRef':
                case 'WritableComputedRef':
                    return true;
            }
        }
    }
    return false;
}
exports.isRefType = isRefType;
//# sourceMappingURL=refAutoClose.js.map