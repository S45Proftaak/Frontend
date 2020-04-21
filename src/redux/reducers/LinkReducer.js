import LinkState from "../states/LinkState";

export default function LinkReducer(state=LinkState, action){
    switch (action.type){
        case "FETCHING_LINKS": {
            return {...state, fetching: true};
        }
        case "FETCHED_LINKS": {
            return {...state, fetching: false, fetched: true, links: action.links};
        }
        case "ERRROR_LINKS": {
            return {...state, links: [], fetched: false};
        }
        default: {
            return state;
        }
    }
}