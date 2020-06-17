import React, { Component } from "react";
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
    makeHttpCall(fetchAdress, this.props.token, requestTypes.GET).then(
      (response) => {
        this.setState({
          fetching: false,
          fetched: true,
          fetchedData: response,
        });
        console.log(response);
        console.log(this.state);
      }
    );
  };

  render() {
    const { t } = this.props;
    return (
      <div className="YourScore">
        <div className="Header">
          {" "}
          <h3>{t("LeaderBoardScore.yourScore")}</h3>{" "}
        </div>
        {this.state.fetched ? (
          <div className="YourScoreList">
            <div className="YourScoreItem PaddedItem">
              <h5>{t("LeaderBoardScore.filledInTime")}</h5>
              <div>
                {this.state.fetchedData.positionInTime +
                  (this.state.fetchedData.positionInTime >= 3
                    ? "th"
                    : this.state.fetchedData.positionInTime === 1
                    ? "st"
                    : "nd")}{" "}
                - {this.state.fetchedData.inTimePoints}{" "}
                {t("LeaderBoardScore.Points")}
              </div>
            </div>
            <div className="YourScoreItem PaddedItem">
              <h5>{t("LeaderBoardScore.filledToLate")}</h5>
              <div>
                {this.state.fetchedData.positionTooLate +
                  (this.state.fetchedData.positionTooLate >= 3
                    ? "th"
                    : this.state.fetchedData.positionTooLate === 1
                    ? "st"
                    : "nd")}{" "}
                - {this.state.fetchedData.tooLatePoints}{" "}
                {t("LeaderBoardScore.Points")}
              </div>
            </div>
            <div className="YourScoreItem-Borderless PaddedItem">
              <h5>{t("LeaderBoardScore.MostEaten")}</h5>
              <div>
                {this.state.fetchedData.positionGeneralRanking +
                  (this.state.fetchedData.positionGeneralRanking >= 3
                    ? "th"
                    : this.state.fetchedData.positionGeneralRanking === 1
                    ? "st"
                    : "nd")}{" "}
                - {this.state.fetchedData.totalPoints}{" "}
                {t("LeaderBoardScore.Points")}
              </div>
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
