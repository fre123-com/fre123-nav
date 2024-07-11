var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var prepareVueTsc_exports = {};
__export(prepareVueTsc_exports, {
  prepareVueTsc: () => prepareVueTsc
});
module.exports = __toCommonJS(prepareVueTsc_exports);
var getImportMetaUrl = () => typeof document === "undefined" ? new URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_module = require("module");
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_semver = __toESM(require("semver"), 1);
var import_promises = require("fs/promises");
const { copy, mkdir } = import_fs_extra.default;
const _require = (0, import_module.createRequire)(importMetaUrl);
const _filename = (0, import_url.fileURLToPath)(importMetaUrl);
const _dirname = (0, import_path.dirname)(_filename);
const proxyApiPath = _require.resolve("vue-tsc/out/index");
async function prepareVueTsc() {
  const targetTsDir = import_path.default.resolve(_dirname, "typescript-vue-tsc");
  const vueTscFlagFile = import_path.default.resolve(targetTsDir, "vue-tsc-resolve-path");
  const currTsVersion = _require("typescript/package.json").version;
  let shouldBuildFixture = true;
  try {
    await (0, import_promises.access)(targetTsDir);
    const targetTsVersion = _require(import_path.default.resolve(targetTsDir, "package.json")).version;
    await (0, import_promises.access)(vueTscFlagFile);
    const fixtureFlagContent = await (0, import_promises.readFile)(vueTscFlagFile, "utf8");
    if (targetTsVersion === currTsVersion && fixtureFlagContent === proxyApiPath) {
      shouldBuildFixture = false;
    }
  } catch (e) {
    shouldBuildFixture = true;
  }
  if (shouldBuildFixture) {
    await (0, import_promises.rm)(targetTsDir, { force: true, recursive: true });
    await mkdir(targetTsDir);
    const sourceTsDir = import_path.default.resolve(_require.resolve("typescript"), "../..");
    await copy(sourceTsDir, targetTsDir);
    await (0, import_promises.writeFile)(vueTscFlagFile, proxyApiPath);
    await overrideTscJs(
      _require.resolve(import_path.default.resolve(targetTsDir, "lib/typescript.js")),
      currTsVersion
    );
  }
  return { targetTsDir };
}
async function overrideTscJs(tscJsPath, version) {
  let tsc = await (0, import_promises.readFile)(tscJsPath, "utf8");
  tryReplace(/supportedTSExtensions = .*(?=;)/, (s) => s + '.concat([[".vue"]])');
  tryReplace(/supportedJSExtensions = .*(?=;)/, (s) => s + '.concat([[".vue"]])');
  tryReplace(/allSupportedExtensions = .*(?=;)/, (s) => s + '.concat([[".vue"]])');
  tryReplace(
    /function createProgram\(.+\) {/,
    (s) => s + ` return require(${JSON.stringify(proxyApiPath)}).createProgram(...arguments);`
  );
  if (import_semver.default.gt(version, "5.0.0")) {
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
  await (0, import_promises.writeFile)(tscJsPath, tsc);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prepareVueTsc
});
//# sourceMappingURL=prepareVueTsc.js.map