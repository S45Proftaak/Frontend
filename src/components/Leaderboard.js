import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import GeneralLeaderboard from "./subcomponents/Leaderboard/GeneralLeaderboard";
import UserLeaderboardScore from "./subcomponents/Leaderboard/UserLeaderboardScore";
import CurrentUser from "./subcomponents/Leaderboard/CurrentUser";
import "../components/subcomponents/CSS/Default.css";

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <h1 className="text-center">
                    Leaderboard
                </h1>
                <Row>
                    <Col md="4">
                        <Card className="LeftBox">
                            <Card>
                                <Card.Body className="SelectedUser">
                                    <CurrentUser fetchLocation={"http://localhost:8020/scoreboard/get-own-scores"}/>
                                </Card.Body>
                            </Card>
                            <Card className="YourScoreCard">
                                <Card.Body>
                                    <UserLeaderboardScore fetchLocation={"http://localhost:8020/scoreboard/get-own-scores"}/>
                                </Card.Body>
                            </Card>
                        </Card>
                    </Col>
                    <Col md="8">
                        <Card>
                            <GeneralLeaderboard />
                        </Card>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default Leaderboard;