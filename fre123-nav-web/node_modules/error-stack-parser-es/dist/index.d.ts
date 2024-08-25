/**
 * Port from https://github.com/stacktracejs/error-stack-parser-es
 */
interface StackFrame {
    args?: any[];
    isConstructor?: boolean;
    isEval?: boolean;
    isNative?: boolean;
    isToplevel?: boolean;
    columnNumber?: number;
    lineNumber?: number;
    fileName?: string;
    functionName?: string;
    source?: string;
}
/**
 * Given an Error object, extract the most information from it.
 *
 * @param {Error} error object
 * @return {Array} of StackFrames
 */
declare function parse(error: Error): StackFrame[];
declare function extractLocation(urlLike: string): string[] | readonly [string, string | undefined, string | undefined];
declare function parseV8OrIE(error: Error): StackFrame[];
declare function parseFFOrSafari(error: Error): StackFrame[];
declare function parseOpera(e: Error): StackFrame[];
declare function parseOpera9(e: Error): StackFrame[];
declare function parseOpera10(e: Error): StackFrame[];
declare function parseOpera11(error: Error): StackFrame[];

export { StackFrame, extractLocation, parse, parseFFOrSafari, parseOpera, parseOpera10, parseOpera11, parseOpera9, parseV8OrIE };
