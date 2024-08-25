"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __knownSymbol = (name, symbol) => {
  if (symbol = Symbol[name])
    return symbol;
  throw Error("Symbol." + name + " is not defined");
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __await = function(promise, isYieldStar) {
  this[0] = promise;
  this[1] = isYieldStar;
};
var __yieldStar = (value) => {
  var obj = value[__knownSymbol("asyncIterator")];
  var isAwait = false;
  var method;
  var it = {};
  if (obj == null) {
    obj = value[__knownSymbol("iterator")]();
    method = (k) => it[k] = (x) => obj[k](x);
  } else {
    obj = obj.call(value);
    method = (k) => it[k] = (v) => {
      if (isAwait) {
        isAwait = false;
        if (k === "throw")
          throw v;
        return v;
      }
      isAwait = true;
      return {
        done: false,
        value: new __await(new Promise((resolve4) => {
          var x = obj[k](v);
          if (!(x instanceof Object))
            throw TypeError("Object expected");
          resolve4(x);
        }), 1)
      };
    };
  }
  return it[__knownSymbol("iterator")] = () => it, method("next"), "throw" in obj ? method("throw") : it.throw = (x) => {
    throw x;
  }, "return" in obj && method("return"), it;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DEFAULT_OPTIONS: () => DEFAULT_OPTIONS,
  EditableTreeNode: () => EditableTreeNode,
  VueRouterAutoImports: () => VueRouterAutoImports,
  VueRouterExports: () => VueRouterExports,
  createPrefixTree: () => createPrefixTree,
  createRoutesContext: () => createRoutesContext,
  createTreeNodeValue: () => createTreeNodeValue,
  default: () => src_default,
  getFileBasedRouteName: () => getFileBasedRouteName,
  getPascalCaseRouteName: () => getPascalCaseRouteName
});
module.exports = __toCommonJS(src_exports);
var import_unplugin = require("unplugin");

// src/core/utils.ts
var import_scule = require("scule");
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
      return (0, import_scule.pascalCase)(segment);
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

