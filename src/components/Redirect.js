import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect as Direct } from "react-router-dom";
import jwt from "jwt-decode";

class Redirect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkForRole = () => {
    if (this.props.loggedin && this.props.token !== undefined) {
      var model = jwt(this.props.token.token);
      return model;
    } else {
      return undefined;
    }
  };

  render() {
    if (this.props.loggedin) {
      if (this.checkForRole() !== undefined) {
        let child = <Direct to="/" />;
        this.props.roles.forEach((element) => {
          if (this.checkForRole().role === element) {
            child = this.props.children;
          }
        });
        return child;
      } else {
        return <Direct to="/" />;
      }
    } else {
      return <Direct to="/login" />;
    }
  }
}

export default connect((store) => {
  return {
    loggedin: store.loginReducer.loggedin,
    token: store.loginReducer.payload,
  };
})(Redirect);
