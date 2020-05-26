import React from 'react';
import { Navbar as Navigation, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import "./subcomponents/CSS/Default.css";
import "./CSS/navbar.css";

export default function Navbar(props){

    return(
        <Navigation expand="lg" bg="light" id="Nav">
            <Navigation.Brand href="/">FoodPlanner</Navigation.Brand>
            <Navigation.Toggle aria-controls="navbar" />
            <Navigation.Collapse id="navbar">
                <Nav className="mr-auto">
                    {props.Navs.map((names, key) =>
                        <Nav.Link key={key} href={names.link}>{names.name}</Nav.Link>
                    )}
                </Nav>
            </Navigation.Collapse>
        </Navigation>
    );
}

Navbar.Proptype = {
    Navs: PropTypes.array
}