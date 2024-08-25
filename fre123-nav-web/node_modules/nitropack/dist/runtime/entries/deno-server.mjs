import "#internal/nitro/virtual/polyfill";
import destr from "destr";
import { nitroApp } from "../app.mjs";
import { useRuntimeConfig } from "#internal/nitro";
if (Deno.env.get("DEBUG")) {
  addEventListener(
    "unhandledrejection",
    (event) => console.error("[nitro] [dev] [unhandledRejection]", event.reason)
  );
  addEventListener(
    "error",
    (event) => console.error("[nitro] [dev] [uncaughtException]", event.error)
  );
} else {
  addEventListener(
    "unhandledrejection",
    (err) => console.error("[nitro] [production] [unhandledRejection] " + err)
  );
  addEventListener(
    "error",
    (event) => console.error("[nitro] [production] [uncaughtException] " + event.error)
  );
}
Deno.serve(
  {
    // @ts-expect-error unknown global Deno
    key: Deno.env.get("NITRO_SSL_KEY"),
    // @ts-expect-error unknown global Deno
    cert: Deno.env.get("NITRO_SSL_CERT"),
    // @ts-expect-error unknown global Deno
    port: destr(Deno.env.get("NITRO_PORT") || Deno.env.get("PORT")) || 3e3,
    // @ts-expect-error unknown global Deno
    hostname: Deno.env.get("NITRO_HOST") || Deno.env.get("HOST"),
    onListen: (opts) => {
      const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
      const url = `${opts.hostname}:${opts.port}${baseURL}`;
      console.log(`Listening ${url}`);
    }
  },
  handler
);
async function handler(request) {
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
export default {};
