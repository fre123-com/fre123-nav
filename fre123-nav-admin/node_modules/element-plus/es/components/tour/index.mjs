import '../../utils/index.mjs';
import Tour from './src/tour2.mjs';
import TourStep from './src/step2.mjs';
export { tourEmits, tourProps } from './src/tour.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElTour = withInstall(Tour, {
  TourStep
});
const ElTourStep = withNoopInstall(TourStep);

export { ElTour, ElTourStep, ElTour as default };
//# sourceMappingURL=index.mjs.map
