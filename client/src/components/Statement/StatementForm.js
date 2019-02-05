import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { combineStyles } from "../../functions/functions";
import store from "../../store";
import * as actions from "../../actions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import { formStyles } from "../../skins/mainStyles";
import { minimalSuggestion } from "../../inputs/Suggestions";
import InputComponent from "../../inputs/InputComponent";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import FormButtons from "../../skins/FormButtons";

class StatementForm extends Component {
  state = {
    protocols: [],
    q: ""
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
    const protocols = competitions.map((x, i) => {
      const protocol = { name: `Protokół nr ${i + 1}`, _id: i + 1 };
      // this.setState({ [x._id]: { name: "pro2", _id: 2 } });
      this.setState({ [x._id]: protocol });
      // this.setState({
      //   [x._id]: {
      //     target: {
      //       name: x.name,
      //       text: "pro1",
      //       type: "inputSelectBaza",
      //       value: 1
      //     }
      //   }
      // });
      return protocol;
    });

    this.setState({ protocols });
  };

  chooseProtocol = (name, value) => {
    console.log("e", value);
    this.setState({ [name]: value });
  };

  render() {
    const { classes, competitions } = this.props;
    const { protocols, q } = this.state;
    console.log("protocols", protocols);
    return (
      <Paper className={classes.paper}>
        <form
        // onSubmit={handleSubmit}
        >
          {competitions &&
            competitions.map(x => {
              return (
                <InputSelectBaza
                  key={x._id}
                  // object={[{ name: "pro1", _id: 1 }, { name: "pro2", _id: 2 }]}
                  object={protocols}
                  name={x.name}
                  type="string"
                  // wybrano={e => this.setState({ turnamentId: e.target.value })}
                  wybrano={e => this.chooseProtocol(x._id, e)}
                  label={x.name}
                  value={this.state[x._id]}
                  suggestion={minimalSuggestion}
                />
              );
            })}

          <FormButtons />
        </form>
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
