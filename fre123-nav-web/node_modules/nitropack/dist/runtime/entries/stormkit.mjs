import "#internal/nitro/virtual/polyfill";
import { nitroApp } from "../app.mjs";
import { normalizeLambdaOutgoingBody } from "#internal/nitro/utils.lambda";
export const handler = async function(event, context) {
  const response = await nitroApp.localCall({
    event,
    url: event.url,
    context,
    headers: event.headers,
    method: event.method || "GET",
    query: event.query,
    body: event.body
  });
  const awsBody = await normalizeLambdaOutgoingBody(
    response.body,
    response.headers
  );
  return {
    statusCode: response.status,
    headers: normalizeOutgoingHeaders(response.headers),
    [awsBody.type === "text" ? "body" : "buffer"]: awsBody.body
  };
};
function normalizeOutgoingHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers).map(([k, v]) => [
      k,
      Array.isArray(v) ? v.join(",") : String(v)
    ])
  );
}
