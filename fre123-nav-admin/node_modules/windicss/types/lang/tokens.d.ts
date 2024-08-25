export declare class Token {
    type: TokenType;
    value?: string | number;
    meta?: string;
    constructor(type: TokenType, value?: string | number, meta?: string);
}
export declare enum TokenType {
    NUMBER = "NUMBER",
    PIXEL = "PIXEL",
    REM = "REM",
    EM = "EM",
    SECOND = "SECOND",
    DEGREE = "DEGREE",
    PERCENTAGE = "PERCENTAGE",
    STRING = "STRING",
    TEMPLATE = "TEMPLATE",
    COLOR = "COLOR",
    PLUS = "+",
    MINUS = "-",
    MUL = "*",
    DIV = "/",
    MOD = "%",
    EXP = "**",
    ADDEQUAL = "+=",
    MINUSEQUAL = "-=",
    MULEQUAL = "*=",
    DIVEQUAL = "/=",
    MODEQUAL = "%=",
    EXPEQUAL = "**=",
    INCREASE = "++",
    DECREASE = "--",
    ARROW = "=>",
    EQUAL = "==",
    NOTEQUAL = "!=",
    GERATER = ">",
    LESS = "<",
    GERATEREQUAL = ">=",
    LESSEQUAL = "<=",
    TERNARY = "?",
    NO = "!",
    AND = "and",
    OR = "or",
    NOT = "not",
    FROM = "from",
    IN = "in",
    NOTIN = "not in",
    AS = "as",
    NONE = "None",
    TRUE = "True",
    FALSE = "False",
    DOLLAR = "$",
    DOT = ".",
    COMMA = ",",
    LPAREN = "(",
    RPAREN = ")",
    LCURLY = "{",
    RCURLY = "}",
    LSQUARE = "[",
    RSQUARE = "]",
    UNKNOWN = "UNKNOWN",
    ASSIGN = "=",
    SPACE = "SPACE",
    SEMI = ";",
    COLON = ":",
    EOF = "EOF",
    ID = "ID",
    VAR = "@var",
    APPLY = "@apply",
    ATTR = "@attr",
    MIXIN = "@mixin",
    INCLUDE = "@include",
    FUNC = "@func",
    ASYNC = "@async",
    AWAIT = "@await",
    RETURN = "@return",
    YIELD = "@yield",
    IMPORT = "@import",
    EXPORT = "@export",
    LOAD = "@load",
    IF = "@if",
    ELSE = "@else",
    ELIF = "@elif",
    WHILE = "@while",
    FOR = "@for",
    JS = "@js",
    LOG = "@log",
    WARN = "@warn",
    ERROR = "@error",
    ASSERT = "@assert",
    BREAK = "@break",
    CONTINUE = "@continue",
    TRY = "@try",
    EXCEPT = "@except",
    FINALLY = "@finally",
    WITH = "@with",
    RAISE = "@raise",
    DEL = "@del",
    NEW = "new"
}
export declare const REVERSED_KEYWORDS: {
    [key: string]: Token;
};
export declare class Num {
    token: Token;
    value: number;
    constructor(token: Token);
}
export declare class Bool {
    value: boolean;
    constructor(value: boolean);
}
export declare class None {
}
export declare class PIXEL extends Num {
}
export declare class REM extends Num {
}
export declare class Str {
    token: Token;
    value: string;
    constructor(token: Token);
}
export declare type DataType = Operand | Str | Template | Tuple | List | Dict | Bool | None | Func;
export declare class Tuple {
    values: (DataType)[];
    constructor(values: (DataType)[]);
}
export declare class List {
    values: (DataType)[];
    constructor(values: (DataType)[]);
}
export declare class Params {
    values: (DataType)[];
    constructor(values: (DataType)[]);
}
export declare class Dict {
    pairs: [string | number, (DataType)][];
    constructor(pairs: [string | number, (DataType)][]);
}
export declare class Template {
    token: Token;
    value: string;
    constructor(token: Token);
}
export declare class Apply {
    value: Str | Template;
    constructor(value: string);
}
export declare class Attr {
    attr: string;
    value: Str | Template;
    constructor(attr: string, value: string);
}
export declare class Var {
    token: Token;
    value: string;
    constructor(token: Token);
}
export declare class Assign {
    left: Var;
    op: Token;
    right: DataType;
    constructor(left: Var, op: Token, right: DataType);
}
export declare class Update {
    left: Var;
    op: Token;
    right: DataType;
    constructor(left: Var, op: Token, right: DataType);
}
export declare class Console {
    type: TokenType.LOG | TokenType.WARN | TokenType.ERROR | TokenType.ASSERT;
    expr: DataType;
    constructor(type: TokenType.LOG | TokenType.WARN | TokenType.ERROR | TokenType.ASSERT, expr: DataType);
}
export declare class JS {
    code: string;
    constructor(code: string);
}
export declare class PropDecl {
    name: string;
    value: Str | Template;
    constructor(name: string, value: Str | Template);
}
export declare class StyleDecl {
    selector: string;
    children: Block;
    constructor(selector: string, children: Block);
}
export declare class Block {
    statement_list: (Assign | Update | Console | NoOp)[];
    style_list: (StyleDecl | PropDecl | NoOp)[];
    constructor(statement_list: (Assign | Update | Console | NoOp)[], style_list: (StyleDecl | PropDecl | NoOp)[]);
}
export declare class Func {
    name?: string;
    params: string[];
    block: Block;
    async: boolean;
    constructor(params: string[], block: Block, name?: string, async?: boolean);
}
export declare class Instance {
    name: string;
    params?: DataType[];
    constructor(name: string, params?: DataType[]);
}
export declare class Lambda {
    params: string[];
    expr: DataType;
    name?: string;
    async: boolean;
    constructor(params: string[], expr: DataType, name?: string, async?: boolean);
}
export declare class Return {
    value: DataType;
    constructor(value: DataType);
}
export declare class Await {
    value: DataType;
    constructor(value: DataType);
}
export declare class Yield {
    value: DataType;
    constructor(value: DataType);
}
export declare class Del {
    value: DataType;
    constructor(value: DataType);
}
export declare class Raise {
    value: DataType;
    constructor(value: DataType);
}
export declare class Continue {
}
export declare class Break {
}
export declare class If {
    if_block: [DataType, Block];
    elif_blocks?: [DataType, Block][];
    else_block?: Block;
    constructor(expr: DataType, block: Block, elif_blocks?: [DataType, Block][], else_block?: Block);
    add_elif(expr: DataType, block: Block): void;
    add_else(block: Block): void;
}
export declare class Try {
    try_block: Block;
    except_blocks?: [string, Block, string | undefined][];
    finally_except_block?: Block;
    else_block?: Block;
    finally_block?: Block;
    constructor(block: Block);
    add_except(error: string, block: Block, alias?: string): void;
    add_else(block: Block): void;
    add_finally(block: Block): void;
    add_finally_except(block: Block): void;
}
export declare class While {
    if_block: [DataType, Block];
    else_block?: Block;
    constructor(expr: DataType, block: Block, else_block?: Block);
    add_else(block: Block): void;
}
export declare class For {
    variables: string[];
    iterable: DataType;
    for_block: Block;
    else_block?: Block;
    constructor(variables: string[], iterable: DataType, for_block: Block, else_block?: Block);
    add_else(block: Block): void;
}
export declare class With {
    expr: DataType;
    name: string;
    block: Block;
    constructor(expr: DataType, name: string, block: Block);
}
export declare class Program {
    block: Block;
    constructor(block: Block);
}
export declare class UnaryOp {
    op: Token;
    expr: Operand;
    constructor(op: Token, expr: Operand);
}
export declare class BinOp {
    left: Operand;
    op: Token;
    right: Operand;
    constructor(left: Operand, op: Token, right: Operand);
}
export declare class Import {
    urls: string[];
    constructor(urls: string[]);
}
export declare type Module = {
    url: string;
    default?: string;
    exports?: {
        [key: string]: string;
    };
};
export declare class Load {
    modules: Module[];
    constructor(modules: Module[]);
}
export declare class NoOp {
}
export declare type Operand = Num | BinOp | UnaryOp | NoOp;
