'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetAttributify = require('@unocss/preset-attributify');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const presetAttributify__default = /*#__PURE__*/_interopDefaultCompat(presetAttributify);



exports.default = presetAttributify__default;
Object.prototype.hasOwnProperty.call(presetAttributify, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: presetAttributify['__proto__']
	});

Object.keys(presetAttributify).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = presetAttributify[k];
});
