import type { GlobalContext, HeaderObject } from "../types.js";
export interface TransformHeaderObjectOptions {
    path: string;
    ctx: GlobalContext;
}
export default function transformHeaderObject(headerObject: HeaderObject, { path, ctx }: TransformHeaderObjectOptions): string;
