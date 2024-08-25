import { LoadConfigResult } from 'unconfig';
import MagicString from 'magic-string';

type EventsMap = Record<string, any>;
interface DefaultEvents extends EventsMap {
    [event: string]: (...args: any) => void;
}
interface Unsubscribe {
    (): void;
}
declare class Emitter<Events extends EventsMap = DefaultEvents> {
    /**
     * Event names in keys and arrays with listeners in values.
     *
     * ```js
     * emitter1.events = emitter2.events
     * emitter2.events = { }
     * ```
     */
    events: Partial<{
        [E in keyof Events]: Events[E][];
    }>;
    /**
     * Add a listener for a given event.
     *
     * ```js
     * const unbind = ee.on('tick', (tickType, tickDuration) => {
     *   count += 1
     * })
     *
     * disable () {
     *   unbind()
     * }
     * ```
     *
     * @param event The event name.
     * @param cb The listener function.
     * @returns Unbind listener from event.
     */
    on<K extends keyof Events>(this: this, event: K, cb: Events[K]): Unsubscribe;
    /**
     * Calls each of the listeners registered for a given event.
     *
     * ```js
     * ee.emit('tick', tickType, tickDuration)
     * ```
     *
     * @param event The event name.
     * @param args The arguments for listeners.
     */
    emit<K extends keyof Events>(this: this, event: K, ...args: Parameters<Events[K]>): void;
}

declare function escapeRegExp(string: string): string;
/**
 * CSS Selector Escape
 */
declare function escapeSelector(str: string): string;
declare const e: typeof escapeSelector;

declare function normalizeCSSEntries(obj: string | CSSEntries | CSSObject): string | CSSEntries;
declare function normalizeCSSValues(obj: CSSValue | string | (CSSValue | string)[]): (string | CSSEntries)[];
declare function clearIdenticalEntries(entry: CSSEntries): CSSEntries;
declare function entriesToCss(arr?: CSSEntries): string;
declare function isObject(item: any): item is Record<string, any>;
/**
 * Deep merge two objects
 */
declare function mergeDeep<T>(original: T, patch: DeepPartial<T>, mergeArray?: boolean): T;
declare function clone<T>(val: T): T;
declare function isStaticRule(rule: Rule<any>): rule is StaticRule;
declare function isStaticShortcut(sc: Shortcut<any>): sc is StaticShortcut;

declare function toArray<T>(value?: T | T[]): T[];
declare function uniq<T>(value: T[]): T[];
declare function uniqueBy<T>(array: readonly T[], equalFn: (a: T, b: T) => boolean): T[];
declare function isString(s: any): s is string;

declare const attributifyRE: RegExp;
declare const cssIdRE: RegExp;
declare const validateFilterRE: RegExp;
declare const CONTROL_SHORTCUT_NO_MERGE = "$$shortcut-no-merge";
declare function isAttributifySelector(selector: string): RegExpMatchArray | null;
declare function isValidSelector(selector?: string): selector is string;
declare function normalizeVariant(variant: Variant<any>): VariantObject<any>;
declare function isRawUtil(util: ParsedUtil | RawUtil | StringifiedUtil): util is RawUtil;
declare function notNull<T>(value: T | null | undefined): value is T;
declare function noop(): void;

declare class TwoKeyMap<K1, K2, V> {
    _map: Map<K1, Map<K2, V>>;
    get(key1: K1, key2: K2): V | undefined;
    getFallback(key1: K1, key2: K2, fallback: V): V;
    set(key1: K1, key2: K2, value: V): this;
    has(key1: K1, key2: K2): boolean | undefined;
    delete(key1: K1, key2: K2): boolean;
    deleteTop(key1: K1): boolean;
    map<T>(fn: (v: V, k1: K1, k2: K2) => T): T[];
}
declare class BetterMap<K, V> extends Map<K, V> {
    getFallback(key: K, fallback: V): V;
    map<R>(mapFn: (value: V, key: K) => R): R[];
    flatMap<R extends readonly unknown[]>(mapFn: (value: V, key: K) => R): R[number][];
}

declare class CountableSet<K> extends Set<K> {
    _map: Map<K, number>;
    constructor(values?: Iterable<K>);
    add(key: K): this;
    delete(key: K): boolean;
    clear(): void;
    getCount(key: K): number;
    setCount(key: K, count: number): this;
}
declare function isCountableSet<T = string>(value: any): value is CountableSet<T>;

declare function withLayer<T extends object>(layer: string, rules: Rule<T>[]): Rule<T>[];

