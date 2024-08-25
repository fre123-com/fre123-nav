import { Parser } from './parser';
import { BinOp, UnaryOp, Num, Var, Assign } from './tokens';
import type { Operand } from './tokens';
export default class Interpreter {
    parser: Parser;
    GLOBAL_SCOPE: {
        [key: string]: unknown;
    };
    constructor(parser: Parser);
    error(msg?: string): never;
    visit(node: Operand): unknown;
    visit_Num(node: Num): number;
    visit_BinOp(node: BinOp): number;
    visit_UnaryOp(node: UnaryOp): number;
    visit_Assign(node: Assign): void;
    visit_Var(node: Var): unknown;
    visit_NoOp(): void;
    interpret(): unknown;
}
