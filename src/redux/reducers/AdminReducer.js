import AdminState from "../states/AdminState";

export default function AdminReducer(state = AdminState, action) {
  switch (action.type) {
    case "FETCHING_ADMIN_DATA": {
      return { ...state, fetching: true };
    }
    case "FETCHED_ADMIN_DATA": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        payload: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
