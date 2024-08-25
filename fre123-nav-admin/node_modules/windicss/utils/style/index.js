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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

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
function camelToDash(str) {
    // Use exact the same regex as Post CSS
    return str.replace(/([A-Z])/g, '-$1').replace(/^ms-/, '-ms-').toLowerCase();
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
var GlobalStyle = /** @class */ (function (_super) {
    __extends(GlobalStyle, _super);
    function GlobalStyle(selector, property, important) {
        return _super.call(this, selector, property, important) || this;
    }
    return GlobalStyle;
}(Style));
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

exports.Container = Container;
exports.GlobalStyle = GlobalStyle;
exports.InlineAtRule = InlineAtRule;
exports.Keyframes = Keyframes;
exports.Property = Property;
exports.Style = Style;
exports.StyleSheet = StyleSheet;
exports.linearGradient = linearGradient;
exports.minMaxContent = minMaxContent;
