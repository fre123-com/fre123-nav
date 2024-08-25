'use strict';

const AstroIntegrationPlugin = require('@unocss/astro');
const presetUno = require('@unocss/preset-uno');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const AstroIntegrationPlugin__default = /*#__PURE__*/_interopDefaultCompat(AstroIntegrationPlugin);
const presetUno__default = /*#__PURE__*/_interopDefaultCompat(presetUno);

function UnocssAstroIntegration(config) {
  return AstroIntegrationPlugin__default(
    config,
    {
      presets: [
        presetUno__default()
      ]
    }
  );
}

module.exports = UnocssAstroIntegration;
