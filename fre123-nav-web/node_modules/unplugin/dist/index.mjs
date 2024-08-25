// node_modules/.pnpm/tsup@8.0.1_typescript@5.3.3/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/esbuild/index.ts
import fs2 from "fs";
import path3 from "path";

// src/esbuild/utils.ts
import fs from "fs";
import path2 from "path";
import { Buffer as Buffer2 } from "buffer";

// node_modules/.pnpm/@jridgewell+sourcemap-codec@1.4.14/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
var comma = ",".charCodeAt(0);
var semicolon = ";".charCodeAt(0);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i2 = 0; i2 < chars.length; i2++) {
  const c = chars.charCodeAt(i2);
  intToChar[i2] = c;
  charToInt[c] = i2;
}
var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
  decode(buf) {
    const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
    return out.toString();
  }
} : {
  decode(buf) {
    let out = "";
    for (let i2 = 0; i2 < buf.length; i2++) {
      out += String.fromCharCode(buf[i2]);
    }
    return out;
  }
};
function decode(mappings) {
  const state = new Int32Array(5);
  const decoded = [];
  let index = 0;
  do {
    const semi = indexOf(mappings, index);
    const line = [];
    let sorted = true;
    let lastCol = 0;
    state[0] = 0;
    for (let i2 = index; i2 < semi; i2++) {
      let seg;
      i2 = decodeInteger(mappings, i2, state, 0);
      const col = state[0];
      if (col < lastCol)
        sorted = false;
      lastCol = col;
      if (hasMoreVlq(mappings, i2, semi)) {
        i2 = decodeInteger(mappings, i2, state, 1);
        i2 = decodeInteger(mappings, i2, state, 2);
        i2 = decodeInteger(mappings, i2, state, 3);
        if (hasMoreVlq(mappings, i2, semi)) {
          i2 = decodeInteger(mappings, i2, state, 4);
          seg = [col, state[1], state[2], state[3], state[4]];
        } else {
          seg = [col, state[1], state[2], state[3]];
        }
      } else {
        seg = [col];
      }
      line.push(seg);
    }
    if (!sorted)
      sort(line);
    decoded.push(line);
    index = semi + 1;
  } while (index <= mappings.length);
  return decoded;
}
function indexOf(mappings, index) {
  const idx = mappings.indexOf(";", index);
  return idx === -1 ? mappings.length : idx;
}
function decodeInteger(mappings, pos, state, j) {
  let value = 0;
  let shift = 0;
  let integer = 0;
  do {
    const c = mappings.charCodeAt(pos++);
    integer = charToInt[c];
    value |= (integer & 31) << shift;
    shift += 5;
  } while (integer & 32);
  const shouldNegate = value & 1;
  value >>>= 1;
  if (shouldNegate) {
    value = -2147483648 | -value;
  }
  state[j] += value;
  return pos;
}
function hasMoreVlq(mappings, i2, length) {
  if (i2 >= length)
    return false;
  return mappings.charCodeAt(i2) !== comma;
}
function sort(line) {
  line.sort(sortComparator);
}
function sortComparator(a, b) {
  return a[0] - b[0];
}
function encode(decoded) {
  const state = new Int32Array(5);
  const bufLength = 1024 * 16;
  const subLength = bufLength - 36;
  const buf = new Uint8Array(bufLength);
  const sub = buf.subarray(0, subLength);
  let pos = 0;
  let out = "";
  for (let i2 = 0; i2 < decoded.length; i2++) {
    const line = decoded[i2];
    if (i2 > 0) {
      if (pos === bufLength) {
        out += td.decode(buf);
        pos = 0;
      }
      buf[pos++] = semicolon;
    }
    if (line.length === 0)
      continue;
    state[0] = 0;
    for (let j = 0; j < line.length; j++) {
      const segment = line[j];
      if (pos > subLength) {
        out += td.decode(sub);
        buf.copyWithin(0, subLength, pos);
        pos -= subLength;
      }
      if (j > 0)
        buf[pos++] = comma;
      pos = encodeInteger(buf, pos, state, segment, 0);
      if (segment.length === 1)
        continue;
      pos = encodeInteger(buf, pos, state, segment, 1);
      pos = encodeInteger(buf, pos, state, segment, 2);
      pos = encodeInteger(buf, pos, state, segment, 3);
      if (segment.length === 4)
        continue;
      pos = encodeInteger(buf, pos, state, segment, 4);
    }
  }
  return out + td.decode(buf.subarray(0, pos));
}
function encodeInteger(buf, pos, state, segment, j) {
  const next = segment[j];
  let num = next - state[j];
  state[j] = next;
  num = num < 0 ? -num << 1 | 1 : num << 1;
  do {
    let clamped = num & 31;
    num >>>= 5;
    if (num > 0)
      clamped |= 32;
    buf[pos++] = intToChar[clamped];
  } while (num > 0);
  return pos;
}

