import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import WeekSelection from "./subcomponents/Home/WeekSelection";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Row>
          <Col sm="3"></Col>
          <Col md="8">
            <WeekSelection />
          </Col>
        </Row>
        <Row>
          <Col lg></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
