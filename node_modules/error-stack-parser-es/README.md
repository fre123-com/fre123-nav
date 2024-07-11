# error-stack-parser-es

[![NPM version](https://img.shields.io/npm/v/error-stack-parser-es?color=a1b858&label=)](https://www.npmjs.com/package/error-stack-parser-es)

A port of [stacktracejs/error-stack-parser](https://github.com/stacktracejs/error-stack-parser), rewrite with TypeScript and ES Modules.

## Usage

```ts
import { parse } from 'error-stack-parser-es'

const stacktrace = parse(new Error('BOOM!'))
```

Refer to [stacktracejs/error-stack-parser](https://github.com/stacktracejs/error-stack-parser) for more details.

## License

[MIT](./LICENSE) License © 2023-PRESENT [Anthony Fu](https://github.com/antfu)
[MIT](./LICENSE) License © 2017 [Eric Wendelin](https://github.com/eriwen)
