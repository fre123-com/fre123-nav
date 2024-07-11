import type { GlobalContext, ParameterObject } from "../types.js";
export interface TransformParameterObjectOptions {
    path: string;
    ctx: GlobalContext;
}
export default function transformParameterObject(parameterObject: ParameterObject, { path, ctx }: TransformParameterObjectOptions): string;
