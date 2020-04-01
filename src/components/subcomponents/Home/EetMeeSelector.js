import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

class EetMeeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderDays() {
    const { t } = this.props;
    let renderedDays = [];
    let days = [
      t("Monday"),
      t("Tuesday"),
      t("Wednesday"),
      t("Thursday"),
      t("Friday")
    ];
    console.log(days);
    for (let day of days) {
      renderedDays.push(
        <Col>
          <Card>
            <Card.Header>{day.toString()}</Card.Header>
            <Card.Body>
              <Button>{t("Eet Mee")}</Button>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return renderedDays;
  }
  render() {
    const { t } = this.props;
    return (
      <Card style={{ margin: 5 }}>
        <Card.Body>
          <Container>
            <h4 className="text-center">Eet Mee Selector</h4>
            <Row style={{ marginTop: 20 }}>{this.renderDays()}</Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

const MyComponent = withTranslation()(EetMeeSelector);

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function App() {
  return (
    <React.Suspense fallback="loading">
      <MyComponent />
    </React.Suspense>
  );
}
