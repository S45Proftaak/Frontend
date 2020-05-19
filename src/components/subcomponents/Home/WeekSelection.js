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
    if (week >= getCurrentWeek() - 2 && week < getCurrentWeek() + 6) {
      this.setState({ selectedWeek: week });
      const stringDays = this.formatStringDays(week);
      console.log("[WeekSelection] FormattedStringDays is the following:");
      console.log(stringDays);
      makeHttpCall(
        "http://localhost:8020/foodorder/all-orders-per-week",
        this.props.token,
        requestTypes.GET,
        { dates: stringDays }
      ).then((response) => {
        console.log("[WeekSelection] The response is the following:");
        console.log(response);
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
      renderedWeeks.push(
        <Pagination.Item
          active={getCurrentWeek() + week === this.state.selectedWeek}
          onClick={(event) => this.setSelectedWeek(getCurrentWeek() + week)}
          key={week}
          style={{
            textDecoration: styling,
          }}
        >
          {getCurrentWeek() + week}
        </Pagination.Item>
      );
    }
    return renderedWeeks;
  }

  /* --------------------------------------- */

  // Main renderer
  render() {
    const { t } = this.props;
    return (
      <Card style={{ margin: 5 }}>
        <Card.Body>
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
  console.log("[WeekSelection] Mapping state to props!!");
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

/*
export default function WeekSelection(props) {

  // Variables&Properties
  const { t } = useTranslation();
  let selectedWeek = getCurrentWeek();

  // Setter
  const setSelectedWeek = (event, week) => {
    if (week >= getCurrentWeek() - 2 && week < getCurrentWeek() + 6) {
      selectedWeek = week;
      console.log("Gewijzigd naar " + selectedWeek + " hoor!");
      this.forceRerender();
    }
  };

  // Item renderer for specific weeks
  const renderWeeks = function() {
    let renderedWeeks = [];
    for (let week = -2; week < 6; week++) {
      let styling = "none";
      if (week === 0) {
        styling = "underline";
      }
      console.log(getCurrentWeek() + week + "Halloooo en " + selectedWeek);
      renderedWeeks.push(
        <Pagination.Item
          active={getCurrentWeek() + week === selectedWeek}
          onClick={event => setSelectedWeek(event, getCurrentWeek() + week)}
          key={week}
          style={{
            textDecoration: styling
          }}
        >
          {getCurrentWeek() + week}
        </Pagination.Item>
      );
    }
    return renderedWeeks;
  };

  return (
    <Card style={{ margin: 5 }}>
      <Card.Body>
        <Container>
          <h4 className="text-center">{t("Week.weeknumber")}</h4>
          <Pagination
            className="justify-content-center"
            style={{ overflow: "hidden" }}
          >
            <Pagination.Prev
              onClick={event => setSelectedWeek(event, selectedWeek - 1)}
            />
            {renderWeeks()}
            <Pagination.Next
              onClick={event => setSelectedWeek(event, selectedWeek + 1)}
            />
          </Pagination>
        </Container>
      </Card.Body>
    </Card>
  );
}*/
