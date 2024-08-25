'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var Console = /** @class */ (function () {
    function Console() {
    }
    Console.log = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.log.apply(console, message);
    };
    Console.error = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.error.apply(console, message);
    };
    Console.time = function (label) {
        // eslint-disable-next-line no-console
        console.time(label);
    };
    Console.timeEnd = function (label) {
        // eslint-disable-next-line no-console
        console.timeEnd(label);
    };
    return Console;
}());
function toArray(v) {
    if (Array.isArray(v))
        return v;
    return [v];
}
function hash(str) {
    str = str.replace(/\r/g, '');
    var hash = 5381;
    var i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return (hash >>> 0).toString(36);
}
function indent(code, tab) {
    if (tab === void 0) { tab = 2; }
    var spaces = Array(tab).fill(' ').join('');
    return code
        .split('\n')
        .map(function (line) { return spaces + line; })
        .join('\n');
}
function wrapit(code, start, end, tab, minify) {
    if (start === void 0) { start = '{'; }
    if (end === void 0) { end = '}'; }
    if (tab === void 0) { tab = 2; }
    if (minify === void 0) { minify = false; }
    if (minify)
        return "".concat(start).concat(code).concat(end);
    return "".concat(start, "\n").concat(indent(code, tab), "\n").concat(end);
}
function isNumber(amount, start, end, type) {
    if (start === void 0) { start = -Infinity; }
    if (end === void 0) { end = Infinity; }
    if (type === void 0) { type = 'int'; }
    var isInt = /^-?\d+$/.test(amount);
    if (type === 'int') {
        if (!isInt)
            return false;
    }
    else {
        var isFloat = /^-?\d+\.\d+$/.test(amount);
        if (!(isInt || isFloat))
            return false;
    }
    var num = parseFloat(amount);
    return num >= start && num <= end;
}
function isFraction(amount) {
    return /^\d+\/\d+$/.test(amount);
}
function isSize(amount) {
    return /^-?(\d+(\.\d+)?)+(rem|em|px|rpx|vh|vw|ch|ex|cm|mm|in|pt|pc)$/.test(amount);
}
function isSpace(str) {
    return /^\s*$/.test(str);
}
function roundUp(num, precision) {
    if (precision === void 0) { precision = 0; }
    precision = Math.pow(10, precision);
    return Math.round(num * precision) / precision;
}
function fracToPercent(amount) {
    var matches = amount.match(/[^/]+/g);
    if (!matches || matches.length < 2)
        return;
    var a = +matches[0];
    var b = +matches[1];
    return roundUp((a / b) * 100, 6) + '%';
}
function hex2RGB(hex) {
    var RGB_HEX = /^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i;
    var _a = String(hex).match(RGB_HEX) || [], short = _a[1], long = _a[2];
    if (long) {
        var value = Number.parseInt(long, 16);
        return [value >> 16, (value >> 8) & 0xff, value & 0xff];
    }
    else if (short) {
        return Array.from(short, function (s) { return Number.parseInt(s, 16); }).map(function (n) { return (n << 4) | n; });
    }
}
function camelToDash(str) {
    // Use exact the same regex as Post CSS
    return str.replace(/([A-Z])/g, '-$1').replace(/^ms-/, '-ms-').toLowerCase();
}
function dashToCamel(str) {
    if (!/-/.test(str))
        return str;
    return str.toLowerCase().replace(/-(.)/g, function (_, group) { return group.toUpperCase(); });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj, key) {
    var topKey = key.match(/^[^.[]+/);
    if (!topKey)
        return;
    var topValue = obj[topKey[0]];
    if (!topValue)
        return;
    var index = topKey[0].length;
    while (index < key.length) {
        var square = key.slice(index).match(/\[[^\s\]]+?\]/);
        var dot = key.slice(index).match(/\.[^.[]+$|\.[^.[]+(?=\.)/);
        if ((!square && !dot) || ((square === null || square === void 0 ? void 0 : square.index) === undefined && (dot === null || dot === void 0 ? void 0 : dot.index) === undefined))
            return topValue;
        if (typeof topValue !== 'object')
            return;
        if (dot && dot.index !== undefined && ((square === null || square === void 0 ? void 0 : square.index) === undefined || dot.index < square.index)) {
            var arg = dot[0].slice(1);
            topValue = topValue[arg];
            index += dot.index + dot[0].length;
        }
        else if (square && square.index !== undefined) {
            var arg = square[0].slice(1, -1).trim().replace(/^['"]+|['"]+$/g, '');
            topValue = topValue[arg];
            index += square.index + square[0].length;
        }
    }
    return topValue;
}
function negateValue(value) {
    if (/(^0\w)|(^-)|(^0$)/.test(value))
        return value;
    return '-' + value;
}
function searchFrom(text, target, startIndex, endIndex) {
    if (startIndex === void 0) { startIndex = 0; }
    // search from partial of string
    var subText = text.substring(startIndex, endIndex);
    var relativeIndex = subText.search(target);
    return relativeIndex === -1 ? -1 : startIndex + relativeIndex;
}
function connectList(a, b, append) {
    if (append === void 0) { append = true; }
    return append ? __spreadArray(__spreadArray([], (a !== null && a !== void 0 ? a : []), true), (b !== null && b !== void 0 ? b : []), true) : __spreadArray(__spreadArray([], (b !== null && b !== void 0 ? b : []), true), (a !== null && a !== void 0 ? a : []), true);
}
function toType(value, type) {
    switch (type) {
        case 'object':
            return value && typeof value === 'object' ? value : {};
        case 'string':
            if (typeof value === 'string')
                return value;
            break;
        case 'number':
            if (typeof value === 'number')
                return value;
            break;
    }
}
function deepCopy(source) {
    return Array.isArray(source)
        ? source.map(function (item) { return deepCopy(item); })
        : source instanceof Date
            ? new Date(source.getTime())
            : source && typeof source === 'object'
                ? Object.getOwnPropertyNames(source).reduce(function (o, prop) {
                    var descriptor = Object.getOwnPropertyDescriptor(source, prop);
                    if (descriptor) {
                        Object.defineProperty(o, prop, descriptor);
                        if (source && typeof source === 'object') {
                            o[prop] = deepCopy(source[prop]);
                        }
                    }
                    return o;
                }, Object.create(Object.getPrototypeOf(source)))
                : source;
}
function isTagName(name) {
    return ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embd', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'].includes(name);
}
function flatColors(colors, head) {
    var flatten = {};
    for (var _i = 0, _a = Object.entries(colors); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (typeof value === 'string' || typeof value === 'function') {
            flatten[(head && key === 'DEFAULT') ? head : head ? "".concat(head, "-").concat(key) : key] = value;
        }
        else {
            flatten = __assign(__assign({}, flatten), flatColors(value, head ? "".concat(head, "-").concat(key) : key));
        }
    }
    return flatten;
}
function testRegexr(text, expressions) {
    for (var _i = 0, expressions_1 = expressions; _i < expressions_1.length; _i++) {
        var exp = expressions_1[_i];
        if (exp.test(text))
            return true;
    }
    return false;
}
function searchPropEnd(text, startIndex) {
    if (startIndex === void 0) { startIndex = 0; }
    var index = startIndex;
    var output = -1;
    var openSingleQuote = false;
    var openDoubleQuote = false;
    var openBracket = false;
    var isEscaped = false;
    while (index < text.length) {
        switch (text.charAt(index)) {
            case '\\':
                isEscaped = !isEscaped;
                break;
            case '\'':
                if (!openDoubleQuote && !openBracket && !isEscaped)
                    openSingleQuote = !openSingleQuote;
                isEscaped = false;
                break;
            case '"':
                if (!openSingleQuote && !openBracket && !isEscaped)
                    openDoubleQuote = !openDoubleQuote;
                isEscaped = false;
                break;
            case '(':
                if (!openBracket && !openSingleQuote && !openDoubleQuote && !isEscaped)
                    openBracket = true;
                isEscaped = false;
                break;
            case ')':
                if (openBracket && !isEscaped)
                    openBracket = false;
                isEscaped = false;
                break;
            case ';':
                if (!isEscaped && !openSingleQuote && !openDoubleQuote && !openBracket)
                    output = index;
                isEscaped = false;
                break;
            default:
                isEscaped = false;
                break;
        }
        if (output !== -1)
            break;
        index++;
    }
    return output;
}
function searchNotEscape(text, chars) {
    if (chars === void 0) { chars = ['{']; }
    if (!Array.isArray(chars))
        chars = [chars];
    var i = 0;
    while (i < text.length) {
        if (chars.includes(text.charAt(i)) && text.charAt(i - 1) !== '\\') {
            return i;
        }
        i++;
    }
    return -1;
}
function splitSelectors(selectors) {
    var splitted = [];
    var parens = 0;
    var angulars = 0;
    var soFar = '';
    for (var i = 0, len = selectors.length; i < len; i++) {
        var char = selectors[i];
        if (char === '(') {
            parens += 1;
        }
        else if (char === ')') {
            parens -= 1;
        }
        else if (char === '[') {
            angulars += 1;
        }
        else if (char === ']') {
            angulars -= 1;
        }
        else if (char === ',') {
            if (!parens && !angulars) {
                splitted.push(soFar.trim());
                soFar = '';
                continue;
            }
        }
        soFar += char;
    }
    splitted.push(soFar.trim());
    return splitted;
}
function guessClassName(selector) {
    var _a;
    if (selector.indexOf(',') >= 0) {
        var splittedSelectors = splitSelectors(selector);
        if (splittedSelectors.length !== 1)
            return splittedSelectors.map(function (i) { return guessClassName(i); });
    }
    // not classes, contains attribute selectors, nested selectors - treat as static
    if (selector.charAt(0) !== '.' || searchNotEscape(selector, ['[', '>', '+', '~']) >= 0 || selector.trim().indexOf(' ') >= 0 || searchNotEscape(selector.slice(1), '.') >= 0)
        return { selector: selector, isClass: false };
    var pseudo = searchNotEscape(selector, ':');
    var className = (((_a = selector.match(/^\.([\w-]|(\\\W))+/)) === null || _a === void 0 ? void 0 : _a[0].slice(1)) || '').replace(/\\/g, '');
    if (pseudo === -1)
        return { selector: className, isClass: true };
    return { selector: className, isClass: true, pseudo: selector.slice(pseudo) };
}
function increaseWithUnit(target, delta) {
    var _a;
    if (typeof target === 'number')
        return target + delta;
    var value = ((_a = target.match(/^-?[0-9]+\.?[0-9]*/)) === null || _a === void 0 ? void 0 : _a[0]) || '';
    var unit = target.slice(value.length);
    var result = (parseFloat(value) + delta);
    if (Number.isNaN(result))
        return target;
    return result + unit;
}
function splitColorGroup(color) {
    var sep = color.indexOf('/');
    if (sep === -1)
        return [color, undefined];
    return [color.slice(0, sep), color.slice(sep + 1)];
}

var Property = /** @class */ (function () {
    function Property(name, value, comment, important) {
        if (important === void 0) { important = false; }
        this.meta = { type: 'utilities', group: 'plugin', order: 0, offset: 0, corePlugin: false };
        this.name = name;
        this.value = value;
        this.comment = comment;
        this.important = important;
    }
    Property._singleParse = function (css) {
        css = css.trim();
        if (!css)
            return;
        if (css.charAt(0) === '@')
            return InlineAtRule.parse(css);
        var split = css.search(':');
        var end = searchPropEnd(css);
        if (split === -1)
            return;
        var important = false;
        var prop = css.substring(split + 1, end === -1 ? undefined : end).trim();
        if (/!important;?$/.test(prop)) {
            important = true;
            prop = prop.replace(/!important/, '').trimRight();
        }
        return new Property(css.substring(0, split).trim(), prop, undefined, important);
    };
    Property.parse = function (css) {
        if (!/;\s*$/.test(css))
            css += ';'; // Fix for the situation where the last semicolon is omitted
        var properties = [];
        var index = 0;
        var end = searchPropEnd(css, index);
        while (end !== -1) {
            var parsed = this._singleParse(css.substring(searchFrom(css, /\S/, index), end + 1));
            if (parsed)
                properties.push(parsed);
            index = end + 1;
            end = searchPropEnd(css, index);
        }
        var count = properties.length;
        if (count > 1)
            return properties;
        if (count === 1)
            return properties[0];
    };
    Property.prototype.clone = function () {
        return deepCopy(this);
    };
    Property.prototype.toStyle = function (selector) {
        var style = new Style(selector, this, this.important);
        style.meta = this.meta;
        return style;
    };
    Property.prototype.build = function (minify) {
        var _this = this;
        if (minify === void 0) { minify = false; }
        var createProperty = function (name, value) {
            if (minify) {
                return "".concat(name, ":").concat(value).concat(_this.important ? '!important' : '', ";");
            }
            else {
                var p = "".concat(name, ": ").concat(value).concat(_this.important ? ' !important' : '', ";");
                return _this.comment ? p + " /* ".concat(_this.comment, " */") : p;
            }
        };
        if (!this.value)
            return '';
        return typeof this.name === 'string'
            ? createProperty(this.name, this.value)
            : this.name
                .map(function (i) { return createProperty(i, _this.value); })
                .join(minify ? '' : '\n');
    };
    Property.prototype.updateMeta = function (type, group, order, offset, corePlugin) {
        if (offset === void 0) { offset = 0; }
        if (corePlugin === void 0) { corePlugin = false; }
        this.meta = {
            type: type,
            group: group,
            order: order,
            offset: offset,
            corePlugin: corePlugin,
        };
        return this;
    };
    return Property;
}());
var InlineAtRule = /** @class */ (function (_super) {
    __extends(InlineAtRule, _super);
    function InlineAtRule(name, value, important) {
        if (important === void 0) { important = false; }
        var _this = _super.call(this, name, value, undefined, important) || this;
        _this.name = name;
        return _this;
    }
    InlineAtRule.parse = function (css) {
        var _a;
        var matchName = css.match(/@[^\s;{}]+/);
        if (matchName) {
            var name_1 = matchName[0].substring(1);
            var important = false;
            var expression = matchName.index !== undefined
                ? (_a = css
                    .substring(matchName.index + name_1.length + 1)
                    .match(/(?:(['"]).*?\1|[^;])*/)) === null || _a === void 0 ? void 0 : _a[0].trim()
                : undefined;
            if (expression && /!important;?$/.test(expression)) {
                important = true;
                expression = expression.replace(/!important/, '').trimRight();
            }
            return new InlineAtRule(name_1, expression === '' ? undefined : expression, important);
        }
    };
    InlineAtRule.prototype.build = function () {
        return this.value
            ? "@".concat(this.name, " ").concat(this.value).concat(this.important ? ' !important' : '', ";")
            : "@".concat(this.name).concat(this.important ? ' !important' : '', ";");
    };
    return InlineAtRule;
}(Property));
var Style = /** @class */ (function () {
    function Style(selector, property, important) {
        if (important === void 0) { important = false; }
        this.meta = { type: 'components', group: 'plugin', order: 0, offset: 0, corePlugin: false };
        this.selector = selector;
        this.important = important;
        this.property = toArray(property || []);
    }
    Object.defineProperty(Style.prototype, "rule", {
        get: function () {
            var _this = this;
            var _a, _b, _c;
            var selectors = ((_a = this.selector) !== null && _a !== void 0 ? _a : '').trim().split(/\s*,\s*/g);
            this._parentSelectors && (selectors = selectors.map(function (i) { var _a; return "".concat((_a = _this._parentSelectors) === null || _a === void 0 ? void 0 : _a.join(' '), " ").concat(i); }));
            ((_b = this._wrapSelectors) !== null && _b !== void 0 ? _b : []).forEach(function (func) { return (selectors = selectors.map(function (i) { return func(i); })); });
            this._pseudoClasses && (selectors = selectors.map(function (i) { var _a; return i + ":".concat((_a = _this._pseudoClasses) === null || _a === void 0 ? void 0 : _a.join(':')); }));
            this._pseudoElements && (selectors = selectors.map(function (i) { var _a; return i + "::".concat((_a = _this._pseudoElements) === null || _a === void 0 ? void 0 : _a.join('::')); }));
            this._brotherSelectors && (selectors = selectors.map(function (i) { var _a; return i + ".".concat((_a = _this._brotherSelectors) === null || _a === void 0 ? void 0 : _a.join('.')); }));
            this._childSelectors && (selectors = selectors.map(function (i) { var _a; return i + " ".concat((_a = _this._childSelectors) === null || _a === void 0 ? void 0 : _a.join(' ')); }));
            ((_c = this._wrapRules) !== null && _c !== void 0 ? _c : []).forEach(function (func) { return (selectors = selectors.map(function (i) { return func(i); })); });
            return selectors.join(', ');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "pseudoClasses", {
        get: function () {
            return this._pseudoClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "pseudoElements", {
        get: function () {
            return this._pseudoElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "parentSelectors", {
        get: function () {
            return this._parentSelectors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "childSelectors", {
        get: function () {
            return this._childSelectors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "brotherSelectors", {
        get: function () {
            return this._brotherSelectors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "wrapProperties", {
        get: function () {
            return this._wrapProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "wrapSelectors", {
        get: function () {
            return this._wrapSelectors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "wrapRules", {
        get: function () {
            return this._wrapRules;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "simple", {
        get: function () {
            // is this style only has property and no wrap?
            return !(this.atRules || this._pseudoClasses || this._pseudoElements || this._parentSelectors || this._childSelectors || this._brotherSelectors || this._wrapProperties || this._wrapSelectors || this._wrapRules);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style.prototype, "isAtrule", {
        get: function () {
            return !(this.atRules === undefined || this.atRules.length === 0);
        },
        enumerable: false,
        configurable: true
    });
    Style.generate = function (parent, property, root) {
        if (!root)
            root = (parent === null || parent === void 0 ? void 0 : parent.startsWith('@'))
                ? new Style().atRule(parent)
                : new Style(parent);
        var output = [];
        var _loop_1 = function (key, value) {
            var propertyValue = value;
            if (Array.isArray(propertyValue) && propertyValue.every(function (e) { return typeof e === 'object'; })) {
                propertyValue = Object.assign.apply(Object, __spreadArray([{}], propertyValue, false));
            }
            if (typeof propertyValue === 'string') {
                root.add(new Property(camelToDash(key), propertyValue));
            }
            else if (Array.isArray(propertyValue)) {
                propertyValue.map(function (i) { return root === null || root === void 0 ? void 0 : root.add(new Property(camelToDash(key), i)); });
            }
            else {
                var wrap = deepCopy(root);
                wrap.property = [];
                var child = void 0;
                if (key.startsWith('@')) {
                    child = wrap.atRule(key, false);
                }
                else {
                    if (wrap.selector === undefined) {
                        wrap.selector = key;
                        child = wrap;
                    }
                    else {
                        if (/^[a-z]+$/.test(key) && !isTagName(key)) {
                            wrap.wrapProperty(function (property) { return "".concat(key, "-").concat(property); });
                            child = wrap;
                        }
                        else {
                            var _hKey_1 = function (selector, key) { return (/&/.test(key) ? key : "& ".concat(key)).replace('&', selector); };
                            wrap.wrapSelector(function (selector) {
                                return selector
                                    .trim()
                                    .split(/\s*,\s*/g)
                                    .map(function (s) {
                                    return key
                                        .split(/\s*,\s*/g)
                                        .map(function (i) { return _hKey_1(s, i); })
                                        .join(', ');
                                })
                                    .join(', ');
                            });
                            child = wrap;
                        }
                    }
                }
                output = output.concat(Style.generate(key.startsWith('@') ? undefined : key, propertyValue, child));
            }
        };
        for (var _i = 0, _a = Object.entries(property !== null && property !== void 0 ? property : {}); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            _loop_1(key, value);
        }
        if (root.property.length > 0)
            output.unshift(root);
        return output;
    };
    Style.prototype.atRule = function (atrule, append) {
        if (append === void 0) { append = true; }
        if (!atrule)
            return this;
        if (this.atRules) {
            append ? this.atRules.push(atrule) : this.atRules.unshift(atrule);
        }
        else {
            this.atRules = [atrule];
        }
        return this;
    };
    Style.prototype.pseudoClass = function (string) {
        if (this._pseudoClasses) {
            this._pseudoClasses.push(string);
        }
        else {
            this._pseudoClasses = [string];
        }
        return this;
    };
    Style.prototype.pseudoElement = function (string) {
        if (this._pseudoElements) {
            this._pseudoElements.push(string);
        }
        else {
            this._pseudoElements = [string];
        }
        return this;
    };
    Style.prototype.brother = function (string) {
        if (this._brotherSelectors) {
            this._brotherSelectors.push(string);
        }
        else {
            this._brotherSelectors = [string];
        }
        return this;
    };
    Style.prototype.parent = function (string) {
        if (this._parentSelectors) {
            this._parentSelectors.push(string);
        }
        else {
            this._parentSelectors = [string];
        }
        return this;
    };
    Style.prototype.child = function (string) {
        if (this._childSelectors) {
            this._childSelectors.push(string);
        }
        else {
            this._childSelectors = [string];
        }
        return this;
    };
    Style.prototype.wrapProperty = function (func) {
        if (this._wrapProperties) {
            this._wrapProperties.push(func);
        }
        else {
            this._wrapProperties = [func];
        }
        return this;
    };
    Style.prototype.wrapSelector = function (func) {
        if (this._wrapSelectors) {
            this._wrapSelectors.push(func);
        }
        else {
            this._wrapSelectors = [func];
        }
        return this;
    };
    Style.prototype.wrapRule = function (func) {
        if (this._wrapRules) {
            this._wrapRules.push(func);
        }
        else {
            this._wrapRules = [func];
        }
        return this;
    };
    Style.prototype.add = function (item) {
        item = toArray(item);
        if (this.important)
            item.forEach(function (i) { return (i.important = true); });
        this.property = __spreadArray(__spreadArray([], this.property, true), item, true);
        return this;
    };
    Style.prototype.extend = function (item, onlyProperty, append) {
        if (onlyProperty === void 0) { onlyProperty = false; }
        if (append === void 0) { append = true; }
        if (!item)
            return this;
        if (item.wrapProperties) {
            var props_1 = [];
            item.property.forEach(function (p) {
                var _a;
                var pc = new Property(p.name, p.value, p.comment);
                (_a = item.wrapProperties) === null || _a === void 0 ? void 0 : _a.forEach(function (wrap) {
                    pc.name = Array.isArray(pc.name)
                        ? pc.name.map(function (i) { return wrap(i); })
                        : wrap(pc.name);
                });
                if (item.important)
                    pc.important = true;
                props_1.push(pc);
            });
            this.property = connectList(this.property, props_1, append);
        }
        else {
            if (item.important)
                item.property.forEach(function (i) { return (i.important = true); });
            this.property = connectList(this.property, item.property, append);
        }
        if (onlyProperty)
            return this;
        item.selector && (this.selector = item.selector);
        this.meta = item.meta;
        item.atRules &&
            (this.atRules = connectList(item.atRules, this.atRules, append)); // atrule is build in reverse
        item._brotherSelectors &&
            (this._brotherSelectors = connectList(this._brotherSelectors, item._brotherSelectors, append));
        item._childSelectors &&
            (this._childSelectors = connectList(this._childSelectors, item._childSelectors, append));
        item._parentSelectors &&
            (this._parentSelectors = connectList(this._parentSelectors, item._parentSelectors, append));
        item._pseudoClasses &&
            (this._pseudoClasses = connectList(this._pseudoClasses, item._pseudoClasses, append));
        item._pseudoElements &&
            (this._pseudoElements = connectList(this._pseudoElements, item._pseudoElements, append));
        item._wrapRules &&
            (this._wrapRules = connectList(this._wrapRules, item._wrapRules, append));
        item._wrapSelectors &&
            (this._wrapSelectors = connectList(this._wrapSelectors, item._wrapSelectors, append));
        return this;
    };
    Style.prototype.clean = function () {
        // remove duplicated property
        var property = [];
        var cache = [];
        this.property.forEach(function (i) {
            var inline = i.build();
            if (!cache.includes(inline)) {
                cache.push(inline);
                property.push(i);
            }
        });
        this.property = property;
        return this;
    };
    Style.prototype.flat = function () {
        var properties = [];
        this.property.forEach(function (p) {
            if (Array.isArray(p.name)) {
                p.name.forEach(function (i) {
                    properties.push(new Property(i, p.value, p.comment));
                });
            }
            else {
                properties.push(p);
            }
        });
        this.property = properties;
        return this;
    };
    Style.prototype.clone = function (selector, property) {
        var newStyle = deepCopy(this);
        if (selector)
            newStyle.selector = selector;
        if (property)
            newStyle.property = Array.isArray(property) ? property : [property];
        return newStyle;
    };
    Style.prototype.sort = function () {
        // sort property
        this.property = this.property.sort(function (a, b) {
            return "".concat(a.name).substring(0, 2) > "".concat(b.name).substring(0, 2) ? 1 : -1;
        });
        return this;
    };
    Style.prototype.build = function (minify, prefixer) {
        var _this = this;
        if (minify === void 0) { minify = false; }
        if (prefixer === void 0) { prefixer = true; }
        var properties = this.property;
        if (!prefixer)
            properties = properties.filter(function (p) {
                if (p.value && /-(webkit|ms|moz|o)-/.test(p.value))
                    return false;
                if (Array.isArray(p.name)) {
                    p.name = p.name.filter(function (i) { return !/^-(webkit|ms|moz|o)-/.test(i); });
                    return true;
                }
                return !/^-(webkit|ms|moz|o)-/.test(p.name);
            });
        var result = properties.map(function (p) {
            if (_this._wrapProperties) {
                var name_2 = p.name;
                _this._wrapProperties.forEach(function (w) { return (name_2 = Array.isArray(name_2) ? name_2.map(function (n) { return w(n); }) : w(name_2)); });
                return new Property(name_2, p.value, p.comment, _this.important ? true : p.important).build(minify);
            }
            return _this.important ? new Property(p.name, p.value, p.comment, true).build(minify) : p.build(minify);
        }).join(minify ? '' : '\n');
        if (!this.selector && !this.atRules)
            return result.replace(/;}/g, '}');
        if (this.selector)
            result = (minify ? this.rule.replace(/,\s/g, ',') : this.rule + ' ') + wrapit(result, undefined, undefined, undefined, result !== '' ? minify : true);
        if (this.atRules) {
            for (var _i = 0, _a = this.atRules; _i < _a.length; _i++) {
                var rule = _a[_i];
                result = minify ? "".concat(rule.replace(/\s/g, '')).concat(wrapit(result, undefined, undefined, undefined, minify)) : "".concat(rule, " ").concat(wrapit(result, undefined, undefined, undefined, result !== '' ? minify : true));
            }
        }
        return minify ? result.replace(/;}/g, '}') : result;
    };
    Style.prototype.updateMeta = function (type, group, order, offset, corePlugin, respectSelector) {
        if (offset === void 0) { offset = 0; }
        if (corePlugin === void 0) { corePlugin = false; }
        if (respectSelector === void 0) { respectSelector = false; }
        this.meta = {
            type: type,
            group: group,
            order: order,
            offset: offset,
            corePlugin: corePlugin,
            respectSelector: respectSelector,
        };
        return this;
    };
    return Style;
}());
/** @class */ ((function (_super) {
    __extends(GlobalStyle, _super);
    function GlobalStyle(selector, property, important) {
        return _super.call(this, selector, property, important) || this;
    }
    return GlobalStyle;
})(Style));
var Keyframes = /** @class */ (function (_super) {
    __extends(Keyframes, _super);
    function Keyframes(selector, property, important) {
        return _super.call(this, selector, property, important) || this;
    }
    // root param only for consist with style
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Keyframes.generate = function (name, children, root, prefixer) {
        if (prefixer === void 0) { prefixer = true; }
        var styles = [];
        var webkitStyles = [];
        for (var _i = 0, _a = Object.entries(children); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            var style = new Keyframes(key).atRule("@keyframes ".concat(name));
            var webkitStyle = new Keyframes(key).atRule("@-webkit-keyframes ".concat(name));
            for (var _c = 0, _d = Object.entries(value); _c < _d.length; _c++) {
                var _e = _d[_c], pkey = _e[0], pvalue = _e[1];
                var prop = pkey;
                if (pkey === 'transform') {
                    prop = prefixer ? ['-webkit-transform', 'transform'] : 'transform';
                }
                else if (['animationTimingFunction', 'animation-timing-function'].includes(pkey)) {
                    prop = prefixer ? [
                        '-webkit-animation-timing-function',
                        'animation-timing-function',
                    ] : 'animation-timing-function';
                }
                style.add(new Property(prop, pvalue));
                webkitStyle.add(new Property(prop, pvalue));
            }
            styles.push(style);
            if (prefixer)
                webkitStyles.push(webkitStyle);
        }
        return __spreadArray(__spreadArray([], styles, true), webkitStyles, true);
    };
    return Keyframes;
}(Style));
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container(selector, property, important) {
        return _super.call(this, selector, property, important) || this;
    }
    return Container;
}(Style));

var minMaxWidth = /(!?\(\s*min(-device-)?-width).+\(\s*max(-device)?-width/i;
var minWidth = /\(\s*min(-device)?-width/i;
var maxMinWidth = /(!?\(\s*max(-device)?-width).+\(\s*min(-device)?-width/i;
var maxWidth = /\(\s*max(-device)?-width/i;
var isMinWidth = _testQuery(minMaxWidth, maxMinWidth, minWidth);
var isMaxWidth = _testQuery(maxMinWidth, minMaxWidth, maxWidth);
var minMaxHeight = /(!?\(\s*min(-device)?-height).+\(\s*max(-device)?-height/i;
var minHeight = /\(\s*min(-device)?-height/i;
var maxMinHeight = /(!?\(\s*max(-device)?-height).+\(\s*min(-device)?-height/i;
var maxHeight = /\(\s*max(-device)?-height/i;
var isMinHeight = _testQuery(minMaxHeight, maxMinHeight, minHeight);
var isMaxHeight = _testQuery(maxMinHeight, minMaxHeight, maxHeight);
var isPrint = /print/i;
var isPrintOnly = /^print\$/i;
var isAtRule = /^\s*@/i;
var isMedia = /^\s*@media/i;
var maxValue = Number.MAX_VALUE;
function _getQueryLength(length) {
    var result = /(-?\d*\.?\d+)(ch|em|ex|px|rpx|rem)/.exec(length);
    if (result === null) {
        return maxValue;
    }
    var number = result[1];
    var unit = result[2];
    switch (unit) {
        case 'ch':
            return parseFloat(number) * 8.8984375;
        case 'em':
        case 'rem':
            return parseFloat(number) * 16;
        case 'ex':
            return parseFloat(number) * 8.296875;
        case 'px':
        case 'rpx':
            return parseFloat(number);
    }
    return +number;
}
function _testQuery(doubleTestTrue, doubleTestFalse, singleTest) {
    return function (query) {
        if (doubleTestTrue.test(query)) {
            return true;
        }
        else if (doubleTestFalse.test(query)) {
            return false;
        }
        return singleTest.test(query);
    };
}
function _testAtRule(a, b) {
    var isMediaA = isMedia.test(a);
    var isMediaB = isMedia.test(b);
    if (isMediaA && isMediaB)
        return null;
    var isAtRuleA = isAtRule.test(a);
    var isAtRuleB = isAtRule.test(b);
    if (isAtRuleA)
        return 1;
    if (isAtRuleB)
        return -1;
    return 0; // don't sort selector name, may cause overwrite bug.
}
function _testIsPrint(a, b) {
    var isPrintA = isPrint.test(a);
    var isPrintOnlyA = isPrintOnly.test(a);
    var isPrintB = isPrint.test(b);
    var isPrintOnlyB = isPrintOnly.test(b);
    if (isPrintA && isPrintB) {
        if (!isPrintOnlyA && isPrintOnlyB) {
            return 1;
        }
        if (isPrintOnlyA && !isPrintOnlyB) {
            return -1;
        }
        return a.localeCompare(b);
    }
    if (isPrintA) {
        return 1;
    }
    if (isPrintB) {
        return -1;
    }
    return null;
}
function sortMediaQuery(a, b) {
    var testAtRule = _testAtRule(a, b);
    if (testAtRule !== null)
        return testAtRule;
    var testIsPrint = _testIsPrint(a, b);
    if (testIsPrint !== null)
        return testIsPrint;
    var minA = isMinWidth(a) || isMinHeight(a);
    var maxA = isMaxWidth(a) || isMaxHeight(a);
    var minB = isMinWidth(b) || isMinHeight(b);
    var maxB = isMaxWidth(b) || isMaxHeight(b);
    if (minA && maxB) {
        return -1;
    }
    if (maxA && minB) {
        return 1;
    }
    var lengthA = _getQueryLength(a);
    var lengthB = _getQueryLength(b);
    if (lengthA === maxValue && lengthB === maxValue) {
        return a.localeCompare(b);
    }
    else if (lengthA === maxValue) {
        return 1;
    }
    else if (lengthB === maxValue) {
        return -1;
    }
    if (lengthA > lengthB) {
        if (maxA) {
            return -1;
        }
        return 1;
    }
    if (lengthA < lengthB) {
        if (maxA) {
            return 1;
        }
        return -1;
    }
    return a.localeCompare(b);
}

function getWeights(a) {
    var first = a.charAt(0);
    var second = a.charAt(1);
    if (first === ':' && second === ':')
        return 59; // ::moz ...
    if (first === '#')
        return 500; // #id ...
    if (first !== '.')
        return first.charCodeAt(0); // html, body ...
    return 499;
}
function sortMeta(a, b) {
    var _a, _b, _c, _d;
    if (a.meta.type === 'base' && b.meta.type === 'base')
        return getWeights((_a = a.selector) !== null && _a !== void 0 ? _a : '') - getWeights((_b = b.selector) !== null && _b !== void 0 ? _b : '');
    return sortMediaQuery(((_c = a.meta.variants) === null || _c === void 0 ? void 0 : _c[0]) || '', ((_d = b.meta.variants) === null || _d === void 0 ? void 0 : _d[0]) || '') || (a.meta.order - b.meta.order) || (a.meta.offset - b.meta.offset) || +b.meta.corePlugin - +a.meta.corePlugin;
}
function sortGroup(a, b) {
    var _a, _b;
    return sortMediaQuery(((_a = a.meta.variants) === null || _a === void 0 ? void 0 : _a[0]) || '', ((_b = b.meta.variants) === null || _b === void 0 ? void 0 : _b[0]) || '') || (a.meta.order - b.meta.order);
}

function _buildAtrule(atrule, children, minify, prefixer) {
    if (minify === void 0) { minify = false; }
    if (prefixer === void 0) { prefixer = true; }
    return "".concat(atrule).concat(minify ? '' : ' ').concat(wrapit(_buildStyleList(children, minify, prefixer), undefined, undefined, undefined, minify));
}
function _buildStyleList(styleList, minify, prefixer) {
    if (minify === void 0) { minify = false; }
    if (prefixer === void 0) { prefixer = true; }
    var currentAtrule;
    var currentStyle;
    var styleStack = [];
    var output = [];
    var _loop_1 = function (style) {
        if (style.isAtrule) {
            if (currentStyle) {
                output.push(currentStyle.clean().build(minify, prefixer));
                currentStyle = undefined;
            }
            var newAtrule = style.atRules.pop();
            if (currentAtrule) {
                if (currentAtrule === newAtrule && newAtrule !== '@font-face') { // @font-face shouldn't been combined
                    styleStack.push(style);
                }
                else {
                    output.push(_buildAtrule(currentAtrule, styleStack, minify, prefixer));
                    currentAtrule = newAtrule;
                    styleStack = [style];
                }
            }
            else {
                currentAtrule = newAtrule;
                styleStack = [style];
            }
        }
        else {
            if (currentAtrule) {
                output.push(_buildAtrule(currentAtrule, styleStack, minify, prefixer));
                currentAtrule = undefined;
                styleStack = [];
            }
            if (currentStyle) {
                if (style.rule === currentStyle.rule) {
                    if (style.important)
                        style.property.forEach(function (p) { return p.important = true; });
                    if (style.wrapProperties)
                        style.property.forEach(function (p) { var _a; return (_a = style.wrapProperties) === null || _a === void 0 ? void 0 : _a.forEach(function (wrap) { return p.name = Array.isArray(p.name) ? p.name.map(function (i) { return wrap(i); }) : wrap(p.name); }); });
                    currentStyle.add(style.property);
                }
                else {
                    output.push(currentStyle.clean().build(minify, prefixer));
                    currentStyle = style;
                }
            }
            else {
                currentStyle = style;
            }
        }
    };
    for (var _i = 0, styleList_1 = styleList; _i < styleList_1.length; _i++) {
        var style = styleList_1[_i];
        _loop_1(style);
    }
    if (currentAtrule)
        output.push(_buildAtrule(currentAtrule, styleStack, minify, prefixer));
    if (currentStyle)
        output.push(currentStyle.clean().build(minify, prefixer));
    return output.join(minify ? '' : '\n');
}
function compileStyleSheet (styleList, minify, prefixer) {
    if (minify === void 0) { minify = false; }
    if (prefixer === void 0) { prefixer = true; }
    return _buildStyleList(deepCopy(styleList), minify, prefixer);
}

var StyleSheet = /** @class */ (function () {
    function StyleSheet(children) {
        this.prefixer = true;
        this.children = children || [];
    }
    StyleSheet.prototype.add = function (item) {
        if (!item)
            return this;
        if (Array.isArray(item)) {
            this.children = __spreadArray(__spreadArray([], this.children, true), item, true);
        }
        else {
            this.children.push(item);
        }
        return this;
    };
    StyleSheet.prototype.extend = function (styleSheet, append, dedup) {
        if (append === void 0) { append = true; }
        if (dedup === void 0) { dedup = false; }
        if (styleSheet) {
            var extended = styleSheet.children;
            if (dedup) {
                var hashes_1 = extended.map(function (i) { return hash(i.build()); });
                extended = extended.filter(function (i) { return !hashes_1.includes(hash(i.build())); });
            }
            this.prefixer = styleSheet.prefixer;
            this.children = append ? __spreadArray(__spreadArray([], this.children, true), extended, true) : __spreadArray(__spreadArray([], extended, true), this.children, true);
        }
        return this;
    };
    StyleSheet.prototype.combine = function () {
        var styleMap = {};
        this.children.forEach(function (style, index) {
            var _a;
            var hashValue = hash(style.atRules + style.meta.type + style.rule);
            if (hashValue in styleMap) {
                if ((_a = style.atRules) === null || _a === void 0 ? void 0 : _a.includes('@font-face')) {
                    // keeps multiple @font-face
                    styleMap[hashValue + index] = style;
                }
                else {
                    styleMap[hashValue] = styleMap[hashValue].extend(style, true);
                }
            }
            else {
                styleMap[hashValue] = style;
            }
        });
        this.children = Object.values(styleMap).map(function (i) { return i.clean(); });
        return this;
    };
    StyleSheet.prototype.layer = function (type) {
        var styleSheet = new StyleSheet(this.children.filter(function (i) { return i.meta.type === type; }));
        styleSheet.prefixer = this.prefixer;
        return styleSheet;
    };
    StyleSheet.prototype.split = function () {
        return {
            base: this.layer('base'),
            components: this.layer('components'),
            utilities: this.layer('utilities'),
        };
    };
    StyleSheet.prototype.clone = function () {
        return deepCopy(this);
    };
    StyleSheet.prototype.sort = function () {
        this.children = this.children.sort(sortMeta);
        return this;
    };
    StyleSheet.prototype.sortby = function (compareFn) {
        this.children = this.children.sort(compareFn);
        return this;
    };
    StyleSheet.prototype.build = function (minify) {
        if (minify === void 0) { minify = false; }
        return compileStyleSheet(this.children, minify, this.prefixer);
    };
    return StyleSheet;
}());

function linearGradient(value) {
    // Stupid method, will be changed in the next version...
    var map = {
        'linear-gradient(to top, var(--tw-gradient-stops))': [
            '-o-linear-gradient(bottom, var(--tw-gradient-stops))',
            '-webkit-gradient(linear, left bottom, left top, from(var(--tw-gradient-stops)))',
            'linear-gradient(to top, var(--tw-gradient-stops))',
        ],
        'linear-gradient(to top right, var(--tw-gradient-stops))': [
            '-o-linear-gradient(bottom left, var(--tw-gradient-stops))',
            '-webkit-gradient(linear, left bottom, right top, from(var(--tw-gradient-stops)))',
            'linear-gradient(to top right, var(--tw-gradient-stops))',
        ],
        'linear-gradient(to right, var(--tw-gradient-stops))': [
            '-o-linear-gradient(left, var(--tw-gradient-stops))',
            '-webkit-gradient(linear, left top, right top, from(var(--tw-gradient-stops)))',
            'linear-gradient(to right, var(--tw-gradient-stops))',
        ],
        'linear-gradient(to bottom right, var(--tw-gradient-stops))': [
            '-o-linear-gradient(top left, var(--tw-gradient-stops))',
            '-webkit-gradient(linear, left top, right bottom, from(var(--tw-gradient-stops)))',
            'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        ],
        'linear-gradient(to bottom, var(--tw-gradient-stops))': [
            '-o-linear-gradient(top, var(--tw-gradient-stops))',
            '-webkit-gradient(linear, left top, left bottom, from(var(--tw-gradient-stops)))',
            'linear-gradient(to bottom, var(--tw-gradient-stops))',
        ],
        'linear-gradient(to bottom left, var(--tw-gradient-stops))': [
            '-o-linear-gradient(top right, var(--tw-gradient-stops))',
            '-webkit-gradient(linear, right top, left bottom, from(var(--tw-gradient-stops)))',
            'linear-gradient(to bottom left, var(--tw-gradient-stops))',
        ],
        'linear-gradient(to left, var(--tw-gradient-stops))': [
            '-o-linear-gradient(right, var(--tw-gradient-stops))',
            '-webkit-gradient(linear, right top, left top, from(var(--tw-gradient-stops)))',
            'linear-gradient(to left, var(--tw-gradient-stops))',
        ],
        'linear-gradient(to top left, var(--tw-gradient-stops))': [
            '-o-linear-gradient(bottom right, var(--tw-gradient-stops))',
            '-webkit-gradient(linear, right bottom, left top, from(var(--tw-gradient-stops)))',
            'linear-gradient(to top left, var(--tw-gradient-stops))',
        ],
    };
    if (Object.keys(map).includes(value))
        return map[value];
    return value;
}
function minMaxContent(value) {
    if (value === 'min-content') {
        return ['-webkit-min-content', 'min-content'];
    }
    else if (value === 'max-content') {
        return ['-webkit-max-content', 'max-content'];
    }
    return value;
}

function isString(value) {
    return typeof value === 'string';
}
function negative(scale) {
    return Object.keys(scale)
        .filter(function (key) { return scale[key] !== '0'; })
        .reduce(function (negativeScale, key) {
        var _a;
        return (__assign(__assign({}, negativeScale), (_a = {}, _a["-".concat(key)] = negateValue(scale[key]), _a)));
    }, {});
}
function breakpoints(screens) {
    if (screens === void 0) { screens = {}; }
    return Object.keys(screens)
        .filter(function (key) { return typeof screens[key] === 'string'; })
        .reduce(function (breakpoints, key) {
        var _a;
        return (__assign(__assign({}, breakpoints), (_a = {}, _a["screen-".concat(key)] = screens[key], _a)));
    }, {});
}
function generateFontSize(font) {
    if (typeof font === 'string')
        return [new Property('font-size', font)];
    var properties = [];
    if (font[0])
        properties.push(new Property('font-size', font[0]));
    if (typeof font[1] === 'string') {
        properties.push(new Property('line-height', font[1]));
    }
    else if (font[1]) {
        if (font[1].lineHeight)
            properties.push(new Property('line-height', font[1].lineHeight));
        if (font[1].letterSpacing)
            properties.push(new Property('letter-spacing', font[1].letterSpacing));
    }
    return properties;
}
function expandDirection(value, divide) {
    if (divide === void 0) { divide = false; }
    var map = {
        '': ['*'],
        y: ['top', 'bottom'],
        x: ['left', 'right'],
        t: divide ? ['top-left', 'top-right'] : ['top'],
        r: divide ? ['top-right', 'bottom-right'] : ['right'],
        b: divide ? ['bottom-right', 'bottom-left'] : ['bottom'],
        l: divide ? ['top-left', 'bottom-left'] : ['left'],
        tl: ['top-left'],
        tr: ['top-right'],
        br: ['bottom-right'],
        bl: ['bottom-left'],
    };
    if (value in map)
        return map[value];
}
function generatePlaceholder(selector, property, prefixer) {
    if (prefixer === void 0) { prefixer = false; }
    if (!prefixer)
        return [new Style(selector, property).pseudoElement('placeholder')];
    return [
        new Style(selector, property).pseudoElement('-webkit-input-placeholder'),
        new Style(selector, property).pseudoElement('-moz-placeholder'),
        new Style(selector, property).pseudoClass('-ms-input-placeholder'),
        new Style(selector, property).pseudoElement('-ms-input-placeholder'),
        new Style(selector, property).pseudoElement('placeholder'),
    ];
}

function generateOrientations(orientations) {
    var variants = {};
    Object.entries(orientations).forEach(function (_a) {
        var name = _a[0], orientation = _a[1];
        variants[name] = function () { return new Style().atRule("@media (orientation: ".concat(orientation, ")")); };
    });
    return variants;
}

var colorString$1 = {exports: {}};

var colorName = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

var simpleSwizzle = {exports: {}};

var isArrayish$1 = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};

var isArrayish = isArrayish$1;

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle$1 = simpleSwizzle.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle$1.wrap = function (fn) {
	return function () {
		return fn(swizzle$1(arguments));
	};
};

/* MIT license */

var colorNames = colorName;
var swizzle = simpleSwizzle.exports;
var hasOwnProperty = Object.hasOwnProperty;

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (hasOwnProperty.call(colorNames, name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = colorString$1.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
	var keyword = /^(\w+)$/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = parseInt(hexAlpha, 16) / 255;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			if (match[5]) {
				rgb[3] = parseFloat(match[4]) * 0.01;
			} else {
				rgb[3] = parseFloat(match[4]);
			}
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			if (match[5]) {
				rgb[3] = parseFloat(match[4]) * 0.01;
			} else {
				rgb[3] = parseFloat(match[4]);
			}
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		if (!hasOwnProperty.call(colorNames, match[1])) {
			return null;
		}

		rgb = colorNames[match[1]];
		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = Math.round(num).toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}

var colorString = colorString$1.exports;

function hsl2rgb(h, s, l) {
    l /= 100;
    if (h >= 360)
        h %= 360;
    var c = (1 - Math.abs(2 * l - 1)) * (s / 100);
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = l - c / 2;
    var r = 0;
    var g = 0;
    var b = 0;
    if (0 <= h && h < 60) {
        r = c + m;
        g = x + m;
        b = m;
    }
    else if (60 <= h && h < 120) {
        r = x + m;
        g = c + m;
        b = m;
    }
    else if (120 <= h && h < 180) {
        r = m;
        g = c + m;
        b = x + m;
    }
    else if (180 <= h && h < 240) {
        r = m;
        g = x + m;
        b = c + m;
    }
    else if (240 <= h && h < 300) {
        r = x + m;
        g = m;
        b = c + m;
    }
    else if (300 <= h && h < 360) {
        r = c + m;
        g = m;
        b = x + m;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
    ];
}
function hwb2rgb(h, w, b) {
    var rgb = hsl2rgb(h, 100, 50);
    for (var i = 0; i < 3; ++i) {
        var c = rgb[i] / 255;
        c *= 1 - w / 100 - b / 100;
        c += w / 100;
        rgb[i] = Math.round(c * 255);
    }
    return rgb;
}
function toRGBA(color) {
    var _a;
    if (/^hsla?/.test(color)) {
        var color_array = colorString.get.hsl(color);
        if (!color_array)
            return;
        return __spreadArray(__spreadArray([], hsl2rgb(color_array[0], color_array[1], color_array[2]), true), [color_array[3]], false);
    }
    else if (/^rgba?/.test(color)) {
        var color_array = colorString.get.rgb(color);
        if (!color_array)
            return;
        return color_array;
    }
    else if (color.startsWith('hwb')) {
        var color_array = colorString.get.hwb(color);
        if (!color_array)
            return;
        return __spreadArray(__spreadArray([], hwb2rgb(color_array[0], color_array[1], color_array[2]), true), [color_array[3]], false);
    }
    return (_a = colorString.get(color)) === null || _a === void 0 ? void 0 : _a.value;
}
function toColor(color_string) {
    var rgba = toRGBA(color_string);
    var color = rgba ? rgba.slice(0, 3).join(', ') : color_string;
    var opacity = rgba ? rgba[3].toString() : '1';
    return { color: color, opacity: opacity };
}

function generateScreens(screens) {
    var variants = {};
    var breakpoints = Object.entries(screens).sort(function (_a, _b) {
        var sizeA = _a[1];
        var sizeB = _b[1];
        return sortWeight(sizeA) - sortWeight(sizeB);
    });
    breakpoints.forEach(function (_a, index) {
        var name = _a[0], size = _a[1];
        if (isString(size)) {
            var _b = breakpoints[index + 1] || [], nextSize = _b[1];
            variants[name] = styleForBreakpoint({ min: size });
            variants["<".concat(name)] = styleForBreakpoint({ max: increaseWithUnit(size, -0.1) });
            variants["@".concat(name)] = styleForBreakpoint(nextSize ? { min: size, max: increaseWithUnit(nextSize, -0.1) } : { min: size });
            variants["-".concat(name)] = styleForBreakpoint({ max: size });
            variants["+".concat(name)] = styleForBreakpoint(nextSize ? { min: size, max: nextSize } : { min: size });
        }
        else {
            variants[name] = styleForBreakpoint(size);
        }
    });
    return variants;
}
function styleForBreakpoint(rule) {
    var mediaConditions = 'raw' in rule ? rule.raw : [
        rule.min && "(min-width: ".concat(rule.min, ")"),
        rule.max && "(max-width: ".concat(rule.max, ")"),
    ].filter(function (condition) { return condition; }).join(' and ');
    return function () { return new Style().atRule("@media ".concat(mediaConditions)); };
}
// NOTE: Non-size breakpoints should come first, to avoid using them in the
// +breakpoint definition.
function sortWeight(breakpoint) {
    return isString(breakpoint) ? parseInt(breakpoint) : Number.NEGATIVE_INFINITY;
}

function generateThemes(darkMode) {
    if (!darkMode)
        return {};
    return {
        '@dark': function () { return new Style().atRule('@media (prefers-color-scheme: dark)'); },
        '@light': function () { return new Style().atRule('@media (prefers-color-scheme: light)'); },
        '.dark': function () { return new Style().parent('.dark'); },
        '.light': function () { return new Style().parent('.light'); },
        dark: function () { return darkMode === 'media' ? new Style().atRule('@media (prefers-color-scheme: dark)') : new Style().parent('.dark'); },
        light: function () { return darkMode === 'media' ? new Style().atRule('@media (prefers-color-scheme: light)') : new Style().parent('.light'); },
    };
}

var pseudoClassNames = [
    'hover',
    'focus',
    'active',
    'visited',
    'link',
    'target',
    'focus-visible',
    'focus-within',
    'checked',
    'default',
    'disabled',
    'enabled',
    'indeterminate',
    'invalid',
    'valid',
    'optional',
    'required',
    'placeholder-shown',
    'read-only',
    'read-write',
    'first-of-type',
    'last-of-type',
    'only-child',
    'only-of-type',
    'root',
    'empty',
];
var variantOrder = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], pseudoClassNames, true), [
    'not-checked',
    'not-disabled',
    'not-first-of-type',
    'not-last-of-type',
    'first',
    'not-first',
    'last',
    'not-last',
    'not-only-child',
    'not-only-of-type',
    'even',
    'odd',
    'even-of-type',
    'odd-of-type',
    'before',
    'after',
    'first-letter',
    'first-line',
    'file-selector-button',
    'file',
    'selection',
    'marker',
    'svg',
    'all',
    'children',
    'siblings',
    'sibling',
    'ltr',
    'rtl'
], false), pseudoClassNames.map(function (pseudoClassName) { return "group-".concat(pseudoClassName); }), true), [
    'motion-safe',
    'motion-reduce'
], false), pseudoClassNames.map(function (pseudoClassName) { return "peer-".concat(pseudoClassName); }), true), pseudoClassNames.map(function (pseudoClassName) { return "peer-not-".concat(pseudoClassName); }), true);
var layerOrder;
(function (layerOrder) {
    layerOrder[layerOrder["base"] = 10] = "base";
    layerOrder[layerOrder["components"] = 150] = "components";
    layerOrder[layerOrder["shortcuts"] = 160] = "shortcuts";
    layerOrder[layerOrder["utilities"] = 20000] = "utilities";
})(layerOrder || (layerOrder = {}));
var pluginOrder;
(function (pluginOrder) {
    pluginOrder[pluginOrder["columns"] = 80] = "columns";
    pluginOrder[pluginOrder["container"] = 100] = "container";
    pluginOrder[pluginOrder["space"] = 200] = "space";
    pluginOrder[pluginOrder["divideWidth"] = 300] = "divideWidth";
    pluginOrder[pluginOrder["divideColor"] = 400] = "divideColor";
    pluginOrder[pluginOrder["divideStyle"] = 500] = "divideStyle";
    pluginOrder[pluginOrder["divideOpacity"] = 600] = "divideOpacity";
    pluginOrder[pluginOrder["accessibility"] = 700] = "accessibility";
    pluginOrder[pluginOrder["appearance"] = 800] = "appearance";
    pluginOrder[pluginOrder["backgroundAttachment"] = 900] = "backgroundAttachment";
    pluginOrder[pluginOrder["backgroundClip"] = 1000] = "backgroundClip";
    pluginOrder[pluginOrder["backgroundColor"] = 1100] = "backgroundColor";
    pluginOrder[pluginOrder["backgroundImage"] = 1200] = "backgroundImage";
    pluginOrder[pluginOrder["gradientColorStops"] = 1300] = "gradientColorStops";
    pluginOrder[pluginOrder["backgroundOpacity"] = 1400] = "backgroundOpacity";
    pluginOrder[pluginOrder["backgroundPosition"] = 1500] = "backgroundPosition";
    pluginOrder[pluginOrder["backgroundRepeat"] = 1600] = "backgroundRepeat";
    pluginOrder[pluginOrder["backgroundSize"] = 1700] = "backgroundSize";
    pluginOrder[pluginOrder["backgroundOrigin"] = 1750] = "backgroundOrigin";
    pluginOrder[pluginOrder["borderCollapse"] = 1800] = "borderCollapse";
    pluginOrder[pluginOrder["borderColor"] = 1900] = "borderColor";
    pluginOrder[pluginOrder["borderOpacity"] = 2000] = "borderOpacity";
    pluginOrder[pluginOrder["borderRadius"] = 2100] = "borderRadius";
    pluginOrder[pluginOrder["borderStyle"] = 2200] = "borderStyle";
    pluginOrder[pluginOrder["borderWidth"] = 2300] = "borderWidth";
    pluginOrder[pluginOrder["boxDecorationBreak"] = 2350] = "boxDecorationBreak";
    pluginOrder[pluginOrder["boxSizing"] = 2400] = "boxSizing";
    pluginOrder[pluginOrder["cursor"] = 2500] = "cursor";
    pluginOrder[pluginOrder["captionSide"] = 2550] = "captionSide";
    pluginOrder[pluginOrder["emptyCells"] = 2560] = "emptyCells";
    pluginOrder[pluginOrder["display"] = 2600] = "display";
    pluginOrder[pluginOrder["flexBasis"] = 2699] = "flexBasis";
    pluginOrder[pluginOrder["flexDirection"] = 2700] = "flexDirection";
    pluginOrder[pluginOrder["flexWrap"] = 2800] = "flexWrap";
    pluginOrder[pluginOrder["placeItems"] = 2900] = "placeItems";
    pluginOrder[pluginOrder["placeContent"] = 3000] = "placeContent";
    pluginOrder[pluginOrder["placeSelf"] = 3100] = "placeSelf";
    pluginOrder[pluginOrder["alignItems"] = 3200] = "alignItems";
    pluginOrder[pluginOrder["alignContent"] = 3300] = "alignContent";
    pluginOrder[pluginOrder["alignSelf"] = 3400] = "alignSelf";
    pluginOrder[pluginOrder["justifyItems"] = 3500] = "justifyItems";
    pluginOrder[pluginOrder["justifyContent"] = 3600] = "justifyContent";
    pluginOrder[pluginOrder["justifySelf"] = 3700] = "justifySelf";
    pluginOrder[pluginOrder["flex"] = 3800] = "flex";
    pluginOrder[pluginOrder["flexGrow"] = 3900] = "flexGrow";
    pluginOrder[pluginOrder["flexShrink"] = 4000] = "flexShrink";
    pluginOrder[pluginOrder["order"] = 4100] = "order";
    pluginOrder[pluginOrder["float"] = 4200] = "float";
    pluginOrder[pluginOrder["clear"] = 4300] = "clear";
    pluginOrder[pluginOrder["fontFamily"] = 4400] = "fontFamily";
    pluginOrder[pluginOrder["fontWeight"] = 4500] = "fontWeight";
    pluginOrder[pluginOrder["height"] = 4600] = "height";
    pluginOrder[pluginOrder["fontSize"] = 4700] = "fontSize";
    pluginOrder[pluginOrder["lineHeight"] = 4800] = "lineHeight";
    pluginOrder[pluginOrder["listStylePosition"] = 4900] = "listStylePosition";
    pluginOrder[pluginOrder["listStyleType"] = 5000] = "listStyleType";
    pluginOrder[pluginOrder["margin"] = 5100] = "margin";
    pluginOrder[pluginOrder["maxHeight"] = 5200] = "maxHeight";
    pluginOrder[pluginOrder["maxWidth"] = 5300] = "maxWidth";
    pluginOrder[pluginOrder["minHeight"] = 5400] = "minHeight";
    pluginOrder[pluginOrder["minWidth"] = 5500] = "minWidth";
    pluginOrder[pluginOrder["objectFit"] = 5600] = "objectFit";
    pluginOrder[pluginOrder["objectPosition"] = 5700] = "objectPosition";
    pluginOrder[pluginOrder["opacity"] = 5800] = "opacity";
    pluginOrder[pluginOrder["outline"] = 5900] = "outline";
    pluginOrder[pluginOrder["overflow"] = 6000] = "overflow";
    pluginOrder[pluginOrder["overscrollBehavior"] = 6100] = "overscrollBehavior";
    pluginOrder[pluginOrder["padding"] = 6200] = "padding";
    pluginOrder[pluginOrder["placeholderColor"] = 6300] = "placeholderColor";
    pluginOrder[pluginOrder["placeholderOpacity"] = 6400] = "placeholderOpacity";
    pluginOrder[pluginOrder["caretColor"] = 6450] = "caretColor";
    pluginOrder[pluginOrder["caretOpacity"] = 6460] = "caretOpacity";
    pluginOrder[pluginOrder["tabSize"] = 6470] = "tabSize";
    pluginOrder[pluginOrder["pointerEvents"] = 6500] = "pointerEvents";
    pluginOrder[pluginOrder["position"] = 6600] = "position";
    pluginOrder[pluginOrder["inset"] = 6700] = "inset";
    pluginOrder[pluginOrder["resize"] = 6800] = "resize";
    pluginOrder[pluginOrder["boxShadow"] = 6900] = "boxShadow";
    pluginOrder[pluginOrder["boxShadowColor"] = 6950] = "boxShadowColor";
    pluginOrder[pluginOrder["ringWidth"] = 7000] = "ringWidth";
    pluginOrder[pluginOrder["ringOffsetColor"] = 7100] = "ringOffsetColor";
    pluginOrder[pluginOrder["ringOffsetWidth"] = 7200] = "ringOffsetWidth";
    pluginOrder[pluginOrder["ringColor"] = 7300] = "ringColor";
    pluginOrder[pluginOrder["ringOpacity"] = 7400] = "ringOpacity";
    pluginOrder[pluginOrder["fill"] = 7500] = "fill";
    pluginOrder[pluginOrder["stroke"] = 7600] = "stroke";
    pluginOrder[pluginOrder["strokeWidth"] = 7700] = "strokeWidth";
    pluginOrder[pluginOrder["strokeDashArray"] = 7750] = "strokeDashArray";
    pluginOrder[pluginOrder["strokeDashOffset"] = 7760] = "strokeDashOffset";
    pluginOrder[pluginOrder["tableLayout"] = 7800] = "tableLayout";
    pluginOrder[pluginOrder["textAlign"] = 7900] = "textAlign";
    pluginOrder[pluginOrder["textColor"] = 8000] = "textColor";
    pluginOrder[pluginOrder["textOpacity"] = 8100] = "textOpacity";
    pluginOrder[pluginOrder["textOverflow"] = 8200] = "textOverflow";
    pluginOrder[pluginOrder["textShadow"] = 8250] = "textShadow";
    pluginOrder[pluginOrder["fontStyle"] = 8300] = "fontStyle";
    pluginOrder[pluginOrder["textTransform"] = 8400] = "textTransform";
    pluginOrder[pluginOrder["textDecorationStyle"] = 8450] = "textDecorationStyle";
    pluginOrder[pluginOrder["textDecorationLength"] = 8455] = "textDecorationLength";
    pluginOrder[pluginOrder["textDecorationColor"] = 8460] = "textDecorationColor";
    pluginOrder[pluginOrder["textDecorationOpacity"] = 8470] = "textDecorationOpacity";
    pluginOrder[pluginOrder["textDecorationOffset"] = 8480] = "textDecorationOffset";
    pluginOrder[pluginOrder["textDecorationThickness"] = 8490] = "textDecorationThickness";
    pluginOrder[pluginOrder["textDecoration"] = 8500] = "textDecoration";
    pluginOrder[pluginOrder["textIndent"] = 8550] = "textIndent";
    pluginOrder[pluginOrder["textStrokeColor"] = 8560] = "textStrokeColor";
    pluginOrder[pluginOrder["textStrokeWidth"] = 8570] = "textStrokeWidth";
    pluginOrder[pluginOrder["content"] = 8580] = "content";
    pluginOrder[pluginOrder["fontSmoothing"] = 8600] = "fontSmoothing";
    pluginOrder[pluginOrder["fontVariantNumeric"] = 8700] = "fontVariantNumeric";
    pluginOrder[pluginOrder["letterSpacing"] = 8800] = "letterSpacing";
    pluginOrder[pluginOrder["userSelect"] = 8900] = "userSelect";
    pluginOrder[pluginOrder["verticalAlign"] = 9000] = "verticalAlign";
    pluginOrder[pluginOrder["visibility"] = 9100] = "visibility";
    pluginOrder[pluginOrder["backfaceVisibility"] = 9150] = "backfaceVisibility";
    pluginOrder[pluginOrder["whitespace"] = 9200] = "whitespace";
    pluginOrder[pluginOrder["wordBreak"] = 9300] = "wordBreak";
    pluginOrder[pluginOrder["writingMode"] = 9340] = "writingMode";
    pluginOrder[pluginOrder["hyphens"] = 9350] = "hyphens";
    pluginOrder[pluginOrder["width"] = 9400] = "width";
    pluginOrder[pluginOrder["zIndex"] = 9500] = "zIndex";
    pluginOrder[pluginOrder["isolation"] = 9550] = "isolation";
    pluginOrder[pluginOrder["gap"] = 9600] = "gap";
    pluginOrder[pluginOrder["gridAutoFlow"] = 9700] = "gridAutoFlow";
    pluginOrder[pluginOrder["gridTemplateColumns"] = 9800] = "gridTemplateColumns";
    pluginOrder[pluginOrder["gridAutoColumns"] = 9900] = "gridAutoColumns";
    pluginOrder[pluginOrder["gridColumn"] = 10000] = "gridColumn";
    pluginOrder[pluginOrder["gridColumnStart"] = 10100] = "gridColumnStart";
    pluginOrder[pluginOrder["gridColumnEnd"] = 10200] = "gridColumnEnd";
    pluginOrder[pluginOrder["gridTemplateRows"] = 10300] = "gridTemplateRows";
    pluginOrder[pluginOrder["gridAutoRows"] = 10400] = "gridAutoRows";
    pluginOrder[pluginOrder["gridRow"] = 10500] = "gridRow";
    pluginOrder[pluginOrder["gridRowStart"] = 10600] = "gridRowStart";
    pluginOrder[pluginOrder["gridRowEnd"] = 10700] = "gridRowEnd";
    pluginOrder[pluginOrder["transform"] = 10800] = "transform";
    pluginOrder[pluginOrder["transformOrigin"] = 10900] = "transformOrigin";
    pluginOrder[pluginOrder["scale"] = 11000] = "scale";
    pluginOrder[pluginOrder["rotate"] = 11100] = "rotate";
    pluginOrder[pluginOrder["translate"] = 11200] = "translate";
    pluginOrder[pluginOrder["skew"] = 11300] = "skew";
    pluginOrder[pluginOrder["perspective"] = 11350] = "perspective";
    pluginOrder[pluginOrder["perspectiveOrigin"] = 11360] = "perspectiveOrigin";
    pluginOrder[pluginOrder["transitionProperty"] = 11400] = "transitionProperty";
    pluginOrder[pluginOrder["transitionTimingFunction"] = 11500] = "transitionTimingFunction";
    pluginOrder[pluginOrder["transitionDuration"] = 11600] = "transitionDuration";
    pluginOrder[pluginOrder["transitionDelay"] = 11700] = "transitionDelay";
    pluginOrder[pluginOrder["keyframes"] = 11800] = "keyframes";
    pluginOrder[pluginOrder["animation"] = 11900] = "animation";
    pluginOrder[pluginOrder["imageRendering"] = 11950] = "imageRendering";
    pluginOrder[pluginOrder["mixBlendMode"] = 12000] = "mixBlendMode";
    pluginOrder[pluginOrder["backgroundBlendMode"] = 12100] = "backgroundBlendMode";
    pluginOrder[pluginOrder["filter"] = 12200] = "filter";
    pluginOrder[pluginOrder["blur"] = 12300] = "blur";
    pluginOrder[pluginOrder["brightness"] = 12400] = "brightness";
    pluginOrder[pluginOrder["contrast"] = 12500] = "contrast";
    pluginOrder[pluginOrder["dropShadow"] = 12600] = "dropShadow";
    pluginOrder[pluginOrder["grayscale"] = 12700] = "grayscale";
    pluginOrder[pluginOrder["hueRotate"] = 12800] = "hueRotate";
    pluginOrder[pluginOrder["invert"] = 12900] = "invert";
    pluginOrder[pluginOrder["saturate"] = 13000] = "saturate";
    pluginOrder[pluginOrder["sepia"] = 13100] = "sepia";
    pluginOrder[pluginOrder["backdropFilter"] = 13200] = "backdropFilter";
    pluginOrder[pluginOrder["backdropBlur"] = 13300] = "backdropBlur";
    pluginOrder[pluginOrder["backdropBrightness"] = 13400] = "backdropBrightness";
    pluginOrder[pluginOrder["backdropContrast"] = 13500] = "backdropContrast";
    pluginOrder[pluginOrder["backdropGrayscale"] = 13600] = "backdropGrayscale";
    pluginOrder[pluginOrder["backdropHueRotate"] = 13700] = "backdropHueRotate";
    pluginOrder[pluginOrder["backdropInvert"] = 13800] = "backdropInvert";
    pluginOrder[pluginOrder["backdropOpacity"] = 13900] = "backdropOpacity";
    pluginOrder[pluginOrder["backdropSaturate"] = 14000] = "backdropSaturate";
    pluginOrder[pluginOrder["backdropSepia"] = 14100] = "backdropSepia";
    pluginOrder[pluginOrder["willChange"] = 14200] = "willChange";
    pluginOrder[pluginOrder["touchAction"] = 14300] = "touchAction";
    pluginOrder[pluginOrder["scrollBehavior"] = 14400] = "scrollBehavior";
    pluginOrder[pluginOrder["accentColor"] = 14500] = "accentColor";
})(pluginOrder || (pluginOrder = {}));

/*
 * See MDN web docs for more information
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
 */
function generateStates(variantOrder) {
    var peseudoClassStates = pseudoClassNames.reduce(function (o, pseudoClassName) { return (o[pseudoClassName] = function () { return new Style().pseudoClass(pseudoClassName); }, o); }, {});
    var peerStates = pseudoClassNames.reduce(function (o, pseudoClassName) { return (o["peer-".concat(pseudoClassName)] = function () { return new Style().parent(".peer:".concat(pseudoClassName, " ~")); }, o); }, {});
    var notPeerStates = pseudoClassNames.reduce(function (o, pseudoClassName) { return (o["peer-not-".concat(pseudoClassName)] = function () { return new Style().parent(".peer:not(:".concat(pseudoClassName, ") ~")); }, o); }, {});
    var groupStates = pseudoClassNames.reduce(function (o, pseudoClassName) { return (o["group-".concat(pseudoClassName)] = function () { return new Style().parent(".group:".concat(pseudoClassName)); }, o); }, {});
    var states = __assign(__assign(__assign(__assign(__assign(__assign({}, peseudoClassStates), { 'not-checked': function () { return new Style().pseudoClass('not(:checked)'); }, 'not-disabled': function () { return new Style().pseudoClass('not(:disabled)'); }, 'not-first-of-type': function () { return new Style().pseudoClass('not(:first-of-type)'); }, 'not-last-of-type': function () { return new Style().pseudoClass('not(:last-of-type)'); }, first: function () { return new Style().pseudoClass('first-child'); }, 'not-first': function () { return new Style().pseudoClass('not(:first-child)'); }, last: function () { return new Style().pseudoClass('last-child'); }, 'not-last': function () { return new Style().pseudoClass('not(:last-child)'); }, 'not-only-child': function () { return new Style().pseudoClass('not(:only-child)'); }, 'not-only-of-type': function () { return new Style().pseudoClass('not(:only-of-type)'); }, even: function () { return new Style().pseudoClass('nth-child(even)'); }, odd: function () { return new Style().pseudoClass('nth-child(odd)'); }, 'even-of-type': function () { return new Style().pseudoClass('nth-of-type(even)'); }, 'odd-of-type': function () { return new Style().pseudoClass('nth-of-type(odd)'); }, 
        // Pseudo elements
        before: function () { return new Style().pseudoElement('before'); }, after: function () { return new Style().pseudoElement('after'); }, 'first-letter': function () { return new Style().pseudoElement('first-letter'); }, 'first-line': function () { return new Style().pseudoElement('first-line'); }, 'file-selector-button': function () { return new Style().pseudoElement('file-selector-button'); }, file: function () { return new Style().pseudoElement('file-selector-button'); }, selection: function () { return new Style().wrapSelector(function (selector) { return "".concat(selector, " *::selection, ").concat(selector, "::selection"); }); }, marker: function () { return new Style().wrapSelector(function (selector) { return "".concat(selector, " *::marker, ").concat(selector, "::marker"); }); }, svg: function () { return new Style().child('svg'); }, all: function () { return new Style().child('*'); }, children: function () { return new Style().child('> *'); }, siblings: function () { return new Style().child('~ *'); }, sibling: function () { return new Style().child('+ *'); }, 
        // https://www.w3schools.com/CSS/css_pseudo_elements.asp
        // Directions
        ltr: function () { return new Style().wrapSelector(function (selector) { return "[dir='ltr'] ".concat(selector, ", [dir='ltr']").concat(selector); }); }, rtl: function () { return new Style().wrapSelector(function (selector) { return "[dir='rtl'] ".concat(selector, ", [dir='rtl']").concat(selector); }); } }), groupStates), { 
        // Motion control
        // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
        'motion-safe': function () { return new Style().atRule('@media (prefers-reduced-motion: no-preference)'); }, 'motion-reduce': function () { return new Style().atRule('@media (prefers-reduced-motion: reduce)'); } }), peerStates), notPeerStates);
    var orderedStates = {};
    variantOrder.forEach(function (v) {
        if (v in states) {
            orderedStates[v] = states[v];
        }
    });
    return orderedStates;
}

function resolveVariants(config) {
    var _a, _b, _c, _d, _e;
    return {
        orientation: generateOrientations(((_b = (_a = config.theme) === null || _a === void 0 ? void 0 : _a.orientation) !== null && _b !== void 0 ? _b : {})),
        screen: generateScreens(((_d = (_c = config.theme) === null || _c === void 0 ? void 0 : _c.screens) !== null && _d !== void 0 ? _d : {})),
        theme: generateThemes(config.darkMode),
        state: generateStates((_e = config.variantOrder) !== null && _e !== void 0 ? _e : []),
    };
}

// (Last Update: Aug 22 2020) [https://github.com/sindresorhus/modern-normalize/blob/master/modern-normalize.css]
var preflights = [
    /*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */
    /*
  Document
  ========
  */
    /**
  Use a better box model (opinionated).
  */
    // {
    //   keys: ['*'],
    //   global: true,
    //   selector: '*, *::before, *::after',
    //   properties: {
    //     '-webkit-box-sizing': 'border-box',
    //     'box-sizing': 'border-box'
    //   }
    // },
    // overwrite by windi
    /**
  Use a more readable tab size (opinionated).
  */
    {
        keys: ['root'],
        global: true,
        selector: ':root',
        properties: {
            '-moz-tab-size': function (theme) { return theme('tabSize.DEFAULT', '4'); },
            '-o-tab-size': function (theme) { return theme('tabSize.DEFAULT', '4'); },
            'tab-size': function (theme) { return theme('tabSize.DEFAULT', '4'); },
        },
    },
    /**
  1. Correct the line height in all browsers.
  2. Prevent adjustments of font size after orientation changes in iOS.
  */
    {
        keys: ['html'],
        global: true,
        selector: 'html',
        properties: {
            // 'line-height': '1.15', /* 1 */ overwrite by windi
            '-webkit-text-size-adjust': '100%', /* 2 */
        },
    },
    /*
  Sections
  ========
  */
    /**
  Remove the margin in all browsers.
  */
    {
        keys: ['body'],
        global: true,
        selector: 'body',
        properties: {
            'margin': '0', /* 1 */
        },
    },
    /**
  Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
  */
    // {
    //   keys: ['body'],
    //   global: true,
    //   selector: 'body',
    //   properties: {
    //     'font-family': "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"
    //   }
    // },
    // overide by windi
    /*
  Grouping content
  ================
  */
    /**
  1. Add the correct height in Firefox.
  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
  */
    {
        keys: ['hr'],
        properties: {
            'height': '0',
            'color': 'inherit', /* 2 */
        },
    },
    /*
  Text-level semantics
  ====================
  */
    /**
  Add the correct text decoration in Chrome, Edge, and Safari.
  */
    {
        keys: ['title'],
        global: true,
        selector: 'abbr[title]',
        properties: {
            '-webkit-text-decoration': 'underline dotted',
            'text-decoration': 'underline dotted',
        },
    },
    /**
  Add the correct font weight in Edge and Safari.
  */
    {
        keys: ['b', 'strong'],
        properties: {
            'font-weight': 'bolder',
        },
    },
    /**
  1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
  2. Correct the odd 'em' font sizing in all browsers.
  */
    {
        keys: ['code', 'kbd', 'samp', 'pre'],
        properties: {
            // 'font-family': "ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace", /* 1 */ overwrite by windi
            'font-size': '1em', /* 2 */
        },
    },
    /**
  Add the correct font size in all browsers.
  */
    {
        keys: ['small'],
        properties: {
            'font-size': '80%',
        },
    },
    /**
  Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
  */
    {
        keys: ['sub', 'sup'],
        properties: {
            'font-size': '75%',
            'line-height': '0',
            'position': 'relative',
            'vertical-align': 'baseline',
        },
    },
    {
        keys: ['sub'],
        properties: {
            'bottom': '-0.25em',
        },
    },
    {
        keys: ['sup'],
        properties: {
            'top': '-0.5em',
        },
    },
    /*
  Tabular data
  ============
  */
    /**
  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
  */
    {
        keys: ['table'],
        properties: {
            'text-indent': '0',
            'border-color': 'inherit', /* 2 */
        },
    },
    /*
  Forms
  =====
  */
    /**
  1. Change the font styles in all browsers.
  2. Remove the margin in Firefox and Safari.
  */
    {
        keys: ['button', 'input', 'optgroup', 'select', 'textarea'],
        properties: {
            'font-family': 'inherit',
            'font-size': '100%',
            'line-height': '1.15',
            'margin': '0', /* 2 */
        },
    },
    /**
  Remove the inheritance of text transform in Edge and Firefox.
  1. Remove the inheritance of text transform in Firefox.
  */
    {
        keys: ['button', 'select'],
        properties: {
            'text-transform': 'none', /* 1 */
        },
    },
    /**
  Correct the inability to style clickable types in iOS and Safari.
  */
    {
        keys: ['button'],
        selector: 'button, [type=\'button\'], [type=\'reset\'], [type=\'submit\']',
        properties: {
            '-webkit-appearance': 'button', /* 1 */
        },
    },
    /**
  Remove the inner border and padding in Firefox.
  */
    {
        keys: ['inner'],
        global: true,
        selector: '::moz-focus-inner',
        properties: {
            'border-style': 'none',
            'padding': '0',
        },
    },
    /**
  Restore the focus styles unset by the previous rule.
  */
    {
        keys: ['focusring'],
        global: true,
        selector: ':-moz-focusring',
        properties: {
            'outline': '1px dotted ButtonText',
        },
    },
    /**
  Remove the additional ':invalid' styles in Firefox.
  See: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737
  */
    {
        keys: ['invalid'],
        global: true,
        selector: ':-moz-ui-invalid',
        properties: {
            'box-shadow': 'none',
        },
    },
    /**
  Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
  */
    {
        keys: ['legend'],
        properties: {
            'padding': '0',
        },
    },
    /**
  Add the correct vertical alignment in Chrome and Firefox.
  */
    {
        keys: ['progress'],
        properties: {
            'vertical-align': 'baseline',
        },
    },
    /**
  Correct the cursor style of increment and decrement buttons in Safari.
  */
    {
        keys: ['spin'],
        global: true,
        selector: '::-webkit-inner-spin-button, ::-webkit-outer-spin-button',
        properties: {
            'height': 'auto',
        },
    },
    /**
  1. Correct the odd appearance in Chrome and Safari.
  2. Correct the outline style in Safari.
  */
    {
        keys: ['search'],
        global: true,
        selector: '[type=\'search\']',
        properties: {
            '-webkit-appearance': 'textfield',
            'outline-offset': '-2px', /* 2 */
        },
    },
    /**
  Remove the inner padding in Chrome and Safari on macOS.
  */
    {
        keys: ['search'],
        global: true,
        selector: '::-webkit-search-decoration',
        properties: {
            '-webkit-appearance': 'none',
        },
    },
    /**
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Change font properties to 'inherit' in Safari.
  */
    {
        keys: ['file'],
        global: true,
        selector: '::-webkit-file-upload-button',
        properties: {
            '-webkit-appearance': 'button',
            'font': 'inherit',
        },
    },
    /*
  Interactive
  ===========
  */
    /*
  Add the correct display in Chrome and Safari.
  */
    {
        keys: ['summary'],
        properties: {
            'display': 'list-item',
        },
    },
    /**
   * Manually forked from SUIT CSS Base: https://github.com/suitcss/base
   * A thin layer on top of normalize.css that provides a starting point more
   * suitable for web applications.
   */
    /**
   * Removes the default spacing and border for appropriate elements.
   */
    {
        keys: ['blockquote', 'dl', 'dd', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'figure', 'p', 'pre'],
        properties: {
            'margin': '0',
        },
    },
    {
        keys: ['button'],
        properties: {
            'background-color': 'transparent',
            'background-image': 'none'
        },
    },
    /**
   * Work around a Firefox/IE bug where the transparent `button` background
   * results in a loss of the default `button` focus styles.
   */
    {
        keys: ['fieldset'],
        properties: {
            'margin': '0',
            'padding': '0',
        },
    },
    {
        keys: ['ol', 'ul'],
        properties: {
            'list-style': 'none',
            'margin': '0',
            'padding': '0',
        },
    },
    /**
   * Tailwind custom reset styles
   */
    /**
   * 1. Use the user's configured `sans` font-family (with Tailwind's default
   *    sans-serif font stack as a fallback) as a sane default.
   * 2. Use Tailwind's default "normal" line-height so the user isn't forced
   *    to override it to ensure consistency even when using the default theme.
   */
    {
        keys: ['html'],
        global: true,
        selector: 'html',
        properties: {
            'font-family': function (theme) { return theme('fontFamily.sans', 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'); },
            'line-height': '1.5', /* 2 */
        },
    },
    /**
   * Inherit font-family and line-height from `html` so users can set them as
   * a class directly on the `html` element.
   */
    {
        keys: ['body'],
        global: true,
        selector: 'body',
        properties: {
            'font-family': 'inherit',
            'line-height': 'inherit',
        },
    },
    /**
   * 1. Prevent padding and border from affecting element width.
   *
   *    We used to set this in the html element and inherit from
   *    the parent element for everything else. This caused issues
   *    in shadow-dom-enhanced elements like <details> where the content
   *    is wrapped by a div with box-sizing set to `content-box`.
   *
   *    https://github.com/mozdevs/cssremedy/issues/4
   *
   *
   * 2. Allow adding a border to an element by just adding a border-width.
   *
   *    By default, the way the browser specifies that an element should have no
   *    border is by setting it's border-style to `none` in the user-agent
   *    stylesheet.
   *
   *    In order to easily add borders to elements by just setting the `border-width`
   *    property, we change the default border-style for all elements to `solid`, and
   *    use border-width to hide them instead. This way our `border` utilities only
   *    need to set the `border-width` property instead of the entire `border`
   *    shorthand, making our border utilities much more straightforward to compose.
   *
   */
    {
        keys: ['*'],
        global: true,
        selector: '*, ::before, ::after',
        properties: {
            '-webkit-box-sizing': 'border-box',
            'box-sizing': 'border-box',
            'border-width': '0',
            'border-style': 'solid',
            'border-color': function (theme) { return theme('borderColor.DEFAULT', 'currentColor'); },
        },
    },
    /*
   * Ensure horizontal rules are visible by default
   */
    {
        keys: ['hr'],
        properties: {
            'border-top-width': '1px',
        },
    },
    /**
   * Undo the `border-style: none` reset that Normalize applies to images so that
   * our `border-{width}` utilities have the expected effect.
   *
   * The Normalize reset is unnecessary for us since we default the border-width
   * to 0 on all elements.
   *
   */
    {
        keys: ['img'],
        properties: {
            'border-style': 'solid',
        },
    },
    {
        keys: ['textarea'],
        properties: {
            'resize': 'vertical',
        },
    },
    // input::placeholder,
    // textarea::placeholder {
    //   color: theme('colors.gray.400', #a1a1aa);
    // }
    // support prefixer
    {
        keys: ['input'],
        selector: 'input::placeholder',
        properties: {
            'opacity': '1',
            'color': function (theme) { return theme('colors.gray.400', '#a1a1aa'); },
        },
    },
    {
        keys: ['input'],
        selector: 'input::webkit-input-placeholder',
        properties: {
            'opacity': '1',
            'color': function (theme) { return theme('colors.gray.400', '#a1a1aa'); },
        },
    },
    {
        keys: ['input'],
        selector: 'input::-moz-placeholder',
        properties: {
            'opacity': '1',
            'color': function (theme) { return theme('colors.gray.400', '#a1a1aa'); },
        },
    },
    {
        keys: ['input'],
        selector: 'input:-ms-input-placeholder',
        properties: {
            'opacity': '1',
            'color': function (theme) { return theme('colors.gray.400', '#a1a1aa'); },
        },
    },
    {
        keys: ['input'],
        selector: 'input::-ms-input-placeholder',
        properties: {
            'opacity': '1',
            'color': function (theme) { return theme('colors.gray.400', '#a1a1aa'); },
        },
    },
    {
        keys: ['textarea'],
        selector: 'textarea::placeholder',
        properties: {
            'opacity': '1',
            'color': function (theme) { return theme('colors.gray.400', '#a1a1aa'); },
        },
    },
    {
        keys: ['textarea'],
        selector: 'textarea::webkit-input-placeholder',
        properties: {
            'opacity': '1',
            'color': function (theme) { return theme('colors.gray.400', '#a1a1aa'); },
        },
    },
    {
        keys: ['textarea'],
        selector: 'textarea::-moz-placeholder',
        properties: {
            'opacity': '1',
            'color': function (theme) { return theme('colors.gray.400', '#a1a1aa'); },
        },
    },
    {
        keys: ['textarea'],
        selector: 'textarea:-ms-input-placeholder',
        properties: {
            'opacity': '1',
            'color': function (theme) { return theme('colors.gray.400', '#a1a1aa'); },
        },
    },
    {
        keys: ['textarea'],
        selector: 'textarea::-ms-input-placeholder',
        properties: {
            'opacity': '1',
            'color': function (theme) { return theme('colors.gray.400', '#a1a1aa'); },
        },
    },
    {
        keys: ['button'],
        selector: 'button, [role="button"]',
        properties: {
            'cursor': 'pointer',
        },
    },
    {
        keys: ['table'],
        properties: {
            'border-collapse': 'collapse',
        },
    },
    {
        keys: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        properties: {
            'font-size': 'inherit',
            'font-weight': 'inherit',
        },
    },
    /**
   * Reset links to optimize for opt-in styling instead of
   * opt-out.
   */
    {
        keys: ['a'],
        properties: {
            'color': 'inherit',
            'text-decoration': 'inherit',
        },
    },
    /**
   * Reset form element properties that are easy to forget to
   * style explicitly so you don't inadvertently introduce
   * styles that deviate from your design system. These styles
   * supplement a partial reset that is already applied by
   * normalize.css.
   */
    {
        keys: ['button', 'input', 'optgroup', 'select', 'textarea'],
        properties: {
            'padding': '0',
            'line-height': 'inherit',
            'color': 'inherit',
        },
    },
    /**
   * Use the configured 'mono' font family for elements that
   * are expected to be rendered with a monospace font, falling
   * back to the system monospace stack if there is no configured
   * 'mono' font family.
   */
    {
        keys: ['pre', 'code', 'kbd', 'samp'],
        properties: {
            'font-family': function (theme) { return theme('fontFamily.mono', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'); },
        },
    },
    /**
   * Make replaced elements `display: block` by default as that's
   * the behavior you want almost all of the time. Inspired by
   * CSS Remedy, with `svg` added as well.
   *
   * https://github.com/mozdevs/cssremedy/issues/14
   */
    {
        keys: ['img', 'svg', 'video', 'canvas', 'audio', 'iframe', 'embed', 'object'],
        properties: {
            'display': 'block',
            'vertical-align': 'middle',
        },
    },
    /**
   * Constrain images and videos to the parent width and preserve
   * their instrinsic aspect ratio.
   *
   * https://github.com/mozdevs/cssremedy/issues/14
   */
    {
        keys: ['img', 'video'],
        properties: {
            'max-width': '100%',
            'height': 'auto',
        },
    },
    // added by ringWidth
    // https://windicss.org/utilities/borders.html#ring-width
    {
        keys: ['*'],
        global: true,
        selector: '*',
        properties: {
            '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-ring-offset-width': function (theme) { return theme('ringOffsetWidth.DEFAULT', '0px'); },
            '--tw-ring-offset-color': function (theme) { return theme('ringOffsetColor.DEFAULT', '#fff'); },
            '--tw-ring-color': function (theme) { var _a; return "rgba(".concat((_a = hex2RGB(theme('ringColor.DEFAULT', '#93C5FD'))) === null || _a === void 0 ? void 0 : _a.join(', '), ", ").concat(theme('ringOpacity.DEFAULT', '0.5'), ")"); },
            '--tw-ring-offset-shadow': '0 0 #0000',
            '--tw-ring-shadow': '0 0 #0000',
        },
    },
    // added by boxShadow
    // https://windicss.org/utilities/effects.html#box-shadow
    {
        keys: ['*'],
        global: true,
        selector: '*',
        properties: {
            '--tw-shadow': '0 0 #0000',
        },
    },
];

var fontVariants = {
    '--tw-ordinal': 'var(--tw-empty,/*!*/ /*!*/)',
    '--tw-slashed-zero': 'var(--tw-empty,/*!*/ /*!*/)',
    '--tw-numeric-figure': 'var(--tw-empty,/*!*/ /*!*/)',
    '--tw-numeric-spacing': 'var(--tw-empty,/*!*/ /*!*/)',
    '--tw-numeric-fraction': 'var(--tw-empty,/*!*/ /*!*/)',
    'font-variant-numeric': 'var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)',
};
var staticUtilities = {
    // https://windicss.org/utilities/behaviors.html#box-decoration-break
    'decoration-slice': {
        'utility': {
            '-webkit-box-decoration-break': 'slice',
            'box-decoration-break': 'slice',
        },
        'meta': {
            'group': 'boxDecorationBreak',
            'order': 1,
        },
    },
    'decoration-clone': {
        'utility': {
            '-webkit-box-decoration-break': 'clone',
            'box-decoration-break': 'clone',
        },
        'meta': {
            'group': 'boxDecorationBreak',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/flexbox.html#flex-basis
    'basis-auto': {
        'utility': {
            'flex-basis': 'auto',
        },
        'meta': {
            'group': 'flexBasis',
            'order': 1,
        },
    },
    'basis-full': {
        'utility': {
            'flex-basis': '100%',
        },
        'meta': {
            'group': 'flexBasis',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/sizing.html#box-sizing
    'box-border': {
        'utility': {
            '-webkit-box-sizing': 'border-box',
            'box-sizing': 'border-box',
        },
        'meta': {
            'group': 'boxSizing',
            'order': 1,
        },
    },
    'box-content': {
        'utility': {
            '-webkit-box-sizing': 'content-box',
            'box-sizing': 'content-box',
        },
        'meta': {
            'group': 'boxSizing',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/display.html
    'block': {
        'utility': {
            'display': 'block',
        },
        'meta': {
            'group': 'display',
            'order': 1,
        },
    },
    'inline-block': {
        'utility': {
            'display': 'inline-block',
        },
        'meta': {
            'group': 'display',
            'order': 2,
        },
    },
    'inline': {
        'utility': {
            'display': 'inline',
        },
        'meta': {
            'group': 'display',
            'order': 3,
        },
    },
    // https://windicss.org/utilities/flexbox.html
    'flex': {
        'utility': {
            'display': [
                '-webkit-box',
                '-ms-flexbox',
                '-webkit-flex',
                'flex',
            ],
        },
        'meta': {
            'group': 'display',
            'order': 4,
        },
    },
    'inline-flex': {
        'utility': {
            'display': [
                '-webkit-inline-box',
                '-ms-inline-flexbox',
                '-webkit-inline-flex',
                'inline-flex',
            ],
        },
        'meta': {
            'group': 'display',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/tables.html
    'table': {
        'utility': {
            'display': 'table',
        },
        'meta': {
            'group': 'display',
            'order': 6,
        },
    },
    'inline-table': {
        'utility': {
            'display': 'inline-table',
        },
        'meta': {
            'group': 'display',
            'order': 7,
        },
    },
    'table-caption': {
        'utility': {
            'display': 'table-caption',
        },
        'meta': {
            'group': 'display',
            'order': 8,
        },
    },
    'table-cell': {
        'utility': {
            'display': 'table-cell',
        },
        'meta': {
            'group': 'display',
            'order': 9,
        },
    },
    'table-column': {
        'utility': {
            'display': 'table-column',
        },
        'meta': {
            'group': 'display',
            'order': 10,
        },
    },
    'table-column-group': {
        'utility': {
            'display': 'table-column-group',
        },
        'meta': {
            'group': 'display',
            'order': 11,
        },
    },
    'table-footer-group': {
        'utility': {
            'display': 'table-footer-group',
        },
        'meta': {
            'group': 'display',
            'order': 12,
        },
    },
    'table-header-group': {
        'utility': {
            'display': 'table-header-group',
        },
        'meta': {
            'group': 'display',
            'order': 13,
        },
    },
    'table-row-group': {
        'utility': {
            'display': 'table-row-group',
        },
        'meta': {
            'group': 'display',
            'order': 14,
        },
    },
    'table-row': {
        'utility': {
            'display': 'table-row',
        },
        'meta': {
            'group': 'display',
            'order': 15,
        },
    },
    'flow-root': {
        'utility': {
            'display': 'flow-root',
        },
        'meta': {
            'group': 'display',
            'order': 16,
        },
    },
    // https://windicss.org/utilities/grid.html
    'grid': {
        'utility': {
            'display': [
                '-ms-grid',
                'grid',
            ],
        },
        'meta': {
            'group': 'display',
            'order': 17,
        },
    },
    'inline-grid': {
        'utility': {
            'display': [
                '-ms-inline-grid',
                'inline-grid',
            ],
        },
        'meta': {
            'group': 'display',
            'order': 18,
        },
    },
    'contents': {
        'utility': {
            'display': 'contents',
        },
        'meta': {
            'group': 'display',
            'order': 19,
        },
    },
    'list-item': {
        'utility': {
            'display': 'list-item',
        },
        'meta': {
            'group': 'display',
            'order': 20,
        },
    },
    'hidden': {
        'utility': {
            'display': 'none',
        },
        'meta': {
            'group': 'display',
            'order': 21,
        },
    },
    // https://windicss.org/utilities/columns.html
    'break-after-auto': {
        'utility': {
            'break-after': 'auto',
        },
        'meta': {
            'group': 'columns',
            'order': 1,
        },
    },
    'break-after-avoid': {
        'utility': {
            'break-after': 'avoid',
        },
        'meta': {
            'group': 'columns',
            'order': 2,
        },
    },
    'break-after-all': {
        'utility': {
            'break-after': 'all',
        },
        'meta': {
            'group': 'columns',
            'order': 3,
        },
    },
    'break-after-avoid-page': {
        'utility': {
            'break-after': 'avoid-page',
        },
        'meta': {
            'group': 'columns',
            'order': 4,
        },
    },
    'break-after-page': {
        'utility': {
            'break-after': 'page',
        },
        'meta': {
            'group': 'columns',
            'order': 5,
        },
    },
    'break-after-left': {
        'utility': {
            'break-after': 'left',
        },
        'meta': {
            'group': 'columns',
            'order': 6,
        },
    },
    'break-after-right': {
        'utility': {
            'break-after': 'right',
        },
        'meta': {
            'group': 'columns',
            'order': 7,
        },
    },
    'break-after-column': {
        'utility': {
            'break-after': 'column',
        },
        'meta': {
            'group': 'columns',
            'order': 8,
        },
    },
    'break-before-auto': {
        'utility': {
            'break-before': 'auto',
        },
        'meta': {
            'group': 'columns',
            'order': 9,
        },
    },
    'break-before-avoid': {
        'utility': {
            'break-before': 'avoid',
        },
        'meta': {
            'group': 'columns',
            'order': 10,
        },
    },
    'break-before-all': {
        'utility': {
            'break-before': 'all',
        },
        'meta': {
            'group': 'columns',
            'order': 11,
        },
    },
    'break-before-avoid-page': {
        'utility': {
            'break-before': 'avoid-page',
        },
        'meta': {
            'group': 'columns',
            'order': 12,
        },
    },
    'break-before-page': {
        'utility': {
            'break-before': 'page',
        },
        'meta': {
            'group': 'columns',
            'order': 13,
        },
    },
    'break-before-left': {
        'utility': {
            'break-before': 'left',
        },
        'meta': {
            'group': 'columns',
            'order': 14,
        },
    },
    'break-before-right': {
        'utility': {
            'break-before': 'right',
        },
        'meta': {
            'group': 'columns',
            'order': 15,
        },
    },
    'break-before-column': {
        'utility': {
            'break-before': 'column',
        },
        'meta': {
            'group': 'columns',
            'order': 16,
        },
    },
    'break-inside-auto': {
        'utility': {
            'break-inside': 'auto',
        },
        'meta': {
            'group': 'columns',
            'order': 17,
        },
    },
    'break-inside-avoid': {
        'utility': {
            'break-inside': 'avoid',
        },
        'meta': {
            'group': 'columns',
            'order': 18,
        },
    },
    'break-inside-avoid-page': {
        'utility': {
            'break-inside': 'avoid-page',
        },
        'meta': {
            'group': 'columns',
            'order': 19,
        },
    },
    'break-inside-avoid-column': {
        'utility': {
            'break-inside': 'avoid-column',
        },
        'meta': {
            'group': 'columns',
            'order': 20,
        },
    },
    // https://windicss.org/utilities/positioning.html#floats
    'float-right': {
        'utility': {
            'float': 'right',
        },
        'meta': {
            'group': 'float',
            'order': 1,
        },
    },
    'float-left': {
        'utility': {
            'float': 'left',
        },
        'meta': {
            'group': 'float',
            'order': 2,
        },
    },
    'float-none': {
        'utility': {
            'float': 'none',
        },
        'meta': {
            'group': 'float',
            'order': 3,
        },
    },
    // https://windicss.org/utilities/positioning.html#clear
    'clear-left': {
        'utility': {
            'clear': 'left',
        },
        'meta': {
            'group': 'clear',
            'order': 1,
        },
    },
    'clear-right': {
        'utility': {
            'clear': 'right',
        },
        'meta': {
            'group': 'clear',
            'order': 2,
        },
    },
    'clear-both': {
        'utility': {
            'clear': 'both',
        },
        'meta': {
            'group': 'clear',
            'order': 3,
        },
    },
    'clear-none': {
        'utility': {
            'clear': 'none',
        },
        'meta': {
            'group': 'clear',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/positioning.html#isolation
    'isolate': {
        'utility': {
            'isolation': 'isolate',
        },
        'meta': {
            'group': 'isolation',
            'order': 1,
        },
    },
    'isolation-auto': {
        'utility': {
            'isolation': 'auto',
        },
        'meta': {
            'group': 'isolation',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/positioning.html#object-fit
    'object-contain': {
        'utility': {
            '-o-object-fit': 'contain',
            'object-fit': 'contain',
        },
        'meta': {
            'group': 'objectFit',
            'order': 1,
        },
    },
    'object-cover': {
        'utility': {
            '-o-object-fit': 'cover',
            'object-fit': 'cover',
        },
        'meta': {
            'group': 'objectFit',
            'order': 2,
        },
    },
    'object-fill': {
        'utility': {
            '-o-object-fit': 'fill',
            'object-fit': 'fill',
        },
        'meta': {
            'group': 'objectFit',
            'order': 3,
        },
    },
    'object-none': {
        'utility': {
            '-o-object-fit': 'none',
            'object-fit': 'none',
        },
        'meta': {
            'group': 'objectFit',
            'order': 4,
        },
    },
    'object-scale-down': {
        'utility': {
            '-o-object-fit': 'scale-down',
            'object-fit': 'scale-down',
        },
        'meta': {
            'group': 'objectFit',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/behaviors.html#overflow
    'overflow-auto': {
        'utility': {
            'overflow': 'auto',
        },
        'meta': {
            'group': 'overflow',
            'order': 1,
        },
    },
    'overflow-hidden': {
        'utility': {
            'overflow': 'hidden',
        },
        'meta': {
            'group': 'overflow',
            'order': 2,
        },
    },
    'overflow-clip': {
        'utility': {
            'overflow': 'clip',
        },
        'meta': {
            'group': 'overflow',
            'order': 3,
        },
    },
    'overflow-visible': {
        'utility': {
            'overflow': 'visible',
        },
        'meta': {
            'group': 'overflow',
            'order': 4,
        },
    },
    'overflow-scroll': {
        'utility': {
            'overflow': 'scroll',
        },
        'meta': {
            'group': 'overflow',
            'order': 5,
        },
    },
    'overflow-x-auto': {
        'utility': {
            'overflow-x': 'auto',
        },
        'meta': {
            'group': 'overflow',
            'order': 6,
        },
    },
    'overflow-y-auto': {
        'utility': {
            'overflow-y': 'auto',
        },
        'meta': {
            'group': 'overflow',
            'order': 7,
        },
    },
    'overflow-x-hidden': {
        'utility': {
            'overflow-x': 'hidden',
        },
        'meta': {
            'group': 'overflow',
            'order': 8,
        },
    },
    'overflow-y-hidden': {
        'utility': {
            'overflow-y': 'hidden',
        },
        'meta': {
            'group': 'overflow',
            'order': 9,
        },
    },
    'overflow-x-clip': {
        'utility': {
            'overflow-x': 'clip',
        },
        'meta': {
            'group': 'overflow',
            'order': 10,
        },
    },
    'overflow-y-clip': {
        'utility': {
            'overflow-y': 'clip',
        },
        'meta': {
            'group': 'overflow',
            'order': 11,
        },
    },
    'overflow-x-visible': {
        'utility': {
            'overflow-x': 'visible',
        },
        'meta': {
            'group': 'overflow',
            'order': 12,
        },
    },
    'overflow-y-visible': {
        'utility': {
            'overflow-y': 'visible',
        },
        'meta': {
            'group': 'overflow',
            'order': 13,
        },
    },
    'overflow-x-scroll': {
        'utility': {
            'overflow-x': 'scroll',
        },
        'meta': {
            'group': 'overflow',
            'order': 14,
        },
    },
    'overflow-y-scroll': {
        'utility': {
            'overflow-y': 'scroll',
        },
        'meta': {
            'group': 'overflow',
            'order': 15,
        },
    },
    // https://windicss.org/utilities/behaviors.html#overscroll-behavior
    'overscroll-auto': {
        'utility': {
            'overscroll-behavior': 'auto',
            '-ms-scroll-chaining': 'chained',
        },
        'meta': {
            'group': 'overscrollBehavior',
            'order': 1,
        },
    },
    'overscroll-contain': {
        'utility': {
            'overscroll-behavior': 'contain',
            '-ms-scroll-chaining': 'none',
        },
        'meta': {
            'group': 'overscrollBehavior',
            'order': 2,
        },
    },
    'overscroll-none': {
        'utility': {
            'overscroll-behavior': 'none',
            '-ms-scroll-chaining': 'none',
        },
        'meta': {
            'group': 'overscrollBehavior',
            'order': 3,
        },
    },
    'overscroll-y-auto': {
        'utility': {
            'overscroll-behavior-y': 'auto',
        },
        'meta': {
            'group': 'overscrollBehavior',
            'order': 4,
        },
    },
    'overscroll-y-contain': {
        'utility': {
            'overscroll-behavior-y': 'contain',
        },
        'meta': {
            'group': 'overscrollBehavior',
            'order': 5,
        },
    },
    'overscroll-y-none': {
        'utility': {
            'overscroll-behavior-y': 'none',
        },
        'meta': {
            'group': 'overscrollBehavior',
            'order': 6,
        },
    },
    'overscroll-x-auto': {
        'utility': {
            'overscroll-behavior-x': 'auto',
        },
        'meta': {
            'group': 'overscrollBehavior',
            'order': 7,
        },
    },
    'overscroll-x-contain': {
        'utility': {
            'overscroll-behavior-x': 'contain',
        },
        'meta': {
            'group': 'overscrollBehavior',
            'order': 8,
        },
    },
    'overscroll-x-none': {
        'utility': {
            'overscroll-behavior-x': 'none',
        },
        'meta': {
            'group': 'overscrollBehavior',
            'order': 9,
        },
    },
    // https://windicss.org/utilities/positioning.html#position
    'static': {
        'utility': {
            'position': 'static',
        },
        'meta': {
            'group': 'position',
            'order': 1,
        },
    },
    'fixed': {
        'utility': {
            'position': 'fixed',
        },
        'meta': {
            'group': 'position',
            'order': 2,
        },
    },
    'absolute': {
        'utility': {
            'position': 'absolute',
        },
        'meta': {
            'group': 'position',
            'order': 3,
        },
    },
    'relative': {
        'utility': {
            'position': 'relative',
        },
        'meta': {
            'group': 'position',
            'order': 4,
        },
    },
    'sticky': {
        'utility': {
            'position': [
                '-webkit-sticky',
                'sticky',
            ],
        },
        'meta': {
            'group': 'position',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/display.html#visibility
    'visible': {
        'utility': {
            'visibility': 'visible',
        },
        'meta': {
            'group': 'visibility',
            'order': 1,
        },
    },
    'invisible': {
        'utility': {
            'visibility': 'hidden',
        },
        'meta': {
            'group': 'visibility',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/display.html#backface-visibility
    'backface-visible': {
        'utility': {
            '-webkit-backface-visibility': 'visible',
            'backface-visibility': 'visible',
        },
        'meta': {
            'group': 'backfaceVisibility',
            'order': 1,
        },
    },
    'backface-hidden': {
        'utility': {
            '-webkit-backface-visibility': 'hidden',
            'backface-visibility': 'hidden',
        },
        'meta': {
            'group': 'backfaceVisibility',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/flexbox.html#flex-direction
    'flex-row': {
        'utility': {
            '-webkit-box-orient': 'horizontal',
            '-webkit-box-direction': 'normal',
            '-ms-flex-direction': 'row',
            '-webkit-flex-direction': 'row',
            'flex-direction': 'row',
        },
        'meta': {
            'group': 'flexDirection',
            'order': 1,
        },
    },
    'flex-row-reverse': {
        'utility': {
            '-webkit-box-orient': 'horizontal',
            '-webkit-box-direction': 'reverse',
            '-ms-flex-direction': 'row-reverse',
            '-webkit-flex-direction': 'row-reverse',
            'flex-direction': 'row-reverse',
        },
        'meta': {
            'group': 'flexDirection',
            'order': 2,
        },
    },
    'flex-col': {
        'utility': {
            '-webkit-box-orient': 'vertical',
            '-webkit-box-direction': 'normal',
            '-ms-flex-direction': 'column',
            '-webkit-flex-direction': 'column',
            'flex-direction': 'column',
        },
        'meta': {
            'group': 'flexDirection',
            'order': 3,
        },
    },
    'flex-col-reverse': {
        'utility': {
            '-webkit-box-orient': 'vertical',
            '-webkit-box-direction': 'reverse',
            '-ms-flex-direction': 'column-reverse',
            '-webkit-flex-direction': 'column-reverse',
            'flex-direction': 'column-reverse',
        },
        'meta': {
            'group': 'flexDirection',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/flexbox.html#flex-wrap
    'flex-wrap': {
        'utility': {
            '-ms-flex-wrap': 'wrap',
            '-webkit-flex-wrap': 'wrap',
            'flex-wrap': 'wrap',
        },
        'meta': {
            'group': 'flexWrap',
            'order': 1,
        },
    },
    'flex-wrap-reverse': {
        'utility': {
            '-ms-flex-wrap': 'wrap-reverse',
            '-webkit-flex-wrap': 'wrap-reverse',
            'flex-wrap': 'wrap-reverse',
        },
        'meta': {
            'group': 'flexWrap',
            'order': 2,
        },
    },
    'flex-nowrap': {
        'utility': {
            '-ms-flex-wrap': 'nowrap',
            '-webkit-flex-wrap': 'nowrap',
            'flex-wrap': 'nowrap',
        },
        'meta': {
            'group': 'flexWrap',
            'order': 3,
        },
    },
    // https://windicss.org/utilities/grid.html#grid-column-span
    'col-auto': {
        'utility': {
            'grid-column': 'auto',
        },
        'meta': {
            'group': 'gridColumn',
            'order': 1,
        },
    },
    // https://windicss.org/utilities/grid.html#grid-row-span
    'row-auto': {
        'utility': {
            'grid-row': 'auto',
        },
        'meta': {
            'group': 'gridRow',
            'order': 1,
        },
    },
    // https://windicss.org/utilities/grid.html#grid-auto-flow
    'grid-flow-row': {
        'utility': {
            'grid-auto-flow': 'row',
        },
        'meta': {
            'group': 'gridAutoFlow',
            'order': 1,
        },
    },
    'grid-flow-col': {
        'utility': {
            'grid-auto-flow': 'column',
        },
        'meta': {
            'group': 'gridAutoFlow',
            'order': 2,
        },
    },
    'grid-flow-row-dense': {
        'utility': {
            'grid-auto-flow': 'row dense',
        },
        'meta': {
            'group': 'gridAutoFlow',
            'order': 3,
        },
    },
    'grid-flow-col-dense': {
        'utility': {
            'grid-auto-flow': 'column dense',
        },
        'meta': {
            'group': 'gridAutoFlow',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/positioning.html#justify-content
    'justify-start': {
        'utility': {
            '-webkit-box-pack': 'start',
            '-ms-flex-pack': 'start',
            '-webkit-justify-content': 'flex-start',
            'justify-content': 'flex-start',
        },
        'meta': {
            'group': 'justifyContent',
            'order': 1,
        },
    },
    'justify-end': {
        'utility': {
            '-webkit-box-pack': 'end',
            '-ms-flex-pack': 'end',
            '-webkit-justify-content': 'flex-end',
            'justify-content': 'flex-end',
        },
        'meta': {
            'group': 'justifyContent',
            'order': 2,
        },
    },
    'justify-center': {
        'utility': {
            '-webkit-box-pack': 'center',
            '-ms-flex-pack': 'center',
            '-webkit-justify-content': 'center',
            'justify-content': 'center',
        },
        'meta': {
            'group': 'justifyContent',
            'order': 3,
        },
    },
    'justify-between': {
        'utility': {
            '-webkit-box-pack': 'justify',
            '-ms-flex-pack': 'justify',
            '-webkit-justify-content': 'space-between',
            'justify-content': 'space-between',
        },
        'meta': {
            'group': 'justifyContent',
            'order': 4,
        },
    },
    'justify-around': {
        'utility': {
            '-ms-flex-pack': 'distribute',
            '-webkit-justify-content': 'space-around',
            'justify-content': 'space-around',
        },
        'meta': {
            'group': 'justifyContent',
            'order': 5,
        },
    },
    'justify-evenly': {
        'utility': {
            '-webkit-box-pack': 'space-evenly',
            '-ms-flex-pack': 'space-evenly',
            '-webkit-justify-content': 'space-evenly',
            'justify-content': 'space-evenly',
        },
        'meta': {
            'group': 'justifyContent',
            'order': 6,
        },
    },
    // https://windicss.org/utilities/positioning.html#justify-items
    'justify-items-auto': {
        'utility': {
            'justify-items': 'auto',
        },
        'meta': {
            'group': 'justifyItems',
            'order': 1,
        },
    },
    'justify-items-start': {
        'utility': {
            'justify-items': 'start',
        },
        'meta': {
            'group': 'justifyItems',
            'order': 2,
        },
    },
    'justify-items-end': {
        'utility': {
            'justify-items': 'end',
        },
        'meta': {
            'group': 'justifyItems',
            'order': 3,
        },
    },
    'justify-items-center': {
        'utility': {
            'justify-items': 'center',
        },
        'meta': {
            'group': 'justifyItems',
            'order': 4,
        },
    },
    'justify-items-stretch': {
        'utility': {
            'justify-items': 'stretch',
        },
        'meta': {
            'group': 'justifyItems',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/positioning.html#justify-self
    'justify-self-auto': {
        'utility': {
            '-ms-grid-column-align': 'auto',
            'justify-self': 'auto',
        },
        'meta': {
            'group': 'justifySelf',
            'order': 1,
        },
    },
    'justify-self-start': {
        'utility': {
            '-ms-grid-column-align': 'start',
            'justify-self': 'start',
        },
        'meta': {
            'group': 'justifySelf',
            'order': 2,
        },
    },
    'justify-self-end': {
        'utility': {
            '-ms-grid-column-align': 'end',
            'justify-self': 'end',
        },
        'meta': {
            'group': 'justifySelf',
            'order': 3,
        },
    },
    'justify-self-center': {
        'utility': {
            '-ms-grid-column-align': 'center',
            'justify-self': 'center',
        },
        'meta': {
            'group': 'justifySelf',
            'order': 4,
        },
    },
    'justify-self-stretch': {
        'utility': {
            '-ms-grid-column-align': 'stretch',
            'justify-self': 'stretch',
        },
        'meta': {
            'group': 'justifySelf',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/positioning.html#align-content
    'content-center': {
        'utility': {
            '-ms-flex-line-pack': 'center',
            '-webkit-align-content': 'center',
            'align-content': 'center',
        },
        'meta': {
            'group': 'alignContent',
            'order': 1,
        },
    },
    'content-start': {
        'utility': {
            '-ms-flex-line-pack': 'start',
            '-webkit-align-content': 'flex-start',
            'align-content': 'flex-start',
        },
        'meta': {
            'group': 'alignContent',
            'order': 2,
        },
    },
    'content-end': {
        'utility': {
            '-ms-flex-line-pack': 'end',
            '-webkit-align-content': 'flex-end',
            'align-content': 'flex-end',
        },
        'meta': {
            'group': 'alignContent',
            'order': 3,
        },
    },
    'content-between': {
        'utility': {
            '-ms-flex-line-pack': 'justify',
            '-webkit-align-content': 'space-between',
            'align-content': 'space-between',
        },
        'meta': {
            'group': 'alignContent',
            'order': 4,
        },
    },
    'content-around': {
        'utility': {
            '-ms-flex-line-pack': 'distribute',
            '-webkit-align-content': 'space-around',
            'align-content': 'space-around',
        },
        'meta': {
            'group': 'alignContent',
            'order': 5,
        },
    },
    'content-evenly': {
        'utility': {
            '-ms-flex-line-pack': 'space-evenly',
            '-webkit-align-content': 'space-evenly',
            'align-content': 'space-evenly',
        },
        'meta': {
            'group': 'alignContent',
            'order': 6,
        },
    },
    // https://windicss.org/utilities/positioning.html#align-items
    'items-start': {
        'utility': {
            '-webkit-box-align': 'start',
            '-ms-flex-align': 'start',
            '-webkit-align-items': 'flex-start',
            'align-items': 'flex-start',
        },
        'meta': {
            'group': 'alignItems',
            'order': 1,
        },
    },
    'items-end': {
        'utility': {
            '-webkit-box-align': 'end',
            '-ms-flex-align': 'end',
            '-webkit-align-items': 'flex-end',
            'align-items': 'flex-end',
        },
        'meta': {
            'group': 'alignItems',
            'order': 2,
        },
    },
    'items-center': {
        'utility': {
            '-webkit-box-align': 'center',
            '-ms-flex-align': 'center',
            '-webkit-align-items': 'center',
            'align-items': 'center',
        },
        'meta': {
            'group': 'alignItems',
            'order': 3,
        },
    },
    'items-baseline': {
        'utility': {
            '-webkit-box-align': 'baseline',
            '-ms-flex-align': 'baseline',
            '-webkit-align-items': 'baseline',
            'align-items': 'baseline',
        },
        'meta': {
            'group': 'alignItems',
            'order': 4,
        },
    },
    'items-stretch': {
        'utility': {
            '-webkit-box-align': 'stretch',
            '-ms-flex-align': 'stretch',
            '-webkit-align-items': 'stretch',
            'align-items': 'stretch',
        },
        'meta': {
            'group': 'alignItems',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/positioning.html#align-self
    'self-auto': {
        'utility': {
            '-ms-flex-item-align': 'auto',
            '-ms-grid-row-align': 'auto',
            '-webkit-align-self': 'auto',
            'align-self': 'auto',
        },
        'meta': {
            'group': 'alignSelf',
            'order': 1,
        },
    },
    'self-start': {
        'utility': {
            '-ms-flex-item-align': 'start',
            '-webkit-align-self': 'flex-start',
            'align-self': 'flex-start',
        },
        'meta': {
            'group': 'alignSelf',
            'order': 2,
        },
    },
    'self-end': {
        'utility': {
            '-ms-flex-item-align': 'end',
            '-webkit-align-self': 'flex-end',
            'align-self': 'flex-end',
        },
        'meta': {
            'group': 'alignSelf',
            'order': 3,
        },
    },
    'self-center': {
        'utility': {
            '-ms-flex-item-align': 'center',
            '-ms-grid-row-align': 'center',
            '-webkit-align-self': 'center',
            'align-self': 'center',
        },
        'meta': {
            'group': 'alignSelf',
            'order': 4,
        },
    },
    'self-stretch': {
        'utility': {
            '-ms-flex-item-align': 'stretch',
            '-ms-grid-row-align': 'stretch',
            '-webkit-align-self': 'stretch',
            'align-self': 'stretch',
        },
        'meta': {
            'group': 'alignSelf',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/positioning.html#place-content
    'place-content-center': {
        'utility': {
            'place-content': 'center',
        },
        'meta': {
            'group': 'placeContent',
            'order': 1,
        },
    },
    'place-content-start': {
        'utility': {
            'place-content': 'start',
        },
        'meta': {
            'group': 'placeContent',
            'order': 2,
        },
    },
    'place-content-end': {
        'utility': {
            'place-content': 'end',
        },
        'meta': {
            'group': 'placeContent',
            'order': 3,
        },
    },
    'place-content-between': {
        'utility': {
            'place-content': 'space-between',
        },
        'meta': {
            'group': 'placeContent',
            'order': 4,
        },
    },
    'place-content-around': {
        'utility': {
            'place-content': 'space-around',
        },
        'meta': {
            'group': 'placeContent',
            'order': 5,
        },
    },
    'place-content-evenly': {
        'utility': {
            'place-content': 'space-evenly',
        },
        'meta': {
            'group': 'placeContent',
            'order': 6,
        },
    },
    'place-content-stretch': {
        'utility': {
            'place-content': 'stretch',
        },
        'meta': {
            'group': 'placeContent',
            'order': 7,
        },
    },
    // https://windicss.org/utilities/positioning.html#place-items
    'place-items-auto': {
        'utility': {
            'place-items': 'auto',
        },
        'meta': {
            'group': 'placeItems',
            'order': 1,
        },
    },
    'place-items-start': {
        'utility': {
            'place-items': 'start',
        },
        'meta': {
            'group': 'placeItems',
            'order': 2,
        },
    },
    'place-items-end': {
        'utility': {
            'place-items': 'end',
        },
        'meta': {
            'group': 'placeItems',
            'order': 3,
        },
    },
    'place-items-center': {
        'utility': {
            'place-items': 'center',
        },
        'meta': {
            'group': 'placeItems',
            'order': 4,
        },
    },
    'place-items-stretch': {
        'utility': {
            'place-items': 'stretch',
        },
        'meta': {
            'group': 'placeItems',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/positioning.html#place-self
    'place-self-auto': {
        'utility': {
            '-ms-grid-row-align': 'auto',
            '-ms-grid-column-align': 'auto',
            'place-self': 'auto',
        },
        'meta': {
            'group': 'placeSelf',
            'order': 1,
        },
    },
    'place-self-start': {
        'utility': {
            '-ms-grid-row-align': 'start',
            '-ms-grid-column-align': 'start',
            'place-self': 'start',
        },
        'meta': {
            'group': 'placeSelf',
            'order': 2,
        },
    },
    'place-self-end': {
        'utility': {
            '-ms-grid-row-align': 'end',
            '-ms-grid-column-align': 'end',
            'place-self': 'end',
        },
        'meta': {
            'group': 'placeSelf',
            'order': 3,
        },
    },
    'place-self-center': {
        'utility': {
            '-ms-grid-row-align': 'center',
            '-ms-grid-column-align': 'center',
            'place-self': 'center',
        },
        'meta': {
            'group': 'placeSelf',
            'order': 4,
        },
    },
    'place-self-stretch': {
        'utility': {
            '-ms-grid-row-align': 'stretch',
            '-ms-grid-column-align': 'stretch',
            'place-self': 'stretch',
        },
        'meta': {
            'group': 'placeSelf',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/typography.html#font-smoothing
    'antialiased': {
        'utility': {
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
        },
        'meta': {
            'group': 'fontSmoothing',
            'order': 1,
        },
    },
    'subpixel-antialiased': {
        'utility': {
            '-webkit-font-smoothing': 'auto',
            '-moz-osx-font-smoothing': 'auto',
        },
        'meta': {
            'group': 'fontSmoothing',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/typography.html#font-style
    'italic': {
        'utility': {
            'font-style': 'italic',
        },
        'meta': {
            'group': 'fontStyle',
            'order': 1,
        },
    },
    'not-italic': {
        'utility': {
            'font-style': 'normal',
        },
        'meta': {
            'group': 'fontStyle',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/typography.html#font-variant-numeric
    'normal-nums': {
        'utility': {
            'font-variant-numeric': 'normal',
        },
        'meta': {
            'group': 'fontVariantNumeric',
            'order': 1,
        },
    },
    'ordinal': {
        'utility': __assign(__assign({}, fontVariants), { '--tw-ordinal': 'ordinal' }),
        'meta': {
            'group': 'fontVariantNumeric',
            'order': 2,
        },
    },
    'slashed-zero': {
        'utility': __assign(__assign({}, fontVariants), { '--tw-slashed-zero': 'slashed-zero' }),
        'meta': {
            'group': 'fontVariantNumeric',
            'order': 3,
        },
    },
    'lining-nums': {
        'utility': __assign(__assign({}, fontVariants), { '--tw-numeric-figure': 'lining-nums' }),
        'meta': {
            'group': 'fontVariantNumeric',
            'order': 4,
        },
    },
    'oldstyle-nums': {
        'utility': __assign(__assign({}, fontVariants), { '--tw-numeric-figure': 'oldstyle-nums' }),
        'meta': {
            'group': 'fontVariantNumeric',
            'order': 5,
        },
    },
    'proportional-nums': {
        'utility': __assign(__assign({}, fontVariants), { '--tw-numeric-spacing': 'proportional-nums' }),
        'meta': {
            'group': 'fontVariantNumeric',
            'order': 6,
        },
    },
    'tabular-nums': {
        'utility': __assign(__assign({}, fontVariants), { '--tw-numeric-spacing': 'tabular-nums' }),
        'meta': {
            'group': 'fontVariantNumeric',
            'order': 7,
        },
    },
    'diagonal-fractions': {
        'utility': __assign(__assign({}, fontVariants), { '--tw-numeric-fraction': 'diagonal-fractions' }),
        'meta': {
            'group': 'fontVariantNumeric',
            'order': 8,
        },
    },
    'stacked-fractions': {
        'utility': __assign(__assign({}, fontVariants), { '--tw-numeric-fraction': 'stacked-fractions' }),
        'meta': {
            'group': 'fontVariantNumeric',
            'order': 9,
        },
    },
    // https://windicss.org/utilities/behaviors.html#list-style-position
    'list-inside': {
        'utility': {
            'list-style-position': 'inside',
        },
        'meta': {
            'group': 'listStylePosition',
            'order': 1,
        },
    },
    'list-outside': {
        'utility': {
            'list-style-position': 'outside',
        },
        'meta': {
            'group': 'listStylePosition',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/typography.html#text-alignment
    'text-left': {
        'utility': {
            'text-align': 'left',
        },
        'meta': {
            'group': 'textAlign',
            'order': 1,
        },
    },
    'text-center': {
        'utility': {
            'text-align': 'center',
        },
        'meta': {
            'group': 'textAlign',
            'order': 2,
        },
    },
    'text-right': {
        'utility': {
            'text-align': 'right',
        },
        'meta': {
            'group': 'textAlign',
            'order': 3,
        },
    },
    'text-justify': {
        'utility': {
            'text-align': 'justify',
        },
        'meta': {
            'group': 'textAlign',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/typography.html#text-decoration
    'underline': {
        'utility': {
            '-webkit-text-decoration-line': 'underline',
            'text-decoration-line': 'underline',
        },
        'meta': {
            'group': 'textDecoration',
            'order': 1,
        },
    },
    'overline': {
        'utility': {
            '-webkit-text-decoration-line': 'overline',
            'text-decoration-line': 'overline',
        },
        'meta': {
            'group': 'textDecoration',
            'order': 2,
        },
    },
    'line-through': {
        'utility': {
            '-webkit-text-decoration-line': 'line-through',
            'text-decoration-line': 'line-through',
        },
        'meta': {
            'group': 'textDecoration',
            'order': 3,
        },
    },
    'no-underline': {
        'utility': {
            'text-decoration': 'none',
        },
        'meta': {
            'group': 'textDecoration',
            'order': 4,
        },
    },
    // http://localhost:3001/utilities/typography.html#text-decoration-style
    'decoration-solid': {
        'utility': {
            '-webkit-text-decoration-style': 'solid',
            'text-decoration-style': 'solid',
        },
        'meta': {
            'group': 'textDecorationStyle',
            'order': 1,
        },
    },
    'decoration-double': {
        'utility': {
            '-webkit-text-decoration-style': 'double',
            'text-decoration-style': 'double',
        },
        'meta': {
            'group': 'textDecorationStyle',
            'order': 2,
        },
    },
    'decoration-dotted': {
        'utility': {
            '-webkit-text-decoration-style': 'dotted',
            'text-decoration-style': 'dotted',
        },
        'meta': {
            'group': 'textDecorationStyle',
            'order': 3,
        },
    },
    'decoration-dashed': {
        'utility': {
            '-webkit-text-decoration-style': 'dashed',
            'text-decoration-style': 'dashed',
        },
        'meta': {
            'group': 'textDecorationStyle',
            'order': 4,
        },
    },
    'decoration-wavy': {
        'utility': {
            '-webkit-text-decoration-style': 'wavy',
            'text-decoration-style': 'wavy',
        },
        'meta': {
            'group': 'textDecorationStyle',
            'order': 5,
        },
    },
    // http://localhost:3001/utilities/typography.html#text-decoration-style - Fallback to .decoration-{style}
    'underline-solid': {
        'utility': {
            '-webkit-text-decoration-style': 'solid',
            'text-decoration-style': 'solid',
        },
        'meta': {
            'group': 'textDecorationStyle',
            'order': 1,
        },
    },
    'underline-double': {
        'utility': {
            '-webkit-text-decoration-style': 'double',
            'text-decoration-style': 'double',
        },
        'meta': {
            'group': 'textDecorationStyle',
            'order': 2,
        },
    },
    'underline-dotted': {
        'utility': {
            '-webkit-text-decoration-style': 'dotted',
            'text-decoration-style': 'dotted',
        },
        'meta': {
            'group': 'textDecorationStyle',
            'order': 3,
        },
    },
    'underline-dashed': {
        'utility': {
            '-webkit-text-decoration-style': 'dashed',
            'text-decoration-style': 'dashed',
        },
        'meta': {
            'group': 'textDecorationStyle',
            'order': 4,
        },
    },
    'underline-wavy': {
        'utility': {
            '-webkit-text-decoration-style': 'wavy',
            'text-decoration-style': 'wavy',
        },
        'meta': {
            'group': 'textDecorationStyle',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/typography.html#text-transform
    'uppercase': {
        'utility': {
            'text-transform': 'uppercase',
        },
        'meta': {
            'group': 'textTransform',
            'order': 1,
        },
    },
    'lowercase': {
        'utility': {
            'text-transform': 'lowercase',
        },
        'meta': {
            'group': 'textTransform',
            'order': 2,
        },
    },
    'capitalize': {
        'utility': {
            'text-transform': 'capitalize',
        },
        'meta': {
            'group': 'textTransform',
            'order': 3,
        },
    },
    'normal-case': {
        'utility': {
            'text-transform': 'none',
        },
        'meta': {
            'group': 'textTransform',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/typography.html#text-overflow
    'truncate': {
        'utility': {
            'overflow': 'hidden',
            '-o-text-overflow': 'ellipsis',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
        },
        'meta': {
            'group': 'textOverflow',
            'order': 1,
        },
    },
    'overflow-ellipsis': {
        'utility': {
            '-o-text-overflow': 'ellipsis',
            'text-overflow': 'ellipsis',
        },
        'meta': {
            'group': 'textOverflow',
            'order': 2,
        },
    },
    'text-ellipsis': {
        'utility': {
            '-o-text-overflow': 'ellipsis',
            'text-overflow': 'ellipsis',
        },
        'meta': {
            'group': 'textOverflow',
            'order': 3,
        },
    },
    'text-clip': {
        'utility': {
            '-o-text-overflow': 'clip',
            'text-overflow': 'clip',
        },
        'meta': {
            'group': 'textOverflow',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/typography.html#vertical-alignment
    'align-baseline': {
        'utility': {
            'vertical-align': 'baseline',
        },
        'meta': {
            'group': 'verticalAlign',
            'order': 1,
        },
    },
    'align-top': {
        'utility': {
            'vertical-align': 'top',
        },
        'meta': {
            'group': 'verticalAlign',
            'order': 2,
        },
    },
    'align-middle': {
        'utility': {
            'vertical-align': 'middle',
        },
        'meta': {
            'group': 'verticalAlign',
            'order': 3,
        },
    },
    'align-bottom': {
        'utility': {
            'vertical-align': 'bottom',
        },
        'meta': {
            'group': 'verticalAlign',
            'order': 4,
        },
    },
    'align-text-top': {
        'utility': {
            'vertical-align': 'text-top',
        },
        'meta': {
            'group': 'verticalAlign',
            'order': 5,
        },
    },
    'align-text-bottom': {
        'utility': {
            'vertical-align': 'text-bottom',
        },
        'meta': {
            'group': 'verticalAlign',
            'order': 6,
        },
    },
    'align-sub': {
        'utility': {
            'vertical-align': 'sub',
        },
        'meta': {
            'group': 'verticalAlign',
            'order': 7,
        },
    },
    'align-super': {
        'utility': {
            'vertical-align': 'super',
        },
        'meta': {
            'group': 'verticalAlign',
            'order': 8,
        },
    },
    // https://windicss.org/utilities/typography.html#whitespace
    'whitespace-normal': {
        'utility': {
            'white-space': 'normal',
        },
        'meta': {
            'group': 'whitespace',
            'order': 1,
        },
    },
    'whitespace-nowrap': {
        'utility': {
            'white-space': 'nowrap',
        },
        'meta': {
            'group': 'whitespace',
            'order': 2,
        },
    },
    'whitespace-pre': {
        'utility': {
            'white-space': 'pre',
        },
        'meta': {
            'group': 'whitespace',
            'order': 3,
        },
    },
    'whitespace-pre-line': {
        'utility': {
            'white-space': 'pre-line',
        },
        'meta': {
            'group': 'whitespace',
            'order': 4,
        },
    },
    'whitespace-pre-wrap': {
        'utility': {
            'white-space': 'pre-wrap',
        },
        'meta': {
            'group': 'whitespace',
            'order': 5,
        },
    },
    // https://windicss.org/utilities/typography.html#word-break
    'break-normal': {
        'utility': {
            'word-break': 'normal',
            'overflow-wrap': 'normal',
        },
        'meta': {
            'group': 'wordBreak',
            'order': 1,
        },
    },
    'break-words': {
        'utility': {
            'overflow-wrap': 'break-word',
        },
        'meta': {
            'group': 'wordBreak',
            'order': 2,
        },
    },
    'break-all': {
        'utility': {
            'word-break': 'break-all',
        },
        'meta': {
            'group': 'wordBreak',
            'order': 3,
        },
    },
    // https://windicss.org/utilities/typography.html#writing-mode
    'write-normal': {
        'utility': {
            '-webkit-writing-mode': 'horizontal-tb',
            '-ms-writing-mode': 'lr-tb',
            'writing-mode': 'horizontal-tb',
        },
        'meta': {
            'group': 'writingMode',
            'order': 1,
        },
    },
    'write-vertical-right': {
        'utility': {
            '-webkit-writing-mode': 'vertical-rl',
            '-ms-writing-mode': 'tb-rl',
            'writing-mode': 'vertical-rl',
        },
        'meta': {
            'group': 'writingMode',
            'order': 2,
        },
    },
    'write-vertical-left': {
        'utility': {
            '-webkit-writing-mode': 'vertical-lr',
            '-ms-writing-mode': 'tb-lr',
            'writing-mode': 'vertical-lr',
        },
        'meta': {
            'group': 'writingMode',
            'order': 3,
        },
    },
    // https://windicss.org/utilities/typography.html#writing-orientation
    'write-orient-mixed': {
        'utility': {
            '-webkit-text-orientation': 'mixed',
            'text-orientation': 'mixed',
        },
        'meta': {
            'group': 'writingMode',
            'order': 4,
        },
    },
    'write-orient-upright': {
        'utility': {
            '-webkit-text-orientation': 'upright',
            'text-orientation': 'upright',
        },
        'meta': {
            'group': 'writingMode',
            'order': 5,
        },
    },
    'write-orient-sideways': {
        'utility': {
            '-webkit-text-orientation': 'sideways',
            'text-orientation': 'sideways',
        },
        'meta': {
            'group': 'writingMode',
            'order': 6,
        },
    },
    // https://windicss.org/utilities/typography.html#hyphens
    'hyphens-none': {
        'utility': {
            '-webkit-hyphens': 'none',
            '-ms-hyphens': 'none',
            'hyphens': 'none',
        },
        'meta': {
            'group': 'hyphens',
            'order': 1,
        },
    },
    'hyphens-manual': {
        'utility': {
            '-webkit-hyphens': 'manual',
            '-ms-hyphens': 'manual',
            'hyphens': 'manual',
        },
        'meta': {
            'group': 'hyphens',
            'order': 2,
        },
    },
    'hyphens-auto': {
        'utility': {
            '-webkit-hyphens': 'auto',
            '-ms-hyphens': 'auto',
            'hyphens': 'auto',
        },
        'meta': {
            'group': 'hyphens',
            'order': 3,
        },
    },
    // https://windicss.org/utilities/backgrounds.html#background-attachment
    'bg-fixed': {
        'utility': {
            'background-attachment': 'fixed',
        },
        'meta': {
            'group': 'backgroundAttachment',
            'order': 1,
        },
    },
    'bg-local': {
        'utility': {
            'background-attachment': 'local',
        },
        'meta': {
            'group': 'backgroundAttachment',
            'order': 2,
        },
    },
    'bg-scroll': {
        'utility': {
            'background-attachment': 'scroll',
        },
        'meta': {
            'group': 'backgroundAttachment',
            'order': 3,
        },
    },
    // https://windicss.org/utilities/backgrounds.html#background-clip
    'bg-clip-border': {
        'utility': {
            '-webkit-background-clip': 'border-box',
            'background-clip': 'border-box',
        },
        'meta': {
            'group': 'backgroundClip',
            'order': 1,
        },
    },
    'bg-clip-padding': {
        'utility': {
            '-webkit-background-clip': 'padding-box',
            'background-clip': 'padding-box',
        },
        'meta': {
            'group': 'backgroundClip',
            'order': 2,
        },
    },
    'bg-clip-content': {
        'utility': {
            '-webkit-background-clip': 'content-box',
            'background-clip': 'content-box',
        },
        'meta': {
            'group': 'backgroundClip',
            'order': 3,
        },
    },
    'bg-clip-text': {
        'utility': {
            '-webkit-background-clip': 'text',
            'background-clip': 'text',
        },
        'meta': {
            'group': 'backgroundClip',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/backgrounds.html#background-repeat
    'bg-repeat': {
        'utility': {
            'background-repeat': 'repeat',
        },
        'meta': {
            'group': 'backgroundRepeat',
            'order': 1,
        },
    },
    'bg-no-repeat': {
        'utility': {
            'background-repeat': 'no-repeat',
        },
        'meta': {
            'group': 'backgroundRepeat',
            'order': 2,
        },
    },
    'bg-repeat-x': {
        'utility': {
            'background-repeat': 'repeat-x',
        },
        'meta': {
            'group': 'backgroundRepeat',
            'order': 3,
        },
    },
    'bg-repeat-y': {
        'utility': {
            'background-repeat': 'repeat-y',
        },
        'meta': {
            'group': 'backgroundRepeat',
            'order': 4,
        },
    },
    'bg-repeat-round': {
        'utility': {
            'background-repeat': 'round',
        },
        'meta': {
            'group': 'backgroundRepeat',
            'order': 5,
        },
    },
    'bg-repeat-space': {
        'utility': {
            'background-repeat': 'space',
        },
        'meta': {
            'group': 'backgroundRepeat',
            'order': 6,
        },
    },
    // https://windicss.org/utilities/backgrounds.html#background-origin
    'bg-origin-border': {
        'utility': {
            'background-origin': 'border-box',
        },
        'meta': {
            'group': 'backgroundOrigin',
            'order': 1,
        },
    },
    'bg-origin-padding': {
        'utility': {
            'background-origin': 'padding-box',
        },
        'meta': {
            'group': 'backgroundOrigin',
            'order': 2,
        },
    },
    'bg-origin-content': {
        'utility': {
            'background-origin': 'content-box',
        },
        'meta': {
            'group': 'backgroundOrigin',
            'order': 3,
        },
    },
    // https://windicss.org/utilities/borders.html#border-style
    'border-solid': {
        'utility': {
            'border-style': 'solid',
        },
        'meta': {
            'group': 'borderStyle',
            'order': 1,
        },
    },
    'border-dashed': {
        'utility': {
            'border-style': 'dashed',
        },
        'meta': {
            'group': 'borderStyle',
            'order': 2,
        },
    },
    'border-dotted': {
        'utility': {
            'border-style': 'dotted',
        },
        'meta': {
            'group': 'borderStyle',
            'order': 3,
        },
    },
    'border-double': {
        'utility': {
            'border-style': 'double',
        },
        'meta': {
            'group': 'borderStyle',
            'order': 4,
        },
    },
    'border-none': {
        'utility': {
            'border-style': 'none',
        },
        'meta': {
            'group': 'borderStyle',
            'order': 5,
        },
    },
    'border-hidden': {
        'utility': {
            'border-style': 'hidden',
        },
        'meta': {
            'group': 'borderStyle',
            'order': 6,
        },
    },
    // https://windicss.org/utilities/behaviors.html#image-rendering
    'image-render-auto': {
        'utility': {
            'image-rendering': 'auto',
        },
        'meta': {
            'group': 'imageRendering',
            'order': 1,
        },
    },
    'image-render-pixel': {
        'utility': {
            '-ms-interpolation-mode': 'nearest-neighbor',
            'image-rendering': ['-webkit-optimize-contrast', '-moz-crisp-edges', '-o-pixelated', 'pixelated'],
        },
        'meta': {
            'group': 'imageRendering',
            'order': 2,
        },
    },
    'image-render-edge': {
        'utility': {
            'image-rendering': 'crisp-edges',
        },
        'meta': {
            'group': 'imageRendering',
            'order': 3,
        },
    },
    // https://windicss.org/utilities/effects.html#mix-blend-mode
    'mix-blend-normal': {
        'utility': {
            'mix-blend-mode': 'normal',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 1,
        },
    },
    'mix-blend-multiply': {
        'utility': {
            'mix-blend-mode': 'multiply',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 2,
        },
    },
    'mix-blend-screen': {
        'utility': {
            'mix-blend-mode': 'screen',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 3,
        },
    },
    'mix-blend-overlay': {
        'utility': {
            'mix-blend-mode': 'overlay',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 4,
        },
    },
    'mix-blend-darken': {
        'utility': {
            'mix-blend-mode': 'darken',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 5,
        },
    },
    'mix-blend-lighten': {
        'utility': {
            'mix-blend-mode': 'lighten',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 6,
        },
    },
    'mix-blend-color-dodge': {
        'utility': {
            'mix-blend-mode': 'color-dodge',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 7,
        },
    },
    'mix-blend-color-burn': {
        'utility': {
            'mix-blend-mode': 'color-burn',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 8,
        },
    },
    'mix-blend-hard-light': {
        'utility': {
            'mix-blend-mode': 'hard-light',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 9,
        },
    },
    'mix-blend-soft-light': {
        'utility': {
            'mix-blend-mode': 'soft-light',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 10,
        },
    },
    'mix-blend-difference': {
        'utility': {
            'mix-blend-mode': 'difference',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 11,
        },
    },
    'mix-blend-exclusion': {
        'utility': {
            'mix-blend-mode': 'exclusion',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 12,
        },
    },
    'mix-blend-hue': {
        'utility': {
            'mix-blend-mode': 'hue',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 13,
        },
    },
    'mix-blend-saturation': {
        'utility': {
            'mix-blend-mode': 'saturation',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 14,
        },
    },
    'mix-blend-color': {
        'utility': {
            'mix-blend-mode': 'color',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 15,
        },
    },
    'mix-blend-luminosity': {
        'utility': {
            'mix-blend-mode': 'luminosity',
        },
        'meta': {
            'group': 'mixBlendMode',
            'order': 16,
        },
    },
    // https://windicss.org/utilities/backgrounds.html#background-blend-mode
    'bg-blend-normal': {
        'utility': {
            'background-blend-mode': 'normal',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 1,
        },
    },
    'bg-blend-multiply': {
        'utility': {
            'background-blend-mode': 'multiply',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 2,
        },
    },
    'bg-blend-screen': {
        'utility': {
            'background-blend-mode': 'screen',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 3,
        },
    },
    'bg-blend-overlay': {
        'utility': {
            'background-blend-mode': 'overlay',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 4,
        },
    },
    'bg-blend-darken': {
        'utility': {
            'background-blend-mode': 'darken',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 5,
        },
    },
    'bg-blend-lighten': {
        'utility': {
            'background-blend-mode': 'lighten',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 6,
        },
    },
    'bg-blend-color-dodge': {
        'utility': {
            'background-blend-mode': 'color-dodge',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 7,
        },
    },
    'bg-blend-color-burn': {
        'utility': {
            'background-blend-mode': 'color-burn',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 8,
        },
    },
    'bg-blend-hard-light': {
        'utility': {
            'background-blend-mode': 'hard-light',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 9,
        },
    },
    'bg-blend-soft-light': {
        'utility': {
            'background-blend-mode': 'soft-light',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 10,
        },
    },
    'bg-blend-difference': {
        'utility': {
            'background-blend-mode': 'difference',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 11,
        },
    },
    'bg-blend-exclusion': {
        'utility': {
            'background-blend-mode': 'exclusion',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 12,
        },
    },
    'bg-blend-hue': {
        'utility': {
            'background-blend-mode': 'hue',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 13,
        },
    },
    'bg-blend-saturation': {
        'utility': {
            'background-blend-mode': 'saturation',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 14,
        },
    },
    'bg-blend-color': {
        'utility': {
            'background-blend-mode': 'color',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 15,
        },
    },
    'bg-blend-luminosity': {
        'utility': {
            'background-blend-mode': 'luminosity',
        },
        'meta': {
            'group': 'backgroundBlendMode',
            'order': 16,
        },
    },
    // https://windicss.org/utilities/filters.html#filter
    'filter': {
        'utility': {
            '--tw-blur': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-brightness': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-contrast': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-grayscale': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-hue-rotate': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-invert': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-saturate': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-sepia': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-drop-shadow': 'var(--tw-empty,/*!*/ /*!*/)',
            '-webkit-filter': 'var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)',
            'filter': 'var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)',
        },
        'meta': {
            'group': 'filter',
            'order': 1,
        },
    },
    'filter-none': {
        'utility': {
            '-webkit-filter': 'none',
            'filter': 'none',
        },
        'meta': {
            'group': 'filter',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/filters.html#backdrop-filter
    'backdrop-filter': {
        'utility': {
            '--tw-backdrop-blur': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-backdrop-brightness': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-backdrop-contrast': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-backdrop-grayscale': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-backdrop-hue-rotate': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-backdrop-invert': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-backdrop-opacity': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-backdrop-saturate': 'var(--tw-empty,/*!*/ /*!*/)',
            '--tw-backdrop-sepia': 'var(--tw-empty,/*!*/ /*!*/)',
            '-webkit-backdrop-filter': 'var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)',
            'backdrop-filter': 'var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)',
        },
        'meta': {
            'group': 'backdropFilter',
            'order': 1,
        },
    },
    'backdrop-filter-none': {
        'utility': {
            '-webkit-backdrop-filter': 'none',
            'backdrop-filter': 'none',
        },
        'meta': {
            'group': 'backdropFilter',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/tables.html#table-border-collapse
    'border-collapse': {
        'utility': {
            'border-collapse': 'collapse',
        },
        'meta': {
            'group': 'borderCollapse',
            'order': 1,
        },
    },
    'border-separate': {
        'utility': {
            'border-collapse': 'separate',
        },
        'meta': {
            'group': 'borderCollapse',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/tables.html#table-caption-side
    'caption-top': {
        'utility': {
            'caption-side': 'top',
        },
        'meta': {
            'group': 'captionSide',
            'order': 1,
        },
    },
    'caption-bottom': {
        'utility': {
            'caption-side': 'bottom',
        },
        'meta': {
            'group': 'captionSide',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/tables.html#table-empty-cells
    'empty-cells-visible': {
        'utility': {
            'empty-cells': 'show',
        },
        'meta': {
            'group': 'emptyCells',
            'order': 1,
        },
    },
    'empty-cells-hidden': {
        'utility': {
            'empty-cells': 'hide',
        },
        'meta': {
            'group': 'emptyCells',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/tables.html#table-layout
    'table-auto': {
        'utility': {
            'table-layout': 'auto',
        },
        'meta': {
            'group': 'tableLayout',
            'order': 1,
        },
    },
    'table-fixed': {
        'utility': {
            'table-layout': 'fixed',
        },
        'meta': {
            'group': 'tableLayout',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/transforms.html
    'transform': {
        'utility': {
            '--tw-translate-x': '0',
            '--tw-translate-y': '0',
            '--tw-translate-z': '0',
            '--tw-rotate': '0',
            '--tw-rotate-x': '0',
            '--tw-rotate-y': '0',
            '--tw-rotate-z': '0',
            '--tw-skew-x': '0',
            '--tw-skew-y': '0',
            '--tw-scale-x': '1',
            '--tw-scale-y': '1',
            '--tw-scale-z': '1',
            '-webkit-transform': 'translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
            '-ms-transform': 'translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
            'transform': 'translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) translateZ(var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
        },
        'meta': {
            'group': 'transform',
            'order': 1,
        },
    },
    'transform-gpu': {
        'utility': {
            '--tw-translate-x': '0',
            '--tw-translate-y': '0',
            '--tw-translate-z': '0',
            '--tw-rotate': '0',
            '--tw-rotate-x': '0',
            '--tw-rotate-y': '0',
            '--tw-rotate-z': '0',
            '--tw-skew-x': '0',
            '--tw-skew-y': '0',
            '--tw-scale-x': '1',
            '--tw-scale-y': '1',
            '--tw-scale-z': '1',
            '-webkit-transform': 'translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
            '-ms-transform': 'translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
            'transform': 'translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) rotateZ(var(--tw-rotate-z)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) scaleZ(var(--tw-scale-z))',
        },
        'meta': {
            'group': 'transform',
            'order': 2,
        },
    },
    'transform-none': {
        'utility': {
            '-webkit-transform': 'none',
            '-ms-transform': 'none',
            'transform': 'none',
        },
        'meta': {
            'group': 'transform',
            'order': 3,
        },
    },
    // https://windicss.org/utilities/transforms.html#transform-type
    'preserve-flat': {
        'utility': {
            '-webkit-transform-style': 'flat',
            'transform-style': 'flat',
        },
        'meta': {
            'group': 'transform',
            'order': 4,
        },
    },
    'preserve-3d': {
        'utility': {
            '-webkit-transform-style': 'preserve-3d',
            'transform-style': 'preserve-3d',
        },
        'meta': {
            'group': 'transform',
            'order': 5,
        },
    },
    'animated': {
        'utility': {
            '-webkit-animation-duration': '1000ms',
            '-webkit-animation-fill-mode': 'both',
            'animation-duration': '1000ms',
            'animation-fill-mode': 'both',
        },
        'meta': {
            'group': 'animation',
            'order': 3,
        },
    },
    'animate-reverse': {
        'utility': {
            '-webkit-animation-direction': 'reverse',
            'animation-direction': 'reverse',
        },
        'meta': {
            'group': 'animation',
            'order': 4,
        },
    },
    'animate-alternate': {
        'utility': {
            '-webkit-animation-direction': 'alternate',
            'animation-direction': 'alternate',
        },
        'meta': {
            'group': 'animation',
            'order': 5,
        },
    },
    'animate-alternate-reverse': {
        'utility': {
            '-webkit-animation-direction': 'alternate-reverse',
            'animation-direction': 'alternate-reverse',
        },
        'meta': {
            'group': 'animation',
            'order': 6,
        },
    },
    'animate-fill-none': {
        'utility': {
            '-webkit-animation-fill-mode': 'none',
            'animation-fill-mode': 'none',
        },
        'meta': {
            'group': 'animation',
            'order': 7,
        },
    },
    'animate-fill-forwards': {
        'utility': {
            '-webkit-animation-fill-mode': 'forwards',
            'animation-fill-mode': 'forwards',
        },
        'meta': {
            'group': 'animation',
            'order': 8,
        },
    },
    'animate-fill-backwards': {
        'utility': {
            '-webkit-animation-fill-mode': 'backwards',
            'animation-fill-mode': 'backwards',
        },
        'meta': {
            'group': 'animation',
            'order': 9,
        },
    },
    'animate-fill-both': {
        'utility': {
            '-webkit-animation-fill-mode': 'both',
            'animation-fill-mode': 'both',
        },
        'meta': {
            'group': 'animation',
            'order': 10,
        },
    },
    'animate-paused': {
        'utility': {
            '-webkit-animation-play-state': 'paused',
            'animation-play-state': 'paused',
        },
        'meta': {
            'group': 'animation',
            'order': 11,
        },
    },
    'animate-running': {
        'utility': {
            '-webkit-animation-play-state': 'running',
            'animation-play-state': 'running',
        },
        'meta': {
            'group': 'animation',
            'order': 12,
        },
    },
    // https://windicss.org/utilities/behaviors.html#appearance
    'appearance-none': {
        'utility': {
            '-webkit-appearance': 'none',
            '-moz-appearance': 'none',
            'appearance': 'none',
        },
        'meta': {
            'group': 'appearance',
            'order': 1,
        },
    },
    // https://windicss.org/utilities/behaviors.html#pointer-events
    'pointer-events-none': {
        'utility': {
            'pointer-events': 'none',
        },
        'meta': {
            'group': 'pointerEvents',
            'order': 1,
        },
    },
    'pointer-events-auto': {
        'utility': {
            'pointer-events': 'auto',
        },
        'meta': {
            'group': 'pointerEvents',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/behaviors.html#resize
    'resize-none': {
        'utility': {
            'resize': 'none',
        },
        'meta': {
            'group': 'resize',
            'order': 1,
        },
    },
    'resize-y': {
        'utility': {
            'resize': 'vertical',
        },
        'meta': {
            'group': 'resize',
            'order': 2,
        },
    },
    'resize-x': {
        'utility': {
            'resize': 'horizontal',
        },
        'meta': {
            'group': 'resize',
            'order': 3,
        },
    },
    'resize': {
        'utility': {
            'resize': 'both',
        },
        'meta': {
            'group': 'resize',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/behaviors.html#user-select
    'select-none': {
        'utility': {
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none',
        },
        'meta': {
            'group': 'userSelect',
            'order': 1,
        },
    },
    'select-text': {
        'utility': {
            '-webkit-user-select': 'text',
            '-moz-user-select': 'text',
            '-ms-user-select': 'text',
            'user-select': 'text',
        },
        'meta': {
            'group': 'userSelect',
            'order': 2,
        },
    },
    'select-all': {
        'utility': {
            '-webkit-user-select': 'all',
            '-moz-user-select': 'all',
            '-ms-user-select': 'all',
            'user-select': 'all',
        },
        'meta': {
            'group': 'userSelect',
            'order': 3,
        },
    },
    'select-auto': {
        'utility': {
            '-webkit-user-select': 'auto',
            '-moz-user-select': 'auto',
            '-ms-user-select': 'auto',
            'user-select': 'auto',
        },
        'meta': {
            'group': 'userSelect',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/svg.html#fill-color
    // https://windicss.org/utilities/svg.html#stroke-color
    'fill-current': {
        'utility': {
            'fill': 'currentColor',
        },
        'meta': {
            'group': 'fill',
            'order': 1,
        },
    },
    'stroke-current': {
        'utility': {
            'stroke': 'currentColor',
        },
        'meta': {
            'group': 'stroke',
            'order': 1,
        },
    },
    // https://windicss.org/utilities/svg.html#stroke-linecap
    'stroke-cap-auto': {
        'utility': {
            'stroke-linecap': 'butt',
        },
        'meta': {
            'group': 'stroke',
            'order': 2,
        },
    },
    'stroke-cap-square': {
        'utility': {
            'stroke-linecap': 'square',
        },
        'meta': {
            'group': 'stroke',
            'order': 3,
        },
    },
    'stroke-cap-round': {
        'utility': {
            'stroke-linecap': 'round',
        },
        'meta': {
            'group': 'stroke',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/svg.html#stroke-linejoin
    'stroke-join-auto': {
        'utility': {
            'stroke-linejoin': 'miter',
        },
        'meta': {
            'group': 'stroke',
            'order': 5,
        },
    },
    'stroke-join-arcs': {
        'utility': {
            'stroke-linejoin': 'arcs',
        },
        'meta': {
            'group': 'stroke',
            'order': 6,
        },
    },
    'stroke-join-bevel': {
        'utility': {
            'stroke-linejoin': 'bevel',
        },
        'meta': {
            'group': 'stroke',
            'order': 7,
        },
    },
    'stroke-join-clip': {
        'utility': {
            'stroke-linejoin': 'miter-clip',
        },
        'meta': {
            'group': 'stroke',
            'order': 8,
        },
    },
    'stroke-join-round': {
        'utility': {
            'stroke-linejoin': 'round',
        },
        'meta': {
            'group': 'stroke',
            'order': 9,
        },
    },
    // https://windicss.org/utilities/behaviors.html#screen-readers-access
    'sr-only': {
        'utility': {
            'position': 'absolute',
            'width': '1px',
            'height': '1px',
            'padding': '0',
            'margin': '-1px',
            'overflow': 'hidden',
            'clip': 'rect(0, 0, 0, 0)',
            'white-space': 'nowrap',
            'border-width': '0',
        },
        'meta': {
            'group': 'accessibility',
            'order': 1,
        },
    },
    'not-sr-only': {
        'utility': {
            'position': 'static',
            'width': 'auto',
            'height': 'auto',
            'padding': '0',
            'margin': '0',
            'overflow': 'visible',
            'clip': 'auto',
            'white-space': 'normal',
        },
        'meta': {
            'group': 'accessibility',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/behaviors.html#will-change
    'will-change-auto': {
        'utility': {
            'will-change': 'auto',
        },
        'meta': {
            'group': 'willChange',
            'order': 1,
        },
    },
    'will-change-scroll': {
        'utility': {
            'will-change': 'scroll',
        },
        'meta': {
            'group': 'willChange',
            'order': 2,
        },
    },
    'will-change-contents': {
        'utility': {
            'will-change': 'contents',
        },
        'meta': {
            'group': 'willChange',
            'order': 3,
        },
    },
    'will-change-transform': {
        'utility': {
            'will-change': 'transform',
        },
        'meta': {
            'group': 'willChange',
            'order': 4,
        },
    },
    // https://windicss.org/utilities/behaviors.html#touch-action
    'touch-auto': {
        'utility': {
            'touch-action': 'auto',
        },
        'meta': {
            'group': 'touchAction',
            'order': 1,
        },
    },
    'touch-none': {
        'utility': {
            'touch-action': 'none',
        },
        'meta': {
            'group': 'touchAction',
            'order': 2,
        },
    },
    'touch-pan-x': {
        'utility': {
            'touch-action': 'pan-x',
        },
        'meta': {
            'group': 'touchAction',
            'order': 3,
        },
    },
    'touch-pan-left': {
        'utility': {
            'touch-action': 'pan-left',
        },
        'meta': {
            'group': 'touchAction',
            'order': 4,
        },
    },
    'touch-pan-right': {
        'utility': {
            'touch-action': 'pan-right',
        },
        'meta': {
            'group': 'touchAction',
            'order': 5,
        },
    },
    'touch-pan-y': {
        'utility': {
            'touch-action': 'pan-y',
        },
        'meta': {
            'group': 'touchAction',
            'order': 6,
        },
    },
    'touch-pan-up': {
        'utility': {
            'touch-action': 'pan-up',
        },
        'meta': {
            'group': 'touchAction',
            'order': 7,
        },
    },
    'touch-pan-down': {
        'utility': {
            'touch-action': 'pan-down',
        },
        'meta': {
            'group': 'touchAction',
            'order': 8,
        },
    },
    'touch-pinch-zoom': {
        'utility': {
            'touch-action': 'pinch-zoom',
        },
        'meta': {
            'group': 'touchAction',
            'order': 9,
        },
    },
    'touch-manipulation': {
        'utility': {
            'touch-action': 'manipulation',
        },
        'meta': {
            'group': 'touchAction',
            'order': 10,
        },
    },
    // https://windicss.org/utilities/behaviors.html#scroll-behavior
    'scroll-auto': {
        'utility': {
            'scroll-behavior': 'auto',
        },
        'meta': {
            'group': 'scrollBehavior',
            'order': 1,
        },
    },
    'scroll-smooth': {
        'utility': {
            'scroll-behavior': 'smooth',
        },
        'meta': {
            'group': 'scrollBehavior',
            'order': 2,
        },
    },
    // https://windicss.org/utilities/borders/outline.html
    'outline-none': {
        'utility': {
            'outline': '2px solid transparent',
            'outline-offset': '2px',
        },
        'meta': {
            'group': 'outline',
            'order': 1,
        },
    },
    'outline': {
        'utility': {
            'outline-style': 'solid',
        },
        'meta': {
            'group': 'outline',
            'order': 2,
        },
    },
    'outline-dashed': {
        'utility': {
            'outline-style': 'dashed',
        },
        'meta': {
            'group': 'outline',
            'order': 3,
        },
    },
    'outline-dotted': {
        'utility': {
            'outline-style': 'dotted',
        },
        'meta': {
            'group': 'outline',
            'order': 4,
        },
    },
    'outline-double': {
        'utility': {
            'outline-style': 'double',
        },
        'meta': {
            'group': 'outline',
            'order': 5,
        },
    },
    'outline-hidden': {
        'utility': {
            'outline-style': 'hidden',
        },
        'meta': {
            'group': 'outline',
            'order': 6,
        },
    },
};

function isNumberLead(i) {
    return /^\d/.test(i) ? i : undefined;
}
function notNumberLead(i) {
    return /^\d/.test(i) ? undefined : i;
}
// https://windicss.org/utilities/container.html
function container(utility, _a) {
    var theme = _a.theme;
    if (utility.raw === 'container') {
        var className = utility.class;
        var baseStyle = new Container(utility.class, new Property('width', '100%'));
        var paddingDefault = toType(theme('container.padding'), 'string') ? toType(theme('container.padding'), 'string') : toType(theme('container.padding.DEFAULT'), 'string');
        if (paddingDefault) {
            baseStyle.add(new Property('padding-left', paddingDefault));
            baseStyle.add(new Property('padding-right', paddingDefault));
        }
        var center = theme('container.center');
        if (center && typeof center === 'boolean') {
            baseStyle.add(new Property(['margin-left', 'margin-right'], 'auto'));
        }
        var output = [baseStyle];
        var screens = toType(theme('container.screens', theme('screens')), 'object');
        for (var _i = 0, _b = Object.entries(screens); _i < _b.length; _i++) {
            var _c = _b[_i], screen_1 = _c[0], size_1 = _c[1];
            if (!isString(size_1))
                continue;
            var props = [new Property('max-width', "".concat(size_1))];
            var padding_1 = theme("container.padding.".concat(screen_1));
            if (padding_1 && typeof padding_1 === 'string') {
                props.push(new Property('padding-left', padding_1));
                props.push(new Property('padding-right', padding_1));
            }
            output.push(new Container(className, props).atRule("@media (min-width: ".concat(size_1, ")")));
        }
        output.forEach(function (style) { return style.updateMeta('utilities', 'container', pluginOrder.container, 0, true); });
        return output;
    }
}
// https://windicss.org/utilities/positioning.html#object-position
function objectPosition(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleBody(theme('objectPosition'))
        .createProperty(['-o-object-position', 'object-position'])) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'objectPosition', pluginOrder.objectPosition, 0, true);
}
// https://windicss.org/utilities/positioning.html#top-right-bottom-left
function inset(utility, _a) {
    var theme = _a.theme;
    return utility.handler
        .handleStatic(theme('inset'))
        .handleSquareBrackets()
        .handleSpacing()
        .handleFraction()
        .handleSize()
        .handleNegative()
        .handleVariable()
        .callback(function (value) {
        switch (utility.identifier) {
            case 'top':
            case 'right':
            case 'bottom':
            case 'left':
                return new Property(utility.identifier, value).updateMeta('utilities', 'inset', pluginOrder.inset, 4, true);
            case 'inset':
                if (utility.raw.match(/^-?inset-x/))
                    return new Property(['right', 'left'], value).updateMeta('utilities', 'inset', pluginOrder.inset, 3, true);
                if (utility.raw.match(/^-?inset-y/))
                    return new Property(['top', 'bottom'], value).updateMeta('utilities', 'inset', pluginOrder.inset, 2, true);
                return new Property(['top', 'right', 'bottom', 'left'], value).updateMeta('utilities', 'inset', pluginOrder.inset, 1, true);
        }
    });
}
// https://windicss.org/utilities/positioning.html#z-index
function zIndex(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('zIndex'))
        .handleNumber(0, 99999, 'int')
        .handleNegative()
        .handleVariable()
        .createProperty('z-index')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'zIndex', pluginOrder.zIndex, 0, true);
}
// https://windicss.org/utilities/flexbox.html#flex
// https://windicss.org/utilities/flexbox.html#flex-grow
// https://windicss.org/utilities/flexbox.html#flex-shrink
function flex(utility, _a) {
    var _b, _c, _d;
    var theme = _a.theme;
    var className = utility.raw;
    if (className.startsWith('flex-grow')) {
        var map = toType(theme('flexGrow'), 'object');
        var amount = className.replace(/flex-grow-?/, '') || 'DEFAULT';
        if (Object.keys(map).includes(amount))
            return new Property(['-webkit-box-flex', '-ms-flex-positive', '-webkit-flex-grow', 'flex-grow'], map[amount]).toStyle(utility.class).updateMeta('utilities', 'flexGrow', pluginOrder.flexGrow, 0, true);
        return (_b = utility.handler.handleSquareBrackets().createProperty(['-webkit-box-flex', '-ms-flex-positive', '-webkit-flex-grow', 'flex-grow'])) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'flexGrow', pluginOrder.flexGrow, 1, true);
    }
    else if (className.startsWith('flex-shrink')) {
        var map = toType(theme('flexShrink'), 'object');
        var amount = className.replace(/flex-shrink-?/, '') || 'DEFAULT';
        if (Object.keys(map).includes(amount))
            return new Property(['-ms-flex-negative', '-webkit-flex-shrink', 'flex-shrink'], map[amount]).toStyle(utility.class).updateMeta('utilities', 'flexShrink', pluginOrder.flexShrink, 0, true);
        return (_c = utility.handler.handleSquareBrackets().createProperty(['-ms-flex-negative', '-webkit-flex-shrink', 'flex-shrink'])) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'flexShrink', pluginOrder.flexShrink, 1, true);
    }
    else {
        return (_d = utility.handler.handleStatic(theme('flex')).handleSquareBrackets().createStyle(utility.class, function (value) {
            value = value.trim();
            return [
                new Property('-webkit-box-flex', value.startsWith('0') || value === 'none' ? '0' : '1'),
                new Property(['-ms-flex', '-webkit-flex', 'flex'], value),
            ];
        })) === null || _d === void 0 ? void 0 : _d.updateMeta('utilities', 'flex', pluginOrder.flex, 0, true);
    }
}
// https://windicss.org/utilities/flexbox.html#flex-basis
function basis(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('spacing'))
        .handleNumber(1, Infinity, undefined, function (number) { return "".concat(number / 4, "rem"); })
        .handleSize()
        .handleFraction()
        .handleVariable()
        .handleSquareBrackets()
        .createProperty('flex-basis')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'flexBasis', pluginOrder.flexBasis, 1, true);
}
// https://windicss.org/utilities/positioning.html#order
function order(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('order'))
        .handleNumber(1, 9999, 'int')
        .handleNegative()
        .handleVariable()
        .createStyle(utility.class, function (value) { return [
        new Property('-webkit-box-ordinal-group', value.includes('var') ? "calc(".concat(value, "+1)") : (parseInt(value) + 1).toString()),
        new Property(['-webkit-order', '-ms-flex-order', 'order'], value),
    ]; })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'order', pluginOrder.order, utility.raw.charAt(0) === '-' ? 2 : 1, true);
}
// https://windicss.org/utilities/grid.html#grid-template-columns
// https://windicss.org/utilities/grid.html#grid-template-rows
function gridTemplate(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    var type = utility.raw.match(/^grid-rows-/) ? 'rows' : utility.raw.match(/^grid-cols-/) ? 'columns' : undefined;
    if (!type)
        return;
    var group = type === 'rows' ? 'gridTemplateRows' : 'gridTemplateColumns';
    return ((_b = utility.handler
        .handleStatic(theme(group))
        .handleSquareBrackets(function (i) { return i
        .replace(/\(.*?\)|,/g, function (r) { return r === ',' ? ' ' : r; } /* ignore content inside nested-brackets */)
        .replace(/_/g, ' '); })
        .createProperty("grid-template-".concat(type), function (value) { return value === 'none' ? 'none' : value; })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', group, pluginOrder[group], 1, true))
        || ((_c = utility.handler
            .handleNumber(1, undefined, 'int')
            .handleVariable()
            .createProperty("grid-template-".concat(type), function (value) { return "repeat(".concat(value, ", minmax(0, 1fr))"); })) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', group, pluginOrder[group], 2, true));
}
// https://windicss.org/utilities/grid.html#grid-column-span
// https://windicss.org/utilities/grid.html#grid-column-start
// https://windicss.org/utilities/grid.html#grid-column-end
function gridColumn(utility, _a) {
    var _b, _c, _d, _e;
    var theme = _a.theme;
    var body = utility.body;
    // col span
    var spans = toType(theme('gridColumn'), 'object');
    if (Object.keys(spans).includes(body))
        return new Property(['-ms-grid-column-span', 'grid-column'], spans[body]).updateMeta('utilities', 'gridColumn', pluginOrder.gridColumn, 1, true);
    if (utility.raw.startsWith('col-span')) {
        return (_b = utility.handler
            .handleNumber(1, undefined, 'int')
            .handleVariable()
            .createProperty(['-ms-grid-column-span', 'grid-column'], function (value) { return "span ".concat(value, " / span ").concat(value); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'gridColumn', pluginOrder.gridColumn, 1, true);
    }
    // col end
    if (utility.raw.startsWith('col-end')) {
        return (_c = utility.handler
            .handleStatic(theme('gridColumnEnd'))
            .handleSquareBrackets()
            .handleNumber(1, undefined, 'int')
            .handleVariable()
            .createProperty('grid-column-end')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'gridColumnEnd', pluginOrder.gridColumnEnd, 1, true);
    }
    // col start
    if (utility.raw.startsWith('col-start')) {
        return (_d = utility.handler
            .handleStatic(theme('gridColumnStart'))
            .handleSquareBrackets()
            .handleNumber(1, undefined, 'int')
            .handleVariable()
            .createProperty('grid-column-start')) === null || _d === void 0 ? void 0 : _d.updateMeta('utilities', 'gridColumnStart', pluginOrder.gridColumnStart, 1, true);
    }
    return (_e = utility.handler
        .handleSquareBrackets()
        .createProperty(['-ms-grid-column-span', 'grid-column'], function (value) { return "span ".concat(value, " / span ").concat(value); })) === null || _e === void 0 ? void 0 : _e.updateMeta('utilities', 'gridColumn', pluginOrder.gridColumn, 1, true);
}
// https://windicss.org/utilities/grid.html#grid-row-span
// https://windicss.org/utilities/grid.html#grid-row-start
// https://windicss.org/utilities/grid.html#grid-row-end
function gridRow(utility, _a) {
    var _b, _c, _d, _e;
    var theme = _a.theme;
    var body = utility.body;
    // row span
    var spans = toType(theme('gridRow'), 'object');
    if (Object.keys(spans).includes(body))
        return new Property(['-ms-grid-row-span', 'grid-row'], spans[body]).updateMeta('utilities', 'gridRow', pluginOrder.gridRow, 1, true);
    if (utility.raw.startsWith('row-span')) {
        return (_b = utility.handler
            .handleNumber(1, undefined, 'int')
            .handleVariable()
            .createProperty(['-ms-grid-row-span', 'grid-row'], function (value) { return "span ".concat(value, " / span ").concat(value); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'gridRow', pluginOrder.gridRow, 2, true);
    }
    // row end
    if (utility.raw.startsWith('row-end')) {
        return (_c = utility.handler
            .handleStatic(theme('gridRowEnd'))
            .handleSquareBrackets()
            .handleNumber(1, undefined, 'int')
            .handleVariable()
            .createProperty('grid-row-end')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'gridRowEnd', pluginOrder.gridRowEnd, 1, true);
    }
    // row start
    if (utility.raw.startsWith('row-start')) {
        return (_d = utility.handler
            .handleStatic(theme('gridRowStart'))
            .handleSquareBrackets()
            .handleNumber(1, undefined, 'int')
            .handleVariable()
            .createProperty('grid-row-start')) === null || _d === void 0 ? void 0 : _d.updateMeta('utilities', 'gridRowStart', pluginOrder.gridRowStart, 1, true);
    }
    return (_e = utility.handler
        .handleSquareBrackets()
        .createProperty(['-ms-grid-row-span', 'grid-row'], function (value) { return "span ".concat(value, " / span ").concat(value); })) === null || _e === void 0 ? void 0 : _e.updateMeta('utilities', 'gridRow', pluginOrder.gridRow, 2, true);
}
// https://windicss.org/utilities/grid.html#grid-auto-columns
// https://windicss.org/utilities/grid.html#grid-auto-rows
function gridAuto(utility, _a) {
    var theme = _a.theme;
    var type = utility.raw.startsWith('auto-cols') ? 'columns' : utility.raw.startsWith('auto-rows') ? 'rows' : undefined;
    if (!type)
        return;
    var group = type === 'columns' ? 'gridAutoColumns' : 'gridAutoRows';
    var value = utility.handler.handleStatic(theme(group)).value;
    if (value) {
        var prefixer = minMaxContent(value);
        if (typeof prefixer === 'string')
            return new Property("grid-auto-".concat(type), prefixer).updateMeta('utilities', group, pluginOrder[group], 1, true);
        return new Style(utility.class, prefixer.map(function (i) { return new Property("grid-auto-".concat(type), i); })).updateMeta('utilities', group, pluginOrder[group], 2, true);
    }
}
// https://windicss.org/utilities/grid.html#gap
function gap(utility, _a) {
    var theme = _a.theme, config = _a.config;
    return utility.handler
        .handleStatic(theme('gap'))
        .handleSquareBrackets()
        .handleSpacing()
        .handleSize()
        .handleVariable()
        .callback(function (value) {
        if (utility.raw.match(/^gap-x-/))
            return new Property(config('prefixer') ? ['-webkit-column-gap', '-moz-column-gap', 'grid-column-gap', 'column-gap'] : 'column-gap', value).updateMeta('utilities', 'gap', pluginOrder.gap, 2, true);
        if (utility.raw.match(/^gap-y-/))
            return new Property(config('prefixer') ? ['-webkit-row-gap', '-moz-row-gap', 'grid-row-gap', 'row-gap'] : 'row-gap', value).updateMeta('utilities', 'gap', pluginOrder.gap, 3, true);
        return new Property(config('prefixer') ? ['grid-gap', 'gap'] : 'gap', value).updateMeta('utilities', 'gap', pluginOrder.gap, 1, true);
    });
}
// https://windicss.org/utilities/columns.html
function columns(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('columns'))
        .handleSquareBrackets()
        .handleSize()
        .handleNxl(function (number) { return "".concat((number - 3) * 8 + 48, "rem"); })
        .handleVariable()
        .createProperty('columns')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'columns', pluginOrder.columns, 1, true);
}
// https://windicss.org/utilities/spacing.html#padding
function padding(utility, _a) {
    var theme = _a.theme;
    return utility.handler
        .handleStatic(theme('padding'))
        .handleSquareBrackets()
        .handleSpacing()
        .handleFraction()
        .handleSize()
        .handleVariable()
        .callback(function (value) {
        var directions = expandDirection(utility.identifier.substring(1), false);
        if (directions) {
            if (directions[0] === '*')
                return new Property('padding', value).updateMeta('utilities', 'padding', pluginOrder.padding, -4, true);
            return new Property(directions.map(function (i) { return "padding-".concat(i); }), value).updateMeta('utilities', 'padding', pluginOrder.padding, -directions.length, true);
        }
    });
}
// https://windicss.org/utilities/spacing.html#margin
function margin(utility, _a) {
    var theme = _a.theme;
    return utility.handler
        .handleStatic(theme('margin'))
        .handleSquareBrackets()
        .handleSpacing()
        .handleFraction()
        .handleSize()
        .handleNegative()
        .handleVariable()
        .callback(function (value) {
        var directions = expandDirection(utility.identifier.substring(1), false);
        if (directions) {
            if (directions[0] === '*')
                return new Property('margin', value).updateMeta('utilities', 'margin', pluginOrder.margin, -4, true);
            return new Property(directions.map(function (i) { return "margin-".concat(i); }), value).updateMeta('utilities', 'margin', pluginOrder.margin, -directions.length, true);
        }
    });
}
// https://windicss.org/utilities/spacing.html#space-between-y
function space(utility, _a) {
    var theme = _a.theme;
    if (utility.raw === 'space-x-reverse') {
        return new Style(utility.class, [
            new Property('--tw-space-x-reverse', '1'),
        ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'space', pluginOrder.space, 6, true);
    }
    if (utility.raw === 'space-y-reverse') {
        return new Style(utility.class, [
            new Property('--tw-space-y-reverse', '1'),
        ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'space', pluginOrder.space, 5, true);
    }
    return utility.handler
        .handleStatic(theme('space'))
        .handleSquareBrackets()
        .handleSpacing()
        .handleSize()
        .handleNegative()
        .handleVariable()
        .callback(function (value) {
        if (utility.raw.match(/^-?space-x-/)) {
            return new Style(utility.class, [
                new Property('--tw-space-x-reverse', '0'),
                new Property('margin-right', "calc(".concat(value, " * var(--tw-space-x-reverse))")),
                new Property('margin-left', "calc(".concat(value, " * calc(1 - var(--tw-space-x-reverse)))")),
            ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'space', pluginOrder.space, (utility.raw.charAt(0) === '-' ? 4 : 2), true);
        }
        if (utility.raw.match(/^-?space-y-/)) {
            return new Style(utility.class, [
                new Property('--tw-space-y-reverse', '0'),
                new Property('margin-top', "calc(".concat(value, " * calc(1 - var(--tw-space-y-reverse)))")),
                new Property('margin-bottom', "calc(".concat(value, " * var(--tw-space-y-reverse))")),
            ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'space', pluginOrder.space, (utility.raw.charAt(0) === '-' ? 3 : 1), true);
        }
    });
}
// https://windicss.org/utilities/sizing.html#width
// https://windicss.org/utilities/sizing.html#height
function size(utility, _a) {
    var _b;
    var theme = _a.theme;
    var name = utility.identifier === 'w' ? 'width' : 'height';
    var body = utility.body;
    var sizes = toType(theme(name), 'object');
    // handle static
    if (Object.keys(sizes).includes(body)) {
        var value = sizes[body];
        if (value === 'min-content') {
            return new Style(utility.class, [
                new Property(name, '-webkit-min-content'),
                new Property(name, '-moz-min-content'),
                new Property(name, 'min-content'),
            ]).updateMeta('utilities', name, pluginOrder[name], 2, true);
        }
        if (value === 'max-content') {
            return new Style(utility.class, [
                new Property(name, '-webkit-max-content'),
                new Property(name, '-moz-max-content'),
                new Property(name, 'max-content'),
            ]).updateMeta('utilities', name, pluginOrder[name], 3, true);
        }
        return new Style(utility.class, new Property(name, value)).updateMeta('utilities', name, pluginOrder[name], 1, true);
    }
    return (_b = utility.handler
        .handleSquareBrackets()
        .handleSpacing()
        .handleFraction()
        .handleSize()
        .handleNxl(function (number) { return "".concat((number - 3) * 8 + 48, "rem"); })
        .handleVariable()
        .createProperty(name)) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', name, pluginOrder[name], 4, true);
}
// https://windicss.org/utilities/sizing.html#min-width
// https://windicss.org/utilities/sizing.html#min-height
// https://windicss.org/utilities/sizing.html#max-width
// https://windicss.org/utilities/sizing.html#max-height
function minMaxSize(utility, _a) {
    var _b;
    var theme = _a.theme;
    if (!utility.raw.match(/^(min|max)-[w|h]-/))
        return;
    var body = utility.raw.replace(/^(min|max)-[w|h]-/, '');
    var prop = utility.raw.substring(0, 5).replace('h', 'height').replace('w', 'width');
    var group = dashToCamel(prop);
    var sizes = toType(theme(group), 'object');
    // handle static
    if (Object.keys(sizes).includes(body)) {
        var value = sizes[body];
        if (value === 'min-content') {
            return new Style(utility.class, [
                new Property(prop, '-webkit-min-content'),
                new Property(prop, '-moz-min-content'),
                new Property(prop, 'min-content'),
            ]).updateMeta('utilities', group, pluginOrder[group], 2, true);
        }
        if (value === 'max-content') {
            return new Style(utility.class, [
                new Property(prop, '-webkit-max-content'),
                new Property(prop, '-moz-max-content'),
                new Property(prop, 'max-content'),
            ]).updateMeta('utilities', group, pluginOrder[group], 3, true);
        }
        return new Style(utility.class, new Property(prop, value)).updateMeta('utilities', group, pluginOrder[group], 1, true);
    }
    return (_b = utility.handler
        .handleSquareBrackets()
        .handleSpacing()
        .handleFraction()
        .handleSize()
        .handleNxl(function (number) { return "".concat((number - 3) * 8 + 48, "rem"); })
        .handleVariable()
        .createProperty(prop)) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', group, pluginOrder[group], 4, true);
}
// https://windicss.org/utilities/typography.html#text-opacity
// https://windicss.org/utilities/typography.html#text-shadow
// https://windicss.org/utilities/typography.html#text-stroke
// https://windicss.org/utilities/typography.html#text-color
// https://windicss.org/utilities/typography.html#font-size
function text(utility, _a) {
    var _b, _c, _d, _e, _f, _g;
    var theme = _a.theme;
    // handle font opacity
    if (utility.raw.startsWith('text-opacity')) {
        return (_b = utility.handler
            .handleStatic(theme('textOpacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-text-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'textOpacity', pluginOrder.textOpacity, 1, true);
    }
    if (utility.raw.startsWith('text-shadow')) {
        return (_c = (utility.raw === 'text-shadow'
            ? new Property('text-shadow', theme('textShadow.DEFAULT', '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)'))
            : utility.handler
                .handleStatic(theme('textShadow'))
                .createProperty('text-shadow'))) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'textShadow', pluginOrder.textShadow, 1, true);
    }
    if (utility.raw.startsWith('text-stroke')) {
        if (utility.raw === 'text-stroke')
            return new Style('text-stroke', [
                new Property('-webkit-text-stroke-color', theme('textStrokeColor.DEFAULT', '#e4e4e7')),
                new Property('-webkit-text-stroke-width', theme('textStrokeWidth.DEFAULT', 'medium')),
            ]).updateMeta('utilities', 'textStrokeColor', pluginOrder.textStrokeColor, 1, true);
        if (utility.raw.startsWith('text-stroke-opacity')) {
            return (_d = utility.handler
                .handleStatic(theme('opacity'))
                .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
                .handleVariable()
                .createProperty('--tw-ring-offset-opacity')) === null || _d === void 0 ? void 0 : _d.updateMeta('utilities', 'textStrokeColor', pluginOrder.textStrokeColor, 3, true);
        }
        return ((_e = utility.clone('textStroke' + utility.raw.slice(11)).handler
            .handleColor(theme('textStrokeColor'))
            .handleOpacity(theme('opacity'))
            .handleVariable()
            .createColorStyle(utility.class, '-webkit-text-stroke-color', '--tw-text-stroke-opacity')) === null || _e === void 0 ? void 0 : _e.updateMeta('utilities', 'textStrokeColor', pluginOrder.textStrokeColor, 2, true))
            || ((_f = utility.handler
                .handleStatic(theme('textStrokeWidth'))
                .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "px"); })
                .handleSize()
                .createProperty('-webkit-text-stroke-width')) === null || _f === void 0 ? void 0 : _f.updateMeta('utilities', 'textStrokeWidth', pluginOrder.textStrokeWidth, 1, true));
    }
    // handle text colors
    var textColor = (_g = utility.handler
        .handleColor(theme('textColor'))
        .handleOpacity(theme('textOpacity'))
        .handleSquareBrackets(notNumberLead)
        .handleVariable()
        .createColorStyle(utility.class, 'color', '--tw-text-opacity')) === null || _g === void 0 ? void 0 : _g.updateMeta('utilities', 'textColor', pluginOrder.textColor, 0, true);
    if (textColor)
        return textColor;
    // handle font sizes
    var amount = utility.amount;
    var fontSizes = toType(theme('fontSize'), 'object');
    if (Object.keys(fontSizes).includes(amount))
        return new Style(utility.class, generateFontSize(fontSizes[amount])).updateMeta('utilities', 'fontSize', pluginOrder.fontSize, 1, true);
    var value = utility.handler
        .handleSquareBrackets(isNumberLead)
        .handleNxl(function (number) { return "".concat(number, "rem"); })
        .handleSize()
        .value;
    if (utility.raw.startsWith('text-size-$'))
        value = utility.handler.handleVariable().value;
    if (value)
        return new Style(utility.class, [new Property('font-size', value), new Property('line-height', '1')]).updateMeta('utilities', 'fontSize', pluginOrder.fontSize, 2, true);
}
// https://windicss.org/utilities/typography.html#font-family
// https://windicss.org/utilities/typography.html#font-weight
function font(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    var fonts = theme('fontFamily');
    var map = {};
    for (var _i = 0, _d = Object.entries(fonts); _i < _d.length; _i++) {
        var _e = _d[_i], key = _e[0], value = _e[1];
        map[key] = Array.isArray(value) ? value.join(',') : value;
    }
    return (((_b = utility.handler
        .handleStatic(map)
        .createProperty('font-family')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'fontFamily', pluginOrder.fontFamily, 1, true))
        || ((_c = utility.handler
            .handleStatic(theme('fontWeight'))
            .handleNumber(0, 900, 'int')
            .handleVariable()
            .createProperty('font-weight')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'fontWeight', pluginOrder.fontWeight, 1, true)));
}
// https://windicss.org/utilities/typography.html#letter-spacing
function letterSpacing(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('letterSpacing'))
        .handleSquareBrackets()
        .handleSize()
        .handleNegative()
        .handleVariable()
        .createProperty('letter-spacing')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'letterSpacing', pluginOrder.letterSpacing, 1, true);
}
// https://windicss.org/utilities/typography.html#text-decoration
function textDecoration(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    return (
    // .decoration-{color}/{opacity}
    ((_b = utility.handler
        .handleColor(theme('textDecorationColor'))
        .handleOpacity(theme('textDecorationOpacity'))
        .handleSquareBrackets(notNumberLead)
        .handleVariable()
        .createColorStyle(utility.class, ['-webkit-text-decoration-color', 'text-decoration-color'], '--tw-text-decoration-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'textDecorationColor', pluginOrder.textDecorationColor, 1, true))
        // .decoration-{thickness}
        || ((_c = utility.handler
            .handleStatic(theme('textDecorationThickness'))
            .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "px"); })
            .handleSize()
            .createProperty('text-decoration-thickness')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'textDecorationThickness', pluginOrder.textDecorationThickness, 1, true)));
}
// https://windicss.org/utilities/typography.html#text-decoration
function textUnderline(utility, _a) {
    var _b, _c, _d, _e;
    var theme = _a.theme;
    // .underline-offset-{offset}
    if (utility.raw.startsWith('underline-offset')) {
        return (_b = utility.handler
            .handleStatic(theme('textDecorationOffset'))
            .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "px"); })
            .handleSize()
            .createProperty('text-underline-offset')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'textDecorationOffset', pluginOrder.textDecorationOffset, 1, true);
    }
    // .underline-opacity-{opacity} - This is a fallback for .decoration-{color}/{opacity}
    if (utility.raw.startsWith('underline-opacity')) {
        return (_c = utility.handler
            .handleStatic(theme('textDecorationOpacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-line-opacity')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'textDecorationOpacity', pluginOrder.textDecorationOpacity, 1, true);
    }
    // .underline-{color} - This is a fallback for .decoration-{color} to avoid breaking changes
    // .underline-{thickness} - This is a fallback for .decoration-{thickness} to avoid breaking changes
    return ((_d = utility.handler
        .handleColor(theme('textDecorationColor'))
        .handleOpacity(theme('opacity'))
        .handleVariable()
        .createColorStyle(utility.class, ['-webkit-text-decoration-color', 'text-decoration-color'], '--tw-line-opacity')) === null || _d === void 0 ? void 0 : _d.updateMeta('utilities', 'textDecorationColor', pluginOrder.textDecorationColor, 0, true))
        || ((_e = utility.handler
            .handleStatic(theme('textDecorationLength'))
            .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "px"); })
            .handleSize()
            .createProperty('text-decoration-thickness')) === null || _e === void 0 ? void 0 : _e.updateMeta('utilities', 'textDecorationLength', pluginOrder.textDecorationLength, 1, true));
}
// https://windicss.org/utilities/typography.html#line-height
function lineHeight(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('lineHeight'))
        .handleNumber(0, undefined, 'int', function (number) { return "".concat(number * 0.25, "rem"); })
        .handleSquareBrackets()
        .handleSize()
        .handleVariable()
        .createProperty('line-height')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'lineHeight', pluginOrder.lineHeight, 1, true);
}
// https://windicss.org/utilities/behaviors.html#list-style-type
function listStyleType(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleBody(theme('listStyleType'))
        .createProperty('list-style-type')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'listStyleType', pluginOrder.listStyleType, 1, true);
}
// https://windicss.org/utilities/behaviors.html#placeholder-color
// https://windicss.org/utilities/behaviors.html#placeholder-opacity
function placeholder(utility, _a) {
    var theme = _a.theme, config = _a.config;
    // handle placeholder opacity
    if (utility.raw.startsWith('placeholder-opacity')) {
        return utility.handler
            .handleStatic(theme('placeholderOpacity'))
            .handleSquareBrackets()
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .callback(function (value) { return generatePlaceholder(utility.class, new Property('--tw-placeholder-opacity', value), config('prefixer'))
            .map(function (style) { return style.updateMeta('utilities', 'placeholderOpacity', pluginOrder.placeholderOpacity, 1, true); }); });
    }
    var color = utility.handler
        .handleColor(theme('placeholderColor'))
        .handleOpacity(theme('placeholderOpacity'))
        .handleSquareBrackets()
        .handleVariable()
        .createColorStyle(utility.class, 'color', '--tw-placeholder-opacity');
    if (color)
        return generatePlaceholder(color.selector || '', color.property, config('prefixer')).map(function (i) { return i.updateMeta('utilities', 'placeholderColor', pluginOrder.placeholderColor, 2, true); });
}
// https://windicss.org/utilities/behaviors.html#caret-color
// https://windicss.org/utilities/behaviors.html#caret-opacity
function caret(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    // handle caret opacity
    if (utility.raw.startsWith('caret-opacity')) {
        return (_b = utility.handler
            .handleStatic(theme('caretOpacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-caret-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'caretOpacity', pluginOrder.caretOpacity, 1, true);
    }
    return (_c = utility.handler
        .handleColor(theme('caretColor'))
        .handleOpacity(theme('caretOpacity'))
        .handleVariable()
        .createColorStyle(utility.class, 'caret-color', '--tw-caret-opacity')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'caretColor', pluginOrder.caretColor, 0, true);
}
// https://windicss.org/utilities/typography.html#tab-size
function tabSize(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('tabSize'))
        .handleNumber(0, undefined, 'int')
        .handleSize()
        .createProperty(['-moz-tab-size', '-o-tab-size', 'tab-size'])) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'tabSize', pluginOrder.tabSize, 1, true);
}
// https://windicss.org/utilities/typography.html#text-indent
function textIndent(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('textIndent'))
        .handleSize()
        .handleFraction()
        .handleNegative()
        .createProperty('text-indent')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'textIndent', pluginOrder.textIndent, 1, true);
}
// https://windicss.org/utilities/backgrounds.html#background-color
// https://windicss.org/utilities/backgrounds.html#background-opacity
// https://windicss.org/utilities/backgrounds.html#background-position
// https://windicss.org/utilities/backgrounds.html#background-size
// https://windicss.org/utilities/backgrounds.html#background-image
function background(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    var body = utility.body;
    // handle background positions
    var positions = toType(theme('backgroundPosition'), 'object');
    if (Object.keys(positions).includes(body))
        return new Property('background-position', positions[body]).updateMeta('utilities', 'backgroundPosition', pluginOrder.backgroundPosition, 1, true);
    // handle background sizes
    var sizes = toType(theme('backgroundSize'), 'object');
    if (Object.keys(sizes).includes(body))
        return new Property('background-size', sizes[body]).updateMeta('utilities', 'backgroundSize', pluginOrder.backgroundSize, 1, true);
    // handle background image
    var images = toType(theme('backgroundImage'), 'object');
    if (Object.keys(images).includes(body)) {
        var prefixer = linearGradient(images[body]);
        if (Array.isArray(prefixer))
            return new Style(utility.class, prefixer.map(function (i) { return new Property('background-image', i); })).updateMeta('utilities', 'backgroundImage', pluginOrder.backgroundImage, 2, true);
        return new Property('background-image', prefixer).updateMeta('utilities', 'backgroundImage', pluginOrder.backgroundImage, 1, true);
    }
    // handle background opacity
    if (utility.raw.startsWith('bg-opacity'))
        return (_b = utility.handler
            .handleStatic(theme('backgroundOpacity'))
            .handleSquareBrackets()
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-bg-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'backgroundOpacity', pluginOrder.backgroundOpacity, 1, true);
    // handle background color
    return (_c = utility.handler
        .handleColor(theme('backgroundColor'))
        .handleOpacity(theme('backgroundOpacity'))
        .handleSquareBrackets(notNumberLead)
        .handleVariable()
        .createColorStyle(utility.class, 'background-color', '--tw-bg-opacity')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'backgroundColor', pluginOrder.backgroundColor, 0, true);
}
// https://windicss.org/utilities/backgrounds.html#gradient-from
function gradientColorFrom(utility, _a) {
    var _b;
    var theme = _a.theme;
    if (utility.raw.startsWith('from-opacity')) {
        return (_b = utility.handler
            .handleStatic(theme('opacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-from-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 2, true);
    }
    var handler = utility.handler.handleColor(theme('gradientColorStops')).handleOpacity(theme('opacity')).handleVariable().handleSquareBrackets();
    if (handler.color || handler.value) {
        return new Style(utility.class, [
            new Property('--tw-gradient-from', handler.createColorValue('var(--tw-from-opacity, 1)')),
            new Property('--tw-gradient-stops', 'var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0))'),
        ]).updateMeta('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 1, true);
    }
}
// https://windicss.org/utilities/backgrounds.html#gradient-via
function gradientColorVia(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    if (utility.raw.startsWith('via-opacity')) {
        return (_b = utility.handler
            .handleStatic(theme('opacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-via-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 4, true);
    }
    var handler = utility.handler.handleColor(theme('gradientColorStops')).handleOpacity(theme('opacity')).handleVariable().handleSquareBrackets();
    if (handler.color || handler.value) {
        return (_c = new Style(utility.class, new Property('--tw-gradient-stops', "var(--tw-gradient-from), ".concat(handler.createColorValue('var(--tw-via-opacity, 1)'), ", var(--tw-gradient-to, rgba(255, 255, 255, 0))")))) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 3, true);
    }
}
// https://windicss.org/utilities/backgrounds.html#gradient-to
function gradientColorTo(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    if (utility.raw.startsWith('to-opacity')) {
        return (_b = utility.handler
            .handleStatic(theme('opacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-to-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 6, true);
    }
    var handler = utility.handler.handleColor(theme('gradientColorStops')).handleOpacity(theme('opacity')).handleVariable().handleSquareBrackets();
    if (handler.color || handler.value) {
        return (_c = new Style(utility.class, new Property('--tw-gradient-to', handler.createColorValue('var(--tw-to-opacity, 1)')))) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'gradientColorStops', pluginOrder.gradientColorStops, 5, true);
    }
}
// https://windicss.org/utilities/borders.html#border-radius
function borderRadius(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    var raw = ['rounded', 'rounded-t', 'rounded-l', 'rounded-r', 'rounded-b', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'].includes(utility.raw) ? utility.raw + '-DEFAULT' : utility.raw;
    utility = utility.clone(raw);
    var directions = expandDirection(((_b = raw.match(/rounded-[trbl][trbl]?-/)) === null || _b === void 0 ? void 0 : _b[0].slice(8, -1)) || '', true);
    if (!directions)
        return;
    return (_c = utility.handler
        .handleStatic(theme('borderRadius'))
        .handleSquareBrackets()
        .handleFraction()
        .handleNxl(function (number) { return "".concat(number * 0.5, "rem"); })
        .handleSize()
        .handleVariable()
        .createProperty(directions[0] === '*' ? 'border-radius' : directions.map(function (i) { return "border-".concat(i, "-radius"); }))) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'borderRadius', pluginOrder.borderRadius, -(directions[0] === '*' ? 3 : directions.length), true);
}
// https://windicss.org/utilities/borders.html#border-width
// https://windicss.org/utilities/borders.html#border-color
// https://windicss.org/utilities/borders.html#border-opacity
function border(utility, _a) {
    var _b, _c, _d, _e, _f, _g;
    var theme = _a.theme;
    // handle border opacity
    if (utility.raw.startsWith('border-opacity')) {
        return (_b = utility.handler
            .handleStatic(theme('borderOpacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-border-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'borderOpacity', pluginOrder.borderOpacity, 1, true);
    }
    // handle border color
    var borderColor = (_c = utility.handler
        .handleColor(theme('borderColor'))
        .handleOpacity(theme('borderOpacity'))
        .handleSquareBrackets(notNumberLead)
        .handleVariable(function (variable) { return utility.raw.startsWith('border-$') ? "var(--".concat(variable, ")") : undefined; })
        .createColorStyle(utility.class, 'border-color', '--tw-border-opacity')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'borderColor', pluginOrder.borderColor, 2, true);
    if (borderColor)
        return borderColor;
    // handle border width
    var directions = (_d = expandDirection(utility.raw.substring(7, 8), false)) !== null && _d !== void 0 ? _d : ['*'];
    var borders = toType(theme('borderWidth'), 'object');
    var raw = ['border', 'border-t', 'border-r', 'border-b', 'border-l', 'border-x', 'border-y'].includes(utility.raw) ? "".concat(utility.raw, "-").concat((_e = borders.DEFAULT) !== null && _e !== void 0 ? _e : '1px') : utility.raw;
    // handle border side color
    var borderSide = utility.clone(raw.slice(7)).handler
        .handleColor(theme('borderColor'))
        .handleOpacity(theme('borderOpacity'));
    if (borderSide.value || borderSide.color) {
        if (borderSide.opacity) {
            return new Property("border-".concat(directions[0], "-color"), borderSide.createColorValue(borderSide.opacity)).updateMeta('utilities', 'borderColor', pluginOrder.borderColor, 4, true);
        }
        return (_f = borderSide.createColorStyle(utility.class, "border-".concat(directions[0], "-color"), '--tw-border-opacity')) === null || _f === void 0 ? void 0 : _f.updateMeta('utilities', 'borderColor', pluginOrder.borderColor, 3, true);
    }
    utility = utility.clone(raw);
    return (_g = utility.handler
        .handleStatic(borders)
        .handleSquareBrackets()
        .handleNumber(0, undefined, 'int', function (number) { return /^border(-[tlbrxy])?$/.test(utility.key) ? "".concat(number, "px") : undefined; })
        .handleSize()
        .handleVariable()
        .createProperty(directions[0] === '*' ? 'border-width' : directions.map(function (i) { return "border-".concat(i, "-width"); }))) === null || _g === void 0 ? void 0 : _g.updateMeta('utilities', 'borderWidth', pluginOrder.borderWidth, (directions[0] === '*' ? 1 : (directions.length + 1)), true);
}
// https://windicss.org/utilities/borders.html#divide-width
// https://windicss.org/utilities/borders.html#divide-color
// https://windicss.org/utilities/borders.html#divide-opacity
// https://windicss.org/utilities/borders.html#divide-style
function divide(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    // handle divide style
    if (['solid', 'dashed', 'dotted', 'double', 'none'].includes(utility.amount))
        return new Property('border-style', utility.amount).toStyle(utility.class).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideStyle', pluginOrder.divideStyle, 1, true);
    // handle divide opacity
    if (utility.raw.startsWith('divide-opacity'))
        return (_b = utility.handler
            .handleStatic(theme('divideOpacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-divide-opacity')) === null || _b === void 0 ? void 0 : _b.toStyle(utility.class).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideOpacity', pluginOrder.divideOpacity, 1, true);
    // handle divide color
    var divideColor = (_c = utility.handler
        .handleColor(theme('divideColor'))
        .handleOpacity(theme('divideOpacity'))
        .handleVariable(function (variable) { return utility.raw.startsWith('divide-$') ? "var(--".concat(variable, ")") : undefined; })
        .createColorStyle(utility.class, 'border-color', '--tw-divide-opacity')) === null || _c === void 0 ? void 0 : _c.child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideColor', pluginOrder.divideColor, 0, true);
    if (divideColor)
        return divideColor;
    // handle divide width
    switch (utility.raw) {
        case 'divide-x-reverse':
            return new Style(utility.class, new Property('--tw-divide-x-reverse', '1')).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 6, true);
        case 'divide-y-reverse':
            return new Style(utility.class, new Property('--tw-divide-y-reverse', '1')).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 5, true);
        case 'divide-y':
            return new Style(utility.class, [
                new Property('--tw-divide-y-reverse', '0'),
                new Property('border-top-width', 'calc(1px * calc(1 - var(--tw-divide-y-reverse)))'),
                new Property('border-bottom-width', 'calc(1px * var(--tw-divide-y-reverse))'),
            ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 3, true);
        case 'divide-x':
            return new Style(utility.class, [
                new Property('--tw-divide-x-reverse', '0'),
                new Property('border-right-width', 'calc(1px * var(--tw-divide-x-reverse))'),
                new Property('border-left-width', 'calc(1px * calc(1 - var(--tw-divide-x-reverse)))'),
            ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 4, true);
    }
    return utility.handler
        .handleSquareBrackets()
        .handleNumber(0, undefined, 'float', function (number) { return "".concat(number, "px"); })
        .handleSize()
        .handleVariable()
        .callback(function (value) {
        var centerMatch = utility.raw.match(/^-?divide-[x|y]/);
        if (centerMatch) {
            var center = centerMatch[0].replace(/^-?divide-/, '');
            switch (center) {
                case 'x':
                    return new Style(utility.class, [
                        new Property('--tw-divide-x-reverse', '0'),
                        new Property('border-right-width', "calc(".concat(value, " * var(--tw-divide-x-reverse))")),
                        new Property('border-left-width', "calc(".concat(value, " * calc(1 - var(--tw-divide-x-reverse)))")),
                    ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 2, true);
                case 'y':
                    return new Style(utility.class, [
                        new Property('--tw-divide-y-reverse', '0'),
                        new Property('border-top-width', "calc(".concat(value, " * calc(1 - var(--tw-divide-y-reverse)))")),
                        new Property('border-bottom-width', "calc(".concat(value, " * var(--tw-divide-y-reverse))")),
                    ]).child('> :not([hidden]) ~ :not([hidden])').updateMeta('utilities', 'divideWidth', pluginOrder.divideWidth, 1, true);
            }
        }
    });
}
// https://windicss.org/utilities/borders.html#ring-offset-width
// https://windicss.org/utilities/borders.html#ring-offset-color
function ringOffset(utility, _a) {
    var _b, _c, _d;
    var theme = _a.theme;
    var value;
    // handle ring offset width variable
    if (utility.raw.startsWith('ringOffset-width-$')) {
        value = utility.handler.handleVariable().value;
        if (value)
            return new Property('--tw-ring-offset-width', value).toStyle(utility.class.replace('ringOffset', 'ring-offset')).updateMeta('utilities', 'ringOffsetWidth', pluginOrder.ringOffsetWidth, 2, true);
    }
    if (utility.raw.startsWith('ringOffset-opacity')) {
        return (_b = utility.handler
            .handleStatic(theme('opacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-ring-offset-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'ringOffsetColor', pluginOrder.ringOffsetColor, 2, true);
    }
    // handle ring offset color || ring offset width
    return ((_c = utility.handler
        .handleColor(theme('ringOffsetColor'))
        .handleOpacity('ringOpacity')
        .handleVariable()
        .handleSquareBrackets()
        .createColorStyle(utility.class.replace('ringOffset', 'ring-offset'), '--tw-ring-offset-color', '--tw-ring-offset-opacity')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'ringOffsetColor', pluginOrder.ringOffsetColor, 1, true))
        || ((_d = utility.handler
            .handleStatic(theme('ringOffsetWidth'))
            .handleSquareBrackets(isNumberLead)
            .handleNumber(0, undefined, 'float', function (number) { return "".concat(number, "px"); })
            .handleSize()
            .createStyle(utility.class.replace('ringOffset', 'ring-offset'), function (value) { return new Property('--tw-ring-offset-width', value); })) === null || _d === void 0 ? void 0 : _d.updateMeta('utilities', 'ringOffsetWidth', pluginOrder.ringOffsetWidth, 1, true));
}
// https://windicss.org/utilities/borders.html#ring-width
// https://windicss.org/utilities/borders.html#ring-color
// https://windicss.org/utilities/borders.html#ring-opacity
function ring(utility, utils) {
    var _a, _b, _c;
    // handle ring offset
    if (utility.raw.startsWith('ring-offset'))
        return ringOffset(utility.clone(utility.raw.replace('ring-offset', 'ringOffset')), utils);
    // handle ring opacity
    if (utility.raw.startsWith('ring-opacity'))
        return (_a = utility.handler
            .handleStatic(utils.theme('ringOpacity'))
            .handleSquareBrackets()
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-ring-opacity')) === null || _a === void 0 ? void 0 : _a.updateMeta('utilities', 'ringOpacity', pluginOrder.ringOpacity, 1, true);
    // handle ring color
    var ringColor = (_b = utility.handler
        .handleColor(utils.theme('ringColor'))
        .handleOpacity(utils.theme('ringOpacity'))
        .handleSquareBrackets(notNumberLead)
        .handleVariable(function (variable) { return utility.raw.startsWith('ring-$') ? "var(--".concat(variable, ")") : undefined; })
        .createColorStyle(utility.class, '--tw-ring-color', '--tw-ring-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'ringColor', pluginOrder.ringColor, 0, true);
    if (ringColor)
        return ringColor;
    // handle ring width
    if (utility.raw === 'ring-inset')
        return new Property('--tw-ring-inset', 'inset').updateMeta('utilities', 'ringWidth', pluginOrder.ringWidth, 3, true);
    var value = utility.raw === 'ring'
        ? ((_c = toType(utils.theme('ringWidth.DEFAULT'), 'string')) !== null && _c !== void 0 ? _c : '3px')
        : utility.handler
            .handleStatic(utils.theme('ringWidth'))
            .handleSquareBrackets()
            .handleNumber(0, undefined, 'float', function (number) { return "".concat(number, "px"); })
            .handleSize()
            .handleVariable()
            .value;
    if (!value)
        return;
    return new Style(utility.class, [
        new Property('--tw-ring-offset-shadow', 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)'),
        new Property('--tw-ring-shadow', "var(--tw-ring-inset) 0 0 0 calc(".concat(value, " + var(--tw-ring-offset-width)) var(--tw-ring-color)")),
        new Property(['-webkit-box-shadow', 'box-shadow'], 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)'),
    ]).updateMeta('utilities', 'ringWidth', pluginOrder.ringWidth, (utility.raw === 'ring' ? 1 : 2), true);
}
// https://windicss.org/utilities/filters.html#filter-blur
function blur(utility, _a) {
    var _b;
    var theme = _a.theme;
    if (utility.raw === 'blur')
        utility.raw = 'blur-DEFAULT';
    return (_b = utility.handler
        .handleBody(theme('blur'))
        .handleSquareBrackets()
        .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "px"); })
        .handleSize()
        .createProperty('--tw-blur', function (value) { return "blur(".concat(value, ")"); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'blur', pluginOrder.blur, 1, true);
}
// https://windicss.org/utilities/filters.html#filter-brightness
function brightness(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleBody(theme('brightness'))
        .handleSquareBrackets()
        .handleNumber(0, undefined, 'int', function (number) { return "".concat(number / 100); })
        .createProperty('--tw-brightness', function (value) { return "brightness(".concat(value, ")"); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'brightness', pluginOrder.brightness, 1, true);
}
// https://windicss.org/utilities/filters.html#filter-contrast
function contrast(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleBody(theme('contrast'))
        .handleSquareBrackets()
        .handleNumber(0, undefined, 'int', function (number) { return "".concat(number / 100); })
        .createProperty('--tw-contrast', function (value) { return "contrast(".concat(value, ")"); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'contrast', pluginOrder.contrast, 1, true);
}
// https://windicss.org/utilities/filters.html#filter-drop-shadow
function dropShadow(utility, _a) {
    var theme = _a.theme;
    var value;
    if (utility.raw === 'drop-shadow') {
        value = theme('dropShadow.DEFAULT', ['0 1px 2px rgba(0, 0, 0, 0.1)', '0 1px 1px rgba(0, 0, 0, 0.06)']);
    }
    else {
        var dropShadows = theme('dropShadow');
        var amount = utility.amount;
        if (utility.raw.startsWith('drop-shadow') && amount in dropShadows)
            value = dropShadows[amount];
    }
    if (value)
        return new Property('--tw-drop-shadow', Array.isArray(value) ? value.map(function (i) { return "drop-shadow(".concat(i, ")"); }).join(' ') : "drop-shadow(".concat(value, ")")).updateMeta('utilities', 'dropShadow', pluginOrder.dropShadow, 1, true);
}
// https://windicss.org/utilities/filters.html#filter-grayscale
function grayscale(utility, _a) {
    var _b;
    var theme = _a.theme;
    if (utility.raw === 'grayscale')
        utility.raw = 'grayscale-DEFAULT';
    return (_b = utility.handler
        .handleBody(theme('grayscale'))
        .handleSquareBrackets()
        .handleNumber(0, 100, 'int', function (number) { return "".concat(number / 100); })
        .createProperty('--tw-grayscale', function (value) { return "grayscale(".concat(value, ")"); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'grayscale', pluginOrder.grayscale, 1, true);
}
// https://windicss.org/utilities/filters.html#filter-hue-rotate
function hueRotate(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleBody(theme('hueRotate'))
        .handleSquareBrackets()
        .handleNumber(0, undefined, 'float', function (number) { return "".concat(number, "deg"); })
        .handleNegative()
        .createProperty('--tw-hue-rotate', function (value) { return "hue-rotate(".concat(value, ")"); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'hueRotate', pluginOrder.hueRotate, 1, true);
}
// https://windicss.org/utilities/filters.html#filter-invert
function invert(utility, _a) {
    var _b;
    var theme = _a.theme;
    if (utility.raw === 'invert')
        utility.raw = 'invert-DEFAULT';
    return (_b = utility.handler
        .handleBody(theme('invert'))
        .handleSquareBrackets()
        .handleNumber(0, 100, 'int', function (number) { return "".concat(number / 100); })
        .createProperty('--tw-invert', function (value) { return "invert(".concat(value, ")"); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'invert', pluginOrder.invert, 1, true);
}
// https://windicss.org/utilities/filters.html#filter-saturate
function saturate(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleBody(theme('saturate'))
        .handleSquareBrackets()
        .handleNumber(0, undefined, 'int', function (number) { return "".concat(number / 100); })
        .createProperty('--tw-saturate', function (value) { return "saturate(".concat(value, ")"); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'saturate', pluginOrder.saturate, 1, true);
}
// https://windicss.org/utilities/filters.html#filter-sepia
function sepia(utility, _a) {
    var _b;
    var theme = _a.theme;
    if (utility.raw === 'sepia')
        utility.raw = 'sepia-DEFAULT';
    return (_b = utility.handler
        .handleBody(theme('sepia'))
        .handleSquareBrackets()
        .handleNumber(0, 100, 'int', function (number) { return "".concat(number / 100); })
        .createProperty('--tw-sepia', function (value) { return "sepia(".concat(value, ")"); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'sepia', pluginOrder.sepia, 1, true);
}
// https://windicss.org/utilities/filters.html#backdrop-filter
// https://windicss.org/utilities/filters.html#backdrop-blur
// https://windicss.org/utilities/filters.html#backdrop-brightness
// https://windicss.org/utilities/filters.html#backdrop-contrast
// https://windicss.org/utilities/filters.html#backdrop-grayscale
// https://windicss.org/utilities/filters.html#backdrop-hue-rotate
// https://windicss.org/utilities/filters.html#backdrop-invert
// https://windicss.org/utilities/filters.html#backdrop-opacity
// https://windicss.org/utilities/filters.html#backdrop-saturate
// https://windicss.org/utilities/filters.html#backdrop-sepia
function backdrop(utility, _a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var theme = _a.theme;
    utility = utility.clone(utility.raw.slice(9));
    switch (utility.match(/[^-]+/)) {
        case 'blur':
            if (utility.raw === 'blur')
                utility.raw = 'blur-DEFAULT';
            return (_b = utility.handler
                .handleBody(theme('backdropBlur'))
                .handleSquareBrackets()
                .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "px"); })
                .handleSize()
                .createProperty('--tw-backdrop-blur', function (value) { return "blur(".concat(value, ")"); })) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'backdropBlur', pluginOrder.backdropBlur, 1, true);
        case 'brightness':
            return (_c = utility.handler
                .handleBody(theme('backdropBrightness'))
                .handleSquareBrackets()
                .handleNumber(0, undefined, 'int', function (number) { return "".concat(number / 100); })
                .createProperty('--tw-backdrop-brightness', function (value) { return "brightness(".concat(value, ")"); })) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'backdropBrightness', pluginOrder.backdropBrightness, 1, true);
        case 'contrast':
            return (_d = utility.handler
                .handleBody(theme('backdropContrast'))
                .handleSquareBrackets()
                .handleNumber(0, undefined, 'int', function (number) { return "".concat(number / 100); })
                .createProperty('--tw-backdrop-contrast', function (value) { return "contrast(".concat(value, ")"); })) === null || _d === void 0 ? void 0 : _d.updateMeta('utilities', 'backdropContrast', pluginOrder.backdropContrast, 1, true);
        case 'grayscale':
            if (utility.raw === 'grayscale')
                utility.raw = 'grayscale-DEFAULT';
            return (_e = utility.handler
                .handleBody(theme('backdropGrayscale'))
                .handleSquareBrackets()
                .handleNumber(0, 100, 'int', function (number) { return "".concat(number / 100); })
                .createProperty('--tw-backdrop-grayscale', function (value) { return "grayscale(".concat(value, ")"); })) === null || _e === void 0 ? void 0 : _e.updateMeta('utilities', 'backdropGrayscale', pluginOrder.backdropGrayscale, 1, true);
        case 'hue':
            return (_f = utility.handler
                .handleBody(theme('backdropHueRotate'))
                .handleSquareBrackets()
                .handleNumber(0, undefined, 'float', function (number) { return "".concat(number, "deg"); })
                .handleNegative()
                .createProperty('--tw-backdrop-hue-rotate', function (value) { return "hue-rotate(".concat(value, ")"); })) === null || _f === void 0 ? void 0 : _f.updateMeta('utilities', 'backdropHueRotate', pluginOrder.backdropHueRotate, 1, true);
        case 'invert':
            if (utility.raw === 'invert')
                utility.raw = 'invert-DEFAULT';
            return (_g = utility.handler
                .handleBody(theme('backdropInvert'))
                .handleSquareBrackets()
                .handleNumber(0, 100, 'int', function (number) { return "".concat(number / 100); })
                .createProperty('--tw-backdrop-invert', function (value) { return "invert(".concat(value, ")"); })) === null || _g === void 0 ? void 0 : _g.updateMeta('utilities', 'backdropInvert', pluginOrder.backdropInvert, 1, true);
        case 'opacity':
            return (_h = utility.handler
                .handleBody(theme('backdropOpacity'))
                .handleSquareBrackets()
                .handleNumber(0, 100, 'int', function (number) { return "".concat(number / 100); })
                .createProperty('--tw-backdrop-opacity', function (value) { return "opacity(".concat(value, ")"); })) === null || _h === void 0 ? void 0 : _h.updateMeta('utilities', 'backdropOpacity', pluginOrder.backdropOpacity, 1, true);
        case 'saturate':
            return (_j = utility.handler
                .handleBody(theme('backdropSaturate'))
                .handleSquareBrackets()
                .handleNumber(0, undefined, 'int', function (number) { return "".concat(number / 100); })
                .createProperty('--tw-backdrop-saturate', function (value) { return "saturate(".concat(value, ")"); })) === null || _j === void 0 ? void 0 : _j.updateMeta('utilities', 'backdropSaturate', pluginOrder.backdropSaturate, 1, true);
        case 'sepia':
            if (utility.raw === 'sepia')
                utility.raw = 'sepia-DEFAULT';
            return (_k = utility.handler
                .handleBody(theme('backdropSepia'))
                .handleSquareBrackets()
                .handleNumber(0, 100, 'int', function (number) { return "".concat(number / 100); })
                .createProperty('--tw-backdrop-sepia', function (value) { return "sepia(".concat(value, ")"); })) === null || _k === void 0 ? void 0 : _k.updateMeta('utilities', 'backdropSepia', pluginOrder.backdropSepia, 1, true);
    }
}
// https://windicss.org/utilities/effects.html#box-shadow
function boxShadow(utility, _a) {
    var theme = _a.theme;
    var body = utility.body || 'DEFAULT';
    var shadows = toType(theme('boxShadow'), 'object');
    if (Object.keys(shadows).includes(body)) {
        var coloredShadow = shadows[body].replace(/rgba?\([0-9.,/\s]*\)/g, 'var(--tw-shadow-color)');
        return new Style(utility.class, [
            new Property('--tw-shadow', shadows[body]),
            new Property('--tw-shadow-colored', coloredShadow),
            new Property('-webkit-box-shadow', 'var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)'),
            new Property('box-shadow', 'var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)'),
        ]).updateMeta('utilities', 'boxShadow', pluginOrder.boxShadow, 0, true);
    }
    var color = utility.handler
        .handleColor(theme('boxShadowColor'))
        .handleOpacity(theme('opacity'))
        .handleSquareBrackets()
        .handleVariable();
    return new Style(utility.class, [
        new Property('--tw-shadow-color', color.createColorValue(color.opacity || '1')),
        new Property('--tw-shadow', 'var(--tw-shadow-colored)'),
    ]).updateMeta('utilities', 'boxShadowColor', pluginOrder.boxShadowColor, 0, true);
}
// https://windicss.org/utilities/effects.html#opacity
function opacity(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('opacity'))
        .handleSquareBrackets()
        .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
        .handleVariable()
        .createProperty('opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'opacity', pluginOrder.opacity, 0, true);
}
// https://windicss.org/utilities/transitions.html#transition-property
function transition(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    var body = utility.body;
    var props = toType(theme('transitionProperty'), 'object');
    for (var _i = 0, _d = Object.entries(props); _i < _d.length; _i++) {
        var _e = _d[_i], key = _e[0], value = _e[1];
        if (body === key || (body === '' && key === 'DEFAULT')) {
            if (value === 'none')
                return new Property(['-webkit-transition-property', '-o-transition-property', 'transition-property'], 'none').updateMeta('utilities', 'transitionProperty', pluginOrder.transitionProperty, 1, true);
            return new Style(utility.class, [
                new Property('-webkit-transition-property', value.replace(/(?=(transform|box-shadow))/g, '-webkit-')),
                new Property('-o-transition-property', value),
                new Property('transition-property', value.replace(/transform/g, 'transform, -webkit-transform').replace(/box-shadow/g, 'box-shadow, -webkit-box-shadow')),
                new Property(['-webkit-transition-timing-function', '-o-transition-timing-function', 'transition-timing-function'], (_b = toType(theme('transitionTimingFunction.DEFAULT'), 'string')) !== null && _b !== void 0 ? _b : 'cubic-bezier(0.4, 0, 0.2, 1)'),
                new Property(['-webkit-transition-duration', '-o-transition-duration', 'transition-duration'], (_c = toType(theme('transitionDuration.DEFAULT'), 'string')) !== null && _c !== void 0 ? _c : '150ms'),
            ]).updateMeta('utilities', 'transitionProperty', pluginOrder.transitionProperty, 2, true);
        }
    }
}
// https://windicss.org/utilities/transitions.html#transition-duration
function duration(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('transitionDuration'))
        .handleSquareBrackets()
        .handleTime(0, undefined, 'float')
        .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "ms"); })
        .handleVariable()
        .createProperty(['-webkit-transition-duration', '-o-transition-duration', 'transition-duration'])) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'transitionDuration', pluginOrder.transitionDuration, 1, true);
}
// https://windicss.org/utilities/transitions.html#transition-timing-function
function transitionTimingFunction(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleBody(theme('transitionTimingFunction'))
        .createProperty(['-webkit-transition-timing-function', '-o-transition-timing-function', 'transition-timing-function'])) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'transitionTimingFunction', pluginOrder.transitionTimingFunction, 1, true);
}
// https://windicss.org/utilities/transitions.html#transition-delay
function delay(utility, _a) {
    var _b;
    var theme = _a.theme;
    return (_b = utility.handler
        .handleStatic(theme('transitionDelay'))
        .handleSquareBrackets()
        .handleTime(0, undefined, 'float')
        .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "ms"); })
        .handleVariable()
        .createProperty(['-webkit-transition-delay', '-o-transition-delay', 'transition-delay'])) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'transitionDelay', pluginOrder.transitionDelay, 0, true);
}
// https://windicss.org/utilities/behaviors.html#animation
function animation(utility, _a) {
    var _b, _c, _d, _e, _f;
    var theme = _a.theme, config = _a.config;
    var body = utility.body;
    if (utility.raw.startsWith('animate-ease')) {
        return (_b = utility.clone(utility.raw.slice(8)).handler
            .handleBody(theme('animationTimingFunction'))
            .handleSquareBrackets()
            .createProperty(['-webkit-animation-timing-function', 'animation-timing-function'])) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'animation', pluginOrder.animation, 20, true);
    }
    if (utility.raw.startsWith('animate-duration')) {
        return (_c = utility.clone(utility.raw.slice(8)).handler
            .handleStatic(theme('animationDuration'))
            .handleSquareBrackets()
            .handleTime(0, undefined, 'float')
            .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "ms"); })
            .handleVariable()
            .createProperty(['-webkit-animation-duration', 'animation-duration'])) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'animation', pluginOrder.animation, 21, true);
    }
    if (utility.raw.startsWith('animate-delay')) {
        return (_d = utility.clone(utility.raw.slice(8)).handler
            .handleStatic(theme('animationDelay'))
            .handleSquareBrackets()
            .handleTime(0, undefined, 'float')
            .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "ms"); })
            .handleVariable()
            .createProperty(['-webkit-animation-delay', 'animation-delay'])) === null || _d === void 0 ? void 0 : _d.updateMeta('utilities', 'animation', pluginOrder.animation, 22, true);
    }
    var animateIterationCount = utility.handler.handleBody(theme('animationIterationCount')).handleNumber(0, undefined, 'int').handleSquareBrackets().value;
    if (animateIterationCount)
        return new Property(['-webkit-animation-iteration-count', 'animation-iteration-count'], animateIterationCount).updateMeta('utilities', 'animation', pluginOrder.animation, 23, true);
    var animations = toType(theme('animation'), 'object');
    if (Object.keys(animations).includes(body)) {
        var value = animations[body];
        var prop = config('prefixer') ? ['-webkit-animation', 'animation'] : 'animation';
        if (value === 'none')
            return new Property(prop, 'none').updateMeta('utilities', 'animation', pluginOrder.animation, 1, true);
        var styles = void 0, keyframe = void 0;
        if (typeof value === 'string') {
            keyframe = (_e = value.match(/^\w+/)) === null || _e === void 0 ? void 0 : _e[0];
            styles = [new Style(utility.class, new Property(prop, value))];
        }
        else {
            keyframe = value['animation'] || value['animationName'] || value['animation-name'];
            if (config('prefixer')) {
                var props = {};
                for (var _i = 0, _g = Object.entries(value); _i < _g.length; _i++) {
                    var _h = _g[_i], k = _h[0], v = _h[1];
                    if (k.startsWith('animation') || k.startsWith('backface')) {
                        props['-webkit-' + k] = v;
                    }
                    else if (k.startsWith('transform')) {
                        props['-webkit-' + k] = v;
                        props['-ms-' + k] = v;
                    }
                    props[k] = v;
                }
                value = props;
            }
            styles = Style.generate(utility.class, value).map(function (i) { return i.updateMeta('utilities', 'animation', pluginOrder.animation, 2, true); });
        }
        if (styles) {
            return __spreadArray(__spreadArray([], styles.map(function (i) { return i.updateMeta('utilities', 'animation', pluginOrder.animation, 2, true); }), true), keyframe ? Keyframes.generate(keyframe, ((_f = theme("keyframes.".concat(keyframe))) !== null && _f !== void 0 ? _f : {}), undefined, config('prefixer', false)).map(function (i) { return i.updateMeta('utilities', 'keyframes', pluginOrder.keyframes, 1, true); }) : [], true);
        }
    }
}
// https://windicss.org/utilities/transforms.html#transform-origin
function transformOrigin(utility, _a) {
    var theme = _a.theme;
    var body = utility.body;
    var origins = toType(theme('transformOrigin'), 'object');
    if (Object.keys(origins).includes(body))
        return new Property(['-webkit-transform-origin', '-ms-transform-origin', 'transform-origin'], origins[body]).updateMeta('utilities', 'transformOrigin', pluginOrder.transformOrigin, 0, true);
}
// https://windicss.org/utilities/transforms.html#transform-scale
function scale(utility, _a) {
    var theme = _a.theme;
    return utility.handler
        .handleStatic(theme('scale'))
        .handleNumber(0, undefined, 'int', function (number) { return (number / 100).toString(); })
        .handleVariable()
        .callback(function (value) {
        if (utility.raw.startsWith('scale-x'))
            return new Property('--tw-scale-x', value).updateMeta('utilities', 'scale', pluginOrder.scale, 2, true);
        if (utility.raw.startsWith('scale-y'))
            return new Property('--tw-scale-y', value).updateMeta('utilities', 'scale', pluginOrder.scale, 3, true);
        if (utility.raw.startsWith('scale-z'))
            return new Property('--tw-scale-z', value).updateMeta('utilities', 'scale', pluginOrder.scale, 4, true);
        return new Property(['--tw-scale-x', '--tw-scale-y', '--tw-scale-z'], value).updateMeta('utilities', 'scale', pluginOrder.scale, 1, true);
    });
}
// https://windicss.org/utilities/transforms.html#transform-rotate
function rotate(utility, _a) {
    var theme = _a.theme;
    return utility.handler
        .handleStatic(theme('rotate'))
        .handleSquareBrackets()
        .handleNumber(0, undefined, 'float', function (number) { return "".concat(number, "deg"); })
        .handleNegative()
        .handleVariable()
        .callback(function (value) {
        var abs = utility.absolute;
        if (abs.startsWith('rotate-x'))
            return new Property('--tw-rotate-x', value).updateMeta('utilities', 'rotate', pluginOrder.rotate, 2, true);
        if (abs.startsWith('rotate-y'))
            return new Property('--tw-rotate-y', value).updateMeta('utilities', 'rotate', pluginOrder.rotate, 3, true);
        if (abs.startsWith('rotate-z'))
            return new Property('--tw-rotate-z', value).updateMeta('utilities', 'rotate', pluginOrder.rotate, 4, true);
        return new Property('--tw-rotate', value).updateMeta('utilities', 'rotate', pluginOrder.rotate, 1, true);
    });
}
// https://windicss.org/utilities/transforms.html#transform-translate
function translate(utility, _a) {
    var _b;
    var theme = _a.theme;
    var centerMatch = utility.raw.match(/^-?translate-[x|y|z]/);
    if (centerMatch) {
        var center = centerMatch[0].replace(/^-?translate-/, '');
        return (_b = utility.handler
            .handleStatic(theme('translate'))
            .handleSquareBrackets()
            .handleSpacing()
            .handleFraction()
            .handleSize()
            .handleNegative()
            .handleVariable()
            .createProperty("--tw-translate-".concat(center))) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'translate', pluginOrder.translate, utility.raw.charAt(0) === '-' ? 2 : 1, true);
    }
}
// https://windicss.org/utilities/transforms.html#transform-skew
function skew(utility, _a) {
    var _b;
    var theme = _a.theme;
    var centerMatch = utility.raw.match(/^-?skew-[x|y]/);
    if (centerMatch) {
        var center = centerMatch[0].replace(/^-?skew-/, '');
        return (_b = utility.handler
            .handleStatic(theme('skew'))
            .handleSquareBrackets()
            .handleNumber(0, undefined, 'float', function (number) { return "".concat(number, "deg"); })
            .handleNegative()
            .handleVariable()
            .createProperty("--tw-skew-".concat(center))) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'skew', pluginOrder.skew, utility.raw.charAt(0) === '-' ? 2 : 1, true);
    }
}
// https://windicss.org/utilities/transforms.html#perspective
function perspective(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    if (utility.raw.startsWith('perspect-origin')) {
        var origin_1 = (_b = utility.clone('perspectOrigin' + utility.raw.slice(15)).handler
            .handleBody(theme('perspectiveOrigin'))
            .handleSquareBrackets()
            .createProperty(['-webkit-perspective-origin', 'perspective-origin'])) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'perspectiveOrigin', pluginOrder.perspectiveOrigin, 0, true);
        if (origin_1)
            return origin_1;
    }
    return (_c = utility.handler
        .handleStatic(theme('perspective'))
        .handleNumber(0, undefined, 'int', function (number) { return "".concat(number, "px"); })
        .handleSize()
        .handleSquareBrackets()
        .createProperty(['-webkit-perspective', 'perspective'])) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'perspective', pluginOrder.perspective, 0, true);
}
// https://windicss.org/utilities/behaviors.html#cursor
function cursor(utility, _a) {
    var theme = _a.theme;
    var body = utility.body;
    var cursors = toType(theme('cursor'), 'object');
    if (Object.keys(cursors).includes(body))
        return new Property('cursor', cursors[body]).updateMeta('utilities', 'cursor', pluginOrder.cursor, 1, true);
}
// https://windicss.org/utilities/borders/outline.html
function outline(utility, _a) {
    var _b, _c, _d, _e;
    var theme = _a.theme;
    if (utility.raw.startsWith('outline-offset')) {
        return (_b = utility.handler
            .handleStatic(theme('outlineOffset'))
            .handleNumber(0, undefined, 'int')
            .handleVariable()
            .handleSquareBrackets()
            .createProperty('outline-offset')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'outline', pluginOrder.outline, 0, true);
    }
    if (utility.raw.startsWith('outline-opacity')) {
        return (_c = utility.handler
            .handleStatic(theme('opacity'))
            .handleNumber(0, 1, 'float')
            .handleVariable()
            .handleSquareBrackets()
            .createProperty('--tw-outline-opacity')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'outline', pluginOrder.outline, 1, true);
    }
    var outlineColor = (_d = utility.handler
        .handleColor(theme('outlineColor'))
        .handleOpacity(theme('opacity'))
        .handleSquareBrackets(notNumberLead)
        .handleVariable(function (variable) { return utility.raw.startsWith('outline-$') ? "var(--".concat(variable, ")") : undefined; })
        .createColorStyle(utility.class, 'outline-color', '--tw-outline-opacity')) === null || _d === void 0 ? void 0 : _d.updateMeta('utilities', 'outline', pluginOrder.outline, 2, true);
    if (outlineColor)
        return outlineColor;
    return (_e = utility.handler
        .handleStatic(theme('outlineWidth'))
        .handleNumber(0, undefined, 'float', function (number) { return "".concat(number, "px"); })
        .handleSquareBrackets()
        .handleVariable()
        .createProperty('outline-width')) === null || _e === void 0 ? void 0 : _e.updateMeta('utilities', 'outline', pluginOrder.outline, 3, true);
}
// https://windicss.org/utilities/svg.html#fill-color
function fill(utility, _a) {
    var _b, _c;
    var theme = _a.theme;
    if (utility.raw.startsWith('fill-opacity')) {
        return (_b = utility.handler
            .handleStatic(theme('opacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-fill-opacity')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'fill', pluginOrder.ringOffsetColor, 2, true);
    }
    return (_c = utility.handler
        .handleColor(theme('fill'))
        .handleOpacity(theme('opacity'))
        .handleSquareBrackets()
        .handleVariable()
        .createColorStyle(utility.class, 'fill', '--tw-fill-opacity')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'fill', pluginOrder.fill, 1, true);
}
// https://windicss.org/utilities/svg.html#stroke-color
// https://windicss.org/utilities/svg.html#stroke-width
function stroke(utility, _a) {
    var _b, _c, _d, _e, _f, _g;
    var theme = _a.theme;
    if (utility.raw.startsWith('stroke-dash')) {
        return (_b = utility.handler.handleNumber().createProperty('stroke-dasharray')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'strokeDashArray', pluginOrder.strokeDashArray, 0, true);
    }
    if (utility.raw.startsWith('stroke-offset')) {
        return (_c = utility.handler.handleNumber().createProperty('stroke-dashoffset')) === null || _c === void 0 ? void 0 : _c.updateMeta('utilities', 'strokeDashOffset', pluginOrder.strokeDashOffset, 0, true);
    }
    if (utility.raw.startsWith('stroke-opacity')) {
        return (_d = utility.handler
            .handleStatic(theme('opacity'))
            .handleNumber(0, 100, 'int', function (number) { return (number / 100).toString(); })
            .handleVariable()
            .createProperty('--tw-stroke-opacity')) === null || _d === void 0 ? void 0 : _d.updateMeta('utilities', 'stroke', pluginOrder.stroke, 2, true);
    }
    return ((_e = utility.handler
        .handleColor(theme('stroke'))
        .handleOpacity(theme('opacity'))
        .handleVariable()
        .handleSquareBrackets()
        .createColorStyle(utility.class, 'stroke', '--tw-stroke-opacity')) === null || _e === void 0 ? void 0 : _e.updateMeta('utilities', 'stroke', pluginOrder.stroke, 1, true))
        || (utility.raw.startsWith('stroke-$')
            ? (_f = utility.handler
                .handleVariable()
                .createProperty('stroke-width')) === null || _f === void 0 ? void 0 : _f.updateMeta('utilities', 'strokeWidth', pluginOrder.strokeWidth, 2, true)
            : (_g = utility.handler
                .handleStatic(theme('strokeWidth'))
                .handleNumber(0, undefined, 'int')
                .createProperty('stroke-width')) === null || _g === void 0 ? void 0 : _g.updateMeta('utilities', 'strokeWidth', pluginOrder.strokeWidth, 1, true));
}
function content(utility, _a) {
    var _b;
    var theme = _a.theme;
    if (!/^content-(?!$)/.test(utility.raw))
        return;
    return (_b = utility.handler
        .handleBody(theme('content'))
        .handleSquareBrackets()
        .handleVariable()
        .handleString(function (string) { return "\"".concat(string, "\""); })
        .createProperty('content')) === null || _b === void 0 ? void 0 : _b.updateMeta('utilities', 'content', pluginOrder.content, 1, true);
}
// https://windicss.org/utilities/behaviors.html#accent-color
function accent(utility, _a) {
    var theme = _a.theme;
    var color = utility.handler
        .handleColor(theme('boxShadowColor'))
        .handleOpacity(theme('opacity'))
        .handleSquareBrackets()
        .handleVariable()
        .createColorValue('1');
    return new Style(utility.class, new Property('accent-color', color))
        .updateMeta('utilities', 'accentColor', pluginOrder.accentColor, 0, true);
}
var dynamicUtilities = {
    columns: columns,
    container: container,
    space: space,
    divide: divide,
    bg: background,
    basis: basis,
    from: gradientColorFrom,
    via: gradientColorVia,
    to: gradientColorTo,
    border: border,
    rounded: borderRadius,
    cursor: cursor,
    flex: flex,
    order: order,
    font: font,
    h: size,
    leading: lineHeight,
    list: listStyleType,
    m: margin,
    my: margin,
    mx: margin,
    mt: margin,
    mr: margin,
    mb: margin,
    ml: margin,
    min: minMaxSize,
    max: minMaxSize,
    object: objectPosition,
    opacity: opacity,
    outline: outline,
    p: padding,
    py: padding,
    px: padding,
    pt: padding,
    pr: padding,
    pb: padding,
    pl: padding,
    placeholder: placeholder,
    caret: caret,
    tab: tabSize,
    indent: textIndent,
    inset: inset,
    top: inset,
    right: inset,
    bottom: inset,
    left: inset,
    shadow: boxShadow,
    ring: ring,
    blur: blur,
    brightness: brightness,
    contrast: contrast,
    drop: dropShadow,
    grayscale: grayscale,
    hue: hueRotate,
    invert: invert,
    saturate: saturate,
    sepia: sepia,
    backdrop: backdrop,
    fill: fill,
    stroke: stroke,
    text: text,
    tracking: letterSpacing,
    decoration: textDecoration,
    underline: textUnderline,
    w: size,
    z: zIndex,
    gap: gap,
    auto: gridAuto,
    grid: gridTemplate,
    col: gridColumn,
    row: gridRow,
    origin: transformOrigin,
    scale: scale,
    rotate: rotate,
    translate: translate,
    skew: skew,
    perspect: perspective,
    transition: transition,
    ease: transitionTimingFunction,
    duration: duration,
    delay: delay,
    content: content,
    animate: animation,
    accent: accent,
};

var sky = {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
};
var neutral = {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
};
var stone = {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
};
var slate = {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
};
var zinc = {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
};
var gray = {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
};
var warned = false;
function color_warn(from, to) {
    if (!warned) {
        Console.log("warn - '".concat(from, "' has been renamed to '").concat(to, "'."));
        Console.log('warn - Please update your color palette to eliminate this warning.');
        warned = true;
    }
}
var colors = {
    inherit: 'inherit',
    current: 'currentColor',
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    rose: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
    },
    pink: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#831843',
    },
    fuchsia: {
        50: '#fdf4ff',
        100: '#fae8ff',
        200: '#f5d0fe',
        300: '#f0abfc',
        400: '#e879f9',
        500: '#d946ef',
        600: '#c026d3',
        700: '#a21caf',
        800: '#86198f',
        900: '#701a75',
    },
    purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87',
    },
    violet: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
    },
    indigo: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
    },
    blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
    },
    sky: sky,
    get lightBlue() {
        color_warn('lightBlue', 'sky');
        return sky;
    },
    cyan: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
    },
    teal: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
    },
    emerald: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
    },
    green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
    },
    lime: {
        50: '#f7fee7',
        100: '#ecfccb',
        200: '#d9f99d',
        300: '#bef264',
        400: '#a3e635',
        500: '#84cc16',
        600: '#65a30d',
        700: '#4d7c0f',
        800: '#3f6212',
        900: '#365314',
    },
    yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
    },
    amber: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
    },
    orange: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
    },
    red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
    },
    get warmGray() {
        color_warn('warmGray', 'stone');
        return stone;
    },
    get trueGray() {
        color_warn('trueGray', 'neutral');
        return neutral;
    },
    gray: gray,
    get coolGray() {
        color_warn('coolGray', 'gray');
        return gray;
    },
    get blueGray() {
        color_warn('blueGray', 'slate');
        return slate;
    },
    slate: slate,
    zinc: zinc,
    get zink() {
        color_warn('zink', 'zinc');
        return zinc;
    },
    neutral: neutral,
    stone: stone,
    light: {
        50: '#fdfdfd',
        100: '#fcfcfc',
        200: '#fafafa',
        300: '#f8f9fa',
        400: '#f6f6f6',
        500: '#f2f2f2',
        600: '#f1f3f5',
        700: '#e9ecef',
        800: '#dee2e6',
        900: '#dde1e3',
    },
    dark: {
        50: '#4a4a4a',
        100: '#3c3c3c',
        200: '#323232',
        300: '#2d2d2d',
        400: '#222222',
        500: '#1f1f1f',
        600: '#1c1c1e',
        700: '#1b1b1b',
        800: '#181818',
        900: '#0f0f0f',
    },
};

var keyframes = {
    spin: {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        },
    },
    ping: {
        '0%': {
            transform: 'scale(1)',
            opacity: '1',
        },
        '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
        },
    },
    pulse: {
        '0%, 100%': {
            opacity: '1',
        },
        '50%': {
            opacity: '.5',
        },
    },
    bounce: {
        '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
        },
    },
    shock: {
        'from, 20%, 53%, 80%, to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            transform: 'translate3d(0, 0, 0)',
        },
        '40%, 43%': {
            animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -30px, 0)',
        },
        '70%': {
            animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -15px, 0)',
        },
        '90%': {
            transform: 'translate3d(0, -4px, 0)',
        },
    },
    flash: {
        'from, 50%, to': {
            opacity: '1',
        },
        '25%, 75%': {
            opacity: '0',
        },
    },
    bubble: {
        'from': {
            transform: 'scale3d(1, 1, 1)',
        },
        '50%': {
            transform: 'scale3d(1.05, 1.05, 1.05)',
        },
        'to': {
            transform: 'scale3d(1, 1, 1)',
        },
    },
    rubberBand: {
        'from': {
            transform: 'scale3d(1, 1, 1)',
        },
        '30%': {
            transform: 'scale3d(1.25, 0.75, 1)',
        },
        '40%': {
            transform: 'scale3d(0.75, 1.25, 1)',
        },
        '50%': {
            transform: 'scale3d(1.15, 0.85, 1)',
        },
        '65%': {
            transform: 'scale3d(0.95, 1.05, 1)',
        },
        '75%': {
            transform: 'scale3d(1.05, 0.95, 1)',
        },
        'to': {
            transform: 'scale3d(1, 1, 1)',
        },
    },
    shakeX: {
        'from, to': {
            transform: 'translate3d(0, 0, 0)',
        },
        '10%, 30%, 50%, 70%, 90%': {
            transform: 'translate3d(-10px, 0, 0)',
        },
        '20%, 40%, 60%, 80%': {
            transform: 'translate3d(10px, 0, 0)',
        },
    },
    shakeY: {
        'from, to': {
            transform: 'translate3d(0, 0, 0)',
        },
        '10%, 30%, 50%, 70%, 90%': {
            transform: 'translate3d(0, -10px, 0)',
        },
        '20%, 40%, 60%, 80%': {
            transform: 'translate3d(0, 10px, 0)',
        },
    },
    headShake: {
        '0%': {
            transform: 'translateX(0)',
        },
        '6.5%': {
            transform: 'translateX(-6px) rotateY(-9deg)',
        },
        '18.5%': {
            transform: 'translateX(5px) rotateY(7deg)',
        },
        '31.5%': {
            transform: 'translateX(-3px) rotateY(-5deg)',
        },
        '43.5%': {
            transform: 'translateX(2px) rotateY(3deg)',
        },
        '50%': {
            transform: 'translateX(0)',
        },
    },
    swing: {
        '20%': {
            transform: 'rotate3d(0, 0, 1, 15deg)',
        },
        '40%': {
            transform: 'rotate3d(0, 0, 1, -10deg)',
        },
        '60%': {
            transform: 'rotate3d(0, 0, 1, 5deg)',
        },
        '80%': {
            transform: 'rotate3d(0, 0, 1, -5deg)',
        },
        'to': {
            transform: 'rotate3d(0, 0, 1, 0deg)',
        },
    },
    tada: {
        'from': {
            transform: 'scale3d(1, 1, 1)',
        },
        '10%, 20%': {
            transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)',
        },
        '30%, 50%, 70%, 90%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        },
        '40%, 60%, 80%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
        },
        'to': {
            transform: 'scale3d(1, 1, 1)',
        },
    },
    wobble: {
        'from': {
            transform: 'translate3d(0, 0, 0)',
        },
        '15%': {
            transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
        },
        '30%': {
            transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
        },
        '45%': {
            transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
        },
        '60%': {
            transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
        },
        '75%': {
            transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    jello: {
        'from, 11.1% to': {
            transform: 'translate3d(0, 0, 0)',
        },
        '22.2%': {
            transform: 'skewX(-12.5deg) skewY(-12.5deg)',
        },
        '33.3%': {
            transform: 'skewX(6.25deg) skewY(6.25deg)',
        },
        '44.4%': {
            transform: 'skewX(-3.125deg) skewY(-3.125deg)',
        },
        '55.5%': {
            transform: 'skewX(1.5625deg) skewY(1.5625deg)',
        },
        '66.6%': {
            transform: 'skewX(-0.78125deg) skewY(-0.78125deg)',
        },
        '77.7%': {
            transform: 'skewX(0.390625deg) skewY(0.390625deg)',
        },
        '88.8%': {
            transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)',
        },
    },
    heartBeat: {
        '0%': {
            transform: 'scale(1)',
        },
        '14%': {
            transform: 'scale(1.3)',
        },
        '28%': {
            transform: 'scale(1)',
        },
        '42%': {
            transform: 'scale(1.3)',
        },
        '70%': {
            transform: 'scale(1)',
        },
    },
    hinge: {
        '0%': {
            transformOrigin: 'top left',
            animationTimingFunction: 'ease-in-out',
        },
        '20%, 60%': {
            transform: 'rotate3d(0, 0, 1, 80deg)',
            transformOrigin: 'top left',
            animationTimingFunction: 'ease-in-out',
        },
        '40%, 80%': {
            transform: 'rotate3d(0, 0, 1, 60deg)',
            transformOrigin: 'top left',
            animationTimingFunction: 'ease-in-out',
        },
        'to': {
            transform: 'translate3d(0, 700px, 0)',
            opacity: '0',
        },
    },
    jackInTheBox: {
        'from': {
            opacity: '0',
            transformOrigin: 'center bottom',
            transform: 'scale(0.1) rotate(30deg)',
        },
        '50%': {
            transform: 'rotate(-10deg)',
        },
        '70%': {
            transform: 'rotate(3deg)',
        },
        'to': {
            transform: 'scale(1)',
        },
    },
    // light speed
    lightSpeedInRight: {
        'from': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
        },
        '60%': {
            opacity: '1',
            transform: 'skewX(20deg)',
        },
        '80%': {
            transform: 'skewX(-5deg)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    lightSpeedInLeft: {
        'from': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
        },
        '60%': {
            opacity: '1',
            transform: 'skewX(20deg)',
        },
        '80%': {
            transform: 'skewX(-5deg)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    lightSpeedOutLeft: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) skewX(30deg)',
        },
    },
    lightSpeedOutRight: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) skewX(30deg)',
        },
    },
    // flip
    flip: {
        'from': {
            transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)',
            animationTimingFunction: 'ease-out',
        },
        '40%': {
            transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)',
            animationTimingFunction: 'ease-out',
        },
        '50%': {
            transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)',
            animationTimingFunction: 'ease-in',
        },
        '80%': {
            transform: 'perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)',
            animationTimingFunction: 'ease-in',
        },
        'to': {
            transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)',
            animationTimingFunction: 'ease-in',
        },
    },
    flipInX: {
        'from': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            animationTimingFunction: 'ease-in',
            opacity: '0',
        },
        '40%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            animationTimingFunction: 'ease-in',
        },
        '60%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
            opacity: '1',
        },
        '80%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
        },
        'to': {
            transform: 'perspective(400px)',
        },
    },
    flipInY: {
        'from': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
            animationTimingFunction: 'ease-in',
            opacity: '0',
        },
        '40%': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
            animationTimingFunction: 'ease-in',
        },
        '60%': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
            opacity: '1',
        },
        '80%': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
        },
        'to': {
            transform: 'perspective(400px)',
        },
    },
    flipOutX: {
        'from': {
            transform: 'perspective(400px)',
        },
        '30%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            opacity: '1',
        },
        'to': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            opacity: '0',
        },
    },
    flipOutY: {
        'from': {
            transform: 'perspective(400px)',
        },
        '30%': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, -15deg)',
            opacity: '1',
        },
        'to': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
            opacity: '0',
        },
    },
    // rotate in
    rotateIn: {
        'from': {
            transformOrigin: 'center',
            transform: 'rotate3d(0, 0, 1, -200deg)',
            opacity: '0',
        },
        'to': {
            transformOrigin: 'center',
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
        },
    },
    rotateInDownLeft: {
        'from': {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: '0',
        },
        'to': {
            transformOrigin: 'left bottom',
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
        },
    },
    rotateInDownRight: {
        'from': {
            transformOrigin: 'right bottom',
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: '0',
        },
        'to': {
            transformOrigin: 'right bottom',
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
        },
    },
    rotateInUpLeft: {
        'from': {
            transformOrigin: 'left top',
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: '0',
        },
        'to': {
            transformOrigin: 'left top',
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
        },
    },
    rotateInUpRight: {
        'from': {
            transformOrigin: 'right bottom',
            transform: 'rotate3d(0, 0, 1, -90deg)',
            opacity: '0',
        },
        'to': {
            transformOrigin: 'right bottom',
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
        },
    },
    rotateOut: {
        'from': {
            transformOrigin: 'center',
            opacity: '1',
        },
        'to': {
            transformOrigin: 'center',
            transform: 'rotate3d(0, 0, 1, 200deg)',
            opacity: '0',
        },
    },
    rotateOutDownLeft: {
        'from': {
            transformOrigin: 'left bottom',
            opacity: '1',
        },
        'to': {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: '0',
        },
    },
    rotateOutDownRight: {
        'from': {
            transformOrigin: 'right bottom',
            opacity: '1',
        },
        'to': {
            transformOrigin: 'right bottom',
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: '0',
        },
    },
    rotateOutUpLeft: {
        'from': {
            transformOrigin: 'left bottom',
            opacity: '1',
        },
        'to': {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: '0',
        },
    },
    rotateOutUpRight: {
        'from': {
            transformOrigin: 'right bottom',
            opacity: '1',
        },
        'to': {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, 90deg)',
            opacity: '0',
        },
    },
    // roll
    rollIn: {
        'from': {
            opacity: '0',
            transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    rollOut: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)',
        },
    },
    // zoom in
    zoomIn: {
        'from': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
        },
        '50%': {
            opacity: '1',
        },
    },
    zoomInDown: {
        'from': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        '60%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    zoomInLeft: {
        'from': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        '60%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    zoomInRight: {
        'from': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        '60%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    zoomInUp: {
        'from': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        '60%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    // bounce in
    bounceIn: {
        'from, 20%, 40%, 60%, 80%, to': {
            animationTimingFunction: 'ease-in-out',
        },
        '0%': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
        },
        '20%': {
            transform: 'scale3d(1.1, 1.1, 1.1)',
        },
        '40%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
        },
        '60%': {
            transform: 'scale3d(1.03, 1.03, 1.03)',
            opacity: '1',
        },
        '80%': {
            transform: 'scale3d(0.97, 0.97, 0.97)',
        },
        'to': {
            opacity: '1',
            transform: 'scale3d(1, 1, 1)',
        },
    },
    bounceInDown: {
        'from, 60%, 75%, 90%, to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        '0%': {
            opacity: '0',
            transform: 'translate3d(0, -3000px, 0)',
        },
        '60%': {
            opacity: '1',
            transform: 'translate3d(0, 25px, 0)',
        },
        '75%': {
            transform: 'translate3d(0, -10px, 0)',
        },
        '90%': {
            transform: 'translate3d(0, 5px, 0)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    bounceInLeft: {
        'from, 60%, 75%, 90%, to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        '0%': {
            opacity: '0',
            transform: 'translate3d(-3000px, 0, 0)',
        },
        '60%': {
            opacity: '1',
            transform: 'translate3d(25px, 0, 0)',
        },
        '75%': {
            transform: 'translate3d(-10px, 0, 0)',
        },
        '90%': {
            transform: 'translate3d(5px, 0, 0)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    bounceInRight: {
        'from, 60%, 75%, 90%, to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        '0%': {
            opacity: '0',
            transform: 'translate3d(3000px, 0, 0)',
        },
        '60%': {
            opacity: '1',
            transform: 'translate3d(-25px, 0, 0)',
        },
        '75%': {
            transform: 'translate3d(10px, 0, 0)',
        },
        '90%': {
            transform: 'translate3d(-5px, 0, 0)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    bounceInUp: {
        'from, 60%, 75%, 90%, to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        '0%': {
            opacity: '0',
            transform: 'translate3d(0, 3000px, 0)',
        },
        '60%': {
            opacity: '1',
            transform: 'translate3d(0, -20px, 0)',
        },
        '75%': {
            transform: 'translate3d(0, 10px, 0)',
        },
        '90%': {
            transform: 'translate3d(0, -5px, 0)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    // bounce out
    bounceOut: {
        '20%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
        },
        '50%, 55%': {
            opacity: '1',
            transform: 'scale3d(1.1, 1.1, 1.1)',
        },
        'to': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
        },
    },
    bounceOutDown: {
        '20%': {
            transform: 'translate3d(0, 10px, 0)',
        },
        '40%, 45%': {
            opacity: '1',
            transform: 'translate3d(0, -20px, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, 2000px, 0)',
        },
    },
    bounceOutLeft: {
        '20%': {
            opacity: '1',
            transform: 'translate3d(20px, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(-2000px, 0, 0)',
        },
    },
    bounceOutRight: {
        '20%': {
            opacity: '1',
            transform: 'translate3d(-20px, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(2000px, 0, 0)',
        },
    },
    bounceOutUp: {
        '20%': {
            transform: 'translate3d(0, -10px, 0)',
        },
        '40%, 45%': {
            opacity: '1',
            transform: 'translate3d(0, 20px, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, -2000px, 0)',
        },
    },
    // zoom out
    zoomOut: {
        'from': {
            opacity: '1',
        },
        '50%': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
        },
        'to': {
            opacity: '0',
        },
    },
    zoomOutDown: {
        '40%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        'to': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)',
            transformOrigin: 'center bottom',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    zoomOutLeft: {
        '40%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'scale(0.1) translate3d(-2000px, 0, 0)',
            transformOrigin: 'left center',
        },
    },
    zoomOutRight: {
        '40%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'scale(0.1) translate3d(2000px, 0, 0)',
            transformOrigin: 'right center',
        },
    },
    zoomOutUp: {
        '40%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        'to': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)',
            transformOrigin: 'center bottom',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    // slide in
    slideInDown: {
        'from': {
            transform: 'translate3d(0, -100%, 0)',
            visibility: 'visible',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    slideInLeft: {
        'from': {
            transform: 'translate3d(-100%, 0, 0)',
            visibility: 'visible',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    slideInRight: {
        'from': {
            transform: 'translate3d(100%, 0, 0)',
            visibility: 'visible',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    slideInUp: {
        'from': {
            transform: 'translate3d(0, 100%, 0)',
            visibility: 'visible',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    // slide out
    slideOutDown: {
        'from': {
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            visibility: 'hidden',
            transform: 'translate3d(0, 100%, 0)',
        },
    },
    slideOutLeft: {
        'from': {
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            visibility: 'hidden',
            transform: 'translate3d(-100%, 0, 0)',
        },
    },
    slideOutRight: {
        'from': {
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            visibility: 'hidden',
            transform: 'translate3d(100%, 0, 0)',
        },
    },
    slideOutUp: {
        'from': {
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            visibility: 'hidden',
            transform: 'translate3d(0, -100%, 0)',
        },
    },
    // fade in
    fadeIn: {
        'from': {
            opacity: '0',
        },
        'to': {
            opacity: '1',
        },
    },
    fadeInDown: {
        'from': {
            opacity: '0',
            transform: 'translate3d(0, -100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInDownBig: {
        'from': {
            opacity: '0',
            transform: 'translate3d(0, -2000px, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInLeft: {
        'from': {
            opacity: '0',
            transform: 'translate3d(-100%, 0, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInLeftBig: {
        'from': {
            opacity: '0',
            transform: 'translate3d(-2000px, 0, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInRight: {
        'from': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInRightBig: {
        'from': {
            opacity: '0',
            transform: 'translate3d(2000px, 0, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInUp: {
        'from': {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInUpBig: {
        'from': {
            opacity: '0',
            transform: 'translate3d(0, 2000px, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInTopLeft: {
        'from': {
            opacity: '0',
            transform: 'translate3d(-100%, -100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInTopRight: {
        'from': {
            opacity: '0',
            transform: 'translate3d(100%, -100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInBottomLeft: {
        'from': {
            opacity: '0',
            transform: 'translate3d(-100%, 100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInBottomRight: {
        'from': {
            opacity: '0',
            transform: 'translate3d(100%, 100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    // fade out
    fadeOut: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
        },
    },
    fadeOutDown: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)',
        },
    },
    fadeOutDownBig: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, 2000px, 0)',
        },
    },
    fadeOutLeft: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(-100%, 0, 0)',
        },
    },
    fadeOutLeftBig: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(-2000px, 0, 0)',
        },
    },
    fadeOutRight: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0)',
        },
    },
    fadeOutRightBig: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(2000px, 0, 0)',
        },
    },
    fadeOutUp: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, -100%, 0)',
        },
    },
    fadeOutUpBig: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, -2000px, 0)',
        },
    },
    fadeOutTopLeft: {
        'from': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(-100%, -100%, 0)',
        },
    },
    fadeOutTopRight: {
        'from': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, -100%, 0)',
        },
    },
    fadeOutBottomLeft: {
        'from': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(-100%, 100%, 0)',
        },
    },
    fadeOutBottomRight: {
        'from': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, 100%, 0)',
        },
    },
    // back in
    backInUp: {
        '0%': {
            opacity: '0.7',
            transform: 'translateY(1200px) scale(0.7)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '1',
            transform: 'scale(1)',
        },
    },
    backInDown: {
        '0%': {
            opacity: '0.7',
            transform: 'translateY(-1200px) scale(0.7)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '1',
            transform: 'scale(1)',
        },
    },
    backInLeft: {
        '0%': {
            opacity: '0.7',
            transform: 'translateX(-2000px) scale(0.7)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateX(0px) scale(0.7)',
        },
        '100%': {
            opacity: '1',
            transform: 'scale(1)',
        },
    },
    backInRight: {
        '0%': {
            opacity: '0.7',
            transform: 'translateX(2000px) scale(0.7)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '1',
            transform: 'scale(1)',
        },
    },
    // back out
    backOutUp: {
        '0%': {
            opacity: '1',
            transform: 'scale(1)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '0.7',
            transform: 'translateY(-700px) scale(0.7)',
        },
    },
    backOutDown: {
        '0%': {
            opacity: '1',
            transform: 'scale(1)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '0.7',
            transform: 'translateY(700px) scale(0.7)',
        },
    },
    backOutLeft: {
        '0%': {
            opacity: '1',
            transform: 'scale(1)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateX(-2000px) scale(0.7)',
        },
        '100%': {
            opacity: '0.7',
            transform: 'translateY(-700px) scale(0.7)',
        },
    },
    backOutRight: {
        '0%': {
            opacity: '1',
            transform: 'scale(1)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '0.7',
            transform: 'translateX(2000px) scale(0.7)',
        },
    },
};

var createPlugin = function (plugin, config) {
    return {
        handler: plugin,
        config: config,
    };
};
createPlugin.withOptions = function (pluginFunction, configFunction) {
    if (configFunction === void 0) { configFunction = function () { return ({}); }; }
    var optionsFunction = function (options) {
        if (options === void 0) { options = {}; }
        return {
            __options: options,
            handler: pluginFunction(options),
            config: configFunction(options),
        };
    };
    optionsFunction.__isOptionsFunction = true;
    // Expose plugin dependencies so that `object-hash` returns a different
    // value if anything here changes, to ensure a rebuild is triggered.
    optionsFunction.__pluginFunction = pluginFunction;
    optionsFunction.__configFunction = configFunction;
    return optionsFunction;
};

var defaultColors = {
    transparent: 'transparent',
    current: 'currentColor',
    inherit: 'inherit',
    light: colors.light,
    dark: colors.dark,
    black: colors.black,
    white: colors.white,
    slate: colors.slate,
    gray: colors.gray,
    zinc: colors.zinc,
    neutral: colors.neutral,
    stone: colors.stone,
    red: colors.red,
    yellow: colors.amber,
    green: colors.emerald,
    blue: colors.blue,
    indigo: colors.indigo,
    purple: colors.violet,
    pink: colors.pink,
    rose: colors.rose,
    fuchsia: colors.fuchsia,
    violet: colors.violet,
    cyan: colors.cyan,
    teal: colors.teal,
    emerald: colors.emerald,
    lime: colors.lime,
    amber: colors.amber,
    orange: colors.orange,
    sky: colors.sky,
    'light-blue': colors.sky,
    'warm-gray': colors.stone,
    'true-gray': colors.neutral,
    'cool-gray': colors.gray,
    'blue-gray': colors.slate,
};
// tShirtScale describes the sizes xs - 7xl
var tShirtScale = {
    'xs': '20rem',
    'sm': '24rem',
    'md': '28rem',
    'lg': '32rem',
    'xl': '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
};
var baseConfig = {
    // purge: [],
    presets: [],
    prefixer: true,
    attributify: false,
    darkMode: 'class',
    theme: {
        orientation: {
            portrait: 'portrait',
            landscape: 'landscape',
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        colors: defaultColors,
        spacing: {
            px: '1px',
            0: '0px',
            0.5: '0.125rem',
            1: '0.25rem',
            1.5: '0.375rem',
            2: '0.5rem',
            2.5: '0.625rem',
            3: '0.75rem',
            3.5: '0.875rem',
            4: '1rem',
            5: '1.25rem',
            6: '1.5rem',
            7: '1.75rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem',
            11: '2.75rem',
            12: '3rem',
            14: '3.5rem',
            16: '4rem',
            20: '5rem',
            24: '6rem',
            28: '7rem',
            32: '8rem',
            36: '9rem',
            40: '10rem',
            44: '11rem',
            48: '12rem',
            52: '13rem',
            56: '14rem',
            60: '15rem',
            64: '16rem',
            72: '18rem',
            80: '20rem',
            96: '24rem',
            // float -> float/4 rem
        },
        animation: {
            none: 'none',
            spin: 'spin 1s linear infinite',
            ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            bounce: 'bounce 1s infinite',
            'shock': {
                animation: 'shock',
                transformOrigin: 'center bottom',
            },
            'flash': 'flash',
            'bubble': 'bubble',
            'rubber-band': 'rubberBand',
            'shake-x': 'shakeX',
            'shake-y': 'shakeY',
            'head-shake': 'headShake 1s ease-in-out',
            'swing': {
                animation: 'swing',
                transformOrigin: 'top center',
            },
            'tada': 'tada',
            'wobble': 'wobble',
            'jello': 'jello',
            'heart-beat': 'heartBeat 1s ease-in-out',
            'hinge': 'hinge 2s',
            'jack-in': 'jackInTheBox',
            'light-speed-in-left': 'lightSpeedInLeft',
            'light-speed-in-right': 'lightSpeedInRight',
            'light-speed-out-left': 'lightSpeedOutLeft',
            'light-speed-out-right': 'lightSpeedOutRight',
            'flip': {
                animation: 'flip',
                backfaceVisibility: 'visible',
            },
            'flip-in-x': {
                animation: 'flipInX',
                backfaceVisibility: 'visible',
            },
            'flip-in-y': {
                animation: 'flipInY',
                backfaceVisibility: 'visible',
            },
            'flip-out-x': {
                animation: 'flipOutX',
                backfaceVisibility: 'visible',
            },
            'flip-out-y': {
                animation: 'flipOutY',
                backfaceVisibility: 'visible',
            },
            'rotate-in': 'rotateIn',
            'rotate-in-down-left': 'rotateInDownLeft',
            'rotate-in-down-right': 'rotateInDownRight',
            'rotate-in-up-left': 'rotateInUpLeft',
            'rotate-in-up-right': 'rotateInUpRight',
            'rotate-out': 'rotateOut',
            'rotate-out-down-left': 'rotateOutDownLeft',
            'rotate-out-down-right': 'rotateOutDownRight',
            'rotate-out-up-left': 'rotateOutUpLeft',
            'rotate-out-up-right': 'rotateOutUpRight',
            'roll-in': 'rollIn',
            'roll-out': 'rollOut',
            'zoom-in': 'zoomIn',
            'zoom-in-down': 'zoomInDown',
            'zoom-in-left': 'zoomInLeft',
            'zoom-in-right': 'zoomInRight',
            'zoom-in-up': 'zoomInUp',
            'bounce-in': 'bounceIn 750ms',
            'bounce-in-down': 'bounceInDown',
            'bounce-in-left': 'bounceInLeft',
            'bounce-in-right': 'bounceInRight',
            'bounce-in-up': 'bounceInUp',
            'bounce-out': 'bounceOut 750ms',
            'bounce-out-down': 'bounceOutDown',
            'bounce-out-left': 'bounceOutLeft',
            'bounce-out-right': 'bounceOutRight',
            'bounce-out-up': 'bounceOutUp',
            'zoom-out': 'zoomOut',
            'zoom-out-down': 'zoomOutDown',
            'zoom-out-left': 'zoomOutLeft',
            'zoom-out-right': 'zoomOutRight',
            'zoom-out-up': 'zoomOutUp',
            'slide-in-down': 'slideInDown',
            'slide-in-left': 'slideInLeft',
            'slide-in-right': 'slideInRight',
            'slide-in-up': 'slideInUp',
            'slide-out-down': 'slideOutDown',
            'slide-out-left': 'slideOutLeft',
            'slide-out-right': 'slideOutRight',
            'slide-out-up': 'slideOutUp',
            'fade-in': 'fadeIn',
            'fade-in-down': 'fadeInDown',
            'fade-in-down-big': 'fadeInDownBig',
            'fade-in-left': 'fadeInLeft',
            'fade-in-left-big': 'fadeInLeftBig',
            'fade-in-right': 'fadeInRight',
            'fade-in-right-big': 'fadeInRightBig',
            'fade-in-up': 'fadeInUp',
            'fade-in-up-big': 'fadeInUpBig',
            'fade-in-top-left': 'fadeInTopLeft',
            'fade-in-top-right': 'fadeInTopRight',
            'fade-in-bottom-left': 'fadeInBottomLeft',
            'fade-in-bottom-right': 'fadeInBottomRight',
            'fade-out': 'fadeOut',
            'fade-out-down': 'fadeOutDown',
            'fade-out-down-big': 'fadeOutDownBig',
            'fade-out-left': 'fadeOutLeft',
            'fade-out-left-big': 'fadeOutLeftBig',
            'fade-out-right': 'fadeOutRight',
            'fade-out-right-big': 'fadeOutRightBig',
            'fade-out-up': 'fadeOutUp',
            'fade-out-up-big': 'fadeOutUpBig',
            'back-in-up': 'backInUp',
            'back-in-down': 'backInDown',
            'back-in-left': 'backInLeft',
            'back-in-right': 'backInRight',
            'back-out-up': 'backOutUp',
            'back-out-down': 'backOutDown',
            'back-out-left': 'backOutLeft',
            'back-out-right': 'backOutRight',
        },
        animationDuration: {
            DEFAULT: '1000ms',
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms',
            1500: '1500ms',
            2000: '2000ms',
            2500: '2500ms',
            3000: '3000ms',
            // int >=0 -> int ms
        },
        animationDelay: {
            DEFAULT: '500ms',
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms',
            1500: '1500ms',
            2000: '2000ms',
            2500: '2500ms',
            3000: '3000ms',
            // int >=0 -> int ms
        },
        animationIterationCount: {
            DEFAULT: '1',
            loop: 'infinite',
            'repeat-1': '1',
            'repeat-2': '2',
            'repeat-3': '3',
            'repeat-4': '4',
            'repeat-5': '5',
            'repeat-6': '6',
            'repeat-7': '7',
            'repeat-8': '8',
            'repeat-9': '9',
            'repeat-10': '10',
            'repeat-11': '11',
            'repeat-12': '12',
        },
        animationTimingFunction: {
            DEFAULT: 'ease',
            linear: 'linear',
            in: 'ease-in',
            out: 'ease-out',
            'in-out': 'ease-in-out',
        },
        backdropBlur: function (theme) { return theme('blur'); },
        backdropBrightness: function (theme) { return theme('brightness'); },
        backdropContrast: function (theme) { return theme('contrast'); },
        backdropGrayscale: function (theme) { return theme('grayscale'); },
        backdropHueRotate: function (theme) { return theme('hueRotate'); },
        backdropInvert: function (theme) { return theme('invert'); },
        backdropOpacity: function (theme) { return theme('opacity'); },
        backdropSaturate: function (theme) { return theme('saturate'); },
        backdropSepia: function (theme) { return theme('sepia'); },
        backgroundColor: function (theme) { return theme('colors'); },
        backgroundImage: {
            none: 'none',
            'gradient-1': 'linear-gradient(135deg, #FDEB71 10%, #F8D800 100%)',
            'gradient-2': 'linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)',
            'gradient-3': 'linear-gradient(135deg, #FEB692 10%, #EA5455 100%)',
            'gradient-4': 'linear-gradient(135deg, #CE9FFC 10%, #7367F0 100%)',
            'gradient-5': 'linear-gradient(135deg, #90F7EC 10%, #32CCBC 100%)',
            'gradient-6': 'linear-gradient(135deg, #FFF6B7 10%, #F6416C 100%)',
            'gradient-7': 'linear-gradient(135deg, #81FBB8 10%, #28C76F 100%)',
            'gradient-8': 'linear-gradient(135deg, #E2B0FF 10%, #9F44D3 100%)',
            'gradient-9': 'linear-gradient(135deg, #F97794 10%, #623AA2 100%)',
            'gradient-10': 'linear-gradient(135deg, #FCCF31 10%, #F55555 100%)',
            'gradient-11': 'linear-gradient(135deg, #F761A1 10%, #8C1BAB 100%)',
            'gradient-12': 'linear-gradient(135deg, #43CBFF 10%, #9708CC 100%)',
            'gradient-13': 'linear-gradient(135deg, #5EFCE8 10%, #736EFE 100%)',
            'gradient-14': 'linear-gradient(135deg, #FAD7A1 10%, #E96D71 100%)',
            'gradient-15': 'linear-gradient(135deg, #FFD26F 10%, #3677FF 100%)',
            'gradient-16': 'linear-gradient(135deg, #A0FE65 10%, #FA016D 100%)',
            'gradient-17': 'linear-gradient(135deg, #FFDB01 10%, #0E197D 100%)',
            'gradient-18': 'linear-gradient(135deg, #FEC163 10%, #DE4313 100%)',
            'gradient-19': 'linear-gradient(135deg, #92FFC0 10%, #002661 100%)',
            'gradient-20': 'linear-gradient(135deg, #EEAD92 10%, #6018DC 100%)',
            'gradient-21': 'linear-gradient(135deg, #F6CEEC 10%, #D939CD 100%)',
            'gradient-22': 'linear-gradient(135deg, #52E5E7 10%, #130CB7 100%)',
            'gradient-23': 'linear-gradient(135deg, #F1CA74 10%, #A64DB6 100%)',
            'gradient-24': 'linear-gradient(135deg, #E8D07A 10%, #5312D6 100%)',
            'gradient-25': 'linear-gradient(135deg, #EECE13 10%, #B210FF 100%)',
            'gradient-26': 'linear-gradient(135deg, #79F1A4 10%, #0E5CAD 100%)',
            'gradient-27': 'linear-gradient(135deg, #FDD819 10%, #E80505 100%)',
            'gradient-28': 'linear-gradient(135deg, #FFF3B0 10%, #CA26FF 100%)',
            'gradient-29': 'linear-gradient(135deg, #FFF5C3 10%, #9452A5 100%)',
            'gradient-30': 'linear-gradient(135deg, #F05F57 10%, #360940 100%)',
            'gradient-31': 'linear-gradient(135deg, #2AFADF 10%, #4C83FF 100%)',
            'gradient-32': 'linear-gradient(135deg, #FFF886 10%, #F072B6 100%)',
            'gradient-33': 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
            'gradient-34': 'linear-gradient(135deg, #F5CBFF 10%, #C346C2 100%)',
            'gradient-35': 'linear-gradient(135deg, #FFF720 10%, #3CD500 100%)',
            'gradient-36': 'linear-gradient(135deg, #FF6FD8 10%, #3813C2 100%)',
            'gradient-37': 'linear-gradient(135deg, #EE9AE5 10%, #5961F9 100%)',
            'gradient-38': 'linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%)',
            'gradient-39': 'linear-gradient(135deg, #C2FFD8 10%, #465EFB 100%)',
            'gradient-40': 'linear-gradient(135deg, #FD6585 10%, #0D25B9 100%)',
            'gradient-41': 'linear-gradient(135deg, #FD6E6A 10%, #FFC600 100%)',
            'gradient-42': 'linear-gradient(135deg, #65FDF0 10%, #1D6FA3 100%)',
            'gradient-43': 'linear-gradient(135deg, #6B73FF 10%, #000DFF 100%)',
            'gradient-44': 'linear-gradient(135deg, #FF7AF5 10%, #513162 100%)',
            'gradient-45': 'linear-gradient(135deg, #F0FF00 10%, #58CFFB 100%)',
            'gradient-46': 'linear-gradient(135deg, #FFE985 10%, #FA742B 100%)',
            'gradient-47': 'linear-gradient(135deg, #FFA6B7 10%, #1E2AD2 100%)',
            'gradient-48': 'linear-gradient(135deg, #FFAA85 10%, #B3315F 100%)',
            'gradient-49': 'linear-gradient(135deg, #72EDF2 10%, #5151E5 100%)',
            'gradient-50': 'linear-gradient(135deg, #FF9D6C 10%, #BB4E75 100%)',
            'gradient-51': 'linear-gradient(135deg, #F6D242 10%, #FF52E5 100%)',
            'gradient-52': 'linear-gradient(135deg, #69FF97 10%, #00E4FF 100%)',
            'gradient-53': 'linear-gradient(135deg, #3B2667 10%, #BC78EC 100%)',
            'gradient-54': 'linear-gradient(135deg, #70F570 10%, #49C628 100%)',
            'gradient-55': 'linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%)',
            'gradient-56': 'linear-gradient(135deg, #FAB2FF 10%, #1904E5 100%)',
            'gradient-57': 'linear-gradient(135deg, #81FFEF 10%, #F067B4 100%)',
            'gradient-58': 'linear-gradient(135deg, #FFA8A8 10%, #FCFF00 100%)',
            'gradient-59': 'linear-gradient(135deg, #FFCF71 10%, #2376DD 100%)',
            'gradient-60': 'linear-gradient(135deg, #FF96F9 10%, #C32BAC 100%)',
            'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
            'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
            'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
            'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
            'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
            'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
            'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
            'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
        },
        backgroundOpacity: function (theme) { return theme('opacity'); },
        backgroundPosition: {
            bottom: 'bottom',
            center: 'center',
            left: 'left',
            'left-bottom': 'left bottom',
            'left-top': 'left top',
            right: 'right',
            'right-bottom': 'right bottom',
            'right-top': 'right top',
            top: 'top',
        },
        backgroundSize: {
            auto: 'auto',
            cover: 'cover',
            contain: 'contain',
        },
        blur: {
            DEFAULT: '8px',
            0: '0',
            sm: '4px',
            md: '12px',
            lg: '16px',
            xl: '24px',
            '2xl': '40px',
            '3xl': '64px',
        },
        borderColor: function (theme) {
            var _a;
            return (__assign({ DEFAULT: theme('colors.gray.200', 'currentColor') }, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})));
        },
        borderOpacity: function (theme) { return theme('opacity'); },
        borderRadius: {
            DEFAULT: '0.25rem',
            none: '0px',
            sm: '0.125rem',
            md: '0.375rem',
            lg: '0.5rem',
            xl: '0.75rem',
            '2xl': '1rem',
            '3xl': '1.5rem',
            '1': '100%',
            full: '9999px',
        },
        borderWidth: {
            DEFAULT: '1px',
            0: '0px',
            2: '2px',
            4: '4px',
            8: '8px',
            // int >=0 -> int px
        },
        boxShadow: {
            DEFAULT: '0 1px 3px 0 rgb(0 0 0/0.1),0 1px 2px -1px rgb(0 0 0/0.1)',
            sm: '0 1px 2px 0 rgb(0 0 0/0.05)',
            md: '0 4px 6px -1px rgb(0 0 0/0.1),0 2px 4px -2px rgb(0 0 0/0.1)',
            lg: '0 10px 15px -3px rgb(0 0 0/0.1),0 4px 6px -4px rgb(0 0 0/0.1)',
            xl: '0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1)',
            '2xl': '0 25px 50px -12px rgb(0 0 0/0.25)',
            inner: 'inset 0 2px 4px 0 rgb(0 0 0/0.05)',
            none: '0 0 #0000',
        },
        boxShadowColor: function (theme) { return theme('colors'); },
        brightness: {
            0: '0',
            50: '.5',
            75: '.75',
            90: '.9',
            95: '.95',
            100: '1',
            105: '1.05',
            110: '1.1',
            125: '1.25',
            150: '1.5',
            200: '2',
        },
        caretColor: function (theme) {
            var _a;
            return (__assign({ auto: 'auto' }, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})));
        },
        caretOpacity: function (theme) { return theme('opacity'); },
        columns: __assign(__assign({}, tShirtScale), { auto: 'auto', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12', '3xs': '16rem', '2xs': '18rem' }),
        container: {},
        content: {
            DEFAULT: '""',
            'open-quote': 'open-quote',
            'close-quote': 'close-quote',
            'open-square': '"["',
            'close-square': '"]"',
            'open-curly': '"{"',
            'close-curly': '"}"',
            'open-bracket': '"("',
            'close-bracket': '")"',
        },
        contrast: {
            0: '0',
            50: '.5',
            75: '.75',
            100: '1',
            125: '1.25',
            150: '1.5',
            200: '2',
        },
        cursor: {
            auto: 'auto',
            default: 'default',
            pointer: 'pointer',
            wait: 'wait',
            text: 'text',
            move: 'move',
            help: 'help',
            'not-allowed': 'not-allowed',
        },
        divideColor: function (theme) { return theme('borderColor'); },
        divideOpacity: function (theme) { return theme('borderOpacity'); },
        divideWidth: function (theme) { return theme('borderWidth'); },
        dropShadow: {
            DEFAULT: ['0 1px 2px rgba(0, 0, 0, 0.1)', '0 1px 1px rgba(0, 0, 0, 0.06)'],
            sm: '0 1px 1px rgba(0,0,0,0.05)',
            md: ['0 4px 3px rgba(0, 0, 0, 0.07)', '0 2px 2px rgba(0, 0, 0, 0.06)'],
            lg: ['0 10px 8px rgba(0, 0, 0, 0.04)', '0 4px 3px rgba(0, 0, 0, 0.1)'],
            xl: ['0 20px 13px rgba(0, 0, 0, 0.03)', '0 8px 5px rgba(0, 0, 0, 0.08)'],
            '2xl': '0 25px 25px rgba(0, 0, 0, 0.15)',
            none: '0 0 #0000',
        },
        fill: function (theme) {
            var _a;
            return (__assign(__assign({}, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})), { none: 'none' }));
        },
        flex: {
            1: '1 1 0%',
            auto: '1 1 auto',
            initial: '0 1 auto',
            none: 'none',
        },
        flexGrow: {
            DEFAULT: '1',
            0: '0',
        },
        flexShrink: {
            DEFAULT: '1',
            0: '0',
        },
        fontFamily: {
            sans: [
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                '"Noto Sans"',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"',
            ],
            serif: [
                'ui-serif',
                'Georgia',
                'Cambria',
                '"Times New Roman"',
                'Times',
                'serif',
            ],
            mono: [
                'ui-monospace',
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace',
            ],
        },
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],
            sm: ['0.875rem', { lineHeight: '1.25rem' }],
            base: ['1rem', { lineHeight: '1.5rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            '5xl': ['3rem', { lineHeight: '1' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
            '7xl': ['4.5rem', { lineHeight: '1' }],
            '8xl': ['6rem', { lineHeight: '1' }],
            '9xl': ['8rem', { lineHeight: '1' }],
            // nxl -> [n rem, lineHeight: 1]
        },
        fontWeight: {
            thin: '100',
            extralight: '200',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900',
            // int[0, 900] -> int
        },
        gap: function (theme) { return theme('spacing'); },
        gradientColorStops: function (theme) { return theme('colors'); },
        grayscale: {
            DEFAULT: '100%',
            0: '0',
        },
        gridAutoColumns: {
            auto: 'auto',
            min: 'min-content',
            max: 'max-content',
            fr: 'minmax(0, 1fr)',
        },
        gridAutoRows: {
            auto: 'auto',
            min: 'min-content',
            max: 'max-content',
            fr: 'minmax(0, 1fr)',
        },
        gridColumn: {
            auto: 'auto',
            'span-1': 'span 1 / span 1',
            'span-2': 'span 2 / span 2',
            'span-3': 'span 3 / span 3',
            'span-4': 'span 4 / span 4',
            'span-5': 'span 5 / span 5',
            'span-6': 'span 6 / span 6',
            'span-7': 'span 7 / span 7',
            'span-8': 'span 8 / span 8',
            'span-9': 'span 9 / span 9',
            'span-10': 'span 10 / span 10',
            'span-11': 'span 11 / span 11',
            'span-12': 'span 12 / span 12',
            // span-int(>=1) -> span int / span int
            'span-full': '1 / -1',
        },
        gridColumnEnd: {
            auto: 'auto',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            13: '13',
            // int >=1 -> int
        },
        gridColumnStart: {
            auto: 'auto',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            13: '13',
            // int >=1 -> int
        },
        gridRow: {
            auto: 'auto',
            'span-1': 'span 1 / span 1',
            'span-2': 'span 2 / span 2',
            'span-3': 'span 3 / span 3',
            'span-4': 'span 4 / span 4',
            'span-5': 'span 5 / span 5',
            'span-6': 'span 6 / span 6',
            // span-int(>=1) -> span int / span int
            'span-full': '1 / -1',
        },
        gridRowStart: {
            auto: 'auto',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            // int >=1 -> int
        },
        gridRowEnd: {
            auto: 'auto',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            // int >=1 -> int
        },
        gridTemplateColumns: {
            none: 'none',
            1: 'repeat(1, minmax(0, 1fr))',
            2: 'repeat(2, minmax(0, 1fr))',
            3: 'repeat(3, minmax(0, 1fr))',
            4: 'repeat(4, minmax(0, 1fr))',
            5: 'repeat(5, minmax(0, 1fr))',
            6: 'repeat(6, minmax(0, 1fr))',
            7: 'repeat(7, minmax(0, 1fr))',
            8: 'repeat(8, minmax(0, 1fr))',
            9: 'repeat(9, minmax(0, 1fr))',
            10: 'repeat(10, minmax(0, 1fr))',
            11: 'repeat(11, minmax(0, 1fr))',
            12: 'repeat(12, minmax(0, 1fr))',
            // int >=1 -> repeat(int, minmax(0, 1fr))
        },
        gridTemplateRows: {
            none: 'none',
            1: 'repeat(1, minmax(0, 1fr))',
            2: 'repeat(2, minmax(0, 1fr))',
            3: 'repeat(3, minmax(0, 1fr))',
            4: 'repeat(4, minmax(0, 1fr))',
            5: 'repeat(5, minmax(0, 1fr))',
            6: 'repeat(6, minmax(0, 1fr))',
            // int >=1 -> repeat(int, minmax(0, 1fr))
        },
        height: function (theme, _a) {
            var _b, _c;
            var breakpoints = _a.breakpoints;
            return (__assign(__assign(__assign(__assign({}, ((_b = theme('spacing')) !== null && _b !== void 0 ? _b : {})), tShirtScale), { '1/2': '50%', '1/3': '33.333333%', '2/3': '66.666667%', '1/4': '25%', '2/4': '50%', '3/4': '75%', '1/5': '20%', '2/5': '40%', '3/5': '60%', '4/5': '80%', '1/6': '16.666667%', '2/6': '33.333333%', '3/6': '50%', '4/6': '66.666667%', '5/6': '83.333333%', 
                // fraction -> percent
                auto: 'auto', full: '100%', min: 'min-content', max: 'max-content', prose: '65ch', screen: '100vh' }), breakpoints((_c = theme('screens')) !== null && _c !== void 0 ? _c : {})));
        },
        hueRotate: {
            '-180': '-180deg',
            '-90': '-90deg',
            '-60': '-60deg',
            '-30': '-30deg',
            '-15': '-15deg',
            0: '0deg',
            15: '15deg',
            30: '30deg',
            60: '60deg',
            90: '90deg',
            180: '180deg',
        },
        inset: function (theme, _a) {
            var _b;
            var negative = _a.negative;
            return (__assign(__assign(__assign({ auto: 'auto' }, ((_b = theme('spacing')) !== null && _b !== void 0 ? _b : {})), negative(theme('spacing'))), { '1/2': '50%', '1/3': '33.333333%', '2/3': '66.666667%', '1/4': '25%', '2/4': '50%', '3/4': '75%', full: '100%', '-1/2': '-50%', '-1/3': '-33.333333%', '-2/3': '-66.666667%', '-1/4': '-25%', '-2/4': '-50%', '-3/4': '-75%', '-full': '-100%' }));
        },
        invert: {
            DEFAULT: '100%',
            0: '0',
        },
        keyframes: keyframes,
        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0em',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em',
        },
        lineHeight: {
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2',
            3: '.75rem',
            4: '1rem',
            5: '1.25rem',
            6: '1.5rem',
            7: '1.75rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem',
            // int>=0 -> int/4 rem
        },
        listStyleType: {
            none: 'none',
            circle: 'circle',
            square: 'square',
            disc: 'disc',
            decimal: 'decimal',
            'zero-decimal': 'decimal-leading-zero',
            greek: 'lower-greek',
            roman: 'lower-roman',
            alpha: 'lower-alpha',
            'upper-roman': 'upper-roman',
            'upper-alpha': 'upper-alpha',
        },
        margin: function (theme, _a) {
            var _b;
            var negative = _a.negative;
            return (__assign(__assign({ auto: 'auto' }, ((_b = theme('spacing')) !== null && _b !== void 0 ? _b : {})), negative(theme('spacing'))));
        },
        maxHeight: function (theme, _a) {
            var _b, _c;
            var breakpoints = _a.breakpoints;
            return (__assign(__assign(__assign(__assign({}, breakpoints((_b = theme('screens')) !== null && _b !== void 0 ? _b : {})), ((_c = theme('spacing')) !== null && _c !== void 0 ? _c : {})), tShirtScale), { none: 'none', full: '100%', min: 'min-content', max: 'max-content', prose: '65ch', screen: '100vh' }));
        },
        maxWidth: function (theme, _a) {
            var _b, _c;
            var breakpoints = _a.breakpoints;
            return (__assign(__assign(__assign(__assign({}, breakpoints((_b = theme('screens')) !== null && _b !== void 0 ? _b : {})), ((_c = theme('spacing')) !== null && _c !== void 0 ? _c : {})), tShirtScale), { none: 'none', full: '100%', min: 'min-content', max: 'max-content', prose: '65ch', screen: '100vw' }));
        },
        minHeight: function (theme) { return theme('maxHeight'); },
        minWidth: function (theme) { return theme('maxWidth'); },
        objectPosition: {
            bottom: 'bottom',
            center: 'center',
            left: 'left',
            'left-bottom': 'left bottom',
            'left-top': 'left top',
            right: 'right',
            'right-bottom': 'right bottom',
            'right-top': 'right top',
            top: 'top',
        },
        opacity: {
            0: '0',
            5: '0.05',
            10: '0.1',
            20: '0.2',
            25: '0.25',
            30: '0.3',
            40: '0.4',
            50: '0.5',
            60: '0.6',
            70: '0.7',
            75: '0.75',
            80: '0.8',
            90: '0.9',
            95: '0.95',
            100: '1',
            // float -> float/100
        },
        order: {
            first: '-9999',
            last: '9999',
            none: '0',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            // int[1, 9999]
        },
        outlineColor: function (theme) { return theme('colors'); },
        outlineWidth: {
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
        },
        outlineOffset: {
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
        },
        padding: function (theme) { return theme('spacing'); },
        perspective: function (theme) {
            var _a;
            return (__assign(__assign(__assign({}, ((_a = theme('spacing')) !== null && _a !== void 0 ? _a : {})), tShirtScale), { none: 'none' }));
        },
        perspectiveOrigin: {
            center: 'center',
            top: 'top',
            'top-right': 'top right',
            right: 'right',
            'bottom-right': 'bottom right',
            bottom: 'bottom',
            'bottom-left': 'bottom left',
            left: 'left',
            'top-left': 'top left',
        },
        placeholderColor: function (theme) { return theme('colors'); },
        placeholderOpacity: function (theme) { return theme('opacity'); },
        ringColor: function (theme) {
            var _a;
            return (__assign({ DEFAULT: theme('colors.blue.500', '#3b82f6') }, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})));
        },
        ringOffsetColor: function (theme) { return theme('colors'); },
        ringOffsetWidth: {
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
            // float -> float px
        },
        ringOpacity: function (theme) {
            var _a;
            return (__assign({ DEFAULT: '0.5' }, ((_a = theme('opacity')) !== null && _a !== void 0 ? _a : {})));
        },
        ringWidth: {
            DEFAULT: '3px',
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
            // float -> float px
        },
        rotate: {
            '-180': '-180deg',
            '-90': '-90deg',
            '-45': '-45deg',
            '-12': '-12deg',
            '-6': '-6deg',
            '-3': '-3deg',
            '-2': '-2deg',
            '-1': '-1deg',
            0: '0deg',
            1: '1deg',
            2: '2deg',
            3: '3deg',
            6: '6deg',
            12: '12deg',
            45: '45deg',
            90: '90deg',
            180: '180deg',
            // float[0, 360] -> float[0deg, 360deg]
            // ...negative
        },
        saturate: {
            DEFAULT: '0',
            0: '0',
            50: '.5',
            100: '1',
            150: '1.5',
            200: '2',
        },
        scale: {
            0: '0',
            50: '.5',
            75: '.75',
            90: '.9',
            95: '.95',
            100: '1',
            105: '1.05',
            110: '1.1',
            125: '1.25',
            150: '1.5',
            // int >=0 -> int/100
        },
        sepia: {
            DEFAULT: '100%',
            0: '0',
        },
        skew: {
            '-12': '-12deg',
            '-6': '-6deg',
            '-3': '-3deg',
            '-2': '-2deg',
            '-1': '-1deg',
            0: '0deg',
            1: '1deg',
            2: '2deg',
            3: '3deg',
            6: '6deg',
            12: '12deg',
            // float[0, 360] -> float[0deg, 360deg]
            // ...negative
        },
        space: function (theme, _a) {
            var negative = _a.negative;
            return (__assign(__assign({}, theme('spacing')), negative(theme('spacing'))));
        },
        stroke: function (theme) {
            var _a;
            return (__assign(__assign({}, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})), { none: 'none' }));
        },
        strokeWidth: {
            0: '0',
            1: '1',
            2: '2',
        },
        strokeDashArray: {
            0: '0',
            1: '1',
            2: '2',
        },
        strokeDashOffset: {
            0: '0',
            1: '1',
            2: '2',
        },
        tabSize: {
            DEFAULT: '4',
            0: '0',
            2: '2',
            4: '4',
            8: '8',
            // int >=0 -> int px
        },
        textColor: function (theme) { return theme('colors'); },
        textOpacity: function (theme) { return theme('opacity'); },
        textShadow: {
            DEFAULT: '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)',
            sm: '1px 1px 3px rgb(36 37 47 / 25%)',
            md: '0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)',
            lg: '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)',
            xl: '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)',
            none: 'none',
        },
        textDecorationColor: function (theme) { return theme('colors'); },
        textDecorationOpacity: function (theme) { return theme('opacity'); },
        textDecorationLength: {
            'auto': 'auto',
            0: '0px',
            2: '2px',
            4: '4px',
            8: '8px',
        },
        textDecorationOffset: {
            'auto': 'auto',
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
        },
        textDecorationThickness: {
            'auto': 'auto',
            'from-font': 'from-font',
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
        },
        textIndent: {
            DEFAULT: '1.5rem',
            xs: '0.5rem',
            sm: '1rem',
            md: '1.5rem',
            lg: '2rem',
            xl: '2.5rem',
            '2xl': '3rem',
            '3xl': '4rem',
        },
        textStrokeColor: function (theme) {
            var _a;
            return (__assign({ DEFAULT: theme('colors.gray.200', 'currentColor') }, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})));
        },
        textStrokeWidth: {
            DEFAULT: 'medium',
            'none': '0',
            'sm': 'thin',
            'md': 'medium',
            'lg': 'thick',
        },
        transformOrigin: {
            center: 'center',
            top: 'top',
            'top-right': 'top right',
            right: 'right',
            'bottom-right': 'bottom right',
            bottom: 'bottom',
            'bottom-left': 'bottom left',
            left: 'left',
            'top-left': 'top left',
        },
        transitionDuration: {
            DEFAULT: '150ms',
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms',
            // int >=0 -> int ms
        },
        transitionDelay: {
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms',
            // int >=0 -> int ms
        },
        transitionProperty: {
            DEFAULT: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
            none: 'none',
            all: 'all',
            colors: 'background-color, border-color, color, fill, stroke',
            opacity: 'opacity',
            shadow: 'box-shadow',
            transform: 'transform',
        },
        transitionTimingFunction: {
            DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
            linear: 'linear',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        translate: function (theme, _a) {
            var _b;
            var negative = _a.negative;
            return (__assign(__assign(__assign({}, ((_b = theme('spacing')) !== null && _b !== void 0 ? _b : {})), negative(theme('spacing'))), { '1/2': '50%', '1/3': '33.333333%', '2/3': '66.666667%', '1/4': '25%', '2/4': '50%', '3/4': '75%', full: '100%', '-1/2': '-50%', '-1/3': '-33.333333%', '-2/3': '-66.666667%', '-1/4': '-25%', '-2/4': '-50%', '-3/4': '-75%', '-full': '-100%' }));
        },
        width: function (theme, _a) {
            var _b, _c;
            var breakpoints = _a.breakpoints;
            return (__assign(__assign(__assign(__assign({}, ((_b = theme('spacing')) !== null && _b !== void 0 ? _b : {})), tShirtScale), { 
                // fraction -> percent
                '1/2': '50%', '1/3': '33.333333%', '2/3': '66.666667%', '1/4': '25%', '2/4': '50%', '3/4': '75%', '1/5': '20%', '2/5': '40%', '3/5': '60%', '4/5': '80%', '1/6': '16.666667%', '2/6': '33.333333%', '3/6': '50%', '4/6': '66.666667%', '5/6': '83.333333%', '1/12': '8.333333%', '2/12': '16.666667%', '3/12': '25%', '4/12': '33.333333%', '5/12': '41.666667%', '6/12': '50%', '7/12': '58.333333%', '8/12': '66.666667%', '9/12': '75%', '10/12': '83.333333%', '11/12': '91.666667%', auto: 'auto', full: '100%', min: 'min-content', max: 'max-content', prose: '65ch', screen: '100vw' }), breakpoints((_c = theme('screens')) !== null && _c !== void 0 ? _c : {})));
        },
        zIndex: {
            auto: 'auto',
            0: '0',
            10: '10',
            20: '20',
            30: '30',
            40: '40',
            50: '50',
            // int[0, 99999] ->  int[0, 99999]
            // ...negative
        },
    },
    variantOrder: variantOrder,
    plugins: [
        createPlugin(function (_a) {
            var addUtilities = _a.addUtilities;
            addUtilities({
                '.before\\:contents': {
                    '&::before': {
                        content: '""',
                        display: 'contents',
                    },
                },
                '.after\\:contents': {
                    '&::after': {
                        content: '""',
                        display: 'contents',
                    },
                },
            });
        }),
    ],
    handlers: {
        static: true,
        time: true,
        color: true,
        opacity: true,
        number: true,
        string: true,
        bracket: true,
        hex: true,
        nxl: true,
        fraction: true,
        size: true,
        variable: true,
        negative: true,
    },
};

// https://drafts.csswg.org/cssom/#serialize-an-identifier
function cssEscape(str) {
    var length = str.length;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = str.charCodeAt(0);
    while (++index < length) {
        codeUnit = str.charCodeAt(index);
        // Note: there’s no need to special-case astral symbols, surrogate
        // pairs, or lone surrogates.
        // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
        // (U+FFFD).
        if (codeUnit === 0x0000) {
            result += '\uFFFD';
            continue;
        }
        // Comma
        if (codeUnit === 44) {
            result += '\\2c ';
            continue;
        }
        if (
        // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
        // U+007F, […]
        (codeUnit >= 0x0001 && codeUnit <= 0x001f) ||
            codeUnit === 0x007f ||
            // If the character is the first character and is in the range [0-9]
            // (U+0030 to U+0039), […]
            (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
            // If the character is the second character and is in the range [0-9]
            // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
            (index === 1 &&
                codeUnit >= 0x0030 &&
                codeUnit <= 0x0039 &&
                firstCodeUnit === 0x002d)) {
            // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
            result += '\\' + codeUnit.toString(16) + ' ';
            continue;
        }
        if (
        // If the character is the first character and is a `-` (U+002D), and
        // there is no second character, […]
        index === 0 &&
            length === 1 &&
            codeUnit === 0x002d) {
            result += '\\' + str.charAt(index);
            continue;
        }
        // If the character is not handled by one of the above rules and is
        // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
        // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
        // U+005A), or [a-z] (U+0061 to U+007A), […]
        if (codeUnit >= 0x0080 ||
            codeUnit === 0x002d ||
            codeUnit === 0x005f ||
            (codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
            (codeUnit >= 0x0041 && codeUnit <= 0x005a) ||
            (codeUnit >= 0x0061 && codeUnit <= 0x007a)) {
            // the character itself
            result += str.charAt(index);
            continue;
        }
        // Otherwise, the escaped character.
        // https://drafts.csswg.org/cssom/#escape-a-character
        result += '\\' + str.charAt(index);
    }
    return result;
}

function combineConfig(a, b, arrayMergeDepth) {
    if (arrayMergeDepth === void 0) { arrayMergeDepth = Infinity; }
    var output = __assign({}, a);
    for (var _i = 0, _a = Object.entries(b); _i < _a.length; _i++) {
        var _b = _a[_i], key_of_b = _b[0], value_of_b = _b[1];
        if (key_of_b in a) {
            var value_of_a = a[key_of_b];
            if (value_of_a !== value_of_b) {
                if (value_of_b !== null && value_of_b.constructor !== Object) {
                    if (arrayMergeDepth > 0 && Array.isArray(value_of_a) && Array.isArray(value_of_b)) {
                        output[key_of_b] = __spreadArray(__spreadArray([], value_of_a, true), value_of_b, true);
                    }
                    else {
                        output[key_of_b] = value_of_b;
                    }
                }
                else if (value_of_a !== null && value_of_a.constructor === Object) {
                    output[key_of_b] = combineConfig(value_of_a, value_of_b, arrayMergeDepth - 1);
                }
                else if (Array.isArray(value_of_a)) {
                    output[key_of_b] = __spreadArray(__spreadArray([], value_of_a, true), Array.isArray(value_of_b) ? value_of_b : [value_of_b], true);
                }
                else {
                    output[key_of_b] = __assign({ DEFAULT: value_of_a }, value_of_b);
                }
            }
        }
        else {
            output[key_of_b] = value_of_b;
        }
    }
    return output;
}

function diffConfig(a, b) {
    if (typeof a !== typeof b)
        return b;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (JSON.stringify(a) !== JSON.stringify(b))
            return b;
        return;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        var output = {};
        for (var _i = 0, _a = Object.entries(b); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key in a) {
                var diff = diffConfig(a[key], b[key]);
                if (diff)
                    output[key] = diff;
            }
            else {
                output[key] = value;
            }
        }
        if (Object.keys(output).length === 0)
            return;
        return output;
    }
    if (a !== b)
        return b;
}

function createHandler(handlers) {
    if (handlers === void 0) { handlers = { static: true }; }
    return function (utility, value, color) {
        var handler = {
            utility: utility,
            value: value,
            color: color,
            _amount: utility.amount,
            handleStatic: handlers.static ? function (map, callback) {
                if (handler.value)
                    return handler;
                if (map && typeof map === 'object') {
                    var knownMap = map;
                    if (knownMap.DEFAULT)
                        knownMap[handler.utility.raw] = knownMap.DEFAULT;
                    if (handler._amount in knownMap)
                        handler.value = callback
                            ? callback(handler._amount)
                            : "".concat(knownMap[handler._amount]);
                }
                return handler;
            } : function () { return handler; },
            handleBody: handlers.static ? function (map, callback) {
                if (handler.value)
                    return handler;
                if (map && typeof map === 'object') {
                    var knownMap = map;
                    if (knownMap.DEFAULT)
                        knownMap[''] = knownMap.DEFAULT;
                    var body = handler.utility.body;
                    if (body in knownMap)
                        handler.value = callback ? callback(body) : "".concat(knownMap[body]);
                }
                return handler;
            } : function () { return handler; },
            handleNumber: handlers.number ? function (start, end, type, callback) {
                if (start === void 0) { start = -Infinity; }
                if (end === void 0) { end = Infinity; }
                if (type === void 0) { type = 'int'; }
                if (handler.value)
                    return handler;
                if (isNumber(handler._amount, start, end, type))
                    handler.value = callback ? callback(+handler._amount) : handler._amount;
                return handler;
            } : function () { return handler; },
            handleTime: handlers.time ? function (start, end, type, callback) {
                if (start === void 0) { start = -Infinity; }
                if (end === void 0) { end = Infinity; }
                if (type === void 0) { type = 'int'; }
                if (handler.value)
                    return handler;
                var unit = 'ms';
                var amount = handler._amount;
                if (amount.endsWith('ms')) {
                    amount = amount.slice(0, -2);
                }
                else if (amount.endsWith('s')) {
                    unit = 's';
                    amount = amount.slice(0, -1);
                }
                else {
                    return handler;
                }
                if (isNumber(amount, start, end, type))
                    handler.value = callback ? callback(unit === 's' ? +amount * 1000 : +amount) : handler._amount;
                return handler;
            } : function () { return handler; },
            handleString: handlers.string ? function (callback) {
                if (handler.value)
                    return handler;
                handler.value = callback(handler.utility.body);
                return handler;
            } : function () { return handler; },
            handleSquareBrackets: handlers.bracket ? function (callback) {
                if (handler.value)
                    return handler;
                if (handler._amount[0] === '[' && handler._amount[handler._amount.length - 1] === ']') {
                    var value_1 = handler._amount.slice(1, -1).replace(/_/g, ' '); // replace _ to space
                    if (value_1.indexOf('calc(') > -1) {
                        value_1 = value_1.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, '$1 $2 ');
                    }
                    handler.value = callback
                        ? callback(value_1)
                        : value_1;
                }
                return handler;
            } : function () { return handler; },
            handleSpacing: handlers.number ? function () {
                // just a short-hand for handle spacing.
                return handler.handleNumber(0, undefined, 'float', function (number) {
                    return number === 0 ? '0px' : "".concat(roundUp(number / 4, 6), "rem");
                });
            } : function () { return handler; },
            handleNxl: handlers.nxl ? function (callback) {
                if (handler.value)
                    return handler;
                if (/^\d*xl$/.test(handler._amount))
                    handler.value = callback
                        ? callback(handler._amount === 'xl' ? 1 : parseInt(handler._amount))
                        : parseInt(handler._amount).toString();
                return handler;
            } : function () { return handler; },
            handleFraction: handlers.fraction ? function (callback) {
                if (handler.value)
                    return handler;
                if (isFraction(handler._amount))
                    handler.value = callback
                        ? callback(handler._amount)
                        : fracToPercent(handler._amount);
                return handler;
            } : function () { return handler; },
            handleSize: handlers.size ? function (callback) {
                if (handler.value)
                    return handler;
                if (isSize(handler._amount))
                    handler.value = callback ? callback(handler._amount) : handler._amount;
                return handler;
            } : function () { return handler; },
            handleVariable: handlers.variable ? function (callback) {
                if (handler.value)
                    return handler;
                var matchVariable = handler.utility.raw.match(/-\$[\w-]+/);
                if (matchVariable) {
                    var variableName = matchVariable[0].substring(2);
                    handler.value = callback ? callback(variableName) : "var(--".concat(variableName, ")");
                }
                return handler;
            } : function () { return handler; },
            handleColor: handlers.color ? function (map) {
                if (map === void 0) { map = defaultColors; }
                if (handler.value)
                    return handler;
                var color;
                if (map && typeof map === 'object') {
                    var colors = flatColors(map);
                    var body = handler.utility.raw.replace(/^ring-offset|outline-solid|outline-dotted/, 'head').replace(/^\w+-/, '');
                    var _a = splitColorGroup(body), key = _a[0], opacity = _a[1];
                    handler.opacity = opacity;
                    if (key in colors) {
                        color = colors[key];
                    }
                    else if (handlers.hex && key.startsWith('hex-')) {
                        var hex = key.slice(4);
                        if (hex2RGB(hex))
                            color = '#' + hex;
                    }
                    if (typeof color === 'string') {
                        handler.value = color;
                    }
                    else if (typeof color === 'function') {
                        handler.color = color;
                    }
                }
                return handler;
            } : function () { return handler; },
            handleOpacity: handlers.opacity ? function (map) {
                if (handler.opacity && typeof map === 'object') {
                    var _map = map;
                    if (handlers.static && handler.opacity in _map) {
                        handler.opacity = _map[handler.opacity];
                    }
                    else if (handlers.number && isNumber(handler.opacity, 0, 100, 'int')) {
                        handler.opacity = (+handler.opacity / 100).toString();
                    }
                    else if (handlers.variable && handler.opacity.charAt(0) === '$') {
                        handler.opacity = "var(--".concat(handler.opacity.slice(1), ")");
                    }
                    else if (handlers.bracket && handler.opacity.charAt(0) === '[' && handler.opacity.charAt(handler.opacity.length - 1) === ']') {
                        handler.opacity = handler.opacity.slice(1, -1).replace(/_/g, ' ');
                    }
                    else {
                        handler.opacity = undefined;
                    }
                }
                return handler;
            } : function () { return handler; },
            handleNegative: handlers.negative ? function (callback) {
                if (callback === void 0) { callback = negateValue; }
                if (!handler.value)
                    return handler;
                handler.value = handler.utility.isNegative ? callback(handler.value) : handler.value;
                return handler;
            } : function () { return handler; },
            createProperty: function (name, callback) {
                if (!handler.value)
                    return;
                var value = callback ? callback(handler.value) : handler.value;
                return new Property(name, value);
            },
            createStyle: function (selector, callback) {
                if (!handler.value)
                    return;
                var value = callback ? callback(handler.value) : undefined;
                return new Style(selector, value);
            },
            createColorValue: function (opacityValue) {
                if (handler.color)
                    return handler.color({ opacityValue: opacityValue });
                if (handler.value) {
                    if (['transparent', 'currentColor', 'inherit', 'auto', 'none'].includes(handler.value))
                        return handler.value;
                    if (handler.value.includes('var') && opacityValue)
                        return "rgba(".concat(handler.value, ", ").concat(handler.opacity || opacityValue, ")");
                    return opacityValue ? "rgba(".concat(toColor(handler.value).color, ", ").concat(handler.opacity || opacityValue, ")") : "rgb(".concat(toColor(handler.value).color, ")");
                }
            },
            createColorStyle: function (selector, property, opacityVariable, wrapRGB) {
                if (wrapRGB === void 0) { wrapRGB = true; }
                if (handler.color) {
                    var value_2 = handler.color({ opacityVariable: opacityVariable, opacityValue: opacityVariable ? "var(".concat(opacityVariable, ")") : undefined });
                    if (opacityVariable) {
                        return new Style(selector, [
                            new Property(opacityVariable, handler.opacity || '1'),
                            new Property(property, value_2),
                        ]);
                    }
                    return new Style(selector, new Property(property, value_2));
                }
                var color = handler.value;
                if (!color)
                    return;
                if (['transparent', 'currentColor', 'inherit', 'auto', 'none'].includes(color) || color.includes('var'))
                    return new Style(selector, new Property(property, color));
                var rgb = toColor(color);
                if (opacityVariable) {
                    return new Style(selector, [
                        new Property(opacityVariable, handler.opacity || rgb.opacity),
                        new Property(property, "rgba(".concat(rgb.color, ", var(").concat(opacityVariable, "))")),
                    ]);
                }
                return new Style(selector, new Property(property, wrapRGB ? "rgb(".concat(rgb.color, ")") : rgb.color));
            },
            callback: function (func) {
                if (!handler.value)
                    return;
                return func(handler.value);
            },
        };
        return handler;
    };
}
var Utility = /** @class */ (function () {
    function Utility(raw, _h) {
        this.raw = raw; // -placeholder-real-gray-300
        this._h = _h;
    }
    Utility.prototype.match = function (expression) {
        var match = this.absolute.match(expression);
        return match ? match[0] : '';
    };
    Utility.prototype.clone = function (raw) {
        return new Utility(raw || this.raw, this._h);
    };
    Object.defineProperty(Utility.prototype, "class", {
        get: function () {
            return '.' + cssEscape(this.raw); // .-placeholder-real-gray-300
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utility.prototype, "isNegative", {
        get: function () {
            return this.raw[0] === '-'; // true
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utility.prototype, "absolute", {
        get: function () {
            return this.isNegative ? this.raw.substring(1) : this.raw;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utility.prototype, "identifier", {
        get: function () {
            return this.match(/[^-]+/); // placeholder
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utility.prototype, "key", {
        get: function () {
            return this.match(/^\w[-\w]+(?=-)/); // placeholder-real-gray
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utility.prototype, "center", {
        get: function () {
            return this.match(/-.+(?=-)/).substring(1); // real-gray
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utility.prototype, "amount", {
        get: function () {
            return this.match(/(?:[^-]+|\[[\s\S]*?\])$/); // 300
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utility.prototype, "body", {
        get: function () {
            return this.match(/-.+/).substring(1); // real-gray-300
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utility.prototype, "handler", {
        get: function () {
            return this._h(this);
        },
        enumerable: false,
        configurable: true
    });
    return Utility;
}());

function generateStaticStyle(processor, className, addComment) {
    if (addComment === void 0) { addComment = false; }
    // eslint-disable-next-line no-prototype-builtins
    if (!staticUtilities.hasOwnProperty(className))
        return;
    var style = new Style('.' + className);
    var comment = addComment ? className : undefined;
    var _a = staticUtilities[className], utility = _a.utility, meta = _a.meta;
    var _loop_1 = function (key, value) {
        style.add(Array.isArray(value)
            ? value.map(function (i) { return new Property(key, i, comment); })
            : new Property(key, value, comment));
    };
    for (var _i = 0, _b = Object.entries(utility); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], value = _c[1];
        _loop_1(key, value);
    }
    if (processor._plugin.core && !processor._plugin.core[meta.group])
        return;
    return style.updateMeta('utilities', meta.group, pluginOrder[meta.group], meta.order, true);
}
function extract(processor, className, addComment, prefix) {
    if (addComment === void 0) { addComment = false; }
    if (prefix && !className.startsWith(prefix))
        return;
    // handle static base utilities
    if (!prefix && className in staticUtilities)
        return generateStaticStyle(processor, className, addComment);
    if (prefix && className.startsWith(prefix)) {
        className = className.replace(new RegExp("^".concat(prefix)), '');
        if (className in staticUtilities)
            return generateStaticStyle(processor, className, addComment);
    }
    // handle static plugin utilities & components
    var staticPlugins = __assign(__assign(__assign({}, processor._plugin.utilities), processor._plugin.components), processor._plugin.shortcuts);
    if (className in staticPlugins)
        return deepCopy(staticPlugins[className]);
    var utility = new Utility(className, processor._handler);
    // handle dynamic plugin utilities
    for (var _i = 0, _a = Object.entries(processor._plugin.dynamic); _i < _a.length; _i++) {
        var _b = _a[_i], key_1 = _b[0], generator = _b[1];
        if (className.match(new RegExp("^-?".concat(key_1)))) {
            var style = generator(utility);
            if (style instanceof Property)
                style = style.toStyle(utility.class);
            if (style && addComment)
                Array.isArray(style)
                    ? style.map(function (i) { return i.property.forEach(function (p) { return (p.comment = className); }); })
                    : style.property.forEach(function (p) { return (p.comment = className); });
            if (style)
                return style;
        }
    }
    // handle dynamic base utilities
    var matches = className.match(/\w+/);
    var key = matches ? matches[0] : undefined;
    // eslint-disable-next-line no-prototype-builtins
    if (key && dynamicUtilities.hasOwnProperty(key)) {
        var style = dynamicUtilities[key](utility, processor.pluginUtils);
        if (!style)
            return;
        if (processor._plugin.core && !processor._plugin.core[Array.isArray(style) ? style[0].meta.group : style.meta.group])
            return;
        if (style instanceof Property)
            style = style.toStyle(utility.class);
        if (addComment)
            Array.isArray(style) ? style.map(function (i) { return i.property.forEach(function (p) { return (p.comment = className); }); }) : style.property.forEach(function (p) { return (p.comment = className); });
        return style;
    }
}

function testStatic(processor, className) {
    // eslint-disable-next-line no-prototype-builtins
    if (!staticUtilities.hasOwnProperty(className))
        return false;
    var meta = staticUtilities[className].meta;
    if (processor._plugin.core && !processor._plugin.core[meta.group])
        return false;
    return true;
}
function test(processor, className, prefix) {
    // handle static base utilities
    if (!prefix && className in staticUtilities)
        return testStatic(processor, className);
    if (prefix && className.startsWith(prefix)) {
        className = className.replace(new RegExp("^".concat(prefix)), '');
        if (className in staticUtilities)
            return testStatic(processor, className);
    }
    // handle static plugin utilities & components
    var staticPlugins = __assign(__assign(__assign({}, processor._plugin.utilities), processor._plugin.components), processor._plugin.shortcuts);
    if (className in staticPlugins)
        return true;
    var utility = new Utility(className, processor._handler);
    // handle dynamic plugin utilities
    for (var _i = 0, _a = Object.entries(processor._plugin.dynamic); _i < _a.length; _i++) {
        var _b = _a[_i], key_1 = _b[0], generator = _b[1];
        if (className.match(new RegExp("^-?".concat(key_1)))) {
            if (generator(utility))
                return true;
        }
    }
    // handle dynamic base utilities
    var matches = className.match(/\w+/);
    var key = matches ? matches[0] : undefined;
    // eslint-disable-next-line no-prototype-builtins
    if (key && dynamicUtilities.hasOwnProperty(key)) {
        var style = dynamicUtilities[key](utility, processor.pluginUtils);
        if (!style)
            return false;
        if (processor._plugin.core && !processor._plugin.core[Array.isArray(style) ? style[0].meta.group : style.meta.group])
            return false;
        return true;
    }
    return false;
}

function preflight(processor, html, includeBase, includeGlobal, includePlugins) {
    if (includeBase === void 0) { includeBase = true; }
    if (includeGlobal === void 0) { includeGlobal = true; }
    if (includePlugins === void 0) { includePlugins = true; }
    // Generate preflight style based on html tags.
    var globalSheet = new StyleSheet();
    var styleSheet = new StyleSheet();
    var pluginSheet = new StyleSheet();
    var createStyle = function (selector, properties, isGlobal) {
        if (isGlobal === void 0) { isGlobal = false; }
        var style = new Style(selector, undefined, false);
        var _loop_1 = function (key, value) {
            style.add(Array.isArray(value)
                ? value.map(function (v) { return new Property(key, v); })
                : new Property(key, typeof value === 'function' ? value(function (path, defaultValue) { return processor.theme(path, defaultValue); }) : value));
        };
        for (var _i = 0, _a = Object.entries(properties); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            _loop_1(key, value);
        }
        style.updateMeta('base', 'preflight', 0, isGlobal ? 1 : 2, true);
        return style;
    };
    var safelist = processor.config('preflight.safelist', []);
    var tags = html ? safelist.concat(Array.from(new Set(html.match(/<\w+/g))).map(function (i) { return i.substring(1); })) : undefined;
    // handle base style
    includeBase && (processor.config('prefixer') ? preflights : preflights.filter(function (i) { return !i.selector || !/::?(webkit-input|-moz|-ms-input)-placeholder$/.test(i.selector); })).forEach(function (p) {
        if (includeGlobal && p.global) {
            // global style, such as * or html, body
            globalSheet.add(createStyle(p.selector, p.properties, true));
        }
        else if (tags !== undefined) {
            // only generate matched styles
            var includeTags = tags.filter(function (i) { return p.keys.includes(i); });
            if (includeTags.length > 0)
                styleSheet.add(createStyle(p.selector ? p.selector : includeTags.join(', '), p.properties));
        }
        else {
            // if no tags input, generate all styles
            styleSheet.add(createStyle(p.selector ? p.selector : p.keys.join(', '), p.properties));
        }
    });
    // handle plugin style
    if (includePlugins) {
        // base Styles
        var preflightList_1 = [];
        Object.values(processor._plugin.preflights).forEach(function (styles) {
            preflightList_1 = preflightList_1.concat(styles);
        });
        pluginSheet.add(preflightList_1);
        // always generated styles
        var staticList_1 = [];
        Object.values(processor._plugin.static).forEach(function (styles) {
            staticList_1 = staticList_1.concat(styles);
        });
        pluginSheet.add(staticList_1);
    }
    var result = styleSheet.combine().sort().extend(pluginSheet.combine().sort());
    return includeGlobal ? result.extend(globalSheet.combine().sort(), false) : result;
}

var ClassParser = /** @class */ (function () {
    function ClassParser(classNames, separator, variants) {
        if (separator === void 0) { separator = ':'; }
        this.classNames = classNames;
        this.separator = separator;
        this.variants = variants || [];
        this.index = 0;
    }
    ClassParser.prototype._handle_group = function (removeDuplicated) {
        if (removeDuplicated === void 0) { removeDuplicated = true; }
        if (!this.classNames)
            return [];
        var preChar;
        var char;
        var group;
        var func;
        var variant;
        var variants = [];
        var variantStart = this.index + 1;
        var classStart = this.index + 1;
        var groupStart = this.index + 1;
        var important = false;
        var ignoreSpace = false;
        var ignoreBracket = false;
        var insideSquareBracket = false;
        var brackets = 0;
        var sepLength = this.separator.length;
        var parts = [];
        var length = this.classNames.length;
        while (this.index < length) {
            this.index++;
            char = this.classNames.charAt(this.index);
            // ignore parsing and leave content inside square brackets as-is
            if (insideSquareBracket) {
                if (' \n\t\r'.includes(char)) {
                    insideSquareBracket = false;
                }
                else {
                    if (char === ']')
                        insideSquareBracket = false;
                    continue;
                }
            }
            // handle chars
            switch (char) {
                case '!':
                    important = true;
                    break;
                case this.separator[0]:
                    if (this.classNames.slice(this.index, this.index + sepLength) === this.separator) {
                        variant = this.classNames.slice(variantStart, this.index);
                        if (variant.charAt(0) === '!')
                            variant = variant.slice(1);
                        if (this.variants.includes(variant)) {
                            variants.push(variant);
                            this.index += sepLength - 1;
                            variantStart = this.index + 1;
                            ignoreSpace = true;
                        }
                    }
                    break;
                case '[':
                    insideSquareBracket = true;
                    break;
                case '(':
                    preChar = this.classNames.charAt(this.index - 1);
                    if (preChar === '-' || (!ignoreSpace && preChar === ' ')) {
                        ignoreBracket = true;
                    }
                    else if (ignoreSpace) {
                        group = this._handle_group();
                    }
                    else {
                        brackets += 1;
                        func = this.classNames.slice(groupStart, this.index);
                        while (!isSpace(this.classNames.charAt(this.index))) {
                            this.index++;
                        }
                        this.index--;
                    }
                    ignoreSpace = false;
                    break;
                case '"':
                case '`':
                case '\'':
                case ')':
                case ' ':
                case '\n':
                case '\t':
                case '\r':
                    if (!ignoreSpace) {
                        if (groupStart !== this.index) {
                            var raw = this.classNames.slice(classStart, this.index);
                            var start = classStart - 1;
                            var end = this.index - 1;
                            if (Array.isArray(group)) {
                                parts.push({ raw: raw, start: start, end: end, variants: variants, content: group, type: 'group', important: important });
                                group = undefined;
                            }
                            else if (func) {
                                var utility = this.classNames.slice(variantStart, this.index);
                                parts.push({ raw: raw, start: start, end: end, variants: variants, content: utility, type: 'utility', important: important });
                                func = undefined;
                            }
                            else if (ignoreBracket && char === ')') {
                                // utility with bracket
                                var utility = this.classNames.slice(variantStart, this.index + 1);
                                parts.push({ raw: raw + ')', start: start, end: this.index, variants: variants, content: important ? utility.slice(1) : utility, type: 'utility', important: important });
                            }
                            else {
                                var utility = this.classNames.slice(variantStart, this.index);
                                if (utility.charAt(0) === '*') {
                                    parts.push({ raw: raw, start: start, end: end, variants: variants, content: utility.slice(1), type: 'alias', important: important });
                                }
                                else {
                                    parts.push({ raw: raw, start: start, end: end, variants: variants, content: utility.charAt(0) === '!' ? utility.slice(1) : utility, type: 'utility', important: important });
                                }
                            }
                            variants = [];
                            important = false;
                        }
                        groupStart = this.index + 1;
                        classStart = this.index + 1;
                    }
                    variantStart = this.index + 1;
                    break;
                default:
                    ignoreSpace = false;
            }
            if (char === ')') {
                brackets -= 1;
                if (!ignoreBracket && brackets < 0)
                    break; // end group
                ignoreBracket = false;
            }
        }
        if (removeDuplicated) {
            var newParts_1 = [];
            var cache_1 = [];
            parts.forEach(function (item) {
                if (!cache_1.includes(item.raw)) {
                    cache_1.push(item.raw);
                    newParts_1.push(item);
                }
            });
            return newParts_1;
        }
        return parts;
    };
    ClassParser.prototype.parse = function (removeDuplicated) {
        if (removeDuplicated === void 0) { removeDuplicated = true; }
        if (!this.classNames)
            return [];
        // Turn classes into group;
        this.classNames = '(' + this.classNames + ')';
        var elements = this._handle_group(removeDuplicated);
        // Initialization, convenient for next call
        this.index = 0;
        this.classNames = this.classNames.slice(1, -1);
        return elements;
    };
    return ClassParser;
}());

/* toSource by Marcello Bastea-Forte - zlib license */
function toSource(object, replacer, indent = '  ', startingIndent = '') {
    const seen = [];
    return walk(object, replacer, indent === false ? '' : indent, startingIndent, seen);
    function walk(object, replacer, indent, currentIndent, seen) {
        const nextIndent = currentIndent + indent;
        object = replacer ? replacer(object) : object;
        switch (typeof object) {
            case 'string':
                return JSON.stringify(object);
            case 'number':
                if (Object.is(object, -0)) {
                    return '-0';
                }
                return String(object);
            case 'boolean':
            case 'undefined':
                return String(object);
            case 'function':
                return object.toString();
        }
        if (object === null) {
            return 'null';
        }
        if (object instanceof RegExp) {
            return object.toString();
        }
        if (object instanceof Date) {
            return `new Date(${object.getTime()})`;
        }
        if (object instanceof Set) {
            return `new Set(${walk(Array.from(object.values()), replacer, indent, nextIndent, seen)})`;
        }
        if (object instanceof Map) {
            return `new Map(${walk(Array.from(object.entries()), replacer, indent, nextIndent, seen)})`;
        }
        if (seen.indexOf(object) >= 0) {
            return '{$circularReference:1}';
        }
        seen.push(object);
        function join(elements) {
            return (indent.slice(1) +
                elements.join(',' + (indent && '\n') + nextIndent) +
                (indent ? ' ' : ''));
        }
        if (Array.isArray(object)) {
            return `[${join(object.map((element) => walk(element, replacer, indent, nextIndent, seen.slice())))}]`;
        }
        const keys = Object.keys(object);
        if (keys.length) {
            return `{${join(keys.map((key) => (legalKey(key) ? key : JSON.stringify(key)) +
                ':' +
                walk(object[key], replacer, indent, nextIndent, seen.slice())))}}`;
        }
        return '{}';
    }
}
const KEYWORD_REGEXP = /^(abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with)$/;
function legalKey(key) {
    return (/^([a-z_$][0-9a-z_$]*|[0-9]+)$/gi.test(key) && !KEYWORD_REGEXP.test(key));
}

var Processor = /** @class */ (function () {
    function Processor(config) {
        var _this = this;
        this._variants = {};
        this._cache = {
            count: 0,
            html: [],
            attrs: [],
            classes: [],
            utilities: [],
            variants: [],
        };
        this._plugin = {
            static: {},
            dynamic: {},
            utilities: {},
            components: {},
            preflights: {},
            shortcuts: {},
            alias: {},
            completions: {},
        };
        this.pluginUtils = {
            addDynamic: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.addDynamic.apply(_this, args);
            },
            addUtilities: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.addUtilities.apply(_this, args);
            },
            addComponents: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.addComponents.apply(_this, args);
            },
            addBase: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.addBase.apply(_this, args);
            },
            addVariant: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.addVariant.apply(_this, args);
            },
            e: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.e.apply(_this, args);
            },
            prefix: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.prefix.apply(_this, args);
            },
            config: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.config.apply(_this, args);
            },
            theme: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.theme.apply(_this, args);
            },
            variants: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.variants.apply(_this, args);
            },
        };
        this.variantUtils = {
            modifySelectors: function (modifier) {
                return new Style().wrapSelector(function (selector) {
                    return modifier({
                        className: /^[.#]/.test(selector) ? selector.substring(1) : selector,
                    });
                });
            },
            atRule: function (name) { return new Style().atRule(name); },
            pseudoClass: function (name) { return new Style().pseudoClass(name); },
            pseudoElement: function (name) { return new Style().pseudoElement(name); },
            parent: function (name) { return new Style().parent(name); },
            child: function (name) { return new Style().child(name); },
        };
        this._config = this.resolveConfig(config, baseConfig);
        this._theme = this._config.theme;
        this._handler = createHandler(this._config.handlers);
        this._config.shortcuts && this.loadShortcuts(this._config.shortcuts);
        this._config.alias && this.loadAlias(this._config.alias);
        if (this._config.preflight && this._config.preflight.safelist) {
            if (typeof this._config.preflight.safelist === 'string') {
                this._config.preflight.safelist = this._config.preflight.safelist.split(/\s+/);
            }
        }
    }
    Processor.prototype._resolveConfig = function (userConfig, presets) {
        var _a;
        if (presets === void 0) { presets = {}; }
        if (userConfig.presets) {
            var resolved = this._resolvePresets(userConfig.presets);
            presets = this._resolveConfig(resolved, presets);
            delete userConfig.presets;
        }
        var userTheme = userConfig.theme;
        if (userTheme)
            delete userConfig.theme;
        var extendTheme = userTheme && 'extend' in userTheme ? (_a = userTheme.extend) !== null && _a !== void 0 ? _a : {} : {};
        var theme = (presets.theme || {});
        if (userTheme) {
            if ('extend' in userTheme)
                delete userTheme.extend;
            for (var _i = 0, _b = Object.entries(userTheme); _i < _b.length; _i++) {
                var _c = _b[_i], key = _c[0], value = _c[1];
                theme[key] = typeof value === 'function' ? value : __assign({}, value);
            }
        }
        if (extendTheme && typeof extendTheme === 'object')
            this._reduceFunction(theme, extendTheme);
        return __assign(__assign(__assign({}, presets), userConfig), { theme: theme });
    };
    Processor.prototype._reduceFunction = function (theme, extendTheme) {
        var _loop_1 = function (key, value) {
            var themeValue = theme[key];
            switch (typeof themeValue) {
                case 'function':
                    theme[key] = function (theme, _a) {
                        var negative = _a.negative, breakpoints = _a.breakpoints;
                        return combineConfig(themeValue(theme, { negative: negative, breakpoints: breakpoints }), (typeof value === 'function' ? value(theme, { negative: negative, breakpoints: breakpoints }) : value !== null && value !== void 0 ? value : {}));
                    };
                    break;
                case 'object':
                    theme[key] = function (theme, _a) {
                        var negative = _a.negative, breakpoints = _a.breakpoints;
                        return combineConfig(themeValue, (typeof value === 'function' ? value(theme, { negative: negative, breakpoints: breakpoints }) : value !== null && value !== void 0 ? value : {}), 0 /* prevent fontfamily merge */);
                    };
                    break;
                default:
                    theme[key] = value;
            }
        };
        for (var _i = 0, _a = Object.entries(extendTheme); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            _loop_1(key, value);
        }
    };
    Processor.prototype._resolvePresets = function (presets) {
        var _this = this;
        var config = {};
        var extend = {};
        presets.forEach(function (p) {
            if (p.theme && 'extend' in p.theme && p.theme.extend) {
                _this._reduceFunction(extend, p.theme.extend);
                delete p.theme.extend;
            }
            config = _this._resolveConfig(p, config);
        });
        if (config.theme) {
            config.theme.extend = extend;
        }
        else {
            config.theme = { extend: extend };
        }
        return config;
    };
    Processor.prototype._resolveFunction = function (config) {
        var _this = this;
        var _a;
        if (!config.theme)
            return config;
        var theme = function (path, defaultValue) { return _this.theme(path, defaultValue); };
        for (var _i = 0, _b = [config.theme, 'extend' in config.theme ? (_a = config.theme.extend) !== null && _a !== void 0 ? _a : {} : {}]; _i < _b.length; _i++) {
            var dict = _b[_i];
            for (var _c = 0, _d = Object.entries(dict); _c < _d.length; _c++) {
                var _e = _d[_c], key = _e[0], value = _e[1];
                if (typeof value === 'function') {
                    dict[key] = value(theme, {
                        negative: negative,
                        breakpoints: breakpoints,
                    });
                }
            }
        }
        return config;
    };
    Processor.prototype._replaceStyleVariants = function (styles) {
        var _this = this;
        // @screen sm -> @screen (min-width: 640px)
        styles.forEach(function (style) {
            var _a;
            style.atRules = (_a = style.atRules) === null || _a === void 0 ? void 0 : _a.map(function (i) {
                var _a;
                if (i.match(/@screen/)) {
                    var variant = i.replace(/\s*@screen\s*/, '');
                    var atRule = (_a = _this._variants[variant]().atRules) === null || _a === void 0 ? void 0 : _a[0];
                    return atRule !== null && atRule !== void 0 ? atRule : i;
                }
                return i;
            });
        });
    };
    Processor.prototype._addPluginProcessorCache = function (type, key, styles) {
        styles = toArray(styles);
        this._plugin[type][key] = key in this._plugin[type]
            ? __spreadArray(__spreadArray([], this._plugin[type][key], true), styles, true) : styles;
    };
    Processor.prototype._loadVariables = function () {
        var config = this.theme('vars');
        if (!config)
            return;
        this.addBase({ ':root': Object.assign.apply(Object, __spreadArray([{}], Object.keys(config).map(function (i) {
                var _a;
                return (_a = {}, _a["--".concat(i)] = config[i], _a);
            }), false)) });
    };
    Processor.prototype.loadConfig = function (config) {
        this._config = this.resolveConfig(config, baseConfig);
        this._theme = this._config.theme;
        this._handler = createHandler(this._config.handlers);
        this._config.shortcuts && this.loadShortcuts(this._config.shortcuts);
        this._config.alias && this.loadAlias(this._config.alias);
        return this._config;
    };
    Processor.prototype.resolveConfig = function (config, presets) {
        var _this = this;
        var _a;
        this._config = this._resolveConfig(__assign(__assign({}, deepCopy(config ? config : {})), { exclude: config === null || config === void 0 ? void 0 : config.exclude }), deepCopy(presets)); // deep copy
        this._theme = this._config.theme; // update theme to make sure theme() function works.
        (_a = this._config.plugins) === null || _a === void 0 ? void 0 : _a.map(function (i) { return typeof i === 'function' ? ('__isOptionsFunction' in i ? _this.loadPluginWithOptions(i) : _this.loadPlugin(createPlugin(i))) : _this.loadPlugin(i); });
        this._config = this._resolveFunction(this._config);
        this._variants = __assign(__assign({}, this._variants), this.resolveVariants());
        this._cache.variants = Object.keys(this._variants);
        this._loadVariables();
        if (this._config.corePlugins)
            this._plugin.core = Array.isArray(this._config.corePlugins) ? Object.assign.apply(Object, __spreadArray([{}], this._config.corePlugins.map(function (i) {
                var _a;
                return (_a = {}, _a[i] = true, _a);
            }), false)) : __assign(__assign({}, Object.assign.apply(Object, __spreadArray([{}], Object.keys(pluginOrder).slice(Object.keys(pluginOrder).length / 2).map(function (i) {
                var _a;
                return (_a = {}, _a[i] = true, _a);
            }), false))), this._config.corePlugins);
        return this._config;
    };
    Processor.prototype.resolveVariants = function (type) {
        var variants = resolveVariants(this._config);
        if (type) {
            return variants[type];
        }
        return __assign(__assign(__assign(__assign({}, variants.screen), variants.theme), variants.state), variants.orientation);
    };
    Processor.prototype.resolveStaticUtilities = function (includePlugins) {
        if (includePlugins === void 0) { includePlugins = false; }
        var staticStyles = {};
        for (var key in staticUtilities) {
            var style = generateStaticStyle(this, key, true);
            if (style)
                staticStyles[key] = [style];
        }
        if (!includePlugins)
            return staticStyles;
        return __assign(__assign(__assign({}, staticStyles), this._plugin.utilities), this._plugin.components);
    };
    Processor.prototype.resolveDynamicUtilities = function (includePlugins) {
        if (includePlugins === void 0) { includePlugins = false; }
        if (!includePlugins)
            return dynamicUtilities;
        return __assign(__assign({}, dynamicUtilities), this._plugin.dynamic);
    };
    Object.defineProperty(Processor.prototype, "allConfig", {
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Processor.prototype, "allTheme", {
        get: function () {
            var _a;
            return ((_a = this._theme) !== null && _a !== void 0 ? _a : {});
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Processor.prototype, "allVariant", {
        get: function () {
            return this._cache.variants;
        },
        enumerable: false,
        configurable: true
    });
    Processor.prototype.wrapWithVariants = function (variants, styles) {
        var _this = this;
        // apply variant to style
        if (!Array.isArray(styles))
            styles = [styles];
        if (variants.length === 0)
            return styles;
        return styles.map(function (style) {
            if (style instanceof Keyframes)
                return style;
            var atrules = [];
            var wrapped = variants
                .filter(function (i) { var _a; return (_a = _this._variants) === null || _a === void 0 ? void 0 : _a[i]; })
                .map(function (i) { return _this._variants[i](); })
                .reduce(function (previousValue, currentValue) {
                var output = previousValue.extend(currentValue);
                if (previousValue.isAtrule)
                    atrules.push(previousValue.atRules[0]);
                return output;
            }, new Style())
                .extend(style);
            if (style instanceof Container)
                wrapped = new Container().extend(wrapped);
            if (atrules.length > 0)
                wrapped.meta.variants = atrules;
            return wrapped;
        });
    };
    Processor.prototype.removePrefix = function (className) {
        var prefix = this.config('prefix');
        return prefix ? className.replace(new RegExp("^".concat(prefix)), '') : className;
    };
    Processor.prototype.markAsImportant = function (style, force) {
        if (force === void 0) { force = false; }
        var _important = force ? force : this.config('important', false);
        var important = typeof _important === 'string' ? _important : _important;
        if (important) {
            if (typeof important === 'string') {
                style.parent(important);
            }
            else {
                style.important = true;
                style.property.forEach(function (i) { return i.important = true; });
            }
        }
        return style;
    };
    Processor.prototype.extract = function (className, addComment, prefix) {
        if (addComment === void 0) { addComment = false; }
        return extract(this, className, addComment, prefix);
    };
    Processor.prototype.test = function (className, prefix) {
        return test(this, className, prefix);
    };
    Processor.prototype.preflight = function (html, includeBase, includeGlobal, includePlugins, ignoreProcessed) {
        if (includeBase === void 0) { includeBase = true; }
        if (includeGlobal === void 0) { includeGlobal = true; }
        if (includePlugins === void 0) { includePlugins = true; }
        if (ignoreProcessed === void 0) { ignoreProcessed = false; }
        var id;
        if (html) {
            id = hash(html);
            if (ignoreProcessed && this._cache.html.includes(id))
                return new StyleSheet();
        }
        id && ignoreProcessed && this._cache.html.push(id);
        return preflight(this, html, includeBase, includeGlobal, includePlugins);
    };
    Processor.prototype.interpret = function (classNames, ignoreProcessed, handleIgnored) {
        var _this = this;
        if (ignoreProcessed === void 0) { ignoreProcessed = false; }
        var ast = new ClassParser(classNames, this.config('separator', ':'), this._cache.variants).parse();
        var success = [];
        var ignored = [];
        var styleSheet = new StyleSheet();
        var _hIgnored = function (className) {
            if (handleIgnored) {
                var style = handleIgnored(className);
                if (style) {
                    styleSheet.add(style);
                    success.push(className);
                }
                else {
                    ignored.push(className);
                }
            }
            ignored.push(className);
        };
        var _gStyle = function (baseClass, variants, selector, important, prefix) {
            if (important === void 0) { important = false; }
            if (_this._config.exclude && testRegexr(selector, _this._config.exclude)) {
                // filter exclude className
                ignored.push(selector);
                return;
            }
            if (variants[0] && selector in __assign(__assign({}, _this._plugin.utilities), _this._plugin.components)) {
                // handle special selector that conflict with class parser, such as 'hover:abc'
                success.push(selector);
                styleSheet.add(deepCopy(_this._plugin.utilities[selector]));
                return;
            }
            var result = _this.extract(baseClass, false, prefix);
            if (result) {
                var escapedSelector_1 = '.' + cssEscape(selector);
                if (result instanceof Style) {
                    if (!result.meta.respectSelector)
                        result.selector = escapedSelector_1;
                    _this.markAsImportant(result, important);
                }
                else if (Array.isArray(result)) {
                    result = result.map(function (i) {
                        if (i instanceof Keyframes)
                            return i;
                        if (!i.meta.respectSelector)
                            i.selector = escapedSelector_1;
                        _this.markAsImportant(i, important);
                        return i;
                    });
                }
                var wrapped = _this.wrapWithVariants(variants, result);
                if (wrapped) {
                    success.push(selector);
                    styleSheet.add(wrapped);
                }
                else {
                    _hIgnored(selector);
                }
            }
            else {
                _hIgnored(selector);
            }
        };
        var _hGroup = function (obj, parentVariants) {
            if (parentVariants === void 0) { parentVariants = []; }
            var _eval = function (u) {
                if (u.type === 'group') {
                    _hGroup(u, obj.variants);
                }
                else if (u.type === 'alias' && u.content in _this._plugin.alias) {
                    _this._plugin.alias[u.content].forEach(function (i) { return _eval(i); });
                }
                else {
                    // utility
                    var variants = __spreadArray(__spreadArray(__spreadArray([], parentVariants, true), obj.variants, true), u.variants, true);
                    var important = obj.important || u.important;
                    var selector = (important ? '!' : '') + __spreadArray(__spreadArray([], variants, true), [u.content], false).join(':');
                    typeof u.content === 'string' &&
                        _gStyle(u.content, variants, selector, important, _this.config('prefix'));
                }
            };
            Array.isArray(obj.content) && obj.content.forEach(function (u) { return _eval(u); });
        };
        var _gAst = function (ast) {
            ast.forEach(function (obj) {
                if (!(ignoreProcessed && _this._cache.utilities.includes(obj.raw))) {
                    if (ignoreProcessed)
                        _this._cache.utilities.push(obj.raw);
                    if (obj.type === 'utility') {
                        if (Array.isArray(obj.content)) ;
                        else if (obj.content) {
                            _gStyle(obj.content, obj.variants, obj.raw, obj.important, _this.config('prefix'));
                        }
                    }
                    else if (obj.type === 'group') {
                        _hGroup(obj);
                    }
                    else if (obj.type === 'alias' && obj.content in _this._plugin.alias) {
                        _gAst(_this._plugin.alias[obj.content]);
                    }
                    else {
                        _hIgnored(obj.raw);
                    }
                }
            });
        };
        _gAst(ast);
        if (!this.config('prefixer'))
            styleSheet.prefixer = false;
        return {
            success: success,
            ignored: ignored,
            styleSheet: styleSheet.sort(),
        };
    };
    Processor.prototype.validate = function (classNames) {
        var _this = this;
        var ast = new ClassParser(classNames, this.config('separator', ':'), this._cache.variants).parse();
        var success = [];
        var ignored = [];
        var _hSuccess = function (className, self, parent) {
            success.push(__assign(__assign({ className: className }, self), { parent: parent }));
        };
        var _hIgnored = function (className, self, parent) {
            ignored.push(__assign(__assign({ className: className }, self), { parent: parent }));
        };
        var _gStyle = function (baseClass, variants, selector, self, parent, prefix) {
            if (_this._config.exclude && testRegexr(selector, _this._config.exclude)) {
                // filter exclude className
                _hIgnored(selector, self, parent);
                return;
            }
            if (variants[0] && selector in __assign(__assign({}, _this._plugin.utilities), _this._plugin.components)) {
                // handle special selector that conflict with class parser, such as 'hover:abc'
                _hSuccess(selector, self, parent);
                return;
            }
            if (_this.test(baseClass, prefix) && variants.filter(function (i) { return !(i in _this._variants); }).length === 0) {
                _hSuccess(selector, self, parent);
            }
            else {
                _hIgnored(selector, self, parent);
            }
        };
        var _hGroup = function (obj, parentVariants) {
            if (parentVariants === void 0) { parentVariants = []; }
            var _eval = function (u, parent) {
                if (u.type === 'group') {
                    _hGroup(u, obj.variants);
                }
                else if (u.type === 'alias' && u.content in _this._plugin.alias) {
                    _this._plugin.alias[u.content].forEach(function (i) { return _eval(i, u); });
                }
                else {
                    // utility
                    var variants = __spreadArray(__spreadArray(__spreadArray([], parentVariants, true), obj.variants, true), u.variants, true);
                    var important = obj.important || u.important;
                    var selector = (important ? '!' : '') + __spreadArray(__spreadArray([], variants, true), [u.content], false).join(':');
                    typeof u.content === 'string' &&
                        _gStyle(u.content, variants, selector, u, parent, _this.config('prefix'));
                }
            };
            Array.isArray(obj.content) && obj.content.forEach(function (u) { return _eval(u, obj); });
        };
        var _gAst = function (ast) {
            ast.forEach(function (obj) {
                if (obj.type === 'utility') {
                    if (Array.isArray(obj.content)) ;
                    else if (obj.content) {
                        _gStyle(obj.content, obj.variants, obj.raw, obj, undefined, _this.config('prefix'));
                    }
                }
                else if (obj.type === 'group') {
                    _hGroup(obj);
                }
                else if (obj.type === 'alias' && obj.content in _this._plugin.alias) {
                    _gAst(_this._plugin.alias[obj.content]);
                }
                else {
                    _hIgnored(obj.raw, obj);
                }
            });
        };
        _gAst(ast);
        return {
            success: success,
            ignored: ignored,
        };
    };
    Processor.prototype.compile = function (classNames, prefix, showComment, ignoreGenerated, handleIgnored, outputClassName) {
        var _this = this;
        if (prefix === void 0) { prefix = 'windi-'; }
        if (showComment === void 0) { showComment = false; }
        if (ignoreGenerated === void 0) { ignoreGenerated = false; }
        var ast = new ClassParser(classNames, this.config('separator', ':'), this._cache.variants).parse();
        var success = [];
        var ignored = [];
        var styleSheet = new StyleSheet();
        var className = outputClassName !== null && outputClassName !== void 0 ? outputClassName : prefix + hash(classNames.trim().split(/\s+/g).join(' '));
        if (ignoreGenerated && this._cache.classes.includes(className))
            return { success: success, ignored: ignored, styleSheet: styleSheet, className: className };
        var buildSelector = '.' + className;
        var _hIgnored = function (className) {
            if (handleIgnored) {
                var style = handleIgnored(className);
                if (style) {
                    styleSheet.add(style);
                    success.push(className);
                }
                else {
                    ignored.push(className);
                }
            }
            ignored.push(className);
        };
        var _gStyle = function (baseClass, variants, selector, important) {
            if (important === void 0) { important = false; }
            if (_this._config.exclude && testRegexr(selector, _this._config.exclude)) {
                // filter exclude className
                ignored.push(selector);
                return;
            }
            if (variants[0] && selector in __assign(__assign({}, _this._plugin.utilities), _this._plugin.components)) {
                // handle special selector that conflict with class parser, such as 'hover:abc'
                success.push(selector);
                styleSheet.add(deepCopy(_this._plugin.utilities[selector]));
                return;
            }
            var result = _this.extract(baseClass, showComment);
            if (result) {
                if (Array.isArray(result)) {
                    result.forEach(function (i) {
                        if (i instanceof Keyframes) {
                            i.meta.order = 20;
                            return i;
                        }
                        i.selector = buildSelector;
                        _this.markAsImportant(i, important);
                    });
                }
                else {
                    result.selector = buildSelector;
                    _this.markAsImportant(result, important);
                }
                var wrapped = _this.wrapWithVariants(variants, result);
                if (wrapped) {
                    success.push(selector);
                    styleSheet.add(wrapped);
                }
                else {
                    _hIgnored(selector);
                }
            }
            else {
                _hIgnored(selector);
            }
        };
        var _hGroup = function (obj, parentVariants) {
            if (parentVariants === void 0) { parentVariants = []; }
            Array.isArray(obj.content) &&
                obj.content.forEach(function (u) {
                    if (u.type === 'group') {
                        _hGroup(u, obj.variants);
                    }
                    else {
                        // utility
                        var variants = __spreadArray(__spreadArray(__spreadArray([], parentVariants, true), obj.variants, true), u.variants, true);
                        var selector = __spreadArray(__spreadArray([], variants, true), [u.content], false).join(':');
                        typeof u.content === 'string' &&
                            _gStyle(_this.removePrefix(u.content), variants, selector, obj.important || u.important);
                    }
                });
        };
        ast.forEach(function (obj) {
            if (obj.type === 'utility') {
                if (Array.isArray(obj.content)) ;
                else if (obj.content) {
                    _gStyle(_this.removePrefix(obj.content), obj.variants, obj.raw, obj.important);
                }
            }
            else if (obj.type === 'group') {
                _hGroup(obj);
            }
            else {
                _hIgnored(obj.raw);
            }
        });
        className = success.length > 0 ? className : undefined;
        if (ignoreGenerated && className)
            this._cache.classes.push(className);
        if (!this.config('prefixer'))
            styleSheet.prefixer = false;
        return {
            success: success,
            ignored: ignored,
            className: className,
            styleSheet: styleSheet.sortby(sortGroup).combine(),
        };
    };
    Processor.prototype.attributify = function (attrs, ignoreProcessed) {
        var _this = this;
        if (ignoreProcessed === void 0) { ignoreProcessed = false; }
        var success = [];
        var ignored = [];
        var styleSheet = new StyleSheet();
        var _a = (this._config.attributify && typeof this._config.attributify === 'boolean') ? {} : this._config.attributify || {}, prefix = _a.prefix, separator = _a.separator, disable = _a.disable;
        var _gStyle = function (key, value, equal, notAllow, ignoreProcessed) {
            var _a, _b;
            if (equal === void 0) { equal = false; }
            if (notAllow === void 0) { notAllow = false; }
            if (ignoreProcessed === void 0) { ignoreProcessed = false; }
            var buildSelector = "[".concat(_this.e((prefix || '') + key)).concat(equal ? '=' : '~=', "\"").concat(value, "\"]");
            if (notAllow || (ignoreProcessed && _this._cache.attrs.includes(buildSelector))) {
                ignored.push(buildSelector);
                return;
            }
            var importantValue = value.startsWith('!');
            if (importantValue)
                value = value.slice(1);
            var importantKey = key.startsWith('!');
            if (importantKey)
                key = key.slice(1);
            var id = (_b = (_a = key.match(/\w+$/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '';
            var splits = value.split(separator || ':');
            var variants = splits.slice(0, -1);
            var utility = splits.slice(-1)[0];
            var keys = key.split(separator || ':');
            var lastKey = keys.slice(-1)[0];
            if (lastKey in _this._variants && lastKey !== 'svg') {
                variants = __spreadArray(__spreadArray([], keys, true), variants, true);
            }
            else if (id in _this._variants && id !== 'svg') {
                // sm = ... || sm:hover = ... || sm-hover = ...
                var matches = key.match(/[@<\w]+/g);
                if (!matches) {
                    ignored.push(buildSelector);
                    return;
                }
                variants = __spreadArray(__spreadArray([], matches, true), variants, true);
            }
            else {
                // text = ... || sm:text = ... || sm-text = ... || sm-hover-text = ...
                if (!keys) {
                    ignored.push(buildSelector);
                    return;
                }
                if (keys.length === 1)
                    keys = key.split('-');
                var last = void 0;
                // handle min-h || max-w ...
                if (['min', 'max'].includes(keys.slice(-2, -1)[0])) {
                    variants = __spreadArray(__spreadArray([], keys.slice(0, -2), true), variants, true);
                    last = keys.slice(-2).join('-');
                }
                else {
                    variants = __spreadArray(__spreadArray([], keys.slice(0, -1), true), variants, true);
                    last = keys[keys.length - 1];
                }
                // handle negative, such as m = -x-2
                var negative_1 = utility.charAt(0) === '-';
                if (negative_1)
                    utility = utility.slice(1);
                utility = ['m', 'p'].includes(last) && ['t', 'l', 'b', 'r', 'x', 'y'].includes(utility.charAt(0)) ? last + utility : last + '-' + utility;
                if (negative_1)
                    utility = '-' + utility;
                utility !== 'cursor-default' && (utility = utility.replace(/-(~|default)$/, ''));
                // handle special cases
                switch (last) {
                    case 'w':
                        if (['w-min', 'w-max', 'w-min-content', 'w-max-content'].includes(utility)) {
                            utility = utility.slice(0, 5);
                        }
                        else if (utility.startsWith('w-min')) {
                            utility = 'min-w' + utility.slice(5);
                        }
                        else if (utility.startsWith('w-max')) {
                            utility = 'max-w' + utility.slice(5);
                        }
                        break;
                    case 'h':
                        if (['h-min', 'h-max', 'h-min-content', 'h-max-content'].includes(utility)) {
                            utility = utility.slice(0, 5);
                        }
                        else if (utility.startsWith('h-min')) {
                            utility = 'min-h' + utility.slice(5);
                        }
                        else if (utility.startsWith('h-max')) {
                            utility = 'max-h' + utility.slice(5);
                        }
                        break;
                    case 'flex':
                        switch (utility) {
                            case 'flex-default':
                                utility = 'flex';
                                break;
                            case 'flex-inline':
                                utility = 'inline-flex';
                                break;
                            default:
                                if (/^flex-gap-/.test(utility))
                                    utility = utility.slice(5);
                        }
                        break;
                    case 'grid':
                        switch (utility) {
                            case 'grid-default':
                                utility = 'grid';
                                break;
                            case 'grid-inline':
                                utility = 'inline-grid';
                                break;
                            default:
                                if (/^grid-(auto|gap|col|row)-/.test(utility))
                                    utility = utility.slice(5);
                        }
                        break;
                    case 'justify':
                        if (utility.startsWith('justify-content-')) {
                            utility = 'justify-' + utility.slice(16);
                        }
                        break;
                    case 'align':
                        if (/^align-(items|self|content)-/.test(utility)) {
                            utility = utility.slice(6);
                        }
                        else {
                            utility = 'content-' + utility.slice(6);
                        }
                        break;
                    case 'place':
                        if (!/^place-(items|self|content)-/.test(utility)) {
                            utility = 'place-content-' + utility.slice(6);
                        }
                        break;
                    case 'font':
                        if (/^font-(tracking|leading)-/.test(utility) || ['font-italic', 'font-not-italic', 'font-antialiased', 'font-subpixel-antialiased', 'font-normal-nums', 'font-ordinal', 'font-slashed-zero', 'font-lining-nums', 'font-oldstyle-nums', 'font-proportional-nums', 'font-tabular-nums', 'font-diagonal-fractions', 'font-stacked-fractions'].includes(utility))
                            utility = utility.slice(5);
                        break;
                    case 'text':
                        if (['text-baseline', 'text-top', 'text-middle', 'text-bottom', 'text-text-top', 'text-text-bottom', 'text-sub', 'text-super'].includes(utility)) {
                            utility = 'align-' + utility.slice(5);
                        }
                        else if (utility.startsWith('text-placeholder') || utility.startsWith('text-underline') || utility.startsWith('text-tab') || utility.startsWith('text-indent') || utility.startsWith('text-hyphens') || utility.startsWith('text-write')) {
                            utility = utility.slice(5);
                        }
                        else if (['text-underline', 'text-overline', 'text-line-through', 'text-no-underline', 'text-uppercase', 'text-lowercase', 'text-capitalize', 'text-normal-case', 'text-truncate', 'text-overflow-ellipsis', 'text-text-ellipsis', 'text-text-clip', 'text-break-normal', 'text-break-words', 'text-break-all'].includes(utility)) {
                            utility = utility.slice(5);
                        }
                        else if (utility.startsWith('text-space')) {
                            utility = 'white' + utility.slice(5);
                        }
                        break;
                    case 'underline':
                        if (utility === 'underline-none') {
                            utility = 'no-underline';
                        }
                        else if (utility === 'underline-line-through') {
                            utility = 'line-through';
                        }
                        break;
                    case 'svg':
                        if (utility.startsWith('svg-fill') || utility.startsWith('svg-stroke'))
                            utility = utility.slice(4);
                        break;
                    case 'border':
                        if (utility.startsWith('border-rounded')) {
                            utility = utility.slice(7);
                        }
                        break;
                    case 'gradient':
                        if (utility === 'gradient-none') {
                            utility = 'bg-none';
                        }
                        else if (/^gradient-to-[trbl]{1,2}$/.test(utility)) {
                            utility = 'bg-' + utility;
                        }
                        else if (/^gradient-(from|via|to)-/.test(utility)) {
                            utility = utility.slice(9);
                        }
                        break;
                    case 'display':
                        utility = utility.slice(8);
                        break;
                    case 'pos':
                        utility = utility.slice(4);
                        break;
                    case 'position':
                        utility = utility.slice(9);
                        break;
                    case 'box':
                        if (/^box-(decoration|shadow)/.test(utility)) {
                            utility = utility.slice(4);
                        }
                        break;
                    case 'filter':
                        if (utility !== 'filter-none' && utility !== 'filter') {
                            utility = utility.slice(7);
                        }
                        break;
                    case 'backdrop':
                        if (utility === 'backdrop') {
                            utility = 'backdrop-filter';
                        }
                        else if (utility === 'backdrop-none') {
                            utility = 'backdrop-filter-none';
                        }
                        break;
                    case 'transition':
                        if (/transition-(duration|ease|delay)-/.test(utility)) {
                            utility = utility.slice(11);
                        }
                        break;
                    case 'transform':
                        if (!['transform-gpu', 'transform-none', 'transform'].includes(utility)) {
                            utility = utility.slice(10);
                        }
                        break;
                    case 'isolation':
                        if (utility === 'isolation-isolate')
                            utility = 'isolate';
                        break;
                    case 'table':
                        if (utility === 'table-inline') {
                            utility = 'inline-table';
                        }
                        else if (utility.startsWith('table-caption-') || utility.startsWith('table-empty-cells')) {
                            utility = utility.slice(6);
                        }
                        break;
                    case 'pointer':
                        utility = 'pointer-events' + utility.slice(7);
                        break;
                    case 'resize':
                        if (utility === 'resize-both')
                            utility = 'resize';
                        break;
                    case 'ring':
                        break;
                    case 'blend':
                        utility = 'mix-' + utility;
                        break;
                    case 'sr':
                        if (utility === 'sr-not-only')
                            utility = 'not-sr-only';
                        break;
                }
            }
            var style = _this.extract(utility, false);
            if (style) {
                var important_1 = importantKey || importantValue;
                if (Array.isArray(style)) {
                    style.forEach(function (i) {
                        if (i instanceof Keyframes)
                            return i;
                        i.selector = buildSelector;
                        _this.markAsImportant(i, important_1);
                    });
                }
                else {
                    style.selector = buildSelector;
                    _this.markAsImportant(style, important_1);
                }
                if (variants.find(function (i) { return !(i in _this._variants); })) {
                    ignored.push(buildSelector);
                }
                else {
                    var wrapped = _this.wrapWithVariants(variants, style);
                    if (wrapped) {
                        ignoreProcessed && _this._cache.attrs.push(buildSelector);
                        success.push(buildSelector);
                        styleSheet.add(wrapped);
                    }
                    else {
                        ignored.push(buildSelector);
                    }
                }
            }
            else {
                ignored.push(buildSelector);
            }
        };
        var _loop_2 = function (key, value) {
            var notAllow = false;
            if (prefix) {
                if (key.startsWith(prefix)) {
                    key = key.slice(prefix.length);
                }
                else {
                    notAllow = true;
                }
            }
            if (disable === null || disable === void 0 ? void 0 : disable.includes(key))
                notAllow = true;
            if (Array.isArray(value)) {
                value.forEach(function (i) { return _gStyle(key, i, false, notAllow, ignoreProcessed); });
            }
            else {
                _gStyle(key, value, true, notAllow, ignoreProcessed);
            }
        };
        // eslint-disable-next-line prefer-const
        for (var _i = 0, _b = Object.entries(attrs); _i < _b.length; _i++) {
            var _c = _b[_i], key = _c[0], value = _c[1];
            _loop_2(key, value);
        }
        return {
            success: success,
            ignored: ignored,
            styleSheet: styleSheet.sort().combine(),
        };
    };
    Processor.prototype.loadPlugin = function (_a) {
        var handler = _a.handler, config = _a.config;
        if (config) {
            config = this._resolveFunction(config);
            config = combineConfig(config, this._config);
            var pluginTheme = config.theme;
            var extendTheme = pluginTheme === null || pluginTheme === void 0 ? void 0 : pluginTheme.extend;
            if (pluginTheme && extendTheme && typeof extendTheme === 'object') {
                for (var _i = 0, _b = Object.entries(extendTheme); _i < _b.length; _i++) {
                    var _c = _b[_i], key = _c[0], value = _c[1];
                    var themeValue = pluginTheme[key];
                    if (themeValue && typeof themeValue === 'object') {
                        pluginTheme[key] = __assign(__assign({}, (themeValue !== null && themeValue !== void 0 ? themeValue : {})), value);
                    }
                    else if (value && typeof value === 'object') {
                        pluginTheme[key] = value;
                    }
                }
            }
            this._config = __assign(__assign({}, config), { theme: pluginTheme });
            this._theme = pluginTheme;
        }
        this._config = this._resolveFunction(this._config);
        this._theme = this._config.theme;
        this._variants = __assign(__assign({}, this._variants), this.resolveVariants());
        handler(this.pluginUtils);
    };
    Processor.prototype.loadPluginWithOptions = function (optionsFunction, userOptions) {
        var plugin = optionsFunction(userOptions !== null && userOptions !== void 0 ? userOptions : {});
        this.loadPlugin(plugin);
    };
    Processor.prototype.loadShortcuts = function (shortcuts) {
        var _this = this;
        var _loop_3 = function (key, value) {
            var prefix = this_1.config('prefix', '');
            if (typeof value === 'string') {
                this_1._plugin.shortcuts[key] = this_1.compile(value, undefined, undefined, false, undefined, cssEscape(prefix + key)).styleSheet.children.map(function (i) { return i.updateMeta('components', 'shortcuts', layerOrder['shortcuts'], ++_this._cache.count); });
            }
            else {
                var styles_1 = [];
                Style.generate('.' + cssEscape(key), value).forEach(function (style) {
                    for (var _i = 0, _a = style.property; _i < _a.length; _i++) {
                        var prop = _a[_i];
                        if (!prop.value)
                            continue;
                        if (prop.name === '@apply') {
                            styles_1 = styles_1.concat(_this.compile(Array.isArray(prop.value) ? prop.value.join(' ') : prop.value).styleSheet.children.map(function (i) {
                                var newStyle = deepCopy(style);
                                newStyle.property = [];
                                return newStyle.extend(i);
                            }));
                        }
                        else {
                            var newStyle = deepCopy(style);
                            newStyle.property = [prop];
                            styles_1.push(newStyle);
                        }
                    }
                });
                this_1._plugin.shortcuts[key] = styles_1.map(function (i) { return i.updateMeta('components', 'shortcuts', layerOrder['shortcuts'], ++_this._cache.count); });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.entries(shortcuts); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            _loop_3(key, value);
        }
    };
    Processor.prototype.loadAlias = function (alias) {
        for (var _i = 0, _a = Object.entries(alias); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            this._plugin.alias[key] = new ClassParser(value, undefined, this._cache.variants).parse();
        }
    };
    Processor.prototype.config = function (path, defaultValue) {
        var _this = this;
        var _a;
        if (path === 'corePlugins')
            return this._plugin.core ? Object.keys(this._plugin.core).filter(function (i) { var _a; return (_a = _this._plugin.core) === null || _a === void 0 ? void 0 : _a[i]; }) : Object.keys(pluginOrder).slice(Object.keys(pluginOrder).length / 2);
        return (_a = getNestedValue(this._config, path)) !== null && _a !== void 0 ? _a : defaultValue;
    };
    Processor.prototype.theme = function (path, defaultValue) {
        var _a;
        return this._theme ? (_a = getNestedValue(this._theme, path)) !== null && _a !== void 0 ? _a : defaultValue : undefined;
    };
    Processor.prototype.corePlugins = function (path) {
        var _a;
        if (Array.isArray(this._config.corePlugins)) {
            return this._config.corePlugins.includes(path);
        }
        return (_a = this.config("corePlugins.".concat(path), true)) !== null && _a !== void 0 ? _a : false;
    };
    Processor.prototype.variants = function (path, defaultValue) {
        if (defaultValue === void 0) { defaultValue = []; }
        if (Array.isArray(this._config.variants)) {
            return this._config.variants;
        }
        return this.config("variants.".concat(path), defaultValue);
    };
    Processor.prototype.e = function (selector) {
        return cssEscape(selector);
    };
    Processor.prototype.prefix = function (selector) {
        var _a;
        return selector.replace(/(?=[\w])/, (_a = this._config.prefix) !== null && _a !== void 0 ? _a : '');
    };
    Processor.prototype.addUtilities = function (utilities, options) {
        var _this = this;
        var _a;
        if (options === void 0) { options = {
            layer: 'utilities',
            variants: [],
            respectPrefix: true,
            respectImportant: true,
        }; }
        if (Array.isArray(options))
            options = { variants: options };
        if (Array.isArray(utilities))
            utilities = utilities.reduce(function (previous, current) { return combineConfig(previous, current); }, {});
        var output = [];
        var layer = (_a = options.layer) !== null && _a !== void 0 ? _a : 'utilities';
        var order = layerOrder[layer] + 1;
        var _loop_4 = function (key, value) {
            var propertyValue = value;
            if (Array.isArray(value)) {
                propertyValue = Object.assign.apply(Object, __spreadArray([{}], value, false));
            }
            var styles = Style.generate(key.startsWith('.') && options.respectPrefix ? this_2.prefix(key) : key, propertyValue);
            if (options.layer)
                styles.forEach(function (style) { return style.updateMeta(layer, 'plugin', order, ++_this._cache.count); });
            if (options.respectImportant && this_2._config.important)
                styles.forEach(function (style) { return style.important = true; });
            var className = guessClassName(key);
            if (key.charAt(0) === '@') {
                styles.forEach(function (style) {
                    if (style.selector)
                        className = guessClassName(style.selector);
                    if (Array.isArray(className)) {
                        className.filter(function (i) { return i.isClass; }).forEach(function (_a) {
                            var selector = _a.selector, pseudo = _a.pseudo;
                            return _this._addPluginProcessorCache('utilities', selector, pseudo ? style.clone('.' + cssEscape(selector)).wrapSelector(function (selector) { return selector + pseudo; }) : style.clone());
                        });
                        var base = className.filter(function (i) { return !i.isClass; }).map(function (i) { return i.selector; }).join(', ');
                        if (base)
                            _this._addPluginProcessorCache('static', base, style.clone(base));
                    }
                    else {
                        _this._addPluginProcessorCache(className.isClass ? 'utilities' : 'static', className.selector, className.pseudo ? style.clone('.' + cssEscape(className.selector)).wrapSelector(function (selector) { return selector + className.pseudo; }) : style.clone());
                    }
                });
            }
            else if (Array.isArray(className)) {
                className.filter(function (i) { return i.isClass; }).forEach(function (_a) {
                    var selector = _a.selector, pseudo = _a.pseudo;
                    return _this._addPluginProcessorCache('utilities', selector, pseudo ? styles.map(function (i) { return i.clone('.' + cssEscape(selector)).wrapSelector(function (selector) { return selector + pseudo; }); }) : deepCopy(styles));
                });
                var base_1 = className.filter(function (i) { return !i.isClass; }).map(function (i) { return i.selector; }).join(', ');
                if (base_1)
                    this_2._addPluginProcessorCache('static', base_1, styles.map(function (i) { return i.clone(base_1); }));
            }
            else {
                this_2._addPluginProcessorCache(className.isClass ? 'utilities' : 'static', className.selector, className.pseudo ? styles.map(function (style) { return style.clone('.' + cssEscape(className.selector)).wrapSelector(function (selector) { return selector + className.pseudo; }); }) : styles);
            }
            output = __spreadArray(__spreadArray([], output, true), styles, true);
        };
        var this_2 = this;
        for (var _i = 0, _b = Object.entries(utilities); _i < _b.length; _i++) {
            var _c = _b[_i], key = _c[0], value = _c[1];
            _loop_4(key, value);
        }
        return output;
    };
    Processor.prototype.addDynamic = function (key, generator, options) {
        var _this = this;
        if (options === void 0) { options = {
            layer: 'utilities',
            group: 'plugin',
            variants: [],
            completions: [],
            respectPrefix: true,
            respectImportant: true,
            respectSelector: false,
        }; }
        var uOptions = Array.isArray(options) ? { variants: options } : options;
        var layer = uOptions.layer || 'utilities';
        var group = uOptions.group || 'plugin';
        var order = uOptions.order || layerOrder[layer] + 1;
        if (uOptions.completions)
            this._plugin.completions[group] = group in this._plugin.completions ? __spreadArray(__spreadArray([], this._plugin.completions[group], true), uOptions.completions, true) : uOptions.completions;
        var style = function (selector, property, important) {
            if (important === void 0) { important = uOptions.respectImportant && _this._config.important ? true : false; }
            return new Style(selector, property, important);
        };
        var prop = function (name, value, comment, important) {
            if (important === void 0) { important = uOptions.respectImportant && _this._config.important ? true : false; }
            return new Property(name, value, comment, important);
        };
        var keyframes = function (selector, property, important) {
            if (important === void 0) { important = uOptions.respectImportant && _this._config.important ? true : false; }
            return new Keyframes(selector, property, important);
        };
        keyframes.generate = Keyframes.generate;
        style.generate = Style.generate;
        prop.parse = Property.parse;
        this._plugin.dynamic[key] = (key in this._plugin.dynamic)
            ? function (Utility) { return deepCopy(_this._plugin.dynamic[key])(Utility) || generator({ Utility: Utility, Style: style, Property: prop, Keyframes: keyframes }); }
            : function (Utility) {
                var output = generator({ Utility: Utility, Style: style, Property: prop, Keyframes: keyframes });
                if (!output)
                    return;
                if (Array.isArray(output))
                    return output.map(function (i) { return i.updateMeta(layer, group, order, ++_this._cache.count, false, i.meta.respectSelector || uOptions.respectSelector); });
                return output.updateMeta(layer, group, order, ++_this._cache.count, false, output.meta.respectSelector || uOptions.respectSelector);
            };
        return generator;
    };
    Processor.prototype.addComponents = function (components, options) {
        var _this = this;
        var _a;
        if (options === void 0) { options = { layer: 'components', variants: [], respectPrefix: false }; }
        if (Array.isArray(options))
            options = { variants: options };
        if (Array.isArray(components))
            components = components.reduce(function (previous, current) { return combineConfig(previous, current); }, {});
        var output = [];
        var layer = (_a = options.layer) !== null && _a !== void 0 ? _a : 'components';
        var order = layerOrder[layer] + 1;
        var _loop_5 = function (key, value) {
            var propertyValue = value;
            if (Array.isArray(value)) {
                propertyValue = Object.assign.apply(Object, __spreadArray([{}], value, false));
            }
            var styles = Style.generate(key.startsWith('.') && options.respectPrefix ? this_3.prefix(key) : key, propertyValue);
            styles.forEach(function (style) { return style.updateMeta(layer, 'plugin', order, ++_this._cache.count); });
            if (options.respectImportant && this_3._config.important)
                styles.forEach(function (style) { return style.important = true; });
            var className = guessClassName(key);
            if (key.charAt(0) === '@') {
                styles.forEach(function (style) {
                    if (style.selector)
                        className = guessClassName(style.selector);
                    if (Array.isArray(className)) {
                        className.filter(function (i) { return i.isClass; }).forEach(function (_a) {
                            var selector = _a.selector, pseudo = _a.pseudo;
                            return _this._addPluginProcessorCache('components', selector, pseudo ? style.clone('.' + cssEscape(selector)).wrapSelector(function (selector) { return selector + pseudo; }) : style.clone());
                        });
                        var base = className.filter(function (i) { return !i.isClass; }).map(function (i) { return i.selector; }).join(', ');
                        if (base)
                            _this._addPluginProcessorCache('static', base, style.clone(base));
                    }
                    else {
                        _this._addPluginProcessorCache(className.isClass ? 'components' : 'static', className.selector, className.pseudo ? style.clone('.' + cssEscape(className.selector)).wrapSelector(function (selector) { return selector + className.pseudo; }) : style.clone());
                    }
                });
            }
            else if (Array.isArray(className)) {
                // one of the selector are not class, treat the entire as static to avoid duplication
                if (className.some(function (i) { return !i.isClass; })) {
                    var base_2 = className.map(function (i) { return i.selector; }).join(', ');
                    if (base_2)
                        this_3._addPluginProcessorCache('static', base_2, styles.map(function (i) { return i.clone(base_2); }));
                }
                // class
                else {
                    className.forEach(function (_a) {
                        var selector = _a.selector, pseudo = _a.pseudo;
                        return _this._addPluginProcessorCache('components', selector, pseudo ? styles.map(function (i) { return i.clone('.' + cssEscape(selector)).wrapSelector(function (selector) { return selector + pseudo; }); }) : deepCopy(styles));
                    });
                }
            }
            else {
                this_3._addPluginProcessorCache(className.isClass ? 'components' : 'static', className.selector, className.pseudo ? styles.map(function (style) { return style.clone('.' + cssEscape(className.selector)).wrapSelector(function (selector) { return selector + className.pseudo; }); }) : styles);
            }
            output = __spreadArray(__spreadArray([], output, true), styles, true);
        };
        var this_3 = this;
        for (var _i = 0, _b = Object.entries(components); _i < _b.length; _i++) {
            var _c = _b[_i], key = _c[0], value = _c[1];
            _loop_5(key, value);
        }
        return output;
    };
    Processor.prototype.addBase = function (baseStyles) {
        var _this = this;
        var output = [];
        for (var _i = 0, _a = Object.entries(baseStyles); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            var propertyValue = value;
            if (Array.isArray(value)) {
                propertyValue = Object.assign.apply(Object, __spreadArray([{}], value, false));
            }
            var styles = Style.generate(key, propertyValue).map(function (i) { return i.updateMeta('base', 'plugin', 10, ++_this._cache.count); });
            this._replaceStyleVariants(styles);
            this._addPluginProcessorCache('preflights', key, styles);
            output = __spreadArray(__spreadArray([], output, true), styles, true);
        }
        return output;
    };
    Processor.prototype.addVariant = function (name, generator) {
        // name && generator && options;
        var style = generator(__assign(__assign({}, this.variantUtils), { separator: this.config('separator', ':'), style: new Style() }));
        this._variants[name] = function () { return style; };
        this._cache.variants.push(name);
        return style;
    };
    Processor.prototype.dumpConfig = function () {
        var processor = new Processor();
        var diff = diffConfig(processor._config, this._config);
        var output = { theme: { extend: {} }, plugins: [] };
        if (diff.theme) {
            for (var _i = 0, _a = Object.entries(diff.theme); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (key !== 'extend') {
                    output.theme.extend[key] = value;
                }
            }
            delete diff.theme;
        }
        if (diff.plugins) {
            for (var _c = 0, _d = diff.plugins; _c < _d.length; _c++) {
                var plugin_1 = _d[_c];
                if ('config' in plugin_1) {
                    delete plugin_1.config;
                }
                output.plugins.push(plugin_1);
            }
            delete diff.plugins;
        }
        output = __assign(__assign({}, diff), output);
        return "module.exports = ".concat(toSource(output));
    };
    return Processor;
}());

exports.Processor = Processor;
