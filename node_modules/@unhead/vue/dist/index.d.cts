export { CapoPlugin, HashHydrationPlugin, createHeadCore } from 'unhead';
import * as _unhead_schema from '@unhead/schema';
import { SafeMeta, SafeLink, SafeNoscript, SafeScript, SafeHtmlAttr, SafeBodyAttr, MergeHead, CreateHeadOptions, ActiveHeadEntry, ScriptInstance, UseScriptStatus, UseScriptInput, UseScriptOptions } from '@unhead/schema';
export { ActiveHeadEntry, Head, HeadEntryOptions, HeadTag, MergeHead, Unhead } from '@unhead/schema';
import { R as ReactiveHead, M as MaybeComputedRefEntries, a as MaybeComputedRef, V as VueHeadClient, U as UseHeadInput, b as UseHeadOptions, c as UseSeoMetaInput, d as MaybeComputedRefEntriesOnly } from './shared/vue.a001678c.cjs';
export { f as Base, B as BodyAttr, j as BodyAttributes, H as HtmlAttr, i as HtmlAttributes, L as Link, l as MaybeComputedRefOrPromise, k as MaybeReadonlyRef, g as Meta, N as Noscript, h as Script, S as Style, T as Title, e as TitleTemplate } from './shared/vue.a001678c.cjs';
import { Plugin, ComputedRef, Ref } from 'vue';

interface HeadSafe extends Pick<ReactiveHead, 'title' | 'titleTemplate' | 'templateParams'> {
    meta?: MaybeComputedRefEntries<SafeMeta>[];
    link?: MaybeComputedRefEntries<SafeLink>[];
    noscript?: MaybeComputedRefEntries<SafeNoscript>[];
    script?: MaybeComputedRefEntries<SafeScript>[];
    htmlAttrs?: MaybeComputedRefEntries<SafeHtmlAttr>;
    bodyAttrs?: MaybeComputedRefEntries<SafeBodyAttr>;
}
type UseHeadSafeInput = MaybeComputedRef<HeadSafe>;

declare function createServerHead<T extends MergeHead>(options?: Omit<CreateHeadOptions, 'domDelayFn' | 'document'>): VueHeadClient<T>;
declare function createHead<T extends MergeHead>(options?: CreateHeadOptions): VueHeadClient<T>;

declare function resolveUnrefHeadInput(ref: any, lastKey?: string | number): any;

/**
 * @deprecated No longer needed for Vue2 if using UnheadPlugin. Import { HeadOptions } from `@unhead/vue/vue2` and use Vue.mixin(HeadOptions) instead.
 */
declare const VueHeadMixin: {
    created(): void;
};

/**
 * @deprecated Import { UnheadPlugin } from `@unhead/vue/vue2` and use Vue.mixin(UnheadPlugin(head)) instead.
 */
declare const Vue2ProvideUnheadPlugin: Plugin;

declare const unheadVueComposablesImports: {
    '@unhead/vue': string[];
};

declare function setHeadInjectionHandler(handler: () => VueHeadClient<any> | undefined): void;
declare function injectHead<T extends MergeHead>(): VueHeadClient<T>;

declare function useHead<T extends MergeHead>(input: UseHeadInput<T>, options?: UseHeadOptions): ActiveHeadEntry<UseHeadInput<T>> | void;

declare function useHeadSafe(input: UseHeadSafeInput, options?: UseHeadOptions): ActiveHeadEntry<UseHeadSafeInput> | void;

declare function useSeoMeta(input: UseSeoMetaInput, options?: UseHeadOptions): ActiveHeadEntry<any> | void;

declare function useServerHead<T extends MergeHead>(input: UseHeadInput<T>, options?: UseHeadOptions): _unhead_schema.ActiveHeadEntry<MaybeComputedRef<ReactiveHead<any>>> | undefined;

declare function useServerHeadSafe(input: UseHeadSafeInput, options?: UseHeadOptions): void | _unhead_schema.ActiveHeadEntry<UseHeadSafeInput>;

declare function useServerSeoMeta(input: UseSeoMetaInput, options?: UseHeadOptions): ActiveHeadEntry<any> | void;

interface VueScriptInstance<T> extends Omit<ScriptInstance<T>, 'loaded' | 'status'> {
    loaded: ComputedRef<boolean>;
    status: Ref<UseScriptStatus>;
}
declare function useScript<T>(input: MaybeComputedRefEntriesOnly<Omit<UseScriptInput, 'src'>> & {
    src: string;
}, _options?: UseScriptOptions<T>): T & {
    $script: VueScriptInstance<T>;
};

export { type HeadSafe, MaybeComputedRef, MaybeComputedRefEntries, MaybeComputedRefEntriesOnly, ReactiveHead, UseHeadInput, UseHeadOptions, type UseHeadSafeInput, UseSeoMetaInput, Vue2ProvideUnheadPlugin, VueHeadClient, VueHeadMixin, type VueScriptInstance, createHead, createServerHead, injectHead, resolveUnrefHeadInput, setHeadInjectionHandler, unheadVueComposablesImports, useHead, useHeadSafe, useScript, useSeoMeta, useServerHead, useServerHeadSafe, useServerSeoMeta };