// node_modules/.pnpm/@jridgewell+resolve-uri@3.1.0/node_modules/@jridgewell/resolve-uri/dist/resolve-uri.mjs
var schemeRegex = /^[\w+.-]+:\/\//;
var urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
var fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
var UrlType;
(function(UrlType2) {
  UrlType2[UrlType2["Empty"] = 1] = "Empty";
  UrlType2[UrlType2["Hash"] = 2] = "Hash";
  UrlType2[UrlType2["Query"] = 3] = "Query";
  UrlType2[UrlType2["RelativePath"] = 4] = "RelativePath";
  UrlType2[UrlType2["AbsolutePath"] = 5] = "AbsolutePath";
  UrlType2[UrlType2["SchemeRelative"] = 6] = "SchemeRelative";
  UrlType2[UrlType2["Absolute"] = 7] = "Absolute";
})(UrlType || (UrlType = {}));
function isAbsoluteUrl(input) {
  return schemeRegex.test(input);
}
function isSchemeRelativeUrl(input) {
  return input.startsWith("//");
}
function isAbsolutePath(input) {
  return input.startsWith("/");
}
function isFileUrl(input) {
  return input.startsWith("file:");
}
function isRelative(input) {
  return /^[.?#]/.test(input);
}
function parseAbsoluteUrl(input) {
  const match = urlRegex.exec(input);
  return makeUrl(match[1], match[2] || "", match[3], match[4] || "", match[5] || "/", match[6] || "", match[7] || "");
}
function parseFileUrl(input) {
  const match = fileRegex.exec(input);
  const path4 = match[2];
  return makeUrl("file:", "", match[1] || "", "", isAbsolutePath(path4) ? path4 : "/" + path4, match[3] || "", match[4] || "");
}
function makeUrl(scheme, user, host, port, path4, query, hash) {
  return {
    scheme,
    user,
    host,
    port,
    path: path4,
    query,
    hash,
    type: UrlType.Absolute
  };
}
function parseUrl(input) {
  if (isSchemeRelativeUrl(input)) {
    const url2 = parseAbsoluteUrl("http:" + input);
    url2.scheme = "";
    url2.type = UrlType.SchemeRelative;
    return url2;
  }
  if (isAbsolutePath(input)) {
    const url2 = parseAbsoluteUrl("http://foo.com" + input);
    url2.scheme = "";
    url2.host = "";
    url2.type = UrlType.AbsolutePath;
    return url2;
  }
  if (isFileUrl(input))
    return parseFileUrl(input);
  if (isAbsoluteUrl(input))
    return parseAbsoluteUrl(input);
  const url = parseAbsoluteUrl("http://foo.com/" + input);
  url.scheme = "";
  url.host = "";
  url.type = input ? input.startsWith("?") ? UrlType.Query : input.startsWith("#") ? UrlType.Hash : UrlType.RelativePath : UrlType.Empty;
  return url;
}
function stripPathFilename(path4) {
  if (path4.endsWith("/.."))
    return path4;
  const index = path4.lastIndexOf("/");
  return path4.slice(0, index + 1);
}
function mergePaths(url, base) {
  normalizePath(base, base.type);
  if (url.path === "/") {
    url.path = base.path;
  } else {
    url.path = stripPathFilename(base.path) + url.path;
  }
}
function normalizePath(url, type) {
  const rel = type <= UrlType.RelativePath;
  const pieces = url.path.split("/");
  let pointer = 1;
  let positive = 0;
  let addTrailingSlash = false;
  for (let i2 = 1; i2 < pieces.length; i2++) {
    const piece = pieces[i2];
    if (!piece) {
      addTrailingSlash = true;
      continue;
    }
    addTrailingSlash = false;
    if (piece === ".")
      continue;
    if (piece === "..") {
      if (positive) {
        addTrailingSlash = true;
        positive--;
        pointer--;
      } else if (rel) {
        pieces[pointer++] = piece;
      }
      continue;
    }
    pieces[pointer++] = piece;
    positive++;
  }
  let path4 = "";
  for (let i2 = 1; i2 < pointer; i2++) {
    path4 += "/" + pieces[i2];
  }
  if (!path4 || addTrailingSlash && !path4.endsWith("/..")) {
    path4 += "/";
  }
  url.path = path4;
}
function resolve(input, base) {
  if (!input && !base)
    return "";
  const url = parseUrl(input);
  let inputType = url.type;
  if (base && inputType !== UrlType.Absolute) {
    const baseUrl = parseUrl(base);
    const baseType = baseUrl.type;
    switch (inputType) {
      case UrlType.Empty:
        url.hash = baseUrl.hash;
      case UrlType.Hash:
        url.query = baseUrl.query;
      case UrlType.Query:
      case UrlType.RelativePath:
        mergePaths(url, baseUrl);
      case UrlType.AbsolutePath:
        url.user = baseUrl.user;
        url.host = baseUrl.host;
        url.port = baseUrl.port;
      case UrlType.SchemeRelative:
        url.scheme = baseUrl.scheme;
    }
    if (baseType > inputType)
      inputType = baseType;
  }
  normalizePath(url, inputType);
  const queryHash = url.query + url.hash;
  switch (inputType) {
    case UrlType.Hash:
    case UrlType.Query:
      return queryHash;
    case UrlType.RelativePath: {
      const path4 = url.path.slice(1);
      if (!path4)
        return queryHash || ".";
      if (isRelative(base || input) && !isRelative(path4)) {
        return "./" + path4 + queryHash;
      }
      return path4 + queryHash;
    }
    case UrlType.AbsolutePath:
      return url.path + queryHash;
    default:
      return url.scheme + "//" + url.user + url.host + url.port + url.path + queryHash;
  }
}

// node_modules/.pnpm/@jridgewell+trace-mapping@0.3.17/node_modules/@jridgewell/trace-mapping/dist/trace-mapping.mjs
function resolve2(input, base) {
  if (base && !base.endsWith("/"))
    base += "/";
  return resolve(input, base);
}
function stripFilename(path4) {
  if (!path4)
    return "";
  const index = path4.lastIndexOf("/");
  return path4.slice(0, index + 1);
}
var COLUMN = 0;
var SOURCES_INDEX = 1;
var SOURCE_LINE = 2;
var SOURCE_COLUMN = 3;
var NAMES_INDEX = 4;
var REV_GENERATED_LINE = 1;
var REV_GENERATED_COLUMN = 2;
function maybeSort(mappings, owned) {
  const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
  if (unsortedIndex === mappings.length)
    return mappings;
  if (!owned)
    mappings = mappings.slice();
  for (let i2 = unsortedIndex; i2 < mappings.length; i2 = nextUnsortedSegmentLine(mappings, i2 + 1)) {
    mappings[i2] = sortSegments(mappings[i2], owned);
  }
  return mappings;
}
function nextUnsortedSegmentLine(mappings, start) {
  for (let i2 = start; i2 < mappings.length; i2++) {
    if (!isSorted(mappings[i2]))
      return i2;
  }
  return mappings.length;
}
function isSorted(line) {
  for (let j = 1; j < line.length; j++) {
    if (line[j][COLUMN] < line[j - 1][COLUMN]) {
      return false;
    }
  }
  return true;
}
function sortSegments(line, owned) {
  if (!owned)
    line = line.slice();
  return line.sort(sortComparator2);
}
function sortComparator2(a, b) {
  return a[COLUMN] - b[COLUMN];
}
var found = false;
function binarySearch(haystack, needle, low, high) {
  while (low <= high) {
    const mid = low + (high - low >> 1);
    const cmp = haystack[mid][COLUMN] - needle;
    if (cmp === 0) {
      found = true;
      return mid;
    }
    if (cmp < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  found = false;
  return low - 1;
}
function upperBound(haystack, needle, index) {
  for (let i2 = index + 1; i2 < haystack.length; index = i2++) {
    if (haystack[i2][COLUMN] !== needle)
      break;
  }
  return index;
}
function lowerBound(haystack, needle, index) {
  for (let i2 = index - 1; i2 >= 0; index = i2--) {
    if (haystack[i2][COLUMN] !== needle)
      break;
  }
  return index;
}
function memoizedState() {
  return {
    lastKey: -1,
    lastNeedle: -1,
    lastIndex: -1
  };
}
function memoizedBinarySearch(haystack, needle, state, key) {
  const { lastKey, lastNeedle, lastIndex } = state;
  let low = 0;
  let high = haystack.length - 1;
  if (key === lastKey) {
    if (needle === lastNeedle) {
      found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle;
      return lastIndex;
    }
    if (needle >= lastNeedle) {
      low = lastIndex === -1 ? 0 : lastIndex;
    } else {
      high = lastIndex;
    }
  }
  state.lastKey = key;
  state.lastNeedle = needle;
  return state.lastIndex = binarySearch(haystack, needle, low, high);
}
function buildBySources(decoded, memos) {
  const sources3 = memos.map(buildNullArray);
  for (let i2 = 0; i2 < decoded.length; i2++) {
    const line = decoded[i2];
    for (let j = 0; j < line.length; j++) {
      const seg = line[j];
      if (seg.length === 1)
        continue;
      const sourceIndex = seg[SOURCES_INDEX];
      const sourceLine = seg[SOURCE_LINE];
      const sourceColumn = seg[SOURCE_COLUMN];
      const originalSource = sources3[sourceIndex];
      const originalLine = originalSource[sourceLine] || (originalSource[sourceLine] = []);
      const memo = memos[sourceIndex];
      const index = upperBound(originalLine, sourceColumn, memoizedBinarySearch(originalLine, sourceColumn, memo, sourceLine));
      insert(originalLine, memo.lastIndex = index + 1, [sourceColumn, i2, seg[COLUMN]]);
    }
  }
  return sources3;
}
function insert(array, index, value) {
  for (let i2 = array.length; i2 > index; i2--) {
    array[i2] = array[i2 - 1];
  }
  array[index] = value;
}
function buildNullArray() {
  return { __proto__: null };
}
var LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
var COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
var LEAST_UPPER_BOUND = -1;
var GREATEST_LOWER_BOUND = 1;
var encodedMappings;
var decodedMappings;
var traceSegment;
var originalPositionFor;
var generatedPositionFor;
var allGeneratedPositionsFor;
var eachMapping;
var sourceContentFor;
var presortedDecodedMap;
var decodedMap;
var encodedMap;
var TraceMap = class {
  constructor(map, mapUrl) {
    const isString = typeof map === "string";
    if (!isString && map._decodedMemo)
      return map;
    const parsed = isString ? JSON.parse(map) : map;
    const { version, file, names, sourceRoot, sources: sources3, sourcesContent } = parsed;
    this.version = version;
    this.file = file;
    this.names = names;
    this.sourceRoot = sourceRoot;
    this.sources = sources3;
    this.sourcesContent = sourcesContent;
    const from = resolve2(sourceRoot || "", stripFilename(mapUrl));
    this.resolvedSources = sources3.map((s) => resolve2(s || "", from));
    const { mappings } = parsed;
    if (typeof mappings === "string") {
      this._encoded = mappings;
      this._decoded = void 0;
    } else {
      this._encoded = void 0;
      this._decoded = maybeSort(mappings, isString);
    }
    this._decodedMemo = memoizedState();
    this._bySources = void 0;
    this._bySourceMemos = void 0;
  }
};
(() => {
  encodedMappings = (map) => {
    var _a;
    return (_a = map._encoded) !== null && _a !== void 0 ? _a : map._encoded = encode(map._decoded);
  };
  decodedMappings = (map) => {
    return map._decoded || (map._decoded = decode(map._encoded));
  };
  traceSegment = (map, line, column) => {
    const decoded = decodedMappings(map);
    if (line >= decoded.length)
      return null;
    const segments = decoded[line];
    const index = traceSegmentInternal(segments, map._decodedMemo, line, column, GREATEST_LOWER_BOUND);
    return index === -1 ? null : segments[index];
  };
  originalPositionFor = (map, { line, column, bias }) => {
    line--;
    if (line < 0)
      throw new Error(LINE_GTR_ZERO);
    if (column < 0)
      throw new Error(COL_GTR_EQ_ZERO);
    const decoded = decodedMappings(map);
    if (line >= decoded.length)
      return OMapping(null, null, null, null);
    const segments = decoded[line];
    const index = traceSegmentInternal(segments, map._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND);
    if (index === -1)
      return OMapping(null, null, null, null);
    const segment = segments[index];
    if (segment.length === 1)
      return OMapping(null, null, null, null);
    const { names, resolvedSources } = map;
    return OMapping(resolvedSources[segment[SOURCES_INDEX]], segment[SOURCE_LINE] + 1, segment[SOURCE_COLUMN], segment.length === 5 ? names[segment[NAMES_INDEX]] : null);
  };
  allGeneratedPositionsFor = (map, { source, line, column, bias }) => {
    return generatedPosition(map, source, line, column, bias || LEAST_UPPER_BOUND, true);
  };
  generatedPositionFor = (map, { source, line, column, bias }) => {
    return generatedPosition(map, source, line, column, bias || GREATEST_LOWER_BOUND, false);
  };
  eachMapping = (map, cb) => {
    const decoded = decodedMappings(map);
    const { names, resolvedSources } = map;
    for (let i2 = 0; i2 < decoded.length; i2++) {
      const line = decoded[i2];
      for (let j = 0; j < line.length; j++) {
        const seg = line[j];
        const generatedLine = i2 + 1;
        const generatedColumn = seg[0];
        let source = null;
        let originalLine = null;
        let originalColumn = null;
        let name = null;
        if (seg.length !== 1) {
          source = resolvedSources[seg[1]];
          originalLine = seg[2] + 1;
          originalColumn = seg[3];
        }
        if (seg.length === 5)
          name = names[seg[4]];
        cb({
          generatedLine,
          generatedColumn,
          source,
          originalLine,
          originalColumn,
          name
        });
      }
    }
  };
  sourceContentFor = (map, source) => {
    const { sources: sources3, resolvedSources, sourcesContent } = map;
    if (sourcesContent == null)
      return null;
    let index = sources3.indexOf(source);
    if (index === -1)
      index = resolvedSources.indexOf(source);
    return index === -1 ? null : sourcesContent[index];
  };
  presortedDecodedMap = (map, mapUrl) => {
    const tracer = new TraceMap(clone(map, []), mapUrl);
    tracer._decoded = map.mappings;
    return tracer;
  };
  decodedMap = (map) => {
    return clone(map, decodedMappings(map));
  };
  encodedMap = (map) => {
    return clone(map, encodedMappings(map));
  };
  function generatedPosition(map, source, line, column, bias, all) {
    line--;
    if (line < 0)
      throw new Error(LINE_GTR_ZERO);
    if (column < 0)
      throw new Error(COL_GTR_EQ_ZERO);
    const { sources: sources3, resolvedSources } = map;
    let sourceIndex = sources3.indexOf(source);
    if (sourceIndex === -1)
      sourceIndex = resolvedSources.indexOf(source);
    if (sourceIndex === -1)
      return all ? [] : GMapping(null, null);
    const generated = map._bySources || (map._bySources = buildBySources(decodedMappings(map), map._bySourceMemos = sources3.map(memoizedState)));
    const segments = generated[sourceIndex][line];
    if (segments == null)
      return all ? [] : GMapping(null, null);
    const memo = map._bySourceMemos[sourceIndex];
    if (all)
      return sliceGeneratedPositions(segments, memo, line, column, bias);
    const index = traceSegmentInternal(segments, memo, line, column, bias);
    if (index === -1)
      return GMapping(null, null);
    const segment = segments[index];
    return GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]);
  }
})();
function clone(map, mappings) {
  return {
    version: map.version,
    file: map.file,
    names: map.names,
    sourceRoot: map.sourceRoot,
    sources: map.sources,
    sourcesContent: map.sourcesContent,
    mappings
  };
}
function OMapping(source, line, column, name) {
  return { source, line, column, name };
}
function GMapping(line, column) {
  return { line, column };
}
function traceSegmentInternal(segments, memo, line, column, bias) {
  let index = memoizedBinarySearch(segments, column, memo, line);
  if (found) {
    index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
  } else if (bias === LEAST_UPPER_BOUND)
    index++;
  if (index === -1 || index === segments.length)
    return -1;
  return index;
}
function sliceGeneratedPositions(segments, memo, line, column, bias) {
  let min = traceSegmentInternal(segments, memo, line, column, GREATEST_LOWER_BOUND);
  if (!found && bias === LEAST_UPPER_BOUND)
    min++;
  if (min === -1 || min === segments.length)
    return [];
  const matchedColumn = found ? column : segments[min][COLUMN];
  if (!found)
    min = lowerBound(segments, matchedColumn, min);
  const max = upperBound(segments, matchedColumn, min);
  const result = [];
  for (; min <= max; min++) {
    const segment = segments[min];
    result.push(GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]));
  }
  return result;
}

