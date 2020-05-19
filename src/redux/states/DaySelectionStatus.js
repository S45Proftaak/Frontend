import { getCurrentWeek } from "../../helpers/dateHelpers.js";

const WeekSelection = {
  selectedWeek: getCurrentWeek(),
  disabledDays: null,
  lastClickedDate: null,
};

export default WeekSelection;
