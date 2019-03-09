import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Cookies from "universal-cookie";
import TextField from "@material-ui/core/TextField";
import { combineStyles, dynamicSort } from "../../functions/functions";
import store from "../../store";
import * as actions from "../../actions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import { formStyles } from "../../skins/mainStyles";
import { minimalSuggestion } from "../../inputs/Suggestions";
import InputComponent from "../../inputs/InputComponent";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import ChooseSelect from "../../inputs/ChooseSelect";
import FormButtons from "../../skins/FormButtons";
import ButtonMy from "../../skins/ButtonMy";
import generatePDF from "./generatePDF";
// import
const cookies = new Cookies();

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: "grey"
    }
  }
});

class StatementForm extends Component {
  state = {
    protocols: [],
    q: "",
    howManyProtocols: 0,
    competitions: [],
    factor: false
    // isClass: false
  };

  componentDidMount() {
    // cookies.set("myCat", "Pacman2", { path: "/" });
    // console.log(cookies.get("myCat")); // Pacman

    // this.setState({ q: { name: "pro2", _id: 2 } });

    this.props.competitions &&
      this.createProtocolsForForm(this.props.competitions);
  }

  componentDidUpdate() {
    const { competitions, finalProtocols } = this.state;
    const turnamentId = this.props.turnament._id;

    const cookieTurnament = JSON.parse(localStorage.getItem(turnamentId));
    const finalProtocolsCookies =
      cookieTurnament && cookieTurnament.finalProtocols;
    const competitionsCookies = cookieTurnament && cookieTurnament.competitions;
    // console.log(
    //   "ifupdate",
    //   finalProtocols !== finalProtocolsCookies,
    //   competitions !== competitionsCookies
    // );
    if (
      finalProtocols !== finalProtocolsCookies ||
      competitions !== competitionsCookies
    ) {
      // console.log("updateuje cookisa", finalProtocols);
      localStorage.setItem(
        turnamentId,
        JSON.stringify({ competitions, finalProtocols })
      );
      // cookies.set(turnamentId, { competitions, finalProtocols }, { path: "/" });
      // console.log("finalProtocolsCookies", finalProtocolsCookies);
      // console.log("competitionsCookies", competitionsCookies);

      // console.log("update get", JSON.parse(localStorage.getItem(turnamentId)));
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    const { competitions } = this.props;
    if (competitions !== nextProps.competitions) {
      this.createProtocolsForForm(nextProps.competitions);
    }
  }

  createProtocolsForForm = competitions => {
    const finalProtocols = [
      {
        name: `Protokół Zbiorczy`,
        _id: 0,
        competitions: [],
        description: "",
        annotation: ""
      }
    ];
    for (let competition of competitions) {
      finalProtocols[0].competitions.push(competition._id);
    }

    const turnamentId = this.props.turnament._id;
    const cookieTurnament = JSON.parse(localStorage.getItem(turnamentId));
    const finalProtocolsCookies =
      cookieTurnament && cookieTurnament.finalProtocols;
    const competitionsCookies = cookieTurnament && cookieTurnament.competitions;
    // console.log("cookieTurnament", cookieTurnament);

    if (
      finalProtocolsCookies &&
      competitionsCookies &&
      JSON.stringify(competitions) === JSON.stringify(competitionsCookies)
    ) {
      // cookies.set(turnamentId, { competitions, finalProtocols }, { path: "/" });
      // console.log("finalProtocolsCookies", finalProtocolsCookies);
      this.setState({
        finalProtocols: finalProtocolsCookies,
        competitions: competitionsCookies
      });
      // console.log("competitionsCookies", competitionsCookies);
    } else {
      this.setState({ finalProtocols, competitions });
    }
  };

  chooseProtocol = (name, value) => {
    // console.log("e", value);
    this.setState({ [name]: value });
  };

  addProtocol = () => {
    const { finalProtocols } = this.state;
    const protocolsAmount = finalProtocols.length;
    finalProtocols.push({
      name: `Protokół nr ${protocolsAmount}`,
      _id: protocolsAmount,
      competitions: [],
      description: "",
      annotation: ""
    });
    this.setState({ finalProtocols });
  };

  addCompetition = (competitionId, protocolId) => {
    // let { finalProtocols } = this.state;
    // //found protocol which contains competitionId without Zbiorczy
    // let containCompetiton = finalProtocols
    //   .slice(1)
    //   .filter(protocol => protocol.competitions.includes(competitionId));
    // // edited protocol without Zbiorczy
    // let containProtocol = finalProtocols
    //   .slice(1)
    //   .filter(protocol => protocol._id === protocolId);
    // // any other protocols without Zbiorczy
    // const finalRest = finalProtocols
    //   .slice(1)
    //   .filter(
    //     protocol =>
    //       !protocol.competitions.includes(competitionId) &&
    //       protocol._id !== protocolId
    //   );
    // console.log("cc cp fp", containCompetiton, containProtocol, finalRest);
    // if (containCompetiton.length > 0) {
    //   //all competitions in protocol that contains choosed competition
    //   const containCompetitonCompetitions = containCompetiton[0].competitions;
    //   console.log(containCompetitonCompetitions);
    //   const filteredContaintCompetition = containCompetitonCompetitions.filter(
    //     x => x !== competitionId
    //   );
    //   containCompetiton[0].competitions = filteredContaintCompetition;
    // } else {
    //   containCompetiton = [];
    // }
    // if (containProtocol.length > 0) {
    //   containProtocol[0].competitions.push(competitionId);
    // } else {
    //   containProtocol = [];
    // }
    // // const containProtocolCompetitions = containProtocol[0].competitions;
    //
    // finalProtocols = [
    //   finalProtocols[0],
    //   ...finalRest,
    //   ...containCompetiton,
    //   ...containProtocol
    // ];
    // console.log("finalProtocols", finalProtocols);
    // finalProtocols.sort(dynamicSort("_id"));
    // if (finalProtocols[1].competitions.length === 0) {
    //   finalProtocols = finalProtocols.slice(1);
    //   finalProtocols = finalProtocols.map((protocol, i) => {
    //     return Object.assign(protocol, {
    //       name: `Protokół nr ${i}`,
    //       _id: i
    //     });
    //   });
    // }

    // this.setState({
    //   // [competitionId]: protocolId,
    //   finalProtocols
    //   // added
    //   // howManyProtocols: howManyProtocols.length
    // });

    // console.log("addCompetition(),", competitionId, protocolId);
    const finalProtocols = this.state.finalProtocols;
    // console.log("addCompetition(),", finalProtocols);

    let protocolEdit = [...finalProtocols].filter(
      protocol => protocol._id === protocolId
    );
    let protocolsRemain = [...finalProtocols].filter(
      protocol => protocol._id !== protocolId
    );
    let competitionsInEditedProtocol = protocolEdit[0].competitions;
    protocolEdit[0].competitions.push(competitionId);

    const newFinalProtocols =
      protocolsRemain.length < 1
        ? protocolEdit
        : [...protocolEdit, ...protocolsRemain].sort(dynamicSort("_id"));
    // console.log("competitionsInEditedProtocol", competitionsInEditedProtocol);
    // console.log("final competitionsInEditedProtocol", newFinalProtocols);

    // console.log("addCompetition ed rem", protocolEdit, protocolsRemain);
    this.setState({
      finalProtocols: newFinalProtocols
    });
  };

  removeProtocol = protocolId => {
    let { finalProtocols } = this.state;
    console.log(
      "removeProtocol",
      protocolId,
      finalProtocols.filter(protocol => protocol._id !== protocolId)
    );

    const newProtocols = finalProtocols
      .filter(protocol => protocol._id !== protocolId)
      .map((protocol, i) => {
        if (i === 0) {
          return protocol;
        } else {
          return Object.assign(protocol, { name: `Protokół nr ${i}`, _id: i });
        }
      });

    // const protocolsAmount = finalProtocols.length;
    // finalProtocols.push({
    //   name: `Protokół nr ${protocolsAmount}`,
    //   _id: protocolsAmount,
    //   competitions: [],
    //   description: "",
    //   annotation: ""
    // });
    this.setState({ finalProtocols: newProtocols });

    // console.log("protocolId", protocolId);
    // let { finalProtocols } = this.state;
    // // const protocolsAmount = finalProtocols.length;
    // const toRemove = finalProtocols
    //   .slice(1)
    //   .filter(proto => proto._id === protocolId);
    // let toRemain = finalProtocols.filter(proto => proto._id !== protocolId);
    // // toRemain[0].competitions.push([...toRemove.competitions]);
    // console.log("remove", toRemove, toRemain);
    // // const competitionsToMove = toRemove[0].competitions;
    // // for (let compet of competitionsToMove) {
    // //   toRemain[0].competitions.push(compet);
    // // }
    // finalProtocols = toRemain.map((protocol, i) => {
    //   if (i === 0) {
    //     return protocol;
    //   } else {
    //     return Object.assign(protocol, {
    //       name: `Protokół nr ${i}`,
    //       _id: i
    //     });
    //   }
    // });
    //
    // this.setState({
    //   finalProtocols
    // });
  };

  removeCompetition = (protocolId, competitionId) => {
    // console.log("removeCompetition(),", protocolId, competitionId);
    const { finalProtocols } = this.state;

    let protocolEdit = finalProtocols.filter(
      protocol => protocol._id === protocolId
    );
    let protocolsRemain = finalProtocols.filter(
      protocol => protocol._id !== protocolId
    );
    let competitionsInEditedProtocol = protocolEdit[0].competitions;
    protocolEdit[0].competitions = competitionsInEditedProtocol.filter(
      competition => competition !== competitionId
    );

    const newFinalProtocols =
      protocolsRemain.length < 1
        ? protocolEdit
        : [...protocolEdit, ...protocolsRemain].sort(dynamicSort("_id"));
    // console.log("competitionsInEditedProtocol", competitionsInEditedProtocol);
    // console.log("final competitionsInEditedProtocol", newFinalProtocols);

    // console.log("removeCompetition ed rem", protocolEdit, protocolsRemain);
    this.setState({
      finalProtocols: newFinalProtocols
    });
  };

  handleComment = (name, value, field) => {
    // const { name, value } = e.target;
    // console.log("handleComment()", name, value, field);

    let { finalProtocols } = this.state;
    // const comment = this.state[protocolId] ? this.state[protocolId] : "";
    let toChange = finalProtocols.filter(proto => {
      // console.log("tochange", proto._id, name);
      return proto._id === name;
    });
    // console.log("finalProtocols", finalProtocols);
    // console.log("toChange", toChange);
    const toNoChange = finalProtocols.filter(proto => proto._id !== name);
    // console.log("handleComment(), ", toChange, toNoChange);
    toChange[0][field] = value;
    finalProtocols = [...toChange, ...toNoChange].sort(dynamicSort("_id"));
    this.setState({ finalProtocols });
  };

  // saveComment = protocolId => {
  //   let { finalProtocols } = this.state;
  //   const comment = this.state[protocolId] ? this.state[protocolId] : "";
  //   let toChange = finalProtocols.filter(proto => proto._id === protocolId);
  //   const toNoChange = finalProtocols.filter(proto => proto._id !== protocolId);
  //   toChange.comment = comment;
  //   finalProtocols = [...toChange, ...toNoChange];
  //   this.setState({ finalProtocols });
  // };

  createAllProtocols = () => {
    const { finalProtocols, competitions } = this.state;
    let protocols = [];
    const zbiorczy = finalProtocols[0];
    protocols.push(zbiorczy);
    // console.log("proto", protocols);
    let index = 0;
    for (let competition of competitions) {
      index++;
      protocols.push({
        name: `Protokół nr ${index}`,
        _id: index,
        competitions: [competition._id],
        description: "",
        annotation: ""
      });
    }
    this.setState({ finalProtocols: protocols });
  };

  generateStatement = () => {
    const { finalProtocols, competitions } = this.state;
    const { players, turnament } = this.props;
    console.log("generateStatement", finalProtocols, players);
    let iterator = -1;
    let protocols = [];
    let minisProtocols = [];
    for (let protocol of finalProtocols) {
      if (protocol.competitions.length > 0) {
        iterator = iterator + 1;
        protocols.push({
          protocol: protocol.name,
          players: [],
          description: protocol.description,
          annotation: protocol.annotation
        });
        const competInProt = protocol.competitions;

        let minis = {};
        console.log("competInProt", competInProt);
        for (let competition of competInProt) {
          minis = Object.assign(minis, { [competition]: [] });
        }
        minisProtocols.push(minis);
        // let min = 0;
        // const isThereAclass = players.filter(x => x.klasa);
        // console.log("isThereAclass", isThereAclass);
        // let isClass;
        // if (isThereAclass.length > 0) {
        //   isClass = true;
        // } else {
        //   isClass = false;
        // }
        //
        // this.setState({ isClass }, () => {
        //
        // });

        for (let player of players) {
          let wholeScore = 0;
          const competInPlayer = player.competitions;
          // console.log("competInPlayer", competInPlayer);

          for (let c of competInPlayer) {
            // if (minis[c.compId] === 0) {
            //   minis[c.compId] = c.score;
            // } else if (minis[c.compId] > c.score) {
            //   minis[c.compId] = c.score;
            // }
            minis[c.compId].push(c.score);
          }

          for (let compet of competInProt) {
            // console.log("competInPlayer", competInPlayer);
            // console.log("compet", compet);
            const foundCompetsInPlayer = competInPlayer.filter(
              x => x.compId === compet
            );
            const score =
              foundCompetsInPlayer.length > 0
                ? foundCompetsInPlayer[0].score
                : 0;
            wholeScore = score + wholeScore;
          }

          // if (turnament.factor) {
          //   if (min === 0) {
          //     min = wholeScore;
          //   } else {
          //     if (wholeScore < min && wholeScore > 0) {
          //       min = wholeScore;
          //     }
          //   }
          //   console.log("min", min);
          // }
          // console.log("statement score count", player.name, wholeScore);
          protocols[iterator].players.push({
            name: player.rodo
              ? `${player.name} ${player.surname}${
                  player.klasa ? ` (${player.klasa})` : ""
                }`
              : `RODO${player.klasa ? ` (${player.klasa})` : ""}`,
            klasa: player.klasa ? `${player.klasa}` : "",
            // number: `${player.rank[0] ? player.rank[0] : ""}`,
            number: player.number ? `${player.number}` : "",
            gun: `${player.gun ? player.gun : ""}`,
            scope: `${player.scope ? player.scope : ""}`,
            score: wholeScore
          });
        }
        // console.log("minis", JSON.stringify(minis));

        for (var min in minis) {
          if (minis.hasOwnProperty(min)) {
            const minValue = Math.min.apply(null, minis[min].filter(Boolean));
            Object.assign(minis, { [min]: minValue });
          }
        }
        // console.log("loop in minis", minis);

        let iter = -1;
        for (let p of players) {
          iter = iter + 1;
          const compInPlayer = p.competitions;
          let wholeFactor = 0;

          for (let c of compInPlayer) {
            for (let cIp of competInProt) {
              if (cIp === c.compId) {
                if (
                  c.score &&
                  c.score !== 0 &&
                  minisProtocols[iterator][c.compId] !== 0 &&
                  minisProtocols[iterator][c.compId] !== 0
                ) {
                  // console.log(
                  //   "liczenie",
                  //   p.name,
                  //   minisProtocols[iterator][c.compId],
                  //   c.score
                  // );
                  const factor =
                    (minisProtocols[iterator][c.compId] / c.score) * 100;
                  Object.assign(c, {
                    factor
                  });
                  console.log("befor sum wholeFactor", p.name, wholeFactor);
                  wholeFactor = wholeFactor + factor;
                  console.log(p.name, factor, wholeFactor);
                } else {
                  Object.assign(c, { factor: 0 });
                  // wholeFactor = wholeFactor + 0
                }
              }
            }
          }
          turnament.factor
            ? (protocols[iterator].players[iter].score = wholeFactor)
            : null;
          // console.log("wholeFactor", wholeFactor);
        }
      }
    }
    // protocols.sort(dynamicSort("score"));
    protocols.map((x, i) => x.players.sort(dynamicSort("score")).reverse());
    protocols.map(x =>
      x.players.map((player, i) => Object.assign(player, { position: i + 1 }))
    );
    console.log("players", players);
    console.log("protocols", protocols);
    console.log("turnament", turnament);
    console.log(JSON.stringify(protocols));
    console.log(JSON.stringify(turnament));
    // console.log("isClass", this.state.isClass);
    generatePDF(turnament, protocols);
  };

  checkIfAllCompetitionWasUse = () => {
    const { finalProtocols, competitions } = this.state;
    if (finalProtocols.length > 1) {
      const withoutZbiorczy = finalProtocols.slice(1);
      const usedProtocols = [];
      for (let protocol of withoutZbiorczy) {
        const competitions = protocol.competitions;
        for (let competition of competitions) {
          usedProtocols.push(competition);
        }
      }
      if (usedProtocols.length < competitions.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  render() {
    const { classes, competitions, theme } = this.props;
    const { protocols, q, finalProtocols, howManyProtocols } = this.state;

    // console.log("finalProtocols", finalProtocols);
    return (
      <Paper className={classes.paper}>
        {finalProtocols && competitions && finalProtocols.length === 1 && (
          <ButtonMy
            style={{ fontSize: 11.3 }}
            onClick={() => this.createAllProtocols()}
          >
            Stwórz indywidualne protokoły dla każdej konkurencji
          </ButtonMy>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(3, 1fr)`
          }}
          // onSubmit={handleSubmit}
        >
          {finalProtocols &&
            competitions &&
            finalProtocols.map((protocol, indexProtocol) => {
              const withoutAdded = competitions.filter(compet => {
                // console.log("protcol comp", protocol.competitions);
                // console.log("protocols", protocol, indexProtocol);
                // console.log("final inprotocols", finalProtocols);
                return !protocol.competitions.includes(compet._id);
              });
              return (
                <span
                  key={protocol._id}
                  style={{
                    background: theme.palette.primary.main,
                    border: "solid grey 1px",
                    margin: 5,
                    padding: 10,
                    borderRadius: 10,
                    display: "grid"
                    // gridTemplateColumns: "1fr 1fr"
                  }}
                >
                  <div
                    style={{
                      // border: "solid grey 1px",
                      // margin: 5,
                      // padding: 10,
                      // borderRadius: 10,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr"
                    }}
                  >
                    {withoutAdded.length > 0 ? (
                      <ChooseSelect
                        options={withoutAdded}
                        action={id => this.addCompetition(id, protocol._id)}
                      />
                    ) : (
                      <div />
                    )}
                    <p
                      style={{
                        color: theme.palette.primary.menu,
                        textAlign: "right",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        display: "grid"
                      }}
                    >
                      {protocol.name}
                    </p>
                  </div>
                  <div
                    style={{
                      margin: 5,
                      padding: 10,
                      borderRadius: 10,
                      display: "grid"
                      // gridTemplateColumns: "1fr 1fr"
                    }}
                  >
                    {competitions.map((competition, i) => {
                      // console.log("436", protocol);
                      if (protocol.competitions.includes(competition._id)) {
                        return (
                          <div
                            key={competition._id}
                            style={{
                              color: theme.palette.primary.menu,
                              fontWeight: 600
                            }}
                          >
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                              }}
                            >
                              <span
                                style={{ textAlign: "right", marginRight: 10 }}
                              >
                                {competition.name}
                              </span>
                              {protocol._id > 0 && (
                                <span>
                                  <Icon
                                    className={classes.icon}
                                    onClick={() =>
                                      this.removeCompetition(
                                        protocol._id,
                                        competition._id
                                      )
                                    }
                                  >
                                    remove_circle_outline
                                  </Icon>{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div />
                  <div
                    style={{
                      textAlign: "end",
                      alignSelf: "end",
                      marginTop: 15
                    }}
                  >
                    <span>{protocol.description.length}/500</span>
                    <TextField
                      style={{
                        width: "100%",
                        background: theme.palette.paper.background,
                        // border: `solid 1px ${theme.palette.menu}`,
                        color: theme.palette.menu
                      }}
                      InputLabelProps={{ shrink: false }}
                      id="outlined-multiline-static"
                      // label="Uwagi"
                      placeholder="Opis"
                      multiline
                      rows="5"
                      // defaultValue="Default Value"
                      // className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      onChange={e =>
                        this.handleComment(
                          protocol._id,
                          e.target.value.slice(0, 500),
                          "description"
                        )
                      }
                      name={protocol._id}
                      value={
                        this.state.finalProtocols.filter(
                          x => x._id === protocol._id
                        )[0].description
                      }
                      // onBlur={() => this.saveComment(protocol._id.toString())}
                    />
                    <span>{protocol.annotation.length}/500</span>
                    <TextField
                      style={{
                        width: "100%",
                        background: theme.palette.paper.background,
                        // border: `solid 1px ${theme.palette.menu}`,
                        color: theme.palette.menu
                      }}
                      InputLabelProps={{ shrink: false }}
                      id="outlined-multiline-static"
                      // label="Uwagi"
                      placeholder="Uwagi"
                      multiline
                      rows="5"
                      // defaultValue="Default Value"
                      // className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      onChange={e =>
                        this.handleComment(
                          protocol._id,
                          e.target.value.slice(0, 500),
                          "annotation"
                        )
                      }
                      name={protocol._id}
                      value={
                        this.state.finalProtocols.filter(
                          x => x._id === protocol._id
                        )[0].annotation
                      }
                      // onBlur={() => this.saveComment(protocol._id.toString())}
                    />
                    {/* <InputComponent
                      multiline
                      rows="4"
                      name={protocol._id.toString()}
                      label="Strzelnica"
                      type="string"
                      edytuj={this.handleComment}
                      value={
                        this.state[protocol._id] ? this.state[protocol._id] : ""
                      }
                    /> */}
                    {finalProtocols.length > 1 && (
                      <ButtonMy
                        style={{ fontSize: 11.3 }}
                        onClick={() => this.removeProtocol(protocol._id)}
                      >
                        Usuń protokół
                      </ButtonMy>
                    )}
                  </div>
                </span>
              );
            })}

          <div style={{ display: "grid", alignContent: "center" }}>
            {this.state.finalProtocols &&
              this.state.finalProtocols.length <=
                this.state.competitions.length &&
              this.checkIfAllCompetitionWasUse() &&
              this.state.finalProtocols[this.state.finalProtocols.length - 1]
                .competitions.length > 0 && (
                <ButtonMy style={{ width: 200 }} onClick={this.addProtocol}>
                  Dodaj protokół
                </ButtonMy>
              )}
          </div>
        </div>
        <div>
          {/* <ButtonMy style={{ width: 300 }} onClick={this.addComents}>
            Dodaj uwagi do protokołów
          </ButtonMy> */}
          <ButtonMy
            style={{ width: 300, marginTop: 15 }}
            onClick={this.generateStatement}
          >
            Generuj komunikat w pdf
          </ButtonMy>
        </div>
      </Paper>
    );
  }
}

const combinedStyles = combineStyles(formStyles);

const enhance = compose(
  withRouter,
  withStyles(combinedStyles, { withTheme: true }),
  connect(
    null,
    actions
  )
);

export default enhance(StatementForm);
