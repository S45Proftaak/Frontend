import React from "react";
import { useDispatch } from "react-redux";
import { logout as out } from "../redux/actions/LoginActions";
import { Redirect } from "react-router-dom";

export default function Logout(props) {
  const dispatcher = useDispatch();

  dispatcher(out());

  return <Redirect to="login" />;
}