// src/core/treeNodeValue.ts
var EDITS_OVERRIDE_NAME = "@@edits";
var _TreeNodeValueBase = class {
  constructor(rawSegment, parent, pathSegment = rawSegment, subSegments = [pathSegment]) {
    /**
     * Overrides defined by each file. The map is necessary to handle named views.
     */
    this._overrides = /* @__PURE__ */ new Map();
    // TODO: cache the overrides generation
    /**
     * Should we add the loader guard to the route record.
     */
    this.includeLoaderGuard = false;
    /**
     * View name (Vue Router feature) mapped to their corresponding file. By default, the view name is `default` unless
     * specified with a `@` e.g. `index@aux.vue` will have a view name of `aux`.
     */
    this.components = /* @__PURE__ */ new Map();
    this._type = 0;
    this.rawSegment = rawSegment;
    this.pathSegment = pathSegment;
    this.subSegments = subSegments;
    this.parent = parent;
  }
  /**
   * fullPath of the node based on parent nodes
   */
  get path() {
    var _a, _b;
    const parentPath = (_a = this.parent) == null ? void 0 : _a.path;
    const pathSegment = (_b = this.overrides.path) != null ? _b : this.pathSegment;
    return (!parentPath || parentPath === "/") && pathSegment === "" ? "/" : joinPath(parentPath || "", pathSegment);
  }
  toString() {
    return this.pathSegment || "<index>";
  }
  isParam() {
    return !!(this._type & 1 /* param */);
  }
  isStatic() {
    return this._type === 0 /* static */;
  }
  get overrides() {
    return [...this._overrides.entries()].sort(
      ([nameA], [nameB]) => nameA === nameB ? 0 : (
        // EDITS_OVERRIDE_NAME should always be last
        nameA !== EDITS_OVERRIDE_NAME && (nameA < nameB || nameB === EDITS_OVERRIDE_NAME) ? -1 : 1
      )
    ).reduce((acc, [_path, routeBlock]) => {
      return mergeRouteRecordOverride(acc, routeBlock);
    }, {});
  }
  setOverride(filePath, routeBlock) {
    this._overrides.set(filePath, routeBlock || {});
  }
  /**
   * Remove all overrides for a given key.
   *
   * @param key - key to remove from the override, e.g. path, name, etc
   */
  removeOverride(key) {
    this._overrides.forEach((routeBlock) => {
      delete routeBlock[key];
    });
  }
  /**
   * Add an override to the current node by merging with the existing values.
   *
   * @param filePath - The file path to add to the override
   * @param routeBlock - The route block to add to the override
   */
  mergeOverride(filePath, routeBlock) {
    const existing = this._overrides.get(filePath) || {};
    this._overrides.set(
      filePath,
      mergeRouteRecordOverride(existing, routeBlock)
    );
  }
  /**
   * Add an override to the current node using the special file path `@@edits` that makes this added at build time.
   *
   * @param routeBlock -  The route block to add to the override
   */
  addEditOverride(routeBlock) {
    return this.mergeOverride(EDITS_OVERRIDE_NAME, routeBlock);
  }
  /**
   * Set a specific value in the _edits_ override.
   *
   * @param key - key to set in the override, e.g. path, name, etc
   * @param value - value to set in the override
   */
  setEditOverride(key, value) {
    if (!this._overrides.has(EDITS_OVERRIDE_NAME)) {
      this._overrides.set(EDITS_OVERRIDE_NAME, {});
    }
    const existing = this._overrides.get(EDITS_OVERRIDE_NAME);
    existing[key] = value;
  }
};
var TreeNodeValueStatic = class extends _TreeNodeValueBase {
  constructor(rawSegment, parent, pathSegment = rawSegment) {
    super(rawSegment, parent, pathSegment);
    this._type = 0 /* static */;
  }
};
var TreeNodeValueParam = class extends _TreeNodeValueBase {
  constructor(rawSegment, parent, params, pathSegment, subSegments) {
    super(rawSegment, parent, pathSegment, subSegments);
    this._type = 1 /* param */;
    this.params = params;
  }
};
function createTreeNodeValue(segment, parent, options = {}) {
  if (!segment || segment === "index") {
    return new TreeNodeValueStatic(segment, parent, "");
  }
  const [pathSegment, params, subSegments] = options.format === "path" ? parseRawPathSegment(segment) : (
    // by default, we use the file format
    parseFileSegment(segment, options)
  );
  if (params.length) {
    return new TreeNodeValueParam(
      segment,
      parent,
      params,
      pathSegment,
      subSegments
    );
  }
  return new TreeNodeValueStatic(segment, parent, pathSegment);
}
var IS_VARIABLE_CHAR_RE = /[0-9a-zA-Z_]/;
function parseFileSegment(segment, { dotNesting = true } = {}) {
  let buffer = "";
  let state = 0 /* static */;
  const params = [];
  let pathSegment = "";
  const subSegments = [];
  let currentTreeRouteParam = createEmptyRouteParam();
  let pos = 0;
  let c;
  function consumeBuffer() {
    if (state === 0 /* static */) {
      pathSegment += buffer;
      subSegments.push(buffer);
    } else if (state === 3 /* modifier */) {
      currentTreeRouteParam.paramName = buffer;
      currentTreeRouteParam.modifier = currentTreeRouteParam.optional ? currentTreeRouteParam.repeatable ? "*" : "?" : currentTreeRouteParam.repeatable ? "+" : "";
      buffer = "";
      pathSegment += `:${currentTreeRouteParam.paramName}${currentTreeRouteParam.isSplat ? "(.*)" : (
        // Only append () if necessary
        pos < segment.length - 1 && IS_VARIABLE_CHAR_RE.test(segment[pos + 1]) ? "()" : (
          // allow routes like /[id]_suffix to make suffix static and not part of the param
          ""
        )
      )}${currentTreeRouteParam.modifier}`;
      params.push(currentTreeRouteParam);
      subSegments.push(currentTreeRouteParam);
      currentTreeRouteParam = createEmptyRouteParam();
    }
    buffer = "";
  }
  for (pos = 0; pos < segment.length; pos++) {
    c = segment[pos];
    if (state === 0 /* static */) {
      if (c === "[") {
        consumeBuffer();
        state = 1 /* paramOptional */;
      } else {
        buffer += dotNesting && c === "." ? "/" : c;
      }
    } else if (state === 1 /* paramOptional */) {
      if (c === "[") {
        currentTreeRouteParam.optional = true;
      } else if (c === ".") {
        currentTreeRouteParam.isSplat = true;
        pos += 2;
      } else {
        buffer += c;
      }
      state = 2 /* param */;
    } else if (state === 2 /* param */) {
      if (c === "]") {
        if (currentTreeRouteParam.optional) {
          pos++;
        }
        state = 3 /* modifier */;
      } else if (c === ".") {
        currentTreeRouteParam.isSplat = true;
        pos += 2;
      } else {
        buffer += c;
      }
    } else if (state === 3 /* modifier */) {
      if (c === "+") {
        currentTreeRouteParam.repeatable = true;
      } else {
        pos--;
      }
      consumeBuffer();
      state = 0 /* static */;
    }
  }
  if (state === 2 /* param */ || state === 1 /* paramOptional */) {
    throw new Error(`Invalid segment: "${segment}"`);
  }
  if (buffer) {
    consumeBuffer();
  }
  return [pathSegment, params, subSegments];
}
var IS_MODIFIER_RE = /[+*?]/;
function parseRawPathSegment(segment) {
  let buffer = "";
  let state = 0 /* static */;
  const params = [];
  const subSegments = [];
  let currentTreeRouteParam = createEmptyRouteParam();
  let pos = 0;
  let c;
  function consumeBuffer() {
    if (state === 0 /* static */) {
      subSegments.push(buffer);
    } else if (state === 1 /* param */ || state === 2 /* regexp */ || state === 3 /* modifier */) {
      subSegments.push(currentTreeRouteParam);
      params.push(currentTreeRouteParam);
      currentTreeRouteParam = createEmptyRouteParam();
    }
    buffer = "";
  }
  for (pos = 0; pos < segment.length; pos++) {
    c = segment[pos];
    if (c === "\\") {
      pos++;
      buffer += segment[pos];
      continue;
    }
    if (state === 0 /* static */) {
      if (c === ":") {
        consumeBuffer();
        state = 1 /* param */;
      } else {
        buffer += c;
      }
    } else if (state === 1 /* param */) {
      if (c === "(") {
        currentTreeRouteParam.paramName = buffer;
        buffer = "";
        state = 2 /* regexp */;
      } else if (IS_MODIFIER_RE.test(c)) {
        currentTreeRouteParam.modifier = c;
        currentTreeRouteParam.optional = c === "?" || c === "*";
        currentTreeRouteParam.repeatable = c === "+" || c === "*";
        consumeBuffer();
        state = 0 /* static */;
      } else if (IS_VARIABLE_CHAR_RE.test(c)) {
        buffer += c;
        currentTreeRouteParam.paramName = buffer;
      } else {
        currentTreeRouteParam.paramName = buffer;
        consumeBuffer();
        pos--;
        state = 0 /* static */;
      }
    } else if (state === 2 /* regexp */) {
      if (c === ")") {
        if (buffer === ".*") {
          currentTreeRouteParam.isSplat = true;
        }
        state = 3 /* modifier */;
      } else {
        buffer += c;
      }
    } else if (state === 3 /* modifier */) {
      if (IS_MODIFIER_RE.test(c)) {
        currentTreeRouteParam.modifier = c;
        currentTreeRouteParam.optional = c === "?" || c === "*";
        currentTreeRouteParam.repeatable = c === "+" || c === "*";
      } else {
        pos--;
      }
      consumeBuffer();
      state = 0 /* static */;
    }
  }
  if (state === 2 /* regexp */) {
    throw new Error(`Invalid segment: "${segment}"`);
  }
  if (buffer || // an empty finished regexp enters this state but must also be consumed
  state === 3 /* modifier */) {
    consumeBuffer();
  }
  return [
    // here the segment is already a valid path segment
    segment,
    params,
    subSegments
  ];
}
function createEmptyRouteParam() {
  return {
    paramName: "",
    modifier: "",
    optional: false,
    repeatable: false,
    isSplat: false
  };
}

