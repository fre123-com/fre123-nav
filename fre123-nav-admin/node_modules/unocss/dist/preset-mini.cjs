'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetMini = require('@unocss/preset-mini');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const presetMini__default = /*#__PURE__*/_interopDefaultCompat(presetMini);



exports.default = presetMini__default;
Object.prototype.hasOwnProperty.call(presetMini, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: presetMini['__proto__']
	});

Object.keys(presetMini).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = presetMini[k];
});
