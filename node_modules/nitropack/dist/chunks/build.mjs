import { defineCommand } from 'citty';
import { resolve } from 'pathe';
import { a as createNitro, p as prepare, c as copyPublicAssets, b as build$1 } from '../shared/nitro.4ea992bc.mjs';
import { p as prerender } from '../shared/nitro.0a84349b.mjs';
import { c as commonArgs } from '../shared/nitro.1d09f0ca.mjs';
import 'node:fs';
import 'pathe/utils';
import 'rollup';
import 'fs-extra';
import 'defu';
import 'chokidar';
import 'knitwork';
import 'perfect-debounce';
import 'globby';
import 'mlly';
import '../shared/nitro.fbb67b25.mjs';
import 'pretty-bytes';
import 'gzip-size';
import 'chalk';
import 'std-env';
import 'node:url';
import 'node:module';
import '@rollup/plugin-commonjs';
import '@rollup/plugin-alias';
import '@rollup/plugin-json';
import '@rollup/plugin-inject';
import '@rollup/plugin-node-resolve';
import 'rollup-plugin-visualizer';
import 'unenv';
import 'unimport/unplugin';
import 'ohash';
import '@rollup/plugin-replace';
import 'node:crypto';
import '@rollup/plugin-wasm';
import 'magic-string';
import 'estree-walker';
import 'node:os';
import 'pkg-types';
import '@vercel/nft';
import 'semver';
import 'consola';
import 'etag';
import 'mime';
import 'unstorage';
import 'esbuild';
import '@rollup/pluginutils';
import 'node:zlib';
import 'node:fs/promises';
import 'hookable';
import 'unimport';
import 'c12';
import 'klona/full';
import 'scule';
import 'escape-string-regexp';
import 'ufo';
import 'jiti';
import 'dot-prop';
import 'node:path';
import 'archiver';
import 'radix3';

const build = defineCommand({
  meta: {
    name: "build",
    description: "Build nitro project for production"
  },
  args: {
    ...commonArgs,
    minify: {
      type: "boolean",
      description: "Minify the output (overides preset defaults you can also use `--no-minify` to disable)."
    },
    preset: {
      type: "string",
      description: "The build preset to use (you can also use `NITRO_PRESET` environment variable)."
    }
  },
  async run({ args }) {
    const rootDir = resolve(args.dir || args._dir || ".");
    const nitro = await createNitro({
      rootDir,
      dev: false,
      minify: args.minify,
      preset: args.preset
    });
    await prepare(nitro);
    await copyPublicAssets(nitro);
    await prerender(nitro);
    await build$1(nitro);
    await nitro.close();
  }
});

export { build as default };
