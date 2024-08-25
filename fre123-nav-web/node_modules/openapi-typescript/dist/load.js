import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { URL } from "node:url";
import yaml from "js-yaml";
import { parseRef, error, makeTSIndex, walk, isRemoteURL, isFilepath } from "./utils.js";
const EXT_RE = /\.(yaml|yml|json)#?\/?/i;
export const VIRTUAL_JSON_URL = `file:///_json`;
function parseSchema(source) {
    return source.trim().startsWith("{") ? JSON.parse(source) : yaml.load(source);
}
export function resolveSchema(filename) {
    if (isRemoteURL(filename))
        return new URL(filename.startsWith("//") ? `https:${filename}` : filename);
    const localPath = path.isAbsolute(filename) ? new URL(`file://${filename}`) : new URL(filename, `file://${process.cwd()}/`);
    if (!fs.existsSync(localPath)) {
        error(`Could not locate ${filename}`);
        process.exit(1);
    }
    else if (fs.statSync(localPath).isDirectory()) {
        error(`${localPath} is a directory not a file`);
        process.exit(1);
    }
    return localPath;
}
function parseHttpHeaders(httpHeaders) {
    const finalHeaders = {};
    for (const [k, v] of Object.entries(httpHeaders)) {
        if (typeof v === "string") {
            finalHeaders[k] = v;
        }
        else {
            try {
                const stringVal = JSON.stringify(v);
                finalHeaders[k] = stringVal;
            }
            catch (err) {
                error(`Can’t parse key: ${k} into JSON format. Continuing with the next HTTP header that is specified`);
            }
        }
    }
    return finalHeaders;
}
export default async function load(schema, options) {
    let schemaID = ".";
    if (schema instanceof URL) {
        const hint = options.hint ?? "OpenAPI3";
        if (schema.href !== options.rootURL.href) {
            schemaID = relativePath(options.rootURL, schema);
        }
        if (options.urlCache.has(schemaID)) {
            return options.schemas;
        }
        options.urlCache.add(schemaID);
        if (schema.protocol.startsWith("http")) {
            const headers = { "User-Agent": "openapi-typescript" };
            if (options.auth)
                headers.Authorization = options.auth;
            if (options.httpHeaders) {
                const parsedHeaders = parseHttpHeaders(options.httpHeaders);
                for (const [k, v] of Object.entries(parsedHeaders)) {
                    headers[k] = v;
                }
            }
            const res = await options.fetch(schema, {
                method: options.httpMethod || "GET",
                headers,
            });
            const contents = await res.text();
            options.schemas[schemaID] = { hint, schema: parseSchema(contents) };
        }
        else {
            const contents = fs.readFileSync(schema, "utf8");
            options.schemas[schemaID] = { hint, schema: parseSchema(contents) };
        }
    }
    else if (schema instanceof Readable) {
        const readable = schema;
        const contents = await new Promise((resolve) => {
            readable.resume();
            readable.setEncoding("utf8");
            let content = "";
            readable.on("data", (chunk) => {
                content += chunk;
            });
            readable.on("end", () => {
                resolve(content.trim());
            });
        });
        options.schemas[schemaID] = { hint: "OpenAPI3", schema: parseSchema(contents) };
    }
    else if (typeof schema === "object") {
        options.schemas[schemaID] = {
            hint: "OpenAPI3",
            schema: JSON.parse(JSON.stringify(schema)),
        };
    }
    else {
        error(`Invalid schema`);
        process.exit(1);
    }
    const currentSchema = options.schemas[schemaID].schema;
    if (options.schemas[schemaID].hint === "OpenAPI3") {
        if ("components" in currentSchema && currentSchema.components && "examples" in currentSchema.components)
            delete currentSchema.components.examples;
    }
    const refPromises = [];
    walk(currentSchema, (rawNode, nodePath) => {
        for (const k of ["allOf", "anyOf", "oneOf"]) {
            if (Array.isArray(rawNode[k])) {
                rawNode[k] = rawNode[k].filter((o) => {
                    if (!o || typeof o !== "object" || Array.isArray(o))
                        throw new Error(`${nodePath}.${k}: Expected array of objects. Is your schema valid?`);
                    if (!("$ref" in o) || typeof o.$ref !== "string")
                        return true;
                    const ref = parseRef(o.$ref);
                    return !ref.path.some((i) => i.startsWith("x-"));
                });
            }
        }
        if (!rawNode || typeof rawNode !== "object" || Array.isArray(rawNode))
            throw new Error(`${nodePath}: Expected object, got ${Array.isArray(rawNode) ? "array" : typeof rawNode}. Is your schema valid?`);
        if (!("$ref" in rawNode) || typeof rawNode.$ref !== "string")
            return;
        const node = rawNode;
        const ref = parseRef(node.$ref);
        if (ref.filename === ".") {
            return;
        }
        if (ref.path.some((i) => i.startsWith("x-"))) {
            delete node.$ref;
            return;
        }
        const isRemoteFullSchema = ref.path[0] === "paths" || ref.path[0] === "components";
        const hintPath = [...nodePath];
        if (ref.filename)
            hintPath.push(ref.filename);
        hintPath.push(...ref.path);
        const hint = isRemoteFullSchema ? "OpenAPI3" : getHint({ path: hintPath, external: !!ref.filename, startFrom: options.hint });
        if (isRemoteURL(ref.filename) || isFilepath(ref.filename)) {
            const nextURL = new URL(ref.filename.startsWith("//") ? `https://${ref.filename}` : ref.filename);
            refPromises.push(load(nextURL, { ...options, hint }));
            node.$ref = node.$ref.replace(ref.filename, nextURL.href);
            return;
        }
        if (options.rootURL.href === VIRTUAL_JSON_URL) {
            error(`Can’t resolve "${ref.filename}" from dynamic JSON. Either load this schema from a filepath/URL, or set the \`cwd\` option: \`openapiTS(schema, { cwd: '/path/to/cwd' })\`.`);
            process.exit(1);
        }
        const nextURL = new URL(ref.filename, schema instanceof URL ? schema : options.rootURL);
        const nextID = relativePath(schema instanceof URL ? schema : options.rootURL, nextURL);
        refPromises.push(load(nextURL, { ...options, hint }));
        node.$ref = node.$ref.replace(ref.filename, nextID);
    });
    await Promise.all(refPromises);
    if (schemaID === ".") {
        for (const subschemaID of Object.keys(options.schemas)) {
            walk(options.schemas[subschemaID].schema, (rawNode) => {
                if (!("$ref" in rawNode) || typeof rawNode.$ref !== "string")
                    return;
                const node = rawNode;
                const ref = parseRef(node.$ref);
                if (ref.filename === ".") {
                    if (subschemaID === "." || ref.path[0] === "external") {
                        node.$ref = makeTSIndex(ref.path);
                    }
                    else {
                        node.$ref = makeTSIndex(["external", subschemaID, ...ref.path]);
                    }
                }
                else {
                    const refURL = new URL(ref.filename, new URL(subschemaID, options.rootURL));
                    node.$ref = makeTSIndex(["external", relativePath(options.rootURL, refURL), ...ref.path]);
                }
            });
        }
    }
    for (const k of Object.keys(options.schemas)) {
        walk(options.schemas[k].schema, (rawNode, nodePath) => {
            if (typeof rawNode === "object" && "in" in rawNode) {
                const key = k === "." ? makeTSIndex(nodePath) : makeTSIndex(["external", k, ...nodePath]);
                options.parameters[key] = rawNode;
            }
        });
    }
    for (const k of Object.keys(options.schemas)) {
        if (JSON.stringify(options.schemas[k].schema).includes('"discriminator"')) {
            walk(options.schemas[k].schema, (rawNode, nodePath) => {
                const node = rawNode;
                if (!node.discriminator)
                    return;
                const discriminator = { ...node.discriminator };
                const oneOf = [];
                if (Array.isArray(node.oneOf)) {
                    for (const child of node.oneOf) {
                        if (!child || typeof child !== "object" || !("$ref" in child))
                            continue;
                        oneOf.push(child.$ref);
                    }
                }
                if (oneOf.length)
                    discriminator.oneOf = oneOf;
                options.discriminators[schemaID === "." ? makeTSIndex(nodePath) : makeTSIndex(["external", k, ...nodePath])] = discriminator;
            });
        }
    }
    return options.schemas;
}
function relativePath(src, dest) {
    const isSameOrigin = dest.protocol.startsWith("http") && src.protocol.startsWith("http") && dest.origin === src.origin;
    const isSameDisk = dest.protocol === "file:" && src.protocol === "file:";
    if (isSameOrigin || isSameDisk) {
        return path.posix.relative(path.posix.dirname(src.pathname), dest.pathname);
    }
    return dest.href;
}
export function getHint({ path, external, startFrom }) {
    if (startFrom && startFrom !== "OpenAPI3") {
        switch (startFrom) {
            case "OperationObject":
                return getHintFromOperationObject(path, external);
            case "RequestBodyObject":
                return getHintFromRequestBodyObject(path, external);
            case "ResponseObject":
                return getHintFromResponseObject(path, external);
            case "SchemaMap":
                return "SchemaObject";
            default:
                return startFrom;
        }
    }
    switch (path[0]) {
        case "paths": {
            if (EXT_RE.test(path[2])) {
                return "SchemaMap";
            }
            return getHintFromPathItemObject(path.slice(2), external);
        }
        case "components":
            return getHintFromComponentsObject(path.slice(1), external);
    }
    return undefined;
}
function getHintFromComponentsObject(path, external) {
    switch (path[0]) {
        case "schemas":
        case "headers":
            return getHintFromSchemaObject(path.slice(2), external);
        case "parameters":
            return getHintFromParameterObject(path.slice(2), external);
        case "responses":
            return getHintFromResponseObject(path.slice(2), external);
        case "requestBodies":
            return getHintFromRequestBodyObject(path.slice(2), external);
        case "pathItems":
            return getHintFromPathItemObject(path.slice(2), external);
    }
    return "SchemaObject";
}
function getHintFromMediaTypeObject(path, external) {
    switch (path[0]) {
        case "schema":
            return getHintFromSchemaObject(path.slice(1), external);
    }
    return "MediaTypeObject";
}
function getHintFromOperationObject(path, external) {
    switch (path[0]) {
        case "parameters":
            return "ParameterObject[]";
        case "requestBody":
            return getHintFromRequestBodyObject(path.slice(1), external);
        case "responses":
            return getHintFromResponseObject(path.slice(2), external);
    }
    return "OperationObject";
}
function getHintFromParameterObject(path, external) {
    switch (path[0]) {
        case "content":
            return getHintFromMediaTypeObject(path.slice(2), external);
        case "schema":
            return getHintFromSchemaObject(path.slice(1), external);
    }
    return "ParameterObject";
}
function getHintFromPathItemObject(path, external) {
    switch (path[0]) {
        case "parameters": {
            if (typeof path[1] === "number") {
                return "ParameterObject[]";
            }
            return getHintFromParameterObject(path.slice(1), external);
        }
        default:
            return getHintFromOperationObject(path.slice(1), external);
    }
}
function getHintFromRequestBodyObject(path, external) {
    switch (path[0]) {
        case "content":
            return getHintFromMediaTypeObject(path.slice(2), external);
    }
    return "RequestBodyObject";
}
function getHintFromResponseObject(path, external) {
    switch (path[0]) {
        case "headers":
            return getHintFromSchemaObject(path.slice(2), external);
        case "content":
            return getHintFromMediaTypeObject(path.slice(2), external);
    }
    return "ResponseObject";
}
function getHintFromSchemaObject(path, external) {
    switch (path[0]) {
        case "allOf":
        case "anyOf":
        case "oneOf":
            return "SchemaMap";
    }
    if (path.length >= 2 && external) {
        return "SchemaMap";
    }
    return "SchemaObject";
}
//# sourceMappingURL=load.js.map