import {
  __spreadProps,
  __spreadValues
} from "./chunk-P5ZSFRBZ.mjs";

// src/options.ts
import { isPackageExists } from "local-pkg";

// src/core/utils.ts
import { pascalCase } from "scule";
function warn(msg, type = "warn") {
  console[type](`\u26A0\uFE0F  [unplugin-vue-router]: ${msg}`);
}
function logTree(tree, log) {
  log(printTree(tree));
}
var MAX_LEVEL = 1e3;
function printTree(tree, level = 0, parentPre = "", treeStr = "") {
  if (typeof tree !== "object" || level >= MAX_LEVEL)
    return "";
  if (tree instanceof Map) {
    const total = tree.size;
    let index = 0;
    for (const [_key, child] of tree) {
      const hasNext = index++ < total - 1;
      const { children } = child;
      treeStr += `${`${parentPre}${hasNext ? "\u251C" : "\u2514"}${"\u2500" + (children.size > 0 ? "\u252C" : "")} `}${child}
`;
      if (children) {
        treeStr += printTree(
          children,
          level + 1,
          `${parentPre}${hasNext ? "\u2502" : " "} `
        );
      }
    }
  } else {
    const children = tree.children;
    treeStr = `${tree}
`;
    if (children) {
      treeStr += printTree(children, level + 1);
    }
  }
  return treeStr;
}
var isArray = Array.isArray;
function trimExtension(path, extensions) {
  for (const extension of extensions) {
    const lastDot = path.endsWith(extension) ? -extension.length : 0;
    if (lastDot < 0) {
      return path.slice(0, lastDot);
    }
  }
  return path;
}
function throttle(fn, wait, initialWait) {
  let pendingExecutionTimeout = null;
  let pendingExecution = false;
  let executionTimeout = null;
  return () => {
    if (pendingExecutionTimeout == null) {
      pendingExecutionTimeout = setTimeout(() => {
        pendingExecutionTimeout = null;
        if (pendingExecution) {
          pendingExecution = false;
          fn();
        }
      }, wait);
      executionTimeout = setTimeout(() => {
        executionTimeout = null;
        fn();
      }, initialWait);
    } else if (executionTimeout == null) {
      pendingExecution = true;
    }
  };
}
var LEADING_SLASH_RE = /^\//;
var TRAILING_SLASH_RE = /\/$/;
function joinPath(...paths) {
  let result = "";
  for (const path of paths) {
    result = result.replace(TRAILING_SLASH_RE, "") + // check path to avoid adding a trailing slash when joining an empty string
    (path && "/" + path.replace(LEADING_SLASH_RE, ""));
  }
  return result;
}
function paramToName({ paramName, modifier, isSplat }) {
  return `${isSplat ? "$" : ""}${paramName.charAt(0).toUpperCase() + paramName.slice(1)}${modifier}`;
}
function getPascalCaseRouteName(node) {
  var _a;
  if (((_a = node.parent) == null ? void 0 : _a.isRoot()) && node.value.pathSegment === "")
    return "Root";
  let name = node.value.subSegments.map((segment) => {
    if (typeof segment === "string") {
      return pascalCase(segment);
    }
    return paramToName(segment);
  }).join("");
  if (node.value.components.size && node.children.has("index")) {
    name += "Parent";
  }
  const parent = node.parent;
  return (parent && !parent.isRoot() ? getPascalCaseRouteName(parent).replace(/Parent$/, "") : "") + name;
}
function getFileBasedRouteName(node) {
  if (!node.parent)
    return "";
  return getFileBasedRouteName(node.parent) + "/" + (node.value.rawSegment === "index" ? "" : node.value.rawSegment);
}
function mergeRouteRecordOverride(a, b) {
  var _a;
  const merged = {};
  const keys = [
    .../* @__PURE__ */ new Set([
      ...Object.keys(a),
      ...Object.keys(b)
    ])
  ];
  for (const key of keys) {
    if (key === "alias") {
      const newAlias = [];
      merged[key] = newAlias.concat(a.alias || [], b.alias || []);
    } else if (key === "meta") {
      merged[key] = mergeDeep(a[key] || {}, b[key] || {});
    } else {
      merged[key] = (_a = b[key]) != null ? _a : a[key];
    }
  }
  return merged;
}
function isObject(obj) {
  return obj && typeof obj === "object";
}
function mergeDeep(...objects) {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });
    return prev;
  }, {});
}
function asRoutePath({ src, path = "" }, filePath) {
  return typeof path === "string" ? (
    // add the path prefix if any
    path + // remove the absolute path to the pages folder
    filePath.slice(src.length + 1)
  ) : path(filePath);
}
function appendExtensionListToPattern(filePatterns, extensions) {
  const extensionPattern = extensions.length === 1 ? extensions[0] : `.{${extensions.map((extension) => extension.replace(".", "")).join(",")}}`;
  return Array.isArray(filePatterns) ? filePatterns.map((filePattern) => `${filePattern}${extensionPattern}`) : `${filePatterns}${extensionPattern}`;
}
var ImportsMap = class {
  constructor() {
    // path -> import as -> import name
    // e.g map['vue-router']['myUseRouter'] = 'useRouter' -> import { useRouter as myUseRouter } from 'vue-router'
    this.map = /* @__PURE__ */ new Map();
  }
  add(path, importEntry) {
    if (!this.map.has(path)) {
      this.map.set(path, /* @__PURE__ */ new Map());
    }
    const imports = this.map.get(path);
    if (typeof importEntry === "string") {
      imports.set(importEntry, importEntry);
    } else {
      imports.set(importEntry.as || importEntry.name, importEntry.name);
    }
    return this;
  }
  addDefault(path, as) {
    return this.add(path, { name: "default", as });
  }
  getImportList(path) {
    if (!this.map.has(path))
      return [];
    return Array.from(this.map.get(path)).map(([as, name]) => ({
      as: as || name,
      name
    }));
  }
  toString() {
    let importStatements = "";
    for (const [path, imports] of this.map) {
      if (!imports.size)
        continue;
      if (imports.size === 1) {
        const [[importName, maybeDefault]] = [...imports.entries()];
        if (maybeDefault === "default") {
          importStatements += `import ${importName} from '${path}'
`;
          continue;
        }
      }
      importStatements += `import { ${Array.from(imports).map(([as, name]) => as === name ? name : `${name} as ${as}`).join(", ")} } from '${path}'
`;
    }
    return importStatements;
  }
  get size() {
    return this.map.size;
  }
};

