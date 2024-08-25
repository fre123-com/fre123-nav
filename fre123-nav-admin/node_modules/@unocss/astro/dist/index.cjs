'use strict';

const node_path = require('node:path');
const node_url = require('node:url');
const VitePlugin = require('@unocss/vite');
const vite = require('vite');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const VitePlugin__default = /*#__PURE__*/_interopDefaultCompat(VitePlugin);

const RESOLVED_ID_RE = /[\/\\]__uno(?:_(.*?))?\.css$/;

const UNO_INJECT_ID = "uno-astro";
function AstroVitePlugin(options) {
  const { injects } = options;
  let root;
  return {
    name: "unocss:astro",
    enforce: "pre",
    configResolved(config) {
      root = config.root;
    },
    async resolveId(id, importer) {
      if (RESOLVED_ID_RE.test(id)) {
        return this.resolve(vite.normalizePath(node_path.join(root, id)), importer, { skipSelf: true });
      }
      if (id === UNO_INJECT_ID)
        return id;
    },
    load(id) {
      if (id.endsWith(UNO_INJECT_ID))
        return injects.join("\n");
    }
  };
}
function UnoCSSAstroIntegration(options = {}, defaults) {
  const {
    injectEntry = true,
    injectReset = false,
    injectExtra = []
  } = options;
  return {
    name: "unocss",
    hooks: {
      "astro:config:setup": async ({ config, updateConfig, injectScript }) => {
        var _a;
        const source = node_path.resolve(node_url.fileURLToPath(config.srcDir), "components/**/*").replace(/\\/g, "/");
        options.content || (options.content = {});
        (_a = options.content).filesystem || (_a.filesystem = []);
        options.content.filesystem.push(source);
        const injects = [];
        if (injectReset) {
          const resetPath = typeof injectReset === "string" ? injectReset : "@unocss/reset/tailwind.css";
          injects.push(`import ${JSON.stringify(resetPath)}`);
        }
        if (injectEntry) {
          injects.push(typeof injectEntry === "string" ? injectEntry : 'import "uno.css"');
        }
        if (injectExtra.length > 0)
          injects.push(...injectExtra);
        updateConfig({
          vite: {
            plugins: [AstroVitePlugin({
              injects
            }), ...VitePlugin__default(options, defaults)]
          }
        });
        if (injects?.length)
          injectScript("page-ssr", `import ${JSON.stringify(UNO_INJECT_ID)}`);
      }
    }
  };
}

module.exports = UnoCSSAstroIntegration;
