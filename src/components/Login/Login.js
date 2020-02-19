import React, { Component } from "react";
import "./Login.css";
import { Form, Button } from "react-bootstrap";

class Login extends Component {
  render() {
    return (
      <div>
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + "/images/Placeholder.png"}
            alt="Logo"
          />
        </div>
        <div className="loginInfo">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
