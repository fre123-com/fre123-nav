# magic-string-ast [![npm](https://img.shields.io/npm/v/magic-string-ast.svg)](https://npmjs.com/package/magic-string-ast)

[![Unit Test](https://github.com/sxzz/magic-string-ast/actions/workflows/unit-test.yml/badge.svg)](https://github.com/sxzz/magic-string-ast/actions/workflows/unit-test.yml)

Extend Babel AST for [magic-string](https://github.com/rich-harris/magic-string).

## Install

```bash
npm i magic-string-ast
```

## Usage

```ts
import { MagicString } from 'magic-string-ast'

const offset = 0
const node = {
  // ...
  // AST node from @babel/parser
}

const s = new MagicString('const a = 1')
s.removeNode(node)
s.moveNode(node, 0)
console.log(s.sliceNode(node, { offset }))
s.overwriteNode(node, 'const b = 2')
```

For more APIs, see [magic-string](https://github.com/rich-harris/magic-string#usage).

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2023 [三咲智子](https://github.com/sxzz)
