'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var tour$1 = require('./src/tour2.js');
var step = require('./src/step2.js');
var tour = require('./src/tour.js');
var install = require('../../utils/vue/install.js');

const ElTour = install.withInstall(tour$1["default"], {
  TourStep: step["default"]
});
const ElTourStep = install.withNoopInstall(step["default"]);

exports.tourEmits = tour.tourEmits;
exports.tourProps = tour.tourProps;
exports.ElTour = ElTour;
exports.ElTourStep = ElTourStep;
exports["default"] = ElTour;
//# sourceMappingURL=index.js.map
