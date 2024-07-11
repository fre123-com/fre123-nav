import transformSchemaObject from "./schema-object.js";
export default function transformMediaTypeObject(mediaTypeObject, { path, ctx }) {
    if (!mediaTypeObject.schema)
        return "unknown";
    return transformSchemaObject(mediaTypeObject.schema, { path, ctx });
}
//# sourceMappingURL=media-type-object.js.map