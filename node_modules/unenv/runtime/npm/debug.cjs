"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const noop = () => {};
const debug = () => console.debug;
Object.assign(debug, {
  default: debug,
  coerce: noop,
  disable: noop,
  enable: noop,
  enabled: noop,
  extend: debug,
  humanize: noop,
  destroy: noop,
  init: noop,
  log: console.debug,
  formatArgs: noop,
  save: noop,
  load: noop,
  useColors: noop,
  colors: [],
  inspectOpts: {},
  names: [],
  skips: [],
  formatters: {},
  selectColors: noop
});
module.exports = debug;