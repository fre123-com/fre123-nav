import { addDependency } from 'nypm';
import { resolvePackageJSON } from 'pkg-types';
import { useNuxt, logger } from '@nuxt/kit';
import { isCI, provider } from 'std-env';

const isStackblitz = provider === "stackblitz";
async function promptToInstall(name, installCommand, options) {
  if (await resolvePackageJSON(name, { url: options.searchPaths }).catch(() => null)) {
    return true;
  }
  logger.info(`Package ${name} is missing`);
  if (isCI) {
    return false;
  }
  if (options.prompt === true || options.prompt !== false && !isStackblitz) {
    const confirm = await logger.prompt(`Do you want to install ${name} package?`, {
      type: "confirm",
      name: "confirm",
      initial: true
    });
    if (!confirm) {
      return false;
    }
  }
  logger.info(`Installing ${name}...`);
  try {
    await installCommand();
    logger.success(`Installed ${name}`);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
}
const installPrompts = /* @__PURE__ */ new Set();
function installNuxtModule(name, options) {
  if (installPrompts.has(name)) {
    return;
  }
  installPrompts.add(name);
  const nuxt = useNuxt();
  return promptToInstall(name, async () => {
    const { runCommand } = await import('nuxi');
    await runCommand("module", ["add", name, "--cwd", nuxt.options.rootDir]);
  }, { rootDir: nuxt.options.rootDir, searchPaths: nuxt.options.modulesDir, ...options });
}
function ensurePackageInstalled(name, options) {
  return promptToInstall(name, () => addDependency(name, {
    cwd: options.rootDir,
    dev: true
  }), options);
}

export { ensurePackageInstalled, installNuxtModule };
