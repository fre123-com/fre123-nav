'use strict';

const defu = require('defu');
const jiti = require('jiti');
const schema = require('./shared/untyped.b44a3145.cjs');
const babel = require('./babel.cjs');
require('./shared/untyped.84362cee.cjs');
require('scule');
require('@babel/types');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const jiti__default = /*#__PURE__*/_interopDefaultCompat(jiti);

async function loadSchema(entryPath, options = {}) {
  const _jitiRequire = jiti__default(
    process.cwd(),
    defu.defu(options.jiti, {
      esmResolve: true,
      interopDefault: true,
      transformOptions: {
        babel: {
          plugins: [[babel, { experimentalFunctions: true }]]
        }
      }
    })
  );
  const resolvedEntryPath = _jitiRequire.resolve(entryPath);
  const rawSchema = _jitiRequire(resolvedEntryPath);
  const schema$1 = await schema.resolveSchema(rawSchema, options.defaults, {
    ignoreDefaults: options.ignoreDefaults
  });
  return schema$1;
}

exports.loadSchema = loadSchema;
