import React from 'react';
import { Form as form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function Form(){
    
    const { t } = useTranslation();

    return(
        <div>
            <form>
                <form.Group controlId="formBasicUsername">
                    <form.Label>{t("Login.Username")}</form.Label>
                    <input type="text" className="form-control" id="username"/>
                </form.Group>

                <form.Group controlId="formBasicPassword">
                    <form.Label>{t("Login.Password")}</form.Label>
                    <input type="password" className="form-control" id="password"></input>
                </form.Group>

                <form.Group controlId="formBasicSubmit">
                    <button type="submit" className="btn btn-primary">{t("Login.Login")}</button>
                </form.Group>
            </form>
        </div>
    );
}