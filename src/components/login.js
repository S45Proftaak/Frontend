import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Form from "./subcomponents/login/form";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();

  function Submit(event){
    const form = document.getElementById('LoginForm');
    const data = new FormData(form);
    const formmodel = {};
    for (var pair of data.entries()){
      formmodel[pair[0]] = pair[1];
    }
    FetchLoginData(formmodel);
  }

  let FetchLoginData = async(formData) => {
    console.log(JSON.stringify(formData));
  }

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
