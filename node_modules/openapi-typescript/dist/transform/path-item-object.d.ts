import type { GlobalContext, PathItemObject } from "../types.js";
export interface TransformPathItemObjectOptions {
    path: string;
    ctx: GlobalContext;
}
export type Method = "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";
export default function transformPathItemObject(pathItem: PathItemObject, { path, ctx }: TransformPathItemObjectOptions): string;
