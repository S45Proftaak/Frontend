import { getCurrentWeek } from "../../helpers/dateHelpers.js";

const WeekSelection = {
  selectedWeek: getCurrentWeek(),
  selectedDay: null,
};

export default WeekSelection;
