"use strict";

exports.__esModule = true;
var _exportNames = {
  useQueries: true
};

var _useQueries = require("./useQueries");

exports.useQueries = _useQueries.useQueries;

var _ = require("..");

Object.keys(_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _[key];
});