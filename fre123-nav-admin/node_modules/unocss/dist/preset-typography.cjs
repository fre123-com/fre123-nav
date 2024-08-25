'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetTypography = require('@unocss/preset-typography');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const presetTypography__default = /*#__PURE__*/_interopDefaultCompat(presetTypography);



exports.default = presetTypography__default;
Object.prototype.hasOwnProperty.call(presetTypography, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: presetTypography['__proto__']
	});

Object.keys(presetTypography).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = presetTypography[k];
});
