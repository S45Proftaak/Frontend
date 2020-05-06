import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./CSS/CurrentSelectedUserStyle.css"

class CurrentSelectedUser extends Component {
    
  constructor(props) {
    super(props);
    this.state = {};
  }  

  renderSelectedUser() {
    let renderedSelectedUser = "Testing";
    return renderedSelectedUser;
  }

  render() {
      const {t} = this.props;
    return (
      <Card style={{ margin: 5 }}>
        <Card.Body>
          <Container>
            <h4 className="text-center">{t("SelectedUser.CurrentlySelectedUser")}</h4>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

const MyComponent = withTranslation()(CurrentSelectedUser);

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function App() {
  return (
    <React.Suspense fallback="loading">
      <MyComponent />
    </React.Suspense>
  );
}
