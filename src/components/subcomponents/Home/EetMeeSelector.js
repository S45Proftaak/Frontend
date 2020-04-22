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
  submitDay(dayNr) {
    console.log("Hey you clicked on " + dayNr);
    makeHttpCall(
      "http://localhost:8020/foodorder/all-orders-per-week",
      requestTypes.GET,
      { dates: ["2011-22-03", "2011-23-03", "2020-04-08"] }
    ).then((response) => {
      console.log(response);
    });
  }
  renderDays() {
    const { t } = this.props;
    let renderedDays = [];
    console.log("The selected week by renderDays() is");
    console.log(this.props.selectedWeek);
    let days = [
      { key: 0, name: t("Utils.Monday") },
      { key: 1, name: t("Utils.Tuesday") },
      { key: 2, name: t("Utils.Wednesday") },
      { key: 3, name: t("Utils.Thursday") },
      { key: 4, name: t("Utils.Friday") },
    ];
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
              <Button onClick={(event) => this.submitDay(day.key)}>
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
