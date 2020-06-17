import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container } from "react-bootstrap";
import "./CSS/OverviewStyle.css";
import { compose } from "redux";
import { connect } from "react-redux";
import "../CSS/Default.css";

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
    const {t} = this.props;
    let date = t("Administration.Date");
    let name = t("Administration.Name");
    let inTime = t("Administration.InTime");
    return (
      <Card className="HeightContainer">
        <Card.Body className="DefaultCardLayer1">
          <Container>
            <table>
              <thead>
                <tr>
                  <th>{date}</th>
                  <th>{name}</th>
                  <th>{inTime}</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                </tr>

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
