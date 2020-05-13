import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import {
  getDayOfMonthByWeekAndDay,
  formatDateToString,
} from "../../../helpers/dateHelpers.js";
import { connect } from "react-redux";
import { compose } from "redux";
import "../CSS/Default.css"

class EetMeeSelector extends Component {
  /* ------------------------------------ */
  // Constructor containing static data
  /* ------------------------------------ */
  constructor(props) {
    super(props);
    this.state = {
      disabledDates: [],
      days: [
        { key: 0, tName: "Utils.Monday", date: null, disabled: false },
        { key: 1, tName: "Utils.Tuesday", date: null, disabled: false },
        { key: 2, tName: "Utils.Wednesday", date: null, disabled: false },
        { key: 3, tName: "Utils.Thursday", date: null, disabled: false },
        { key: 4, tName: "Utils.Friday", date: null, disabled: false },
      ],
      formattedStringDays: [],
    };
    for (let day of this.state.days) {
      day.date = getDayOfMonthByWeekAndDay(this.props.selectedWeek, day.key);
      this.state.formattedStringDays.push(formatDateToString(day.date));
    }
    console.log(this.props);
  }
  componentDidMount() {
    makeHttpCall(
      "http://localhost:8020/foodorder/all-orders-per-week",
      this.props.token,
      requestTypes.GET,
      { dates: this.state.formattedStringDays }
    ).then((response) => {
      console.log("The response is the following:");
      console.log(response);
      this.setState({ disabledDates: response });
    });
  }
  /* --------------------------------------- */
  // When clicking on a "Take part" button
  /* --------------------------------------- */
  submitDay(day) {
    makeHttpCall(
      "http://localhost:8020/foodorder/add-order",
      this.props.token,
      requestTypes.POST,
      { date: formatDateToString(day.date) }
    ).then((response) => {
      console.log(response);
    });
  }
  /* ------------------------------------------------- */
  // Render the days individually by looping them
  /* -------------------------------------------------- */
  renderDays() {
    const { t } = this.props;
    let renderedDays = [];
    for (let day of this.state.days) {
      const date = getDayOfMonthByWeekAndDay(this.props.selectedWeek, day.key);
      let fontWeightStyling = "normal";
      if (
        new Date().getDate() === date.getDate() &&
        new Date().getMonth() === date.getMonth() &&
        new Date().getFullYear() === date.getFullYear()
      ) {
        fontWeightStyling = "bold";
      }
      let disabledButton = false;
      if (this.state.disabledDates.length > 0) {
        if (this.state.disabledDates.includes(formatDateToString(day.date))) {
          disabledButton = true;
        }
      }
      renderedDays.push(
        <Col key={day.key}>
          <Card>
            <Card.Header>
              <p style={{ fontWeight: fontWeightStyling }}>
                {t(day.tName)}
                {"  "} {date.getDate()}{" "}
                {t("Utils.Months." + date.getMonth().toString())}
              </p>
            </Card.Header>
            <Card.Body>
              <Button
                disabled={disabledButton}
                onClick={(event) => this.submitDay(day)}
              >
                {t("Eet Mee")}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    console.log(renderedDays);
    return renderedDays;
  }
  render() {
    return (
      <Card style={{ margin: 5 }}>
        <Card.Body className="DefaultCardLayer1">
          <Container>
            <h4 className="text-center">Eet Mee Selector</h4>
            <p style={{ textDecoration: "underline" }}>
              Week {this.props.selectedWeek}
            </p>
            <Row style={{ marginTop: 20 }}>{this.renderDays()}</Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  console.log("Mapping state to props!!");
  return {
    selectedWeek: state.daySelectionReducer.selectedWeek,
    token: state.loginReducer.payload.token,
  };
}

const MyComponent = compose(
  withTranslation(),
  connect(mapStateToProps)
)(EetMeeSelector);

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function App() {
  return (
    <React.Suspense fallback="loading">
      <MyComponent />
    </React.Suspense>
  );
}
