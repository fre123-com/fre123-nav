import * as VueDemi from 'vue-demi';
import { inject, defineComponent, h, ref, computed, isVue2, reactive, onUnmounted } from 'vue-demi';
import { matchSorter } from 'match-sorter';
import { useQueryClient } from 'vue-query';

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

var _a;
var Position;
(function (Position) {
    Position["TR"] = "top-right";
    Position["TL"] = "top-left";
    Position["BR"] = "bottom-right";
    Position["BL"] = "bottom-left";
})(Position || (Position = {}));
var QueryState;
(function (QueryState) {
    QueryState[QueryState["Fetching"] = 0] = "Fetching";
    QueryState[QueryState["Fresh"] = 1] = "Fresh";
    QueryState[QueryState["Stale"] = 2] = "Stale";
    QueryState[QueryState["Inactive"] = 3] = "Inactive";
})(QueryState || (QueryState = {}));
var QueryStateLabel = (_a = {},
    _a[QueryState.Fetching] = "fetching",
    _a[QueryState.Fresh] = "fresh",
    _a[QueryState.Stale] = "stale",
    _a[QueryState.Inactive] = "inactive",
    _a);
function getQueryState(query) {
    if (query.isFetching()) {
        return QueryState.Fetching;
    }
    if (!query.getObserversCount()) {
        return QueryState.Inactive;
    }
    if (query.isStale()) {
        return QueryState.Stale;
    }
    return QueryState.Fresh;
}
function getQueryStatusColor(query, theme) {
    var queryState = getQueryState(query);
    if (queryState === QueryState.Fetching) {
        return theme.active;
    }
    if (queryState === QueryState.Stale) {
        return theme.warning;
    }
    if (queryState === QueryState.Inactive) {
        return theme.gray;
    }
    return theme.success;
}
function getQueryStatusLabel(query) {
    return QueryStateLabel[getQueryState(query)];
}
var getStatusRank = function (query) {
    return getQueryState(query);
};
var queryHashSort = function (a, b) { return (a.queryHash > b.queryHash ? 1 : -1); };
var dateSort = function (a, b) {
    return a.state.dataUpdatedAt < b.state.dataUpdatedAt ? 1 : -1;
};
var statusAndDateSort = function (a, b) {
    if (getStatusRank(a) === getStatusRank(b)) {
        return dateSort(a, b);
    }
    return getStatusRank(a) > getStatusRank(b) ? 1 : -1;
};
var sortFns = {
    "Status > Last Updated": statusAndDateSort,
    "Query Hash": queryHashSort,
    "Last Updated": dateSort,
};
function makeArrayNonConfigurable(objects) {
    objects.forEach(function (obj) {
        Object.keys(obj).forEach(function (key) {
            Object.defineProperty(obj, key, { configurable: false });
        });
    });
}

var theme = {
    background: "#0b1521",
    backgroundAlt: "#132337",
    foreground: "white",
    gray: "#3f4e60",
    grayAlt: "#222e3e",
    inputBackgroundColor: "#fff",
    inputTextColor: "#000",
    success: "#00ab52",
    danger: "#ff0085",
    active: "#006bff",
    warning: "#ffb200",
};
var VUE_QUERY_DEVTOOLS_THEME = "VUE_QUERY_DEVTOOLS_THEME";
function useTheme() {
    return inject(VUE_QUERY_DEVTOOLS_THEME, theme);
}

var script$b = defineComponent({
    name: "LogoIcon",
    render: function () {
        var svgAttrs = {
            xmlns: "http://www.w3.org/2000/svg",
            width: "40",
            height: "40",
            viewBox: "0 0 261.76 226.69",
        };
        var path1Attrs = {
            fill: "#ffd94c",
            stroke: "#002c4b",
            "stroke-width": "32.63",
            d: "M156.77 42.75L126.55 95.1 96.32 42.75h-48.3l78.53 136 78.53-136z",
        };
        var path2Attrs = {
            fill: "none",
            stroke: "#ff4154",
            "stroke-width": "12.43",
            d: "M156.77 42.75L126.55 95.1 96.32 42.75h-48.3l78.53 136 78.53-136z",
        };
        var createPath = function (attrs) {
            return h("path", __assign(__assign({}, attrs), { 
                // Vue2
                attrs: attrs }));
        };
        return h("svg", __assign(__assign({}, svgAttrs), { 
            // Vue2
            attrs: svgAttrs }), [createPath(path1Attrs), createPath(path2Attrs)]);
    },
});

script$b.__file = "src/devtools/components/Logo.vue";

