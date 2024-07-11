import { notImplemented, notImplementedClass } from "../../_internal/utils.mjs";
export const builtinModules = [];
export const createRequire = notImplemented(
  "module.createRequire"
);
export const runMain = notImplemented(
  "module.runMain"
);
export const isBuiltin = notImplemented(
  "module.isBuiltin"
);
export const register = notImplemented(
  "module.register"
);
export const syncBuiltinESMExports = notImplemented(
  "module.syncBuiltinESMExports"
);
export const findSourceMap = notImplemented(
  "module.syncBuiltinESMExports"
);
export const wrap = notImplemented("module.wrap");
export const Module = notImplementedClass(
  "module.Module"
);
export const SourceMap = notImplementedClass(
  "module.SourceMap"
);
export default {
  Module,
  SourceMap,
  builtinModules,
  createRequire,
  runMain,
  wrap,
  isBuiltin,
  register,
  syncBuiltinESMExports,
  findSourceMap
};
