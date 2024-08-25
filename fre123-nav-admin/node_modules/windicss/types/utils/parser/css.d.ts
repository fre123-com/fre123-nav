import { StyleSheet } from '../style';
import type { Processor } from '../../lib';
export default class CSSParser {
    css?: string;
    processor?: Processor;
    variables: {
        [key: string]: unknown;
    };
    private _cache;
    constructor(css?: string, processor?: Processor);
    private _addCache;
    private _searchGroup;
    private _loadTheme;
    private _handleDirectives;
    private _generateNestProperty;
    private _generateNestStyle;
    parse(css?: string | undefined, parent?: string, parentType?: 'atRule' | 'selector'): StyleSheet;
}
