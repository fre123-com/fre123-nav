import type { GlobalContext, RequestBodyObject } from "../types.js";
export interface TransformRequestBodyObjectOptions {
    path: string;
    ctx: GlobalContext;
}
export default function transformRequestBodyObject(requestBodyObject: RequestBodyObject, { path, ctx }: TransformRequestBodyObjectOptions): string;
