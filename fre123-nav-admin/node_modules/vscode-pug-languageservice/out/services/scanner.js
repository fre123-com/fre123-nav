"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
function register(htmlLs) {
    return (pugDoc, initialOffset = 0) => {
        var _a, _b;
        let htmlRange = (_a = pugDoc.sourceMap.getMappedRange(initialOffset, initialOffset, data => !(data === null || data === void 0 ? void 0 : data.isEmptyTagCompletion))) === null || _a === void 0 ? void 0 : _a[0];
        while (!htmlRange && initialOffset < pugDoc.pugCode.length) {
            initialOffset++;
            htmlRange = (_b = pugDoc.sourceMap.getMappedRange(initialOffset, initialOffset, data => !(data === null || data === void 0 ? void 0 : data.isEmptyTagCompletion))) === null || _b === void 0 ? void 0 : _b[0];
        }
        if (!htmlRange)
            return;
        const htmlScanner = htmlLs.createScanner(pugDoc.htmlCode, htmlRange.start);
        let offset;
        let end;
        return {
            scan: () => {
                offset = undefined;
                end = undefined;
                return htmlScanner.scan();
            },
            getTokenOffset: () => {
                getTokenRange();
                return offset;
            },
            getTokenEnd: () => {
                getTokenRange();
                return end;
            },
            getTokenText: htmlScanner.getTokenText,
            getTokenLength: htmlScanner.getTokenLength,
            getTokenError: htmlScanner.getTokenError,
            getScannerState: htmlScanner.getScannerState,
        };
        function getTokenRange() {
            var _a;
            if (offset === undefined || end === undefined) {
                const htmlOffset = htmlScanner.getTokenOffset();
                const htmlEnd = htmlScanner.getTokenEnd();
                const pugRange = (_a = pugDoc.sourceMap.getSourceRange(htmlOffset, htmlEnd)) === null || _a === void 0 ? void 0 : _a[0];
                if (pugRange) {
                    offset = pugRange.start;
                    end = pugRange.end;
                }
                else {
                    offset = -1;
                    end = -1;
                }
            }
        }
    };
}
exports.register = register;
//# sourceMappingURL=scanner.js.map