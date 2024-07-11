/// <reference types="node" />
import type nodeEvents from "node:events";
interface Listener {
    (...args: any[]): void;
    listener?: (...args: any[]) => void;
}
export declare class EventEmitter implements nodeEvents.EventEmitter {
    readonly __unenv__ = true;
    _events: Record<string, Listener[] & {
        warned?: boolean;
    }>;
    _maxListeners: undefined | number;
    static get defaultMaxListeners(): number;
    static set defaultMaxListeners(arg: number);
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    emit(type: string, ...args: any[]): boolean;
    addListener(type: string, listener: Listener): this;
    on(type: string, listener: Listener): this;
    prependListener(type: string, listener: Listener): this;
    once(type: string, listener: Listener): this;
    prependOnceListener(type: string, listener: Listener): this;
    removeListener(type: string, listener: Listener): this;
    off(type: string, listener: Listener): this;
    removeAllListeners(type: string): this;
    listeners(type: string): ((...args: any[]) => void)[];
    rawListeners(type: string): ((...args: any[]) => void)[];
    listenerCount(type: string): number;
    eventNames(): string[];
}
export declare function once(emitter: EventEmitter, name: string): Promise<unknown>;
export {};
