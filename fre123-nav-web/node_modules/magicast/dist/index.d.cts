import { O as Options, P as ProxifiedModule, a as Proxified, G as GenerateOptions } from './shared/magicast.8e177158.cjs';
export { C as CodeFormatOptions, I as ImportItemInput, L as Loc, b as ParsedFileNode, d as ProxifiedArray, e as ProxifiedFunctionCall, h as ProxifiedIdentifier, j as ProxifiedImportItem, i as ProxifiedImportsMap, f as ProxifiedNewExpression, g as ProxifiedObject, k as ProxifiedValue, c as ProxyBase, l as ProxyType, T as Token, m as detectCodeFormat } from './shared/magicast.8e177158.cjs';
import { Node } from '@babel/types';
export { Node as ASTNode } from '@babel/types';

declare function parseModule<Exports extends object = any>(code: string, options?: Options): ProxifiedModule<Exports>;
declare function parseExpression<T>(code: string, options?: Options): Proxified<T>;
declare function generateCode(node: {
    $ast: Node;
} | Node | ProxifiedModule<any>, options?: GenerateOptions): {
    code: string;
    map?: any;
};
declare function loadFile<Exports extends object = any>(filename: string, options?: Options): Promise<ProxifiedModule<Exports>>;
declare function writeFile(node: {
    $ast: Node;
} | Node, filename: string, options?: Options): Promise<void>;

interface MagicastErrorOptions {
    ast?: Node;
    code?: string;
}
declare class MagicastError extends Error {
    rawMessage: string;
    options?: MagicastErrorOptions;
    constructor(message: string, options?: MagicastErrorOptions);
}

declare const builders: {
    /**
     * Create a function call node.
     */
    functionCall(callee: string, ...args: any[]): Proxified;
    /**
     * Create a new expression node.
     */
    newExpression(callee: string, ...args: any[]): Proxified;
    /**
     * Create a proxified version of a literal value.
     */
    literal(value: any): Proxified;
    /**
     * Parse a raw expression and return a proxified version of it.
     *
     * ```ts
     * const obj = builders.raw("{ foo: 1 }");
     * console.log(obj.foo); // 1
     * ```
     */
    raw(code: string): Proxified;
};

export { GenerateOptions, MagicastError, type MagicastErrorOptions, Proxified, ProxifiedModule, builders, generateCode, loadFile, parseExpression, parseModule, writeFile };