var script$a = defineComponent({
    name: "ExpandableNode",
    props: {
        isExpanded: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: false,
        },
    },
    emits: ["click"],
    setup: function (_props, _a) {
        var emit = _a.emit;
        var onClick = function () {
            emit("click");
        };
        return {
            onClick: onClick,
        };
    },
    render: function () {
        var subtitle = this.subtitle
            ? h("span", {
                class: "expandable-subtitle",
            }, this.subtitle)
            : undefined;
        return h("span", {
            class: "expandable",
            // Vue3
            onClick: this.onClick,
            // Vue2
            on: {
                click: this.onClick,
            },
        }, [
            h("span", {
                class: "expandable-arrow",
                style: {
                    transform: "rotate(".concat(this.$props.isExpanded ? 90 : 0, "deg)"),
                },
            }, "▶"),
            this.title,
            subtitle,
        ]);
    },
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$a = "\n.expandable {\n  cursor: pointer;\n  color: white;\n}\n.expandable-arrow {\n  display: inline-block;\n  margin-right: 10px;\n  transition: all 0.1s ease;\n}\n.expandable-subtitle {\n  color: grey;\n  font-size: 0.7rem;\n  margin-left: 10px;\n}\n";
styleInject(css_248z$a);

script$a.__file = "src/devtools/active-query-panel/ExpandableNode.vue";

var script$9 = defineComponent({
    name: "ExplorerTree",
    components: { ExpandableNode: script$a },
    props: {
        label: {
            type: String,
            required: true,
        },
        defaultExpanded: {
            type: [Object, Boolean],
            required: true,
        },
        pageSize: {
            type: Number,
            default: 100,
        },
        depth: {
            type: Number,
            default: 0,
        },
        value: {
            required: true,
        },
    },
    setup: function (props) {
        var theme = useTheme();
        var expanded = ref(!!props.defaultExpanded);
        var expandedPages = ref([]);
        var path = ref([]);
        var subEntries = computed(function () {
            if (Array.isArray(props.value)) {
                return props.value.map(function (d, i) {
                    return makeProperty({
                        label: String(i),
                        value: d,
                    });
                });
            }
            else if (props.value !== null &&
                typeof props.value === "object" &&
                // @ts-expect-error Fix typings
                typeof props.value[Symbol.iterator] === "function") {
                return Array.from(
                // @ts-expect-error Fix typings
                props.value, function (val, i) {
                    return makeProperty({
                        label: String(i),
                        value: val,
                    });
                });
            }
            else if (typeof props.value === "object" && props.value !== null) {
                var filteredValue = __assign(__assign({}, props.value), { __ob__: {} });
                return Object.entries(filteredValue).map(function (_a) {
                    var label = _a[0], value = _a[1];
                    return makeProperty({
                        label: label,
                        value: value,
                    });
                });
            }
            return [];
        });
        var subEntriesLabel = computed(function () {
            return subEntries.value.length > 1 ? "items" : "item";
        });
        var subEntryPages = computed(function () {
            var pages = [];
            var i = 0;
            while (i < subEntries.value.length) {
                pages.push(subEntries.value.slice(i, i + props.pageSize));
                i = i + props.pageSize;
            }
            return pages;
        });
        var stringifiedValue = computed(function () {
            return JSON.stringify(props.value, Object.getOwnPropertyNames(Object(props.value)).filter(function (key) { return !key.startsWith("__"); }));
        });
        var toggle = function () {
            expanded.value = !expanded.value;
        };
        var makeProperty = function (sub) {
            var _a;
            var newPath = path.value.concat(sub.label);
            var subDefaultExpanded = false;
            if (typeof props.defaultExpanded === "boolean") {
                if (props.defaultExpanded === true) {
                    subDefaultExpanded = (_a = {}, _a[sub.label] = true, _a);
                }
            }
            else if (props.defaultExpanded) {
                subDefaultExpanded = props.defaultExpanded[sub.label];
            }
            return __assign(__assign({}, sub), { path: newPath, depth: props.depth + 1, defaultExpanded: subDefaultExpanded });
        };
        var setExpandedPages = function (index) {
            if (expandedPages.value.includes(index)) {
                expandedPages.value = expandedPages.value.filter(function (d) { return d !== index; });
            }
            else {
                expandedPages.value = __spreadArray(__spreadArray([], expandedPages.value, true), [index], false);
            }
        };
        return {
            theme: theme,
            subEntryPages: subEntryPages,
            toggle: toggle,
            expanded: expanded,
            subEntries: subEntries,
            subEntriesLabel: subEntriesLabel,
            expandedPages: expandedPages,
            setExpandedPages: setExpandedPages,
            stringifiedValue: stringifiedValue,
        };
    },
    render: function () {
        var _this = this;
        var _a, _b, _c;
        var root = ((_a = this.subEntryPages) === null || _a === void 0 ? void 0 : _a.length)
            ? h(script$a, {
                // Vue3
                isExpanded: this.expanded,
                title: this.label,
                subtitle: "".concat(this.subEntries.length, " ").concat(this.subEntriesLabel),
                onClick: this.toggle,
                // Vue2
                props: {
                    isExpanded: this.expanded,
                    title: this.label,
                    subtitle: "".concat(this.subEntries.length, " ").concat(this.subEntriesLabel),
                },
                on: {
                    click: this.toggle,
                },
            })
            : undefined;
        var recursiveComponent = VueDemi.resolveComponent
            ? VueDemi.resolveComponent("ExplorerTree")
            : "ExplorerTree";
        var singlePage = h("div", {
            class: "indent",
        }, this.subEntries.map(function (entry) {
            return h(recursiveComponent, {
                key: entry.label,
                // Vue3
                label: entry.label,
                value: entry.value,
                defaultExpanded: false,
                // Vue2
                props: {
                    label: entry.label,
                    value: entry.value,
                    defaultExpanded: false,
                },
            });
        }));
        var multiPage = h("div", {
            class: "indent",
        }, this.subEntryPages.map(function (page, index) {
            return h("div", {
                key: index,
            }, [
                h(script$a, {
                    // Vue3
                    isExpanded: _this.expandedPages.includes(index),
                    title: "[".concat(index * _this.pageSize, " ... ").concat(index * _this.pageSize + _this.pageSize - 1, "]"),
                    onClick: function () { return _this.setExpandedPages(index); },
                    // Vue2
                    props: {
                        isExpanded: _this.expandedPages.includes(index),
                        title: "[".concat(index * _this.pageSize, " ... ").concat(index * _this.pageSize + _this.pageSize - 1, "]"),
                    },
                    on: {
                        click: function () { return _this.setExpandedPages(index); },
                    },
                }),
                _this.expandedPages.includes(index)
                    ? h("div", {
                        class: "indent",
                    }, page.map(function (entry) {
                        return h(recursiveComponent, {
                            key: entry.label,
                            // Vue3
                            label: entry.label,
                            value: entry.value,
                            defaultExpanded: false,
                            // Vue2
                            props: {
                                label: entry.label,
                                value: entry.value,
                                defaultExpanded: false,
                            },
                        });
                    }))
                    : undefined,
            ]);
        }));
        var page = ((_b = this.subEntryPages) === null || _b === void 0 ? void 0 : _b.length) === 1 ? singlePage : multiPage;
        var expanded = this.expanded ? page : undefined;
        var noPages = [
            h("span", { class: "expandable" }, this.label),
            h("span", { style: { color: this.theme.danger } }, this.stringifiedValue),
        ];
        return h("div", {
            class: "explorer-tree",
            key: this.$props.label,
        }, __spreadArray([root, expanded], (!((_c = this.subEntryPages) === null || _c === void 0 ? void 0 : _c.length) ? noPages : []), true));
    },
});

var css_248z$9 = "\n.explorer-tree {\n  font-family: Menlo, monospace;\n  font-size: 0.9rem;\n  line-height: 1.7;\n  outline: none;\n  word-break: break-word;\n}\n.expandable {\n  margin-right: 10px;\n}\n.indent {\n  margin-left: 0.1rem;\n  padding-left: 1rem;\n  border-left: 2px solid rgba(0, 0, 0, 0.15);\n}\n";
styleInject(css_248z$9);

script$9.__file = "src/devtools/active-query-panel/Explorer.vue";

var script$8 = defineComponent({
    name: "InfoPanel",
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    setup: function () {
        var theme = useTheme();
        return {
            theme: theme,
        };
    },
    render: function () {
        // Compatibility between Vue2 and Vue3
        var slot = typeof this.$slots.default === "function"
            ? this.$slots.default()
            : this.$slots.default;
        return h("div", [
            h("div", {
                class: "info-title",
                style: {
                    background: this.theme.backgroundAlt,
                },
            }, this.$props.title),
            h("div", { class: "info-panel" }, slot),
        ]);
    },
});

var css_248z$8 = "\n.info-title {\n  padding: 0.5rem;\n  position: sticky;\n  top: 0;\n  z-index: 1;\n}\n.info-panel {\n  padding: 0.5rem;\n}\n";
styleInject(css_248z$8);

script$8.__file = "src/devtools/active-query-panel/InfoPanel.vue";

var script$7 = defineComponent({
    name: "QueryActions",
    props: {
        query: {
            type: Object,
            required: true,
        },
        selectedQueryClientKey: {
            type: String,
        },
    },
    setup: function (props) {
        var theme = useTheme();
        var queryClient = useQueryClient(props.selectedQueryClientKey);
        var isFetching = computed(function () { return props.query.state.isFetching; });
        var doFetch = function () {
            props.query.fetch();
        };
        var doInvalidate = function () {
            queryClient.invalidateQueries(props.query);
        };
        var doReset = function () {
            queryClient.resetQueries(props.query);
        };
        var doRemove = function () {
            queryClient.removeQueries(props.query);
        };
        return {
            theme: theme,
            isFetching: isFetching,
            doFetch: doFetch,
            doInvalidate: doInvalidate,
            doReset: doReset,
            doRemove: doRemove,
        };
    },
    render: function () {
        var actions = [
            h("button", {
                class: "action-button",
                style: {
                    background: this.isFetching
                        ? this.theme.grayAlt
                        : this.theme.active,
                    cursor: this.isFetching ? "not-allowed" : "pointer",
                },
                // Vue3
                type: "button",
                disabled: this.isFetching,
                onClick: this.doFetch,
                // Vue2
                attrs: {
                    type: "button",
                    disabled: this.isFetching,
                },
                on: {
                    click: this.doFetch,
                },
            }, "Refetch"),
            h("button", {
                class: "action-button",
                style: {
                    background: this.theme.warning,
                    color: this.theme.inputTextColor,
                },
                // Vue3
                type: "button",
                onClick: this.doInvalidate,
                // Vue2
                attrs: {
                    type: "button",
                },
                on: {
                    click: this.doInvalidate,
                },
            }, "Invalidate"),
            h("button", {
                class: "action-button",
                style: {
                    background: this.theme.gray,
                },
                // Vue3
                type: "button",
                onClick: this.doReset,
                // Vue2
                attrs: {
                    type: "button",
                },
                on: {
                    click: this.doReset,
                },
            }, "Reset"),
            h("button", {
                class: "action-button",
                style: {
                    background: this.theme.danger,
                },
                // Vue3
                type: "button",
                onClick: this.doRemove,
                // Vue2
                attrs: {
                    type: "button",
                },
                on: {
                    click: this.doRemove,
                },
            }, "Remove"),
        ];
        var actionsSlot = isVue2 ? actions : { default: function () { return actions; } };
        return h(script$8, {
            // Vue3
            title: "Actions",
            // Vue2
            props: {
                title: "Actions",
            },
        }, actionsSlot);
    },
});

var css_248z$7 = "\n.action-button {\n  appearance: none;\n  border-radius: 0.3em;\n  border: 0;\n  color: white;\n  cursor: pointer;\n  font-size: 0.9em;\n  font-weight: bold;\n  padding: 0.5em;\n}\n.action-button:not(:last-of-type) {\n  margin-right: 5px;\n}\n";
styleInject(css_248z$7);

script$7.__file = "src/devtools/active-query-panel/QueryActions.vue";

var script$6 = defineComponent({
    name: "QueryDetails",
    props: {
        query: {
            type: Object,
            required: true,
        },
    },
    setup: function (props) {
        var theme = useTheme();
        var formattedQueryKey = computed(function () { return props.query.queryHash; });
        var queryStatusLabel = computed(function () { return getQueryStatusLabel(props.query); });
        var observersCount = computed(function () { return props.query.getObserversCount(); });
        var updateDate = computed(function () {
            return new Date(props.query.state.dataUpdatedAt).toLocaleTimeString();
        });
        var statusBackground = computed(function () {
            return getQueryStatusColor(props.query, theme);
        });
        return {
            formattedQueryKey: formattedQueryKey,
            queryStatusLabel: queryStatusLabel,
            observersCount: observersCount,
            updateDate: updateDate,
            statusBackground: statusBackground,
        };
    },
    render: function () {
        var details = [
            h("div", { class: "details-info-line" }, [
                h("code", {
                    class: "details-code",
                }, [h("pre", { class: "details-pre" }, this.formattedQueryKey)]),
                h("span", {
                    class: "details-span",
                    style: { background: this.statusBackground },
                }, this.queryStatusLabel),
            ]),
            h("div", { class: "details-info-line" }, [
                "Observers:",
                h("code", {
                    class: "details-code",
                }, this.observersCount),
            ]),
            h("div", { class: "details-info-line" }, [
                "Last Updated:",
                h("code", {
                    class: "details-code",
                }, this.updateDate),
            ]),
        ];
        var detailsSlot = isVue2 ? details : { default: function () { return details; } };
        return h(script$8, {
            // Vue3
            title: "Query Details",
            // Vue2
            attrs: {
                title: "Query Details",
            },
        }, detailsSlot);
    },
});

var css_248z$6 = "\n.details-info-line {\n  align-items: stretch;\n  display: flex;\n  justify-content: space-between;\n}\n.details-info-line:not(:last-of-type) {\n  margin-bottom: 0.5rem;\n}\n.details-code {\n  font-size: 0.9em;\n  line-height: 1.8rem;\n  color: \"inherit\";\n}\n.details-pre {\n  margin: 0;\n  overflow: auto;\n  padding: 0;\n}\n.details-span {\n  border-radius: 0.4rem;\n  flex-shrink: 0;\n  font-weight: bold;\n  padding: 0.3rem 0.6rem;\n  text-shadow: 0 2px 10px black;\n}\n";
styleInject(css_248z$6);

script$6.__file = "src/devtools/active-query-panel/QueryDetails.vue";

var script$5 = defineComponent({
    name: "ActiveQueryPanel",
    props: {
        query: {
            type: Object,
            required: true,
        },
        selectedQueryClientKey: {
            type: String,
        },
    },
    render: function () {
        var dataExplorer = h(script$9, {
            // Vue3
            label: "Data",
            value: this.$props.query.state.data,
            defaultExpanded: true,
            // Vue2
            props: {
                label: "Data",
                value: this.$props.query.state.data,
                defaultExpanded: true,
            },
        });
        var dataExplorerSlot = isVue2
            ? [dataExplorer]
            : { default: function () { return dataExplorer; } };
        var queryExplorer = h(script$9, {
            // Vue3
            label: "Query",
            value: this.$props.query,
            defaultExpanded: { queryKey: true },
            // Vue2
            props: {
                label: "Query",
                value: this.$props.query,
                defaultExpanded: { queryKey: true },
            },
        });
        var queryExplorerSlot = isVue2
            ? [queryExplorer]
            : { default: function () { return queryExplorer; } };
        return h("div", {
            class: "active-query-panel",
        }, [
            h(script$6, {
                // Vue3
                query: this.$props.query,
                // Vue2
                props: {
                    query: this.$props.query,
                },
            }),
            h(script$7, {
                // Vue3
                query: this.$props.query,
                selectedQueryClientKey: this.$props.selectedQueryClientKey,
                // Vue2
                props: {
                    query: this.$props.query,
                    selectedQueryClientKey: this.$props.selectedQueryClientKey,
                },
            }),
            h(script$8, {
                // Vue3
                title: "Data Explorer",
                // Vue2
                props: {
                    title: "Data Explorer",
                },
            }, dataExplorerSlot),
            h(script$8, {
                // Vue3
                title: "Query Explorer",
                // Vue2
                props: {
                    title: "Query Explorer",
                },
            }, queryExplorerSlot),
        ]);
    },
});

var css_248z$5 = "\n.active-query-panel {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 500px;\n  height: 100%;\n  overflow: auto;\n}\n";
styleInject(css_248z$5);

script$5.__file = "src/devtools/active-query-panel/ActiveQueryPanel.vue";

var script$4 = defineComponent({
    name: "QueryItem",
    props: {
        query: {
            type: Object,
            required: true,
        },
    },
    setup: function (props, _a) {
        var emit = _a.emit;
        var theme = useTheme();
        var observerCount = computed(function () {
            return props.query.getObserversCount();
        });
        var isStale = computed(function () { return getQueryState(props.query) === QueryState.Stale; });
        var isDisabled = computed(function () { return observerCount.value > 0 && !props.query.isActive(); });
        var stateColor = computed(function () { return getQueryStatusColor(props.query, theme); });
        var onQueryClick = function () {
            emit("selectQuery", props.query.queryHash);
        };
        return {
            theme: theme,
            observerCount: observerCount,
            isStale: isStale,
            isDisabled: isDisabled,
            stateColor: stateColor,
            onQueryClick: onQueryClick,
        };
    },
    render: function () {
        return h("div", {
            style: {
                display: "flex",
                borderBottom: "solid 1px ".concat(this.theme.grayAlt),
                cursor: "pointer",
            },
            // Vue3
            onClick: this.onQueryClick,
            // Vue2
            on: {
                click: this.onQueryClick,
            },
        }, [
            h("div", {
                class: "query-item-state",
                style: {
                    background: this.stateColor,
                    textShadow: this.isStale ? "0" : "0 0 10px black",
                    color: this.isStale ? "black" : "white",
                },
            }, this.observerCount),
            this.isDisabled
                ? h("div", {
                    class: "query-item-disabled-label",
                    style: {
                        background: this.theme.gray,
                    },
                }, "disabled")
                : null,
            h("code", {
                class: "query-item-code",
            }, this.$props.query.queryHash),
        ]);
    },
});

var css_248z$4 = "\n.query-item-state {\n  align-items: center;\n  display: flex;\n  flex: 0 0 auto;\n  font-weight: bold;\n  height: 2rem;\n  justify-content: center;\n  width: 2rem;\n}\n.query-item-disabled-label {\n  align-items: center;\n  display: flex;\n  flex: 0 0 auto;\n  font-weight: bold;\n  height: 2rem;\n  padding: 0 0.5em;\n}\n.query-item-code {\n  font-size: 0.9em;\n  padding: 0.5rem;\n  color: \"inherit\";\n}\n";
styleInject(css_248z$4);

script$4.__file = "src/devtools/components/QueryItem.vue";

var script$3 = defineComponent({
    name: "QueryOptions",
    props: {
        queryClientKeys: {
            type: Array,
            default: function () { return []; },
        },
    },
    emits: {
        optionsChange: function (options) { return Boolean(options); },
    },
    setup: function (_props, _a) {
        var emit = _a.emit;
        var theme = useTheme();
        var sortFnKeys = Object.keys(sortFns);
        var sort = ref(sortFnKeys[0]);
        var options = reactive({
            selectedQueryClientKey: "",
            filter: "",
            sortDesc: false,
            sortFn: sortFns["Status > Last Updated"],
        });
        var onInput = function (event) {
            var _a;
            options.filter = (_a = event.target) === null || _a === void 0 ? void 0 : _a.value;
            emit("optionsChange", options);
        };
        var onKeyDown = function (event) {
            if (event.key === "Escape") {
                options.filter = "";
                emit("optionsChange", options);
            }
        };
        var onSortFnChange = function (event) {
            var _a;
            sort.value = (_a = event.target) === null || _a === void 0 ? void 0 : _a.value;
            options.sortFn = sortFns[sort.value];
            emit("optionsChange", options);
        };
        var onSortDescChange = function () {
            options.sortDesc = !options.sortDesc;
            emit("optionsChange", options);
        };
        var onSelectedClientChange = function (event) {
            var _a;
            options.selectedQueryClientKey = (_a = event.target) === null || _a === void 0 ? void 0 : _a.value;
            emit("optionsChange", options);
        };
        return {
            theme: theme,
            sortFnKeys: sortFnKeys,
            sort: sort,
            options: options,
            onInput: onInput,
            onKeyDown: onKeyDown,
            onSortFnChange: onSortFnChange,
            onSortDescChange: onSortDescChange,
            onSelectedClientChange: onSelectedClientChange,
        };
    },
    render: function () {
        var input = h("input", {
            class: "options-input",
            style: {
                backgroundColor: this.theme.inputBackgroundColor,
                color: this.theme.inputTextColor,
            },
            // Vue3
            placeholder: "Filter",
            value: this.options.filter,
            onInput: this.onInput,
            onKeydown: this.onKeyDown,
            // Vue2
            attrs: {
                placeholder: "Filter",
                value: this.options.filter,
            },
            on: {
                input: this.onInput,
                keydown: this.onKeyDown,
            },
        });
        var select = !this.options.filter
            ? h("select", {
                class: "options-select",
                style: {
                    backgroundColor: this.theme.inputBackgroundColor,
                    color: this.theme.inputTextColor,
                },
                // Vue3
                value: this.sort,
                onChange: this.onSortFnChange,
                // Vue2
                attrs: {
                    value: this.sort,
                },
                on: {
                    change: this.onSortFnChange,
                },
            }, this.sortFnKeys.map(function (key) {
                return h("option", {
                    key: key,
                    // Vue3
                    value: key,
                    // Vue2
                    attrs: {
                        value: key,
                    },
                }, "Sort by ".concat(key));
            }))
            : undefined;
        var sortDesc = this.options.sortDesc ? "⬇ Desc" : "⬆ Asc";
        var button = !this.options.filter
            ? h("button", {
                class: "options-button",
                style: {
                    background: this.theme.gray,
                },
                // Vue3
                type: "button",
                onClick: this.onSortDescChange,
                // Vue2
                attrs: {
                    type: "button",
                },
                on: {
                    click: this.onSortDescChange,
                },
            }, sortDesc)
            : undefined;
        var queryClientSelector = this.queryClientKeys.length > 1
            ? h("select", {
                class: "options-select",
                style: {
                    backgroundColor: this.theme.inputBackgroundColor,
                    color: this.theme.inputTextColor,
                },
                // Vue3
                value: this.options.selectedQueryClientKey,
                onChange: this.onSelectedClientChange,
                // Vue2
                attrs: {
                    value: this.options.selectedQueryClientKey,
                },
                on: {
                    change: this.onSelectedClientChange,
                },
            }, [
                h("option", {
                    key: "",
                    // Vue3
                    value: "",
                    // Vue2
                    attrs: {
                        value: "",
                    },
                }, "Query Client: Default"),
            ].concat(this.queryClientKeys.map(function (key) {
                return h("option", {
                    key: key,
                    // Vue3
                    value: key,
                    // Vue2
                    attrs: {
                        value: key,
                    },
                }, "Query Client: ".concat(key));
            })))
            : undefined;
        return h("div", {
            class: "options-wrapper",
        }, [queryClientSelector, input, select, button]);
    },
});

var css_248z$3 = "\n.options-wrapper {\n  align-items: center;\n  display: flex;\n}\n.options-input {\n  border-radius: 0.2em;\n  border: 0;\n  flex: 1;\n  font-size: 0.9em;\n  line-height: 1.3;\n  margin-right: 0.5rem;\n  padding: 0.3em 0.4em;\n}\n.options-button {\n  appearance: none;\n  background: #3f4e60;\n  border-radius: 0.3em;\n  border: 0;\n  color: white;\n  cursor: pointer;\n  font-size: 0.9em;\n  font-weight: bold;\n  padding: 0.3rem 0.4rem;\n}\n.options-select {\n  --webkit-appearance: none;\n  appearance: none;\n  background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23444444'><polygon points='0,25 100,25 50,75'/></svg>\");\n  background-position: right 0.55em center;\n  background-repeat: no-repeat;\n  background-size: 0.65em auto, 100%;\n  border-radius: 0.2em;\n  border: 0;\n  display: inline-block;\n  flex: 1;\n  font-family: sans-serif;\n  font-size: 0.9em;\n  font-weight: normal;\n  height: auto;\n  line-height: 1.3;\n  margin-right: 0.5rem;\n  min-width: 75;\n  padding: 0.3em 1.5em 0.3em 0.5em;\n}\n";
styleInject(css_248z$3);

script$3.__file = "src/devtools/components/QueryOptions.vue";

var script$2 = defineComponent({
    name: "QueryStates",
    props: {
        queries: {
            type: Array,
            required: true,
        },
    },
    setup: function (props) {
        var theme = useTheme();
        var getQueryStateData = function (state) {
            var count = props.queries.filter(function (q) { return getQueryState(q) === state; }).length;
            return {
                label: QueryStateLabel[state],
                opacity: count ? 1 : 0.3,
                count: count,
            };
        };
        var fresh = computed(function () { return getQueryStateData(QueryState.Fresh); });
        var fetching = computed(function () { return getQueryStateData(QueryState.Fetching); });
        var stale = computed(function () { return getQueryStateData(QueryState.Stale); });
        var inactive = computed(function () { return getQueryStateData(QueryState.Inactive); });
        return {
            theme: theme,
            fresh: fresh,
            fetching: fetching,
            stale: stale,
            inactive: inactive,
        };
    },
    render: function () {
        var freshState = h("span", {
            class: "query-state",
            style: {
                background: this.theme.success,
                opacity: this.fresh.opacity,
            },
        }, "".concat(this.fresh.label, " ").concat(this.fresh.count));
        var fetchingState = h("span", {
            class: "query-state",
            style: {
                background: this.theme.active,
                opacity: this.fetching.opacity,
            },
        }, "".concat(this.fetching.label, " ").concat(this.fetching.count));
        var staleState = h("span", {
            class: "query-state",
            style: {
                background: this.theme.warning,
                color: "black",
                textShadow: "0",
                opacity: this.stale.opacity,
            },
        }, "".concat(this.stale.label, " ").concat(this.stale.count));
        var inactiveState = h("span", {
            class: "query-state",
            style: {
                background: this.theme.gray,
                opacity: this.inactive.opacity,
            },
        }, "".concat(this.inactive.label, " ").concat(this.inactive.count));
        return h("div", {
            class: "query-states",
        }, [freshState, fetchingState, staleState, inactiveState]);
    },
});

var css_248z$2 = "\n.query-states {\n  display: flex;\n  font-size: 0.9em;\n  justify-content: flex-end;\n  margin-bottom: 0.5rem;\n}\n.query-state {\n  align-items: center;\n  border-radius: 0.2em;\n  display: inline-flex;\n  font-weight: bold;\n  margin-left: 5px;\n  padding: 0.2em 0.4em;\n  text-shadow: 0 0 10px black;\n}\n";
styleInject(css_248z$2);

script$2.__file = "src/devtools/components/QueryStates.vue";

var getSortedQueries = function (queryCache, filterOptions) {
    var queries = queryCache.getAll();
    // Fix for infinite loop in Vue2.x
    makeArrayNonConfigurable(queries);
    var sorted = __spreadArray([], queries, true).sort(filterOptions.sortFn);
    if (filterOptions.sortDesc) {
        sorted.reverse();
    }
    if (!filterOptions.filter) {
        return sorted;
    }
    return matchSorter(sorted, filterOptions.filter, {
        keys: ["queryHash"],
    }).filter(function (d) { return d.queryHash; });
};
/**
 * @deprecated Vue Query Devtools are now available as a plugin to the official Vue Devtools.
 * Standalone devtools will be removed in v2 of vue-query.
 * Please visit https://vue-query.vercel.app/#/getting-started/devtools for more information.
 */
var DevtoolsPanel = defineComponent({
    name: "DevtoolsPanel",
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        panelProps: {
            type: Object,
            default: function () { return ({}); },
        },
        queryClientKeys: {
            type: Array,
            default: function () { return []; },
        },
    },
    setup: function (props, _a) {
        var emit = _a.emit;
        if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.warn("[vue-query] Deprecation warning: Vue Query Devtools are now available as a plugin to the official Vue Devtools.\nStandalone devtools will be removed in v2 of vue-query.\nPlease visit https://vue-query.vercel.app/#/getting-started/devtools for more information.");
        }
        var queryCache;
        var unsubscribe = function () {
            // NOOP
        };
        var defaultClient = useQueryClient();
        var clients = props.queryClientKeys.reduce(function (map, key) {
            map[key] = useQueryClient(key);
            return map;
        }, {});
        var theme = useTheme();
        var devtoolsPanelStyles = computed(function () { return ({
            backgroundColor: theme.background,
            color: theme.foreground,
        }); });
        var options = reactive({
            selectedQueryClientKey: "",
            filter: "",
            sortDesc: false,
            sortFn: sortFns["Status > Last Updated"],
        });
        var onOptionsChange = function (newOptions) {
            if (options.selectedQueryClientKey !== newOptions.selectedQueryClientKey) {
                selectQueryClient(newOptions.selectedQueryClientKey);
            }
            Object.assign(options, newOptions);
            queries.value = getSortedQueries(queryCache, options);
        };
        var queries = ref([]);
        var activeQuery = ref();
        var selectQuery = function (queryHash) {
            var _a;
            if (((_a = activeQuery.value) === null || _a === void 0 ? void 0 : _a.queryHash) === queryHash) {
                activeQuery.value = undefined;
            }
            else {
                activeQuery.value = queryCache.get(queryHash);
            }
        };
        var handleDragStart = function (event) {
            emit("handleDragStart", event);
        };
        var selectQueryClient = function (queryClientKey) {
            unsubscribe();
            var queryClient = queryClientKey
                ? clients[queryClientKey]
                : defaultClient;
            queryCache = queryClient.getQueryCache();
            queries.value = getSortedQueries(queryCache, options);
            unsubscribe = queryCache.subscribe(function () {
                queries.value = getSortedQueries(queryCache, options);
            });
            activeQuery.value = undefined;
        };
        selectQueryClient();
        onUnmounted(function () { return unsubscribe; });
        return {
            theme: theme,
            devtoolsPanelStyles: devtoolsPanelStyles,
            queries: queries,
            getQueryState: getQueryState,
            onOptionsChange: onOptionsChange,
            activeQuery: activeQuery,
            selectQuery: selectQuery,
            handleDragStart: handleDragStart,
            options: options,
        };
    },
    render: function () {
        var _this = this;
        var queryList = this.queries.map(function (query, index) {
            return h(script$4, {
                key: getQueryState(query) + query.state.dataUpdatedAt + index,
                style: {
                    background: query === _this.activeQuery ? "rgba(255,255,255,.1)" : undefined,
                },
                // Vue3
                query: query,
                onSelectQuery: _this.selectQuery,
                // Vue2
                props: {
                    query: query,
                },
                on: {
                    selectQuery: _this.selectQuery,
                },
            });
        });
        return h("div", {
            class: "VueQueryDevtoolsPanel",
            style: this.devtoolsPanelStyles,
        }, [
            h("div", {
                class: "resize-bar",
                // Vue3
                onMousedown: this.handleDragStart,
                // Vue2
                on: {
                    mousedown: this.handleDragStart,
                },
            }),
            h("div", {
                class: "query-panel",
                style: {
                    borderRight: "1px solid ".concat(this.theme.grayAlt),
                },
            }, [
                h("div", {
                    class: "query-panel-header",
                    style: {
                        background: this.theme.backgroundAlt,
                    },
                }, [
                    h(script$b, {
                        ariaHidden: true,
                        style: { marginRight: ".5rem" },
                    }),
                    h("div", { class: "vertical-list" }, [
                        h(script$2, {
                            // Vue3
                            queries: this.queries,
                            // Vue2
                            props: {
                                queries: this.queries,
                            },
                        }),
                        h(script$3, {
                            // Vue3
                            onOptionsChange: this.onOptionsChange,
                            queryClientKeys: this.queryClientKeys,
                            // Vue2
                            on: {
                                optionsChange: this.onOptionsChange,
                            },
                            props: {
                                queryClientKeys: this.queryClientKeys,
                            },
                        }),
                    ]),
                ]),
                h("div", { class: "query-list" }, queryList),
            ]),
            this.activeQuery
                ? h(script$5, {
                    key: getQueryState(this.activeQuery) +
                        this.activeQuery.state.dataUpdatedAt,
                    // Vue3
                    query: this.activeQuery,
                    selectedQueryClientKey: this.options.selectedQueryClientKey,
                    // Vue2
                    props: {
                        query: this.activeQuery,
                        selectedQueryClientKey: this.options.selectedQueryClientKey,
                    },
                })
                : undefined,
        ]);
    },
});

