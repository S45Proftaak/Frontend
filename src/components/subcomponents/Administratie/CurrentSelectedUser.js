import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container } from "react-bootstrap";
import "./CSS/CurrentSelectedUserStyle.css";
import "../CSS/Default.css";

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
    const { t } = this.props;
    return (
          <Container>
              <h4>
                {t("SelectedUser.CurrentlySelectedUser")}
              </h4>
          </Container>
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
