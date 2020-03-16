import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Row, Container, Pagination } from "react-bootstrap";

export default function WeekOvervieuw(props) {
  const { t } = useTranslation();

  return (
    <Card style={{ margin: 5 }}>
      <Card.Body>
        <Container>
          <Row>
            <Col sm="3"></Col>
            <Col>
              <h4 className="text-center">{t("Week.weeknumber")}</h4>
            </Col>
            <Col sm="3"></Col>
          </Row>
          <Row className="justify-content-center">
            <Col>
              <Pagination>
                <Pagination.Prev />
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}
