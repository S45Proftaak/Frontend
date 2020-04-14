import React from "react";
import { Form as F } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

export default function Form(props) {
  const { t } = useTranslation();
  const { register, errors, handleSubmit } = useForm();

  return (
    <F id="LoginForm" onSubmit={handleSubmit(props.onSubmit)}>
      <F.Group controlId="formBasicUsername">
        <F.Label>{t("Login.Email")}</F.Label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
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
        {errors.password && errors.password.type === "required" && (
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
