import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./CSS/OverviewStyle.css"

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
    return (
      <Card className="HeightContainer">
        <Card.Body>
          <Container>
            <table>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
                <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                </tr>
            </table>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

const MyComponent = withTranslation()(Overview);

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function App() {
  return (
    <React.Suspense fallback="loading">
      <MyComponent />
    </React.Suspense>
  );
}
