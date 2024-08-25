import { HeadPluginInput, HeadTag, BaseMeta, MetaFlatInput, Head, MaybeArray, HeadSafe, HeadEntry, TemplateParams } from '@unhead/schema';

type Arrayable<T> = T | Array<T>;
declare function asArray<T>(value: Arrayable<T>): T[];

declare const SelfClosingTags: string[];
declare const TagsWithInnerContent: string[];
declare const HasElementTags: string[];
declare const ValidHeadTags: string[];
declare const UniqueTags: string[];
declare const TagConfigKeys: string[];
declare const IsBrowser: boolean;
declare const composableNames: string[];

declare function defineHeadPlugin(plugin: HeadPluginInput): HeadPluginInput;

declare function hashCode(s: string): string;
declare function hashTag(tag: HeadTag): string;

declare function tagDedupeKey<T extends HeadTag>(tag: T, fn?: (key: string) => boolean): string | false;

declare function resolveTitleTemplate(template: string | ((title?: string) => string | null) | null, title?: string): string | null;

declare function resolveMetaKeyType(key: string): keyof BaseMeta;
declare function resolveMetaKeyValue(key: string): string;
declare function resolvePackedMetaObjectValue(value: string, key: string): string;
/**
 * Converts a flat meta object into an array of meta entries.
 * @param input
 */
declare function unpackMeta<T extends MetaFlatInput>(input: T): Required<Head>['meta'];
/**
 * Convert an array of meta entries to a flat object.
 * @param inputs
 */
declare function packMeta<T extends Required<Head>['meta']>(inputs: T): MetaFlatInput;

declare function whitelistSafeInput(input: Record<string, MaybeArray<Record<string, string>>>): HeadSafe;

declare function normaliseTag<T extends HeadTag>(tagName: T['tag'], input: HeadTag['props'] | string, e: HeadEntry<T>): Promise<T | T[] | false>;
declare function normaliseClassProp(v: Required<Required<Head>['htmlAttrs']['class']>): string;
declare function normaliseProps<T extends HeadTag>(props: T['props'], virtual?: boolean): Promise<T['props']>;
declare const TagEntityBits = 10;
declare function normaliseEntryTags<T extends {} = Head>(e: HeadEntry<T>): Promise<HeadTag[]>;

declare const TAG_WEIGHTS: {
    readonly base: -10;
    readonly title: 10;
};
declare const TAG_ALIASES: {
    readonly critical: -80;
    readonly high: -10;
    readonly low: 20;
};
declare function tagWeight<T extends HeadTag>(tag: T): any;
declare const SortModifiers: {
    prefix: string;
    offset: number;
}[];

declare const NetworkEvents: string[];

declare function processTemplateParams(s: string, p: TemplateParams, sep: string): string;

export { type Arrayable, HasElementTags, IsBrowser, NetworkEvents, SelfClosingTags, SortModifiers, TAG_ALIASES, TAG_WEIGHTS, TagConfigKeys, TagEntityBits, TagsWithInnerContent, UniqueTags, ValidHeadTags, asArray, composableNames, defineHeadPlugin, hashCode, hashTag, normaliseClassProp, normaliseEntryTags, normaliseProps, normaliseTag, packMeta, processTemplateParams, resolveMetaKeyType, resolveMetaKeyValue, resolvePackedMetaObjectValue, resolveTitleTemplate, tagDedupeKey, tagWeight, unpackMeta, whitelistSafeInput };
