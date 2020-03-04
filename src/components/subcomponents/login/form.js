import React from "react";
import { Form as F } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Form() {
  const { t } = useTranslation();

  return (
    <F>
      <F.Group controlId="formBasicUsername">
        <F.Label>{t("Login.Username")}</F.Label>
        <input type="text" className="form-control" id="username" />
      </F.Group>

      <F.Group controlId="formBasicPassword">
        <F.Label>{t("Login.Password")}</F.Label>
        <input type="password" className="form-control" id="password"></input>
      </F.Group>

      <F.Group controlId="formBasicSubmit">
        <button type="submit" className="btn btn-primary float-right">
          {t("Login.Login")}
        </button>
      </F.Group>
    </F>
  );
}
