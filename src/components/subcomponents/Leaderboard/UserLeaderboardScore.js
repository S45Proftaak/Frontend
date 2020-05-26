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
            <div className="Header"> <h3>Uw score</h3> </div>
            {this.state.fetched ? (
                        <div className="YourScoreList">
                            <div className="YourScoreItem PaddedItem">
                                <h5>Optijd ingevuld</h5>
                                    <div>Jou huidige positie: {this.state.fetchedData.positionInTime}</div>
                                    <div>Jou huidige score: {this.state.fetchedData.inTimePoints}</div>
                            </div>
                            <div className="YourScoreItem PaddedItem">
                                <h5>Telaat ingevuld</h5>
                                <div>Jou huidige positie: {this.state.fetchedData.positionTooLate}</div>
                                <div>Jou huidige score: {this.state.fetchedData.tooLatePoints}</div>
                            </div>
                            <div className="YourScoreItem-Borderless PaddedItem">
                                <h5>Meeste meegegeten</h5>
                                <div>Jou huidige positie: {this.state.fetchedData.positionGeneralRanking}</div>
                                <div>Jou huidige score: {this.state.fetchedData.totalPoints}</div>
                            </div>
                        </div>
                        
                    ) : (
                        <div></div>
                    )}
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
