import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container } from "react-bootstrap";
import "./CSS/OverviewStyle.css";
import { compose } from "redux";
import { connect } from "react-redux";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderOverview() {
    let renderedOverview = "Testing";
    return renderedOverview;
  }

  render() {
    return (
      <Card className="HeightContainer">
        <Card.Body>
          <Container>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>In Time</th>
                </tr>
              </thead>
              <tbody>
                {this.props.payload.map((item, key) => (
                  <tr key={key}>
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    {!item.toLate ? <td>&#10003;</td> : <td>&#10005;</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

const MyComponent = compose(
  withTranslation(),
  connect((state) => {
    return {
      payload: state.AdminOvervieuw.payload,
    };
  })
)(Overview);

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function App() {
  return (
    <React.Suspense fallback="loading">
      <MyComponent />
    </React.Suspense>
  );
}
