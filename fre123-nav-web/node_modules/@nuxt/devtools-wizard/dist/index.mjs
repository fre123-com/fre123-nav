import { consola } from 'consola';
import { readPackageJSON } from 'pkg-types';
import { colors } from 'consola/utils';
import semver from 'semver';

const name = "@nuxt/devtools-wizard";
const version = "1.0.8";

async function getNuxtVersion(path) {
  try {
    const pkg = await readPackageJSON("nuxt", { url: path });
    if (!pkg.version)
      consola.warn("Cannot find any installed nuxt versions in ", path);
    return pkg.version || null;
  } catch {
    return null;
  }
}
async function run() {
  const args = process.argv.slice(2);
  const command = args[0];
  const cwd = process.cwd();
  consola.log("");
  consola.log(colors.bold(colors.green(" Nuxt ")));
  consola.log(`${colors.inverse(colors.bold(colors.green(" DevTools ")))} ${colors.green(`v${version}`)}`);
  consola.log(`
${colors.gray("Learn more at https://devtools.nuxt.com\n")}`);
  if (name.endsWith("-edge"))
    throw new Error("Edge release of Nuxt DevTools requires to be installed locally. Learn more at https://github.com/nuxt/devtools/#edge-release-channel");
  const nuxtVersion = await getNuxtVersion(cwd);
  if (!nuxtVersion) {
    consola.error("Unable to find any installed nuxt version icurrent directory");
    process.exit(1);
  }
  const isDevToolsBuiltIn = semver.gte(nuxtVersion, "3.4.0");
  if (command === "enable") {
    consola.log(colors.green("Enabling Nuxt DevTools..."));
    if (isDevToolsBuiltIn)
      await import('./chunks/builtin.mjs').then((r) => r.enable(cwd));
    else
      await import('./chunks/global.mjs').then((r) => r.enable(cwd));
  } else if (command === "disable") {
    consola.log(colors.magenta("Disabling Nuxt DevTools..."));
    if (isDevToolsBuiltIn)
      await import('./chunks/builtin.mjs').then((r) => r.disable(cwd));
    else
      await import('./chunks/global.mjs').then((r) => r.disable(cwd, args));
  } else if (!command) {
    consola.log(`npx ${name} enable|disable`);
    process.exit(1);
  } else {
    consola.log(colors.red(`Unknown command "${command}"`));
    process.exit(1);
  }
}
run().catch((err) => {
  consola.error(err);
  process.exit(1);
});
