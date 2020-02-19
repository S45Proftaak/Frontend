import { LOGIN_STARTED, LOGIN_SUCCES, LOGIN_FAILED } from "../actions/types";
  
  const initialState = {
    loading: false,
    authorized: false,
    username: null,
    error: null
  };
  
  export default function loginReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_STARTED:
        return {
          ...state,
          loading: true,
          authorized: false
        };
      case LOGIN_SUCCES:
        return {
          ...state,
          loading: false,
          error: null,
          authorized: true,
          username: action.payload.username
        };
      case LOGIN_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          authorized: false,
          username: action.payload.username
        };
      default:
        return state;
    }
  }