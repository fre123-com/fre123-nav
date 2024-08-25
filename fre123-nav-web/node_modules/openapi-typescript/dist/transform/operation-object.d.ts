import type { GlobalContext, OperationObject } from "../types.js";
export interface TransformOperationObjectOptions {
    path: string;
    ctx: GlobalContext;
    wrapObject?: boolean;
}
export default function transformOperationObject(operationObject: OperationObject, { path, ctx, wrapObject }: TransformOperationObjectOptions): string;
