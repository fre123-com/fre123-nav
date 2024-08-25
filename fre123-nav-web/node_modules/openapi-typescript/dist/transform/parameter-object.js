import transformSchemaObject from "./schema-object.js";
export default function transformParameterObject(parameterObject, { path, ctx }) {
    return parameterObject.schema ? transformSchemaObject(parameterObject.schema, { path, ctx }) : "string";
}
//# sourceMappingURL=parameter-object.js.map