"use strict";

exports.__esModule = true;
exports.Select = exports.Input = exports.Code = exports.QueryKey = exports.QueryKeys = exports.Button = exports.ActiveQueryPanel = exports.Panel = void 0;

var _utils = require("./utils");

var Panel = (0, _utils.styled)('div', function (_props, theme) {
  return {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    fontFamily: "sans-serif",
    display: 'flex',
    backgroundColor: theme.background,
    color: theme.foreground
  };
}, {
  '(max-width: 700px)': {
    flexDirection: 'column'
  },
  '(max-width: 600px)': {
    fontSize: '.9em' // flexDirection: 'column',

  }
});
exports.Panel = Panel;
var ActiveQueryPanel = (0, _utils.styled)('div', function () {
  return {
    flex: '1 1 500px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    height: '100%'
  };
}, {
  '(max-width: 700px)': function maxWidth700px(_props, theme) {
    return {
      borderTop: "2px solid " + theme.gray
    };
  }
});
exports.ActiveQueryPanel = ActiveQueryPanel;
var Button = (0, _utils.styled)('button', function (props, theme) {
  return {
    appearance: 'none',
    fontSize: '.9em',
    fontWeight: 'bold',
    background: theme.gray,
    border: '0',
    borderRadius: '.3em',
    color: 'white',
    padding: '.5em',
    opacity: props.disabled ? '.5' : undefined,
    cursor: 'pointer'
  };
});
exports.Button = Button;
var QueryKeys = (0, _utils.styled)('span', {
  display: 'inline-block',
  fontSize: '0.9em'
});
exports.QueryKeys = QueryKeys;
var QueryKey = (0, _utils.styled)('span', {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '.2em .4em',
  fontWeight: 'bold',
  textShadow: '0 0 10px black',
  borderRadius: '.2em'
});
exports.QueryKey = QueryKey;
var Code = (0, _utils.styled)('code', {
  fontSize: '.9em',
  color: 'inherit',
  background: 'inherit'
});
exports.Code = Code;
var Input = (0, _utils.styled)('input', function (_props, theme) {
  return {
    backgroundColor: theme.inputBackgroundColor,
    border: 0,
    borderRadius: '.2em',
    color: theme.inputTextColor,
    fontSize: '.9em',
    lineHeight: "1.3",
    padding: '.3em .4em'
  };
});
exports.Input = Input;
var Select = (0, _utils.styled)('select', function (_props, theme) {
  return {
    display: "inline-block",
    fontSize: ".9em",
    fontFamily: "sans-serif",
    fontWeight: 'normal',
    lineHeight: "1.3",
    padding: ".3em 1.5em .3em .5em",
    height: 'auto',
    border: 0,
    borderRadius: ".2em",
    appearance: "none",
    WebkitAppearance: 'none',
    backgroundColor: theme.inputBackgroundColor,
    backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23444444'><polygon points='0,25 100,25 50,75'/></svg>\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right .55em center",
    backgroundSize: ".65em auto, 100%",
    color: theme.inputTextColor
  };
}, {
  '(max-width: 500px)': {
    display: 'none'
  }
});
exports.Select = Select;