import DaySelection from "../states/DaySelectionStatus.js";

export default function DaySelectionReducer(state = DaySelection, action) {
  switch (action.type) {
    case "SELECT_WEEK": {
      return { ...state, selectedWeek: action.payload };
    }
    case "SELECT_DAY": {
      return { ...state, selectedDay: action.payload };
    }
    default: {
      return state;
    }
  }
}
