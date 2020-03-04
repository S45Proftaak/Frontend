import React from "react";
import { Form as F } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

export default function Form() {
  const { t } = useTranslation();
  const { register, errors, handleSubmit } = useForm();

  function Submit(event) {
    event.preventdefault();
  }

  return (
    <F onSubmit={handleSubmit(Submit)}>
      <F.Group controlId="formBasicUsername">
        <F.Label>{t("Login.Username")}</F.Label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          ref={register({
            required: true
          })}
        />
        {errors.username && errors.username.type === "required" && (
          <span className="text-danger">{t("Login.UsernameError")}</span>
        )}
      </F.Group>

      <F.Group controlId="formBasicPassword">
        <F.Label>{t("Login.Password")}</F.Label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          ref={register({
            required: true
          })}
        ></input>
        {errors.username && errors.username.type === "required" && (
          <span className="text-danger">{t("Login.PasswordError")}</span>
        )}
      </F.Group>

      <F.Group controlId="formBasicSubmit">
        <button type="submit" className="btn btn-primary float-right">
          {t("Login.Login")}
        </button>
      </F.Group>
    </F>
  );
}
