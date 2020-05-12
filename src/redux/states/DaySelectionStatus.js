import { getCurrentWeek } from "../../helpers/dateHelpers.js";

const WeekSelection = {
  selectedWeek: getCurrentWeek(),
  disabledDays: null,
};

export default WeekSelection;
