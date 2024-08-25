import * as vscode from 'vscode-languageserver';
import type { SourceFiles } from '../sourceFiles';
import type { ApiLanguageServiceContext } from '../types';
import type { TsMappingData } from '../utils/sourceMaps';
export declare function register({ sourceFiles, getCssLs, getTsLs, scriptTsLs }: ApiLanguageServiceContext): {
    prepareRename: (uri: string, position: vscode.Position) => vscode.ResponseError | vscode.Range | undefined;
    doRename: (uri: string, position: vscode.Position, newName: string) => Promise<vscode.WorkspaceEdit | undefined>;
    onRenameFile: (oldUri: string, newUri: string) => Promise<vscode.WorkspaceEdit | undefined>;
};
export declare function margeWorkspaceEdits(original: vscode.WorkspaceEdit, ...others: vscode.WorkspaceEdit[]): void;
/**
 * Start from Script LS
 * -> Access all results
 *
 * Start from template LS
 * -> Start from template content?
 *    -> Access all results
 * -> Start from script content?
 *    -> Yes: Only access template results
 *    -> No: Access all results
 */
export declare function tsEditToVueEdit(lsType: 'script' | 'template', ignoreScriptLsResult: boolean, tsResult: vscode.WorkspaceEdit, sourceFiles: SourceFiles, isValidRange: (data: TsMappingData) => boolean): vscode.WorkspaceEdit | undefined;
