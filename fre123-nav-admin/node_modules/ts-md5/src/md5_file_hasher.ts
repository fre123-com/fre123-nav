import {Md5} from './md5';

declare let FileReaderSync: any;

export interface HashingResponse {
    success: boolean;
    result?: string | Int32Array;
}

// Hashes any blob
export class Md5FileHasher {
    private _reader: any;

    private _md5!: Md5;
    private _part!: number;
    // private _length!: number;
    private _blob: any;


    constructor(
        private _callback: (r: HashingResponse) => void,    // Callback to return the result
        private _async: boolean = true,                     // Async version is not always available in a web worker
        private _partSize: number = 1048576,                // 1mb
    ) {
        this._configureReader();
    }

    /**
     * Hash a blob of data in the worker
     * @param blob Data to hash
     */
    public hash(blob: any) {
        const self = this;

        self._blob = blob;
        // self._length = Math.ceil(blob.size / self._partSize);
        self._part = 0;
        self._md5 = new Md5();
        self._processPart();
    }


    private _fail() {
        this._callback({
            success: false,
            result: 'data read failed'
        });
    }

    private _hashData(e: any) {
        let self = this;

        self._md5.appendByteArray(new Uint8Array(e.target.result));
        if (self._part * self._partSize >= self._blob.size) {
            self._callback({
                success: true,
                result: self._md5.end()
            });
        } else {
            self._processPart();
        }
    }

    private _processPart() {
        const self = this;
        let endbyte = 0;
        let current_part: any;

        self._part += 1;

        if (self._blob.size > self._partSize) {        // If blob bigger then part_size we will slice it up
            endbyte = self._part * self._partSize;
            if (endbyte > self._blob.size) {
                endbyte = self._blob.size;
            }
            current_part = self._blob.slice((self._part - 1) * self._partSize, endbyte);
        } else {
            current_part = self._blob;
        }

        if (self._async) {
            self._reader.readAsArrayBuffer(current_part);
        } else {
            setTimeout(() => {
                try {
                    self._hashData({
                        target: {
                            result: self._reader.readAsArrayBuffer(current_part)
                        },
                    });
                } catch (e) {
                    self._fail();
                }
            }, 0);
        }
    }

    private _configureReader() {
        const self = this;

        if (self._async) {
            self._reader = new FileReader();
            self._reader.onload = self._hashData.bind(self);
            self._reader.onerror = self._fail.bind(self);
            self._reader.onabort = self._fail.bind(self);
        } else {
            self._reader = new FileReaderSync();
        }
    }
}
