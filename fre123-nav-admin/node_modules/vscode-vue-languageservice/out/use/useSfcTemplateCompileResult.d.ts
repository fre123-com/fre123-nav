import * as vscode from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Ref } from '@vue/reactivity';
import { VueCompilerOptions } from '../types';
export declare function useSfcTemplateCompileResult(htmlDocument: Ref<TextDocument | undefined>, compilerOptions: VueCompilerOptions): import("@vue/reactivity").ComputedRef<{
    ast: import("@vue/compiler-core").RootNode | undefined;
    errors: vscode.Diagnostic[];
} | undefined>;
