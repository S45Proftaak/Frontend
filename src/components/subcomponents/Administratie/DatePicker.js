import React from 'react';
import {makeHttpCall, requestTypes} from "../../../helpers/httpHelper";
import {useSelector} from 'react-redux';



export default function DatePicker(){
    const getUsersBetweenDatesLink = useSelector(state => state.loginReducer.payload.links.secretaryLinks.GET_USERS_BETWEEN_DATES);

    let fetchUserByDate = async (startDate, endDate) => {
        if(getUsersBetweenDatesLink === undefined){
            console.error("Request link could not be found");
            return undefined;
        }

        if(startDate === undefined || endDate === undefined){
            console.error("Missing parameter");
            return undefined;
        }

        const fullLink = "http://localhost:8020" + undefined + getUsersBetweenDatesLink + "?start=" + startDate + "&end=" + endDate;
        const result = makeHttpCall(fullLink, requestTypes.GET, undefined);
        return result;
    }

    return(
        <div>

        </div>
    );
}