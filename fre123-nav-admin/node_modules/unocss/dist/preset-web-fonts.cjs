'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetWebFonts = require('@unocss/preset-web-fonts');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const presetWebFonts__default = /*#__PURE__*/_interopDefaultCompat(presetWebFonts);



exports.default = presetWebFonts__default;
Object.prototype.hasOwnProperty.call(presetWebFonts, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: presetWebFonts['__proto__']
	});

Object.keys(presetWebFonts).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = presetWebFonts[k];
});
