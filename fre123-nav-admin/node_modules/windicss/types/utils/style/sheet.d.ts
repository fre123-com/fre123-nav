import { Layer } from '../../interfaces';
import type { Style } from './base';
export declare class StyleSheet {
    children: Style[];
    prefixer: boolean;
    constructor(children?: Style[]);
    add(item?: Style | Style[]): this;
    extend(styleSheet: StyleSheet | undefined, append?: boolean, dedup?: boolean): this;
    combine(): this;
    layer(type: Layer): StyleSheet;
    split(): {
        base: StyleSheet;
        components: StyleSheet;
        utilities: StyleSheet;
    };
    clone(): StyleSheet;
    sort(): this;
    sortby(compareFn?: ((a: Style, b: Style) => number) | undefined): this;
    build(minify?: boolean): string;
}
