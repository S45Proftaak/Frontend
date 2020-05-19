import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
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
            <Col md="4">
              <Card>
                <CurrentSelectedUser />
                <DatePicker/>
              </Card>
            </Col>
          <Col md="8">
              <Overview/>
            </Col>
        </Row>
            
      </Container>
    );
  }
}

export default Administration;