/// <reference types="node" />
import type net from "node:net";
export { Socket, SocketAddress } from "./socket";
export declare const createServer: any;
export declare const Server: any;
export declare const BlockList: any;
export declare const connect: any;
export declare const createConnection: any;
export declare const getDefaultAutoSelectFamily: any;
export declare const setDefaultAutoSelectFamily: any;
export declare const getDefaultAutoSelectFamilyAttemptTimeout: any;
export declare const setDefaultAutoSelectFamilyAttemptTimeout: any;
export declare const isIPv4: typeof net.isIPv4;
export declare const isIPv6: typeof net.isIPv6;
export declare const isIP: typeof net.isIP;
export declare const exports: typeof net;
export default exports;
