import * as _unhead_schema from '@unhead/schema';
import { Head, CreateHeadOptions, Unhead, MergeHead, HeadEntryOptions, ActiveHeadEntry, HeadSafe, UseSeoMetaInput, UseScriptInput, UseScriptOptions, ScriptInstance } from '@unhead/schema';
export { composableNames } from '@unhead/shared';

declare function createHead<T extends {} = Head>(options?: CreateHeadOptions): Unhead<T>;
declare function createServerHead<T extends {} = Head>(options?: CreateHeadOptions): Unhead<T>;
/**
 * Creates a core instance of unhead. Does not provide a global ctx for composables to work
 * and does not register DOM plugins.
 *
 * @param options
 */
declare function createHeadCore<T extends {} = Head>(options?: CreateHeadOptions): Unhead<T>;

/**
 * @deprecated Hash hydration is no longer supported. Please remove this plugin.
 */
declare function HashHydrationPlugin(): _unhead_schema.HeadPluginInput;

declare function CapoPlugin(options: {
    track?: boolean;
}): _unhead_schema.HeadPluginInput;

declare const unheadComposablesImports: {
    from: string;
    imports: string[];
}[];

declare function getActiveHead(): _unhead_schema.Unhead<any> | undefined;

type UseHeadInput<T extends MergeHead> = Head<T>;
declare function useHead<T extends MergeHead>(input: UseHeadInput<T>, options?: HeadEntryOptions): ActiveHeadEntry<UseHeadInput<T>> | void;

declare function useHeadSafe(input: HeadSafe, options?: HeadEntryOptions): ActiveHeadEntry<HeadSafe> | void;

declare function useServerHead<T extends MergeHead>(input: UseHeadInput<T>, options?: HeadEntryOptions): ActiveHeadEntry<UseHeadInput<T>> | void;

declare function useServerHeadSafe<T extends HeadSafe>(input: T, options?: HeadEntryOptions): ActiveHeadEntry<T> | void;

declare function useSeoMeta(input: UseSeoMetaInput, options?: HeadEntryOptions): ActiveHeadEntry<any> | void;

declare function useServerSeoMeta(input: UseSeoMetaInput, options?: HeadEntryOptions): ActiveHeadEntry<any> | void;

/**
 * Load third-party scripts with SSR support and a proxied API.
 *
 * @experimental
 * @see https://unhead.unjs.io/usage/composables/use-script
 */
declare function useScript<T>(input: UseScriptInput, _options?: UseScriptOptions<T>): T & {
    $script: ScriptInstance<T>;
};

export { CapoPlugin, HashHydrationPlugin, type UseHeadInput, createHead, createHeadCore, createServerHead, getActiveHead, unheadComposablesImports, useHead, useHeadSafe, useScript, useSeoMeta, useServerHead, useServerHeadSafe, useServerSeoMeta };
