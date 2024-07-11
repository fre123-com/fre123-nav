import fs from 'node:fs';
import { readUser, writeUser } from 'rc9';
import globalDirs from 'global-directory';
import { resolve } from 'pathe';
import { consola } from 'consola';
import { execa } from 'execa';

const moduleName = "@nuxt/devtools";
const RC_PATH = ".nuxtrc";
const pathRegex = /[\\\/]@nuxt[\\\/]devtools[\\\/]/;
async function enable(cwd) {
  const rc = readUser(RC_PATH);
  consola.info("Installed Nuxt DevTools...");
  await execa("npm", ["install", "-g", `${moduleName}@latest`], { stdio: "inherit" });
  markEnable(rc, cwd);
  consola.info("Nuxt DevTools enabled! Restart your Nuxt app to start using it.");
}
function markEnable(rc, path) {
  const modulePath = resolve(globalDirs.npm.packages, moduleName);
  const targetPath = resolve(modulePath, "module.cjs").replace(/\\/g, "/");
  if (!fs.existsSync(targetPath))
    throw new Error("Failed to locate the global Nuxt DevTools module. You may try it again");
  removeModule(rc);
  if (!rc.modules?.includes(targetPath))
    rc.modules = [...rc.modules || [], targetPath];
  if (!rc.devtoolsGlobal)
    rc.devtoolsGlobal = {};
  if (!rc.devtoolsGlobal.projects)
    rc.devtoolsGlobal.projects = [];
  if (!rc.devtoolsGlobal.projects.includes(path))
    rc.devtoolsGlobal.projects.push(path);
  writeUser(rc, RC_PATH);
}
function disableSilently(cwd) {
  const rc = readUser(RC_PATH);
  if (markDisable(rc, cwd))
    writeUser(rc, RC_PATH);
}
async function disable(cwd, args) {
  const rc = readUser(RC_PATH);
  const isRemove = args.includes("--remove");
  if (markDisable(rc, cwd))
    consola.success("Nuxt DevTools disabled for this project.");
  else if (!isRemove)
    consola.warn("Nuxt DevTools is not enabled for this project.");
  if (isRemove) {
    removeModule(rc);
    consola.success("Nuxt DevTools is removed globally");
  }
  writeUser(rc, RC_PATH);
}
function markDisable(rc, path) {
  if (rc?.devtoolsGlobal?.projects?.includes(path)) {
    rc.devtoolsGlobal.projects = rc.devtoolsGlobal.projects.filter((p) => p !== path);
    return true;
  }
  if (!rc?.devtoolsGlobal?.projects?.length)
    removeModule(rc);
  return false;
}
function removeModule(rc) {
  if (Array.isArray(rc.modules))
    rc.modules = rc.modules.filter((p) => !p.match(pathRegex));
  return true;
}

export { RC_PATH, disable, disableSilently, enable, removeModule };
