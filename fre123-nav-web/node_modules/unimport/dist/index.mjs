export { b as builtinPresets, c as createUnimport, e as dedupeDtsExports, r as resolveBuiltinPresets, a as resolvePreset, d as scanDirExports, f as scanExports, s as scanFilesFromDir, v as version } from './shared/unimport.e1233a53.mjs';
export { i as addImportToCode, a as dedupeImports, d as defineUnimportPreset, k as excludeRE, h as getMagicString, g as getString, l as importAsRE, o as matchRE, n as normalizeImports, r as resolveIdAbsolute, m as separatorRE, s as stringifyImports, p as stripCommentsAndStrings, b as stripFileExtension, t as toExports, j as toImports, e as toTypeDeclarationFile, c as toTypeDeclarationItems, f as toTypeReExports, v as vueTemplateAddon } from './shared/unimport.e21433f8.mjs';
import 'node:os';
import 'node:fs';
import 'mlly';
import 'pkg-types';
import 'pathe';
import 'node:process';
import 'local-pkg';
import 'node:fs/promises';
import 'fast-glob';
import 'scule';
import 'magic-string';
import 'strip-literal';

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

export { installGlobalAutoImports };
