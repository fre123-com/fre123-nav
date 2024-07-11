import { escObjKey, getEntries, getSchemaObjectComment, indent, tsReadonly } from "../utils.js";
import transformParameterObject from "./parameter-object.js";
import transformPathItemObject from "./path-item-object.js";
import transformSchemaObject from "./schema-object.js";
export default function transformSchemaObjectMap(schemaObjMap, { path, ctx }) {
    if (("type" in schemaObjMap && typeof schemaObjMap.type === "string") ||
        ("allOf" in schemaObjMap && Array.isArray(schemaObjMap.allOf)) ||
        ("oneOf" in schemaObjMap && Array.isArray(schemaObjMap.oneOf)) ||
        ("anyOf" in schemaObjMap && Array.isArray(schemaObjMap.anyOf))) {
        return transformSchemaObject(schemaObjMap, { path, ctx });
    }
    let { indentLv } = ctx;
    const output = ["{"];
    indentLv++;
    outer: for (const [name, schemaObject] of getEntries(schemaObjMap, ctx.alphabetize, ctx.excludeDeprecated)) {
        if (!schemaObject || typeof schemaObject !== "object")
            continue;
        const c = getSchemaObjectComment(schemaObject, indentLv);
        if (c)
            output.push(indent(c, indentLv));
        let key = escObjKey(name);
        if (ctx.immutableTypes || schemaObject.readOnly)
            key = tsReadonly(key);
        if (!("type" in schemaObject) && !("$ref" in schemaObject)) {
            for (const method of ["get", "put", "post", "delete", "options", "head", "patch", "trace"]) {
                if (method in schemaObject) {
                    output.push(indent(`${key}: ${transformPathItemObject(schemaObject, { path: `${path}${name}`, ctx: { ...ctx, indentLv } })};`, indentLv));
                    continue outer;
                }
            }
        }
        if ("in" in schemaObject) {
            output.push(indent(`${key}: ${transformParameterObject(schemaObject, { path: `${path}${name}`, ctx: { ...ctx, indentLv } })};`, indentLv));
            continue;
        }
        output.push(indent(`${key}: ${transformSchemaObject(schemaObject, { path: `${path}${name}`, ctx: { ...ctx, indentLv } })};`, indentLv));
    }
    indentLv--;
    output.push(indent("}", indentLv));
    return output.join("\n");
}
//# sourceMappingURL=schema-object-map.js.map