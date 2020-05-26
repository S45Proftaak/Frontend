import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import GeneralLeaderboard from "./subcomponents/Leaderboard/GeneralLeaderboard";
import UserLeaderboardScore from "./subcomponents/Leaderboard/UserLeaderboardScore";
import CurrentSelectedUser from "./subcomponents/Administratie/CurrentSelectedUser";
import "../components/subcomponents/CSS/Default.css";

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLeaderboard : 0,
            leaderboardName : "Meest Op Tijd Ingevuld",
            fetchAdress : "http://localhost:8020/scoreboard/get-scoreboard-in-time",
        };
    }

    CycleLeaderboards(index){
        switch (index) {
            case 0:
                this.setState({
                    currentLeaderboard : 0,
                    leaderboardName : "Meest Op Tijd Ingevuld",
                    fetchAdress : "http://localhost:8020/scoreboard/get-scoreboard-in-time",
                });

                break;
            case 1:
                this.setState({
                    currentLeaderboard : 1,
                    leaderboardName : "Meest Mee Gegeten",
                    fetchAdress : "http://localhost:8020/scoreboard/get-scoreboard-most-eaten",
                });

                break;
            case 2:
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
            <Container>
                <h1 className="text-center">
                    Leaderboard
                </h1>
                <button onClick={() => this.CycleLeaderboards(this.state.currentLeaderboard - 1)}>previous</button>
                <button onClick={() => this.CycleLeaderboards(this.state.currentLeaderboard + 1)}>next</button>
                <Row>
                    <Col md="4">
                        <Card>
                            <Card>
                                <Card.Body className="SelectedUser">
                                    <CurrentSelectedUser></CurrentSelectedUser> 
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body className="YourScore">
                                    <UserLeaderboardScore> </UserLeaderboardScore>
                                </Card.Body>
                            </Card>
                        </Card>
                    </Col>
                    <Col md="8">
                        <Card>
                            <GeneralLeaderboard name={this.state.leaderboardName} fetchLocation={this.state.fetchAdress}/>
                        </Card>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default Leaderboard;