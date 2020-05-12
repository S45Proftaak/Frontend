import AdminOvervieuw from "../states/AdminOvervieuw";

export default function AdminOvervieuwReducer(state = AdminOvervieuw, action) {
  switch (action.type) {
    case "FETCHING_OVERVIEUW_DATA": {
      return { ...state, fetching: true };
    }
    case "LOGIN_OVERVIEUW_FETCHED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        loggedin: true,
        payload: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
