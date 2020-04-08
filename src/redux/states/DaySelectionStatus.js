import { getCurrentWeek } from "../../helpers/helpers.js";

const WeekSelection = {
  selectedWeek: getCurrentWeek(),
  selectedDay: null,
};

export default WeekSelection;
