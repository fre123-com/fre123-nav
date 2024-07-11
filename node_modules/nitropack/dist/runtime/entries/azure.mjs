import "#internal/nitro/virtual/polyfill";
import { parseURL } from "ufo";
import { nitroApp } from "../app.mjs";
import { getAzureParsedCookiesFromHeaders } from "../utils.azure.mjs";
import { normalizeLambdaOutgoingHeaders } from "../utils.lambda.mjs";
export async function handle(context, req) {
  let url;
  if (req.headers["x-ms-original-url"]) {
    const parsedURL = parseURL(req.headers["x-ms-original-url"]);
    url = parsedURL.pathname + parsedURL.search;
  } else {
    url = "/api/" + (req.params.url || "");
  }
  const { body, status, statusText, headers } = await nitroApp.localCall({
    url,
    headers: req.headers,
    method: req.method,
    // https://github.com/Azure/azure-functions-host/issues/293
    body: req.rawBody
  });
  context.res = {
    status,
    // cookies https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=typescript%2Cwindows%2Cazure-cli&pivots=nodejs-model-v4#http-response
    cookies: getAzureParsedCookiesFromHeaders(headers),
    headers: normalizeLambdaOutgoingHeaders(headers, true),
    body: body ? body.toString() : statusText
  };
}
