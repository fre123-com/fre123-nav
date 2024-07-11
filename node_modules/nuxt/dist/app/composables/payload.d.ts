interface LoadPayloadOptions {
    fresh?: boolean;
    hash?: string;
}
export declare function loadPayload(url: string, opts?: LoadPayloadOptions): Record<string, any> | Promise<Record<string, any>> | null;
export declare function preloadPayload(url: string, opts?: LoadPayloadOptions): void;
export declare function isPrerendered(url?: any): Promise<boolean>;
export declare function getNuxtClientPayload(): Promise<any>;
export declare function parsePayload(payload: string): any;
/**
 * This is an experimental function for configuring passing rich data from server -> client.
 */
export declare function definePayloadReducer(name: string, reduce: (data: any) => any): void;
/**
 * This is an experimental function for configuring passing rich data from server -> client.
 *
 * This function _must_ be called in a Nuxt plugin that is `unshift`ed to the beginning of the Nuxt plugins array.
 */
export declare function definePayloadReviver(name: string, revive: (data: any) => any | undefined): void;
export {};
