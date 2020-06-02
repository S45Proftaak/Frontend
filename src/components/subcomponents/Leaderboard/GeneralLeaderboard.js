import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";

class GeneralLeaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedData: undefined,
            fetching: false,
            fetched: false,

            name : this.props.name,
        };
    }

    function;

    componentDidMount() {
        this.GetScoreboardValues(this.props.fetchLocation);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            fetchLocation : nextProps.fetchLocation,
            name : nextProps.name,
        });
        this.GetScoreboardValues(nextProps.fetchLocation);
    }

    GetScoreboardValues = (fetchAdress) => {
        this.setState({
              fetching: true,
        });
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
        });
    };


render() {
    return (
        <Container>
        <h5 className="text-center">
            {this.state.name}
        </h5>
            <div className="text-center">
                {this.state.fetched ? (
                <Container>
                    <Row>
                   {this.state.fetchedData.map((res, id) => (  
                        <Col md="4" key={id}>
                            <div className={id}>{res.user.name} <br/> {res.totalPoints}<br/>  </div>
                        </Col>
                    ))}
                    </Row>
                </Container>
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