// node_modules/.pnpm/@jridgewell+set-array@1.1.2/node_modules/@jridgewell/set-array/dist/set-array.mjs
var get;
var put;
var pop;
var SetArray = class {
  constructor() {
    this._indexes = { __proto__: null };
    this.array = [];
  }
};
(() => {
  get = (strarr, key) => strarr._indexes[key];
  put = (strarr, key) => {
    const index = get(strarr, key);
    if (index !== void 0)
      return index;
    const { array, _indexes: indexes } = strarr;
    return indexes[key] = array.push(key) - 1;
  };
  pop = (strarr) => {
    const { array, _indexes: indexes } = strarr;
    if (array.length === 0)
      return;
    const last = array.pop();
    indexes[last] = void 0;
  };
})();

// node_modules/.pnpm/@jridgewell+sourcemap-codec@1.4.15/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
var comma2 = ",".charCodeAt(0);
var semicolon2 = ";".charCodeAt(0);
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar2 = new Uint8Array(64);
var charToInt2 = new Uint8Array(128);
for (let i2 = 0; i2 < chars2.length; i2++) {
  const c = chars2.charCodeAt(i2);
  intToChar2[i2] = c;
  charToInt2[c] = i2;
}
var td2 = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
  decode(buf) {
    const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
    return out.toString();
  }
} : {
  decode(buf) {
    let out = "";
    for (let i2 = 0; i2 < buf.length; i2++) {
      out += String.fromCharCode(buf[i2]);
    }
    return out;
  }
};
function encode2(decoded) {
  const state = new Int32Array(5);
  const bufLength = 1024 * 16;
  const subLength = bufLength - 36;
  const buf = new Uint8Array(bufLength);
  const sub = buf.subarray(0, subLength);
  let pos = 0;
  let out = "";
  for (let i2 = 0; i2 < decoded.length; i2++) {
    const line = decoded[i2];
    if (i2 > 0) {
      if (pos === bufLength) {
        out += td2.decode(buf);
        pos = 0;
      }
      buf[pos++] = semicolon2;
    }
    if (line.length === 0)
      continue;
    state[0] = 0;
    for (let j = 0; j < line.length; j++) {
      const segment = line[j];
      if (pos > subLength) {
        out += td2.decode(sub);
        buf.copyWithin(0, subLength, pos);
        pos -= subLength;
      }
      if (j > 0)
        buf[pos++] = comma2;
      pos = encodeInteger2(buf, pos, state, segment, 0);
      if (segment.length === 1)
        continue;
      pos = encodeInteger2(buf, pos, state, segment, 1);
      pos = encodeInteger2(buf, pos, state, segment, 2);
      pos = encodeInteger2(buf, pos, state, segment, 3);
      if (segment.length === 4)
        continue;
      pos = encodeInteger2(buf, pos, state, segment, 4);
    }
  }
  return out + td2.decode(buf.subarray(0, pos));
}
function encodeInteger2(buf, pos, state, segment, j) {
  const next = segment[j];
  let num = next - state[j];
  state[j] = next;
  num = num < 0 ? -num << 1 | 1 : num << 1;
  do {
    let clamped = num & 31;
    num >>>= 5;
    if (num > 0)
      clamped |= 32;
    buf[pos++] = intToChar2[clamped];
  } while (num > 0);
  return pos;
}

