'use strict';

const ruleUtils = require('@unocss/rule-utils');



Object.prototype.hasOwnProperty.call(ruleUtils, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: ruleUtils['__proto__']
	});

Object.keys(ruleUtils).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = ruleUtils[k];
});
