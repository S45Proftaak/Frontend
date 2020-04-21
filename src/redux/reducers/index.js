import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import LinkReducer from "./LinkReducer";

const rootReducer = combineReducers({
    loginReducer: LoginReducer,
    links: LinkReducer
});

export default rootReducer;