// node_modules/.pnpm/@jridgewell+gen-mapping@0.3.2/node_modules/@jridgewell/gen-mapping/dist/gen-mapping.mjs
var COLUMN2 = 0;
var SOURCES_INDEX2 = 1;
var SOURCE_LINE2 = 2;
var SOURCE_COLUMN2 = 3;
var NAMES_INDEX2 = 4;
var NO_NAME = -1;
var addSegment;
var addMapping;
var maybeAddSegment;
var maybeAddMapping;
var setSourceContent;
var toDecodedMap;
var toEncodedMap;
var fromMap;
var allMappings;
var addSegmentInternal;
var GenMapping = class {
  constructor({ file, sourceRoot } = {}) {
    this._names = new SetArray();
    this._sources = new SetArray();
    this._sourcesContent = [];
    this._mappings = [];
    this.file = file;
    this.sourceRoot = sourceRoot;
  }
};
(() => {
  addSegment = (map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) => {
    return addSegmentInternal(false, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content);
  };
  maybeAddSegment = (map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) => {
    return addSegmentInternal(true, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content);
  };
  addMapping = (map, mapping) => {
    return addMappingInternal(false, map, mapping);
  };
  maybeAddMapping = (map, mapping) => {
    return addMappingInternal(true, map, mapping);
  };
  setSourceContent = (map, source, content) => {
    const { _sources: sources3, _sourcesContent: sourcesContent } = map;
    sourcesContent[put(sources3, source)] = content;
  };
  toDecodedMap = (map) => {
    const { file, sourceRoot, _mappings: mappings, _sources: sources3, _sourcesContent: sourcesContent, _names: names } = map;
    removeEmptyFinalLines(mappings);
    return {
      version: 3,
      file: file || void 0,
      names: names.array,
      sourceRoot: sourceRoot || void 0,
      sources: sources3.array,
      sourcesContent,
      mappings
    };
  };
  toEncodedMap = (map) => {
    const decoded = toDecodedMap(map);
    return Object.assign(Object.assign({}, decoded), { mappings: encode2(decoded.mappings) });
  };
  allMappings = (map) => {
    const out = [];
    const { _mappings: mappings, _sources: sources3, _names: names } = map;
    for (let i2 = 0; i2 < mappings.length; i2++) {
      const line = mappings[i2];
      for (let j = 0; j < line.length; j++) {
        const seg = line[j];
        const generated = { line: i2 + 1, column: seg[COLUMN2] };
        let source = void 0;
        let original = void 0;
        let name = void 0;
        if (seg.length !== 1) {
          source = sources3.array[seg[SOURCES_INDEX2]];
          original = { line: seg[SOURCE_LINE2] + 1, column: seg[SOURCE_COLUMN2] };
          if (seg.length === 5)
            name = names.array[seg[NAMES_INDEX2]];
        }
        out.push({ generated, source, original, name });
      }
    }
    return out;
  };
  fromMap = (input) => {
    const map = new TraceMap(input);
    const gen = new GenMapping({ file: map.file, sourceRoot: map.sourceRoot });
    putAll(gen._names, map.names);
    putAll(gen._sources, map.sources);
    gen._sourcesContent = map.sourcesContent || map.sources.map(() => null);
    gen._mappings = decodedMappings(map);
    return gen;
  };
  addSegmentInternal = (skipable, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) => {
    const { _mappings: mappings, _sources: sources3, _sourcesContent: sourcesContent, _names: names } = map;
    const line = getLine(mappings, genLine);
    const index = getColumnIndex(line, genColumn);
    if (!source) {
      if (skipable && skipSourceless(line, index))
        return;
      return insert2(line, index, [genColumn]);
    }
    const sourcesIndex = put(sources3, source);
    const namesIndex = name ? put(names, name) : NO_NAME;
    if (sourcesIndex === sourcesContent.length)
      sourcesContent[sourcesIndex] = content !== null && content !== void 0 ? content : null;
    if (skipable && skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex)) {
      return;
    }
    return insert2(line, index, name ? [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex] : [genColumn, sourcesIndex, sourceLine, sourceColumn]);
  };
})();
function getLine(mappings, index) {
  for (let i2 = mappings.length; i2 <= index; i2++) {
    mappings[i2] = [];
  }
  return mappings[index];
}
function getColumnIndex(line, genColumn) {
  let index = line.length;
  for (let i2 = index - 1; i2 >= 0; index = i2--) {
    const current = line[i2];
    if (genColumn >= current[COLUMN2])
      break;
  }
  return index;
}
function insert2(array, index, value) {
  for (let i2 = array.length; i2 > index; i2--) {
    array[i2] = array[i2 - 1];
  }
  array[index] = value;
}
function removeEmptyFinalLines(mappings) {
  const { length } = mappings;
  let len = length;
  for (let i2 = len - 1; i2 >= 0; len = i2, i2--) {
    if (mappings[i2].length > 0)
      break;
  }
  if (len < length)
    mappings.length = len;
}
function putAll(strarr, array) {
  for (let i2 = 0; i2 < array.length; i2++)
    put(strarr, array[i2]);
}
function skipSourceless(line, index) {
  if (index === 0)
    return true;
  const prev = line[index - 1];
  return prev.length === 1;
}
function skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex) {
  if (index === 0)
    return false;
  const prev = line[index - 1];
  if (prev.length === 1)
    return false;
  return sourcesIndex === prev[SOURCES_INDEX2] && sourceLine === prev[SOURCE_LINE2] && sourceColumn === prev[SOURCE_COLUMN2] && namesIndex === (prev.length === 5 ? prev[NAMES_INDEX2] : NO_NAME);
}
function addMappingInternal(skipable, map, mapping) {
  const { generated, source, original, name, content } = mapping;
  if (!source) {
    return addSegmentInternal(skipable, map, generated.line - 1, generated.column, null, null, null, null, null);
  }
  const s = source;
  return addSegmentInternal(skipable, map, generated.line - 1, generated.column, s, original.line - 1, original.column, name, content);
}

