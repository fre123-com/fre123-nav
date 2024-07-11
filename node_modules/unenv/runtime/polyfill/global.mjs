import _global from "./global-this.mjs";
try {
  const _defineOpts = { enumerable: false, value: _global };
  Object.defineProperties(_global, {
    self: _defineOpts,
    window: _defineOpts,
    global: _defineOpts
  });
} catch {
}
export default _global;
