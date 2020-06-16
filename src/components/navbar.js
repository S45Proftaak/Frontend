import React from 'react';
import {useSelector} from 'react-redux';
import { Navbar as Navigation, Nav } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import "./subcomponents/CSS/Default.css";
import "./CSS/navbar.css";

export default function Navbar(props){
    const { t } = useTranslation();
    const  loggedin = useSelector(state => state.loginReducer.loggedin);

    return(
        <Navigation expand="lg" bg="light" id="Nav">
            <Navigation.Brand href="/">FoodPlanner</Navigation.Brand>
            <Navigation.Toggle aria-controls="navbar" />
            <Navigation.Collapse id="navbar">
                {loggedin ?
                <Nav className="mr-auto">
                    {props.Navs.map((names, key) =>
                        <Nav.Link key={key} href={names.link}>{names.name}</Nav.Link>
                    )}
                </Nav>
                :
                <Nav></Nav>
                }

                {loggedin ?
                <Nav>
                    <Nav.Link href="/logout">{t("App.Logout")}</Nav.Link>
                </Nav>
                :
                <Nav></Nav>
                }
            </Navigation.Collapse>
        </Navigation>
    );
}

Navbar.Proptype = {
    Navs: PropTypes.array
}