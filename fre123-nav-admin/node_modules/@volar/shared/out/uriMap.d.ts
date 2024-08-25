interface Options<T> {
    delete(key: string): boolean;
    get(key: string): T | undefined;
    has(key: string): boolean;
    set(key: string, value: T): void;
    clear(): void;
    values(): IterableIterator<T>;
}
export declare function createPathMap<T>(map?: Options<T>): {
    clear: () => void;
    values: () => IterableIterator<T>;
    uriDelete: (_uri: string) => boolean;
    uriGet: (_uri: string) => T | undefined;
    uriHas: (_uri: string) => boolean;
    uriSet: (_uri: string, item: T) => void;
    fsPathDelete: (_fsPath: string) => boolean;
    fsPathGet: (_fsPath: string) => T | undefined;
    fsPathHas: (_fsPath: string) => boolean;
    fsPathSet: (_fsPath: string, item: T) => void;
};
export {};
