import React, { Component } from "react";
import { Row, Container } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import "../CSS/Default.css";
import "./CSS/PriceChangeStyle.css";

class PriceChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: undefined,
      fetching: false,
      fetched: false,
      fetchAdress: "http://localhost:8020/foodorder/getCurrentPrice",
      inputValue: 0,

      posting: false,
      posted: false,
      postResponse: undefined,
      postAdress: "http://localhost:8020/admin/updatePrice",
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

  PostValues = (postAdress) => {
    this.setState({
      posting: true,
    });
    makeHttpCall(postAdress, this.props.token, requestTypes.PUT, {
      price: this.state.inputValue.replace(",", "."),
    }).then((response) => {
      this.setState({
        posting: false,
        posted: true,
        postResponse: response,
      });
    });
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSubmit = () => {
    this.PostValues(this.state.postAdress);
    this.GetValues(this.state.fetchAdress);
  };

  render() {
    const { t } = this.props;

    let validPrice = t("PriceChange.ValidPrice");
    let invalidPrice = t("PriceChange.InvalidPrice");

    let postFeedback;
    if (this.state.posted && this.state.postResponse === null) {
      postFeedback = <div>{validPrice}</div>;
    } else if (this.state.postResponse === 400) {
      postFeedback = <div className="invalidPrice">{invalidPrice}</div>;
    } else {
      postFeedback = <div/>;
    }

    let currentPrice = t("PriceChange.CurrentPrice");
    let newPrice = t("PriceChange.NewPrice");
    let submit = t("PriceChange.Submit");


    return (
      <Container>
        <Row>
          <div>{currentPrice}: €{this.state.fetchedData}</div>
        </Row>
        <Row>
          <div>
            {newPrice}: <input type="number" onChange={this.handleChange} />
          </div>
        </Row>
        <Row>
          <div>
            <input
              className="SubmitButton"
              type="submit"
              value={submit}
              onClick={this.handleSubmit}
            />
            {postFeedback}
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
)(PriceChange);

export default MyComponent;
