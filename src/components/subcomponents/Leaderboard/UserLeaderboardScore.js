import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import "./CSS/UserLeaderboardScoreStyle.css";

class MinstOptijdIngevuldLeaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedData: undefined,
            fetching: false,
            fetched: false,
        };
    }


render() {
    return (
        <div className="YourScore">
            <div className="Header">
                <h2>dit is uw score</h2>
            </div>
            <div className="Body">
                <p>eerste score</p>
            </div>
        </div>
    );
    }
}

const MyComponent = compose(
    withTranslation()
)(MinstOptijdIngevuldLeaderboard);

export default MyComponent;