declare function makeRegexClassGroup(separators?: string[]): RegExp;
interface VariantGroup {
    length: number;
    items: HighlightAnnotation[];
}
declare function parseVariantGroup(str: string | MagicString, separators?: string[], depth?: number): {
    prefixes: string[];
    hasChanged: boolean;
    groupsByOffset: Map<number, VariantGroup>;
    readonly expanded: string;
};
declare function collapseVariantGroup(str: string, prefixes: string[]): string;
declare function expandVariantGroup(str: string, separators?: string[], depth?: number): string;
declare function expandVariantGroup(str: MagicString, separators?: string[], depth?: number): MagicString;

declare function warnOnce(msg: string): void;

declare class UnoGenerator<Theme extends object = object> {
    userConfig: UserConfig<Theme>;
    defaults: UserConfigDefaults<Theme>;
    version: string;
    private _cache;
    config: ResolvedConfig<Theme>;
    blocked: Set<string>;
    parentOrders: Map<string, number>;
    events: Emitter<{
        config: (config: ResolvedConfig<Theme>) => void;
    }>;
    constructor(userConfig?: UserConfig<Theme>, defaults?: UserConfigDefaults<Theme>);
    setConfig(userConfig?: UserConfig<Theme>, defaults?: UserConfigDefaults<Theme>): void;
    applyExtractors(code: string, id?: string, extracted?: Set<string>): Promise<Set<string>>;
    applyExtractors(code: string, id?: string, extracted?: CountableSet<string>): Promise<CountableSet<string>>;
    makeContext(raw: string, applied: VariantMatchedResult<Theme>): RuleContext<Theme>;
    parseToken(raw: string, alias?: string): Promise<StringifiedUtil<Theme>[] | undefined | null>;
    generate(input: string | Set<string> | CountableSet<string> | string[], options?: GenerateOptions<false>): Promise<GenerateResult<Set<string>>>;
    generate(input: string | Set<string> | CountableSet<string> | string[], options?: GenerateOptions<true>): Promise<GenerateResult<Map<string, ExtendedTokenInfo<Theme>>>>;
    matchVariants(raw: string, current?: string): Promise<VariantMatchedResult<Theme>>;
    private applyVariants;
    constructCustomCSS(context: Readonly<RuleContext<Theme>>, body: CSSObject | CSSEntries, overrideSelector?: string): string;
    parseUtil(input: string | VariantMatchedResult<Theme>, context: RuleContext<Theme>, internal?: boolean, shortcutPrefix?: string | string[] | undefined): Promise<(ParsedUtil | RawUtil)[] | undefined>;
    stringifyUtil(parsed?: ParsedUtil | RawUtil, context?: RuleContext<Theme>): StringifiedUtil<Theme> | undefined;
    expandShortcut(input: string, context: RuleContext<Theme>, depth?: number): Promise<[ShortcutValue[], RuleMeta | undefined] | undefined>;
    stringifyShortcuts(parent: VariantMatchedResult<Theme>, context: RuleContext<Theme>, expanded: ShortcutValue[], meta?: RuleMeta): Promise<StringifiedUtil<Theme>[] | undefined>;
    isBlocked(raw: string): boolean;
}
declare function createGenerator<Theme extends object = object>(config?: UserConfig<Theme>, defaults?: UserConfigDefaults<Theme>): UnoGenerator<Theme>;
declare const regexScopePlaceholder: RegExp;
declare function hasScopePlaceholder(css: string): boolean;
declare function toEscapedSelector(raw: string): string;

