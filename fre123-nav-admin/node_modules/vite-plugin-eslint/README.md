# vite-plugin-eslint

[![npm](https://img.shields.io/npm/v/vite-plugin-eslint)](https://www.npmjs.com/package/vite-plugin-eslint)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/vite-plugin-eslint/peer/vite)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/vite-plugin-eslint/peer/eslint)
[![GitHub license](https://img.shields.io/github/license/gxmari007/vite-plugin-eslint)](https://github.com/gxmari007/vite-plugin-eslint/blob/master/LICENSE)

ESLint plugin for vite.

## Install

```bash
npm install eslint vite-plugin-eslint --save-dev
# or
yarn add eslint vite-plugin-eslint -D
```

## Usage

```js
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [eslint()]
})
```

## Options

You can pass [eslint options](https://eslint.org/docs/developer-guide/nodejs-api#-new-eslintoptions).

### `cache`

- Type: `boolean`
- Default: `false`

Decrease execution time, `Beta` Cache now correctly recognizes file changes, you can try it out.

### `fix`

- Type: `boolean`
- Default: `false`

Auto fix source code.

### `eslintPath`

- Type: `string`
- Default: `eslint`

Path to `eslint` instance that will be used for linting.

### `lintOnStart`

- Type: `boolean`
- Default: `false`

Check all matching files on project startup, too slow, turn on discreetly.

### `include`

- Type: `string | string[]`
- Default: `['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.svelte']`

A single file, or array of files, to include when linting.

### `exclude`

- Type: `string | string[]`
- Default: `['**/node_modules/**']`

A single file, or array of files, to exclude when linting.

### `formatter`

- Type: `string | ESLint.Formatter['format']`
- Default: `stylish`

Custom error formatter or the name of a built-in formatter.

### `emitWarning`

- Type: `boolean`
- Default: `true`

The warings found will be printed.

### `emitError`

- Type: `boolean`
- Default: `true`

The errors found will be printed.

### `failOnWarning`

- Type: `boolean`
- Default: `false`

Will cause the module build to fail if there are any warnings, based on `emitWarning`.

### `failOnError`

- Type: `boolean`
- Default: `true`

Will cause the module build to fail if there are any errors, based on `emitError`.

## License

MIT
