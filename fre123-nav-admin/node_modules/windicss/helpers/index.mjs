import require$$0, { createRequire } from 'module';
import require$$1 from 'path';

function windi(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    // windi template literal
    return strings.reduce(function (query, queryPart, i) {
        var valueExists = i < values.length;
        var text = query + queryPart;
        return valueExists ? text + values[i] : text;
    }, '');
}

var lib = {exports: {}};

(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHook = addHook;

var _module = _interopRequireDefault(require$$0);

var _path = _interopRequireDefault(require$$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
const nodeModulesRegex = /^(?:.*[\\/])?node_modules(?:[\\/].*)?$/; // Guard against poorly mocked module constructors.

const Module = module.constructor.length > 1 ? module.constructor : _module.default;
const HOOK_RETURNED_NOTHING_ERROR_MESSAGE = '[Pirates] A hook returned a non-string, or nothing at all! This is a' + ' violation of intergalactic law!\n' + '--------------------\n' + 'If you have no idea what this means or what Pirates is, let me explain: ' + 'Pirates is a module that makes is easy to implement require hooks. One of' + " the require hooks you're using uses it. One of these require hooks" + " didn't return anything from it's handler, so we don't know what to" + ' do. You might want to debug this.';
/**
 * @param {string} filename The filename to check.
 * @param {string[]} exts The extensions to hook. Should start with '.' (ex. ['.js']).
 * @param {Matcher|null} matcher A matcher function, will be called with path to a file. Should return truthy if the file should be hooked, falsy otherwise.
 * @param {boolean} ignoreNodeModules Auto-ignore node_modules. Independent of any matcher.
 */

function shouldCompile(filename, exts, matcher, ignoreNodeModules) {
  if (typeof filename !== 'string') {
    return false;
  }

  if (exts.indexOf(_path.default.extname(filename)) === -1) {
    return false;
  }

  const resolvedFilename = _path.default.resolve(filename);

  if (ignoreNodeModules && nodeModulesRegex.test(resolvedFilename)) {
    return false;
  }

  if (matcher && typeof matcher === 'function') {
    return !!matcher(resolvedFilename);
  }

  return true;
}
/**
 * @callback Hook The hook. Accepts the code of the module and the filename.
 * @param {string} code
 * @param {string} filename
 * @returns {string}
 */

/**
 * @callback Matcher A matcher function, will be called with path to a file.
 *
 * Should return truthy if the file should be hooked, falsy otherwise.
 * @param {string} path
 * @returns {boolean}
 */

/**
 * @callback RevertFunction Reverts the hook when called.
 * @returns {void}
 */

/**
 * @typedef {object} Options
 * @property {Matcher|null} [matcher=null] A matcher function, will be called with path to a file.
 *
 * Should return truthy if the file should be hooked, falsy otherwise.
 *
 * @property {string[]} [extensions=['.js']] The extensions to hook. Should start with '.' (ex. ['.js']).
 * @property {string[]} [exts=['.js']] The extensions to hook. Should start with '.' (ex. ['.js']).
 *
 * @property {string[]} [extension=['.js']] The extensions to hook. Should start with '.' (ex. ['.js']).
 * @property {string[]} [ext=['.js']] The extensions to hook. Should start with '.' (ex. ['.js']).
 *
 * @property {boolean} [ignoreNodeModules=true] Auto-ignore node_modules. Independent of any matcher.
 */

/**
 * Add a require hook.
 *
 * @param {Hook} hook The hook. Accepts the code of the module and the filename. Required.
 * @param {Options} [opts] Options
 * @returns {RevertFunction} The `revert` function. Reverts the hook when called.
 */


function addHook(hook, opts = {}) {
  let reverted = false;
  const loaders = [];
  const oldLoaders = [];
  let exts; // We need to do this to fix #15. Basically, if you use a non-standard extension (ie. .jsx), then
  // We modify the .js loader, then use the modified .js loader for as the base for .jsx.
  // This prevents that.

  const originalJSLoader = Module._extensions['.js'];
  const matcher = opts.matcher || null;
  const ignoreNodeModules = opts.ignoreNodeModules !== false;
  exts = opts.extensions || opts.exts || opts.extension || opts.ext || ['.js'];

  if (!Array.isArray(exts)) {
    exts = [exts];
  }

  exts.forEach(ext => {
    if (typeof ext !== 'string') {
      throw new TypeError(`Invalid Extension: ${ext}`);
    }

    const oldLoader = Module._extensions[ext] || originalJSLoader;
    oldLoaders[ext] = Module._extensions[ext];

    loaders[ext] = Module._extensions[ext] = function newLoader(mod, filename) {
      let compile;

      if (!reverted) {
        if (shouldCompile(filename, exts, matcher, ignoreNodeModules)) {
          compile = mod._compile;

          mod._compile = function _compile(code) {
            // reset the compile immediately as otherwise we end up having the
            // compile function being changed even though this loader might be reverted
            // Not reverting it here leads to long useless compile chains when doing
            // addHook -> revert -> addHook -> revert -> ...
            // The compile function is also anyway created new when the loader is called a second time.
            mod._compile = compile;
            const newCode = hook(code, filename);

            if (typeof newCode !== 'string') {
              throw new Error(HOOK_RETURNED_NOTHING_ERROR_MESSAGE);
            }

            return mod._compile(newCode, filename);
          };
        }
      }

      oldLoader(mod, filename);
    };
  });
  return function revert() {
    if (reverted) return;
    reverted = true;
    exts.forEach(ext => {
      // if the current loader for the extension is our loader then unregister it and set the oldLoader again
      // if not we can not do anything as we cannot remove a loader from within the loader-chain
      if (Module._extensions[ext] === loaders[ext]) {
        Module._extensions[ext] = oldLoaders[ext];
      }
    });
  };
}
}(lib, lib.exports));

function convert(code) {
    var map = {
        '@tailwindcss\\/typography': 'windicss/plugin/typography',
        '@tailwindcss\\/forms': 'windicss/plugin/forms',
        '@tailwindcss\\/aspect-ratio': 'windicss/plugin/aspect-ratio',
        '@tailwindcss\\/line-clamp': 'windicss/plugin/line-clamp',
        'tailwindcss\\/plugin': 'windicss/plugin',
        'tailwindcss\\/colors': 'windicss/colors',
        'tailwindcss\\/resolveConfig': 'windicss/resolveConfig',
        'tailwindcss\\/defaultConfig': 'windicss/defaultConfig',
        'tailwindcss\\/defaultTheme': 'windicss/defaultTheme',
    };
    for (var _i = 0, _a = Object.entries(map); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        code = code.replace(new RegExp(key, 'g'), value);
    }
    return code;
}
function transform(path) {
    var require = createRequire(import.meta.url);
    var matcher = function (filename) { return !/\/windicss\//.test(filename); };
    var revert = lib.exports.addHook(function (code) { return convert(code); }, { exts: ['.js'], matcher: matcher, ignoreNodeModules: false });
    var mod = require(path);
    revert();
    return mod;
}

function defineConfig(config) {
    return config;
}

export { convert, defineConfig, transform, windi };
