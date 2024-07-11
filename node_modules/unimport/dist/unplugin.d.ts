import * as unplugin from 'unplugin';
import { FilterPattern } from '@rollup/pluginutils';
import { U as UnimportOptions } from './shared/unimport.d0a971e7.js';
import 'magic-string';

interface UnimportPluginOptions extends UnimportOptions {
    include: FilterPattern;
    exclude: FilterPattern;
    dts: boolean | string;
    /**
     * Enable implicit auto import.
     * Generate global TypeScript definitions.
     *
     * @default true
     */
    autoImport?: boolean;
}
declare const defaultIncludes: RegExp[];
declare const defaultExcludes: RegExp[];
declare const _default: unplugin.UnpluginInstance<Partial<UnimportPluginOptions>, boolean>;

export { type UnimportPluginOptions, _default as default, defaultExcludes, defaultIncludes };