// node_modules/.pnpm/@ampproject+remapping@2.2.1/node_modules/@ampproject/remapping/dist/remapping.mjs
var SOURCELESS_MAPPING = /* @__PURE__ */ SegmentObject("", -1, -1, "", null);
var EMPTY_SOURCES = [];
function SegmentObject(source, line, column, name, content) {
  return { source, line, column, name, content };
}
function Source(map, sources3, source, content) {
  return {
    map,
    sources: sources3,
    source,
    content
  };
}
function MapSource(map, sources3) {
  return Source(map, sources3, "", null);
}
function OriginalSource(source, content) {
  return Source(null, EMPTY_SOURCES, source, content);
}
function traceMappings(tree) {
  const gen = new GenMapping({ file: tree.map.file });
  const { sources: rootSources, map } = tree;
  const rootNames = map.names;
  const rootMappings = decodedMappings(map);
  for (let i2 = 0; i2 < rootMappings.length; i2++) {
    const segments = rootMappings[i2];
    for (let j = 0; j < segments.length; j++) {
      const segment = segments[j];
      const genCol = segment[0];
      let traced = SOURCELESS_MAPPING;
      if (segment.length !== 1) {
        const source2 = rootSources[segment[1]];
        traced = originalPositionFor2(source2, segment[2], segment[3], segment.length === 5 ? rootNames[segment[4]] : "");
        if (traced == null)
          continue;
      }
      const { column, line, name, content, source } = traced;
      maybeAddSegment(gen, i2, genCol, source, line, column, name);
      if (source && content != null)
        setSourceContent(gen, source, content);
    }
  }
  return gen;
}
function originalPositionFor2(source, line, column, name) {
  if (!source.map) {
    return SegmentObject(source.source, line, column, name, source.content);
  }
  const segment = traceSegment(source.map, line, column);
  if (segment == null)
    return null;
  if (segment.length === 1)
    return SOURCELESS_MAPPING;
  return originalPositionFor2(source.sources[segment[1]], segment[2], segment[3], segment.length === 5 ? source.map.names[segment[4]] : name);
}
function asArray(value) {
  if (Array.isArray(value))
    return value;
  return [value];
}
function buildSourceMapTree(input, loader) {
  const maps = asArray(input).map((m) => new TraceMap(m, ""));
  const map = maps.pop();
  for (let i2 = 0; i2 < maps.length; i2++) {
    if (maps[i2].sources.length > 1) {
      throw new Error(`Transformation map ${i2} must have exactly one source file.
Did you specify these with the most recent transformation maps first?`);
    }
  }
  let tree = build(map, loader, "", 0);
  for (let i2 = maps.length - 1; i2 >= 0; i2--) {
    tree = MapSource(maps[i2], [tree]);
  }
  return tree;
}
function build(map, loader, importer, importerDepth) {
  const { resolvedSources, sourcesContent } = map;
  const depth = importerDepth + 1;
  const children = resolvedSources.map((sourceFile, i2) => {
    const ctx = {
      importer,
      depth,
      source: sourceFile || "",
      content: void 0
    };
    const sourceMap = loader(ctx.source, ctx);
    const { source, content } = ctx;
    if (sourceMap)
      return build(new TraceMap(sourceMap, source), loader, source, depth);
    const sourceContent = content !== void 0 ? content : sourcesContent ? sourcesContent[i2] : null;
    return OriginalSource(source, sourceContent);
  });
  return MapSource(map, children);
}
var SourceMap = class {
  constructor(map, options) {
    const out = options.decodedMappings ? toDecodedMap(map) : toEncodedMap(map);
    this.version = out.version;
    this.file = out.file;
    this.mappings = out.mappings;
    this.names = out.names;
    this.sourceRoot = out.sourceRoot;
    this.sources = out.sources;
    if (!options.excludeContent) {
      this.sourcesContent = out.sourcesContent;
    }
  }
  toString() {
    return JSON.stringify(this);
  }
};
function remapping(input, loader, options) {
  const opts = typeof options === "object" ? options : { excludeContent: !!options, decodedMappings: false };
  const tree = buildSourceMapTree(input, loader);
  return new SourceMap(traceMappings(tree), opts);
}

// src/esbuild/utils.ts
import { Parser } from "acorn";

// src/utils.ts
import { isAbsolute, normalize } from "path";
function normalizeAbsolutePath(path4) {
  if (isAbsolute(path4))
    return normalize(path4);
  else
    return path4;
}
function toArray(array) {
  array = array || [];
  if (Array.isArray(array))
    return array;
  return [array];
}
function shouldLoad(id, plugin, externalModules) {
  if (id.startsWith(plugin.__virtualModulePrefix))
    id = decodeURIComponent(id.slice(plugin.__virtualModulePrefix.length));
  if (plugin.loadInclude && !plugin.loadInclude(id))
    return false;
  return !externalModules.has(id);
}
function transformUse(data, plugin, transformLoader) {
  if (data.resource == null)
    return [];
  const id = normalizeAbsolutePath(data.resource + (data.resourceQuery || ""));
  if (!plugin.transformInclude || plugin.transformInclude(id)) {
    return [{
      loader: `${transformLoader}?unpluginName=${encodeURIComponent(plugin.name)}`
    }];
  }
  return [];
}

