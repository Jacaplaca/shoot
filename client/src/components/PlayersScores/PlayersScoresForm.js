import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import * as actions from "../../actions";

class PlayersScoresForm extends React.Component {
  state = {
    name: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  save = (value, compId, playerId, turnament) => {
    const form = { value, compId, playerId, turnament };

    const adding = {
      post: `/api/score/`,
      // values: null,
      form,
      get: `/api/players/turnament/${turnament}`,
      action: "add",
      collection: "score"
    };

    this.props.addToDB(adding);

    console.log("save", value, compId, playerId, turnament);
  };

  render() {
    const { classes, id, label, score, player, turnament } = this.props;

    return (
      <form
        // className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          // inputStyle={{ backgroundColor: "red" }}
          InputProps={{ className: classes.input }}
          inputProps={{ className: classes.inputNative }}
          style={{
            marginTop: 10,
            marginBottom: 3,
            marginLeft: 5,
            marginRight: 5
          }}
          InputLabelProps={{ shrink: true, className: classes.label }}
          id="outlined-name"
          label={label}
          // className={classes.textField}
          // value={this.state.value}
          placeholder={score}
          onChange={this.handleChange("value")}
          onBlur={() => this.save(this.state.value, id, player, turnament)}
          // margin="normal"
          variant="outlined"
          className={classes.textField}
        />
      </form>
    );
  }
}

const styles = theme => ({
  textField: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
  },
  label: {
    color: "gray"
  },
  input: {
    // color: "red"
    // background: "red",
    // padding: 0
  },
  inputNative: {
    // background: "white",
    padding: 10
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// export default withStyles(styles, { withTheme: true })(PlayersScoresForm);

const enhance = compose(
  // withRouter,
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
  // RowHOC
);

export default enhance(PlayersScoresForm);
