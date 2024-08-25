import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import { displayValue, styled } from './utils';
export var Entry = styled('div', {
  fontFamily: 'Menlo, monospace',
  fontSize: '1em',
  lineHeight: '1.7',
  outline: 'none',
  wordBreak: 'break-word'
});
export var Label = styled('span', {
  color: 'white'
});
export var LabelButton = styled('button', {
  cursor: 'pointer',
  color: 'white'
});
export var ExpandButton = styled('button', {
  cursor: 'pointer',
  color: 'inherit',
  font: 'inherit',
  outline: 'inherit',
  background: 'transparent',
  border: 'none',
  padding: 0
});
export var Value = styled('span', function (_props, theme) {
  return {
    color: theme.danger
  };
});
export var SubEntries = styled('div', {
  marginLeft: '.1em',
  paddingLeft: '1em',
  borderLeft: '2px solid rgba(0,0,0,.15)'
});
export var Info = styled('span', {
  color: 'grey',
  fontSize: '.7em'
});
export var Expander = function Expander(_ref) {
  var expanded = _ref.expanded,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  return /*#__PURE__*/React.createElement("span", {
    style: _extends({
      display: 'inline-block',
      transition: 'all .1s ease',
      transform: "rotate(" + (expanded ? 90 : 0) + "deg) " + (style.transform || '')
    }, style)
  }, "\u25B6");
};

/**
 * Chunk elements in the array by size
 *
 * when the array cannot be chunked evenly by size, the last chunk will be
 * filled with the remaining elements
 *
 * @example
 * chunkArray(['a','b', 'c', 'd', 'e'], 2) // returns [['a','b'], ['c', 'd'], ['e']]
 */
export function chunkArray(array, size) {
  if (size < 1) return [];
  var i = 0;
  var result = [];

  while (i < array.length) {
    result.push(array.slice(i, i + size));
    i = i + size;
  }

  return result;
}
export var DefaultRenderer = function DefaultRenderer(_ref2) {
  var HandleEntry = _ref2.HandleEntry,
      label = _ref2.label,
      value = _ref2.value,
      _ref2$subEntries = _ref2.subEntries,
      subEntries = _ref2$subEntries === void 0 ? [] : _ref2$subEntries,
      _ref2$subEntryPages = _ref2.subEntryPages,
      subEntryPages = _ref2$subEntryPages === void 0 ? [] : _ref2$subEntryPages,
      type = _ref2.type,
      _ref2$expanded = _ref2.expanded,
      expanded = _ref2$expanded === void 0 ? false : _ref2$expanded,
      toggleExpanded = _ref2.toggleExpanded,
      pageSize = _ref2.pageSize;

  var _React$useState = React.useState([]),
      expandedPages = _React$useState[0],
      setExpandedPages = _React$useState[1];

  return /*#__PURE__*/React.createElement(Entry, {
    key: label
  }, (subEntryPages == null ? void 0 : subEntryPages.length) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ExpandButton, {
    onClick: function onClick() {
      return toggleExpanded();
    }
  }, /*#__PURE__*/React.createElement(Expander, {
    expanded: expanded
  }), " ", label, ' ', /*#__PURE__*/React.createElement(Info, null, String(type).toLowerCase() === 'iterable' ? '(Iterable) ' : '', subEntries.length, " ", subEntries.length > 1 ? "items" : "item")), expanded ? subEntryPages.length === 1 ? /*#__PURE__*/React.createElement(SubEntries, null, subEntries.map(function (entry) {
    return /*#__PURE__*/React.createElement(HandleEntry, {
      key: entry.label,
      entry: entry
    });
  })) : /*#__PURE__*/React.createElement(SubEntries, null, subEntryPages.map(function (entries, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index
    }, /*#__PURE__*/React.createElement(Entry, null, /*#__PURE__*/React.createElement(LabelButton, {
      onClick: function onClick() {
        return setExpandedPages(function (old) {
          return old.includes(index) ? old.filter(function (d) {
            return d !== index;
          }) : [].concat(old, [index]);
        });
      }
    }, /*#__PURE__*/React.createElement(Expander, {
      expanded: expanded
    }), " [", index * pageSize, " ...", ' ', index * pageSize + pageSize - 1, "]"), expandedPages.includes(index) ? /*#__PURE__*/React.createElement(SubEntries, null, entries.map(function (entry) {
      return /*#__PURE__*/React.createElement(HandleEntry, {
        key: entry.label,
        entry: entry
      });
    })) : null));
  })) : null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Label, null, label, ":"), " ", /*#__PURE__*/React.createElement(Value, null, displayValue(value))));
};

function isIterable(x) {
  return Symbol.iterator in x;
}

export default function Explorer(_ref3) {
  var value = _ref3.value,
      defaultExpanded = _ref3.defaultExpanded,
      _ref3$renderer = _ref3.renderer,
      renderer = _ref3$renderer === void 0 ? DefaultRenderer : _ref3$renderer,
      _ref3$pageSize = _ref3.pageSize,
      pageSize = _ref3$pageSize === void 0 ? 100 : _ref3$pageSize,
      rest = _objectWithoutPropertiesLoose(_ref3, ["value", "defaultExpanded", "renderer", "pageSize"]);

  var _React$useState2 = React.useState(Boolean(defaultExpanded)),
      expanded = _React$useState2[0],
      setExpanded = _React$useState2[1];

  var toggleExpanded = React.useCallback(function () {
    return setExpanded(function (old) {
      return !old;
    });
  }, []);
  var type = typeof value;
  var subEntries = [];

  var makeProperty = function makeProperty(sub) {
    var _ref4;

    var subDefaultExpanded = defaultExpanded === true ? (_ref4 = {}, _ref4[sub.label] = true, _ref4) : defaultExpanded == null ? void 0 : defaultExpanded[sub.label];
    return _extends({}, sub, {
      defaultExpanded: subDefaultExpanded
    });
  };

  if (Array.isArray(value)) {
    type = 'array';
    subEntries = value.map(function (d, i) {
      return makeProperty({
        label: i.toString(),
        value: d
      });
    });
  } else if (value !== null && typeof value === 'object' && isIterable(value) && typeof value[Symbol.iterator] === 'function') {
    type = 'Iterable';
    subEntries = Array.from(value, function (val, i) {
      return makeProperty({
        label: i.toString(),
        value: val
      });
    });
  } else if (typeof value === 'object' && value !== null) {
    type = 'object';
    subEntries = Object.entries(value).map(function (_ref5) {
      var key = _ref5[0],
          val = _ref5[1];
      return makeProperty({
        label: key,
        value: val
      });
    });
  }

  var subEntryPages = chunkArray(subEntries, pageSize);
  return renderer(_extends({
    HandleEntry: function HandleEntry(_ref6) {
      var entry = _ref6.entry;
      return /*#__PURE__*/React.createElement(Explorer, _extends({
        value: value,
        renderer: renderer
      }, rest, entry));
    },
    type: type,
    subEntries: subEntries,
    subEntryPages: subEntryPages,
    value: value,
    expanded: expanded,
    toggleExpanded: toggleExpanded,
    pageSize: pageSize
  }, rest));
}