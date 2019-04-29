import React, { Component, createRef } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { compose } from "redux";
import axios from "axios";
import _ from "lodash";
import { StickyContainer, Sticky } from "react-sticky";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
// import Measure from "react-measure";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as actions from "../actions";
import InputSimpleSelect from "../inputs/InputSimpleSelect";
import PlayersScoresRow from "../components/PlayersScores/PlayersScoresRow";
import PlayersScoresHead from "../components/PlayersScores/PlayersScoresHead";
import SummaryRow from "../components/PlayersScores/SummaryRow.js";
import {
  dynamicSort,
  addRank,
  searchingInArray,
  addRankWithCenter,
  combineStyles
} from "../functions/functions";
import { tableHeadStyles } from "../skins/mainStyles";
import Pagination from "../skins/Pagination";
import ButtonMy from "../skins/ButtonMy";
import ExportExcel from "./PlayersScores/ExportExcel";

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
    factor: false,
    isClass: false,
    klasy: [],
    klasaId: null,
    klasaName: "",
    filtered: false,
    autoScroll: false,
    onScreenPosition: 0
  };

  componentDidMount() {
    turnamentId = window.location.pathname.split("/")[2];

    // Events.scrollEvent.register("begin", function() {
    //   console.log("begin", arguments);
    // });
    //
    // Events.scrollEvent.register("end", function() {
    //   console.log("end", arguments);
    // });

    // console.log(
    //   "psm",
    //   this.props.auth.isAuthenticated,
    //   // this.props.add.turnamentId,
    //   turnamentId
    //   // this.props
    // );
    this.fetch();
  }

  fetch = () => {
    console.log("im fetching");
    this.props.auth.isAuthenticated
      ? this.props.fetchFromDB("players", null, turnamentId)
      : this.props.fetchFromDB("playersopen", null, turnamentId);
    this.props.auth.isAuthenticated ||
      this.props.fetchFromDB(
        "turnamentsOpen",
        `/api/turnamentsopen/${turnamentId}`,
        null
      );
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.players !== nextProps.players ||
      this.props.turnaments !== nextProps.turnaments
    ) {
      this.makeMatrix(nextProps);
    }
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };
  scrollTo = () => {
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  };

  scrollLoop = async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.fetch();
        resolve("foo");
      }, 5000);
    });
    this.jumping();
    // console.log("after fetch()");
  };

  jumping = () => {
    const { autoScroll, matrixUnifilltered, klasy } = this.state;
    let viewportHeight = document.getElementById("last").offsetTop;
    const scrollOnce = 500;
    const timeForView = 10000;
    const jumps = Math.ceil(viewportHeight / scrollOnce + 1);
    let iter = 0;
    let iString;
    // let promises = [];
    let pin = Promise.resolve();
    for (let i of new Array(jumps)) {
      const howManyJumps = new Array(jumps).length;
      pin = pin.then(() => {
        const prom = new Promise(resolve =>
          setTimeout(() => {
            scroll.scrollMore(scrollOnce, { duration: 500 });
            iter++;
            iString = iter.toString();
            if (parseFloat(iString) === howManyJumps) {
              scroll.scrollToTop(2000);
              setTimeout(() => {
                this.scrollLoop();
                console.log("ost", i);
              }, 1000);
            }
            resolve();
          }, timeForView)
        );
        // promises.push(prom);
        // console.log("promises", promises);
        return prom;
      });
    }
  };

  scrolling = async () => {
    this.setState({ autoScroll: !this.state.autoScroll }, async () => {
      console.log("autoScroll", this.state.autoScroll);
      if (this.state.autoScroll) {
        // const matrixParse = _.clone(matrixUnifilltered);

        this.jumping();
        // await Promise.all(promises);
        // console.log("finish");

        // // for (let klasaChoose of klasy) {
        // //   setTimeout(function() {
        // //     const klasa = klasy.filter(klasa => klasaChoose._id === klasa._id);
        // //     const matrixFilteredLength = matrixParse.filter(
        // //       x => x.klasa === klasa[0].name
        // //     ).length;
        // //     console.log("hello", matrixFilteredLength);
        // //   }, 3000);
        // // }
        //
        // let p = Promise.resolve();
        // // let matrixFilteredLength = 1;
        // for (let klasaChoose of klasy) {
        //   p = p.then(
        //     async () =>
        //       new Promise(resolve =>
        //         setTimeout(async () => {
        //           // const klasa = klasy.filter(
        //           //   klasa => klasaChoose._id === klasa._id
        //           // );
        //           // if (klasaChoose._id === "all") {
        //           //   matrixFilteredLength = matrixParse.length;
        //           // } else {
        //           //   matrixFilteredLength = matrixParse.filter(
        //           //     x => x.klasa === klasa[0].name
        //           //   ).length;
        //           // }
        //           // console.log("klasa", klasa);
        //           // console.log("matrixFilteredLength", matrixFilteredLength);
        //           await this.displayClass(klasaChoose._id);
        //           viewportHeight = document.getElementById("last").offsetTop;
        //           console.log("id", klasaChoose._id, viewportHeight);
        //
        //           let pin = Promise.resolve();
        //           for (let i of new Array(
        //             jumps
        //           )) {
        //             pin = pin.then(
        //               () =>
        //                 new Promise(resolve =>
        //                   setTimeout(() => {
        //                     scroll.scrollMore(scrollOnce, { duration: 1000 });
        //                     resolve();
        //                   }, timeForView)
        //                 )
        //             );
        //           }
        //
        //           // scroll.scrollToBottom({
        //           //   duration: matrixFilteredLength * 200,
        //           //   delay: 1000
        //           // });
        //
        //           // scroll.scrollToBottom({
        //           //   duration: matrixFilteredLength * 50,
        //           //   delay: 500
        //           // });
        //           //
        //           // setTimeout(() => {
        //           //   scroll.scrollToTop({
        //           //     duration: matrixFilteredLength * 50,
        //           //     delay: 500
        //           //   });
        //           // }, matrixFilteredLength * 50 + 500);
        //
        //           // scroll.scrollMore(500, { duration: 1000 });
        //
        //           resolve();
        //         }, Math.ceil(viewportHeight / scrollOnce) * timeForView)
        //       )
        //   );
        // }
        //
        // // const matrixSt = JSON.stringify(matrixUnifilltered);
        // // const matrixParse = JSON.parse(matrixSt);
        //
        // // scroll.scrollToBottom({ duration: 4500 });
        //
        // // for (var i = 0; i < array.length;) {
        // //   array[i]
        // // }
      } else {
        scroll.scrollToTop(1000);
      }
    });
  };

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
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

      const isClass = thePlayers.filter(x => x.klasa);

      let klasy = [];
      let klasyObj = [];

      if (isClass.length > 0) {
        for (let player of isClass) {
          // i++;
          // klasy.push({ _id: i, name: player.klasa });
          klasy.push(player.klasa);
        }
        klasy = klasy.filter((v, i, a) => a.indexOf(v) === i);
        let i = -1;
        for (let klasa of klasy) {
          i++;
          klasyObj.push({ _id: i, name: klasa });
        }
        this.setState({
          klasy: klasyObj,
          isClass: true
        });
      } else {
        this.setState({ isClass: false });
      }

      const competitions = theTurnament[0].competitions;
      const finished = theTurnament[0].finished;
      const factor = theTurnament[0].factor;
      this.setState({ isFactor: factor });

      // console.log("every players", players);
      // console.log("turnamentId", turnamentId);
      // console.log("makeImprints", thePlayers, competitions);
      let playerCompetitions = [];
      // let summaryRow = { totalScore: 0, competitions: [] };
      let orderIsUnd = "no";
      // for (let competition of competitions) {
      //   const playerCompetition = {
      //     competition: competition.name,
      //     competitionId: competition._id,
      //     score: 0
      //   };
      //   summaryRow.competitions.push(playerCompetition);
      // }

      for (let player of thePlayers) {
        playerCompetitions = player.competitions;
        let playerTotalScore = 0;
        let playerTotalCenter = 0;
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
          rodo: player.rodo,
          klasa: player.klasa
          // factorTotal: 0
        };

        for (let competition of competitions) {
          let thisComp = { compId: "", score: 0, center: 0 };
          let center;
          if (playerCompetitions.length > 0) {
            const comp = playerCompetitions.filter(
              x => x.compId === competition._id
            );
            thisComp =
              comp.length > 0 ? comp[0] : { compId: "", score: 0, center: 0 };
            playerTotalScore = playerTotalScore + thisComp.score;
            center = thisComp.center
              ? parseFloat(thisComp.center.replace(",", "."))
              : 0;
            // console.log("center", center);
            playerTotalCenter = playerTotalCenter + center;
          }
          const playerCompetition = {
            competition: competition.name,
            competitionId: competition._id,
            score: thisComp.score,
            center: thisComp.center
          };
          playerRow.competitions.push(playerCompetition);
          // summaryRow.competitions
          // summaryRow.competitions.map(x =>
          //   x.competitionId === playerCompetition.competitionId
          //     ? (x.score = x.score + playerCompetition.score)
          //     : (x.score = x.score)
          // );
          Object.assign(playerRow, {
            totalScore: playerTotalScore,
            totalCenter: playerTotalCenter
          });
          // summaryRow.totalScore = summaryRow.totalScore + playerTotalScore;
        }
        matrix.push(playerRow);
      }

      const summaryRow = this.summaryRow(matrix);
      matrix.summaryRow = summaryRow;
      // console.log("matrix in makeMatrix", typeof matrix, matrix);

      // console.log("SummaryRow", summaryRow);
      // console.log("orderIsUnd", orderIsUnd);
      let matrixSorted = [];
      if (orderIsUnd === "yes") {
        console.log("sort via order", orderIsUnd);
        matrixSorted = addRankWithCenter(matrix, "totalScore", "totalCenter");
        this.setState(
          {
            matrix: matrixSorted,
            summaryRow,
            matrixUnifilltered: matrixSorted,
            finished
          },
          () => {
            this.sorting("playerSurname", "up");
            !isAuthenticated && factor && this.handleFactor(true);
            // this.handleFactor();
          }
        );
      } else {
        console.log("sort via surname", orderIsUnd);
        matrixSorted = addRankWithCenter(
          matrix,
          "totalScore",
          "totalCenter"
        ).sort(dynamicSort("order"));
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
          !isAuthenticated && factor && this.handleFactor(true);
          !isAuthenticated && this.sorting("rank", "up");
        }
      );
      if (this.state.filter !== "") {
        this.searching(matrixSorted, this.state.filterNames, this.state.filter);
        // this.handleFactor();
      }
    }
  };

  sorting = (what, how, id) => {
    const factor = this.state.factor;
    console.log("sortkin", what, how, id);

    let matrix = [];

    if (id) {
      const mapka = this.state.matrix.map(x =>
        Object.assign(x, {
          sort: factor
            ? x[what].filter(y => y.competitionId === id)[0].factor
            : x[what].filter(y => y.competitionId === id)[0].score
        })
      );
      // console.log("mapka", mapka);
      matrix = mapka.sort(dynamicSort("sort"));
    } else {
      matrix = this.state.matrix.sort(dynamicSort(what));
    }

    // const sortingDown = this.state.matrix.sort(dynamicSort(what)).reverse();

    if (how === "up") {
      // console.log("up");
      // this.setState({ matrix });
    } else if (how === "down") {
      // console.log("down");
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

  handleFactor = async (status, sorting) => {
    console.log("handlefactor", status, sorting);
    // const factorizationSt = JSON.stringify(this.state.matrix);
    let matrix = _.clone(this.state.matrix);
    let factorization = _.clone(this.state.matrix);
    if (status) {
      let minims = {};
      for (let competition of factorization[0].competitions) {
        Object.assign(minims, {
          [competition.competitionId]: 0
        });
      }
      // console.log("handleFactor()", minims);
      for (let player of factorization) {
        const competitions = player.competitions;

        for (let competition of competitions) {
          if (minims[competition.competitionId] === 0) {
            minims[competition.competitionId] = competition.score;
            // totalScore = totalScore + competition.score;
          } else if (
            competition.score !== 0 &&
            minims[competition.competitionId] > competition.score
          ) {
            minims[competition.competitionId] = competition.score;
          }
        }
      }

      for (let player of factorization) {
        let totalScore = 0;
        const competitions = player.competitions;

        for (let competition of competitions) {
          minims[competition.competitionId]
            ? (competition.min = minims[competition.competitionId])
            : (competition.min = 0);

          competition.score === 0
            ? (competition.factor = 0)
            : (competition.factor =
                (minims[competition.competitionId] / competition.score) * 100);
          competition.factor
            ? (totalScore = totalScore + competition.factor)
            : (totalScore = totalScore + 0);
        }
        player.factorTotal = totalScore;
      }
      // factorization = addRankWithCenter(
      //   factorization,
      //   "factorTotal",
      //   "totalCenter",
      //   true
      // );
      // factorization = addRank(factorization, "totalScore");
      factorization = addRank(factorization, "factorTotal");
      sorting && factorization.sort(dynamicSort("factorTotal")).reverse();
      // this.setState({ matrix: factorization }, async () => {
      //   await this.setAsyncState({ factor: true });
      //   console.log("matrix", factorization);
      // });
      await this.setAsyncState({ matrix: factorization, factor: true });
      console.log(
        "after factorization, after state",
        factorization,
        this.state.matrix
      );
    } else {
      // this.setState({ factor: false }, () =>
      //   // this.setState({ matrix: this.displayClass() })
      //   this.displayClass()
      // );

      matrix = addRankWithCenter(matrix, "totalScore", "totalCenter");
      sorting && matrix.sort(dynamicSort("totalScore")).reverse();
      this.setState({ matrix }, async () => {
        await this.setAsyncState({ factor: false });
      });

      // this.setState(state => {
      //   return (
      //     { factor: !state.factor },
      //     () => this.setState({ matrix: this.displayClass() })
      //   );
      // });
    }
  };

  setAsyncState = newState =>
    new Promise(resolve => this.setState(newState, () => resolve()));

  changeClass = event => {
    const { matrixUnifilltered, factor } = this.state;
    const klasaId = event.target.value;
    this.setState({ klasaId }, () =>
      // this.setState({ matrix: this.displayClass() })
      this.displayClass(klasaId)
    );
  };
  displayClass = async id => {
    const { klasy, matrixUnifilltered, factor, klasaId } = this.state;
    // let matrix = [];
    let matrixFiltered = matrixUnifilltered;
    let summaryRow = {};
    let klasa;
    if (id === "all" || id === null) {
      // console.log("displayClass()");
      // addRank(matrixUnifilltered, "totalScore");
      matrixFiltered = matrixUnifilltered;
      summaryRow = this.summaryRow(matrixUnifilltered);
      // console.log("matrixUnifilltered w all", matrixUnifilltered);
      // this.setState({
      //   matrix: matrixUnifilltered,
      //   filtered: false,
      //   summaryRow
      // });
    } else {
      // let competition = {competition: "", competitionId: "", score: 0}

      // const matrixSt = JSON.stringify(matrixUnifilltered);
      const matrixParse = _.clone(matrixUnifilltered);
      // const matrixSt = JSON.stringify(matrixUnifilltered);
      // const matrixParse = JSON.parse(matrixSt);
      klasa = klasy.filter(klasa => id === klasa._id);
      matrixFiltered = matrixParse.filter(x => x.klasa === klasa[0].name);

      // matrix = this.summaryRow(matrixFiltered);
      summaryRow = this.summaryRow(matrixFiltered);
      // matrixFiltered.summaryRow = summaryRow;
      // console.log("summaryRow", matrixFiltered);

      // : addRank(matrixFiltered, "totalScore");

      // factor || this.setState({ matrix: matrixFiltered, summaryRow });

      // factor ? this.handleFactor(true) : addRank(matrix, "totalScore");
      // factor ? addRank(matrix, "totalFactor") : addRank(matrix, "totalScore");
    }
    factor
      ? this.setState(
          {
            matrix: matrixFiltered,
            filtered: true,
            summaryRow,
            klasaName: klasa ? klasa[0].name : "Wszystkie"
          },
          async () => {
            await this.handleFactor(true, true);
          }
        )
      : this.setState(
          {
            matrix: matrixFiltered,
            filtered: true,
            summaryRow,
            klasaName: klasa ? klasa[0].name : "Wszystkie"
          },
          async () => {
            await this.handleFactor(false, true);
          }
        );
  };

  summaryRow = matrix => {
    let competitions = [];
    let totalScore = 0;
    let totalCenter = 0;
    let summaryRow = { totalScore, totalCenter, competitions };
    // console.log("matrixFiltered", matrixFiltered);
    let i = -1;
    for (let player of matrix) {
      i++;
      const playerCompetitions = JSON.parse(
        JSON.stringify(player.competitions)
      );
      if (i === 0) {
        competitions = playerCompetitions;
      } else {
        // console.log("else");
        let iter = -1;
        for (let competition of playerCompetitions) {
          iter++;
          // console.log("comp iter", competitions[iter].score);
          competitions[iter].score =
            competitions[iter].score + competition.score;
          competitions[iter].center =
            competitions[iter].center + competition.center;
        }
      }
      // const competInPlayer
    }
    for (let compet of competitions) {
      // console.log("totalScore", totalScore);
      totalScore = totalScore + compet.score;
      totalCenter = totalCenter + compet.center;
    }
    // for (var score in competitions) {
    //   if (competitions.hasOwnProperty(score)) {
    //     console.log(score + " -> " + competitions[score]);
    //   }
    // }
    summaryRow.competitions = competitions;
    summaryRow.totalScore = totalScore;
    summaryRow.totalCenter = totalCenter;
    // console.log("sum", summaryRow);
    return summaryRow;
  };

  // handleExportExcel = () => {}

  render() {
    // console.log("PlayersScores(),", this.props.add.turnamentId);
    const {
      auth: { isAuthenticated },
      raport,
      classes
    } = this.props;
    const {
      isFactor,
      factor,
      matrix,
      factorization,
      isClass,
      klasy,
      filtered,
      matrixUnifilltered,
      autoScroll,
      klasaName
    } = this.state;
    const wide = isAuthenticated && isFactor ? "200px" : "100px";
    const zmienna = this.state.filter;
    const grid = `50px 250px 100px ${isClass ? "150px" : ""} 80px repeat(${this
      .state.summaryRow &&
      this.state.summaryRow.competitions &&
      this.state.summaryRow.competitions.length}, minmax(${wide}, 1fr)) ${
      isFactor ? "0px" : "50px"
    }`;
    // console.log("sum", this.state.summaryRow);
    return (
      <div id="raport">
        {/* <h4 style={{ color: "white" }}>aslkdjfls lsakdfj</h4> */}
        {this.state.summaryRow && this.state.summaryRow.competitions ? (
          <React.Fragment>
            <div
              style={{
                display: "grid",
                gridGap: 10,
                gridTemplateColumns: "1fr 1fr"
              }}
            >
              <div
                style={{
                  display: "grid",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <img
                  src="http://wordpress1813247.home.pl/autoinstalator/wordpressplus/s1.jpg"
                  alt="new"
                  style={{ width: 500 }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <img
                  src="http://wordpress1813247.home.pl/autoinstalator/wordpressplus/s2.jpg"
                  alt="new"
                  style={{ width: 500 }}
                />
              </div>
            </div>
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
                        marginTop:
                          isAuthenticated && path !== "raport" ? 60 : 60,
                        zIndex: 3,
                        borderTop: "1px solid rgb(62, 62, 62)",
                        borderRight: "1px solid rgb(62, 62, 62)",
                        borderLeft: "1px solid rgb(62, 62, 62)"
                        // marginTop: isSticky ? 50 : 0
                        // marginTop: distanceFromTop < 60 ? 50 : 0
                        // backgroundColor: "red"
                      }}
                      className={classNames(
                        classes.firstRowHeadTable,
                        classes.table
                      )}
                    >
                      <FormGroup row>
                        {isAuthenticated && isFactor && (
                          <FormControlLabel
                            style={{ marginLeft: 10, marginTop: 5 }}
                            control={
                              <Checkbox
                                checked={this.state.factor}
                                onChange={() =>
                                  this.handleFactor(!this.state.factor)
                                }
                                // value="www"
                                // color="primary"
                              />
                            }
                            label="Faktor"
                          />
                        )}
                        {isClass && (
                          <InputSimpleSelect
                            label="Klasy"
                            name="klasy"
                            options={klasy}
                            action={this.changeClass}
                          />
                        )}
                        {/* <ExportExcel data={matrixUnifilltered} /> */}
                        {
                          // <div
                          //   style={{
                          //     display: "grid",
                          //     alignContent: "center",
                          //     marginLeft: 20
                          //   }}
                          // >
                          //   {/* <h3
                          //     style={{ color: "white" }}
                          //   >{`Klasa: ${klasaName}`}</h3> */}
                          //   <ButtonMy onClick={this.scrolling}>
                          //     Prezentuj wszystkie wyniki
                          //   </ButtonMy>
                          // </div>
                        }
                      </FormGroup>

                      <PlayersScoresHead
                        isFactor={isFactor}
                        isClass={isClass}
                        grid={grid}
                        row={matrix[0]}
                        competitionClicked={this.state.competitionClicked}
                        isAuthenticated={isAuthenticated}
                      />
                      <SummaryRow
                        isFactor={isFactor}
                        isClass={isClass}
                        factor={factor}
                        competitionClicked={this.state.competitionClicked}
                        rows={matrix}
                        // rows={filtered ? matrix : matrixUnifilltered}
                        grid={grid}
                        row={this.state.summaryRow}
                        sorting={(toSort, how, id) =>
                          this.sorting(toSort, how, id)
                        }
                        searching={(toSearch, value) =>
                          this.searching(matrixUnifilltered, toSearch, value)
                        }
                        searched={result => this.setState({ matrix: result })}
                      />
                    </header>
                  );
                }}
              </Sticky>

              {this.state.summaryRow && this.state.summaryRow.competitions ? (
                <div
                  style={{
                    borderBottom: "1px solid rgb(62, 62, 62)",
                    borderRight: "1px solid rgb(62, 62, 62)",
                    borderLeft: "1px solid rgb(62, 62, 62)"
                  }}
                >
                  <Pagination
                    data={matrix}
                    off={raport || autoScroll}
                    // off
                  >
                    <PlayersScoresRows
                      isFactor={isFactor}
                      isClass={isClass}
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
        <div id="last" />
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
  isFactor,
  turnament,
  grid,
  rowClick,
  playerClicked,
  competitionClicked,
  factor,
  isClass
}) => {
  // console.log("psr");
  return rows.map((player, i) => {
    // console.log("psr", i);
    return (
      <PlayersScoresRow
        isClass={isClass}
        factor={factor}
        vertical={i}
        grid={grid}
        key={player.playerId}
        row={player}
        turnament={turnament}
        rowClick={rowClick}
        playerClicked={playerClicked}
        competitionClicked={competitionClicked}
        isFactor={isFactor}
      />
    );
  });
};

const styles = theme => ({
  table: {
    // gridTemplateColumns:
    //   "50px minmax(80px, 100px) 1fr 1fr 1fr 1fr 1fr 1fr 1fr 70px 60px"
    // height: 44
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  confirmation: state.confirmation,
  turnaments: state.turnaments,
  players: state.players,
  loading: state.loading
});

const combinedStyles = combineStyles(styles, tableHeadStyles);

const enhance = compose(
  // withRouter,
  withStyles(combinedStyles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  ),
  MainFrameHOC({ collection })
);

export default enhance(PlayersScoresMain);
