import type { GlobalContext, ParameterObject, ReferenceObject } from "../types.js";
export interface TransformParameterArrayOptions {
    path: string;
    ctx: GlobalContext;
}
export default function transformParameterObjectArray(parameterObjectArray: (ParameterObject | ReferenceObject)[] | Record<string, ParameterObject | ReferenceObject>, { path, ctx }: TransformParameterArrayOptions): string;
