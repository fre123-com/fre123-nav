'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetTagify = require('@unocss/preset-tagify');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const presetTagify__default = /*#__PURE__*/_interopDefaultCompat(presetTagify);



exports.default = presetTagify__default;
Object.prototype.hasOwnProperty.call(presetTagify, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: presetTagify['__proto__']
	});

Object.keys(presetTagify).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = presetTagify[k];
});
