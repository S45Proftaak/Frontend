import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import {
  getDayOfMonthByWeekAndDay,
  formatDateToString,
} from "../../../helpers/dateHelpers.js";
import { setDisabledDays } from "../../../redux/actions/DaySelectionActions.js";
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
      days: [
        { key: 0, tName: "Utils.Monday", disabled: false },
        { key: 1, tName: "Utils.Tuesday", disabled: false },
        { key: 2, tName: "Utils.Wednesday", disabled: false },
        { key: 3, tName: "Utils.Thursday", disabled: false },
        { key: 4, tName: "Utils.Friday", disabled: false },
      ],
      isLoading: false,
      //lastClickedDate: null,
      //formattedStringDays: [],
    };
    for (let day of this.state.days) {
      day.date = getDayOfMonthByWeekAndDay(this.props.selectedWeek, day.key);
      /*this.state.formattedStringDays.push(formatDateToString(day.date));*/
    }
    console.log(this.props);
  }
  /*componentDidMount() {
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
  }*/
  formatStringDays(week) {
    let stringDays = [];
    for (let day of this.state.days) {
      day.date = getDayOfMonthByWeekAndDay(week, day.key);
      stringDays.push(formatDateToString(day.date));
    }
    return stringDays;
  }

  /* --------------------------------------- */
  // When clicking on a "Take part" button
  /* --------------------------------------- */
  submitDay(date) {
    this.setState({ isLoading: true });
    makeHttpCall(
      "http://localhost:8020/foodorder/add-order",
      this.props.token,
      requestTypes.POST,
      { date: formatDateToString(date) }
    ).then((response) => {
      console.log(response);
      const stringDays = this.formatStringDays(this.props.selectedWeek);
      makeHttpCall(
        "http://localhost:8020/foodorder/all-orders-per-week",
        this.props.token,
        requestTypes.GET,
        { dates: stringDays }
      ).then((response) => {
        this.setState({ isLoading: false });
        console.log("[WeekSelection] The response is the following:");
        console.log(response);
        this.props.dispatch(setDisabledDays(response));
      });
      //this.props.dispatch(selectDay(date));
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
      let colorStyling = "primary";
      let text = t("Week.participate");
      if (
        new Date().getDate() === date.getDate() &&
        new Date().getMonth() === date.getMonth() &&
        new Date().getFullYear() === date.getFullYear()
      ) {
        fontWeightStyling = "bold";
      }
      //console.log("Checking the DisabledDates!");
      //console.log(this.props.disabledDates);
      if (this.props.disabledDates.length > 0) {
        if (this.props.disabledDates.includes(formatDateToString(date))) {
          colorStyling = "success";
          text = t("Week.participated");
        }
      }
      if (!this.state.isLoading) {
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
                  variant={colorStyling}
                  onClick={(event) => this.submitDay(date)}
                  disabled={this.state.isLoading}
                >
                  {text}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      } else {
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
                <Spinner animation="border" size="sm" />
              </Card.Body>
            </Card>
          </Col>
        );
      }
    }
    //console.log(renderedDays);
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
  console.log("[EetMeeSelector] Mapping state to props!!");
  console.log("[EetMeeSelector] disabledDays is the following:");
  console.log(state.daySelectionReducer.disabledDays);
  return {
    selectedWeek: state.daySelectionReducer.selectedWeek,
    disabledDates: state.daySelectionReducer.disabledDays,
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
