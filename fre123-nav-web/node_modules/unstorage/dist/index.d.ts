import { RedisConfigNodejs } from '@upstash/redis';
import { D as Driver, S as StorageValue, a as Storage } from './shared/unstorage.745f9650.js';
export { c as StorageMeta, T as TransactionOptions, U as Unwatch, b as WatchCallback, W as WatchEvent } from './shared/unstorage.745f9650.js';
import { RedisOptions as RedisOptions$1, ClusterNode, ClusterOptions } from 'ioredis';
import { LRUCache } from 'lru-cache';
import { WatchOptions } from 'chokidar';
import { SecretClientOptions } from '@azure/keyvault-secrets';

interface VercelKVOptions extends Partial<RedisConfigNodejs> {
    /**
     * Optional prefix to use for all keys. Can be used for namespacing.
     */
    base?: string;
    /**
     * Optional flag to customzize environment variable prefix (Default is `KV`). Set to `false` to disable env inference for `url` and `token` options
     */
    env?: false | string;
    /**
     * Default TTL for all items in seconds.
     */
    ttl?: number;
}
declare const _default$m: (opts: VercelKVOptions) => Driver;

type __drivers_vercel_kv_VercelKVOptions = VercelKVOptions;
declare namespace __drivers_vercel_kv {
  export { type __drivers_vercel_kv_VercelKVOptions as VercelKVOptions, _default$m as default };
}

interface SessionStorageOptions {
    base?: string;
    window?: typeof window;
    sessionStorage?: typeof window.sessionStorage;
}
declare const _default$l: (opts: SessionStorageOptions) => Driver;

type __drivers_session_storage_SessionStorageOptions = SessionStorageOptions;
declare namespace __drivers_session_storage {
  export { type __drivers_session_storage_SessionStorageOptions as SessionStorageOptions, _default$l as default };
}

interface RedisOptions extends RedisOptions$1 {
    /**
     * Optional prefix to use for all keys. Can be used for namespacing.
     */
    base?: string;
    /**
     * Url to use for connecting to redis. Takes precedence over `host` option. Has the format `redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>`
     */
    url?: string;
    /**
     * List of redis nodes to use for cluster mode. Takes precedence over `url` and `host` options.
     */
    cluster?: ClusterNode[];
    /**
     * Options to use for cluster mode.
     */
    clusterOptions?: ClusterOptions;
    /**
     * Default TTL for all items in seconds.
     */
    ttl?: number;
}
declare const _default$k: (opts: RedisOptions) => Driver;

type __drivers_redis_RedisOptions = RedisOptions;
declare namespace __drivers_redis {
  export { type __drivers_redis_RedisOptions as RedisOptions, _default$k as default };
}

interface PlanetscaleDriverOptions {
    url?: string;
    table?: string;
    boostCache?: boolean;
}
declare const _default$j: (opts: PlanetscaleDriverOptions) => Driver;

type __drivers_planetscale_PlanetscaleDriverOptions = PlanetscaleDriverOptions;
declare namespace __drivers_planetscale {
  export { type __drivers_planetscale_PlanetscaleDriverOptions as PlanetscaleDriverOptions, _default$j as default };
}

interface OverlayStorageOptions {
    layers: Driver[];
}
declare const _default$i: (opts: OverlayStorageOptions) => Driver;

type __drivers_overlay_OverlayStorageOptions = OverlayStorageOptions;
declare namespace __drivers_overlay {
  export { type __drivers_overlay_OverlayStorageOptions as OverlayStorageOptions, _default$i as default };
}

