import { SourceCodeTransformer } from '@unocss/core';

type FilterPattern = Array<string | RegExp> | string | RegExp | null;
interface TransformerAttributifyJsxOptions {
    /**
     * the list of attributes to ignore
     * @default []
     */
    blocklist?: (string | RegExp)[];
    /**
     * Regex of modules to be included from processing
     * @default [/\.[jt]sx$/, /\.mdx$/]
     */
    include?: FilterPattern;
    /**
     * Regex of modules to exclude from processing
     *
     * @default []
     */
    exclude?: FilterPattern;
}
declare function transformerAttributifyJsx(options?: TransformerAttributifyJsxOptions): SourceCodeTransformer;

export { type FilterPattern, type TransformerAttributifyJsxOptions, transformerAttributifyJsx as default };
