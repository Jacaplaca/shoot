import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
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
// import

class StatementForm extends Component {
  state = {
    protocols: [],
    q: "",
    howManyProtocols: 0,
    competitions: []
  };

  componentDidMount() {
    this.setState({ q: { name: "pro2", _id: 2 } });

    this.props.competitions &&
      this.createProtocolsForForm(this.props.competitions);
  }

  componentWillReceiveProps(nextProps) {
    const { competitions } = this.props;
    if (competitions !== nextProps.competitions) {
      this.createProtocolsForForm(nextProps.competitions);
    }
  }

  createProtocolsForForm = competitions => {
    const finalProtocols = [
      { name: `Protokół nr 1`, _id: 1, competitions: [], comment: "" }
    ];
    for (let competition of competitions) {
      finalProtocols[0].competitions.push(competition._id);
    }
    this.setState({ finalProtocols, competitions });
  };

  // createProtocolsForFormOld = competitions => {
  //   const finalProtocols = [];
  //   const protocols = competitions.map((competition, i) => {
  //     const protocol = {
  //       name: `Protokół nr ${i + 1}`,
  //       _id: i + 1,
  //       comment: ""
  //     };
  //     // this.setState({ [competition._id]: { name: "pro2", _id: 2 } });
  //     // this.setState({ [competition._id]: protocol });
  //     finalProtocols.push({
  //       ...protocol,
  //       competitions: [competition._id]
  //     });
  //     this.setState({ [competition._id]: i + 1 });
  //     // this.setState({
  //     //   [competition._id]: {
  //     //     target: {
  //     //       name: competition.name,
  //     //       text: "pro1",
  //     //       type: "inputSelectBaza",
  //     //       value: 1
  //     //     }
  //     //   }
  //     // });
  //     return protocol;
  //   });
  //
  //   this.setState({
  //     protocols,
  //     finalProtocols,
  //     howManyProtocols: protocols.length
  //   });
  // };

  chooseProtocol = (name, value) => {
    console.log("e", value);
    this.setState({ [name]: value });
  };

  // change = (competitionId, protocolId) => {
  //   let { finalProtocols } = this.state;
  //   let containCompetiton = finalProtocols.filter(protocol =>
  //     protocol.competitions.includes(competitionId)
  //   );
  //
  //   let containProtocol = finalProtocols.filter(
  //     protocol => protocol._id === protocolId
  //   );
  //   const finalRest = finalProtocols.filter(
  //     protocol =>
  //       !protocol.competitions.includes(competitionId) &&
  //       protocol._id !== protocolId
  //   );
  //   const containCompetitonCompetitions = containCompetiton[0].competitions;
  //   console.log(containCompetitonCompetitions);
  //   const filteredContaintCompetition = containCompetitonCompetitions.filter(
  //     x => x !== competitionId
  //   );
  //   containCompetiton[0].competitions = filteredContaintCompetition;
  //
  //   // const containProtocolCompetitions = containProtocol[0].competitions;
  //   containProtocol[0].competitions.push(competitionId);
  //   finalProtocols = [...finalRest, ...containCompetiton, ...containProtocol];
  //   finalProtocols.sort(dynamicSort("_id"));
  //   const howManyProtocols = finalProtocols.filter(
  //     protocol => protocol.competitions.length > 0
  //   );
  //   // finalProtocols = howManyProtocols.map((protocol, i) => {
  //   //   return Object.assign(protocol, {
  //   //     _id: i + 1,
  //   //     name: `Protokół nr ${i + 1}`
  //   //   });
  //   // });
  //
  //   console.log("change", competitionId, protocolId);
  //   console.log(
  //     "change",
  //     finalProtocols
  //     // containCompetiton,
  //     // containProtocol,
  //     // finalRest
  //   );
  //   this.setState({
  //     [competitionId]: protocolId,
  //     finalProtocols,
  //     howManyProtocols: howManyProtocols.length
  //   });
  // };

  addProtocol = () => {
    const { finalProtocols } = this.state;
    const protocolsAmount = finalProtocols.length;
    finalProtocols.push({
      name: `Protokół nr ${protocolsAmount + 1}`,
      _id: protocolsAmount + 1,
      competitions: [],
      comment: ""
    });
    this.setState({ finalProtocols });
  };

