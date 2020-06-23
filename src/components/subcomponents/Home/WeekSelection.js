import React from "react";
import { withTranslation } from "react-i18next";
import { Card, Container, Pagination } from "react-bootstrap";
import { getCurrentWeek } from "../../../helpers/dateHelpers.js";
import {
  selectWeek,
  setDisabledDays,
} from "../../../redux/actions/DaySelectionActions.js";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import {
  getDayOfMonthByWeekAndDay,
  formatDateToString,
} from "../../../helpers/dateHelpers.js";
import { connect } from "react-redux";
import { compose } from "redux";
import "../CSS/Default.css";

class WeekSelection extends React.Component {
  // Constructor including properties
  constructor(props) {
    super(props); //default
    this.state = {
      selectedWeek: getCurrentWeek(),
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
      day.date = getDayOfMonthByWeekAndDay(this.state.selectedWeek, day.key);
      this.state.formattedStringDays.push(formatDateToString(day.date));
    }
    this.setSelectedWeek(this.state.selectedWeek);
  }

  formatStringDays(week) {
    let stringDays = [];
    for (let day of this.state.days) {
      day.date = getDayOfMonthByWeekAndDay(week, day.key);
      stringDays.push(formatDateToString(day.date));
    }
    return stringDays;
  }

  // Setter methods
  setSelectedWeek(week) {
    if (week >= getCurrentWeek() - 2 && week < getCurrentWeek() + 100) {
      this.setState({ selectedWeek: week });
      const stringDays = this.formatStringDays(week);
      makeHttpCall(
        "http://localhost:8020/foodorder/all-orders-per-week",
        this.props.token,
        requestTypes.GET,
        { dates: stringDays }
      ).then((response) => {
        this.props.dispatch(setDisabledDays(response));
        this.props.dispatch(selectWeek(week));
      });
    }
  }

  // Item renderer for specific weeks
  renderWeeks() {
    let renderedWeeks = [];
    for (let week = -2; week < 6; week++) {
      let styling = "none";
      if (week === 0) {
        styling = "underline";
      }
      console.log(this.state.selectedWeek);
      renderedWeeks.push(
        <Pagination.Item
          active={getCurrentWeek() + week === this.state.selectedWeek}
          onClick={(event) => this.setSelectedWeek(getCurrentWeek() + week)}
          key={week}
          style={{
            textDecoration: styling,
          }}
        >
          {this.displayWeek(getCurrentWeek(), week)}
        </Pagination.Item>
      );
    }
    return renderedWeeks;
  }

  displayWeek(currentWeek, weekNumber){
    if(currentWeek + weekNumber >= 54){
        return currentWeek - 53 + weekNumber;
    }
    return currentWeek + weekNumber;
  }

  /* --------------------------------------- */

  // Main renderer
  render() {
    const { t } = this.props;
    return (
      <Card style={{ margin: 5 }}>
        <Card.Body className="DefaultCardLayer1">
          <Container>
            <h4 className="text-center">{t("Week.weeknumber")}</h4>
            <Pagination
              className="justify-content-center"
              style={{ overflow: "hidden" }}
            >
              <Pagination.Prev
                onClick={(event) =>
                  this.setSelectedWeek(this.state.selectedWeek - 1)
                }
              />
              {this.renderWeeks()}
              <Pagination.Next
                onClick={(event) =>
                  this.setSelectedWeek(this.state.selectedWeek + 1)
                }
              />
            </Pagination>
          </Container>
        </Card.Body>
      </Card>
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
)(WeekSelection);
//const MySecondComponent = useDispatch()(WeekSelection);

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function App() {
  return (
    <React.Suspense fallback="loading">
      <MyComponent />
    </React.Suspense>
  );
}
