'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetWind = require('@unocss/preset-wind');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const presetWind__default = /*#__PURE__*/_interopDefaultCompat(presetWind);



exports.default = presetWind__default;
Object.prototype.hasOwnProperty.call(presetWind, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: presetWind['__proto__']
	});

Object.keys(presetWind).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = presetWind[k];
});
