"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.getSemanticTokenLegend = void 0;
const shared = require("@volar/shared");
function getSemanticTokenLegend() {
    if (tokenTypes.length !== 12 /* _ */) {
        console.warn('TokenType has added new entries.');
    }
    if (tokenModifiers.length !== 6 /* _ */) {
        console.warn('TokenModifier has added new entries.');
    }
    return { types: tokenTypes, modifiers: tokenModifiers };
}
exports.getSemanticTokenLegend = getSemanticTokenLegend;
function register(languageService, getTextDocument, ts) {
    return (uri, range, cancle) => {
        const document = getTextDocument(uri);
        if (!document)
            return;
        const file = shared.uriToFsPath(uri);
        const start = range ? document.offsetAt(range.start) : 0;
        const length = range ? (document.offsetAt(range.end) - start) : document.getText().length;
        if (cancle === null || cancle === void 0 ? void 0 : cancle.isCancellationRequested)
            return;
        let response2;
        try {
            response2 = languageService.getEncodedSyntacticClassifications(file, { start, length });
        }
        catch { }
        if (!response2)
            return;
        if (cancle === null || cancle === void 0 ? void 0 : cancle.isCancellationRequested)
            return;
        let response1;
        try {
            response1 = languageService.getEncodedSemanticClassifications(file, { start, length }, ts.SemanticClassificationFormat.TwentyTwenty);
        }
        catch { }
        if (!response1)
            return;
        const tokenSpan = [...response1.spans, ...response2.spans];
        // const builder = new vscode.SemanticTokensBuilder();
        const tokens = [];
        let i = 0;
        while (i < tokenSpan.length) {
            const offset = tokenSpan[i++];
            const length = tokenSpan[i++];
            const tsClassification = tokenSpan[i++];
            let tokenModifiers = 0;
            let tokenType = getTokenTypeFromClassification(tsClassification);
            if (tokenType !== undefined) {
                // it's a classification as returned by the typescript-vscode-sh-plugin
                tokenModifiers = getTokenModifierFromClassification(tsClassification);
            }
            else {
                // typescript-vscode-sh-plugin is not present
                tokenType = tokenTypeMap[tsClassification];
                if (tokenType === undefined) {
                    continue;
                }
            }
            // we can use the document's range conversion methods because the result is at the same version as the document
            const startPos = document.positionAt(offset);
            const endPos = document.positionAt(offset + length);
            for (let line = startPos.line; line <= endPos.line; line++) {
                const startCharacter = (line === startPos.line ? startPos.character : 0);
                const endCharacter = (line === endPos.line ? endPos.character : docLineLength(document, line));
                // builder.push(line, startCharacter, endCharacter - startCharacter, tokenType, tokenModifiers);
                tokens.push([line, startCharacter, endCharacter - startCharacter, tokenType, tokenModifiers]);
            }
        }
        // return builder.build();
        return tokens;
    };
}
exports.register = register;
function docLineLength(document, line) {
    const currentLineOffset = document.offsetAt({ line, character: 0 });
    const nextLineOffset = document.offsetAt({ line: line + 1, character: 0 });
    return nextLineOffset - currentLineOffset;
}
function getTokenTypeFromClassification(tsClassification) {
    if (tsClassification > 255 /* modifierMask */) {
        return (tsClassification >> 8 /* typeOffset */) - 1;
    }
    return undefined;
}
function getTokenModifierFromClassification(tsClassification) {
    return tsClassification & 255 /* modifierMask */;
}
const tokenTypes = [];
tokenTypes[0 /* class */] = 'class';
tokenTypes[1 /* enum */] = 'enum';
tokenTypes[2 /* interface */] = 'interface';
tokenTypes[3 /* namespace */] = 'namespace';
tokenTypes[4 /* typeParameter */] = 'typeParameter';
tokenTypes[5 /* type */] = 'type';
tokenTypes[6 /* parameter */] = 'parameter';
tokenTypes[7 /* variable */] = 'variable';
tokenTypes[8 /* enumMember */] = 'enumMember';
tokenTypes[9 /* property */] = 'property';
tokenTypes[10 /* function */] = 'function';
tokenTypes[11 /* method */] = 'method';
const tokenModifiers = [];
tokenModifiers[2 /* async */] = 'async';
tokenModifiers[0 /* declaration */] = 'declaration';
tokenModifiers[3 /* readonly */] = 'readonly';
tokenModifiers[1 /* static */] = 'static';
tokenModifiers[5 /* local */] = 'local';
tokenModifiers[4 /* defaultLibrary */] = 'defaultLibrary';
// mapping for the original ExperimentalProtocol.ClassificationType from TypeScript (only used when plugin is not available)
const tokenTypeMap = [];
tokenTypeMap[11 /* className */] = 0 /* class */;
tokenTypeMap[12 /* enumName */] = 1 /* enum */;
tokenTypeMap[13 /* interfaceName */] = 2 /* interface */;
tokenTypeMap[14 /* moduleName */] = 3 /* namespace */;
tokenTypeMap[15 /* typeParameterName */] = 4 /* typeParameter */;
tokenTypeMap[16 /* typeAliasName */] = 5 /* type */;
tokenTypeMap[17 /* parameterName */] = 6 /* parameter */;
//# sourceMappingURL=semanticTokens.js.map