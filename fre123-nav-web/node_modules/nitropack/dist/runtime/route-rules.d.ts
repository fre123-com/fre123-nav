import { H3Event } from "h3";
import type { NitroRouteRules } from "nitropack";
export declare function createRouteRulesHandler(ctx: {
    localFetch: typeof globalThis.fetch;
}): import("h3").EventHandler<import("h3").EventHandlerRequest, Promise<any> | undefined>;
export declare function getRouteRules(event: H3Event): NitroRouteRules;
export declare function getRouteRulesForPath(path: string): NitroRouteRules;
