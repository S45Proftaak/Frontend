import { LOGIN_STARTED, LOGIN_SUCCES, LOGIN_FAILED } from "./types";
import axios from "axios";
import { apiUrl } from "../apiUrl"



export const loginRequest = ({ username, password }) => {
    return dispatch => {
      dispatch(LoginStarted());
  
      axios
        .post(apiUrl, {
          username,
          password
        })
        .then(res => {
          dispatch(LoginSucces(res.data));
        })
        .catch(err => {
          dispatch(LoginFailed(err.message));
        });
    };
  };

    const LoginSucces = data => ({
      type: LOGIN_SUCCES,
      payload: {
        ...data
      }
    });

    const LoginStarted = () => ({
      type: LOGIN_STARTED
    });

    const LoginFailed = error => ({
      type: LOGIN_FAILED,
      payload: {
        error
    }
  });
