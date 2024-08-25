'use strict';

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

function toArray(v) {
    if (Array.isArray(v))
        return v;
    return [v];
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
function dashToCamel(str) {
    if (!/-/.test(str))
        return str;
    return str.toLowerCase().replace(/-(.)/g, function (_, group) { return group.toUpperCase(); });
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
/** @class */ ((function (_super) {
    __extends(GlobalStyle, _super);
    function GlobalStyle(selector, property, important) {
        return _super.call(this, selector, property, important) || this;
    }
    return GlobalStyle;
})(Style));
/** @class */ ((function (_super) {
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
})(Style));
/** @class */ ((function (_super) {
    __extends(Container, _super);
    function Container(selector, property, important) {
        return _super.call(this, selector, property, important) || this;
    }
    return Container;
})(Style));

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

var cs = {
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

// TODO: tsconfig -> ES2019 (node 12+)
// https://node.green/#ES2019-features--Object-fromEntries
// https://github.com/microsoft/TypeScript/issues/30933#issuecomment-591682635
function fromEntries(entries) {
    return entries.reduce(function (acc, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        return (__assign(__assign({}, acc), (_b = {}, _b[key] = value, _b)));
    }, {});
}
// docs
// https://www.w3.org/TR/css-scroll-snap-1/#scroll-snap-position
var index = createPlugin(function (_a) {
    var addUtilities = _a.addUtilities, addDynamic = _a.addDynamic, theme = _a.theme, variants = _a.variants;
    addUtilities(__assign(__assign(__assign(__assign(__assign({ 
        // visual hide scrollbar
        '.scrollbar-hide': {
            /* Firefox */
            'scrollbar-width': 'none',
            /* Safari and Chrome */
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        } }, fromEntries(['start', 'end', 'center'].map(function (align) { return [
        ".snap-".concat(align),
        { 'scroll-snap-align': align },
    ]; }))), { '.snap-align-none': {
            'scroll-snap-align': 'none',
        }, 
        // scroll-snap-type
        '.snap': {
            'scroll-snap-type': 'var(--scroll-snap-axis, both) var(--scroll-snap-strictness, mandatory)',
        } }), fromEntries(['none', 'mandatory', 'proximity'].map(function (strictness) { return [
        ".snap-".concat(strictness),
        { '--scroll-snap-strictness': strictness },
    ]; }))), fromEntries(['x', 'y', 'block', 'inline', 'both'].map(function (axis) { return [
        ".snap-".concat(axis),
        { '--scroll-snap-axis': axis },
    ]; }))), fromEntries(['normal', 'always'].map(function (limit) { return [
        ".snap-".concat(limit),
        { 'scroll-snap-stop': limit },
    ]; }))));
    ['margin', 'padding'].forEach(function (name) {
        var n = name.charAt(0);
        var tn = dashToCamel("snap-".concat(name));
        addDynamic("snap-".concat(n), function (_a) {
            var Utility = _a.Utility, Property = _a.Property;
            var value = Utility.handler
                .handleStatic(theme(tn))
                .handleSquareBrackets()
                .handleSpacing()
                .handleSize()
                .handleNegative()
                .handleVariable().value;
            if (!value)
                return;
            var suf = Utility.raw.split('-');
            var directions = expandDirection(suf.length ? suf[1].substring(1) : '', false);
            if (directions) {
                if (directions[0] === '*')
                    return Property("scroll-".concat(name), value);
                return Property(directions.map(function (i) { return "scroll-".concat(name, "-").concat(i); }), value);
            }
        }, {
            variants: variants(tn),
            group: tn,
            completions: __spreadArray([], ['{static}', '{float}', '{size}', '${var}', '[7px]']
                .map(function (type) { return ['', 'y', 'x', 't', 'l', 'b', 'r']
                .map(function (i) { return "snap-".concat(n).concat(i, "-").concat(type); }); })
                .reduce(function (a, b) { return a.concat(b); }, []), true),
        });
    });
}, {
    theme: {
        snapMargin: function (theme) {
            var _a;
            return (__assign({ auto: 'auto' }, ((_a = theme('spacing')) !== null && _a !== void 0 ? _a : {})));
        },
        snapPadding: function (theme) { return theme('spacing'); },
    },
    variants: {
        snapMargin: ['responsive'],
        snapPadding: ['responsive'],
    },
});

module.exports = index;