interface NetlifyBaseStoreOptions {
    /** The name of the store to use. It is created if needed. This is required except for deploy-scoped stores. */
    name?: string;
    /** If set to `true`, the store is scoped to the deploy. This means that it is only available from that deploy, and will be deleted or rolled-back alongside it. */
    deployScoped?: boolean;
    /** Required during builds, where it is available as `constants.SITE_ID`. At runtime this is set automatically. */
    siteID?: string;
    /** Required during builds, where it is available as `constants.NETLIFY_API_TOKEN`. At runtime this is set automatically. */
    token?: string;
    /** Used for advanced use cases and unit tests */
    apiURL?: string;
    /** Used for advanced use cases and unit tests */
    edgeURL?: string;
}
interface NetlifyDeployStoreOptions extends NetlifyBaseStoreOptions {
    name?: never;
    deployScoped: true;
    deployID?: string;
}
interface NetlifyNamedStoreOptions extends NetlifyBaseStoreOptions {
    name: string;
    deployScoped?: false;
}
type NetlifyStoreOptions = NetlifyDeployStoreOptions | NetlifyNamedStoreOptions;
declare const _default$h: (opts: NetlifyStoreOptions) => Driver;

type __drivers_netlify_blobs_NetlifyBaseStoreOptions = NetlifyBaseStoreOptions;
type __drivers_netlify_blobs_NetlifyDeployStoreOptions = NetlifyDeployStoreOptions;
type __drivers_netlify_blobs_NetlifyNamedStoreOptions = NetlifyNamedStoreOptions;
type __drivers_netlify_blobs_NetlifyStoreOptions = NetlifyStoreOptions;
declare namespace __drivers_netlify_blobs {
  export { type __drivers_netlify_blobs_NetlifyBaseStoreOptions as NetlifyBaseStoreOptions, type __drivers_netlify_blobs_NetlifyDeployStoreOptions as NetlifyDeployStoreOptions, type __drivers_netlify_blobs_NetlifyNamedStoreOptions as NetlifyNamedStoreOptions, type __drivers_netlify_blobs_NetlifyStoreOptions as NetlifyStoreOptions, _default$h as default };
}

interface MongoDbOptions {
    /**
     * The MongoDB connection string.
     */
    connectionString: string;
    /**
     * The name of the database to use.
     * @default "unstorage"
     */
    databaseName?: string;
    /**
     * The name of the collection to use.
     * @default "unstorage"
     */
    collectionName?: string;
}
declare const _default$g: (opts: MongoDbOptions) => Driver;

type __drivers_mongodb_MongoDbOptions = MongoDbOptions;
declare namespace __drivers_mongodb {
  export { type __drivers_mongodb_MongoDbOptions as MongoDbOptions, _default$g as default };
}

declare const _default$f: (opts: void) => Driver;

declare namespace __drivers_memory {
  export { _default$f as default };
}

type LRUCacheOptions = LRUCache.OptionsBase<string, any, any> & Partial<LRUCache.OptionsMaxLimit<string, any, any>> & Partial<LRUCache.OptionsSizeLimit<string, any, any>> & Partial<LRUCache.OptionsTTLLimit<string, any, any>>;
interface LRUDriverOptions extends LRUCacheOptions {
}
declare const _default$e: (opts: LRUDriverOptions) => Driver;

type __drivers_lru_cache_LRUDriverOptions = LRUDriverOptions;
declare namespace __drivers_lru_cache {
  export { type __drivers_lru_cache_LRUDriverOptions as LRUDriverOptions, _default$e as default };
}

interface LocalStorageOptions {
    base?: string;
    window?: typeof window;
    localStorage?: typeof window.localStorage;
}
declare const _default$d: (opts: LocalStorageOptions) => Driver;

type __drivers_localstorage_LocalStorageOptions = LocalStorageOptions;
declare namespace __drivers_localstorage {
  export { type __drivers_localstorage_LocalStorageOptions as LocalStorageOptions, _default$d as default };
}

interface IDBKeyvalOptions {
    base?: string;
    dbName?: string;
    storeName?: string;
}
declare const _default$c: (opts: IDBKeyvalOptions) => Driver;

type __drivers_indexedb_IDBKeyvalOptions = IDBKeyvalOptions;
declare namespace __drivers_indexedb {
  export { type __drivers_indexedb_IDBKeyvalOptions as IDBKeyvalOptions, _default$c as default };
}

interface HTTPOptions {
    base: string;
    headers?: Record<string, string>;
}
declare const _default$b: (opts: HTTPOptions) => Driver;