// src/core/tree.ts
var TreeNode = class _TreeNode {
  /**
   * Creates a new tree node.
   *
   * @param options - TreeNodeOptions shared by all nodes
   * @param pathSegment - path segment of this node e.g. `users` or `:id`
   * @param parent
   */
  constructor(options, pathSegment, parent) {
    /**
     * children of the node
     */
    this.children = /* @__PURE__ */ new Map();
    /**
     * Should this page import the page info
     */
    this.hasDefinePage = false;
    this.options = options;
    this.parent = parent;
    this.value = createTreeNodeValue(
      pathSegment,
      parent == null ? void 0 : parent.value,
      options.treeNodeOptions || options.pathParser
    );
  }
  /**
   * Adds a path to the tree. `path` cannot start with a `/`.
   *
   * @param path - path segment to insert. **It must contain the file extension** this allows to
   * differentiate between folders and files.
   * @param filePath - file path, defaults to path for convenience and testing
   */
  insert(path, filePath = path) {
    const { tail, segment, viewName, isComponent } = splitFilePath(
      path,
      this.options
    );
    if (!this.children.has(segment)) {
      this.children.set(segment, new _TreeNode(this.options, segment, this));
    }
    const child = this.children.get(segment);
    if (isComponent) {
      child.value.components.set(viewName, filePath);
    }
    if (tail) {
      return child.insert(tail, filePath);
    }
    return child;
  }
  /**
   * Adds a path that has already been parsed to the tree. `path` cannot start with a `/`. This method is similar to
   * `insert` but the path argument should be already parsed. e.g. `users/:id` for a file named `users/[id].vue`.
   *
   * @param path - path segment to insert, already parsed (e.g. users/:id)
   * @param filePath - file path, defaults to path for convenience and testing
   */
  insertParsedPath(path, filePath = path) {
    const isComponent = true;
    const node = new _TreeNode(
      __spreadProps(__spreadValues({}, this.options), {
        // force the format to raw
        treeNodeOptions: __spreadProps(__spreadValues({}, this.options.pathParser), {
          format: "path"
        })
      }),
      path,
      this
    );
    this.children.set(path, node);
    if (isComponent) {
      node.value.components.set("default", filePath);
    }
    return node;
  }
  /**
   * Saves a custom route block for a specific file path. The file path is used as a key. Some special file paths will
   * have a lower or higher priority.
   *
   * @param filePath - file path where the custom block is located
   * @param routeBlock - custom block to set
   */
  setCustomRouteBlock(filePath, routeBlock) {
    this.value.setOverride(filePath, routeBlock);
  }
  getSortedChildren() {
    return Array.from(this.children.values()).sort(
      (a, b) => a.path.localeCompare(b.path)
    );
  }
  /**
   * Delete and detach itself from the tree.
   */
  delete() {
    if (!this.parent) {
      throw new Error("Cannot delete the root node.");
    }
    this.parent.children.delete(this.value.rawSegment);
    this.parent = void 0;
  }
  /**
   * Remove a route from the tree. The path shouldn't start with a `/` but it can be a nested one. e.g. `foo/bar.vue`.
   * The `path` should be relative to the page folder.
   *
   * @param path - path segment of the file
   */
  remove(path) {
    const { tail, segment, viewName, isComponent } = splitFilePath(
      path,
      this.options
    );
    const child = this.children.get(segment);
    if (!child) {
      throw new Error(
        `Cannot Delete "${path}". "${segment}" not found at "${this.path}".`
      );
    }
    if (tail) {
      child.remove(tail);
      if (child.children.size === 0 && child.value.components.size === 0) {
        this.children.delete(segment);
      }
    } else {
      if (isComponent) {
        child.value.components.delete(viewName);
      }
      if (child.children.size === 0 && child.value.components.size === 0) {
        this.children.delete(segment);
      }
    }
  }
  /**
   * Returns the route path of the node without parent paths. If the path was overridden, it returns the override.
   */
  get path() {
    var _a, _b;
    return (_b = this.value.overrides.path) != null ? _b : (((_a = this.parent) == null ? void 0 : _a.isRoot()) ? "/" : "") + this.value.pathSegment;
  }
  /**
   * Returns the route path of the node including parent paths.
   */
  get fullPath() {
    var _a;
    return (_a = this.value.overrides.path) != null ? _a : this.value.path;
  }
  /**
   * Returns the route name of the node. If the name was overridden, it returns the override.
   */
  get name() {
    return this.value.overrides.name || this.options.getRouteName(this);
  }
  /**
   * Returns the meta property as an object.
   */
  get metaAsObject() {
    const meta = __spreadValues({}, this.value.overrides.meta);
    if (this.value.includeLoaderGuard) {
      meta._loaderGuard = true;
    }
    return meta;
  }
  /**
   * Returns the JSON string of the meta object of the node. If the meta was overridden, it returns the override. If
   * there is no override, it returns an empty string.
   */
  get meta() {
    const overrideMeta = this.metaAsObject;
    return Object.keys(overrideMeta).length > 0 ? JSON.stringify(overrideMeta, null, 2) : "";
  }
  get params() {
    const params = this.value.isParam() ? [...this.value.params] : [];
    let node = this.parent;
    while (node) {
      if (node.value.isParam()) {
        params.unshift(...node.value.params);
      }
      node = node.parent;
    }
    return params;
  }
  /**
   * Returns wether this tree node is the root node of the tree.
   *
   * @returns true if the node is the root node
   */
  isRoot() {
    return this.value.path === "/" && !this.value.components.size;
  }
  toString() {
    return `${this.value}${// either we have multiple names
    this.value.components.size > 1 || // or we have one name and it's not default
    this.value.components.size === 1 && !this.value.components.get("default") ? ` \u2388(${Array.from(this.value.components.keys()).join(", ")})` : ""}${this.hasDefinePage ? " \u2691 definePage()" : ""}`;
  }
};
var PrefixTree = class extends TreeNode {
  constructor(options) {
    super(options, "");
    this.map = /* @__PURE__ */ new Map();
  }
  insert(path, filePath = path) {
    const node = super.insert(path, filePath);
    this.map.set(filePath, node);
    return node;
  }
  /**
   * Returns the tree node of the given file path.
   *
   * @param filePath - file path of the tree node to get
   */
  getChild(filePath) {
    return this.map.get(filePath);
  }
  /**
   * Removes the tree node of the given file path.
   *
   * @param filePath - file path of the tree node to remove
   */
  removeChild(filePath) {
    if (this.map.has(filePath)) {
      this.map.get(filePath).delete();
      this.map.delete(filePath);
    }
  }
};
function createPrefixTree(options) {
  return new PrefixTree(options);
}
function splitFilePath(filePath, options) {
  const slashPos = filePath.indexOf("/");
  let head = slashPos < 0 ? filePath : filePath.slice(0, slashPos);
  const tail = slashPos < 0 ? "" : filePath.slice(slashPos + 1);
  let segment = head;
  if (!tail) {
    segment = trimExtension(head, options.extensions);
  }
  let viewName = "default";
  const namedSeparatorPos = segment.indexOf("@");
  if (namedSeparatorPos > 0) {
    viewName = segment.slice(namedSeparatorPos + 1);
    segment = segment.slice(0, namedSeparatorPos);
  }
  const isComponent = segment !== head;
  return {
    segment,
    tail,
    viewName,
    isComponent
  };
}

// src/core/context.ts
var import_fs3 = require("fs");

// src/codegen/generateRouteParams.ts
function generateRouteParams(node, isRaw) {
  const nodeParams = node.params;
  return node.params.length > 0 ? `{ ${node.params.map(
    (param) => `${param.paramName}${param.optional ? "?" : ""}: ` + (param.modifier === "+" ? `ParamValueOneOrMore<${isRaw}>` : param.modifier === "*" ? `ParamValueZeroOrMore<${isRaw}>` : param.modifier === "?" ? `ParamValueZeroOrOne<${isRaw}>` : `ParamValue<${isRaw}>`)
  ).join(", ")} }` : (
    // no params allowed
    "Record<never, never>"
  );
}

