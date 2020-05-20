import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";

class MinstOptijdIngevuldLeaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedData: undefined,
            fetching: false,
            fetched: false,
        };
    }

    function

    componentDidMount() {
        this.GetScoreboardValues();
    }

    GetScoreboardValues = () => {
        this.setState({
              fetching: true,
        });
        makeHttpCall(
            this.props.fetchLocation,
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
        <Container>
        <h5 className="text-center">
        {this.props.name}
        </h5>
            <div className="text-center">
                {this.state.fetched ? (
                <div>
                   {this.state.fetchedData.map((res, id) => (
                        <div key={id}>
                            <ul>
                                <li>
                                    <div>{res.user.name} : {res.totalPoints}</div>
                                </li>
                            </ul>

                        </div>
                    ))}
                </div>
            ) : (
            <div></div>
            )}
        </div>
    </Container>
    );
    }
}

function mapStateToProps(state) {
    console.log(state.loginReducer.payload.token);
    return {
        token: state.loginReducer.payload.token,
    };
}

const MyComponent = compose(
    withTranslation(),
    connect(mapStateToProps)
)(MinstOptijdIngevuldLeaderboard);

export default MyComponent;
