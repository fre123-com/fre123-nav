export declare function shouldThrowError<T extends (...args: any[]) => boolean>(suspense: boolean | undefined, _useErrorBoundary: boolean | T | undefined, params: Parameters<T>): boolean;
