import React from "react";
import { withTranslation } from "react-i18next";
import { Card, Container, Pagination } from "react-bootstrap";
import { getCurrentWeek } from "../../../helpers/helpers.js";
import { selectWeek } from "../../../redux/actions/DaySelectionActions.js";
import { connect } from "react-redux";
import { compose } from "redux";

class WeekSelection extends React.Component {
  // Constructor including properties
  constructor(props) {
    super(props); //default
    this.state = {
      selectedWeek: getCurrentWeek(),
    };
  }

  // Setter methods
  setSelectedWeek(event, week) {
    if (week >= getCurrentWeek() - 2 && week < getCurrentWeek() + 6) {
      this.props.dispatch(selectWeek(week));
      this.setState({
        selectedWeek: week,
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
          onClick={(event) =>
            this.setSelectedWeek(event, getCurrentWeek() + week)
          }
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
                  this.setSelectedWeek(event, this.state.selectedWeek - 1)
                }
              />
              {this.renderWeeks()}
              <Pagination.Next
                onClick={(event) =>
                  this.setSelectedWeek(event, this.state.selectedWeek + 1)
                }
              />
            </Pagination>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

const MyComponent = compose(withTranslation(), connect())(WeekSelection);
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
