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
                                    <div>{this.state.fetchedData.positionInTime}nd place - {this.state.fetchedData.inTimePoints} points</div>
                            </div>
                            <div className="YourScoreItem PaddedItem">
                                <h5>Telaat ingevuld</h5>
                                {this.state.fetchedData.positionTooLate}st place - {this.state.fetchedData.tooLatePoints} points
                            </div>
                            <div className="YourScoreItem-Borderless PaddedItem">
                                <h5>Meeste meegegeten</h5>
                                {this.state.fetchedData.positionGeneralRanking}nd place - {this.state.fetchedData.totalPoints} points
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
