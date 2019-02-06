import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
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

class StatementForm extends Component {
  state = {
    protocols: [],
    q: "",
    howManyProtocols: 0
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
    const finalProtocols = [];
    const protocols = competitions.map((competition, i) => {
      const protocol = { name: `Protokół nr ${i + 1}`, _id: i + 1 };
      // this.setState({ [competition._id]: { name: "pro2", _id: 2 } });
      // this.setState({ [competition._id]: protocol });
      finalProtocols.push({
        ...protocol,
        competitions: [competition._id]
      });
      this.setState({ [competition._id]: i + 1 });
      // this.setState({
      //   [competition._id]: {
      //     target: {
      //       name: competition.name,
      //       text: "pro1",
      //       type: "inputSelectBaza",
      //       value: 1
      //     }
      //   }
      // });
      return protocol;
    });

    this.setState({
      protocols,
      finalProtocols,
      howManyProtocols: protocols.length
    });
  };

  chooseProtocol = (name, value) => {
    console.log("e", value);
    this.setState({ [name]: value });
  };

  change = (competitionId, protocolId) => {
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
    const howManyProtocols = finalProtocols.filter(
      protocol => protocol.competitions.length > 0
    );
    // finalProtocols = howManyProtocols.map((protocol, i) => {
    //   return Object.assign(protocol, {
    //     _id: i + 1,
    //     name: `Protokół nr ${i + 1}`
    //   });
    // });

    console.log("change", competitionId, protocolId);
    console.log(
      "change",
      finalProtocols
      // containCompetiton,
      // containProtocol,
      // finalRest
    );
    this.setState({
      [competitionId]: protocolId,
      finalProtocols,
      howManyProtocols: howManyProtocols.length
    });
  };

  render() {
    const { classes, competitions } = this.props;
    const { protocols, q, finalProtocols, howManyProtocols } = this.state;

    console.log("protocols", protocols);
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
            finalProtocols.map(protocol => {
              if (protocol.competitions.length > 0) {
                return (
                  <span
                    key={protocol._id}
                    style={{
                      border: "solid grey 1px",
                      margin: 5,
                      padding: 10,
                      borderRadius: 10
                    }}
                  >
                    <p
                      style={{
                        color: "white",
                        textAlign: "right",
                        fontWeight: 600,
                        textTransform: "uppercase"
                      }}
                    >
                      {protocol.name}
                    </p>
                    {competitions.map((competition, i) => {
                      if (protocol.competitions.includes(competition._id)) {
                        return (
                          <div>
                            <ChooseSelect
                              key={competition._id}
                              label={competition.name}
                              options={protocols}
                              order={i}
                              change={protocolId =>
                                this.change(competition._id, protocolId)
                              }
                              value={this.state[competition._id]}
                            />
                          </div>
                        );
                      }
                    })}
                  </span>
                );
              }
            })}

          <FormButtons />
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
