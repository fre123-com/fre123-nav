import { SourceCodeTransformer, UnoGenerator } from '@unocss/core';
import MagicString from 'magic-string';

interface TransformerDirectivesOptions {
    enforce?: SourceCodeTransformer['enforce'];
    /**
     * Throw an error if utils or themes are not found.
     *
     * @default true
     */
    throwOnMissing?: boolean;
    /**
     * Treat CSS custom properties as @apply directives for CSS syntax compatibility.
     *
     * Pass `false` to disable.
     *
     * @default ['--at-apply', '--uno-apply', '--uno']
     */
    applyVariable?: false | string | string[];
    /**
     * Treat CSS custom properties as directives for CSS syntax compatibility.
     *
     * Pass `false` to disable, or a string to use as a prefix.
     *
     * @deprecated use `applyVariable` to specify the full var name instead.
     * @default '--at-'
     */
    varStyle?: false | string;
}
interface TransformerDirectivesContext {
    code: MagicString;
    uno: UnoGenerator;
    options: TransformerDirectivesOptions;
    applyVariable: string[];
    offset?: number;
    filename?: string;
}
declare function transformerDirectives(options?: TransformerDirectivesOptions): SourceCodeTransformer;
declare function transformDirectives(code: MagicString, uno: UnoGenerator, options: TransformerDirectivesOptions, filename?: string, originalCode?: string, offset?: number): Promise<void>;

export { type TransformerDirectivesContext, type TransformerDirectivesOptions, transformerDirectives as default, transformDirectives };