// src/codegen/generateRouteMap.ts
function generateRouteNamedMap(node) {
  if (node.isRoot()) {
    return `export interface RouteNamedMap {
${node.getSortedChildren().map(generateRouteNamedMap).join("")}}`;
  }
  return (
    // if the node has a filePath, it's a component, it has a routeName and it should be referenced in the RouteNamedMap
    // otherwise it should be skipped to avoid navigating to a route that doesn't render anything
    (node.value.components.size ? `  '${node.name}': ${generateRouteRecordInfo(node)},
` : "") + (node.children.size > 0 ? node.getSortedChildren().map(generateRouteNamedMap).join("\n") : "")
  );
}
function generateRouteRecordInfo(node) {
  return `RouteRecordInfo<'${node.name}', '${node.fullPath}', ${generateRouteParams(node, true)}, ${generateRouteParams(node, false)}>`;
}

// src/core/moduleConstants.ts
var MODULE_VUE_ROUTER = "vue-router/auto";
var MODULE_ROUTES_PATH = `${MODULE_VUE_ROUTER}/routes`;
var VIRTUAL_PREFIX = "virtual:";
var ROUTE_BLOCK_ID = `${VIRTUAL_PREFIX}/vue-router/auto/route-block`;
function getVirtualId(id) {
  return id.startsWith(VIRTUAL_PREFIX) ? id.slice(VIRTUAL_PREFIX.length) : null;
}
var routeBlockQueryRE = /\?vue&type=route/;
function asVirtualId(id) {
  return VIRTUAL_PREFIX + id;
}

