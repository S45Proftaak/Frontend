import React from "react";
import { useDispatch } from "react-redux";
import { logout as out } from "../redux/actions/LoginActions";
import { Redirect } from "react-router-dom";

export default function Logout(props) {
  const dispatcher = useDispatch();

  dispatcher(out());

  const setCoockie = (cname, cvalue) => {
    var expires = "expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  setCoockie("LoginData", null);

  return <Redirect to="login" />;
}
