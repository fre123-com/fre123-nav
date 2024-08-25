'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const presetUno = require('@unocss/preset-uno');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const presetUno__default = /*#__PURE__*/_interopDefaultCompat(presetUno);



exports.default = presetUno__default;
Object.prototype.hasOwnProperty.call(presetUno, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: presetUno['__proto__']
	});

Object.keys(presetUno).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = presetUno[k];
});
