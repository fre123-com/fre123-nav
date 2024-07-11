import "#internal/nitro/virtual/polyfill";
import { toNodeListener } from "h3";
import { parseQuery } from "ufo";
import { nitroApp } from "../app.mjs";
const handler = toNodeListener(nitroApp.h3App);
export default (function(req, res) {
  const query = req.headers["x-now-route-matches"];
  if (query) {
    const { url } = parseQuery(query);
    if (url) {
      req.url = url;
    }
  }
  return handler(req, res);
});
