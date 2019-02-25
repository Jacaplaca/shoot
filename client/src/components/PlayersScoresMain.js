import React, { Component, createRef } from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import axios from "axios";
import { StickyContainer, Sticky } from "react-sticky";
// import Measure from "react-measure";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as actions from "../actions";
import PlayersScoresRow from "../components/PlayersScores/PlayersScoresRow";
import PlayersScoresHead from "../components/PlayersScores/PlayersScoresHead";
import SummaryRow from "../components/PlayersScores/SummaryRow.js";
import { dynamicSort, addRank, searchingInArray } from "../functions/functions";
import Pagination from "../skins/Pagination";
// var _ = require("lodash");
// import PlayersScoresForm from "./PlayersScores/PlayersScoresForm";
// import PlayersScoresList from "./PlayersScores/PlayersScoresList";

const collection = "playersScores";
let turnamentId;
const path = window.location.pathname.split("/")[1];

class PlayersScoresMain extends Component {
  state = {
    finished: false,
    matrix: [],
    summaryRow: [],
    matrixUnifilltered: [],
    filter: "",
    filterNames: [],
    rowWidth: -1,
    headerHeight: -1,
    playerClicked: null,
    competitionClicked: null,
    isFactor: false,
    factor: false
  };

  componentDidMount() {
    turnamentId = window.location.pathname.split("/")[2];
    // console.log(
    //   "psm",
    //   this.props.auth.isAuthenticated,
    //   // this.props.add.turnamentId,
    //   turnamentId
    //   // this.props
    // );
    this.props.auth.isAuthenticated
      ? this.props.fetchFromDB("players", null, turnamentId)
      : this.props.fetchFromDB("playersopen", null, turnamentId);
    this.props.auth.isAuthenticated ||
      this.props.fetchFromDB(
        "turnamentsOpen",
        `/api/turnamentsopen/${turnamentId}`,
        null
      );
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.players !== nextProps.players ||
      this.props.turnaments !== nextProps.turnaments
    ) {
      this.makeMatrix(nextProps);
    }
  }

  makeMatrix = nextProps => {
    const {
      players,
      turnaments,
      auth: { isAuthenticated }
    } = nextProps;
    // const { turnamentId } = this.props.add;
    // console.log("makeMatrix", players.length, turnaments.length);
    let matrix = [];
    if (players.length > 0 && turnaments.length > 0) {
      // console.log("makematrix because you have all");
      const thePlayers = players.filter(x => x.turnament === turnamentId);
      const theTurnament = turnaments.filter(x => x._id === turnamentId);
      const competitions = theTurnament[0].competitions;
      const finished = theTurnament[0].finished;
      const factor = theTurnament[0].factor;
      this.setState({ isFactor: factor });

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
          order: player.order,
          number: player.number ? player.number : "",
          rodo: player.rodo
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
      // console.log("orderIsUnd", orderIsUnd);
      let matrixSorted = [];
      if (orderIsUnd === "yes") {
        // console.log("sort via order", orderIsUnd);
        matrixSorted = addRank(matrix, "totalScore");
        this.setState(
          {
            matrix: matrixSorted,
            summaryRow,
            matrixUnifilltered: matrixSorted,
            finished
          },
          () => {
            this.sorting("playerSurname", "up");
            !isAuthenticated && factor && this.handleFactor();
          }
        );
      } else {
        // console.log("sort via surname", orderIsUnd);
        matrixSorted = addRank(matrix, "totalScore").sort(dynamicSort("order"));
      }

      // console.log(matrixSorted);
      // matrixSorted.push(summaryRow);
      this.setState(
        {
          matrix: matrixSorted,
          summaryRow,
          matrixUnifilltered: matrixSorted,
          finished
        },
        () => {
          !isAuthenticated && factor && this.handleFactor();
        }
      );
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
    // console.log(matrix);
    axios.post("/api/players/update_all", matrixOrdered);
  };

  searching = (array, names, value) => {
    if (value === "") {
      this.setState({ matrix: array, filter: value, filterNames: names });
    } else {
      this.setState({
        matrix: searchingInArray(value, array, names),
        filter: value,
        filterNames: names
      });
    }
  };

  handleFactor = () => {
    const factorizationSt = JSON.stringify(this.state.matrix);
    let factorization = JSON.parse(factorizationSt);
    let minTotalScore = 0;
    if (!this.state.factor) {
      let minims = {};
      for (let competition of factorization[0].competitions) {
        Object.assign(minims, {
          [competition.competitionId]: 0
        });
      }
      for (let player of factorization) {
        const competitions = player.competitions;
        // !player.totalScore ? (player.totalScore = 0) : null;
        if (
          // !player.minTotalScore &&
          // player.totalScore !== 0 &&
          minTotalScore === 0 &&
          player.totalScore
        ) {
          minTotalScore = player.totalScore;
        } else if (minTotalScore !== 0 && player.totalScore) {
          if (minTotalScore > player.totalScore) {
            minTotalScore = player.totalScore;
          }
        }
        for (let competition of competitions) {
          if (minims[competition.competitionId] === 0) {
            minims[competition.competitionId] = competition.score;
          } else if (
            competition.score !== 0 &&
            minims[competition.competitionId] > competition.score
          ) {
            minims[competition.competitionId] = competition.score;
          }
        }
      }

      for (let player of factorization) {
        const competitions = player.competitions;
        player.minTotalScore = minTotalScore;
        player.totalScore === 0
          ? (player.factorTotal = 0)
          : (player.factorTotal =
              (player.minTotalScore / player.totalScore) * 100);
        // player.factorTotal = ;
        console.log("player", player);

        for (let competition of competitions) {
          competition.min = minims[competition.competitionId];
          competition.score === 0
            ? (competition.factor = 0)
            : (competition.factor =
                (minims[competition.competitionId] / competition.score) * 100);
        }
      }
      factorization = addRank(factorization, "factorTotal");
      this.setState({ matrix: factorization }, () => {
        this.setState(state => {
          return { factor: !state.factor };
        });
      });

      // console.log("mims", minims);
      // console.log("factorization", factorization);
    } else {
      // this.makeMatrix(this.props);
      this.setState(state => {
        return { factor: !state.factor, matrix: this.state.matrixUnifilltered };
      });
    }
  };

  render() {
    // console.log("PlayersScores(),", this.props.add.turnamentId);
    const {
      auth: { isAuthenticated },
      raport
    } = this.props;
    const { isFactor, factor, matrix, factorization } = this.state;
    const zmienna = this.state.filter;
    const grid = `50px 250px 100px 80px repeat(${this.state.summaryRow &&
      this.state.summaryRow.competitions &&
      this.state.summaryRow.competitions.length}, minmax(100px, 1fr))`;
    // console.log("sum", this.state.summaryRow);
    return (
      <div id="raport">
        {/* <h4 style={{ color: "white" }}>aslkdjfls lsakdfj</h4> */}
        {this.state.summaryRow && this.state.summaryRow.competitions ? (
          <React.Fragment>
            <StickyContainer>
              {/* Other elements can be in between `StickyContainer` and `Sticky`,
        but certain styles can break the positioning logic used. */}
              <Sticky>
                {({
                  style,

                  // the following are also available but unused in this example
                  isSticky,
                  wasSticky,
                  distanceFromTop,
                  distanceFromBottom,
                  calculatedHeight
                }) => {
                  // console.log("isSticky", isSticky);
                  // console.log("wasSticky", wasSticky);
                  // console.log("distanceFromTop", distanceFromTop);
                  // console.log("style", style);
                  // console.log("calc", calculatedHeight);
                  return (
                    <header
                      style={{
                        ...style,
                        // top: 70
                        paddingTop:
                          isAuthenticated && path !== "raport" ? 60 : 0,
                        zIndex: 3
                        // marginTop: isSticky ? 50 : 0
                        // marginTop: distanceFromTop < 60 ? 50 : 0
                      }}
                    >
                      <FormGroup row>
                        {isAuthenticated && isFactor && (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={this.state.factor}
                                onChange={this.handleFactor}
                                // value="www"
                                // color="primary"
                              />
                            }
                            label="Faktor"
                          />
                        )}
                      </FormGroup>
                      <PlayersScoresHead
                        grid={grid}
                        row={matrix[0]}
                        competitionClicked={this.state.competitionClicked}
                      />
                      <SummaryRow
                        factor={factor}
                        competitionClicked={this.state.competitionClicked}
                        rows={this.state.matrixUnifilltered}
                        grid={grid}
                        row={this.state.summaryRow}
                        sorting={(toSort, how, id) =>
                          this.sorting(toSort, how, id)
                        }
                        searching={(toSearch, value) =>
                          this.searching(
                            this.state.matrixUnifilltered,
                            toSearch,
                            value
                          )
                        }
                        searched={result => this.setState({ matrix: result })}
                      />
                    </header>
                  );
                }}
              </Sticky>
              {this.state.summaryRow && this.state.summaryRow.competitions ? (
                <div>
                  <Pagination data={matrix} off={raport}>
                    <PlayersScoresRows
                      factor={factor}
                      grid={grid}
                      //rows={factor ? factorization : matrix}
                      turnament={
                        isAuthenticated && path !== "raport"
                          ? this.props.add.turnamentId
                          : turnamentId
                      }
                      finished={this.state.finished}
                      rowClick={(player, competition) =>
                        this.setState({
                          playerClicked: player,
                          competitionClicked: competition
                        })
                      }
                      playerClicked={this.state.playerClicked}
                      competitionClicked={this.state.competitionClicked}
                    />
                    {/* <h1 style={{ color: "white" }}>{zmienna}</h1>/> */}
                  </Pagination>
                </div>
              ) : null}
            </StickyContainer>
          </React.Fragment>
        ) : null}
        {/* <Pagination data={this.state.matrix}>
          {this.state.summaryRow && this.state.summaryRow.competitions ? (
            <PlayersScoresRows
              grid={grid}
              rows={this.state.matrix}
              turnament={this.props.add.turnamentId}
              finished={this.state.finished}
              rowClick={e => this.setState({ playerClicked: e })}
              playerClicked={this.state.playerClicked}
            />
          ) : null}
          {/* <h1 style={{ color: "white" }}>{zmienna}</h1>/> */}
        {/* </Pagination> */}
      </div>
    );
  }
}

const PlayersScoresRows = ({
  rows,
  turnament,
  grid,
  rowClick,
  playerClicked,
  competitionClicked,
  factor
}) => {
  // console.log("psr wyzej", rows, turnament, grid, rowClick, playerClicked);
  return rows.map((player, i) => {
    // console.log("psr", player.competitions[0], factor);
    return (
      <PlayersScoresRow
        factor={factor}
        vertical={i}
        grid={grid}
        key={player.playerId}
        row={player}
        turnament={turnament}
        rowClick={rowClick}
        playerClicked={playerClicked}
        competitionClicked={competitionClicked}
      />
    );
  });
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  confirmation: state.confirmation,
  turnaments: state.turnaments,
  players: state.players,
  loading: state.loading
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
