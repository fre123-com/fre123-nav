import { hostname } from 'node:os';
import { resolve } from 'node:path';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { logger } from '@nuxt/kit';
import { execa } from 'execa';
import { checkPort, getPort } from 'get-port-please';
import which from 'which';
import { startSubprocess } from '@nuxt/devtools-kit';
import { L as LOG_PREFIX } from './module-main.mjs';
import 'pathe';
import 'vite';
import 'sirv';
import 'consola/utils';
import 'birpc';
import 'flatted';
import '../shared/devtools.fc176ede.mjs';
import '../dirs.mjs';
import 'node:url';
import 'is-installed-globally';
import '@antfu/utils';
import 'ohash';
import 'image-meta';
import 'perfect-debounce';
import 'fast-glob';
import 'nypm';
import 'magicast';
import 'magicast/helpers';
import 'node:module';
import 'pkg-types';
import 'semver';
import 'local-pkg';
import 'unimport';
import 'destr';
import 'scule';
import 'simple-git';

async function setup({ nuxt, options, openInEditorHooks, rpc }) {
  const installed = !!await which("code-server").catch(() => null);
  const vsOptions = options?.vscode || {};
  let port = vsOptions?.port || 3080;
  let url = `http://localhost:${port}`;
  let loaded = false;
  let promise = null;
  const mode = vsOptions?.mode || "local-serve";
  const computerHostName = vsOptions.tunnel?.name || hostname().split(".").join("");
  const root = nuxt.options.rootDir;
  const vscodeServerControllerFile = resolve(root, ".vscode", ".server-controller-port.log");
  openInEditorHooks.push(async (file) => {
    if (!existsSync(vscodeServerControllerFile))
      return false;
    try {
      const { port: port2 } = JSON.parse(await fs.readFile(vscodeServerControllerFile, "utf-8"));
      const url2 = `http://localhost:${port2}/open?path=${encodeURIComponent(file)}`;
      await fetch(url2);
      rpc.broadcast.navigateTo("/modules/custom-builtin-vscode");
      return true;
    } catch (e) {
      console.debug(`Failed to open file "${file}" in VS Code Server`);
      console.debug(e);
      return false;
    }
  });
  async function startCodeServer() {
    if (existsSync(vscodeServerControllerFile))
      await fs.rm(vscodeServerControllerFile, { force: true });
    if (vsOptions?.reuseExistingServer && !await checkPort(port)) {
      loaded = true;
      url = `http://localhost:${port}/?folder=${encodeURIComponent(root)}`;
      logger.info(LOG_PREFIX, `Existing VS Code Server found at port ${port}...`);
      return;
    }
    port = await getPort({ port });
    url = `http://localhost:${port}/?folder=${encodeURIComponent(root)}`;
    logger.info(LOG_PREFIX, `Starting VS Code Server at ${url} ...`);
    execa("code-server", [
      "serve-local",
      "--accept-server-license-terms",
      "--install-extension",
      "antfu.vscode-server-controller"
    ], { stderr: "inherit", stdout: "ignore", reject: false });
    startSubprocess(
      {
        command: "code-server",
        args: [
          "serve-local",
          "--accept-server-license-terms",
          "--without-connection-token",
          `--port=${port}`
        ]
      },
      {
        id: "devtools:vscode",
        name: "VS Code Server",
        icon: "logos-visual-studio-code"
      },
      nuxt
    );
    for (let i = 0; i < 100; i++) {
      if (await fetch(url).then((r) => r.ok).catch(() => false))
        break;
      await new Promise((resolve2) => setTimeout(resolve2, 500));
    }
    await new Promise((resolve2) => setTimeout(resolve2, 2e3));
    loaded = true;
  }
  async function startCodeTunnel() {
    const { stdout: currentDir } = await execa("pwd");
    url = `https://vscode.dev/tunnel/${computerHostName}${currentDir}`;
    logger.info(LOG_PREFIX, `Starting VS Code tunnel at ${url} ...`);
    const command = execa("code", [
      "tunnel",
      "--accept-server-license-terms",
      "--name",
      `${computerHostName}`
    ]);
    command.stderr?.pipe(process.stderr);
    command.stdout?.pipe(process.stdout);
    nuxt.hook("close", () => {
      command.kill();
    });
    for (let i = 0; i < 100; i++) {
      if (await fetch(url).then((r) => r.ok).catch(() => false))
        break;
      await new Promise((resolve2) => setTimeout(resolve2, 500));
    }
    await new Promise((resolve2) => setTimeout(resolve2, 2e3));
    loaded = true;
  }
  async function start() {
    if (mode === "tunnel")
      await startCodeTunnel();
    else
      await startCodeServer();
  }
  nuxt.hook("devtools:customTabs", (tabs) => {
    tabs.push({
      name: "builtin-vscode",
      title: "VS Code",
      icon: "bxl-visual-studio",
      category: "modules",
      requireAuth: true,
      view: !installed ? {
        type: "launch",
        title: "Install VS Code Server",
        description: `It seems you don't have code-server installed.

Learn more about it with <a href="https://code.visualstudio.com/blogs/2022/07/07/vscode-server" target="_blank">this guide</a>.
Once installed, restart Nuxt and visit this tab again.`,
        actions: []
      } : !loaded ? {
        type: "launch",
        description: "Launch VS Code right in the devtools!",
        actions: [{
          label: promise ? "Starting..." : "Launch",
          pending: !!promise,
          handle: () => {
            promise = promise || start();
            return promise;
          }
        }]
      } : {
        type: "iframe",
        src: url
      }
    });
  });
  if (vsOptions?.startOnBoot)
    promise = promise || start();
}

export { setup };
