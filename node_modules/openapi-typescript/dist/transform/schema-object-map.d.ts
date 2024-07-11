import type { GlobalContext, SchemaObject } from "../types.js";
export interface TransformSchemaMapOptions {
    path: string;
    ctx: GlobalContext;
}
export default function transformSchemaObjectMap(schemaObjMap: Record<string, SchemaObject>, { path, ctx }: TransformSchemaMapOptions): string;