type __drivers_http_HTTPOptions = HTTPOptions;
declare namespace __drivers_http {
  export { type __drivers_http_HTTPOptions as HTTPOptions, _default$b as default };
}

interface GithubOptions {
    /**
     * The name of the repository. (e.g. `username/my-repo`)
     * Required
     */
    repo: string;
    /**
     * The branch to fetch. (e.g. `dev`)
     * @default "main"
     */
    branch?: string;
    /**
     * @default ""
     */
    dir?: string;
    /**
     * @default 600
     */
    ttl?: number;
    /**
     * Github API token (recommended)
     */
    token?: string;
    /**
     * @default "https://api.github.com"
     */
    apiURL?: string;
    /**
     * @default "https://raw.githubusercontent.com"
     */
    cdnURL?: string;
}
declare const _default$a: (opts: GithubOptions) => Driver;

type __drivers_github_GithubOptions = GithubOptions;
declare namespace __drivers_github {
  export { type __drivers_github_GithubOptions as GithubOptions, _default$a as default };
}

interface FSStorageOptions$1 {
    base?: string;
    ignore?: (path: string) => boolean;
    readOnly?: boolean;
    noClear?: boolean;
}
declare const _default$9: (opts: FSStorageOptions$1) => Driver;

declare namespace __drivers_fs_lite {
  export { type FSStorageOptions$1 as FSStorageOptions, _default$9 as default };
}

interface FSStorageOptions {
    base?: string;
    ignore?: string[];
    readOnly?: boolean;
    noClear?: boolean;
    watchOptions?: WatchOptions;
}
declare const _default$8: (opts: FSStorageOptions) => Driver;

type __drivers_fs_FSStorageOptions = FSStorageOptions;
declare namespace __drivers_fs {
  export { type __drivers_fs_FSStorageOptions as FSStorageOptions, _default$8 as default };
}

interface CloudflareR2Options {
    binding: string | R2Bucket;
    base?: string;
}
declare const _default$7: (opts: CloudflareR2Options) => Driver;

type __drivers_cloudflare_r2_binding_CloudflareR2Options = CloudflareR2Options;
declare namespace __drivers_cloudflare_r2_binding {
  export { type __drivers_cloudflare_r2_binding_CloudflareR2Options as CloudflareR2Options, _default$7 as default };
}

interface KVAuthAPIToken {
    /**
     * API Token generated from the [User Profile 'API Tokens' page](https://dash.cloudflare.com/profile/api-tokens)
     * of the Cloudflare console.
     * @see https://api.cloudflare.com/#getting-started-requests
     */
    apiToken: string;
}
interface KVAuthServiceKey {
    /**
     * A special Cloudflare API key good for a restricted set of endpoints.
     * Always begins with "v1.0-", may vary in length.
     * May be used to authenticate in place of `apiToken` or `apiKey` and `email`.
     * @see https://api.cloudflare.com/#getting-started-requests
     */
    userServiceKey: string;
}
interface KVAuthEmailKey {
    /**
     * Email address associated with your account.
     * Should be used along with `apiKey` to authenticate in place of `apiToken`.
     */
    email: string;
    /**
     * API key generated on the "My Account" page of the Cloudflare console.
     * Should be used along with `email` to authenticate in place of `apiToken`.
     * @see https://api.cloudflare.com/#getting-started-requests
     */
    apiKey: string;
}
type KVHTTPOptions = {
    /**
     * Cloudflare account ID (required)
     */
    accountId: string;
    /**
     * The ID of the KV namespace to target (required)
     */
    namespaceId: string;
    /**
     * The URL of the Cloudflare API.
     * @default https://api.cloudflare.com
     */
    apiURL?: string;
    /**
     * Adds prefix to all stored keys
     */
    base?: string;
} & (KVAuthServiceKey | KVAuthAPIToken | KVAuthEmailKey);
declare const _default$6: (opts: KVHTTPOptions) => Driver;

type __drivers_cloudflare_kv_http_KVHTTPOptions = KVHTTPOptions;
declare namespace __drivers_cloudflare_kv_http {
  export { type __drivers_cloudflare_kv_http_KVHTTPOptions as KVHTTPOptions, _default$6 as default };
}

