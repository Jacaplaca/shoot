import React, { Component } from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";
import PlayersScoresRow from "../components/PlayersScores/PlayersScoresRow";
// import PlayersScoresForm from "./PlayersScores/PlayersScoresForm";
// import PlayersScoresList from "./PlayersScores/PlayersScoresList";

const collection = "playersScores";

class PlayersScores extends Component {
  state = { matrix: [] };

  componentDidMount() {
    this.props.fetchFromDB("players", null, this.props.add.turnamentId);
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps.turnaments);
    if (
      this.props.players !== nextProps.players ||
      this.props.turnaments !== nextProps.turnaments
    ) {
      console.log("pozmienialo sie");
      this.makeMatrix(nextProps);
    }
    // if (nextProps.players.length > 0 && this.props.turnaments.length > 0) {
    //   console.log("ok");
    // }
  }

  makeMatrix = nextProps => {
    const { players, turnaments } = nextProps;
    const { turnamentId } = this.props.add;
    console.log("makeMatrix", players.length, turnaments.length);
    let matrix = [];
    if (players.length > 0 && turnaments.length > 0) {
      console.log("makematrix because you have all");
      const thePlayers = players.filter(x => x.turnament === turnamentId);
      const theTurnament = turnaments.filter(x => x._id === turnamentId);
      const competitions = theTurnament[0].competitions;

      // console.log("every players", players);
      // console.log("turnamentId", turnamentId);
      // console.log("makeImprints", thePlayers, competitions);
      let playerCompetitions = [];

      for (let player of thePlayers) {
        playerCompetitions = player.competitions;
        const playerRow = {
          player: `${player.name} ${player.surname}`,
          playerId: player._id,
          competitions: []
        };

        for (let competition of competitions) {
          let thisComp = { compId: "", score: 0 };
          if (playerCompetitions.length > 0) {
            const comp = playerCompetitions.filter(
              x => x.compId === competition._id
            );
            thisComp = comp.length > 0 ? comp[0] : { compId: "", score: 0 };
          }
          const playerCompetition = {
            competition: competition.name,
            competitionId: competition._id,
            score: thisComp.score
          };
          playerRow.competitions.push(playerCompetition);
        }
        matrix.push(playerRow);
      }
      console.log("matrix", matrix);
      this.setState({ matrix });
    }
  };

  render() {
    // console.log("PlayersScores(),", this.props.add.turnamentId);
    return (
      <React.Fragment>
        {this.state.matrix.map(player => (
          <PlayersScoresRow
            key={player.playerId}
            row={player}
            turnament={this.props.add.turnamentId}
          />
        ))}
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

export default enhance(PlayersScores);
