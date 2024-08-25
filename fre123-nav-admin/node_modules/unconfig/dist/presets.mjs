import { toArray } from '@antfu/utils';

function sourcePluginFactory(options) {
  return {
    ...options,
    transform: (source) => {
      const prefix = `
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
`;
      const suffix = "export default __unconfig_data;";
      let code = source.replace(new RegExp(`import (.+?) from (['"])${options.targetModule}\\2`), "const $1 = __unconfig_stub;").replace("export default", "const __unconfig_default = ");
      if (code.includes("__unconfig_default"))
        code += `
if (typeof __unconfig_default === "function") __unconfig_default(...${JSON.stringify(options.parameters || [])});`;
      return `${prefix}${code}${suffix}`;
    }
  };
}
function sourceVitePluginConfig(options) {
  const plugins = toArray(options.plugins);
  return {
    files: ["vite.config"],
    async rewrite(obj) {
      const config = await (typeof obj === "function" ? obj(...options.parameters || [{ env: {} }, {}]) : obj);
      if (!config)
        return config;
      return config.plugins.find((i) => plugins.includes(i.name) && i?.api?.config)?.api?.config;
    }
  };
}
function sourceObjectFields(options) {
  const fields = toArray(options.fields);
  return {
    ...options,
    async rewrite(obj) {
      const config = await (typeof obj === "function" ? obj(...options.parameters || []) : obj);
      if (!config)
        return config;
      for (const field of fields) {
        if (field in config)
          return config[field];
      }
    }
  };
}
function sourcePackageJsonFields(options) {
  return sourceObjectFields({
    files: ["package.json"],
    extensions: [],
    parser: "json",
    fields: options.fields
  });
}

export { sourceObjectFields, sourcePackageJsonFields, sourcePluginFactory, sourceVitePluginConfig };
