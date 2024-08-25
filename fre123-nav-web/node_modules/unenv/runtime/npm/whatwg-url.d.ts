export declare const URL: {
    new (url: string | URL, base?: string | URL | undefined): URL;
    prototype: URL;
    canParse(url: string | URL, base?: string | undefined): boolean;
    createObjectURL(obj: Blob | MediaSource): string;
    revokeObjectURL(url: string): void;
};
export declare const URLSearchParams: {
    new (init?: string | URLSearchParams | Record<string, string> | string[][] | undefined): URLSearchParams;
    prototype: URLSearchParams;
};
export declare const parseURL: (() => any) & {
    __unenv__: boolean;
};
export declare const basicURLParse: (() => any) & {
    __unenv__: boolean;
};
export declare const serializeURL: (() => any) & {
    __unenv__: boolean;
};
export declare const serializeHost: (() => any) & {
    __unenv__: boolean;
};
export declare const serializeInteger: (() => any) & {
    __unenv__: boolean;
};
export declare const serializeURLOrigin: (() => any) & {
    __unenv__: boolean;
};
export declare const setTheUsername: (() => any) & {
    __unenv__: boolean;
};
export declare const setThePassword: (() => any) & {
    __unenv__: boolean;
};
export declare const cannotHaveAUsernamePasswordPort: (() => any) & {
    __unenv__: boolean;
};
export declare const percentDecodeBytes: (() => any) & {
    __unenv__: boolean;
};
export declare const percentDecodeString: (() => any) & {
    __unenv__: boolean;
};