// src/options.ts
import { resolve } from "pathe";
var DEFAULT_OPTIONS = {
  extensions: [".vue"],
  exclude: [],
  routesFolder: [{ src: "src/pages" }],
  filePatterns: "**/*",
  routeBlockLang: "json5",
  getRouteName: getFileBasedRouteName,
  dataFetching: false,
  importMode: "async",
  root: process.cwd(),
  dts: isPackageExists("typescript"),
  logs: false,
  _inspect: false,
  pathParser: {
    dotNesting: true
  }
};
function normalizeRoutesFolderOption(routesFolder) {
  return (isArray(routesFolder) ? routesFolder : [routesFolder]).map(
    (routeOption) => typeof routeOption === "string" ? { src: routeOption } : routeOption
  );
}
function resolveOptions(options) {
  const root = options.root || DEFAULT_OPTIONS.root;
  const routesFolder = normalizeRoutesFolderOption(
    options.routesFolder || DEFAULT_OPTIONS.routesFolder
  ).map((routeOption) => __spreadProps(__spreadValues({}, routeOption), {
    src: resolve(root, routeOption.src)
  }));
  if (options.extensions) {
    options.extensions = options.extensions.map((ext) => {
      if (!ext.startsWith(".")) {
        warn(`Invalid extension "${ext}". Extensions must start with a dot.`);
        return "." + ext;
      }
      return ext;
    }).sort((a, b) => b.length - a.length);
  }
  return __spreadProps(__spreadValues(__spreadValues({}, DEFAULT_OPTIONS), options), {
    routesFolder
  });
}

export {
  warn,
  logTree,
  trimExtension,
  throttle,
  joinPath,
  getPascalCaseRouteName,
  getFileBasedRouteName,
  mergeRouteRecordOverride,
  asRoutePath,
  appendExtensionListToPattern,
  ImportsMap,
  DEFAULT_OPTIONS,
  resolveOptions
};
