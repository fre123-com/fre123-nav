declare const env: {
    delete: (key: string) => void;
    get: (key: string) => string | undefined;
    has: (key: string) => boolean;
    set: (key: string, value: string) => void;
    toObject: () => Record<string, string>;
};
declare global {
    var Netlify: {
        env: typeof env;
    };
}
/**
 * @deprecated globalThis.Netlify is populated during module initialisation, so this function is no longer needed.
 */
export declare const getNetlifyGlobal: () => {
    env: {
        delete: (key: string) => void;
        get: (key: string) => string | undefined;
        has: (key: string) => boolean;
        set: (key: string, value: string) => void;
        toObject: () => Record<string, string>;
    };
};
export {};
