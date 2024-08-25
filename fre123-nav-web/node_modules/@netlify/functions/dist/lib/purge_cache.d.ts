interface BasePurgeCacheOptions {
    apiURL?: string;
    deployAlias?: string;
    tags?: string[];
    token?: string;
}
interface PurgeCacheOptionsWithSiteID extends BasePurgeCacheOptions {
    siteID?: string;
}
interface PurgeCacheOptionsWithSiteSlug extends BasePurgeCacheOptions {
    siteSlug: string;
}
interface PurgeCacheOptionsWithDomain extends BasePurgeCacheOptions {
    domain: string;
}
type PurgeCacheOptions = PurgeCacheOptionsWithSiteID | PurgeCacheOptionsWithSiteSlug | PurgeCacheOptionsWithDomain;
export declare const purgeCache: (options?: PurgeCacheOptions) => Promise<void>;
export {};