type Awaitable<T> = T | Promise<T>;
type Arrayable<T> = T | T[];
type ToArray<T> = T extends (infer U)[] ? U[] : T[];
type ArgumentType<T> = T extends ((...args: infer A) => any) ? A : never;
type Shift<T> = T extends [_: any, ...args: infer A] ? A : never;
type RestArgs<T> = Shift<ArgumentType<T>>;
type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
type FlatObjectTuple<T> = {
    [K in keyof T]: T[K];
};
type PartialByKeys<T, K extends keyof T = keyof T> = FlatObjectTuple<Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>;
type RequiredByKey<T, K extends keyof T = keyof T> = FlatObjectTuple<Required<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>;
type CSSObject = Record<string, string | number | undefined>;
type CSSEntries = [string, string | number | undefined][];
interface CSSColorValue {
    type: string;
    components: (string | number)[];
    alpha: string | number | undefined;
}
type RGBAColorValue = [number, number, number, number] | [number, number, number];
interface ParsedColorValue {
    /**
     * Parsed color value.
     */
    color?: string;
    /**
     * Parsed opacity value.
     */
    opacity: string;
    /**
     * Color name.
     */
    name: string;
    /**
     * Color scale, preferably 000 - 999.
     */
    no: string;
    /**
     * {@link CSSColorValue}
     */
    cssColor: CSSColorValue | undefined;
    /**
     * Parsed alpha value from opacity
     */
    alpha: string | number | undefined;
}
type PresetOptions = Record<string, any>;
interface RuleContext<Theme extends object = object> {
    /**
     * Unprocessed selector from user input.
     * Useful for generating CSS rule.
     */
    rawSelector: string;
    /**
     * Current selector for rule matching
     */
    currentSelector: string;
    /**
     * UnoCSS generator instance
     */
    generator: UnoGenerator<Theme>;
    /**
     * The theme object
     */
    theme: Theme;
    /**
     * Matched variants handlers for this rule.
     */
    variantHandlers: VariantHandler[];
    /**
     * The result of variant matching.
     */
    variantMatch: VariantMatchedResult<Theme>;
    /**
     * Construct a custom CSS rule.
     * Variants and selector escaping will be handled automatically.
     */
    constructCSS: (body: CSSEntries | CSSObject, overrideSelector?: string) => string;
    /**
     * Available only when `details` option is enabled.
     */
    rules?: Rule<Theme>[];
    /**
     * Available only when `details` option is enabled.
     */
    shortcuts?: Shortcut<Theme>[];
    /**
     * Available only when `details` option is enabled.
     */
    variants?: Variant<Theme>[];
}
interface VariantContext<Theme extends object = object> {
    /**
     * Unprocessed selector from user input.
     */
    rawSelector: string;
    /**
     * UnoCSS generator instance
     */
    generator: UnoGenerator<Theme>;
    /**
     * The theme object
     */
    theme: Theme;
}
interface ExtractorContext {
    readonly original: string;
    code: string;
    id?: string;
    extracted: Set<string> | CountableSet<string>;
    envMode?: 'dev' | 'build';
}
interface PreflightContext<Theme extends object = object> {
    /**
     * UnoCSS generator instance
     */
    generator: UnoGenerator<Theme>;
    /**
     * The theme object
     */
    theme: Theme;
}
interface Extractor {
    name: string;
    order?: number;
    /**
     * Extract the code and return a list of selectors.
     *
     * Return `undefined` to skip this extractor.
     */
    extract?: (ctx: ExtractorContext) => Awaitable<Set<string> | CountableSet<string> | string[] | undefined | void>;
}
interface RuleMeta {
    /**
     * The layer name of this rule.
     * @default 'default'
     */
    layer?: string;
    /**
     * Option to not merge this selector even if the body are the same.
     * @default false
     */
    noMerge?: boolean;
    /**
     * Fine tune sort
     */
    sort?: number;
    /**
     * Templates to provide autocomplete suggestions
     */
    autocomplete?: Arrayable<AutoCompleteTemplate>;
    /**
     * Matching prefix before this util
     */
    prefix?: string | string[];
    /**
     * Internal rules will only be matched for shortcuts but not the user code.
     * @default false
     */
    internal?: boolean;
    /**
     * Store the hash of the rule boy
     *
     * @internal
     * @private
     */
    __hash?: string;
}
type CSSValue = CSSObject | CSSEntries;
type CSSValues = CSSValue | CSSValue[];
type DynamicMatcher<Theme extends object = object> = ((match: RegExpMatchArray, context: Readonly<RuleContext<Theme>>) => Awaitable<CSSValue | string | (CSSValue | string)[] | undefined>);
type DynamicRule<Theme extends object = object> = [RegExp, DynamicMatcher<Theme>] | [RegExp, DynamicMatcher<Theme>, RuleMeta];
type StaticRule = [string, CSSObject | CSSEntries] | [string, CSSObject | CSSEntries, RuleMeta];
type Rule<Theme extends object = object> = DynamicRule<Theme> | StaticRule;
type DynamicShortcutMatcher<Theme extends object = object> = ((match: RegExpMatchArray, context: Readonly<RuleContext<Theme>>) => (string | ShortcutValue[] | undefined));
type StaticShortcut = [string, string | ShortcutValue[]] | [string, string | ShortcutValue[], RuleMeta];
type StaticShortcutMap = Record<string, string | ShortcutValue[]>;
type DynamicShortcut<Theme extends object = object> = [RegExp, DynamicShortcutMatcher<Theme>] | [RegExp, DynamicShortcutMatcher<Theme>, RuleMeta];
type UserShortcuts<Theme extends object = object> = StaticShortcutMap | (StaticShortcut | DynamicShortcut<Theme> | StaticShortcutMap)[];
type Shortcut<Theme extends object = object> = StaticShortcut | DynamicShortcut<Theme>;
type ShortcutValue = string | CSSValue;
type FilterPattern = ReadonlyArray<string | RegExp> | string | RegExp | null;
interface Preflight<Theme extends object = object> {
    getCSS: (context: PreflightContext<Theme>) => Promise<string | undefined> | string | undefined;
    layer?: string;
}
type BlocklistRule = string | RegExp | ((selector: string) => boolean | null | undefined);
interface VariantHandlerContext {
    /**
     * Rewrite the output selector. Often be used to append parents.
     */
    prefix: string;
    /**
     * Rewrite the output selector. Often be used to append pseudo classes.
     */
    selector: string;
    /**
     * Rewrite the output selector. Often be used to append pseudo elements.
     */
    pseudo: string;
    /**
     * Rewrite the output css body. The input come in [key,value][] pairs.
     */
    entries: CSSEntries;
    /**
     * Provide a parent selector(e.g. media query) to the output css.
     */
    parent?: string;
    /**
     * Provide order to the `parent` parent selector within layer.
     */
    parentOrder?: number;
    /**
     * Override layer to the output css.
     */
    layer?: string;
    /**
     * Order in which the variant is sorted within single rule.
     */
    sort?: number;
    /**
     * Option to not merge the resulting entries even if the body are the same.
     * @default false
     */
    noMerge?: boolean;
}
interface VariantHandler {
    /**
     * Callback to process the handler.
     */
    handle?: (input: VariantHandlerContext, next: (input: VariantHandlerContext) => VariantHandlerContext) => VariantHandlerContext;
    /**
     * The result rewritten selector for the next round of matching
     */
    matcher: string;
    /**
     * Order in which the variant is applied to selector.
     */
    order?: number;
    /**
     * Rewrite the output selector. Often be used to append pseudo classes or parents.
     */
    selector?: (input: string, body: CSSEntries) => string | undefined;
    /**
     * Rewrite the output css body. The input come in [key,value][] pairs.
     */
    body?: (body: CSSEntries) => CSSEntries | undefined;
    /**
     * Provide a parent selector(e.g. media query) to the output css.
     */
    parent?: string | [string, number] | undefined;
    /**
     * Order in which the variant is sorted within single rule.
     */
    sort?: number;
    /**
     * Override layer to the output css.
     */
    layer?: string | undefined;
}
type VariantFunction<Theme extends object = object> = (matcher: string, context: Readonly<VariantContext<Theme>>) => Awaitable<string | VariantHandler | undefined>;
interface VariantObject<Theme extends object = object> {
    /**
     * The name of the variant.
     */
    name?: string;
    /**
     * The entry function to match and rewrite the selector for further processing.
     */
    match: VariantFunction<Theme>;
    /**
     * Sort for when the match is applied.
     */
    order?: number;
    /**
     * Allows this variant to be used more than once in matching a single rule
     *
     * @default false
     */
    multiPass?: boolean;
    /**
     * Custom function for auto complete
     */
    autocomplete?: Arrayable<AutoCompleteFunction | AutoCompleteTemplate>;
}
type Variant<Theme extends object = object> = VariantFunction<Theme> | VariantObject<Theme>;
type Preprocessor = (matcher: string) => string | undefined;
type Postprocessor = (util: UtilObject) => void;
type ThemeExtender<T> = (theme: T) => T | void;
interface ConfigBase<Theme extends object = object> {
    /**
     * Rules to generate CSS utilities.
     *
     * Later entries have higher priority.
     */
    rules?: Rule<Theme>[];
    /**
     * Variant separator
     *
     * @default [':', '-']
     */
    separators?: Arrayable<string>;
    /**
     * Variants that preprocess the selectors,
     * having the ability to rewrite the CSS object.
     */
    variants?: Variant<Theme>[];
    /**
     * Similar to Windi CSS's shortcuts,
     * allows you have create new utilities by combining existing ones.
     *
     * Later entries have higher priority.
     */
    shortcuts?: UserShortcuts<Theme>;
    /**
     * Rules to exclude the selectors for your design system (to narrow down the possibilities).
     * Combining `warnExcluded` options it can also help you identify wrong usages.
     */
    blocklist?: BlocklistRule[];
    /**
     * Utilities that always been included
     */
    safelist?: string[];
    /**
     * Extractors to handle the source file and outputs possible classes/selectors
     * Can be language-aware.
     */
    extractors?: Extractor[];
    /**
     * Default extractor that are always applied.
     * By default it split the source code by whitespace and quotes.
     *
     * It maybe be replaced by preset or user config,
     * only one default extractor can be presented,
     * later one will override the previous one.
     *
     * Pass `null` or `false` to disable the default extractor.
     *
     * @see https://github.com/unocss/unocss/blob/main/packages/core/src/extractors/split.ts
     * @default import('@unocss/core').defaultExtractor
     */
    extractorDefault?: Extractor | null | false;
    /**
     * Raw CSS injections.
     */
    preflights?: Preflight<Theme>[];
    /**
     * Theme object for shared configuration between rules
     */
    theme?: Theme;
    /**
     * Layer orders. Default to 0.
     */
    layers?: Record<string, number>;
    /**
     * Output the internal layers as CSS Cascade Layers.
     */
    outputToCssLayers?: boolean | OutputCssLayersOptions;
    /**
     * Custom function to sort layers.
     */
    sortLayers?: (layers: string[]) => string[];
    /**
     * Preprocess the incoming utilities, return falsy value to exclude
     */
    preprocess?: Arrayable<Preprocessor>;
    /**
     * Postprocess the generate utils object
     */
    postprocess?: Arrayable<Postprocessor>;
    /**
     * Custom functions mutate the theme object.
     *
     * It's also possible to return a new theme object to completely replace the original one.
     */
    extendTheme?: Arrayable<ThemeExtender<Theme>>;
    /**
     * Presets
     */
    presets?: (PresetOrFactory<Theme> | PresetOrFactory<Theme>[])[];
    /**
     * Additional options for auto complete
     */
    autocomplete?: {
        /**
         * Custom functions / templates to provide autocomplete suggestions
         */
        templates?: Arrayable<AutoCompleteFunction | AutoCompleteTemplate>;
        /**
         * Custom extractors to pickup possible classes and
         * transform class-name style suggestions to the correct format
         */
        extractors?: Arrayable<AutoCompleteExtractor>;
        /**
         * Custom shorthands to provide autocomplete suggestions.
         * if values is an array, it will be joined with `|` and wrapped with `()`
         */
        shorthands?: Record<string, string | string[]>;
    };
    /**
     * Hook to modify the resolved config.
     *
     * First presets runs first and the user config
     */
    configResolved?: (config: ResolvedConfig) => void;
    /**
     * Expose internal details for debugging / inspecting
     *
     * Added `rules`, `shortcuts`, `variants` to the context and expose the context object in `StringifiedUtil`
     *
     * You don't usually need to set this.
     *
     * @default `true` when `envMode` is `dev`, otherwise `false`
     */
    details?: boolean;
}
interface OutputCssLayersOptions {
    /**
     * Specify the css layer that the internal layer should be output to.
     *
     * Return `null` to specify that the layer should not be output to any css layer.
     */
    cssLayerName?: (internalLayer: string) => string | undefined | null;
}
type AutoCompleteTemplate = string;
type AutoCompleteFunction = (input: string) => Awaitable<string[]>;
interface AutoCompleteExtractorContext {
    content: string;
    cursor: number;
}
interface Replacement {
    /**
     * The range of the original text
     */
    start: number;
    end: number;
    /**
     * The text used to replace
     */
    replacement: string;
}
interface SuggestResult {
    /**
     * The generated suggestions
     *
     * `[original, formatted]`
     */
    suggestions: [string, string][];
    /**
     * The function to convert the selected suggestion back.
     * Needs to pass in the original one.
     */
    resolveReplacement: (suggestion: string) => Replacement;
}
interface AutoCompleteExtractorResult {
    /**
     * The extracted string
     */
    extracted: string;
    /**
     * The function to convert the selected suggestion back
     */
    resolveReplacement: (suggestion: string) => Replacement;
    /**
     * The function to format suggestions
     */
    transformSuggestions?: (suggestions: string[]) => string[];
}
interface AutoCompleteExtractor {
    name: string;
    extract: (context: AutoCompleteExtractorContext) => Awaitable<AutoCompleteExtractorResult | null>;
    order?: number;
}
interface Preset<Theme extends object = object> extends ConfigBase<Theme> {
    name: string;
    /**
     * Enforce the preset to be applied before or after other presets
     */
    enforce?: 'pre' | 'post';
    /**
     * Preset options for other tools like IDE to consume
     */
    options?: PresetOptions;
    /**
     * Apply prefix to all utilities and shortcuts
     */
    prefix?: string | string[];
    /**
     * Apply layer to all utilities and shortcuts
     */
    layer?: string;
}
type PresetFactory<Theme extends object = object, PresetOptions extends object | undefined = undefined> = (options?: PresetOptions) => Preset<Theme>;
type PresetOrFactory<Theme extends object = object> = Preset<Theme> | PresetFactory<Theme, any>;
interface GeneratorOptions {
    /**
     * Merge utilities with the exact same body to save the file size
     *
     * @default true
     */
    mergeSelectors?: boolean;
    /**
     * Emit warning when matched selectors are presented in blocklist
     *
     * @default true
     */
    warn?: boolean;
}
interface UserOnlyOptions<Theme extends object = object> {
    /**
     * The theme object, will be merged with the theme provides by presets
     */
    theme?: Theme;
    /**
     * Layout name of shortcuts
     *
     * @default 'shortcuts'
     */
    shortcutsLayer?: string;
    /**
     * Environment mode
     *
     * @default 'build'
     */
    envMode?: 'dev' | 'build';
}
/**
 * For unocss-cli config
 */
