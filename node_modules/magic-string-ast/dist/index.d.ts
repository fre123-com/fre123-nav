import MagicStringBase__default, { MagicStringOptions, OverwriteOptions } from 'magic-string';
export * from 'magic-string';
export { default as MagicStringBase } from 'magic-string';
import { Node } from '@babel/types';

declare class MagicString extends MagicStringBase__default {
    offset: number;
    constructor(str: string, options?: MagicStringOptions & {
        /** offset of node */
        offset?: number;
    });
    private getNodePos;
    removeNode(node: Node | Node[], { offset }?: {
        offset?: number;
    }): this;
    moveNode(node: Node | Node[], index: number, { offset }?: {
        offset?: number;
    }): this;
    sliceNode(node: Node | Node[], { offset }?: {
        offset?: number;
    }): string;
    overwriteNode(node: Node | Node[], content: string | Node | Node[], { offset, ...options }?: OverwriteOptions & {
        offset?: number;
    }): this;
    snipNode(node: Node | Node[], { offset }?: {
        offset?: number;
    }): MagicStringBase__default;
}
declare function generateTransform(s: MagicStringBase__default | undefined, id: string): {
    code: string;
    map: any;
} | undefined;

export { MagicString, generateTransform };
