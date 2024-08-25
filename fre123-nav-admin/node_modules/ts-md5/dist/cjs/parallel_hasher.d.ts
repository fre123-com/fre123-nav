export interface WorkerOptions {
    credentials?: 'omit' | 'same-origin' | 'include';
    name?: string;
    type?: 'classic' | 'module';
}
export declare class ParallelHasher {
    private _queue;
    private _hashWorker;
    private _processing?;
    private _ready;
    constructor(workerUri: string, workerOptions?: WorkerOptions);
    /**
     * Hash a blob of data in the worker
     * @param blob Data to hash
     * @returns Promise of the Hashed result
     */
    hash(blob: any): Promise<unknown>;
    /** Terminate any existing hash requests */
    terminate(): void;
    private _processNext;
    private _recievedMessage;
}
