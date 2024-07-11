import { defu } from 'defu';
import jiti from 'jiti';
import { r as resolveSchema } from './shared/untyped.3f3c0215.mjs';
import babelPluginUntyped from './babel.mjs';
import './shared/untyped.bd7ca8a5.mjs';
import 'scule';
import '@babel/types';

async function loadSchema(entryPath, options = {}) {
  const _jitiRequire = jiti(
    process.cwd(),
    defu(options.jiti, {
      esmResolve: true,
      interopDefault: true,
      transformOptions: {
        babel: {
          plugins: [[babelPluginUntyped, { experimentalFunctions: true }]]
        }
      }
    })
  );
  const resolvedEntryPath = _jitiRequire.resolve(entryPath);
  const rawSchema = _jitiRequire(resolvedEntryPath);
  const schema = await resolveSchema(rawSchema, options.defaults, {
    ignoreDefaults: options.ignoreDefaults
  });
  return schema;
}

export { loadSchema };
