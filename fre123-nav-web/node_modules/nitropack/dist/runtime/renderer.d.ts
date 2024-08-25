import { H3Event } from "h3";
export interface RenderResponse {
    body: any;
    statusCode: number;
    statusMessage: string;
    headers: Record<string, string>;
}
export type RenderHandler = (event: H3Event) => Partial<RenderResponse> | Promise<Partial<RenderResponse>>;
export declare function defineRenderHandler(handler: RenderHandler): import("h3").EventHandler<import("h3").EventHandlerRequest, Promise<any>>;
