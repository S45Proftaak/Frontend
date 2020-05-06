import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import { getDayOfMonthByWeekAndDay } from "../../../helpers/dateHelpers.js";
import { connect } from "react-redux";
import { compose } from "redux";

class EetMeeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props);
  }
  submitDay(day) {
    console.log("Hey you clicked on " + day.key);
    makeHttpCall(
      "http://localhost:8020/foodorder/add-order",
      requestTypes.POST,
      { date: this.formatDateToString(day.date) }
    ).then((response) => {
      console.log(response);
    });
  }
  formatDateToString(date) {
    let formattedDate = date.getDate().toString();
    let formattedMonth = (parseInt(date.getMonth()) + 1).toString();
    if (formattedDate.length === 1) {
      formattedDate = "0" + formattedDate;
    }
    if (formattedMonth.length === 1) {
      formattedMonth = "0" + formattedMonth;
    }
    return date.getFullYear() + "-" + formattedMonth + "-" + formattedDate;
  }
  calculateDays() {
    const { t } = this.props;
    let days = [
      { key: 0, name: t("Utils.Monday"), date: null, disabled: false },
      { key: 1, name: t("Utils.Tuesday"), date: null, disabled: false },
      { key: 2, name: t("Utils.Wednesday"), date: null, disabled: false },
      { key: 3, name: t("Utils.Thursday"), date: null, disabled: false },
      { key: 4, name: t("Utils.Friday"), date: null, disabled: false },
    ];
    let formattedStringDays = [];
    for (let day of days) {
      day.date = getDayOfMonthByWeekAndDay(this.props.selectedWeek, day.key);
      formattedStringDays.push(this.formatDateToString(day.date));
    }
    console.log(formattedStringDays);
    makeHttpCall(
      "http://localhost:8020/foodorder/all-orders-per-week",
      requestTypes.GET,
      { dates: formattedStringDays }
    ).then((response) => {
      console.log(response);
    });
    return days;
  }
  renderDays() {
    const { t } = this.props;
    let renderedDays = [];
    console.log("The selected week by renderDays() is");
    console.log(this.props.selectedWeek);
    const days = this.calculateDays();
    for (let day of days) {
      const date = getDayOfMonthByWeekAndDay(this.props.selectedWeek, day.key);
      let styling = "normal";
      if (
        new Date().getDate() === date.getDate() &&
        new Date().getMonth() === date.getMonth() &&
        new Date().getFullYear() === date.getFullYear()
      ) {
        styling = "bold";
      }
      renderedDays.push(
        <Col key={day.key}>
          <Card>
            <Card.Header>
              <p style={{ fontWeight: styling }}>
                {day.name} {date.getDate()}{" "}
                {t("Utils.Months." + date.getMonth().toString())}
              </p>
            </Card.Header>
            <Card.Body>
              <Button onClick={(event) => this.submitDay(day)}>
                {t("Eet Mee")}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return renderedDays;
  }
  render() {
    return (
      <Card style={{ margin: 5 }}>
        <Card.Body>
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