interface CliOptions {
    cli?: {
        entry?: Arrayable<CliEntryItem>;
    };
}
interface UnocssPluginContext<Config extends UserConfig = UserConfig> {
    ready: Promise<LoadConfigResult<Config>>;
    uno: UnoGenerator;
    /** All tokens scanned */
    tokens: Set<string>;
    /** Map for all module's raw content */
    modules: BetterMap<string, string>;
    /** Module IDs that been affected by UnoCSS */
    affectedModules: Set<string>;
    /** Pending promises */
    tasks: Promise<any>[];
    /**
     * Await all pending tasks
     */
    flushTasks: () => Promise<any>;
    filter: (code: string, id: string) => boolean;
    extract: (code: string, id?: string) => Promise<void>;
    reloadConfig: () => Promise<LoadConfigResult<Config>>;
    getConfig: () => Promise<Config>;
    onReload: (fn: () => void) => void;
    invalidate: () => void;
    onInvalidate: (fn: () => void) => void;
    root: string;
    updateRoot: (root: string) => Promise<LoadConfigResult<Config>>;
    getConfigFileList: () => string[];
}
interface SourceMap {
    file?: string;
    mappings?: string;
    names?: string[];
    sources?: string[];
    sourcesContent?: string[];
    version?: number;
}
interface HighlightAnnotation {
    offset: number;
    length: number;
    className: string;
}
type SourceCodeTransformerEnforce = 'pre' | 'post' | 'default';
interface SourceCodeTransformer {
    name: string;
    /**
     * The order of transformer
     */
    enforce?: SourceCodeTransformerEnforce;
    /**
     * Custom id filter, if not provided, the extraction filter will be applied
     */
    idFilter?: (id: string) => boolean;
    /**
     * The transform function
     */
    transform: (code: MagicString, id: string, ctx: UnocssPluginContext) => Awaitable<{
        highlightAnnotations?: HighlightAnnotation[];
    } | void>;
}
interface ContentOptions {
    /**
     * Glob patterns to extract from the file system, in addition to other content sources.
     *
     * In dev mode, the files will be watched and trigger HMR.
     *
     * @default []
     */
    filesystem?: string[];
    /**
     * Inline text to be extracted
     */
    inline?: (string | {
        code: string;
        id?: string;
    } | (() => Awaitable<string | {
        code: string;
        id?: string;
    }>))[];
    /**
     * Filters to determine whether to extract certain modules from the build tools' transformation pipeline.
     *
     * Currently only works for Vite and Webpack integration.
     *
     * Set `false` to disable.
     */
    pipeline?: false | {
        /**
         * Patterns that filter the files being extracted.
         * Supports regular expressions and `picomatch` glob patterns.
         *
         * By default, `.ts` and `.js` files are NOT extracted.
         *
         * @see https://www.npmjs.com/package/picomatch
         * @default [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/]
         */
        include?: FilterPattern;
        /**
         * Patterns that filter the files NOT being extracted.
         * Supports regular expressions and `picomatch` glob patterns.
         *
         * By default, `node_modules` and `dist` are also extracted.
         *
         * @see https://www.npmjs.com/package/picomatch
         * @default [/\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/]
         */
        exclude?: FilterPattern;
    };
    /**
     * @deprecated Renamed to `inline`
     */
    plain?: (string | {
        code: string;
        id?: string;
    })[];
}
/**
 * For other modules to aggregate the options
 */
