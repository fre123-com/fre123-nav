export interface WorkerOptions {
    credentials?: 'omit' | 'same-origin' | 'include';
    name?: string;
    type?: 'classic' | 'module';
}

declare var Worker: {
    prototype: Worker;
    new (stringUrl: string, options?: WorkerOptions): Worker;
};

interface HashingRequest {
    blob: any;
    resolve: (...d: any) => void;
    reject: (...d: any) => void;
};

export class ParallelHasher {
    private _queue: HashingRequest[] = [];
    private _hashWorker: any;
    private _processing?: HashingRequest;

    private _ready: boolean = true;

    constructor(workerUri: string, workerOptions?: WorkerOptions) {
        const self = this;

        if (Worker) {
            self._hashWorker = new Worker(workerUri, workerOptions);
            self._hashWorker.onmessage = self._recievedMessage.bind(self);
            self._hashWorker.onerror = (err: any) => {
                self._ready = false;
                console.error('Hash worker failure', err);
            };
        } else {
            self._ready = false;
            console.error('Web Workers are not supported in this browser');
        }
    }

    /**
     * Hash a blob of data in the worker
     * @param blob Data to hash
     * @returns Promise of the Hashed result
     */
    public hash(blob: any) {
        const self = this;
        let promise;

        promise = new Promise((resolve, reject) => {
            self._queue.push({
                blob,
                resolve,
                reject,
            });

            self._processNext();
        });

        return promise;
    }

    /** Terminate any existing hash requests */
    public terminate() {
        this._ready = false;
        this._hashWorker.terminate();
    }

    // Processes the next item in the queue
    private _processNext() {
        if (this._ready && !this._processing && this._queue.length > 0) {
            this._processing = this._queue.pop();
            this._hashWorker.postMessage(this._processing!.blob);
        }
    }

    // Hash result is returned from the worker
    private _recievedMessage(evt: any) {
        const data = evt.data;

        if (data.success) {
            this._processing?.resolve(data.result);
        } else {
            this._processing?.reject(data.result);
        }

        this._processing = undefined;
        this._processNext();
    }
}
