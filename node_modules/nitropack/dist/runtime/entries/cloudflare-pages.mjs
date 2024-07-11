import "#internal/nitro/virtual/polyfill";
import { requestHasBody } from "#internal/nitro/utils";
import { nitroApp } from "#internal/nitro/app";
import { isPublicAssetURL } from "#internal/nitro/virtual/public-assets";
export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    if (isPublicAssetURL(url.pathname)) {
      return env.ASSETS.fetch(request);
    }
    let body;
    if (requestHasBody(request)) {
      body = Buffer.from(await request.arrayBuffer());
    }
    globalThis.__env__ = env;
    return nitroApp.localFetch(url.pathname + url.search, {
      context: {
        cf: request.cf,
        waitUntil: (promise) => context.waitUntil(promise),
        cloudflare: {
          request,
          env,
          context
        }
      },
      host: url.hostname,
      protocol: url.protocol,
      method: request.method,
      headers: request.headers,
      body
    });
  }
};
