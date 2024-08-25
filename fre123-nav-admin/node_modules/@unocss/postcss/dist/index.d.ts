import { Root, Result } from 'postcss';
import { UserConfig } from '@unocss/core';

interface UnoPostcssPluginOptions {
    content?: (string | {
        raw: string;
        extension: string;
    })[];
    directiveMap?: {
        apply?: string;
        screen?: string;
        theme?: string;
        unocss?: string;
    };
    cwd?: string;
    configOrPath?: string | UserConfig;
}

declare function unocss(options?: UnoPostcssPluginOptions): {
    postcssPlugin: string;
    plugins: ((root: Root, result: Result) => Promise<void>)[];
};
declare namespace unocss {
    export var postcss: boolean;
    var _a: typeof unocss;
    export { _a as default };
}

export { type UnoPostcssPluginOptions, unocss as default };