interface PluginOptions {
    /**
     * Load from configs files
     *
     * set `false` to disable
     */
    configFile?: string | false;
    /**
     * List of files that will also trigger config reloads
     */
    configDeps?: string[];
    /**
     * Custom transformers to the source code
     */
    transformers?: SourceCodeTransformer[];
    /**
     * Options for sources to be extracted as utilities usages
     *
     * Supported sources:
     * - `filesystem` - extract from file system
     * - `inline` - extract from plain inline text
     * - `pipeline` - extract from build tools' transformation pipeline, such as Vite and Webpack
     *
     * The usage extracted from each source will be **merged** together.
     */
    content?: ContentOptions;
    /** ========== DEPRECATED OPTIONS ========== */
    /**
     * @deprecated Renamed to `content`
     */
    extraContent?: ContentOptions;
    /**
     * Patterns that filter the files being extracted.
     * @deprecated moved to `content.pipeline.include`
     */
    include?: FilterPattern;
    /**
     * Patterns that filter the files NOT being extracted.
     * @deprecated moved to `content.pipeline.exclude`
     */
    exclude?: FilterPattern;
}
interface UserConfig<Theme extends object = object> extends ConfigBase<Theme>, UserOnlyOptions<Theme>, GeneratorOptions, PluginOptions, CliOptions {
}
interface UserConfigDefaults<Theme extends object = object> extends ConfigBase<Theme>, UserOnlyOptions<Theme> {
}
interface ResolvedConfig<Theme extends object = object> extends Omit<RequiredByKey<UserConfig<Theme>, 'mergeSelectors' | 'theme' | 'rules' | 'variants' | 'layers' | 'extractors' | 'blocklist' | 'safelist' | 'preflights' | 'sortLayers'>, 'rules' | 'shortcuts' | 'autocomplete'> {
    presets: Preset<Theme>[];
    shortcuts: Shortcut<Theme>[];
    variants: VariantObject<Theme>[];
    preprocess: Preprocessor[];
    postprocess: Postprocessor[];
    rulesSize: number;
    rulesDynamic: [number, ...DynamicRule<Theme>][];
    rulesStaticMap: Record<string, [number, CSSObject | CSSEntries, RuleMeta | undefined, Rule<Theme>] | undefined>;
    autocomplete: {
        templates: (AutoCompleteFunction | AutoCompleteTemplate)[];
        extractors: AutoCompleteExtractor[];
        shorthands: Record<string, string>;
    };
    separators: string[];
}
interface GenerateResult<T = Set<string>> {
    css: string;
    layers: string[];
    getLayer: (name?: string) => string | undefined;
    getLayers: (includes?: string[], excludes?: string[]) => string;
    matched: T;
}
type VariantMatchedResult<Theme extends object = object> = readonly [
    raw: string,
    current: string,
    variantHandlers: VariantHandler[],
    variants: Set<Variant<Theme>>
];
type ParsedUtil = readonly [
    index: number,
    raw: string,
    entries: CSSEntries,
    meta: RuleMeta | undefined,
    variantHandlers: VariantHandler[]
];
type RawUtil = readonly [
    index: number,
    rawCSS: string,
    meta: RuleMeta | undefined
];
type StringifiedUtil<Theme extends object = object> = readonly [
    index: number,
    selector: string | undefined,
    body: string,
    parent: string | undefined,
    meta: RuleMeta | undefined,
    context: RuleContext<Theme> | undefined,
    noMerge: boolean | undefined
];
type PreparedRule = readonly [
    selector: [string, number][],
    body: string,
    noMerge: boolean
];
interface CliEntryItem {
    patterns: string[];
    outFile: string;
}
interface UtilObject {
    selector: string;
    entries: CSSEntries;
    parent: string | undefined;
    layer: string | undefined;
    sort: number | undefined;
    noMerge: boolean | undefined;
}
/**
 * Returned from `uno.generate()` when `extendedInfo` option is enabled.
 */
