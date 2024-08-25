import { Token } from './tokens';
export declare class Lexer {
    text: string;
    pos: number;
    _isFunc: boolean;
    _isID: boolean;
    current_char?: string;
    constructor(text: string);
    error(msg?: string): never;
    advance(step?: number): string | undefined;
    peek(): string | undefined;
    skip_whitespace(): void;
    string(char: '\'' | '"' | '`'): Token;
    keyword(): Token;
    numeric(): Token;
    color(): Token;
    id(): Token;
    property(): Token;
    unknown(): Token;
    peek_next_token(count?: number): Token;
    get_next_token(): Token;
}
