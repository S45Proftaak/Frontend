import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container} from "react-bootstrap";
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
    return (
      <Card className="HeightContainer">
        <Card.Body>
          <Container>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>In Time</th>
                </tr>
                <tr>
                    <td>15/08/2019</td>
                    <td>Jill Smith</td>
                    <td>&#10003;</td>
                </tr>
                <tr>
                    <td>15/08/2019</td>
                    <td>Archie John</td>
                    <td>&#10005;</td>
                </tr>
                <tr>
                    <td>15/08/2019</td>
                    <td>Ethan Johnson</td>
                    <td>&#10005;</td>
                </tr>
                <tr>
                    <td>16/08/2019</td>
                    <td>Jill Smith</td>
                    <td>&#10003;</td>
                </tr>
                <tr>
                    <td>16/08/2019</td>
                    <td>Archie John</td>
                    <td>&#10005;</td>
                </tr>
                <tr>
                    <td>16/08/2019</td>
                    <td>Ethan Johnson</td>
                    <td>&#10005;</td>
                </tr>
                <tr>
                    <td>17/08/2019</td>
                    <td>Jill Smith</td>
                    <td>&#10003;</td>
                </tr>
                <tr>
                    <td>17/08/2019</td>
                    <td>Archie John</td>
                    <td>&#10005;</td>
                </tr>
                <tr>
                    <td>17/08/2019</td>
                    <td>Ethan Johnson</td>
                    <td>&#10005;</td>
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
