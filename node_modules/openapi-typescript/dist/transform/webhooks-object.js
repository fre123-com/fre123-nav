import { escStr, getEntries, indent } from "../utils.js";
import transformPathItemObject from "./path-item-object.js";
export default function transformWebhooksObject(webhooksObject, ctx) {
    let { indentLv } = ctx;
    const output = ["{"];
    indentLv++;
    for (const [name, pathItemObject] of getEntries(webhooksObject, ctx.alphabetize, ctx.excludeDeprecated)) {
        output.push(indent(`${escStr(name)}: ${transformPathItemObject(pathItemObject, {
            path: `#/webhooks/${name}`,
            ctx: { ...ctx, indentLv },
        })};`, indentLv));
    }
    indentLv--;
    output.push(indent("}", indentLv));
    return output.join("\n");
}
//# sourceMappingURL=webhooks-object.js.map