import { Style, StyleSheet } from '../utils/style';
import { HandlerCreator } from './utilities/handler';
import type { Config, DictStr, DefaultConfig, DynamicUtility, DefaultTheme, Shortcut, PluginUtils, PluginUtilOptions, PluginOutput, PluginWithOptions, DeepNestObject, UtilityGenerator, VariantGenerator, Validata, StyleArrayObject, PluginCache, ResolvedVariants, VariantTypes, VariantUtils } from '../interfaces';
export declare class Processor {
    private _config;
    private _theme;
    private _variants;
    private _cache;
    _handler: HandlerCreator;
    readonly _plugin: PluginCache;
    pluginUtils: PluginUtils;
    variantUtils: VariantUtils;
    constructor(config?: Config);
    private _resolveConfig;
    private _reduceFunction;
    private _resolvePresets;
    private _resolveFunction;
    private _replaceStyleVariants;
    private _addPluginProcessorCache;
    private _loadVariables;
    loadConfig(config?: Config): Config;
    resolveConfig(config: Config | undefined, presets: Config): Config;
    resolveVariants(type?: VariantTypes): ResolvedVariants;
    resolveStaticUtilities(includePlugins?: boolean): StyleArrayObject;
    resolveDynamicUtilities(includePlugins?: boolean): DynamicUtility;
    get allConfig(): DefaultConfig;
    get allTheme(): DefaultTheme;
    get allVariant(): string[];
    wrapWithVariants(variants: string[], styles: Style | Style[]): Style[] | undefined;
    removePrefix(className: string): string;
    markAsImportant(style: Style, force?: boolean | string): Style;
    extract(className: string, addComment?: boolean, prefix?: string): Style | Style[] | undefined;
    test(className: string, prefix?: string): boolean;
    preflight(html?: string, includeBase?: boolean, includeGlobal?: boolean, includePlugins?: boolean, ignoreProcessed?: boolean): StyleSheet;
    interpret(classNames: string, ignoreProcessed?: boolean, handleIgnored?: (ignored: string) => Style | Style[] | undefined): {
        success: string[];
        ignored: string[];
        styleSheet: StyleSheet;
    };
    validate(classNames: string): {
        success: Validata[];
        ignored: Validata[];
    };
    compile(classNames: string, prefix?: string, showComment?: boolean, ignoreGenerated?: boolean, handleIgnored?: (ignored: string) => Style | Style[] | undefined, outputClassName?: string): {
        success: string[];
        ignored: string[];
        className?: string;
        styleSheet: StyleSheet;
    };
    attributify(attrs: {
        [key: string]: string | string[];
    }, ignoreProcessed?: boolean): {
        success: string[];
        ignored: string[];
        styleSheet: StyleSheet;
    };
    loadPlugin({ handler, config, }: PluginOutput): void;
    loadPluginWithOptions(optionsFunction: PluginWithOptions<any>, userOptions?: DictStr): void;
    loadShortcuts(shortcuts: {
        [key: string]: Shortcut;
    }): void;
    loadAlias(alias: {
        [key: string]: string;
    }): void;
    config(path: string, defaultValue?: unknown): unknown;
    theme(path: string, defaultValue?: unknown): unknown;
    corePlugins(path: string): boolean;
    variants(path: string, defaultValue?: string[]): string[];
    e(selector: string): string;
    prefix(selector: string): string;
    addUtilities(utilities: DeepNestObject | DeepNestObject[], options?: PluginUtilOptions): Style[];
    addDynamic(key: string, generator: UtilityGenerator, options?: PluginUtilOptions): UtilityGenerator;
    addComponents(components: DeepNestObject | DeepNestObject[], options?: PluginUtilOptions): Style[];
    addBase(baseStyles: DeepNestObject): Style[];
    addVariant(name: string, generator: VariantGenerator): Style | Style[];
    dumpConfig(): string;
}
