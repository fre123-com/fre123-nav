import "#internal/nitro/virtual/polyfill";
import type { Request as CFRequest, EventContext } from "@cloudflare/workers-types";
/**
 * Reference: https://developers.cloudflare.com/workers/runtime-apis/fetch-event/#parameters
 */
interface CFPagesEnv {
    ASSETS: {
        fetch: (request: CFRequest) => Promise<Response>;
    };
    CF_PAGES: "1";
    CF_PAGES_BRANCH: string;
    CF_PAGES_COMMIT_SHA: string;
    CF_PAGES_URL: string;
    [key: string]: any;
}
declare const _default: {
    fetch(request: CFRequest, env: CFPagesEnv, context: EventContext<CFPagesEnv, string, any>): Promise<any>;
};
export default _default;
