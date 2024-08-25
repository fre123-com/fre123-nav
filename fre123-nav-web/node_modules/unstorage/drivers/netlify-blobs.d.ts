export interface NetlifyBaseStoreOptions {
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
export interface NetlifyDeployStoreOptions extends NetlifyBaseStoreOptions {
    name?: never;
    deployScoped: true;
    deployID?: string;
}
export interface NetlifyNamedStoreOptions extends NetlifyBaseStoreOptions {
    name: string;
    deployScoped?: false;
}
export type NetlifyStoreOptions = NetlifyDeployStoreOptions | NetlifyNamedStoreOptions;
declare const _default: (opts: NetlifyStoreOptions) => import("../types").Driver;
export default _default;
