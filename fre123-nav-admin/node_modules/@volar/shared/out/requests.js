"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectDocumentNameCasesRequest = exports.WriteVirtualFilesNotification = exports.VerifyAllScriptsNotification = exports.GetRefCompleteEditsRequest = exports.GetTagCloseEditsRequest = exports.D3Request = exports.GetMatchTsConfigRequest = exports.DepsRequest = exports.InitDoneRequest = exports.GetEditorSelectionRequest = exports.GetDocumentPrintWidthRequest = exports.GetDocumentNameCasesRequest = exports.ShowReferencesNotification = exports.GetDocumentVersionRequest = exports.GetDocumentContentRequest = void 0;
const rpc = require("vscode-jsonrpc");
/**
 * Client Requests
 */
var GetDocumentContentRequest;
(function (GetDocumentContentRequest) {
    GetDocumentContentRequest.type = new rpc.RequestType('vscode/content');
})(GetDocumentContentRequest = exports.GetDocumentContentRequest || (exports.GetDocumentContentRequest = {}));
var GetDocumentVersionRequest;
(function (GetDocumentVersionRequest) {
    GetDocumentVersionRequest.type = new rpc.RequestType('vue/docVersion');
})(GetDocumentVersionRequest = exports.GetDocumentVersionRequest || (exports.GetDocumentVersionRequest = {}));
var ShowReferencesNotification;
(function (ShowReferencesNotification) {
    ShowReferencesNotification.type = new rpc.NotificationType('vue.findReferences');
})(ShowReferencesNotification = exports.ShowReferencesNotification || (exports.ShowReferencesNotification = {}));
var GetDocumentNameCasesRequest;
(function (GetDocumentNameCasesRequest) {
    GetDocumentNameCasesRequest.type = new rpc.RequestType('volar/getAttrNameCaseClient');
})(GetDocumentNameCasesRequest = exports.GetDocumentNameCasesRequest || (exports.GetDocumentNameCasesRequest = {}));
var GetDocumentPrintWidthRequest;
(function (GetDocumentPrintWidthRequest) {
    GetDocumentPrintWidthRequest.type = new rpc.RequestType('vue/getDocumentWordWrapColumn');
})(GetDocumentPrintWidthRequest = exports.GetDocumentPrintWidthRequest || (exports.GetDocumentPrintWidthRequest = {}));
var GetEditorSelectionRequest;
(function (GetEditorSelectionRequest) {
    GetEditorSelectionRequest.type = new rpc.RequestType0('vue/activeSelection');
})(GetEditorSelectionRequest = exports.GetEditorSelectionRequest || (exports.GetEditorSelectionRequest = {}));
/**
 * Server Requests
 */
var InitDoneRequest;
(function (InitDoneRequest) {
    InitDoneRequest.type = new rpc.RequestType0('volar/init');
})(InitDoneRequest = exports.InitDoneRequest || (exports.InitDoneRequest = {}));
var DepsRequest;
(function (DepsRequest) {
    DepsRequest.type = new rpc.RequestType0('volar/depFiles');
})(DepsRequest = exports.DepsRequest || (exports.DepsRequest = {}));
var GetMatchTsConfigRequest;
(function (GetMatchTsConfigRequest) {
    GetMatchTsConfigRequest.type = new rpc.RequestType('volar/tsconfig');
})(GetMatchTsConfigRequest = exports.GetMatchTsConfigRequest || (exports.GetMatchTsConfigRequest = {}));
var D3Request;
(function (D3Request) {
    D3Request.type = new rpc.RequestType('volar/d3');
})(D3Request = exports.D3Request || (exports.D3Request = {}));
var GetTagCloseEditsRequest;
(function (GetTagCloseEditsRequest) {
    GetTagCloseEditsRequest.type = new rpc.RequestType('html/tag');
})(GetTagCloseEditsRequest = exports.GetTagCloseEditsRequest || (exports.GetTagCloseEditsRequest = {}));
var GetRefCompleteEditsRequest;
(function (GetRefCompleteEditsRequest) {
    GetRefCompleteEditsRequest.type = new rpc.RequestType('volar/ref');
})(GetRefCompleteEditsRequest = exports.GetRefCompleteEditsRequest || (exports.GetRefCompleteEditsRequest = {}));
var VerifyAllScriptsNotification;
(function (VerifyAllScriptsNotification) {
    VerifyAllScriptsNotification.type = new rpc.NotificationType0('volar.action.verifyAllScripts');
})(VerifyAllScriptsNotification = exports.VerifyAllScriptsNotification || (exports.VerifyAllScriptsNotification = {}));
var WriteVirtualFilesNotification;
(function (WriteVirtualFilesNotification) {
    WriteVirtualFilesNotification.type = new rpc.NotificationType('volar.action.writeVirtualFiles');
})(WriteVirtualFilesNotification = exports.WriteVirtualFilesNotification || (exports.WriteVirtualFilesNotification = {}));
var DetectDocumentNameCasesRequest;
(function (DetectDocumentNameCasesRequest) {
    DetectDocumentNameCasesRequest.type = new rpc.RequestType('volar/getTagNameCaseServer');
})(DetectDocumentNameCasesRequest = exports.DetectDocumentNameCasesRequest || (exports.DetectDocumentNameCasesRequest = {}));
//# sourceMappingURL=requests.js.map