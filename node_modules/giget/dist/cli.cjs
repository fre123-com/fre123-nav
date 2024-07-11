#!/usr/bin/env node
'use strict';

const node_path = require('node:path');
const citty = require('citty');
const consola = require('consola');
const index = require('./index.cjs');
require('node:fs/promises');
require('node:fs');
require('tar');
require('pathe');
require('defu');
require('nypm');
require('node:stream');
require('node:child_process');
require('node:os');
require('node:util');
require('node-fetch-native/proxy');

const name = "giget";
const version = "1.2.1";
const description = "Download templates and git repositories with pleasure!";
const repository = "unjs/giget";
const license = "MIT";
const sideEffects = false;
const type = "module";
const exports$1 = {
	".": {
		"import": {
			types: "./dist/index.d.mts",
			"default": "./dist/index.mjs"
		},
		require: {
			types: "./dist/index.d.cts",
			"default": "./dist/index.cjs"
		}
	}
};
const main = "./dist/index.cjs";
const module$1 = "./dist/index.mjs";
const types = "./dist/index.d.ts";
const bin = {
	giget: "./dist/cli.mjs"
};
const files = [
	"dist"
];
const scripts = {
	build: "unbuild",
	dev: "vitest dev",
	giget: "jiti ./src/cli.ts",
	lint: "eslint --ext .ts,.js,.mjs,.cjs . && prettier -c src test",
	"lint:fix": "eslint --ext .ts,.js,.mjs,.cjs . --fix && prettier -w src test",
	prepack: "unbuild",
	play: "pnpm giget --force-clean --verbose unjs .tmp/clone",
	release: "pnpm test && changelogen --release && npm publish && git push --follow-tags",
	test: "pnpm lint && vitest run --coverage"
};
const dependencies = {
	citty: "^0.1.5",
	consola: "^3.2.3",
	defu: "^6.1.3",
	"node-fetch-native": "^1.6.1",
	nypm: "^0.3.3",
	ohash: "^1.1.3",
	pathe: "^1.1.1",
	tar: "^6.2.0"
};
const devDependencies = {
	"@types/node": "^20.10.5",
	"@types/tar": "^6.1.10",
	"@vitest/coverage-v8": "^1.1.0",
	changelogen: "^0.5.5",
	eslint: "^8.56.0",
	"eslint-config-unjs": "^0.2.1",
	jiti: "^1.21.0",
	prettier: "^3.1.1",
	typescript: "^5.3.3",
	unbuild: "^2.0.0",
	vitest: "^1.1.0"
};
const packageManager = "pnpm@8.12.1";
const pkg = {
	name: name,
	version: version,
	description: description,
	repository: repository,
	license: license,
	sideEffects: sideEffects,
	type: type,
	exports: exports$1,
	main: main,
	module: module$1,
	types: types,
	bin: bin,
	files: files,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies,
	packageManager: packageManager
};

const mainCommand = citty.defineCommand({
  meta: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description
  },
  args: {
    // TODO: Make it `-t` in the next major version
    template: {
      type: "positional",
      description: "Template name or a a URI describing provider, repository, subdir, and branch/ref"
    },
    dir: {
      type: "positional",
      description: "A relative or absolute path where to extract the template",
      required: false
    },
    auth: {
      type: "string",
      description: "Custom Authorization token to use for downloading template. (Can be overriden with `GIGET_AUTH` environment variable)"
    },
    cwd: {
      type: "string",
      description: "Set current working directory to resolve dirs relative to it"
    },
    force: {
      type: "boolean",
      description: "Clone to existing directory even if exists"
    },
    forceClean: {
      type: "boolean",
      description: "Remove any existing directory or file recusively before cloning"
    },
    offline: {
      type: "boolean",
      description: "o not attempt to download and use cached version"
    },
    preferOffline: {
      type: "boolean",
      description: "Use cache if exists otherwise try to download"
    },
    shell: {
      type: "boolean",
      description: "Open a new shell with current working "
    },
    install: {
      type: "boolean",
      description: "Install dependencies after cloning"
    },
    verbose: {
      type: "boolean",
      description: "Show verbose debugging info"
    }
  },
  run: async ({ args }) => {
    if (args.verbose) {
      process.env.DEBUG = process.env.DEBUG || "true";
    }
    const r = await index.downloadTemplate(args.template, {
      dir: args.dir,
      force: args.force,
      forceClean: args.forceClean,
      offline: args.offline,
      preferOffline: args.preferOffline,
      auth: args.auth,
      install: args.install
    });
    const _from = r.name || r.url;
    const _to = node_path.relative(process.cwd(), r.dir) || "./";
    consola.consola.log(`\u2728 Successfully cloned \`${_from}\` to \`${_to}\`
`);
    if (args.shell) {
      index.startShell(r.dir);
    }
  }
});
citty.runMain(mainCommand);
