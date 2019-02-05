import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";
import StatementForm from "./Statement/StatementForm";
// import PlayersList from "./Players/PlayersList";

const collection = "statement";

class Statement extends React.Component {
  state = {
    competitions: [],
    turnament: {},
    players: []
  };

  componentWillMount() {
    const {
      add: { turnamentId },
      fetchFromDB,
      turnaments,
      players
    } = this.props;
    fetchFromDB("players", null, turnamentId);
    this.fetchCompetitions(turnaments, players);
  }

  componentWillReceiveProps(nextProps) {
    const { turnaments, players } = this.props;
    if (players !== nextProps.players || turnaments !== nextProps.turnaments) {
      this.fetchCompetitions(nextProps.turnaments, nextProps.players);
    }
  }

  fetchCompetitions = (turnaments, players) => {
    console.log("fetchCompetitions()");
    const {
      // turnaments,
      add: { turnamentId }
    } = this.props;
    const turnament = turnaments.filter(x => x._id === turnamentId);
    const competitions =
      turnaments && turnaments[0] && turnament[0].competitions;
    this.setState({ turnament: turnament[0], competitions, players });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.competitions && (
          <StatementForm
            // object={this.state.competitions}
            competitions={
              this.state.competitions ? this.state.competitions : []
            }
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  confirmation: state.confirmation,
  turnaments: state.turnaments,
  players: state.players
});

const enhance = compose(
  // withRouter,
  withTheme(),
  connect(
    mapStateToProps,
    actions
  ),
  MainFrameHOC({ collection })
);

export default enhance(Statement);