// src/esbuild/utils.ts
var ExtToLoader = {
  ".js": "js",
  ".mjs": "js",
  ".cjs": "js",
  ".jsx": "jsx",
  ".ts": "ts",
  ".cts": "ts",
  ".mts": "ts",
  ".tsx": "tsx",
  ".css": "css",
  ".less": "css",
  ".stylus": "css",
  ".scss": "css",
  ".sass": "css",
  ".json": "json",
  ".txt": "text"
};
function guessLoader(code, id) {
  return ExtToLoader[path2.extname(id).toLowerCase()] || "js";
}
function unwrapLoader(loader, code, id) {
  if (typeof loader === "function")
    return loader(code, id);
  return loader;
}
function fixSourceMap(map) {
  if (!("toString" in map)) {
    Object.defineProperty(map, "toString", {
      enumerable: false,
      value: function toString() {
        return JSON.stringify(this);
      }
    });
  }
  if (!("toUrl" in map)) {
    Object.defineProperty(map, "toUrl", {
      enumerable: false,
      value: function toUrl() {
        return `data:application/json;charset=utf-8;base64,${Buffer2.from(this.toString()).toString("base64")}`;
      }
    });
  }
  return map;
}
var nullSourceMap = {
  names: [],
  sources: [],
  mappings: "",
  version: 3
};
function combineSourcemaps(filename, sourcemapList) {
  sourcemapList = sourcemapList.filter((m) => m.sources);
  if (sourcemapList.length === 0 || sourcemapList.every((m) => m.sources.length === 0))
    return { ...nullSourceMap };
  let map;
  let mapIndex = 1;
  const useArrayInterface = sourcemapList.slice(0, -1).find((m) => m.sources.length !== 1) === void 0;
  if (useArrayInterface) {
    map = remapping(sourcemapList, () => null, true);
  } else {
    map = remapping(
      sourcemapList[0],
      (sourcefile) => {
        if (sourcefile === filename && sourcemapList[mapIndex])
          return sourcemapList[mapIndex++];
        else
          return { ...nullSourceMap };
      },
      true
    );
  }
  if (!map.file)
    delete map.file;
  return map;
}
function createBuildContext(initialOptions) {
  const watchFiles = [];
  return {
    parse(code, opts = {}) {
      return Parser.parse(code, {
        sourceType: "module",
        ecmaVersion: "latest",
        locations: true,
        ...opts
      });
    },
    addWatchFile() {
      throw new Error("unplugin/esbuild: addWatchFile outside supported hooks (resolveId, load, transform)");
    },
    emitFile(emittedFile) {
      if (initialOptions.outdir && !fs.existsSync(initialOptions.outdir))
        fs.mkdirSync(initialOptions.outdir, { recursive: true });
      const outFileName = emittedFile.fileName || emittedFile.name;
      if (initialOptions.outdir && emittedFile.source && outFileName)
        fs.writeFileSync(path2.resolve(initialOptions.outdir, outFileName), emittedFile.source);
    },
    getWatchFiles() {
      return watchFiles;
    }
  };
}
function createPluginContext(context) {
  const errors = [];
  const warnings = [];
  const pluginContext = {
    error(message) {
      errors.push({ text: String(message) });
    },
    warn(message) {
      warnings.push({ text: String(message) });
    }
  };
  const mixedContext = {
    ...context,
    ...pluginContext,
    addWatchFile(id) {
      context.getWatchFiles().push(id);
    }
  };
  return {
    errors,
    warnings,
    mixedContext
  };
}
function processCodeWithSourceMap(map, code) {
  if (map) {
    if (!map.sourcesContent || map.sourcesContent.length === 0)
      map.sourcesContent = [code];
    map = fixSourceMap(map);
    code += `
//# sourceMappingURL=${map.toUrl()}`;
  }
  return code;
}

// src/esbuild/index.ts
var i = 0;
function getEsbuildPlugin(factory) {
  return (userOptions) => {
    const meta = {
      framework: "esbuild"
    };
    const plugins = toArray(factory(userOptions, meta));
    const setup = (plugin) => plugin.esbuild?.setup ?? ((build2) => {
      meta.build = build2;
      const { onStart, onEnd, onResolve, onLoad, initialOptions } = build2;
      const onResolveFilter = plugin.esbuild?.onResolveFilter ?? /.*/;
      const onLoadFilter = plugin.esbuild?.onLoadFilter ?? /.*/;
      const loader = plugin.esbuild?.loader ?? guessLoader;
      const context = createBuildContext(initialOptions);
      if (plugin.esbuild?.config)
        plugin.esbuild.config.call(context, initialOptions);
      if (plugin.buildStart)
        onStart(() => plugin.buildStart.call(context));
      if (plugin.buildEnd || plugin.writeBundle) {
        onEnd(async () => {
          if (plugin.buildEnd)
            await plugin.buildEnd.call(context);
          if (plugin.writeBundle)
            await plugin.writeBundle();
        });
      }
      if (plugin.resolveId) {
        onResolve({ filter: onResolveFilter }, async (args) => {
          if (initialOptions.external?.includes(args.path)) {
            return void 0;
          }
          const { errors, warnings, mixedContext } = createPluginContext(context);
          const isEntry = args.kind === "entry-point";
          const result = await plugin.resolveId.call(
            mixedContext,
            args.path,
            // We explicitly have this if statement here for consistency with the integration of other bundlers.
            // Here, `args.importer` is just an empty string on entry files whereas the equivalent on other bundlers is `undefined.`
            isEntry ? void 0 : args.importer,
            { isEntry }
          );
          if (typeof result === "string") {
            return {
              path: result,
              namespace: plugin.name,
              errors,
              warnings,
              watchFiles: mixedContext.getWatchFiles()
            };
          } else if (typeof result === "object" && result !== null) {
            return {
              path: result.id,
              external: result.external,
              namespace: plugin.name,
              errors,
              warnings,
              watchFiles: mixedContext.getWatchFiles()
            };
          }
        });
      }
      if (plugin.load || plugin.transform) {
        onLoad({ filter: onLoadFilter }, async (args) => {
          const id = args.path + args.suffix;
          const { errors, warnings, mixedContext } = createPluginContext(context);
          const resolveDir = path3.dirname(args.path);
          let code, map;
          if (plugin.load && (!plugin.loadInclude || plugin.loadInclude(id))) {
            const result = await plugin.load.call(mixedContext, id);
            if (typeof result === "string") {
              code = result;
            } else if (typeof result === "object" && result !== null) {
              code = result.code;
              map = result.map;
            }
          }
          if (!plugin.transform) {
            if (code === void 0)
              return null;
            if (map)
              code = processCodeWithSourceMap(map, code);
            return {
              contents: code,
              errors,
              warnings,
              watchFiles: mixedContext.getWatchFiles(),
              loader: unwrapLoader(loader, code, args.path),
              resolveDir
            };
          }
          if (!plugin.transformInclude || plugin.transformInclude(id)) {
            if (!code) {
              code = await fs2.promises.readFile(args.path, "utf8");
            }
            const result = await plugin.transform.call(mixedContext, code, id);
            if (typeof result === "string") {
              code = result;
            } else if (typeof result === "object" && result !== null) {
              code = result.code;
              if (map && result.map) {
                map = combineSourcemaps(args.path, [
                  result.map,
                  map
                ]);
              } else {
                map = result.map;
              }
            }
          }
          if (code) {
            if (map)
              code = processCodeWithSourceMap(map, code);
            return {
              contents: code,
              errors,
              warnings,
              watchFiles: mixedContext.getWatchFiles(),
              loader: unwrapLoader(loader, code, args.path),
              resolveDir
            };
          }
        });
      }
    });
    const setupMultiplePlugins = () => (build2) => {
      for (const plugin of plugins)
        setup(plugin)(build2);
    };
    return plugins.length === 1 ? { name: plugins[0].name, setup: setup(plugins[0]) } : { name: meta.esbuildHostName ?? `unplugin-host-${i++}`, setup: setupMultiplePlugins() };
  };
}

