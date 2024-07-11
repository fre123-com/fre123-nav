/// <reference types="node" />
/// <reference types="node" />
import type { Fetch, GlobalContext, ParameterObject, Subschema } from "./types.js";
import { Readable } from "node:stream";
import { URL } from "node:url";
interface SchemaMap {
    [id: string]: Subschema;
}
export declare const VIRTUAL_JSON_URL = "file:///_json";
export declare function resolveSchema(filename: string): URL;
export interface LoadOptions extends GlobalContext {
    hint?: Subschema["hint"];
    auth?: string;
    rootURL: URL;
    schemas: SchemaMap;
    urlCache: Set<string>;
    httpHeaders?: Record<string, unknown>;
    httpMethod?: string;
    fetch: Fetch;
    parameters: Record<string, ParameterObject>;
}
export default function load(schema: URL | Subschema | Readable, options: LoadOptions): Promise<{
    [url: string]: Subschema;
}>;
export interface GetHintOptions {
    path: string[];
    external: boolean;
    startFrom?: Subschema["hint"];
}
export declare function getHint({ path, external, startFrom }: GetHintOptions): Subschema["hint"] | undefined;
export {};
