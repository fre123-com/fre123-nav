'use strict';

const theme = require('@unocss/preset-mini/theme');



Object.prototype.hasOwnProperty.call(theme, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: theme['__proto__']
	});

Object.keys(theme).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = theme[k];
});