// src/rollup/index.ts
function getRollupPlugin(factory) {
  return (userOptions) => {
    const meta = {
      framework: "rollup"
    };
    const rawPlugins = toArray(factory(userOptions, meta));
    const plugins = rawPlugins.map((plugin) => toRollupPlugin(plugin));
    return plugins.length === 1 ? plugins[0] : plugins;
  };
}
function toRollupPlugin(plugin, containRollupOptions = true) {
  if (plugin.transform && plugin.transformInclude) {
    const _transform = plugin.transform;
    plugin.transform = function(code, id) {
      if (plugin.transformInclude && !plugin.transformInclude(id))
        return null;
      return _transform.call(this, code, id);
    };
  }
  if (plugin.load && plugin.loadInclude) {
    const _load = plugin.load;
    plugin.load = function(id) {
      if (plugin.loadInclude && !plugin.loadInclude(id))
        return null;
      return _load.call(this, id);
    };
  }
  if (plugin.rollup && containRollupOptions)
    Object.assign(plugin, plugin.rollup);
  return plugin;
}

// src/rspack/index.ts
import { resolve as resolve3 } from "path";

// src/rspack/context.ts
import { Buffer as Buffer3 } from "buffer";
import sources from "webpack-sources";
import { Parser as Parser2 } from "acorn";
function createRspackContext(compilation) {
  return {
    parse(code, opts = {}) {
      return Parser2.parse(code, {
        sourceType: "module",
        ecmaVersion: "latest",
        locations: true,
        ...opts
      });
    },
    addWatchFile() {
    },
    emitFile(emittedFile) {
      const outFileName = emittedFile.fileName || emittedFile.name;
      if (emittedFile.source && outFileName) {
        compilation.emitAsset(
          outFileName,
          new sources.RawSource(
            // @ts-expect-error types mismatch
            typeof emittedFile.source === "string" ? emittedFile.source : Buffer3.from(emittedFile.source)
          )
        );
      }
    },
    getWatchFiles() {
      return [];
    }
  };
}

// src/rspack/index.ts
var TRANSFORM_LOADER = resolve3(
  __dirname,
  false ? "../../dist/rspack/loaders/transform.js" : "rspack/loaders/transform"
);
var LOAD_LOADER = resolve3(
  __dirname,
  false ? "../../dist/rspack/loaders/load.js" : "rspack/loaders/load"
);
var VIRTUAL_MODULE_PREFIX = resolve3(process.cwd(), "_virtual_");
function getRspackPlugin(factory) {
  return (userOptions) => {
    return {
      apply(compiler) {
        const injected = compiler.$unpluginContext || {};
        compiler.$unpluginContext = injected;
        const meta = {
          framework: "rspack",
          rspack: {
            compiler
          }
        };
        const rawPlugins = toArray(factory(userOptions, meta));
        for (const rawPlugin of rawPlugins) {
          const plugin = Object.assign(
            rawPlugin,
            {
              __unpluginMeta: meta,
              __virtualModulePrefix: VIRTUAL_MODULE_PREFIX
            }
          );
          injected[plugin.name] = plugin;
          compiler.hooks.thisCompilation.tap(plugin.name, (compilation) => {
            if (typeof compilation.hooks.childCompiler === "undefined")
              throw new Error("`compilation.hooks.childCompiler` only support by @rspack/core>=0.4.1");
            compilation.hooks.childCompiler.tap(plugin.name, (childCompiler) => {
              childCompiler.$unpluginContext = injected;
            });
          });
          const externalModules = /* @__PURE__ */ new Set();
          if (plugin.load) {
            compiler.options.module.rules.unshift({
              enforce: plugin.enforce,
              include(id) {
                return shouldLoad(id, plugin, externalModules);
              },
              use: [{
                loader: LOAD_LOADER,
                options: {
                  unpluginName: plugin.name
                }
              }]
            });
          }
          if (plugin.transform) {
            compiler.options.module.rules.unshift({
              enforce: plugin.enforce,
              use(data) {
                return transformUse(data, plugin, TRANSFORM_LOADER);
              }
            });
          }
          if (plugin.rspack)
            plugin.rspack(compiler);
          if (plugin.buildStart) {
            compiler.hooks.make.tapPromise(plugin.name, async (compilation) => {
              const context = createRspackContext(compilation);
              return plugin.buildStart.call(context);
            });
          }
          if (plugin.buildEnd) {
            compiler.hooks.emit.tapPromise(plugin.name, async (compilation) => {
              await plugin.buildEnd.call(createRspackContext(compilation));
            });
          }
          if (plugin.writeBundle) {
            compiler.hooks.afterEmit.tap(plugin.name, () => {
              plugin.writeBundle();
            });
          }
        }
      }
    };
  };
}

// src/vite/index.ts
function getVitePlugin(factory) {
  return (userOptions) => {
    const meta = {
      framework: "vite"
    };
    const rawPlugins = toArray(factory(userOptions, meta));
    const plugins = rawPlugins.map((rawPlugin) => {
      const plugin = toRollupPlugin(rawPlugin, false);
      if (rawPlugin.vite)
        Object.assign(plugin, rawPlugin.vite);
      return plugin;
    });
    return plugins.length === 1 ? plugins[0] : plugins;
  };
}

// src/webpack/index.ts
import fs3 from "fs";
import { resolve as resolve5 } from "path";
import process3 from "process";
import VirtualModulesPlugin from "webpack-virtual-modules";

// src/webpack/context.ts
import { resolve as resolve4 } from "path";
import { Buffer as Buffer4 } from "buffer";
import process2 from "process";
import sources2 from "webpack-sources";
import { Parser as Parser3 } from "acorn";
function createContext(compilation) {
  return {
    parse(code, opts = {}) {
      return Parser3.parse(code, {
        sourceType: "module",
        ecmaVersion: "latest",
        locations: true,
        ...opts
      });
    },
    addWatchFile(id) {
      if (!compilation)
        throw new Error("unplugin/webpack: addWatchFile outside supported hooks (buildStart, buildEnd, load, transform, watchChange)");
      (compilation.fileDependencies ?? compilation.compilationDependencies).add(
        resolve4(process2.cwd(), id)
      );
    },
    emitFile(emittedFile) {
      const outFileName = emittedFile.fileName || emittedFile.name;
      if (emittedFile.source && outFileName) {
        if (!compilation)
          throw new Error("unplugin/webpack: emitFile outside supported hooks  (buildStart, buildEnd, load, transform, watchChange)");
        compilation.emitAsset(
          outFileName,
          sources2 ? new sources2.RawSource(
            // @ts-expect-error types mismatch
            typeof emittedFile.source === "string" ? emittedFile.source : Buffer4.from(emittedFile.source)
          ) : {
            source: () => emittedFile.source,
            size: () => emittedFile.source.length
          }
        );
      }
    },
    getWatchFiles() {
      if (!compilation)
        throw new Error("unplugin/webpack: getWatchFiles outside supported hooks (buildStart, buildEnd, load, transform, watchChange)");
      return Array.from(
        compilation.fileDependencies ?? compilation.compilationDependencies
      );
    }
  };
}