interface KVOptions {
    binding?: string | KVNamespace;
    /** Adds prefix to all stored keys */
    base?: string;
}
declare const _default$5: (opts: KVOptions) => Driver;

type __drivers_cloudflare_kv_binding_KVOptions = KVOptions;
declare namespace __drivers_cloudflare_kv_binding {
  export { type __drivers_cloudflare_kv_binding_KVOptions as KVOptions, _default$5 as default };
}

interface AzureStorageTableOptions {
    /**
     * The name of the Azure Storage account.
     */
    accountName: string;
    /**
     * The name of the table. All entities will be stored in the same table.
     * @default 'unstorage'
     */
    tableName?: string;
    /**
     * The partition key. All entities will be stored in the same partition.
     * @default 'unstorage'
     */
    partitionKey?: string;
    /**
     * The account key. If provided, the SAS key will be ignored. Only available in Node.js runtime.
     */
    accountKey?: string;
    /**
     * The SAS key. If provided, the account key will be ignored.
     */
    sasKey?: string;
    /**
     * The connection string. If provided, the account key and SAS key will be ignored. Only available in Node.js runtime.
     */
    connectionString?: string;
    /**
     * The number of entries to retrive per request. Impacts getKeys() and clear() performance. Maximum value is 1000.
     * @default 1000
     */
    pageSize?: number;
}
declare const _default$4: (opts: AzureStorageTableOptions) => Driver;

type __drivers_azure_storage_table_AzureStorageTableOptions = AzureStorageTableOptions;
declare namespace __drivers_azure_storage_table {
  export { type __drivers_azure_storage_table_AzureStorageTableOptions as AzureStorageTableOptions, _default$4 as default };
}

interface AzureStorageBlobOptions {
    /**
     * The name of the Azure Storage account.
     */
    accountName: string;
    /**
     * The name of the storage container. All entities will be stored in the same container.
     * @default "unstorage"
     */
    containerName?: string;
    /**
     * The account key. If provided, the SAS key will be ignored. Only available in Node.js runtime.
     */
    accountKey?: string;
    /**
     * The SAS key. If provided, the account key will be ignored.
     */
    sasKey?: string;
    /**
     * The connection string. If provided, the account key and SAS key will be ignored. Only available in Node.js runtime.
     */
    connectionString?: string;
}
declare const _default$3: (opts: AzureStorageBlobOptions) => Driver;

type __drivers_azure_storage_blob_AzureStorageBlobOptions = AzureStorageBlobOptions;
declare namespace __drivers_azure_storage_blob {
  export { type __drivers_azure_storage_blob_AzureStorageBlobOptions as AzureStorageBlobOptions, _default$3 as default };
}

interface AzureKeyVaultOptions {
    /**
     * The name of the key vault to use.
     */
    vaultName: string;
    /**
     * Version of the Azure Key Vault service to use. Defaults to 7.3.
     * @default '7.3'
     */
    serviceVersion?: SecretClientOptions["serviceVersion"];
    /**
     * The number of entries to retrieve per request. Impacts getKeys() and clear() performance. Maximum value is 25.
     * @default 25
     */
    pageSize?: number;
}
declare const _default$2: (opts: AzureKeyVaultOptions) => Driver;

type __drivers_azure_key_vault_AzureKeyVaultOptions = AzureKeyVaultOptions;
declare namespace __drivers_azure_key_vault {
  export { type __drivers_azure_key_vault_AzureKeyVaultOptions as AzureKeyVaultOptions, _default$2 as default };
}

interface AzureCosmosOptions {
    /**
     * CosmosDB endpoint in the format of https://<account>.documents.azure.com:443/.
     */
    endpoint: string;
    /**
     * CosmosDB account key. If not provided, the driver will use the DefaultAzureCredential (recommended).
     */
    accountKey?: string;
    /**
     * The name of the database to use. Defaults to `unstorage`.
     * @default "unstorage"
     */
    databaseName?: string;
    /**
     * The name of the container to use. Defaults to `unstorage`.
     * @default "unstorage"
     */
    containerName?: string;
}
interface AzureCosmosItem {
    /**
     * The unstorage key as id of the item.
     */
    id: string;
    /**
     * The unstorage value of the item.
     */
    value: string;
    /**
     * The unstorage mtime metadata of the item.
     */
    modified: string | Date;
}
declare const _default$1: (opts: AzureCosmosOptions) => Driver;

