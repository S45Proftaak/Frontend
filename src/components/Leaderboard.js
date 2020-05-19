import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import OpTijdIngevuldLeaderboard from "./subcomponents/Leaderboard/OpTijdIngevuldLeaderboard";
import MeestGegetenLeaderboard from "./subcomponents/Leaderboard/MeestGegetenLeaderboard";
import MinstOpTijdIngevuldLeaderboard from "./subcomponents/Leaderboard/MinstOptijdIngevuldLeaderboard";

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md="4">
                        <Card>
                            <OpTijdIngevuldLeaderboard/>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <MeestGegetenLeaderboard/>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <MinstOpTijdIngevuldLeaderboard/>
                        </Card>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default Leaderboard;