// src/codegen/generateRouteRecords.ts
function generateRouteRecord(node, options, importsMap, indent = 0) {
  if (node.value.path === "/" && indent === 0) {
    return `[
${node.getSortedChildren().map((child) => generateRouteRecord(child, options, importsMap, indent + 1)).join(",\n")}
]`;
  }
  const startIndent = " ".repeat(indent * 2);
  const indentStr = " ".repeat((indent + 1) * 2);
  const overrides = node.value.overrides;
  const routeRecord = `${startIndent}{
${indentStr}path: '${node.path}',
${indentStr}${node.value.components.size ? `name: '${node.name}',` : `/* internal name: '${node.name}' */`}
${// component
  indentStr}${node.value.components.size ? generateRouteRecordComponent(
    node,
    indentStr,
    options.importMode,
    importsMap
  ) : "/* no component */"}
${overrides.props != null ? indentStr + `props: ${overrides.props},
` : ""}${overrides.alias != null ? indentStr + `alias: ${JSON.stringify(overrides.alias)},
` : ""}${// children
  indentStr}${node.children.size > 0 ? `children: [
${node.getSortedChildren().map((child) => generateRouteRecord(child, options, importsMap, indent + 2)).join(",\n")}
${indentStr}],` : "/* no children */"}${formatMeta(node, indentStr)}
${startIndent}}`;
  if (node.hasDefinePage) {
    const definePageDataList = [];
    for (const [name, filePath] of node.value.components) {
      const pageDataImport = `_definePage_${name}_${importsMap.size}`;
      definePageDataList.push(pageDataImport);
      importsMap.addDefault(`${filePath}?definePage&vue`, pageDataImport);
    }
    if (definePageDataList.length) {
      importsMap.add("unplugin-vue-router/runtime", "_mergeRouteRecord");
      return `  _mergeRouteRecord(
${routeRecord},
  ${definePageDataList.join(",\n")}
  )`;
    }
  }
  return routeRecord;
}
function generateRouteRecordComponent(node, indentStr, importMode, importsMap) {
  const files = Array.from(node.value.components);
  const isDefaultExport = files.length === 1 && files[0][0] === "default";
  return isDefaultExport ? `component: ${generatePageImport(files[0][1], importMode, importsMap)},` : (
    // files has at least one entry
    `components: {
${files.map(
      ([key, path]) => `${indentStr + "  "}'${key}': ${generatePageImport(
        path,
        importMode,
        importsMap
      )}`
    ).join(",\n")}
${indentStr}},`
  );
}
function generatePageImport(filepath, importMode, importsMap) {
  const mode = typeof importMode === "function" ? importMode(filepath) : importMode;
  if (mode === "async") {
    return `() => import('${filepath}')`;
  } else {
    const importName = `_page_${importsMap.size}`;
    importsMap.addDefault(filepath, importName);
    return importName;
  }
}
function generateImportList(node, indentStr) {
  const files = Array.from(node.value.components);
  return `[
${files.map(([_key, path]) => `${indentStr}  () => import('${path}')`).join(",\n")}
${indentStr}]`;
}
var LOADER_GUARD_RE = /['"]_loaderGuard['"]:.*$/;
function formatMeta(node, indent) {
  const meta = node.meta;
  const formatted = meta && meta.split("\n").map(
    (line) => indent + line.replace(
      LOADER_GUARD_RE,
      "[_HasDataLoaderMeta]: " + generateImportList(node, indent + "  ") + ","
    )
  ).join("\n");
  return formatted ? "\n" + indent + "meta: " + formatted.trimStart() : "";
}

// src/core/context.ts
var import_fast_glob = __toESM(require("fast-glob"));
var import_pathe2 = require("pathe");

// src/core/customBlock.ts
var import_compiler_sfc = require("@vue/compiler-sfc");
var import_fs = require("fs");
var import_json5 = __toESM(require("json5"));
var import_yaml = require("yaml");
async function getRouteBlock(path, options) {
  const content = await import_fs.promises.readFile(path, "utf8");
  const parsedSFC = await (0, import_compiler_sfc.parse)(content, { pad: "space" }).descriptor;
  const blockStr = parsedSFC == null ? void 0 : parsedSFC.customBlocks.find((b) => b.type === "route");
  if (!blockStr)
    return;
  let result = parseCustomBlock(blockStr, path, options);
  if (result) {
    if (result.path != null && !result.path.startsWith("/")) {
      warn(`Overridden path must start with "/". Found in "${path}".`);
    }
  }
  return result;
}
function parseCustomBlock(block, filePath, options) {
  var _a;
  const lang = (_a = block.lang) != null ? _a : options.routeBlockLang;
  if (lang === "json5") {
    try {
      return import_json5.default.parse(block.content);
    } catch (err) {
      warn(
        `Invalid JSON5 format of <${block.type}> content in ${filePath}
${err.message}`
      );
    }
  } else if (lang === "json") {
    try {
      return JSON.parse(block.content);
    } catch (err) {
      warn(
        `Invalid JSON format of <${block.type}> content in ${filePath}
${err.message}`
      );
    }
  } else if (lang === "yaml" || lang === "yml") {
    try {
      return (0, import_yaml.parse)(block.content);
    } catch (err) {
      warn(
        `Invalid YAML format of <${block.type}> content in ${filePath}
${err.message}`
      );
    }
  } else {
    warn(
      `Language "${lang}" for <${block.type}> is not supported. Supported languages are: json5, json, yaml, yml. Found in in ${filePath}.`
    );
  }
}

// src/core/RoutesFolderWatcher.ts
var import_chokidar = __toESM(require("chokidar"));
var import_pathe = require("pathe");
var RoutesFolderWatcher = class {
  constructor(folderOptions) {
    this.src = folderOptions.src;
    this.path = folderOptions.path;
    this.exclude = folderOptions.exclude;
    this.extensions = folderOptions.extensions;
    this.filePatterns = folderOptions.filePatterns;
    this.watcher = import_chokidar.default.watch(folderOptions.pattern, {
      cwd: this.src,
      ignoreInitial: true,
      // disableGlobbing: true,
      ignorePermissionErrors: true,
      ignored: this.exclude
      // useFsEvents: true,
      // TODO: allow user options
    });
  }
  on(event, handler) {
    this.watcher.on(event, (filePath) => {
      if (this.extensions.every((extension) => !filePath.endsWith(extension))) {
        return;
      }
      filePath = (0, import_pathe.resolve)(this.src, filePath);
      handler({
        filePath,
        routePath: asRoutePath({ src: this.src, path: this.path }, filePath)
      });
    });
    return this;
  }
  close() {
    this.watcher.close();
  }
};
function resolveFolderOptions(globalOptions, folderOptions) {
  const extensions = overrideOption(
    globalOptions.extensions,
    folderOptions.extensions
  );
  const filePatterns = overrideOption(
    globalOptions.filePatterns,
    folderOptions.filePatterns
  );
  return {
    src: folderOptions.src,
    pattern: appendExtensionListToPattern(
      filePatterns,
      // also override the extensions if the folder has a custom extensions
      extensions
    ),
    path: folderOptions.path || "",
    extensions,
    filePatterns,
    exclude: overrideOption(globalOptions.exclude, folderOptions.exclude).map(
      (p) => p.startsWith("**") ? p : (0, import_pathe.resolve)(p)
    )
  };
}
function overrideOption(existing, newValue) {
  const asArray = typeof existing === "string" ? [existing] : existing;
  if (typeof newValue === "function") {
    return newValue(asArray);
  }
  if (typeof newValue !== "undefined") {
    return typeof newValue === "string" ? [newValue] : newValue;
  }
  return asArray;
}

// src/codegen/generateDTS.ts
function generateDTS({
  vueRouterModule,
  routesModule,
  routeNamedMap
}) {
  return `/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. \u203C\uFE0F DO NOT MODIFY THIS FILE \u203C\uFE0F
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

/// <reference types="unplugin-vue-router/client" />

import type {
  // type safe route locations
  RouteLocationTypedList,
  RouteLocationResolvedTypedList,
  RouteLocationNormalizedTypedList,
  RouteLocationNormalizedLoadedTypedList,
  RouteLocationAsString,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsPathTypedList,

  // helper types
  // route definitions
  RouteRecordInfo,
  ParamValue,
  ParamValueOneOrMore,
  ParamValueZeroOrMore,
  ParamValueZeroOrOne,

  // vue-router extensions
  _RouterTyped,
  RouterLinkTyped,
  RouterLinkPropsTyped,
  NavigationGuard,
  UseLinkFnTyped,

  // data fetching
  _DataLoader,
  _DefineLoaderOptions,
} from 'unplugin-vue-router/types'

declare module '${routesModule}' {
${routeNamedMap}
}

declare module '${vueRouterModule}' {
  import type { RouteNamedMap } from '${routesModule}'

  export type RouterTyped = _RouterTyped<RouteNamedMap>

  /**
   * Type safe version of \`RouteLocationNormalized\` (the type of \`to\` and \`from\` in navigation guards).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalized<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of \`RouteLocationNormalizedLoaded\` (the return type of \`useRoute()\`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalizedLoaded<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of \`RouteLocationResolved\` (the returned route of \`router.resolve()\`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationResolved<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationResolvedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of \`RouteLocation\` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocation<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of \`RouteLocationRaw\` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationRaw<Name extends keyof RouteNamedMap = keyof RouteNamedMap> =
    | RouteLocationAsString<RouteNamedMap>
    | RouteLocationAsRelativeTypedList<RouteNamedMap>[Name]
    | RouteLocationAsPathTypedList<RouteNamedMap>[Name]

  /**
   * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParams<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['params']
  /**
   * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParamsRaw<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['paramsRaw']

  export function useRouter(): RouterTyped
  export function useRoute<Name extends keyof RouteNamedMap = keyof RouteNamedMap>(name?: Name): RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  export const useLink: UseLinkFnTyped<RouteNamedMap>

  export function onBeforeRouteLeave(guard: NavigationGuard<RouteNamedMap>): void
  export function onBeforeRouteUpdate(guard: NavigationGuard<RouteNamedMap>): void

  export const RouterLink: RouterLinkTyped<RouteNamedMap>
  export const RouterLinkProps: RouterLinkPropsTyped<RouteNamedMap>

  // Experimental Data Fetching

  export function defineLoader<
    P extends Promise<any>,
    Name extends keyof RouteNamedMap = keyof RouteNamedMap,
    isLazy extends boolean = false,
  >(
    name: Name,
    loader: (route: RouteLocationNormalizedLoaded<Name>) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>
  export function defineLoader<
    P extends Promise<any>,
    isLazy extends boolean = false,
  >(
    loader: (route: RouteLocationNormalizedLoaded) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>

  export {
    _definePage as definePage,
    _HasDataLoaderMeta as HasDataLoaderMeta,
    _setupDataFetchingGuard as setupDataFetchingGuard,
    _stopDataFetchingScope as stopDataFetchingScope,
  } from 'unplugin-vue-router/runtime'
}

declare module 'vue-router' {
  import type { RouteNamedMap } from '${routesModule}'

  export interface TypesConfig {
    beforeRouteUpdate: NavigationGuard<RouteNamedMap>
    beforeRouteLeave: NavigationGuard<RouteNamedMap>

    $route: RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[keyof RouteNamedMap]
    $router: _RouterTyped<RouteNamedMap>

    RouterLink: RouterLinkTyped<RouteNamedMap>
  }
}
`;
}

// src/codegen/vueRouterModule.ts
function generateVueRouterProxy(routesModule, options) {
  return `
import { routes } from '${routesModule}'
import { createRouter as _createRouter } from 'vue-router'

export * from 'vue-router'
export {
  _defineLoader as defineLoader,
  _definePage as definePage,
  _HasDataLoaderMeta as HasDataLoaderMeta,
  _setupDataFetchingGuard as setupDataFetchingGuard,
  _stopDataFetchingScope as stopDataFetchingScope,
} from 'unplugin-vue-router/runtime'

export function createRouter(options) {
  const { extendRoutes } = options
  // use Object.assign for better browser support
  const router = _createRouter(Object.assign(
    options,
    { routes: typeof extendRoutes === 'function' ? extendRoutes(routes) : routes },
  ))

  return router
}
`;
}

// src/data-fetching/parse.ts
var import_fs2 = require("fs");
var import_mlly = require("mlly");
async function hasNamedExports(file) {
  const code = await import_fs2.promises.readFile(file, "utf8");
  const exportedNames = (0, import_mlly.findExports)(code).filter(
    (e) => e.type !== "default" && e.type !== "star"
  );
  return exportedNames.length > 0;
}

// src/core/definePage.ts
var import_common = require("@vue-macros/common");
var import_ast_walker_scope = require("ast-walker-scope");
var MACRO_DEFINE_PAGE = "definePage";
var MACRO_DEFINE_PAGE_QUERY = /[?&]definePage\b/;
function definePageTransform({
  code,
  id
}) {
  if (!code.includes(MACRO_DEFINE_PAGE))
    return;
  const sfc = (0, import_common.parseSFC)(code, id);
  if (!sfc.scriptSetup)
    return;
  const isExtractingDefinePage = MACRO_DEFINE_PAGE_QUERY.test(id);
  const { script, scriptSetup, getSetupAst } = sfc;
  const setupAst = getSetupAst();
  const definePageNodes = ((setupAst == null ? void 0 : setupAst.body) || []).map((node) => {
    if (node.type === "ExpressionStatement")
      node = node.expression;
    return (0, import_common.isCallOf)(node, MACRO_DEFINE_PAGE) ? node : null;
  }).filter((node) => !!node);
  if (!definePageNodes.length) {
    return isExtractingDefinePage ? (
      // e.g. index.vue?definePage that contains a commented `definePage()
      "export default {}"
    ) : (
      // e.g. index.vue that contains a commented `definePage()
      null
    );
  } else if (definePageNodes.length > 1) {
    throw new SyntaxError(`duplicate definePage() call`);
  }
  const definePageNode = definePageNodes[0];
  const setupOffset = scriptSetup.loc.start.offset;
  if (isExtractingDefinePage) {
    const s = new import_common.MagicString(code);
    const routeRecord = definePageNode.arguments[0];
    const scriptBindings = (setupAst == null ? void 0 : setupAst.body) ? getIdentifiers(setupAst.body) : [];
    (0, import_common.checkInvalidScopeReference)(routeRecord, MACRO_DEFINE_PAGE, scriptBindings);
    s.remove(setupOffset + routeRecord.end, code.length);
    s.remove(0, setupOffset + routeRecord.start);
    s.prepend(`export default `);
    return (0, import_common.getTransformResult)(s, id);
  } else {
    const s = new import_common.MagicString(code);
    s.remove(
      setupOffset + definePageNode.start,
      setupOffset + definePageNode.end
    );
    return (0, import_common.getTransformResult)(s, id);
  }
}
function extractDefinePageNameAndPath(sfcCode, id) {
  var _a;
  if (!sfcCode.includes(MACRO_DEFINE_PAGE))
    return;
  const sfc = (0, import_common.parseSFC)(sfcCode, id);
  if (!sfc.scriptSetup)
    return;
  const { getSetupAst } = sfc;
  const setupAst = getSetupAst();
  const definePageNodes = ((_a = setupAst == null ? void 0 : setupAst.body) != null ? _a : []).map((node) => {
    if (node.type === "ExpressionStatement")
      node = node.expression;
    return (0, import_common.isCallOf)(node, MACRO_DEFINE_PAGE) ? node : null;
  }).filter((node) => !!node);
  if (!definePageNodes.length) {
    return;
  } else if (definePageNodes.length > 1) {
    throw new SyntaxError(`duplicate definePage() call`);
  }
  const definePageNode = definePageNodes[0];
  const routeRecord = definePageNode.arguments[0];
  if (routeRecord.type !== "ObjectExpression") {
    throw new SyntaxError(
      `[${id}]: definePage() expects an object expression as its only argument`
    );
  }
  const routeInfo = {};
  for (const prop of routeRecord.properties) {
    if (prop.type === "ObjectProperty" && prop.key.type === "Identifier") {
      if (prop.key.name === "name") {
        if (prop.value.type !== "StringLiteral") {
          warn(`route name must be a string literal. Found in "${id}".`);
        } else {
          routeInfo.name = prop.value.value;
        }
      } else if (prop.key.name === "path") {
        if (prop.value.type !== "StringLiteral") {
          warn(`route path must be a string literal. Found in "${id}".`);
        } else {
          routeInfo.path = prop.value.value;
        }
      }
    }
  }
  return routeInfo;
}
var getIdentifiers = (stmts) => {
  let ids = [];
  (0, import_ast_walker_scope.walkAST)(
    {
      type: "Program",
      body: stmts,
      directives: [],
      sourceType: "module",
      sourceFile: ""
    },
    {
      enter(node) {
        if (node.type === "BlockStatement") {
          this.skip();
        }
      },
      leave(node) {
        if (node.type !== "Program")
          return;
        ids = Object.keys(this.scope);
      }
    }
  );
  return ids;
};

// src/core/extendRoutes.ts
var EditableTreeNode = class _EditableTreeNode {
  // private _parent?: EditableTreeNode
  constructor(node) {
    this.node = node;
  }
  /**
   * Remove and detach the current route node from the tree. Subsequently, its children will be removed as well.
   */
  delete() {
    return this.node.delete();
  }
  /**
   * Inserts a new route as a child of this route. This route cannot use `definePage()`. If it was meant to be included,
   * add it to the `routesFolder` option.
   *
   * @param path - path segment to insert. Note this is relative to the current route. It shouldn't start with `/` unless you want the route path to be absolute.
   * added at the root of the tree.
   * @param filePath - file path
   */
  insert(path, filePath) {
    let addBackLeadingSlash = false;
    if (path.startsWith("/")) {
      path = path.slice(1);
      addBackLeadingSlash = !this.node.isRoot();
    }
    const node = this.node.insertParsedPath(path, filePath);
    const editable = new _EditableTreeNode(node);
    if (addBackLeadingSlash) {
      editable.path = "/" + node.path;
    }
    return editable;
  }
  /**
   * Get an editable version of the parent node if it exists.
   */
  get parent() {
    return this.node.parent && new _EditableTreeNode(this.node.parent);
  }
  /**
   * Return a Map of the files associated to the current route. The key of the map represents the name of the view (Vue
   * Router feature) while the value is the file path. By default, the name of the view is `default`.
   */
  get components() {
    return this.node.value.components;
  }
  /**
   * Name of the route. Note that **all routes are named** but when the final `routes` array is generated, routes
   * without a `component` will not include their `name` property to avoid accidentally navigating to them and display
   * nothing. {@see isPassThrough}
   */
  get name() {
    return this.node.name;
  }
  /**
   * Override the name of the route.
   */
  set name(name) {
    this.node.value.addEditOverride({ name });
  }
  /**
   * Whether the route is a pass-through route. A pass-through route is a route that does not have a component and is
   * used to group other routes under the same prefix `path` and/or `meta` properties.
   */
  get isPassThrough() {
    return this.node.value.components.size === 0;
  }
  /**
   * Meta property of the route as an object. Note this property is readonly and will be serialized as JSON. It won't contain the meta properties defined with `definePage()` as it could contain expressions **but it does contain the meta properties defined with `<route>` blocks**.
   */
  get meta() {
    return this.node.metaAsObject;
  }
  /**
   * Override the meta property of the route. This will discard any other meta property defined with `<route>` blocks or
   * through other means.
   */
  set meta(meta) {
    this.node.value.removeOverride("meta");
    this.node.value.setEditOverride("meta", meta);
  }
  /**
   * Add meta properties to the route keeping the existing ones. The passed object will be deeply merged with the
   * existing meta object if any. Note that the meta property is later on serialized as JSON so you can't pass functions
   * or any other non-serializable value.
   */
  addToMeta(meta) {
    this.node.value.addEditOverride({ meta });
  }
  /**
   * Path of the route without parent paths.
   */
  get path() {
    return this.node.path;
  }
  /**
   * Override the path of the route. You must ensure `params` match with the existing path.
   */
  set path(path) {
    if (!path.startsWith("/")) {
      warn(
        `Only absolute paths are supported. Make sure that "${path}" starts with a slash "/".`
      );
      return;
    }
    this.node.value.addEditOverride({ path });
  }
  /**
   * Alias of the route.
   */
  get alias() {
    return this.node.value.overrides.alias;
  }
  /**
   * Add an alias to the route.
   *
   * @param alias - Alias to add to the route
   */
  addAlias(alias) {
    this.node.value.addEditOverride({ alias });
  }
  /**
   * Array of the route params and all of its parent's params.
   */
  get params() {
    return this.node.params;
  }
  /**
   * Path of the route including parent paths.
   */
  get fullPath() {
    return this.node.fullPath;
  }
  /**
   * Computes an array of EditableTreeNode from the current node. Differently from iterating over the tree, this method
   * **only returns direct children**.
   */
  get children() {
    return [...this.node.children.values()].map(
      (node) => new _EditableTreeNode(node)
    );
  }
  /**
   * DFS traversal of the tree.
   * @example
   * ```ts
   * for (const node of tree) {
   *   // ...
   * }
   * ```
   */
  *traverseDFS() {
    if (!this.node.isRoot()) {
      yield this;
    }
    for (const [_name, child] of this.node.children) {
      yield* __yieldStar(new _EditableTreeNode(child).traverseDFS());
    }
  }
  *[Symbol.iterator]() {
    yield* __yieldStar(this.traverseBFS());
  }
  /**
   * BFS traversal of the tree as a generator.
   *
   * @example
   * ```ts
   * for (const node of tree) {
   *   // ...
   * }
   * ```
   */
  *traverseBFS() {
    for (const [_name, child] of this.node.children) {
      yield new _EditableTreeNode(child);
    }
    for (const [_name, child] of this.node.children) {
      yield* __yieldStar(new _EditableTreeNode(child).traverseBFS());
    }
  }
};

// src/core/context.ts
function createRoutesContext(options) {
  const { dts: preferDTS, root, routesFolder } = options;
  const dts = preferDTS === false ? false : preferDTS === true ? (0, import_pathe2.resolve)(root, "typed-router.d.ts") : (0, import_pathe2.resolve)(root, preferDTS);
  const routeTree = new PrefixTree(options);
  const editableRoutes = new EditableTreeNode(routeTree);
  function log(...args) {
    if (options.logs) {
      console.log(...args);
    }
  }
  const watchers = [];
  async function scanPages(startWatchers = true) {
    var _a;
    if (options.extensions.length < 1) {
      throw new Error(
        '"extensions" cannot be empty. Please specify at least one extension.'
      );
    }
    if (watchers.length > 0) {
      return;
    }
    await Promise.all(
      routesFolder.map((folder) => resolveFolderOptions(options, folder)).map((folder) => {
        if (startWatchers) {
          watchers.push(setupWatcher(new RoutesFolderWatcher(folder)));
        }
        const ignorePattern = folder.exclude.map(
          (f) => (
            // if it starts with ** then it will work as expected
            f.startsWith("**") ? f : (0, import_pathe2.relative)(folder.src, f)
          )
        );
        return (0, import_fast_glob.default)(folder.pattern, {
          cwd: folder.src,
          // TODO: do they return the symbolic link path or the original file?
          // followSymbolicLinks: false,
          ignore: ignorePattern
        }).then(
          (files) => Promise.all(
            files.map((file) => (0, import_pathe2.resolve)(folder.src, file)).map(
              (file) => addPage({
                routePath: asRoutePath(folder, file),
                filePath: file
              })
            )
          )
        );
      })
    );
    for (const route of editableRoutes) {
      await ((_a = options.extendRoute) == null ? void 0 : _a.call(options, route));
    }
    await _writeConfigFiles();
  }
  async function writeRouteInfoToNode(node, filePath) {
    const content = await import_fs3.promises.readFile(filePath, "utf8");
    node.hasDefinePage = content.includes("definePage");
    const [definedPageNameAndPath, routeBlock] = await Promise.all([
      extractDefinePageNameAndPath(content, filePath),
      getRouteBlock(filePath, options)
    ]);
    node.setCustomRouteBlock(filePath, __spreadValues(__spreadValues({}, routeBlock), definedPageNameAndPath));
    node.value.includeLoaderGuard = options.dataFetching && await hasNamedExports(filePath);
  }
  async function addPage({ filePath, routePath }, triggerExtendRoute = false) {
    var _a;
    log(`added "${routePath}" for "${filePath}"`);
    const node = routeTree.insert(routePath, filePath);
    await writeRouteInfoToNode(node, filePath);
    if (triggerExtendRoute) {
      await ((_a = options.extendRoute) == null ? void 0 : _a.call(options, new EditableTreeNode(node)));
    }
  }
  async function updatePage({ filePath, routePath }) {
    var _a;
    log(`updated "${routePath}" for "${filePath}"`);
    const node = routeTree.getChild(filePath);
    if (!node) {
      console.warn(`Cannot update "${filePath}": Not found.`);
      return;
    }
    await writeRouteInfoToNode(node, filePath);
    await ((_a = options.extendRoute) == null ? void 0 : _a.call(options, new EditableTreeNode(node)));
  }
  function removePage({ filePath, routePath }) {
    log(`remove "${routePath}" for "${filePath}"`);
    routeTree.removeChild(filePath);
  }
  function setupWatcher(watcher) {
    log(`\u{1F916} Scanning files in ${watcher.src}`);
    return watcher.on("change", async (ctx) => {
      await updatePage(ctx);
      writeConfigFiles();
    }).on("add", async (ctx) => {
      await addPage(ctx, true);
      writeConfigFiles();
    }).on("unlink", async (ctx) => {
      await removePage(ctx);
      writeConfigFiles();
    });
  }
  function generateRoutes() {
    const importsMap = new ImportsMap();
    const routesExport = `export const routes = ${generateRouteRecord(
      routeTree,
      options,
      importsMap
    )}`;
    if (options.dataFetching) {
      importsMap.add("unplugin-vue-router/runtime", "_HasDataLoaderMeta");
    }
    let imports = `${importsMap}`;
    if (imports) {
      imports += "\n";
    }
    return `${imports}${routesExport}
`;
  }
  function generateDTS2() {
    return generateDTS({
      vueRouterModule: MODULE_VUE_ROUTER,
      routesModule: MODULE_ROUTES_PATH,
      routeNamedMap: generateRouteNamedMap(routeTree).split("\n").filter((line) => line).map((line) => "  " + line).join("\n")
    });
  }
  function generateVueRouterProxy2() {
    return generateVueRouterProxy(MODULE_ROUTES_PATH, options);
  }
  let lastDTS;
  async function _writeConfigFiles() {
    log("\u{1F4BE} writing...");
    if (options.beforeWriteFiles) {
      await options.beforeWriteFiles(editableRoutes);
    }
    logTree(routeTree, log);
    if (dts) {
      const content = generateDTS2();
      if (lastDTS !== content) {
        await import_fs3.promises.writeFile(dts, content, "utf-8");
        lastDTS = content;
        server == null ? void 0 : server.invalidate(MODULE_ROUTES_PATH);
        server == null ? void 0 : server.invalidate(MODULE_VUE_ROUTER);
        server == null ? void 0 : server.reload();
      }
    }
  }
  const writeConfigFiles = throttle(_writeConfigFiles, 500, 100);
  function stopWatcher() {
    if (watchers.length) {
      if (options.logs) {
        console.log("\u{1F6D1} stopping watcher");
      }
      watchers.forEach((watcher) => watcher.close());
    }
  }
  let server;
  function setServerContext(_server) {
    server = _server;
  }
  return {
    scanPages,
    writeConfigFiles,
    setServerContext,
    stopWatcher,
    generateRoutes,
    generateVueRouterProxy: generateVueRouterProxy2,
    definePageTransform(code, id) {
      return definePageTransform({
        code,
        id
      });
    }
  };
}

// src/options.ts
var import_local_pkg = require("local-pkg");
var import_pathe3 = require("pathe");
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
  dts: (0, import_local_pkg.isPackageExists)("typescript"),
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
    src: (0, import_pathe3.resolve)(root, routeOption.src)
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

// src/core/vite/index.ts
function createViteContext(server) {
  function invalidate(path) {
    const { moduleGraph } = server;
    const foundModule = moduleGraph.getModuleById(asVirtualId(path));
    if (foundModule) {
      moduleGraph.invalidateModule(foundModule);
    }
    return !!foundModule;
  }
  function reload() {
    if (server.ws) {
      server.ws.send({
        type: "full-reload",
        path: "*"
      });
    }
  }
  return {
    invalidate,
    reload
  };
}

// src/index.ts
var import_pluginutils = require("@rollup/pluginutils");
var import_pathe4 = require("pathe");
var src_default = (0, import_unplugin.createUnplugin)((opt = {}, meta) => {
  const options = resolveOptions(opt);
  const ctx = createRoutesContext(options);
  function getVirtualId2(id) {
    if (options._inspect)
      return id;
    return getVirtualId(id);
  }
  function asVirtualId2(id) {
    if (options._inspect)
      return id;
    return asVirtualId(id);
  }
  const pageFilePattern = `**/*` + (options.extensions.length === 1 ? options.extensions[0] : `.{${options.extensions.map((extension) => extension.replace(".", "")).join(",")}}`);
  const filterPageComponents = (0, import_pluginutils.createFilter)(
    [
      ...options.routesFolder.map(
        (routeOption) => (0, import_pathe4.join)(routeOption.src, pageFilePattern)
      ),
      // importing the definePage block
      /definePage\&vue$/
    ],
    options.exclude
  );
  return {
    name: "unplugin-vue-router",
    enforce: "pre",
    resolveId(id) {
      if (id === MODULE_ROUTES_PATH) {
        return asVirtualId2(id);
      }
      if (id === MODULE_VUE_ROUTER) {
        return asVirtualId2(id);
      }
      if (routeBlockQueryRE.test(id)) {
        return ROUTE_BLOCK_ID;
      }
    },
    buildStart() {
      return ctx.scanPages(true);
    },
    buildEnd() {
      ctx.stopWatcher();
    },
    // we only need to transform page components
    transformInclude(id) {
      return filterPageComponents(id);
    },
    transform(code, id) {
      return ctx.definePageTransform(code, id);
    },
    // loadInclude is necessary for webpack
    loadInclude(id) {
      if (id === ROUTE_BLOCK_ID)
        return true;
      const resolvedId = getVirtualId2(id);
      return resolvedId === MODULE_ROUTES_PATH || resolvedId === MODULE_VUE_ROUTER;
    },
    load(id) {
      if (id === ROUTE_BLOCK_ID) {
        return {
          code: `export default {}`,
          map: null
        };
      }
      const resolvedId = getVirtualId2(id);
      if (resolvedId === MODULE_ROUTES_PATH) {
        return ctx.generateRoutes();
      }
      if (resolvedId === MODULE_VUE_ROUTER) {
        return ctx.generateVueRouterProxy();
      }
    },
    // improves DX
    vite: {
      configureServer(server) {
        ctx.setServerContext(createViteContext(server));
      }
    }
  };
});
var VueRouterExports = [
  "useRoute",
  "useRouter",
  "defineLoader",
  "onBeforeRouteUpdate",
  "onBeforeRouteLeave"
  // NOTE: the typing seems broken locally, so instead we export it directly from unplugin-vue-router/runtime
  // 'definePage',
];
var VueRouterAutoImports = {
  "vue-router/auto": VueRouterExports,
  "unplugin-vue-router/runtime": [["_definePage", "definePage"]]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_OPTIONS,
  EditableTreeNode,
  VueRouterAutoImports,
  VueRouterExports,
  createPrefixTree,
  createRoutesContext,
  createTreeNodeValue,
  getFileBasedRouteName,
  getPascalCaseRouteName
});