type __drivers_azure_cosmos_AzureCosmosItem = AzureCosmosItem;
type __drivers_azure_cosmos_AzureCosmosOptions = AzureCosmosOptions;
declare namespace __drivers_azure_cosmos {
  export { type __drivers_azure_cosmos_AzureCosmosItem as AzureCosmosItem, type __drivers_azure_cosmos_AzureCosmosOptions as AzureCosmosOptions, _default$1 as default };
}

interface AzureAppConfigurationOptions {
    /**
     * Optional prefix for keys. This can be used to isolate keys from different applications in the same Azure App Configuration instance. E.g. "app01" results in keys like "app01:foo" and "app01:bar".
     * @default null
     */
    prefix?: string;
    /**
     * Optional label for keys. If not provided, all keys will be created and listed without labels. This can be used to isolate keys from different environments in the same Azure App Configuration instance. E.g. "dev" results in keys like "foo" and "bar" with the label "dev".
     * @default '\0'
     */
    label?: string;
    /**
     * Optional endpoint to use when connecting to Azure App Configuration. If not provided, the appConfigName option must be provided. If both are provided, the endpoint option takes precedence.
     * @default null
     */
    endpoint?: string;
    /**
     * Optional name of the Azure App Configuration instance to connect to. If not provided, the endpoint option must be provided. If both are provided, the endpoint option takes precedence.
     * @default null
     */
    appConfigName?: string;
    /**
     * Optional connection string to use when connecting to Azure App Configuration. If not provided, the endpoint option must be provided. If both are provided, the endpoint option takes precedence.
     * @default null
     */
    connectionString?: string;
}
declare const _default: (opts: AzureAppConfigurationOptions) => Driver;

type __drivers_azure_app_configuration_AzureAppConfigurationOptions = AzureAppConfigurationOptions;
declare namespace __drivers_azure_app_configuration {
  export { type __drivers_azure_app_configuration_AzureAppConfigurationOptions as AzureAppConfigurationOptions, _default as default };
}

interface CreateStorageOptions {
    driver?: Driver;
}
declare function createStorage<T extends StorageValue>(options?: CreateStorageOptions): Storage<T>;
type Snapshot<T = string> = Record<string, T>;
declare function snapshot(storage: Storage, base: string): Promise<Snapshot<string>>;
declare function restoreSnapshot(driver: Storage, snapshot: Snapshot<StorageValue>, base?: string): Promise<void>;

declare function prefixStorage<T extends StorageValue>(storage: Storage<T>, base: string): Storage<T>;
declare function normalizeKey(key?: string): string;
declare function joinKeys(...keys: string[]): string;
declare function normalizeBaseKey(base?: string): string;

type DriverFactory<T> = (opts: T) => Driver;
declare function defineDriver<T = any>(factory: DriverFactory<T>): DriverFactory<T>;

