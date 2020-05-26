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
                <h2>Uw score</h2>
            </div>
            <div className="YourScoreList">
                <div className="BottomBorderItem">
                    <h5>Optijd ingevuld</h5>
                    <p>Your current position: 100 <br/> 
                    Your current score : 40</p>
                </div>
                <div className="YourScoreItem">
                    <h5>Meeste meegegeten</h5>
                    <p>Your current position: 200 <br/> 
                    Your current score : 30</p>
                </div>
                <div className="TopBorderItem">
                    <h5>Telaat ingevuld</h5>
                    <p>Your current position: 4 <br/> 
                    Your current score : 300</p>
                </div>
            </div>
        </div>
    );
    }
}

const MyComponent = compose(
    withTranslation()
)(MinstOptijdIngevuldLeaderboard);

export default MyComponent;
