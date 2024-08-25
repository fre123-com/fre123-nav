var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
import { eventHandler } from "h3";
export default eventHandler((event) => {
  const title = "Nitro Swagger UI";
  const CDN_BASE = "https://cdn.jsdelivr.net/npm/swagger-ui-dist@^4";
  return html(_a || (_a = __template(['<!doctype html>\n    <html lang="en">\n      <head>\n        <meta charset="utf-8" />\n        <meta name="viewport" content="width=device-width, initial-scale=1" />\n        <meta name="description" content="', '" />\n        <title>', '</title>\n        <link rel="stylesheet" href="', '/swagger-ui.css" />\n      </head>\n      <body>\n        <div id="swagger-ui"></div>\n        <script src="', '/swagger-ui-bundle.js" crossorigin><\/script>\n        <script\n          src="', '/swagger-ui-standalone-preset.js"\n          crossorigin\n        ><\/script>\n        <script>\n          window.onload = () => {\n            window.ui = SwaggerUIBundle({\n              url: "./openapi.json",\n              dom_id: "#swagger-ui",\n              presets: [\n                SwaggerUIBundle.presets.apis,\n                SwaggerUIStandalonePreset,\n              ],\n              layout2: "StandaloneLayout",\n            });\n          };\n        <\/script>\n      </body>\n    </html> '])), title, title, CDN_BASE, CDN_BASE, CDN_BASE);
});
function html(str, ...args) {
  return String.raw(str, ...args);
}
