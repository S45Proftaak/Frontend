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
    case "SELECT_DAY": {
      return { ...state, lastClickedDate: action.payload };
    }
    default: {
      return state;
    }
  }
}
