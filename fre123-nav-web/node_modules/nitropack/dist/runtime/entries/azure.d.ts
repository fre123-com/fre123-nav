import "#internal/nitro/virtual/polyfill";
import type { HttpResponse, HttpRequest } from "@azure/functions";
export declare function handle(context: {
    res: HttpResponse;
}, req: HttpRequest): Promise<void>;
