import { escStr, getSchemaObjectComment, indent } from "../utils.js";
import transformOperationObject from "./operation-object.js";
export default function transformPathItemObject(pathItem, { path, ctx }) {
    let { indentLv } = ctx;
    const output = [];
    output.push("{");
    indentLv++;
    for (const method of ["get", "put", "post", "delete", "options", "head", "patch", "trace"]) {
        const operationObject = pathItem[method];
        if (!operationObject)
            continue;
        const c = getSchemaObjectComment(operationObject, indentLv);
        if (c)
            output.push(indent(c, indentLv));
        const keyedParameters = {};
        if (!("$ref" in operationObject)) {
            for (const parameter of [...(pathItem.parameters ?? []), ...(operationObject.parameters ?? [])]) {
                keyedParameters["$ref" in parameter ? parameter.$ref : parameter.name] = parameter;
            }
        }
        if ("$ref" in operationObject) {
            output.push(indent(`${method}: ${operationObject.$ref}`, indentLv));
        }
        else if (operationObject.operationId) {
            const operationType = transformOperationObject({ ...operationObject, parameters: Object.values(keyedParameters) }, { path, ctx: { ...ctx, indentLv: 1 } });
            ctx.operations[operationObject.operationId] = {
                operationType,
                comment: getSchemaObjectComment(operationObject, 1),
            };
            output.push(indent(`${method}: operations[${escStr(operationObject.operationId)}];`, indentLv));
        }
        else {
            const operationType = transformOperationObject({ ...operationObject, parameters: Object.values(keyedParameters) }, { path, ctx: { ...ctx, indentLv } });
            output.push(indent(`${method}: ${operationType};`, indentLv));
        }
    }
    if (pathItem.parameters?.length) {
        output.push(indent(transformOperationObject({ parameters: pathItem.parameters }, { path, ctx, wrapObject: false }).trim(), indentLv));
    }
    indentLv--;
    output.push(indent("}", indentLv));
    return output.join("\n");
}
//# sourceMappingURL=path-item-object.js.map