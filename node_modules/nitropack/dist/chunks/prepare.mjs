import { defineCommand } from 'citty';
import { resolve } from 'pathe';
import { a as createNitro, w as writeTypes } from '../shared/nitro.4ea992bc.mjs';
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

const prepare = defineCommand({
  meta: {
    name: "prepare",
    description: "Generate types for the project"
  },
  args: {
    ...commonArgs
  },
  async run({ args }) {
    const rootDir = resolve(args.dir || args._dir || ".");
    const nitro = await createNitro({ rootDir });
    await writeTypes(nitro);
  }
});

export { prepare as default };
