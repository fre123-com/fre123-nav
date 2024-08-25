import transformComponentsObject from "./components-object.js";
import transformPathsObject from "./paths-object.js";
import transformSchemaObjectMap from "./schema-object-map.js";
import transformWebhooksObject from "./webhooks-object.js";
export function transformSchema(schema, ctx) {
    if (!schema)
        return {};
    const output = {};
    if (schema.paths)
        output.paths = transformPathsObject(schema.paths, ctx);
    else
        output.paths = "";
    if (schema.webhooks)
        output.webhooks = transformWebhooksObject(schema.webhooks, ctx);
    else
        output.webhooks = "";
    if (schema.components)
        output.components = transformComponentsObject(schema.components, ctx);
    else
        output.components = "";
    if (schema.$defs)
        output.$defs = transformSchemaObjectMap(schema.$defs, { path: "$defs/", ctx });
    else
        output.$defs = "";
    return output;
}
//# sourceMappingURL=index.js.map