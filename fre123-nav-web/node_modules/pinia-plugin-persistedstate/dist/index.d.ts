import * as pinia from 'pinia';
import { StateTree, PiniaPluginContext, PiniaPlugin } from 'pinia';

type Prettify<T> = {
    [K in keyof T]: T[K];
};
type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;
interface Serializer {
    /**
     * Serializes state into string before storing
     * @default JSON.stringify
     */
    serialize: (value: StateTree) => string;
    /**
     * Deserializes string into state before hydrating
     * @default JSON.parse
     */
    deserialize: (value: string) => StateTree;
}
interface PersistedStateOptions {
    /**
     * Storage key to use.
     * @default $store.id
     */
    key?: string | ((id: string) => string);
    /**
     * Where to store persisted state.
     * @default localStorage
     */
    storage?: StorageLike;
    /**
     * Dot-notation paths to partially save state. Saves everything if undefined.
     * @default undefined
     */
    paths?: Array<string>;
    /**
     * Customer serializer to serialize/deserialize state.
     */
    serializer?: Serializer;
    /**
     * Hook called before state is hydrated from storage.
     * @default null
     */
    beforeRestore?: (context: PiniaPluginContext) => void;
    /**
     * Hook called after state is hydrated from storage.
     * @default undefined
     */
    afterRestore?: (context: PiniaPluginContext) => void;
    /**
     * Logs errors in console when enabled.
     * @default false
     */
    debug?: boolean;
}
type PersistedStateFactoryOptions = Prettify<Pick<PersistedStateOptions, 'storage' | 'serializer' | 'afterRestore' | 'beforeRestore' | 'debug'> & {
    /**
     * Global key generator, allows pre/postfixing store keys.
     * @default storeKey => storeKey
     */
    key?: (storeKey: string) => string;
    /**
     * Automatically persists all stores, opt-out individually.
     * @default false
     */
    auto?: boolean;
}>;
declare module 'pinia' {
    interface DefineStoreOptionsBase<S extends StateTree, Store> {
        /**
         * Persists store in storage.
         * @see https://prazdevs.github.io/pinia-plugin-persistedstate
         */
        persist?: boolean | PersistedStateOptions | PersistedStateOptions[];
    }
    interface PiniaCustomProperties {
        /**
         * Rehydrates store from persisted state
         * Warning: this is for advances usecases, make sure you know what you're doing.
         * @see https://prazdevs.github.io/pinia-plugin-persistedstate/guide/advanced.html#forcing-the-rehydration
         */
        $hydrate: (opts?: {
            runHooks?: boolean;
        }) => void;
        /**
         * Persists store into configured storage
         * Warning: this is for advances usecases, make sure you know what you're doing.
         * @see https://prazdevs.github.io/pinia-plugin-persistedstate/guide/advanced.html#forcing-the-persistence
         */
        $persist: () => void;
    }
}

/**
 * Creates a pinia persistence plugin
 * @param factoryOptions global persistence options
 * @returns pinia plugin
 */
declare function createPersistedState(factoryOptions?: PersistedStateFactoryOptions): PiniaPlugin;

declare const _default: pinia.PiniaPlugin;

export { PersistedStateFactoryOptions, PersistedStateOptions, Serializer, StorageLike, createPersistedState, _default as default };
