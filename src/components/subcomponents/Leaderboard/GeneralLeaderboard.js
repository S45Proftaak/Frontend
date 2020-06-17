import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import "./CSS/GeneralLeaderboardStyle.css";

class GeneralLeaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedData: [],
            fetching: false,
            fetched: false,
            currentLeaderboard : 0,
            leaderboardName : "Meest Op Tijd Ingevuld",
            fetchAdress : "http://localhost:8020/scoreboard/get-scoreboard-in-time",
        };
    }

    function;

    componentDidMount() {
        this.GetScoreboardValues(this.state.fetchAdress);
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     this.setState({
    //         fetchLocation : nextProps.fetchLocation,
    //         name : nextProps.name,
    //     });
    //     this.GetScoreboardValues(nextProps.fetchLocation);
    // }

    GetScoreboardValues = (fetchAdress) => {
        this.setState({
              fetching: true,
        });
        makeHttpCall(
            fetchAdress,
            this.props.token,
            requestTypes.GET
            ).then((response) => {
                console.log(response);
                response.splice(1, 0, response.splice(0, 1)[0]);
            this.setState({
                      fetching: false,
                      fetched: true,
                      fetchedData: response,
            });
        });
    };

    CycleLeaderboards(index){
        switch (index) {
            case 0:
                this.GetScoreboardValues("http://localhost:8020/scoreboard/get-scoreboard-in-time");
                this.setState({
                    currentLeaderboard : 0,
                    leaderboardName : "Meest Op Tijd Ingevuld",
                    fetchAdress : "http://localhost:8020/scoreboard/get-scoreboard-in-time",
                });

                break;
            case 1:
                this.GetScoreboardValues("http://localhost:8020/scoreboard/get-scoreboard-most-eaten");
                this.setState({
                    currentLeaderboard : 1,
                    leaderboardName : "Meest Mee Gegeten",
                    fetchAdress : "http://localhost:8020/scoreboard/get-scoreboard-most-eaten",
                });

                break;
            case 2:
                this.GetScoreboardValues("http://localhost:8020/scoreboard/get-scoreboard-too-late");
                this.setState({
                    currentLeaderboard : 2,
                    leaderboardName : "Minst Op Tijd Ingevuld",
                    fetchAdress : "http://localhost:8020/scoreboard/get-scoreboard-too-late",
                });

                break;
        }
    }

render() {
    return (
        <Container className="footer">
            <h1 className="title">
                Leaderboard
            </h1>
        <h5 className="text-center">
            <button className="ArrowButton" onClick={() => this.CycleLeaderboards(this.state.currentLeaderboard - 1)}>{"<"}</button>
            {this.state.leaderboardName}
            <button className="ArrowButton" onClick={() => this.CycleLeaderboards(this.state.currentLeaderboard + 1)}>{">"}</button>
        </h5>
            <div className="RowContainer">
                {this.state.fetched ? (
                        <Row className="row">
                        {this.state.fetchedData.map((res, id) => (  
                            <Col sm="4" key={id} className={"collum"}>
                                <div className="Combi">
                                    <div className={"Line" + id}>{res.user.name} </div>
                                    <br/>
                                    {res.totalPoints}
                                    <br/>
                                    <div className={"rectangle rec" + id}>{id + 1 === 1 ? id + 2 : id + 1 === 2 ? id : id + 1}</div>
                                </div>
                            </Col>
                        ))}
                        </Row>
            ) : (
            <div></div>
            )}
        </div>
    </Container>
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
)(GeneralLeaderboard);

export default MyComponent;
