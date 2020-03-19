import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Row, Container, Pagination } from "react-bootstrap";
import { getCurrentWeek } from "../../../helpers/helpers.js";

export default function WeekSelection(props) {
  const { t } = useTranslation();
  /* --------------------------------------------- */
  const renderWeeks = function() {
    let renderedWeeks = [];
    for (let week = -2; week < 6; week++) {
      if (week === 0) {
        renderedWeeks.push(
          <Pagination.Item style={{ textDecoration: "underline" }}>
            {getCurrentWeek() + week}
          </Pagination.Item>
        );
      } else {
        renderedWeeks.push(
          <Pagination.Item>{getCurrentWeek() + week}</Pagination.Item>
        );
      }
    }
    return renderedWeeks;
  };
  /* --------------------------------------------- */
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
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <Pagination
                className="justify-content-center"
                style={{ overflow: "hidden" }}
              >
                <Pagination.Prev />
                {renderWeeks()}
                <Pagination.Next />
              </Pagination>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}
