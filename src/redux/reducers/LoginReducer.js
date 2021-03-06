import Login from "../states/LoginStatus";

export default function LoginReducer(state=Login, action){
    switch (action.type){
        case "FETCHING_LOGIN_DATA": {
            return {...state, fetching: true};
        }
        case "LOGIN_DATA_FETCHED": {
            return {...state, fetching: false, fetched: true, loggedin: true, payload: action.payload};
        }
        case "LOGOUT": {
            return {...state, loggedin: false, payload: [], fetched: false};
        }
        case "LOGIN_ERROR": {
            return{...state, loggedin: false, payload: [], fetched: false, fetching: false, error: true}
        }
        case "RESET_ERROR" : {
            return{...state, loggedin: false, payload: [], fetched: false, fetching: false, error: false}
        }
        default: {
            return state;
        }
    }
}