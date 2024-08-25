'use strict';

const context = require('./shared/unimport.def99245.cjs');
const addons = require('./shared/unimport.5c9f3128.cjs');
require('node:os');
require('node:fs');
require('mlly');
require('pkg-types');
require('pathe');
require('node:process');
require('local-pkg');
require('node:fs/promises');
require('fast-glob');
require('scule');
require('magic-string');
require('strip-literal');

async function installGlobalAutoImports(imports, options = {}) {
  const {
    globalObject = globalThis,
    overrides = false
  } = options;
  imports = Array.isArray(imports) ? imports : await imports.getImports();
  await Promise.all(
    imports.map(async (i) => {
      if (i.disabled || i.type)
        return;
      const as = i.as || i.name;
      if (overrides || !(as in globalObject)) {
        const module = await import(i.from);
        globalObject[as] = module[i.name];
      }
    })
  );
  return globalObject;
}

exports.builtinPresets = context.builtinPresets;
exports.createUnimport = context.createUnimport;
exports.dedupeDtsExports = context.dedupeDtsExports;
exports.resolveBuiltinPresets = context.resolveBuiltinPresets;
exports.resolvePreset = context.resolvePreset;
exports.scanDirExports = context.scanDirExports;
exports.scanExports = context.scanExports;
exports.scanFilesFromDir = context.scanFilesFromDir;
exports.version = context.version;
exports.addImportToCode = addons.addImportToCode;
exports.dedupeImports = addons.dedupeImports;
exports.defineUnimportPreset = addons.defineUnimportPreset;
exports.excludeRE = addons.excludeRE;
exports.getMagicString = addons.getMagicString;
exports.getString = addons.getString;
exports.importAsRE = addons.importAsRE;
exports.matchRE = addons.matchRE;
exports.normalizeImports = addons.normalizeImports;
exports.resolveIdAbsolute = addons.resolveIdAbsolute;
exports.separatorRE = addons.separatorRE;
exports.stringifyImports = addons.stringifyImports;
exports.stripCommentsAndStrings = addons.stripCommentsAndStrings;
exports.stripFileExtension = addons.stripFileExtension;
exports.toExports = addons.toExports;
exports.toImports = addons.toImports;
exports.toTypeDeclarationFile = addons.toTypeDeclarationFile;
exports.toTypeDeclarationItems = addons.toTypeDeclarationItems;
exports.toTypeReExports = addons.toTypeReExports;
exports.vueTemplateAddon = addons.vueTemplateAddon;
exports.installGlobalAutoImports = installGlobalAutoImports;
