import React, { Component } from "react";
import RoleChange from "./subcomponents/Admin/RoleChange";
import { Col, Row, Card, Container } from "react-bootstrap";
import PriceChange from "./subcomponents/Admin/PriceChange";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Container fluid="lg">
          <Row>
            <Col md="8">
              <Card>
                <Card.Body>
                  <RoleChange />
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <Card.Body>
                  <PriceChange />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Admin;