interface ExtendedTokenInfo<Theme extends object = object> {
    /**
     * Stringified util data
     */
    data: StringifiedUtil<Theme>[];
    /**
     * Return -1 if the data structure is not countable
     */
    count: number;
}
interface GenerateOptions<T extends boolean> {
    /**
     * Filepath of the file being processed.
     */
    id?: string;
    /**
     * Generate preflights (if defined)
     *
     * @default true
     */
    preflights?: boolean;
    /**
     * Includes safelist
     */
    safelist?: boolean;
    /**
     * Generate minified CSS
     * @default false
     */
    minify?: boolean;
    /**
     * @experimental
     */
    scope?: string;
    /**
     * If return extended "matched" with payload and count
     */
    extendedInfo?: T;
}

declare const defaultSplitRE: RegExp;
declare const splitWithVariantGroupRE: RegExp;
declare const extractorSplit: Extractor;

declare function resolveShortcuts<Theme extends object = object>(shortcuts: UserShortcuts<Theme>): Shortcut<Theme>[];
/**
 * Resolve a single preset, nested presets are ignored
 */
declare function resolvePreset<Theme extends object = object>(presetInput: Preset<Theme> | PresetFactory<Theme, any>): Preset<Theme>;
/**
 * Resolve presets with nested presets
 */
