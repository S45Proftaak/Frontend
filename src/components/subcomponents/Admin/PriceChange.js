import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { requestTypes, makeHttpCall } from "../../../helpers/httpHelper.js";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
//import "./CSS/GeneralLeaderboardStyle.css";

class PriceChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedData: undefined,
            fetching: false,
            fetched: false,
            fetchAdress : "http://localhost:8020/foodorder/getCurrentPrice",
            inputValue: 0,
        };
    }

    function;

    componentDidMount() {
        this.GetValues(this.state.fetchAdress);
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     this.setState({
    //         fetchLocation : nextProps.fetchLocation,
    //         name : nextProps.name,
    //     });
    //     this.GetScoreboardValues(nextProps.fetchLocation);
    // }

    HandlePriceInputChange(event){
        this.setState({inputValue: event.target.value})
    }

    GetValues = (fetchAdress) => {
        this.setState({
            fetching: true,
        });
        makeHttpCall(
            fetchAdress,
            this.props.token,
            requestTypes.GET
        ).then((response) => {
            console.log(response);
            this.setState({
                fetching: false,
                fetched: true,
                fetchedData: response.price,
            });
        });
    };


    render() {
        return (
            <Container>
                <div>
                    Current Price: {this.state.fetchedData}
                </div>
                <div>
                    New Price: <input type="text" value={this.state.inputValue} onChange={this.HandlePriceInputChange}/>
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
)(PriceChange);

export default MyComponent;
