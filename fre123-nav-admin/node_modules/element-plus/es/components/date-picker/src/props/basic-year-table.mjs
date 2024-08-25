import '../../../../utils/index.mjs';
import { datePickerSharedProps, selectionModeWithDefault } from './shared.mjs';
import { buildProps } from '../../../../utils/vue/props/runtime.mjs';

const { date, disabledDate, parsedValue } = datePickerSharedProps;
const basicYearTableProps = buildProps({
  date,
  disabledDate,
  parsedValue,
  selectionMode: selectionModeWithDefault("year")
});

export { basicYearTableProps };
//# sourceMappingURL=basic-year-table.mjs.map
