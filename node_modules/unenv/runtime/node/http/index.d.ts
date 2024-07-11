/// <reference types="node" />
import type http from "node:http";
export * from "./_consts";
export * from "./_request";
export * from "./_response";
export declare const createServer: typeof http.createServer;
export declare const request: typeof http.request;
export declare const get: typeof http.get;
export declare const Server: typeof http.Server;
export declare const OutgoingMessage: typeof http.OutgoingMessage;
export declare const ClientRequest: typeof http.ClientRequest;
export declare const Agent: typeof http.Agent;
export declare const globalAgent: typeof http.globalAgent;
export declare const validateHeaderName: typeof http.validateHeaderName;
export declare const validateHeaderValue: typeof http.validateHeaderValue;
export declare const setMaxIdleHTTPParsers: typeof http.setMaxIdleHTTPParsers;
declare const _default: any;
export default _default;
