export interface HashingResponse {
    success: boolean;
    result?: string | Int32Array;
}
export declare class Md5FileHasher {
    private _callback;
    private _async;
    private _partSize;
    private _reader;
    private _md5;
    private _part;
    private _blob;
    constructor(_callback: (r: HashingResponse) => void, // Callback to return the result
    _async?: boolean, // Async version is not always available in a web worker
    _partSize?: number);
    /**
     * Hash a blob of data in the worker
     * @param blob Data to hash
     */
    hash(blob: any): void;
    private _fail;
    private _hashData;
    private _processPart;
    private _configureReader;
}
