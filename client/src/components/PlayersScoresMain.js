import React, { Component } from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import axios from "axios";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";
import PlayersScoresRow from "../components/PlayersScores/PlayersScoresRow";
import SummaryRow from "../components/PlayersScores/SummaryRow.js";
import { dynamicSort, addRank } from "../functions/functions";
import Pagination from "../skins/Pagination";
// import PlayersScoresForm from "./PlayersScores/PlayersScoresForm";
// import PlayersScoresList from "./PlayersScores/PlayersScoresList";

const collection = "playersScores";

class PlayersScoresMain extends Component {
  state = {
    matrix: [],
    summaryRow: [],
    matrixUnifilltered: [],
    filter: "",
    filterNames: []
  };

  componentDidMount() {
    this.props.fetchFromDB("players", null, this.props.add.turnamentId);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps", nextProps.turnaments);
    if (
      this.props.players !== nextProps.players ||
      this.props.turnaments !== nextProps.turnaments
    ) {
      // console.log("pozmienialo sie");
      this.makeMatrix(nextProps);
    }
    // if (nextProps.players.length > 0 && this.props.turnaments.length > 0) {
    //   console.log("ok");
    // }
  }

  makeMatrix = nextProps => {
    const { players, turnaments } = nextProps;
    const { turnamentId } = this.props.add;
    // console.log("makeMatrix", players.length, turnaments.length);
    let matrix = [];
    if (players.length > 0 && turnaments.length > 0) {
      // console.log("makematrix because you have all");
      const thePlayers = players.filter(x => x.turnament === turnamentId);
      const theTurnament = turnaments.filter(x => x._id === turnamentId);
      const competitions = theTurnament[0].competitions;

      // console.log("every players", players);
      // console.log("turnamentId", turnamentId);
      // console.log("makeImprints", thePlayers, competitions);
      let playerCompetitions = [];
      let summaryRow = { totalScore: 0, competitions: [] };
      let orderIsUnd = "no";
      for (let competition of competitions) {
        const playerCompetition = {
          competition: competition.name,
          competitionId: competition._id,
          score: 0
        };
        summaryRow.competitions.push(playerCompetition);
      }

      for (let player of thePlayers) {
        playerCompetitions = player.competitions;
        let playerTotalScore = 0;
        if (typeof player.order !== "number") {
          orderIsUnd = "yes";
        }
        const playerRow = {
          playerName: player.name,
          playerSurname: player.surname,
          playerId: player._id,
          competitions: [],
          order: player.order
        };

        for (let competition of competitions) {
          let thisComp = { compId: "", score: 0 };
          if (playerCompetitions.length > 0) {
            const comp = playerCompetitions.filter(
              x => x.compId === competition._id
            );
            thisComp = comp.length > 0 ? comp[0] : { compId: "", score: 0 };
            playerTotalScore = playerTotalScore + thisComp.score;
          }
          const playerCompetition = {
            competition: competition.name,
            competitionId: competition._id,
            score: thisComp.score
          };
          playerRow.competitions.push(playerCompetition);
          // summaryRow.competitions
          summaryRow.competitions.map(x =>
            x.competitionId === playerCompetition.competitionId
              ? (x.score = x.score + playerCompetition.score)
              : (x.score = x.score)
          );
          // console.log(summaryRow.competitions);
          Object.assign(playerRow, { totalScore: playerTotalScore });
          summaryRow.totalScore = summaryRow.totalScore + playerTotalScore;
        }
        matrix.push(playerRow);
      }
      // console.log("matrix", matrix);
      // console.log("SummaryRow", summaryRow);
      console.log("orderIsUnd", orderIsUnd);
      let matrixSorted = [];
      if (orderIsUnd === "yes") {
        matrixSorted = addRank(matrix, "totalScore").sort(dynamicSort("order"));
      } else {
        matrixSorted = addRank(matrix, "totalScore").sort(
          dynamicSort("playerSurname")
        );
      }

      console.log(matrixSorted);
      // matrixSorted.push(summaryRow);
      this.setState({
        matrix: matrixSorted,
        summaryRow,
        matrixUnifilltered: matrixSorted
      });
      if (this.state.filter !== "") {
        this.searching(matrixSorted, this.state.filterNames, this.state.filter);
      }
    }
  };

  sorting = (what, how, id) => {
    console.log("sortkin", what, how, id);

    let matrix = [];

    if (id) {
      const mapka = this.state.matrix.map(x =>
        Object.assign(x, {
          sort: x[what].filter(y => y.competitionId === id)[0].score
        })
      );
      console.log("mapka", mapka);
      matrix = mapka.sort(dynamicSort("sort"));
    } else {
      matrix = this.state.matrix.sort(dynamicSort(what));
    }

    // const sortingDown = this.state.matrix.sort(dynamicSort(what)).reverse();

    if (how === "up") {
      console.log("up");
      // this.setState({ matrix });
    } else if (how === "down") {
      console.log("down");
      // return sortingDown;
      matrix = matrix.reverse();
    }
    this.setState({ matrix });
    const matrixOrdered = matrix.map((x, i) =>
      Object.assign({}, { _id: x.playerId, order: i })
    );
    console.log(matrix);
    axios.post("/api/players/update_all", matrixOrdered);
  };

  searching = (array, names, value) => {
    if (value === "") {
      this.setState({ matrix: array, filter: value, filterNames: names });
    } else {
      // console.log("searching", typeof value);
      // console.log("getSuggestions", value, fetchowane, names);
      // const names = ["playerName", "playerSurname"];
      const regex = new RegExp(value.toLowerCase());
      let filtered = [];

      for (let field of names) {
        filtered.push(
          ...array.filter(suggestion =>
            regex.test(suggestion[field].toLowerCase())
          )
        );
      }
      const result = filtered.reduce(
        (x, y) => (x.includes(y) ? x : [...x, y]),
        []
      );
      this.setState({ matrix: result, filter: value, filterNames: names });
    }
  };

  render() {
    // console.log("PlayersScores(),", this.props.add.turnamentId);
    const zmienna = this.state.filter;
    return (
      <React.Fragment>
        {this.state.summaryRow && this.state.summaryRow.competitions ? (
          <SummaryRow
            row={this.state.summaryRow}
            sorting={(toSort, how, id) => this.sorting(toSort, how, id)}
            searching={(toSearch, value) =>
              this.searching(this.state.matrixUnifilltered, toSearch, value)
            }
          />
        ) : null}
        <Pagination
          data={this.state.matrix}
          // turnament={this.props.add.turnamentId}
        >
          <PlayersScoresRows
            rows={this.state.matrix}
            turnament={this.props.add.turnamentId}
          />
          {/* <h1 style={{ color: "white" }}>{zmienna}</h1>/> */}
        </Pagination>
      </React.Fragment>
    );
  }
}

const PlayersScoresRows = ({ rows, turnament }) =>
  rows.map(player => (
    <PlayersScoresRow
      key={player.playerId}
      row={player}
      turnament={turnament}
    />
  ));

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

export default enhance(PlayersScoresMain);
