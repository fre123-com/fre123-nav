import type { DocumentUri } from 'vscode-languageserver-textdocument';
export declare function uriToFsPath(uri: DocumentUri): string;
export declare function fsPathToUri(fsPath: string): DocumentUri;
export declare function normalizeFileName(fsPath: string): string;
export declare function normalizeUri(uri: string): string;
export declare function isFileInDir(fileName: string, dir: string): boolean | "";
