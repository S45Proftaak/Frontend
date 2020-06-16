import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import DaySelectionReducer from "./DaySelectionReducer";
import AdminOvervieuwReducer from "./AdminOvervieuwReducer";
import AdminReducer from "./AdminReducer"

const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  daySelectionReducer: DaySelectionReducer,
  AdminOvervieuw: AdminOvervieuwReducer,
  AdminReducer: AdminReducer
});

export default rootReducer;
