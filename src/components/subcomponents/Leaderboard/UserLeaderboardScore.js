import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import "./CSS/UserLeaderboardScoreStyle.css";

class UserLeaderboardScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedData: undefined,
            fetching: false,
            fetched: false,
        };
    }


    componentDidMount() {
        this.GetScoreboardValues(this.props.fetchLocation);
    }

    GetScoreboardValues = (fetchAdress) => {
        this.setState({
            fetching: true,
        });
        console.log(fetchAdress);
        makeHttpCall(
            fetchAdress,
            this.props.token,
            requestTypes.GET
        ).then((response) => {
            this.setState({
                fetching: false,
                fetched: true,
                fetchedData: response,
            });
            console.log(response);
            console.log(this.state);
        });
    };


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
            <div className="Body">
                    {this.state.fetched ? (
                        <div>
                            <div>Op tijd ingevuld
                                <div>positie: {this.state.fetchedData.positionInTime}</div>
                                <div>score: {this.state.fetchedData.inTimePoints}</div>
                            </div>
                            <div>Te laat ingevuld
                                <div>positie: {this.state.fetchedData.positionTooLate}</div>
                                <div>score: {this.state.fetchedData.tooLatePoints}</div>
                            </div>
                            <div>Meest mee gegeten
                                <div>positie: {this.state.fetchedData.positionGeneralRanking}</div>
                                <div>score: {this.state.fetchedData.totalPoints}</div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
            </div>
        </div>
    );
    }
}

function mapStateToProps(state) {
    return {
        token: state.loginReducer.payload.token,
    };
}

const MyComponent = compose(
    withTranslation(),
    connect(mapStateToProps)
)(UserLeaderboardScore);

export default MyComponent;
