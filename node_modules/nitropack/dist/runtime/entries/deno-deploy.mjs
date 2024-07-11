import "#internal/nitro/virtual/polyfill";
import { nitroApp } from "../app.mjs";
Deno.serve((request) => {
  return handleRequest(request);
});
async function handleRequest(request) {
  const url = new URL(request.url);
  let body;
  if (request.body) {
    body = await request.arrayBuffer();
  }
  return nitroApp.localFetch(url.pathname + url.search, {
    host: url.hostname,
    protocol: url.protocol,
    headers: request.headers,
    method: request.method,
    redirect: request.redirect,
    body
  });
}
