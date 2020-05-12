import DaySelection from "../states/DaySelectionStatus.js";

export default function DaySelectionReducer(state = DaySelection, action) {
  switch (action.type) {
    case "SELECT_WEEK": {
      return { ...state, selectedWeek: action.payload };
    }
    case "GET_WEEK": {
      return state.selectedWeek;
    }
    case "DISABLED_DAYS": {
      return { ...state, disabledDays: action.payload };
    }
    default: {
      return state;
    }
  }
}
