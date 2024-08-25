import * as t from '@babel/types';
import { ParserOptions, ParseResult } from '@babel/parser';
import { AttachedScope } from '@rollup/pluginutils';
export { AttachedScope } from '@rollup/pluginutils';

type NodeType = t.Node['type'] | 'Function' | 'Literal';
type GetNode<K extends NodeType> = K extends 'Function' ? t.Function : K extends 'Literal' ? t.Literal : Extract<t.Node, {
    type: K;
}>;
declare function isTypeOf<K extends NodeType>(node: t.Node | undefined | null, types: Readonly<K[]>): node is GetNode<K>;
declare function isCallOf(node: t.Node | null | undefined, test: string | string[] | ((id: string) => boolean)): node is t.CallExpression;
declare function isIdentifierOf(node: t.Node | undefined | null, test: string | string[]): node is t.Identifier;
declare function isLiteralType(node: t.Node | undefined | null): node is t.Literal;
declare function isFunctionType(node: t.Node | undefined | null): node is t.Function;
/**
 * Check if the input `node` is a reference to a bound variable.
 *
 * Copied from https://github.com/babel/babel/blob/main/packages/babel-types/src/validators/isReferenced.ts
 * To avoid runtime dependency on @babel/types (which includes process references)
 * This file should not change very often in babel but we may need to keep it
 * up-to-date from time to time.
 *
 * https://github.com/babel/babel/blob/main/LICENSE
 */
declare function isReferenced(node: t.Node, parent: t.Node, grandparent?: t.Node): boolean;

declare const REGEX_DTS: RegExp;
declare const REGEX_LANG_TS: RegExp;
declare const REGEX_LANG_JSX: RegExp;
declare function getLang(filename: string): any;
declare function isDts(filename: string): boolean;
declare function isTs(lang?: string): boolean;

declare function babelParse(code: string, lang?: string, options?: ParserOptions): ParseResult<t.Program>;
declare function babelParseExpression<T extends t.Node = t.Expression>(code: string, lang?: string, options?: ParserOptions): ParseResult<T>;

declare function resolveString(node: string | t.Identifier | t.Literal | t.PrivateName | t.ThisExpression | t.Super, computed?: boolean): string;
declare function resolveLiteral(node: t.Literal): string | number | boolean | null | RegExp | bigint;
declare function resolveTemplateLiteral(node: t.TemplateLiteral): string;
declare function resolveIdentifier(node: t.Identifier | t.PrivateName | t.MemberExpression | t.ThisExpression | t.Super | t.TSEntityName): string[];
type ObjectPropertyLike = t.ObjectMethod | t.ObjectProperty | t.TSMethodSignature | t.TSPropertySignature;
declare function resolveObjectKey(node: ObjectPropertyLike, raw?: false): string | number;
declare function resolveObjectKey(node: ObjectPropertyLike, raw: true): string;

declare const attachScopes: <T>(ast: T, propertyName?: string) => AttachedScope;

type WithScope<T> = T & {
    scope?: AttachedScope;
};

type LiteralUnion<LiteralType, BaseType extends null | undefined | string | number | boolean | symbol | bigint = string> = LiteralType | (BaseType & Record<never, never>);

declare const TS_NODE_TYPES: readonly ["TSAsExpression", "TSTypeAssertion", "TSNonNullExpression", "TSInstantiationExpression", "TSSatisfiesExpression"];
declare function unwrapTSNode(node: t.Node): t.Node;
declare function escapeKey(rawKey: string): string;

interface WalkThis<T> {
    skip: () => void;
    remove: () => void;
    replace: (node: T) => void;
}
type WalkCallback<T, R> = (this: WalkThis<T>, node: T, parent: T | null | undefined, key: string | null | undefined, index: number | null | undefined) => R;
interface WalkHandlers<T, R> {
    enter?: WalkCallback<T, R>;
    leave?: WalkCallback<T, R>;
}
declare const walkAST: <T = t.Node>(node: T, hooks: WalkHandlers<T, void>) => T | null;
declare const walkASTAsync: <T = t.Node>(node: T, handlers: WalkHandlers<T, Promise<void>>) => Promise<T | null>;
type SetupCallback<T extends NodeType = NodeType, N = GetNode<T>> = (this: WalkThis<N>, node: N, parent: T extends keyof t.ParentMaps ? t.ParentMaps[T] : t.Node | null, key: string | null | undefined, index: number | null | undefined) => void | Promise<void>;
interface WalkSetup {
    onEnter<T extends NodeType = NodeType>(type: T | T[] | SetupFilter<GetNode<T>> | WalkCallback<t.Node, void>, cb?: SetupCallback<T, GetNode<T>>): void;
    onLeave<T extends NodeType = NodeType>(type: T | T[] | SetupFilter<GetNode<T>> | WalkCallback<t.Node, void>, cb?: SetupCallback<T, GetNode<T>>): void;
}
type SetupFilter<N extends t.Node = t.Node> = (this: WalkThis<t.Node>, node: t.Node, parent: t.Node | null | undefined, key: string | null | undefined, index: number | null | undefined) => node is N;
declare function walkASTSetup(node: t.Node, cb: (setup: WalkSetup) => void | Promise<void>): Promise<t.Node | null>;
interface ImportBinding {
    local: string;
    imported: LiteralUnion<'*' | 'default'>;
    source: string;
    specifier: t.ImportSpecifier | t.ImportDefaultSpecifier | t.ImportNamespaceSpecifier;
    isType: boolean;
}
declare function walkImportDeclaration(imports: Record<string, ImportBinding>, node: t.ImportDeclaration): void;

export { GetNode, ImportBinding, LiteralUnion, NodeType, ObjectPropertyLike, REGEX_DTS, REGEX_LANG_JSX, REGEX_LANG_TS, TS_NODE_TYPES, WithScope, attachScopes, babelParse, babelParseExpression, escapeKey, getLang, isCallOf, isDts, isFunctionType, isIdentifierOf, isLiteralType, isReferenced, isTs, isTypeOf, resolveIdentifier, resolveLiteral, resolveObjectKey, resolveString, resolveTemplateLiteral, unwrapTSNode, walkAST, walkASTAsync, walkASTSetup, walkImportDeclaration };