declare const builtinDrivers: {
    readonly azureAppConfiguration: "unstorage/drivers/azure-app-configuration";
    readonly azureCosmos: "unstorage/drivers/azure-cosmos";
    readonly azureKeyVault: "unstorage/drivers/azure-key-vault";
    readonly azureStorageBlob: "unstorage/drivers/azure-storage-blob";
    readonly azureStorageTable: "unstorage/drivers/azure-storage-table";
    readonly cloudflareKVBinding: "unstorage/drivers/cloudflare-kv-binding";
    readonly cloudflareKVHTTP: "unstorage/drivers/cloudflare-kv-http";
    readonly cloudflareR2Binding: "unstorage/drivers/cloudflare-r2-binding";
    readonly fs: "unstorage/drivers/fs";
    readonly fsLite: "unstorage/drivers/fs-lite";
    readonly github: "unstorage/drivers/github";
    readonly http: "unstorage/drivers/http";
    readonly indexedb: "unstorage/drivers/indexedb";
    readonly localStorage: "unstorage/drivers/localstorage";
    readonly lruCache: "unstorage/drivers/lru-cache";
    readonly memory: "unstorage/drivers/memory";
    readonly mongodb: "unstorage/drivers/mongodb";
    readonly netlifyBlobs: "unstorage/drivers/netlify-blobs";
    readonly overlay: "unstorage/drivers/overlay";
    readonly planetscale: "unstorage/drivers/planetscale";
    readonly redis: "unstorage/drivers/redis";
    readonly sessionStorage: "unstorage/drivers/session-storage";
    readonly vercelKV: "unstorage/drivers/vercel-kv";
    /** @deprecated */
    readonly "cloudflare-kv-binding": "unstorage/drivers/cloudflare-kv-binding";
    /** @deprecated */
    readonly "cloudflare-kv-http": "unstorage/drivers/cloudflare-kv-http";
};
type ExtractOpts<T> = T extends (opts: infer Opts) => any ? Opts : never;
type BuiltinDriverOptions = {
    azureAppConfiguration: ExtractOpts<(typeof __drivers_azure_app_configuration)["default"]>;
    azureCosmos: ExtractOpts<(typeof __drivers_azure_cosmos)["default"]>;
    azureKeyVault: ExtractOpts<(typeof __drivers_azure_key_vault)["default"]>;
    azureStorageBlob: ExtractOpts<(typeof __drivers_azure_storage_blob)["default"]>;
    azureStorageTable: ExtractOpts<(typeof __drivers_azure_storage_table)["default"]>;
    cloudflareKVBinding: ExtractOpts<(typeof __drivers_cloudflare_kv_binding)["default"]>;
    cloudflareKVHTTP: ExtractOpts<(typeof __drivers_cloudflare_kv_http)["default"]>;
    cloudflareR2Binding: ExtractOpts<(typeof __drivers_cloudflare_r2_binding)["default"]>;
    fs: ExtractOpts<(typeof __drivers_fs)["default"]>;
    fsLite: ExtractOpts<(typeof __drivers_fs_lite)["default"]>;
    github: ExtractOpts<(typeof __drivers_github)["default"]>;
    http: ExtractOpts<(typeof __drivers_http)["default"]>;
    indexedb: ExtractOpts<(typeof __drivers_indexedb)["default"]>;
    localStorage: ExtractOpts<(typeof __drivers_localstorage)["default"]>;
    lruCache: ExtractOpts<(typeof __drivers_lru_cache)["default"]>;
    memory: ExtractOpts<(typeof __drivers_memory)["default"]>;
    mongodb: ExtractOpts<(typeof __drivers_mongodb)["default"]>;
    netlifyBlobs: ExtractOpts<(typeof __drivers_netlify_blobs)["default"]>;
    overlay: ExtractOpts<(typeof __drivers_overlay)["default"]>;
    planetscale: ExtractOpts<(typeof __drivers_planetscale)["default"]>;
    redis: ExtractOpts<(typeof __drivers_redis)["default"]>;
    sessionStorage: ExtractOpts<(typeof __drivers_session_storage)["default"]>;
    vercelKV: ExtractOpts<(typeof __drivers_vercel_kv)["default"]>;
    /** @deprecated */
    "cloudflare-kv-binding": ExtractOpts<(typeof __drivers_cloudflare_kv_binding)["default"]>;
    /** @deprecated */
    "cloudflare-kv-http": ExtractOpts<(typeof __drivers_cloudflare_kv_http)["default"]>;
};
type BuiltinDriverName = keyof typeof builtinDrivers;

export { type BuiltinDriverName, type BuiltinDriverOptions, type CreateStorageOptions, Driver, type Snapshot, Storage, StorageValue, builtinDrivers, createStorage, defineDriver, joinKeys, normalizeBaseKey, normalizeKey, prefixStorage, restoreSnapshot, snapshot };
