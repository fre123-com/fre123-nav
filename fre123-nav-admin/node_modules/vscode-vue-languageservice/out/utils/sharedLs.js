"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDummyTsLs = void 0;
const shared = require("@volar/shared");
// Fast dummy TS language service, only has one script.
let dummyProjectVersion = 0;
let dummyTsLs;
let doc;
function getDummyTsLs(ts, ts2, _doc, getPreferences, getFormatOptions) {
    if (!dummyTsLs) {
        const host = {
            getProjectVersion: () => dummyProjectVersion.toString(),
            getPreferences,
            getFormatOptions,
            getCompilationSettings: () => ({ allowJs: true, jsx: ts.JsxEmit.Preserve }),
            getScriptFileNames: () => [shared.uriToFsPath(doc.uri)],
            getScriptVersion: (fileName) => {
                if (shared.fsPathToUri(fileName) === doc.uri) {
                    return doc.version.toString();
                }
                return '';
            },
            getScriptSnapshot: fileName => {
                if (shared.fsPathToUri(fileName) === shared.normalizeUri(doc.uri)) {
                    return ts.ScriptSnapshot.fromString(doc.getText());
                }
            },
            getCurrentDirectory: () => '',
            getDefaultLibFileName: () => '',
        };
        dummyTsLs = ts2.createLanguageService(ts, host, ts.createLanguageService(host));
    }
    dummyProjectVersion++;
    doc = _doc;
    return dummyTsLs;
}
exports.getDummyTsLs = getDummyTsLs;
//# sourceMappingURL=sharedLs.js.map