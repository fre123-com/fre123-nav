declare const clear: {
	/**
	Clear a module from the [cache](https://nodejs.org/api/modules.html#modules_caching).

	@param moduleId - What you would use with `require()`.

	@example
	```
	// foo.ts
	let i = 0;
	module.exports = () => ++i;

	// test.ts
	import clearModule = require('clear-module');

	require('./foo')();
	//=> 1

	require('./foo')();
	//=> 2

	clearModule('./foo');

	require('./foo')();
	//=> 1
	```
	*/
	(moduleId: string): void;

	/**
	Clear all modules from the cache.
	*/
	all(): void;

	/**
	Clear all matching modules from the cache.

	@param regex - Regex to match against the module IDs.
	*/
	match(regex: RegExp): void;

	/**
	Clear a single module from the cache non-recursively. No parent or children modules will be affected.

	This is mostly only useful if you use singletons, where you would want to clear a specific module without causing any side effects.

	@param moduleId - What you would use with `require()`.
	*/
	single(moduleId: string): void;
};

export = clear;
