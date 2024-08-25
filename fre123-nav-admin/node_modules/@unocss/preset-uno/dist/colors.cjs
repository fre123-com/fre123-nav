'use strict';

const colors = require('@unocss/preset-mini/colors');



Object.prototype.hasOwnProperty.call(colors, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: colors['__proto__']
	});

Object.keys(colors).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = colors[k];
});
