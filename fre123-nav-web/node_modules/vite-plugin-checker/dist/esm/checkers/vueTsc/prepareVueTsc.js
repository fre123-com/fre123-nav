import fsExtra from "fs-extra";
import { createRequire } from "module";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import semver from "semver";
import { writeFile, access, readFile, rm } from "fs/promises";
const { copy, mkdir } = fsExtra;
const _require = createRequire(import.meta.url);
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const proxyApiPath = _require.resolve("vue-tsc/out/index");
async function prepareVueTsc() {
  const targetTsDir = path.resolve(_dirname, "typescript-vue-tsc");
  const vueTscFlagFile = path.resolve(targetTsDir, "vue-tsc-resolve-path");
  const currTsVersion = _require("typescript/package.json").version;
  let shouldBuildFixture = true;
  try {
    await access(targetTsDir);
    const targetTsVersion = _require(path.resolve(targetTsDir, "package.json")).version;
    await access(vueTscFlagFile);
    const fixtureFlagContent = await readFile(vueTscFlagFile, "utf8");
    if (targetTsVersion === currTsVersion && fixtureFlagContent === proxyApiPath) {
      shouldBuildFixture = false;
    }
  } catch (e) {
    shouldBuildFixture = true;
  }
  if (shouldBuildFixture) {
    await rm(targetTsDir, { force: true, recursive: true });
    await mkdir(targetTsDir);
    const sourceTsDir = path.resolve(_require.resolve("typescript"), "../..");
    await copy(sourceTsDir, targetTsDir);
    await writeFile(vueTscFlagFile, proxyApiPath);
    await overrideTscJs(
      _require.resolve(path.resolve(targetTsDir, "lib/typescript.js")),
      currTsVersion
    );
  }
  return { targetTsDir };
}
async function overrideTscJs(tscJsPath, version) {
  let tsc = await readFile(tscJsPath, "utf8");
  tryReplace(/supportedTSExtensions = .*(?=;)/, (s) => s + '.concat([[".vue"]])');
  tryReplace(/supportedJSExtensions = .*(?=;)/, (s) => s + '.concat([[".vue"]])');
  tryReplace(/allSupportedExtensions = .*(?=;)/, (s) => s + '.concat([[".vue"]])');
  tryReplace(
    /function createProgram\(.+\) {/,
    (s) => s + ` return require(${JSON.stringify(proxyApiPath)}).createProgram(...arguments);`
  );
  if (semver.gt(version, "5.0.0")) {
    tryReplace(
      `for (const existingRoot of buildInfoVersionMap.roots) {`,
      `for (const existingRoot of buildInfoVersionMap.roots
				.filter(file => !file.toLowerCase().includes('__vls_'))
				.map(file => file.replace(/.vue.(j|t)sx?$/i, '.vue'))
			) {`
    );
  }
  function tryReplace(search, replace) {
    const before = tsc;
    tsc = tsc.replace(search, replace);
    const after = tsc;
    if (after === before) {
      throw "Search string not found: " + JSON.stringify(search.toString());
    }
  }
  await writeFile(tscJsPath, tsc);
}
export {
  prepareVueTsc
};
//# sourceMappingURL=prepareVueTsc.js.map