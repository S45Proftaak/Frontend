import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import CurrentSelectedUser from "./subcomponents/Administratie/CurrentSelectedUser";
import DatePicker from "./subcomponents/Administratie/DatePicker";
import Overview from "./subcomponents/Administratie/Overview";

class Administration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Row>
            <Col sm="3">
              <CurrentSelectedUser />
            </Col>
              <Overview/>
            <Col md="8">
            </Col>
        </Row>
        <Row>
            <Col sm="3">
            </Col>

          <Col md="8"></Col>
        </Row>
      </Container>
    );
  }
}

export default Administration;