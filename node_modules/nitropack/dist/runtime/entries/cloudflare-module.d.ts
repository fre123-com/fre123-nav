import "#internal/nitro/virtual/polyfill";
import type { ExecutionContext } from "@cloudflare/workers-types";
interface CFModuleEnv {
    [key: string]: any;
}
declare const _default: {
    fetch(request: Request, env: CFModuleEnv, context: ExecutionContext): Promise<any>;
};
export default _default;