var css_248z$1 = "\n.VueQueryDevtoolsPanel {\n  display: flex;\n  font-family: sans-serif;\n  font-size: clamp(12px, 1.5vw, 14px);\n}\n@media (max-width: 1000px) {\n.VueQueryDevtoolsPanel {\n    flex-direction: column;\n}\n}\n@media (max-width: 600px) {\n.VueQueryDevtoolsPanel {\n    font-size: 0.9rem;\n}\n}\n.resize-bar {\n  cursor: row-resize;\n  height: 4px;\n  left: 0;\n  margin-bottom: -4px;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: 100000;\n}\n.vertical-list {\n  display: flex;\n  flex-direction: column;\n}\n.query-panel {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 500px;\n  max-height: 100%;\n  min-height: 40%;\n  overflow: auto;\n}\n.query-panel-header {\n  align-items: center;\n  display: flex;\n  justify-content: space-between;\n  padding: 0.5rem;\n}\n.query-list {\n  flex: 1;\n  overflow-y: auto;\n}\n";
styleInject(css_248z$1);

DevtoolsPanel.__file = "src/devtools/DevtoolsPanel.vue";

var script$1 = defineComponent({
    name: "CloseButton",
    props: {
        position: {
            type: String,
            required: true,
        },
        buttonProps: {
            type: Object,
            default: function () { return ({}); },
        },
    },
    emits: ["click"],
    setup: function (props, context) {
        var onClick = function () {
            var _a, _b;
            context.emit("click");
            (_b = (_a = props.buttonProps).click) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        var position = computed(function () {
            if (props.position === Position.TR || props.position === Position.BR) {
                return { right: 0 };
            }
            return { left: 0 };
        });
        var buttonStyles = computed(function () { return (__assign(__assign({ position: "fixed", zIndex: "99999", margin: ".5rem", bottom: 0 }, position.value), props.buttonProps.style)); });
        return {
            onClick: onClick,
            buttonStyles: buttonStyles,
        };
    },
    render: function () {
        return h("button", {
            style: this.buttonStyles,
            // Vue3
            type: "button",
            onClick: this.onClick,
            // Vue2
            attrs: {
                type: "button",
            },
            on: {
                click: this.onClick,
            },
        }, "Close");
    },
});

script$1.__file = "src/devtools/components/CloseButton.vue";

var script = defineComponent({
    name: "ToggleButton",
    props: {
        position: {
            type: String,
            required: true,
        },
        buttonProps: {
            type: Object,
            default: function () { return ({}); },
        },
    },
    emits: ["click"],
    setup: function (props, context) {
        var onClick = function () {
            var _a, _b;
            context.emit("click");
            (_b = (_a = props.buttonProps).click) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        var position = computed(function () {
            if (props.position === Position.TR) {
                return { top: 0, right: 0 };
            }
            if (props.position === Position.TL) {
                return { top: 0, left: 0 };
            }
            if (props.position === Position.BR) {
                return { bottom: 0, right: 0 };
            }
            return { bottom: 0, left: 0 };
        });
        var buttonStyles = computed(function () { return (__assign(__assign({ background: "none", border: 0, padding: 0, position: "fixed", zIndex: "99999", display: "inline-flex", fontSize: "1.5rem", margin: ".5rem", cursor: "pointer", width: "fit-content" }, position.value), props.buttonProps.style)); });
        return {
            onClick: onClick,
            buttonStyles: buttonStyles,
        };
    },
    render: function () {
        return h("button", {
            style: this.buttonStyles,
            // Vue3
            type: "button",
            ariaLabel: "Open Vue Query Devtools",
            onClick: this.onClick,
            // Vue2
            attrs: {
                type: "button",
                ariaLabel: "Open Vue Query Devtools",
            },
            on: {
                click: this.onClick,
            },
        }, [h(script$b)]);
    },
});

script.__file = "src/devtools/components/ToggleButton.vue";

/**
 * @deprecated Vue Query Devtools are now available as a plugin to the official Vue Devtools.
 * Standalone devtools will be removed in v2 of vue-query.
 * Please visit https://vue-query.vercel.app/#/getting-started/devtools for more information.
 */
var VueQueryDevTools = defineComponent({
    name: "VueQueryDevTools",
    props: {
        initialIsOpen: {
            type: Boolean,
            default: false,
        },
        panelProps: {
            type: Object,
            default: function () { return ({}); },
        },
        closeButtonProps: {
            type: Object,
            default: function () { return ({}); },
        },
        toggleButtonProps: {
            type: Object,
            default: function () { return ({}); },
        },
        position: {
            type: String,
            default: Position.BL,
        },
        containerElement: {
            type: String,
            default: "footer",
        },
        queryClientKeys: {
            type: Array,
            default: function () { return []; },
        },
    },
    setup: function (props) {
        var isOpen = ref(props.initialIsOpen);
        var isResizing = ref(false);
        var devtoolsHeight = ref("500px");
        var panelRef = ref();
        var onToggleClick = function () {
            isOpen.value = !isOpen.value;
        };
        var handleDragStart = function (event) {
            var _a;
            if (event.button !== 0)
                return; // Only allow left click for drag
            isResizing.value = true;
            var dragInfo = {
                originalHeight: (_a = panelRef.value) === null || _a === void 0 ? void 0 : _a.$el.getBoundingClientRect().height,
                pageY: event.pageY,
            };
            var run = function (moveEvent) {
                var delta = dragInfo.pageY - moveEvent.pageY;
                var newHeight = dragInfo.originalHeight + delta;
                devtoolsHeight.value = newHeight + "px";
                if (newHeight < 100) {
                    isOpen.value = false;
                }
                else {
                    isOpen.value = true;
                }
            };
            var unsub = function () {
                isResizing.value = false;
                document.removeEventListener("mousemove", run);
                document.removeEventListener("mouseUp", unsub);
            };
            document.addEventListener("mousemove", run);
            document.addEventListener("mouseup", unsub);
        };
        return {
            isOpen: isOpen,
            isResizing: isResizing,
            devtoolsHeight: devtoolsHeight,
            panelRef: panelRef,
            onToggleClick: onToggleClick,
            handleDragStart: handleDragStart,
        };
    },
    render: function () {
        var devtoolsPanel = h(DevtoolsPanel, {
            class: {
                "devtools-panel": true,
                "devtools-resizing": this.isResizing,
                "devtools-open": this.isOpen,
            },
            style: {
                height: this.devtoolsHeight,
            },
            ref: "panelRef",
            // Vue3
            isOpen: this.isOpen,
            panelProps: this.panelProps,
            onHandleDragStart: this.handleDragStart,
            queryClientKeys: this.queryClientKeys,
            // Vue2
            props: {
                isOpen: this.isOpen,
                panelProps: this.panelProps,
                queryClientKeys: this.queryClientKeys,
            },
            on: {
                handleDragStart: this.handleDragStart,
            },
        });
        var closeButton = h(script$1, {
            // Vue3
            position: this.position,
            buttonProps: this.closeButtonProps,
            onClick: this.onToggleClick,
            // Vue2
            props: {
                position: this.position,
                buttonProps: this.closeButtonProps,
            },
            on: {
                click: this.onToggleClick,
            },
        });
        var toggleButton = h(script, {
            // Vue3
            position: this.position,
            buttonProps: this.toggleButtonProps,
            onClick: this.onToggleClick,
            // Vue2
            props: {
                position: this.position,
                buttonProps: this.toggleButtonProps,
            },
            on: {
                click: this.onToggleClick,
            },
        });
        return h("div", { class: "VueQueryDevtools" }, [
            this.isOpen ? devtoolsPanel : null,
            this.isOpen ? closeButton : toggleButton,
        ]);
    },
});

var css_248z = "\n.devtools-panel {\n  bottom: 0;\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);\n  max-height: 90%;\n  opacity: 0;\n  pointer-events: none;\n  position: fixed;\n  right: 0;\n  transform-origin: top;\n  transform: translateY(15px) scale(1.02);\n  transition: all 0.2s ease;\n  width: 100%;\n  z-index: 99999;\n}\n.devtools-resizing {\n  transition: none;\n}\n.devtools-open {\n  opacity: 1;\n  pointer-events: all;\n  transform: translateY(0) scale(1);\n}\n";
styleInject(css_248z);

VueQueryDevTools.__file = "src/devtools/Devtools.vue";

export { VUE_QUERY_DEVTOOLS_THEME, VueQueryDevTools, DevtoolsPanel as VueQueryDevToolsPanel };
//# sourceMappingURL=devtools.js.map
