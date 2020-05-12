import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "./CSS/RangeSelectorStyle.css";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { formatFetchDate } from "../../../helpers/dateHelpers";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeHttpCall, requestTypes } from "../../../helpers/httpHelper";

class RangeSelector extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState({
      from: range.from,
      to: range.to,
    });
    if (range.to !== undefined) {
      this.setState({
        payload: this.fetchUserByDate(
          formatFetchDate(range.from),
          formatFetchDate(range.to)
        ),
      });
      console.log(this.state.payload);
    }
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  fetchUserByDate = (startDate, endDate) => {
    let getUsersBetweenDatesLink = undefined;
    let baseLink = undefined;
    if (this.props.links !== undefined) {
      getUsersBetweenDatesLink = this.props.links.secretaryLinks
        .GET_USERS_BETWEEN_DATES;
      baseLink = this.props.links.secretaryLinks.BASE;
    } else {
      throw new Error("No links availible");
    }

    if (getUsersBetweenDatesLink === undefined) {
      console.error("Request link could not be found");
      return undefined;
    }

    if (baseLink === undefined) {
      console.error("Base link could not be found");
      return undefined;
    }

    if (startDate === undefined || endDate === undefined) {
      console.error("Missing parameter");
      return undefined;
    }

    const fullLink =
      "http://localhost:8020" +
      baseLink +
      getUsersBetweenDatesLink +
      "?start=" +
      startDate +
      "&end=" +
      endDate;
    const result = makeHttpCall(fullLink, requestTypes.GET, undefined);
    return result;
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className="RangeExample">
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

const MyComponent = compose(
  withTranslation(),
  connect((state) => {
    return {
      links: state.loginReducer.payload.links,
    };
  })
)(RangeSelector);
// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function App() {
  return (
    <React.Suspense fallback="loading">
      <MyComponent />
    </React.Suspense>
  );
}
