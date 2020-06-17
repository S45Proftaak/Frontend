import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import "../CSS/Default.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeHttpCall, requestTypes } from "../../../helpers/httpHelper";
import handleRoleName from '../../../ChangeRoleName';

class CurrentUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: undefined,
      fetching: false,
      fetched: false,
    };
  }

  componentDidMount() {
    this.GetValues(this.props.fetchLocation);
  }

  GetValues = (fetchAdress) => {
    this.setState({
      fetching: true,
    });
    makeHttpCall(fetchAdress, this.props.token, requestTypes.GET).then(
      (response) => {
        this.setState({
          fetching: false,
          fetched: true,
          fetchedData: response,
        });
      }
    );
  };

  render() {
    const { t } = this.props;
    return (
      <Container>
        <h4>{t("SelectedUser.CurrentlySelectedUser")}</h4>
        {this.state.fetched ? (
          <div>
            <div>{this.state.fetchedData.name}</div>
            <div>{t(handleRoleName(this.state.fetchedData.role))}</div>
            <div>{this.state.fetchedData.email}</div>
          </div>
        ) : (
          <div></div>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.loginReducer.payload.token,
  };
}

const MyComponent = compose(
  withTranslation(),
  connect(mapStateToProps)
)(CurrentUser);

export default MyComponent;
