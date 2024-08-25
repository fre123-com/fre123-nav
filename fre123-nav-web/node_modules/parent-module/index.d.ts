/**
Get the path of the parent module.

@param filePath - File path of the module of which to get the parent path.

Useful if you want it to work [multiple module levels down](https://github.com/sindresorhus/parent-module/tree/master/fixtures/filepath).

Default: [`__filename`](https://nodejs.org/api/globals.html#globals_filename)


@example
```
// bar.ts
const parentModule = require('parent-module');

export default () => {
	console.log(parentModule());
	//=> '/Users/sindresorhus/dev/unicorn/foo.ts'
};

// foo.ts
import bar from './bar';

bar();
```
*/
declare function parentModule(filePath?: string): string | undefined;

export = parentModule;
