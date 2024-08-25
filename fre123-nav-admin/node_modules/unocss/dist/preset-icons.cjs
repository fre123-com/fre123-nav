'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetIcons = require('@unocss/preset-icons');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const presetIcons__default = /*#__PURE__*/_interopDefaultCompat(presetIcons);



exports.default = presetIcons__default;
Object.prototype.hasOwnProperty.call(presetIcons, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: presetIcons['__proto__']
	});

Object.keys(presetIcons).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = presetIcons[k];
});
