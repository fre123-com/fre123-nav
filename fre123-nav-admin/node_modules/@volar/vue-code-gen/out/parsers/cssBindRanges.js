"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchBindTexts = void 0;
function* getMatchBindTexts(nodeText) {
    var _a, _b;
    const reg = /\bv-bind\(\s*(?:'([^']+)'|"([^"]+)"|([^'"][^)]*))\s*\)/g;
    const matchs = nodeText.matchAll(reg);
    for (const match of matchs) {
        if (match.index !== undefined) {
            const matchText = (_b = (_a = match[1]) !== null && _a !== void 0 ? _a : match[2]) !== null && _b !== void 0 ? _b : match[3];
            if (matchText !== undefined) {
                const offset = match.index + nodeText.substr(match.index).indexOf(matchText);
                yield { start: offset, end: offset + matchText.length };
            }
        }
    }
}
exports.getMatchBindTexts = getMatchBindTexts;
//# sourceMappingURL=cssBindRanges.js.map