// src/webpack/index.ts
var TRANSFORM_LOADER2 = resolve5(
  __dirname,
  false ? "../../dist/webpack/loaders/transform" : "webpack/loaders/transform"
);
var LOAD_LOADER2 = resolve5(
  __dirname,
  false ? "../../dist/webpack/loaders/load" : "webpack/loaders/load"
);
var VIRTUAL_MODULE_PREFIX2 = resolve5(process3.cwd(), "_virtual_");
function getWebpackPlugin(factory) {
  return (userOptions) => {
    return {
      apply(compiler) {
        const injected = compiler.$unpluginContext || {};
        compiler.$unpluginContext = injected;
        const meta = {
          framework: "webpack",
          webpack: {
            compiler
          }
        };
        const rawPlugins = toArray(factory(userOptions, meta));
        for (const rawPlugin of rawPlugins) {
          const plugin = Object.assign(
            rawPlugin,
            {
              __unpluginMeta: meta,
              __virtualModulePrefix: VIRTUAL_MODULE_PREFIX2
            }
          );
          injected[plugin.name] = plugin;
          compiler.hooks.thisCompilation.tap(plugin.name, (compilation) => {
            compilation.hooks.childCompiler.tap(plugin.name, (childCompiler) => {
              childCompiler.$unpluginContext = injected;
            });
          });
          const externalModules = /* @__PURE__ */ new Set();
          if (plugin.resolveId) {
            let vfs = compiler.options.plugins.find((i2) => i2 instanceof VirtualModulesPlugin);
            if (!vfs) {
              vfs = new VirtualModulesPlugin();
              compiler.options.plugins.push(vfs);
            }
            plugin.__vfsModules = /* @__PURE__ */ new Set();
            plugin.__vfs = vfs;
            const resolverPlugin = {
              apply(resolver) {
                const target = resolver.ensureHook("resolve");
                resolver.getHook("resolve").tapAsync(plugin.name, async (request, resolveContext, callback) => {
                  if (!request.request)
                    return callback();
                  if (normalizeAbsolutePath(request.request).startsWith(plugin.__virtualModulePrefix))
                    return callback();
                  const id = normalizeAbsolutePath(request.request);
                  const requestContext = request.context;
                  const importer = requestContext.issuer !== "" ? requestContext.issuer : void 0;
                  const isEntry = requestContext.issuer === "";
                  const context = createContext();
                  let error;
                  const pluginContext = {
                    error(msg) {
                      if (error == null)
                        error = typeof msg === "string" ? new Error(msg) : msg;
                      else
                        console.error(`unplugin/webpack: multiple errors returned from resolveId hook: ${msg}`);
                    },
                    warn(msg) {
                      console.warn(`unplugin/webpack: warning from resolveId hook: ${msg}`);
                    }
                  };
                  const resolveIdResult = await plugin.resolveId.call({ ...context, ...pluginContext }, id, importer, { isEntry });
                  if (error != null)
                    return callback(error);
                  if (resolveIdResult == null)
                    return callback();
                  let resolved = typeof resolveIdResult === "string" ? resolveIdResult : resolveIdResult.id;
                  const isExternal = typeof resolveIdResult === "string" ? false : resolveIdResult.external === true;
                  if (isExternal)
                    externalModules.add(resolved);
                  if (!fs3.existsSync(resolved)) {
                    resolved = normalizeAbsolutePath(
                      plugin.__virtualModulePrefix + encodeURIComponent(resolved)
                      // URI encode id so webpack doesn't think it's part of the path
                    );
                    if (!plugin.__vfsModules.has(resolved)) {
                      plugin.__vfs.writeModule(resolved, "");
                      plugin.__vfsModules.add(resolved);
                    }
                  }
                  const newRequest = {
                    ...request,
                    request: resolved
                  };
                  resolver.doResolve(target, newRequest, null, resolveContext, callback);
                });
              }
            };
            compiler.options.resolve.plugins = compiler.options.resolve.plugins || [];
            compiler.options.resolve.plugins.push(resolverPlugin);
          }
          if (plugin.load) {
            compiler.options.module.rules.unshift({
              include(id) {
                return shouldLoad(id, plugin, externalModules);
              },
              enforce: plugin.enforce,
              use: [{
                loader: LOAD_LOADER2,
                options: {
                  unpluginName: plugin.name
                }
              }]
            });
          }
          if (plugin.transform) {
            compiler.options.module.rules.unshift({
              enforce: plugin.enforce,
              use(data) {
                return transformUse(data, plugin, TRANSFORM_LOADER2);
              }
            });
          }
          if (plugin.webpack)
            plugin.webpack(compiler);
          if (plugin.watchChange || plugin.buildStart) {
            compiler.hooks.make.tapPromise(plugin.name, async (compilation) => {
              const context = createContext(compilation);
              if (plugin.watchChange && (compiler.modifiedFiles || compiler.removedFiles)) {
                const promises = [];
                if (compiler.modifiedFiles) {
                  compiler.modifiedFiles.forEach(
                    (file) => promises.push(Promise.resolve(plugin.watchChange.call(context, file, { event: "update" })))
                  );
                }
                if (compiler.removedFiles) {
                  compiler.removedFiles.forEach(
                    (file) => promises.push(Promise.resolve(plugin.watchChange.call(context, file, { event: "delete" })))
                  );
                }
                await Promise.all(promises);
              }
              if (plugin.buildStart)
                return await plugin.buildStart.call(context);
            });
          }
          if (plugin.buildEnd) {
            compiler.hooks.emit.tapPromise(plugin.name, async (compilation) => {
              await plugin.buildEnd.call(createContext(compilation));
            });
          }
          if (plugin.writeBundle) {
            compiler.hooks.afterEmit.tap(plugin.name, () => {
              plugin.writeBundle();
            });
          }
        }
      }
    };
  };
}

// src/define.ts
function createUnplugin(factory) {
  return {
    get esbuild() {
      return getEsbuildPlugin(factory);
    },
    get rollup() {
      return getRollupPlugin(factory);
    },
    get vite() {
      return getVitePlugin(factory);
    },
    get webpack() {
      return getWebpackPlugin(factory);
    },
    /** @experimental do not use it in production */
    get rspack() {
      return getRspackPlugin(factory);
    },
    get raw() {
      return factory;
    }
  };
}
function createEsbuildPlugin(factory) {
  return getEsbuildPlugin(factory);
}
function createRollupPlugin(factory) {
  return getRollupPlugin(factory);
}
function createVitePlugin(factory) {
  return getVitePlugin(factory);
}
function createWebpackPlugin(factory) {
  return getWebpackPlugin(factory);
}
function createRspackPlugin(factory) {
  return getRspackPlugin(factory);
}
export {
  createEsbuildPlugin,
  createRollupPlugin,
  createRspackPlugin,
  createUnplugin,
  createVitePlugin,
  createWebpackPlugin
};
