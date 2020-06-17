import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import CurrentSelectedUser from "./subcomponents/Administratie/CurrentSelectedUser";
import DatePicker from "./subcomponents/Administratie/DatePicker";
import Overview from "./subcomponents/Administratie/Overview";
import "../components/subcomponents/CSS/Default.css";

class Administration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container className="PageBackground">
        <Row>
          <Col md="4">
            <Card>
              <Card>
                <Card.Body className="SelectedUser">
                  <CurrentSelectedUser />
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <DatePicker></DatePicker>
                </Card.Body>
              </Card>
            </Card>
          </Col>
          <Col md="8">
            <Overview />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Administration;
