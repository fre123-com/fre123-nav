'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const VitePlugin = require('@unocss/vite');
const presetUno = require('@unocss/preset-uno');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const VitePlugin__default = /*#__PURE__*/_interopDefaultCompat(VitePlugin);
const presetUno__default = /*#__PURE__*/_interopDefaultCompat(presetUno);

function UnocssVitePlugin(configOrPath) {
  return VitePlugin__default(
    configOrPath,
    {
      presets: [
        presetUno__default()
      ]
    }
  );
}

exports.default = UnocssVitePlugin;
Object.prototype.hasOwnProperty.call(VitePlugin, '__proto__') &&
  !Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
  Object.defineProperty(exports, '__proto__', {
    enumerable: true,
    value: VitePlugin['__proto__']
  });

Object.keys(VitePlugin).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = VitePlugin[k];
});
