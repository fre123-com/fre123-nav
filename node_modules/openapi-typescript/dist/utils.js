import c from "ansi-colors";
import { isAbsolute } from "node:path";
import supportsColor from "supports-color";
import { fetch as unidiciFetch } from "undici";
if (!supportsColor.stdout || supportsColor.stdout.hasBasic === false)
    c.enabled = false;
export { c };
const COMMENT_RE = /\*\//g;
export const LB_RE = /\r?\n/g;
export const DOUBLE_QUOTE_RE = /(?<!\\)"/g;
const ESC_0_RE = /~0/g;
const ESC_1_RE = /~1/g;
const TILDE_RE = /~/g;
const FS_RE = /\//g;
export const TS_INDEX_RE = /\[("(\\"|[^"])+"|'(\\'|[^'])+')]/g;
const TS_UNION_INTERSECTION_RE = /[&|]/;
const TS_READONLY_RE = /^readonly\s+/;
const JS_OBJ_KEY = /^(\d+|[A-Za-z_$][A-Za-z0-9_$]*)$/;
export function walk(obj, cb, path = []) {
    if (!obj || typeof obj !== "object")
        return;
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++)
            walk(obj[i], cb, path.concat(i));
        return;
    }
    cb(obj, path);
    for (const k of Object.keys(obj))
        walk(obj[k], cb, path.concat(k));
}
export function getSchemaObjectComment(v, indentLv) {
    if (!v || typeof v !== "object")
        return;
    const output = [];
    if (v.title)
        output.push(v.title);
    if (v.summary)
        output.push(v.summary);
    if (v.format)
        output.push(`Format: ${v.format}`);
    if (v.deprecated)
        output.push("@deprecated");
    const supportedJsDocTags = ["description", "default", "example"];
    for (const field of supportedJsDocTags) {
        const allowEmptyString = field === "default" || field === "example";
        if (v[field] === undefined) {
            continue;
        }
        if (v[field] === "" && !allowEmptyString) {
            continue;
        }
        const serialized = typeof v[field] === "object" ? JSON.stringify(v[field], null, 2) : v[field];
        output.push(`@${field} ${serialized}`);
    }
    if ("const" in v)
        output.push("@constant");
    if (v.enum) {
        let type = "unknown";
        if (Array.isArray(v.type))
            type = v.type.join("|");
        else if (typeof v.type === "string")
            type = v.type;
        output.push(`@enum {${type}${v.nullable ? `|null` : ""}}`);
    }
    return output.length ? comment(output.join("\n"), indentLv) : undefined;
}
export function comment(text, indentLv) {
    const commentText = text.trim().replace(COMMENT_RE, "*\\/");
    if (!commentText.includes("\n"))
        return `/** ${commentText} */`;
    const star = indent(" *", indentLv ?? 0);
    const body = commentText.split(LB_RE).map((ln) => {
        ln = ln.trimEnd();
        return ln.length > 0 ? `${star} ${ln}` : star;
    });
    return ["/**", body.join("\n"), indent(" */", indentLv ?? 0)].join("\n");
}
export function parseRef(ref) {
    if (typeof ref !== "string")
        return { filename: ".", path: [] };
    if (ref.includes("#/")) {
        const [filename, pathStr] = ref.split("#");
        const parts = pathStr.split("/");
        const path = [];
        for (const part of parts) {
            if (!part || part === "properties")
                continue;
            path.push(decodeRef(part));
        }
        return { filename: filename || ".", path };
    }
    else if (ref.includes('["')) {
        const parts = ref.split('["');
        const path = [];
        for (const part of parts) {
            const sanitized = part.replace('"]', "").trim();
            if (!sanitized || sanitized === "properties")
                continue;
            path.push(sanitized);
        }
        return { filename: ".", path };
    }
    return { filename: ref, path: [] };
}
export function parseTSIndex(type) {
    const parts = [];
    const bracketI = type.indexOf("[");
    if (bracketI === -1)
        return [type];
    parts.push(type.substring(0, bracketI));
    const matches = type.match(TS_INDEX_RE);
    if (matches) {
        for (const m of matches)
            parts.push(m.substring('["'.length, m.length - '"]'.length));
    }
    return parts;
}
export function makeTSIndex(parts) {
    return `${parts[0]}[${parts.slice(1).map(escStr).join("][")}]`;
}
export function decodeRef(ref) {
    return ref.replace(ESC_0_RE, "~").replace(ESC_1_RE, "/").replace(DOUBLE_QUOTE_RE, '\\"');
}
export function encodeRef(ref) {
    return ref.replace(TILDE_RE, "~0").replace(FS_RE, "~1");
}
function parenthesise(type) {
    return TS_UNION_INTERSECTION_RE.test(type) || TS_READONLY_RE.test(type) ? `(${type})` : type;
}
export function tsArrayOf(type) {
    return `${parenthesise(type)}[]`;
}
export function tsIntersectionOf(...types) {
    types = types.filter((t) => t !== "unknown");
    if (types.length === 0)
        return "unknown";
    if (types.length === 1)
        return String(types[0]);
    return types.map((t) => parenthesise(t)).join(" & ");
}
export function tsNonNullable(type) {
    return `NonNullable<${type}>`;
}
export function tsOneOf(...types) {
    if (types.length === 1) {
        return types[0];
    }
    else if (types.length > 5) {
        return tsUnionOf(...types);
    }
    return `OneOf<[${types.join(", ")}]>`;
}
export function tsPick(root, keys) {
    return `Pick<${root}, ${tsUnionOf(...keys.map(escStr))}>`;
}
export function tsOmit(root, keys) {
    return `Omit<${root}, ${tsUnionOf(...keys.map(escStr))}>`;
}
export function tsWithRequired(root, keys) {
    return `WithRequired<${root}, ${tsUnionOf(...keys.map(escStr))}>`;
}
export function tsOptionalProperty(key) {
    return `${key}?`;
}
export function tsReadonly(type) {
    return `readonly ${type}`;
}
export function tsTupleOf(...types) {
    return `[${types.join(", ")}]`;
}
export function tsUnionOf(...types) {
    if (types.length === 0)
        return "never";
    const members = new Set();
    for (const t of types) {
        if (t === "unknown")
            return "unknown";
        members.add(String(t));
    }
    if (members.has("never") && members.size === 1)
        return "never";
    members.delete("never");
    const memberArr = Array.from(members);
    if (members.size === 1)
        return memberArr[0];
    let out = "";
    for (let i = 0; i < memberArr.length; i++) {
        const t = memberArr[i];
        out += parenthesise(t);
        if (i !== memberArr.length - 1)
            out += " | ";
    }
    return out;
}
export function escStr(input) {
    if (typeof input !== "string")
        return JSON.stringify(input);
    return `"${input.replace(LB_RE, "").replace(DOUBLE_QUOTE_RE, '\\"')}"`;
}
export function escObjKey(input) {
    return JS_OBJ_KEY.test(input) ? input : escStr(input);
}
export function indent(input, level) {
    if (level > 0) {
        return "  ".repeat(level).concat(input);
    }
    else {
        return input;
    }
}
export function getEntries(obj, alphabetize, excludeDeprecated) {
    let entries = Object.entries(obj);
    if (alphabetize)
        entries.sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true }));
    if (excludeDeprecated)
        entries = entries.filter(([, v]) => !(v && typeof v === "object" && "deprecated" in v && v.deprecated));
    return entries;
}
export function error(msg) {
    console.error(c.red(` ✘  ${msg}`));
}
export function isRemoteURL(url) {
    return url.startsWith("https://") || url.startsWith("//") || url.startsWith("http://");
}
export function isFilepath(url) {
    return url.startsWith("file://") || isAbsolute(url);
}
export function getDefaultFetch() {
    const globalFetch = globalThis.fetch;
    if (typeof globalFetch === "undefined") {
        return unidiciFetch;
    }
    return globalFetch;
}
//# sourceMappingURL=utils.js.map