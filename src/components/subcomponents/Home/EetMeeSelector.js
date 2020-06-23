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
import "../CSS/Default.css";
import ShowCurrentPrice from  "./ShowCurrentPrice";

class EetMeeSelector extends Component {
  /* ------------------------------------ */
  // Constructor containing static data
  /* ------------------------------------ */
  constructor(props) {
    super(props);
    this.state = {
      days: [
        { key: 0, tName: "Utils.Monday", disabled: false, isLoading: false },
        { key: 1, tName: "Utils.Tuesday", disabled: false, isLoading: false },
        { key: 2, tName: "Utils.Wednesday", disabled: false, isLoading: false },
        { key: 3, tName: "Utils.Thursday", disabled: false, isLoading: false },
        { key: 4, tName: "Utils.Friday", disabled: false, isLoading: false },
      ],
      isLoading: false,
    };
    for (let day of this.state.days) {
      day.date = getDayOfMonthByWeekAndDay(this.props.selectedWeek, day.key);
      /*this.state.formattedStringDays.push(formatDateToString(day.date));*/
    }
  }
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
  submitDay(date, day) {
    let model = this.state.days;
    model[day].isLoading = true;
    this.setState({ days: model });
    makeHttpCall(
      "http://localhost:8020/foodorder/add-order",
      this.props.token,
      requestTypes.POST,
      { date: formatDateToString(date) }
    ).then((response) => {
      const stringDays = this.formatStringDays(this.props.selectedWeek);
      makeHttpCall(
        "http://localhost:8020/foodorder/all-orders-per-week",
        this.props.token,
        requestTypes.GET,
        { dates: stringDays }
      ).then((response) => {
        model[day].isLoading = false;
        this.setState({ days: model });
        this.props.dispatch(setDisabledDays(response));
      });
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
      if (this.props.disabledDates != null) {
        if (this.props.disabledDates.length > 0) {
          if (this.props.disabledDates.includes(formatDateToString(date))) {
            colorStyling = "success";
            text = t("Week.participated");
          }
        }
      }

      if (!day.isLoading) {
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
                  onClick={(event) => this.submitDay(date, day.key)}
                  disabled={day.isLoading}
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
    return renderedDays;
  }
  render() {
    return (
      <Card style={{ margin: 5 }}>
        <Card.Body className="DefaultCardLayer1">
          <Container>
            <Row>
              <Col md="4">
                <p style={{ textDecoration: "underline" }}>
                  Week {this.props.selectedWeek}
                </p>
              </Col>
              <Col md="4">
                <h4 className="text-center">Eet Mee Selector</h4>
              </Col>
              <Col md="4">
                <ShowCurrentPrice/>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>{this.renderDays()}</Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps(state) {
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
