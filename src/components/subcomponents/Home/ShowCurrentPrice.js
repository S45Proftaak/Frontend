import React, { Component } from "react";
import { Row, Container } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import "../CSS/Default.css";
import "../Admin/CSS/PriceChangeStyle.css";

class ShowCurrentPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: undefined,
      fetching: false,
      fetched: false,
      fetchAdress: "http://localhost:8020/foodorder/getCurrentPrice",
    };
  }

  function;

  componentDidMount() {
    this.GetValues(this.state.fetchAdress);
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
          fetchedData: response.price,
        });
      }
    );
  };

  render() {
    const { t } = this.props;
    let text = t("PriceChange.CurrentPrice");
    return (
      <Container>
        <Row>
          <div className="ml-auto">
            {" "}
            {text}  : €{this.state.fetchedData}
          </div>
        </Row>
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
)(ShowCurrentPrice);

export default MyComponent;
