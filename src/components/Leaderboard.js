import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import GeneralLeaderboard from "./subcomponents/Leaderboard/GeneralLeaderboard";
import UserLeaderboardScore from "./subcomponents/Leaderboard/UserLeaderboardScore";
import CurrentSelectedUser from "./subcomponents/Administratie/CurrentSelectedUser";

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container>
                <h1 className="text-center">
                    Leaderboard
                </h1>
                <Row>
                    <Col md="4">
                        <Card>
                            <Row>
                                <Card>
                                    <CurrentSelectedUser></CurrentSelectedUser> 
                                </Card>
                            </Row>
                            <Row>
                                <Card>
                                    <UserLeaderboardScore></UserLeaderboardScore>
                                </Card>
                            </Row>
                        </Card>
                    </Col>
                    <Col md="8">
                        <Card>
                            <GeneralLeaderboard name={"Meest Op Tijd Ingevuld"} fetchLocation={"http://localhost:8020/scoreboard/get-scoreboard-in-time"}/>
                        </Card>
                    </Col>
                    {/*<Col md="4">*/}
                    {/*    <Card>*/}
                    {/*        <GeneralLeaderboard name={"Meest Mee Gegeten"} fetchLocation={"http://localhost:8020/scoreboard/get-scoreboard-most-eaten"}/>*/}
                    {/*    </Card>*/}
                    {/*</Col>*/}
                    {/*<Col md="4">*/}
                    {/*    <Card>*/}
                    {/*        <GeneralLeaderboard name={"Minst Op tijd Ingevuld"} fetchLocation={"http://localhost:8020/scoreboard/get-scoreboard-too-late"}/>*/}
                    {/*    </Card>*/}
                    {/*</Col>*/}
                </Row>

            </Container>
        );
    }
}

export default Leaderboard;