  addCompetition = (competitionId, protocolId) => {
    // const added = [];
    let { finalProtocols } = this.state;
    let containCompetiton = finalProtocols.filter(protocol =>
      protocol.competitions.includes(competitionId)
    );

    let containProtocol = finalProtocols.filter(
      protocol => protocol._id === protocolId
    );
    const finalRest = finalProtocols.filter(
      protocol =>
        !protocol.competitions.includes(competitionId) &&
        protocol._id !== protocolId
    );
    const containCompetitonCompetitions = containCompetiton[0].competitions;
    console.log(containCompetitonCompetitions);
    const filteredContaintCompetition = containCompetitonCompetitions.filter(
      x => x !== competitionId
    );
    containCompetiton[0].competitions = filteredContaintCompetition;

    // const containProtocolCompetitions = containProtocol[0].competitions;
    containProtocol[0].competitions.push(competitionId);
    finalProtocols = [...finalRest, ...containCompetiton, ...containProtocol];
    finalProtocols.sort(dynamicSort("_id"));
    if (finalProtocols[0].competitions.length === 0) {
      finalProtocols = finalProtocols.slice(1);
      finalProtocols = finalProtocols.map((protocol, i) => {
        return Object.assign(protocol, {
          name: `Protokół nr ${i + 1}`,
          _id: i + 1
        });
      });
    }
    // for (let protocol of finalProtocols) {
    //   const competitions = protocol.competitions;
    //   for (let competition of competitions) {
    //     added.push(competition._id);
    //   }
    // }

    // const howManyProtocols = finalProtocols.filter(
    //   protocol => protocol.competitions.length > 0
    // );
    // finalProtocols = howManyProtocols.map((protocol, i) => {
    //   return Object.assign(protocol, {
    //     _id: i + 1,
    //     name: `Protokół nr ${i + 1}`
    //   });
    // });

    // console.log("change", competitionId, protocolId);
    // console.log(
    //   "change",
    //   finalProtocols
    //   // containCompetiton,
    //   // containProtocol,
    //   // finalRest
    // );
    this.setState({
      // [competitionId]: protocolId,
      finalProtocols
      // added
      // howManyProtocols: howManyProtocols.length
    });
  };

  removeProtocol = protocolId => {
    console.log("protocolId", protocolId);
    let { finalProtocols } = this.state;
    // const protocolsAmount = finalProtocols.length;
    const toRemove = finalProtocols.filter(proto => proto._id === protocolId);
    let toRemain = finalProtocols.filter(proto => proto._id !== protocolId);
    // toRemain[0].competitions.push([...toRemove.competitions]);
    console.log("remove", toRemove, toRemain);
    const competitionsToMove = toRemove[0].competitions;
    for (let compet of competitionsToMove) {
      toRemain[0].competitions.push(compet);
    }
    finalProtocols = toRemain.map((protocol, i) => {
      return Object.assign(protocol, {
        name: `Protokół nr ${i + 1}`,
        _id: i + 1
      });
    });
    // finalProtocols.push({
    //   name: `Protokół nr ${protocolsAmount + 1}`,
    //   _id: protocolsAmount + 1,
    //   competitions: []
    // });
    this.setState({ finalProtocols });
  };

  handleComment = e => {
    const { name, value } = e.target;
    console.log("handleComment()", value, name);
    // this.setState({ [e.target.name]: e.target.value });

    let { finalProtocols } = this.state;
    // const comment = this.state[protocolId] ? this.state[protocolId] : "";
    let toChange = finalProtocols.filter(proto => {
      console.log("tochange", proto._id, name);
      return proto._id.toString() === name;
    });
    const toNoChange = finalProtocols.filter(
      proto => proto._id.toString() !== name
    );
    console.log("handleComment(), ", toChange, toNoChange);
    toChange[0].comment = value;
    finalProtocols = [...toChange, ...toNoChange].sort(dynamicSort("_id"));
    this.setState({ finalProtocols });
  };

  saveComment = protocolId => {
    let { finalProtocols } = this.state;
    const comment = this.state[protocolId] ? this.state[protocolId] : "";
    let toChange = finalProtocols.filter(proto => proto._id === protocolId);
    const toNoChange = finalProtocols.filter(proto => proto._id !== protocolId);
    toChange.comment = comment;
    finalProtocols = [...toChange, ...toNoChange];
    this.setState({ finalProtocols });
  };

  generateStatement = () => {
    const { finalProtocols, competitions } = this.state;
    const { players } = this.props;
    let iterator = -1;
    let protocols = [];
    for (let protocol of finalProtocols) {
      iterator = iterator + 1;
      protocols.push({ protocol: protocol.name, players: [] });
      const competInProt = protocol.competitions;
      for (let player of players) {
        let wholeScore = 0;
        const competInPlayer = player.competitions;
        for (let compet of competInProt) {
          console.log("competInPlayer", competInPlayer);
          console.log("compet", compet);
          const foundCompetsInPlayer = competInPlayer.filter(
            x => x.compId === compet
          );
          const score =
            foundCompetsInPlayer.length > 0 ? foundCompetsInPlayer[0].score : 0;
          wholeScore = score + wholeScore;
        }
        protocols[iterator].players.push({
          name: `${player.name} ${player.surname}`,
          score: wholeScore
        });
      }
    }
    console.log("protocols", protocols);
  };

  render() {
    const { classes, competitions, theme } = this.props;
    const { protocols, q, finalProtocols, howManyProtocols } = this.state;

    // console.log("finalProtocols", finalProtocols);
    return (
      <Paper className={classes.paper}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(4, 1fr)`
          }}
          // onSubmit={handleSubmit}
        >
          {finalProtocols &&
            competitions &&
            finalProtocols.map((protocol, indexProtocol) => {
              const withoutAdded = competitions.filter(
                compet => !protocol.competitions.includes(compet._id)
              );
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
                      if (protocol.competitions.includes(competition._id)) {
                        return (
                          <div
                            key={competition._id}
                            style={{
                              color: theme.palette.primary.menu,
                              fontWeight: 600
                            }}
                          >
                            {competition.name}
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
                      onChange={this.handleComment}
                      name={protocol._id}
                      value={
                        this.state.finalProtocols.filter(
                          x => x._id === protocol._id
                        )[0].comment
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
            <ButtonMy style={{ width: 200 }} onClick={this.addProtocol}>
              Dodaj protokół
            </ButtonMy>
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
