import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./CSS/RangeSelectorStyle.css"
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DatePicker from './DatePicker';

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
      this.setState(range);
    }
  
    handleResetClick() {
      this.setState(this.getInitialState());
    }

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

const MyComponent = withTranslation()(RangeSelector);

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function App() {
  return (
    <React.Suspense fallback="loading">
      <MyComponent />
    </React.Suspense>
  );
}
