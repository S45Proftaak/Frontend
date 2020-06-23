import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Form from "./subcomponents/login/form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchedLoginData,
} from "../redux/actions/LoginActions";
import { Redirect } from "react-router-dom";

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loggedin = useSelector((store) => store.loginReducer.loggedin);

  function Submit(event) {
    const form = document.getElementById("LoginForm");
    const data = new FormData(form);
    const formmodel = {};
    for (var pair of data.entries()) {
      formmodel[pair[0]] = pair[1];
    }
    FetchLoginData(formmodel);
  }

  let FetchLoginData = async (formData) => {
    const serializedData = JSON.stringify(formData);
    fetch("http://localhost:8020/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: serializedData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          dispatch(fetchedLoginData(result));
        })
        .catch(er => {
          alert(t("Login.Error"))
        })
  };

  if (!loggedin) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <Card.Header style={{ fontSize: 30, fontWeight: 600 }}>
                {t("Login.Login")}
              </Card.Header>
              <Card.Body>
                <Form onSubmit={Submit} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  else {
    return (
      <Redirect to="/" />
    );
  }
}
