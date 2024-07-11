import { EventHandler } from "h3";
import type { EventHandlerRequest, EventHandlerResponse, H3Event } from "h3";
export interface CacheEntry<T = any> {
    value?: T;
    expires?: number;
    mtime?: number;
    integrity?: string;
}
export interface CacheOptions<T = any> {
    name?: string;
    getKey?: (...args: any[]) => string | Promise<string>;
    transform?: (entry: CacheEntry<T>, ...args: any[]) => any;
    validate?: (entry: CacheEntry<T>) => boolean;
    shouldInvalidateCache?: (...args: any[]) => boolean;
    shouldBypassCache?: (...args: any[]) => boolean;
    group?: string;
    integrity?: any;
    /**
     * Number of seconds to cache the response. Defaults to 1.
     */
    maxAge?: number;
    swr?: boolean;
    staleMaxAge?: number;
    base?: string;
}
export declare function defineCachedFunction<T, ArgsT extends unknown[] = unknown[]>(fn: (...args: ArgsT) => T | Promise<T>, opts?: CacheOptions<T>): (...args: ArgsT) => Promise<T>;
export declare const cachedFunction: typeof defineCachedFunction;
export interface ResponseCacheEntry<T = any> {
    body: T;
    code: number;
    headers: Record<string, string | number | string[]>;
}
export interface CachedEventHandlerOptions<T = any> extends Omit<CacheOptions<ResponseCacheEntry<T>>, "transform" | "validate"> {
    shouldInvalidateCache?: (event: H3Event) => boolean;
    shouldBypassCache?: (event: H3Event) => boolean;
    getKey?: (event: H3Event) => string | Promise<string>;
    headersOnly?: boolean;
    varies?: string[];
}
export declare function defineCachedEventHandler<Request extends EventHandlerRequest = EventHandlerRequest, Response = EventHandlerResponse>(handler: EventHandler<Request, Response>, opts?: CachedEventHandlerOptions<Response>): EventHandler<Omit<Request, "body">, Response>;
export declare function defineCachedEventHandler<Request = Omit<EventHandlerRequest, "body">, Response = EventHandlerResponse>(handler: EventHandler<Request extends EventHandlerRequest ? Request : EventHandlerRequest, Request extends EventHandlerRequest ? Response : Request>, opts?: CachedEventHandlerOptions<Request extends EventHandlerRequest ? Response : Request>): EventHandler<Request extends EventHandlerRequest ? Request : EventHandlerRequest, Request extends EventHandlerRequest ? Response : Request>;
export declare const cachedEventHandler: typeof defineCachedEventHandler;