declare function resolvePresets<Theme extends object = object>(preset: Preset<Theme> | PresetFactory<Theme, any>): Preset<Theme>[];
declare function resolveConfig<Theme extends object = object>(userConfig?: UserConfig<Theme>, defaults?: UserConfigDefaults<Theme>): ResolvedConfig<Theme>;
/**
 * Merge multiple configs into one, later ones have higher priority
 */
declare function mergeConfigs<Theme extends object = object>(configs: UserConfig<Theme>[]): UserConfig<Theme>;
declare function definePreset<Options extends object | undefined = undefined, Theme extends object = object>(preset: PresetFactory<Theme, Options>): PresetFactory<Theme, Options>;
declare function definePreset<Theme extends object = object>(preset: Preset<Theme>): Preset<Theme>;

export { type ArgumentType, type Arrayable, type AutoCompleteExtractor, type AutoCompleteExtractorContext, type AutoCompleteExtractorResult, type AutoCompleteFunction, type AutoCompleteTemplate, type Awaitable, BetterMap, type BlocklistRule, CONTROL_SHORTCUT_NO_MERGE, type CSSColorValue, type CSSEntries, type CSSObject, type CSSValue, type CSSValues, type CliEntryItem, type CliOptions, type ConfigBase, type ContentOptions, CountableSet, type DeepPartial, type DynamicMatcher, type DynamicRule, type DynamicShortcut, type DynamicShortcutMatcher, type ExtendedTokenInfo, type Extractor, type ExtractorContext, type FilterPattern, type FlatObjectTuple, type GenerateOptions, type GenerateResult, type GeneratorOptions, type HighlightAnnotation, type OutputCssLayersOptions, type ParsedColorValue, type ParsedUtil, type PartialByKeys, type PluginOptions, type Postprocessor, type Preflight, type PreflightContext, type PreparedRule, type Preprocessor, type Preset, type PresetFactory, type PresetOptions, type PresetOrFactory, type RGBAColorValue, type RawUtil, type Replacement, type RequiredByKey, type ResolvedConfig, type RestArgs, type Rule, type RuleContext, type RuleMeta, type Shift, type Shortcut, type ShortcutValue, type SourceCodeTransformer, type SourceCodeTransformerEnforce, type SourceMap, type StaticRule, type StaticShortcut, type StaticShortcutMap, type StringifiedUtil, type SuggestResult, type ThemeExtender, type ToArray, TwoKeyMap, UnoGenerator, type UnocssPluginContext, type UserConfig, type UserConfigDefaults, type UserOnlyOptions, type UserShortcuts, type UtilObject, type Variant, type VariantContext, type VariantFunction, type VariantHandler, type VariantHandlerContext, type VariantMatchedResult, type VariantObject, attributifyRE, clearIdenticalEntries, clone, collapseVariantGroup, createGenerator, cssIdRE, defaultSplitRE, definePreset, e, entriesToCss, escapeRegExp, escapeSelector, expandVariantGroup, extractorSplit as extractorDefault, extractorSplit, hasScopePlaceholder, isAttributifySelector, isCountableSet, isObject, isRawUtil, isStaticRule, isStaticShortcut, isString, isValidSelector, makeRegexClassGroup, mergeConfigs, mergeDeep, noop, normalizeCSSEntries, normalizeCSSValues, normalizeVariant, notNull, parseVariantGroup, regexScopePlaceholder, resolveConfig, resolvePreset, resolvePresets, resolveShortcuts, splitWithVariantGroupRE, toArray, toEscapedSelector, uniq, uniqueBy, validateFilterRE, warnOnce, withLayer };
