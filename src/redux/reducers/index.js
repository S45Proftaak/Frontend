import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import DaySelectionReducer from "./DaySelectionReducer";

const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  daySelectionReducer: DaySelectionReducer,
});

export default rootReducer;
