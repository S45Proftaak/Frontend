import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect as Direct } from "react-router-dom";

class Redirect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.loggedin) {
      return this.props.children;
    } else {
      return <Direct to="/login" />;
    }
  }
}

export default connect((store) => {
  return {
    loggedin: store.loginReducer.loggedin,
  };
})(Redirect);
