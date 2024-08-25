"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
exports.defaultTheme = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var defaultTheme = {
  background: '#0b1521',
  backgroundAlt: '#132337',
  foreground: 'white',
  gray: '#3f4e60',
  grayAlt: '#222e3e',
  inputBackgroundColor: '#fff',
  inputTextColor: '#000',
  success: '#00ab52',
  danger: '#ff0085',
  active: '#006bff',
  warning: '#ffb200'
};
exports.defaultTheme = defaultTheme;

var ThemeContext = /*#__PURE__*/_react.default.createContext(defaultTheme);

function ThemeProvider(_ref) {
  var theme = _ref.theme,
      rest = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["theme"]);
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Provider, (0, _extends2.default)({
    value: theme
  }, rest));
}

function useTheme() {
  return _react.default.useContext(ThemeContext);
}