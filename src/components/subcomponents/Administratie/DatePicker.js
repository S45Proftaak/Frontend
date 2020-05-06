import React from 'react';
import {makeHttpCall, requestTypes} from "../../../helpers/httpHelper";
import {useSelector} from 'react-redux';
import DayPicker from 'react-day-picker';
import RangeSelector from './RangeSelector.js';
import 'react-day-picker/lib/style.css';

export default function DatePicker(){

    const getUsersBetweenDatesLink = null;
    const baseLink = null;

    const basemodel = useSelector(state => state.loginReducer.payload.links);
    if(basemodel != undefined){
        getUsersBetweenDatesLink = basemodel.secretaryLinks.GET_USERS_BETWEEN_DATES;
        baseLink = basemodel.secretaryLinks.BASE;
    }

    let fetchUserByDate = async (startDate, endDate) => {
        if(getUsersBetweenDatesLink === undefined){
            console.error("Request link could not be found");
            return undefined;
        }

        if(baseLink === undefined){
            console.error("Base link could not be found");
            return undefined;
        }

        if(startDate === undefined || endDate === undefined){
            console.error("Missing parameter");
            return undefined;
        }

        const fullLink = "http://localhost:8020" + baseLink + getUsersBetweenDatesLink + "?start=" + startDate + "&end=" + endDate;
        const result = await makeHttpCall(fullLink, requestTypes.GET, undefined);
        return result;
    }

    return(
        <div>
            <RangeSelector></RangeSelector>
        </div>
    );
  }