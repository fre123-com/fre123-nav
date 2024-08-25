import { Module } from 'node:module';

const NodeBuiltinModules = [].concat(
  Module.builtinModules,
  [
    "assert/strict",
    "fs/promises",
    "path/posix",
    "path/win32",
    "stream/consumers",
    "stream/promises",
    "stream/web",
    "timers/promises",
    "util/types"
  ]
);
function mapArrToVal(val, arr) {
  return Object.fromEntries(arr.map((c) => [c, val]));
}

const node = {
  alias: {
    "node-fetch": "unenv/runtime/npm/node-fetch",
    "cross-fetch": "unenv/runtime/npm/cross-fetch",
    "cross-fetch/polyfill": "unenv/runtime/mock/empty",
    "isomorphic-fetch": "unenv/runtime/mock/empty"
  },
  polyfill: ["node-fetch-native/polyfill"],
  external: [...NodeBuiltinModules]
};

const nodeless = {
  alias: {
    // Generic mock for built-ins
    ...mapArrToVal("unenv/runtime/mock/proxy-cjs", NodeBuiltinModules),
    // Built-ins implemented by unenv
    "buffer/index.js": "buffer",
    ...Object.fromEntries(
      [
        "async_hooks",
        "buffer",
        "crypto",
        "events",
        "fs",
        "fs/promises",
        "http",
        "net",
        "path",
        "process",
        "stream",
        "stream/promises",
        "stream/consumers",
        "stream/web",
        "string_decoder",
        "url",
        "util",
        "util/types"
      ].map((m) => [m, `unenv/runtime/node/${m}/index`])
    ),
    // npm
    etag: "unenv/runtime/mock/noop",
    "mime-db": "unenv/runtime/npm/mime-db",
    mime: "unenv/runtime/npm/mime",
    "mime/lite": "unenv/runtime/npm/mime",
    _mime: "mime/lite.js",
    fsevents: "unenv/runtime/npm/fsevents",
    "consola/core": "consola/core",
    "node-fetch": "unenv/runtime/npm/node-fetch",
    "node-fetch-native": "unenv/runtime/npm/node-fetch",
    "node-fetch-native/polyfill": "unenv/runtime/mock/empty",
    "cross-fetch": "unenv/runtime/npm/cross-fetch",
    "cross-fetch/polyfill": "unenv/runtime/mock/empty",
    "isomorphic-fetch": "unenv/runtime/mock/empty",
    inherits: "unenv/runtime/npm/inherits"
  },
  inject: {
    process: "unenv/runtime/polyfill/process",
    Buffer: ["buffer", "Buffer"]
  },
  polyfill: ["unenv/runtime/polyfill/process"]
};
for (const m of NodeBuiltinModules) {
  nodeless.alias[`node:${m}`] = nodeless.alias[m];
}
const nodeless$1 = nodeless;

const denoNodeCompatModules = [
  "assert",
  "assert/strict",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "diagnostics_channel",
  "dns",
  "dns/promises",
  "domain",
  "events",
  "fs",
  "fs/promises",
  "http",
  "http2",
  "https",
  "module",
  "net",
  "os",
  "path",
  "path/posix",
  "path/win32",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "stream",
  "stream/consumers",
  "stream/promises",
  "stream/web",
  "string_decoder",
  "sys",
  "timers",
  "timers/promises",
  "tls",
  "tty",
  "url",
  "util",
  "util/types",
  "v8",
  "vm",
  "worker_threads",
  "zlib"
];
const denoPreset = {
  alias: {
    ...Object.fromEntries(denoNodeCompatModules.map((p) => [p, `node:${p}`])),
    ...Object.fromEntries(
      denoNodeCompatModules.map((p) => [`node:${p}`, `node:${p}`])
    )
  },
  // Deno's listed globals manually tested against deno@1.38.5
  // TODO: missing BroadcastChannel, PerformanceObserverEntryList, PerformanceResourceTiming
  // TODO: global and process
  inject: {
    setImmediate: "node:timers",
    clearImmediate: "node:timers",
    Buffer: "node:buffer",
    PerformanceObserver: "node:perf_hooks"
  },
  polyfill: [
    "unenv/runtime/polyfill/global",
    "unenv/runtime/polyfill/deno-env"
  ],
  external: denoNodeCompatModules.map((p) => `node:${p}`)
};
const denoPreset$1 = denoPreset;

const cloudflareNodeCompatModules = [
  "assert",
  "async_hooks",
  "buffer",
  "crypto",
  "diagnostics_channel",
  "events",
  "path",
  "process",
  "stream",
  "string_decoder",
  "util"
];
const cloudflarePreset = {
  alias: {
    ...Object.fromEntries(
      cloudflareNodeCompatModules.map((p) => [p, `node:${p}`])
    ),
    ...Object.fromEntries(
      cloudflareNodeCompatModules.map((p) => [`node:${p}`, `node:${p}`])
    )
  },
  inject: {},
  polyfill: [],
  external: cloudflareNodeCompatModules.map((p) => `node:${p}`)
};
const cloudflarePreset$1 = cloudflarePreset;

const vercelNodeCompatModules = [
  "async_hooks",
  "events",
  "buffer",
  "assert",
  "util"
];
const vercelPreset = {
  alias: {
    ...Object.fromEntries(vercelNodeCompatModules.map((p) => [p, `node:${p}`])),
    ...Object.fromEntries(
      vercelNodeCompatModules.map((p) => [`node:${p}`, `node:${p}`])
    )
  },
  inject: {},
  polyfill: [],
  external: vercelNodeCompatModules.map((p) => `node:${p}`)
};
const vercelPreset$1 = vercelPreset;

function env(...presets) {
  const _env = {
    alias: {},
    inject: {},
    polyfill: [],
    external: []
  };
  for (const preset of presets) {
    if (preset.alias) {
      const aliases = Object.keys(preset.alias).sort(
        (a, b) => b.split("/").length - a.split("/").length || b.length - a.length
      );
      for (const from of aliases) {
        _env.alias[from] = preset.alias[from];
      }
    }
    if (preset.inject) {
      for (const global in preset.inject) {
        if (Array.isArray(preset.inject[global])) {
          const [id, ...path] = preset.inject[global];
          _env.inject[global] = [id, ...path];
        } else {
          _env.inject[global] = preset.inject[global];
        }
      }
    }
    if (preset.polyfill) {
      _env.polyfill.push(...preset.polyfill.filter(Boolean));
    }
    if (preset.external) {
      _env.external.push(...preset.external);
    }
  }
  return _env;
}

export { NodeBuiltinModules, cloudflarePreset$1 as cloudflare, denoPreset$1 as deno, env, mapArrToVal, node, nodeless$1 as nodeless, vercelPreset$1 as vercel };
