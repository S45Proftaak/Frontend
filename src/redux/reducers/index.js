import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import DaySelectionReducer from "./DaySelectionReducer";
import AdminOvervieuwReducer from "./AdminOvervieuwReducer";

const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  daySelectionReducer: DaySelectionReducer,
  AdminOvervieuw: AdminOvervieuwReducer,
});

export default rootReducer;
