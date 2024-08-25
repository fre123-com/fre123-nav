import { escObjKey, indent, tsOptionalProperty, tsReadonly } from "../utils.js";
import transformParameterObject from "./parameter-object.js";
export default function transformParameterObjectArray(parameterObjectArray, { path, ctx }) {
    const output = [];
    const parameters = Array.isArray(parameterObjectArray) ? parameterObjectArray.map((p) => [p.name, p]) : Object.entries(parameterObjectArray);
    for (const [id, param] of parameters) {
        let key = escObjKey(id);
        if (ctx.immutableTypes)
            key = tsReadonly(key);
        const node = "$ref" in param ? ctx.parameters[param.$ref] : param;
        if (!node)
            continue;
        if (node.in !== "path" && !node.required)
            key = tsOptionalProperty(key);
        output.push(indent(`${key}: ${transformParameterObject(node, {
            path: `${path}/${node.name}`,
            ctx: { ...ctx, indentLv: ctx.indentLv + 1 },
        })};`, ctx.indentLv));
    }
    return output.join("\n");
}
//# sourceMappingURL=parameter-object-array.js.map