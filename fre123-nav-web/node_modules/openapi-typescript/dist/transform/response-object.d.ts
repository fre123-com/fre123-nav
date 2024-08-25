import type { GlobalContext, ResponseObject } from "../types.js";
export interface TransformResponseObjectOptions {
    path: string;
    ctx: GlobalContext;
}
export default function transformResponseObject(responseObject: ResponseObject, { path, ctx }: TransformResponseObjectOptions): string;
