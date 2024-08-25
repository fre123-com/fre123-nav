import "#internal/nitro/virtual/polyfill";
import { nitroApp } from "../app.mjs";
const server = Bun.serve({
  port: process.env.NITRO_PORT || process.env.PORT || 3e3,
  async fetch(request) {
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
});
console.log(`Listening on http://localhost:${server.port}...`);
